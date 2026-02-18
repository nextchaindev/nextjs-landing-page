import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { KanbanBoard } from "@/components/admin/KanbanBoard"
import { logout } from "../actions"

export const revalidate = 0

export default async function AdminConsultationsPage() {
    const supabase = await createClient()

    // Verify auth again (optional as middleware handles it, but good practice for data fetching)
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
        redirect("/admin/login")
    }

    const { data: consultations, error } = await supabase
        .from("consultations")
        .select("*")
        .order("created_at", { ascending: false })

    if (error) {
        return <div className="p-8 text-red-500">Error loading consultations: {error.message}</div>
    }

    return (
        <div className="flex h-screen flex-col bg-gray-50">
            <header className="flex items-center justify-between border-b bg-white px-6 py-4 shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">Consultation Board</h1>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">{user.email}</span>
                    <a href="/admin/users" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        Manage Users
                    </a>
                    <form action={logout}>
                        <button type="submit" className="text-sm font-medium text-red-600 hover:text-red-500">
                            Logout
                        </button>
                    </form>
                </div>
            </header>

            <main className="flex-1 overflow-hidden p-6">
                <KanbanBoard initialData={consultations || []} />
            </main>
        </div>
    )
}
