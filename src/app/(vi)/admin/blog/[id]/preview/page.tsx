import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { BlogPostView } from "@/components/pages/BlogPages"
import { BLOG_COLUMNS, rowToPost, type BlogPostRow } from "@/lib/blog"

export const revalidate = 0

/** Xem bài (kể cả nháp) đúng như trên website trước khi đăng. Chỉ admin; trang admin luôn noindex. */
export default async function BlogPostPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/admin/login")

  const { id } = await params
  const { data } = await supabase.from("blog_posts").select(BLOG_COLUMNS).eq("id", id).maybeSingle()
  if (!data) notFound()
  const post = rowToPost(data as BlogPostRow)

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-center gap-4 bg-amber-100 px-4 py-2 text-sm text-amber-900 shadow">
        <span>
          Preview — {(data as BlogPostRow).status === "published" ? "published" : "draft, not visible on the website"}
        </span>
        <Link href={`/admin/blog/${id}`} className="font-semibold underline">
          Back to editor
        </Link>
      </div>
      <BlogPostView post={post} locale={post.locale} morePosts={[]} />
    </>
  )
}
