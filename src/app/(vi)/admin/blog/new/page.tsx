import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import AdminHeader from "@/components/admin/AdminHeader"
import BlogPostForm from "@/components/admin/BlogPostForm"
import { BLOG_COLUMNS, DEFAULT_BLOG_AUTHOR, type BlogPostInput, type BlogPostRow } from "@/lib/blog"
import { LOCALE_NAMES, isLocale, type Locale } from "@/i18n/config"
import { categoriesFor, rowToInput } from "../editorData"

export const revalidate = 0

function emptyPost(locale: Locale): BlogPostInput {
  return {
    locale,
    slug: "",
    status: "draft",
    title: "",
    metaTitle: "",
    description: "",
    category: "",
    coverUrl: "",
    coverWidth: null,
    coverHeight: null,
    author: DEFAULT_BLOG_AUTHOR[locale],
    readingMinutes: null,
    answer: "",
    keyTakeaways: [],
    sections: [{ heading: "" }],
    faqs: [],
    relatedLinks: [],
    publishedAt: "",
    contentUpdatedAt: "",
  }
}

/** /admin/blog/new — bài mới, hoặc ?from=<id>&locale=ko để dịch một bài có sẵn (chép nội dung sang để dịch). */
export default async function NewBlogPostPage({ searchParams }: { searchParams: Promise<{ from?: string; locale?: string }> }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/admin/login")

  const { from, locale: localeParam } = await searchParams
  const locale: Locale = localeParam && isLocale(localeParam) ? localeParam : "vi"
  let initial = emptyPost(locale)
  let source: BlogPostRow | null = null

  if (from) {
    const { data } = await supabase.from("blog_posts").select(BLOG_COLUMNS).eq("id", from).maybeSingle()
    source = data as BlogPostRow | null
    if (source) {
      const { data: existing } = await supabase
        .from("blog_posts")
        .select("id")
        .eq("translation_key", source.translation_key)
        .eq("locale", locale)
        .maybeSingle()
      if (existing) redirect(`/admin/blog/${existing.id}`)
      // Bản dịch: chép nội dung gốc để dịch, slug để trống (slug tiếng Anh cho ko/en), luôn bắt đầu là nháp.
      initial = {
        ...rowToInput(source),
        id: undefined,
        locale,
        slug: "",
        status: "draft",
        author: DEFAULT_BLOG_AUTHOR[locale],
        contentUpdatedAt: "",
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader active="/admin/blog" email={user.email} />
      <main className="mx-auto max-w-6xl p-6">
        <Link href="/admin/blog" className="text-sm text-gray-500 hover:underline">
          ← All posts
        </Link>
        <h1 className="mt-2 mb-6 text-2xl font-bold text-gray-900">
          {source ? `Translate “${source.title}” into ${LOCALE_NAMES[locale].full}` : "New post"}
        </h1>
        {source && (
          <p className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
            The original content has been copied below — translate every field, set an English slug, then save. Translations of the same
            article are linked automatically (hreflang + language switcher).
          </p>
        )}
        <BlogPostForm initial={initial} savedStatus="draft" categories={await categoriesFor(supabase, locale)} />
      </main>
    </div>
  )
}
