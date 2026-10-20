import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import AdminHeader from "@/components/admin/AdminHeader"
import BlogPostForm from "@/components/admin/BlogPostForm"
import { cn } from "@/components/ui/utils"
import { BLOG_COLUMNS, type BlogPostRow } from "@/lib/blog"
import { LOCALES, LOCALE_NAMES, isLocale } from "@/i18n/config"
import { sectionPath } from "@/i18n/paths"
import { categoriesFor, rowToInput } from "../editorData"

export const revalidate = 0

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/admin/login")

  const { id } = await params
  const { data } = await supabase.from("blog_posts").select(BLOG_COLUMNS).eq("id", id).maybeSingle()
  const row = data as BlogPostRow | null
  if (!row || !isLocale(row.locale)) notFound()

  const { data: siblings } = await supabase
    .from("blog_posts")
    .select("id, locale, status")
    .eq("translation_key", row.translation_key)
  const today = new Date().toISOString().slice(0, 10)
  const live = row.status === "published" && row.published_at !== null && row.published_at <= today

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader active="/admin/blog" email={user.email} />
      <main className="mx-auto max-w-6xl p-6">
        <Link href="/admin/blog" className="text-sm text-gray-500 hover:underline">
          ← All posts
        </Link>
        <div className="mt-2 mb-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">{row.title || "Untitled"}</h1>
          {/* Các bản ngôn ngữ của cùng bài: chuyển nhanh hoặc tạo bản dịch còn thiếu. */}
          <nav className="flex gap-2 text-sm">
            {LOCALES.map((locale) => {
              const sibling = siblings?.find((s) => s.locale === locale)
              const current = locale === row.locale
              return (
                <Link
                  key={locale}
                  href={sibling ? `/admin/blog/${sibling.id}` : `/admin/blog/new?from=${row.id}&locale=${locale}`}
                  className={cn(
                    "rounded-lg border px-3 py-1 font-semibold",
                    current ? "border-indigo-600 bg-indigo-600 text-white" : sibling ? "bg-white text-gray-700 hover:border-gray-400" : "border-dashed text-gray-400 hover:text-indigo-600",
                  )}
                  title={sibling ? LOCALE_NAMES[locale].full : `Translate into ${LOCALE_NAMES[locale].full}`}>
                  {sibling ? LOCALE_NAMES[locale].short : `+ ${LOCALE_NAMES[locale].short}`}
                </Link>
              )
            })}
          </nav>
        </div>
        <BlogPostForm
          key={row.id}
          initial={rowToInput(row)}
          savedStatus={row.status}
          categories={await categoriesFor(supabase, row.locale)}
          publicPath={live ? sectionPath("blog", row.locale, row.slug) : undefined}
        />
      </main>
    </div>
  )
}
