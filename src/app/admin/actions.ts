'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        redirect('/admin/login?error=Invalid credentials')
    }

    revalidatePath('/', 'layout')
    redirect('/admin/consultations')
}

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/admin/login')
}

export async function updateConsultationStatus(id: string, newStatus: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Unauthorized' }

    // 1. Get old status for logging (optional, but good for details)
    const { data: oldData } = await supabase.from('consultations').select('status').eq('id', id).single()

    // 2. Update status
    const { error } = await supabase
        .from('consultations')
        .update({ status: newStatus })
        .eq('id', id)

    if (error) return { error: error.message }

    // 3. Log action
    await supabase.from('consultation_logs').insert({
        consultation_id: id,
        actor_id: user.id,
        actor_email: user.email,
        action: 'status_change',
        details: { from: oldData?.status, to: newStatus }
    })

    revalidatePath('/admin/consultations')
    return { success: true }
}

export async function updateConsultationMemo(id: string, memo: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Unauthorized' }

    // 1. Update memo
    const { error } = await supabase
        .from('consultations')
        .update({ memo })
        .eq('id', id)

    if (error) return { error: error.message }

    // 2. Log action
    await supabase.from('consultation_logs').insert({
        consultation_id: id,
        actor_id: user.id,
        actor_email: user.email,
        action: 'memo_update',
        details: { memo_snapshot: memo } // storing full memo might be large, but useful
    })

    revalidatePath('/admin/consultations')
    return { success: true }
}
