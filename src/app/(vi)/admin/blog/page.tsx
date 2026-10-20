import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import AdminHeader from "@/components/admin/AdminHeader"
import { cn } from "@/components/ui/utils"
import { LOCALES, LOCALE_NAMES, isLocale, type Locale } from "@/i18n/config"
import { sectionPath } from "@/i18n/paths"

export const revalidate = 0

interface Row {
  id: string
  translation_key: string
  locale: string
  slug: string
  status: "draft" | "published"
  title: string
  category: string
  published_at: string | null
  updated_at: string
}

function statusOf(row: Row, today: string) {
  if (row.status === "draft") return { label: "Draft", className: "bg-gray-100 text-gray-700" }
  if (row.published_at && row.published_at > today) return { label: `Scheduled ${row.published_at}`, className: "bg-blue-50 text-blue-700" }
  return { label: "Published", className: "bg-green-50 text-green-700" }
}

export default async function AdminBlogPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/admin/login")

  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, translation_key, locale, slug, status, title, category, published_at, updated_at")
    .order("updated_at", { ascending: false })

  // Gom các bản dịch của cùng một bài; nhóm sửa gần nhất lên đầu.
  const groups = new Map<string, Row[]>()
  for (const row of (data ?? []) as Row[]) groups.set(row.translation_key, [...(groups.get(row.translation_key) ?? []), row])
  const today = new Date().toISOString().slice(0, 10)

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader active="/admin/blog" email={user.email} />
      <main className="mx-auto max-w-6xl p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Blog posts</h1>
            <p className="text-sm text-gray-500">
              Each row is one article; columns are its language versions. Saving updates the public site immediately.
            </p>
          </div>
          <Link
            href="/admin/blog/new"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
            + New post
          </Link>
        </div>

        {error ? (
          <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Could not load posts: {error.message}. Run <code>supabase_blog.sql</code> and <code>supabase_blog_seed.sql</code> in
            Supabase.
          </p>
        ) : groups.size === 0 ? (
          <p className="rounded-lg border bg-white p-8 text-center text-gray-500">No posts yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-4 py-3">Article</th>
                  {LOCALES.map((locale) => (
                    <th key={locale} className="px-4 py-3">
                      {LOCALE_NAMES[locale].short}
                    </th>
                  ))}
                  <th className="px-4 py-3">Last edited</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[...groups.values()].map((rows) => {
                  const main = rows.find((row) => row.locale === "vi") ?? rows[0]
                  const lastEdited = rows.map((row) => row.updated_at).sort().at(-1)!
                  return (
                    <tr key={main.translation_key} className="align-top">
                      <td className="px-4 py-3">
                        <Link href={`/admin/blog/${main.id}`} className="font-semibold text-gray-900 hover:text-indigo-600">
                          {main.title}
                        </Link>
                        {main.category && <p className="text-xs text-gray-500">{main.category}</p>}
                      </td>
                      {LOCALES.map((locale: Locale) => {
                        const row = rows.find((r) => r.locale === locale)
                        if (!row) {
                          return (
                            <td key={locale} className="px-4 py-3">
                              <Link
                                href={`/admin/blog/new?from=${main.id}&locale=${locale}`}
                                className="text-xs font-semibold text-indigo-600 hover:underline">
                                + Translate
                              </Link>
                            </td>
                          )
                        }
                        const status = statusOf(row, today)
                        return (
                          <td key={locale} className="px-4 py-3">
                            <span className={cn("inline-block rounded-full px-2 py-0.5 text-xs font-semibold", status.className)}>
                              {status.label}
                            </span>
                            <div className="mt-1 flex gap-3 text-xs">
                              <Link href={`/admin/blog/${row.id}`} className="font-semibold text-indigo-600 hover:underline">
                                Edit
                              </Link>
                              {status.label === "Published" && isLocale(row.locale) && (
                                <a
                                  href={sectionPath("blog", row.locale, row.slug)}
                                  target="_blank"
                                  rel="noopener"
                                  className="text-gray-500 hover:underline">
                                  View
                                </a>
                              )}
                            </div>
                          </td>
                        )
                      })}
                      <td className="px-4 py-3 text-xs text-gray-500">{new Date(lastEdited).toLocaleString("vi-VN")}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
