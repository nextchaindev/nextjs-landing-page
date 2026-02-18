import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { createAdminUser, deleteAdminUser } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const revalidate = 0

export default async function AdminUsersPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/admin/login')
    }

    // We need to fetch users using the service role client because normal users can't list users
    // However, for security, we should create an RPC function or similar. 
    // For this MVP, we will use a client-side fetch or a server-side fetch with the admin key 
    // BUT CAREFULLY. Since this is a server component, we can use the admin key here to fetch the list.

    const { createClient: createAdminClient } = require('@supabase/supabase-js')
    const supabaseAdmin = createAdminClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers()

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Admin User Management</h1>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Create New Admin</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form action={createAdminUser as any} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">Email</label>
                                <Input id="email" name="email" type="email" required placeholder="admin@example.com" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-medium">Password</label>
                                <Input id="password" name="password" type="password" required placeholder="min 6 chars" />
                            </div>
                            <Button type="submit" className="w-full">Create Admin</Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Existing Admins</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users?.map((u: any) => (
                                    <TableRow key={u.id}>
                                        <TableCell>{u.email}</TableCell>
                                        <TableCell>{new Date(u.created_at).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            {u.id !== user.id && (
                                                <form action={deleteAdminUser.bind(null, u.id) as any}>
                                                    <Button variant="destructive" size="sm">Delete</Button>
                                                </form>
                                            )}
                                            {u.id === user.id && <span className="text-xs text-gray-500">(You)</span>}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
