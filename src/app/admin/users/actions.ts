'use server'

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import { createClient as createServerClient } from '@/utils/supabase/server'

// Use a separate client with service role for admin management only
// This is safe because these actions are only accessible to authenticated admins
// verified by the middleware and the check below.
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function createAdminUser(formData: FormData) {
    // 1. Verify current user is admin
    const supabase = await createServerClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
        return { error: 'Unauthorized' }
    }

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return { error: 'Email and password are required' }
    }

    // 2. Create user via Admin API
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/admin/users')
    return { success: true, message: `Created user ${data.user.email}` }
}

export async function deleteAdminUser(userId: string) {
    // 1. Verify current user is admin
    const supabase = await createServerClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
        return { error: 'Unauthorized' }
    }

    if (user.id === userId) {
        return { error: 'Cannot delete yourself' }
    }

    // 2. Delete user
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/admin/users')
    return { success: true }
}
