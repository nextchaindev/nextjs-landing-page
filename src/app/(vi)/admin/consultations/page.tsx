import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { KanbanBoard } from "@/components/admin/KanbanBoard"
import AdminHeader from "@/components/admin/AdminHeader"

export const revalidate = 0

export default async function AdminConsultationsPage() {
    const supabase = await createClient()

    // Verify auth again (optional as proxy handles it, but good practice for data fetching)
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
            <AdminHeader active="/admin/consultations" email={user.email} />

            <main className="flex-1 overflow-hidden p-6">
                <KanbanBoard initialData={consultations || []} />
            </main>
        </div>
    )
}
