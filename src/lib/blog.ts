import { unstable_cache } from "next/cache"
import { createClient } from "@supabase/supabase-js"
import type { Faq } from "@/content/faqs"
import { absoluteUrl } from "@/lib/site"
import { LOCALES, isLocale, type Locale } from "@/i18n/config"
import { sectionPath } from "@/i18n/paths"

/**
 * Blog lưu trong Supabase (bảng blog_posts — supabase_blog.sql), soạn ở /admin/blog.
 *
 * Cấu trúc phục vụ GEO: `answer` trả lời trực tiếp câu hỏi chính ngay đầu bài, heading viết dạng câu hỏi,
 * dữ liệu so sánh đặt trong bảng, FAQ cuối bài. Trang public vẫn là static: dữ liệu đọc qua unstable_cache
 * (tag BLOG_TAG), lưu bài ở admin gọi updateTag(BLOG_TAG) để mọi trang dùng blog dựng lại ngay; ngoài ra tự làm mới mỗi giờ.
 */
export const BLOG_TAG = "blog"
const REVALIDATE_SECONDS = 3600

export interface BlogSection {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
  table?: { head: string[]; rows: string[][] }
}

/** Ảnh bìa: đường dẫn public (/blog/covers/…) hoặc URL Supabase Storage, kèm kích thước thật (OG, next/image). */
export interface BlogCover {
  src: string
  width: number
  height: number
}

export interface BlogPost {
  id: string
  translationKey: string
  locale: Locale
  slug: string
  title: string
  /** Tiêu đề ngắn (~50 ký tự) cho thẻ <title> khi title đầy đủ quá dài. */
  metaTitle?: string
  description: string
  category: string
  cover: BlogCover
  /** ISO date, vd "2026-10-13" */
  publishedAt: string
  updatedAt?: string
  author: string
  readingMinutes: number
  /** Trả lời trực tiếp câu hỏi chính của bài trong 2–3 câu. */
  answer: string
  keyTakeaways: string[]
  sections: BlogSection[]
  faqs: Faq[]
  /** Trang liên quan để liên kết nội bộ — đường dẫn tiếng Việt, tự đổi sang ngôn ngữ của bài khi hiển thị. */
  relatedLinks: { href: string; label: string }[]
}

export type BlogStatus = "draft" | "published"

/** Một dòng của bảng blog_posts. */
export interface BlogPostRow {
  id: string
  translation_key: string
  locale: string
  slug: string
  status: BlogStatus
  title: string
  meta_title: string | null
  description: string
  category: string
  cover_url: string | null
  cover_width: number | null
  cover_height: number | null
  author: string
  reading_minutes: number | null
  answer: string
  key_takeaways: string[]
  sections: BlogSection[]
  faqs: Faq[]
  related_links: { href: string; label: string }[]
  published_at: string | null
  content_updated_at: string | null
  updated_at: string
}

/** Dữ liệu form soạn bài ở /admin/blog gửi lên server action savePost. */
export interface BlogPostInput {
  id?: string
  translationKey?: string
  locale: Locale
  slug: string
  status: BlogStatus
  title: string
  metaTitle: string
  description: string
  category: string
  coverUrl: string
  coverWidth: number | null
  coverHeight: number | null
  author: string
  /** null = tự ước lượng theo độ dài bài. */
  readingMinutes: number | null
  answer: string
  keyTakeaways: string[]
  sections: BlogSection[]
  faqs: Faq[]
  relatedLinks: { href: string; label: string }[]
  /** yyyy-mm-dd; trống khi đăng = hôm nay. */
  publishedAt: string
  contentUpdatedAt: string
}

/** Tác giả mặc định của bài mới theo ngôn ngữ (khớp các bài đã có). */
export const DEFAULT_BLOG_AUTHOR: Record<Locale, string> = {
  vi: "Đội ngũ Nextchain",
  ko: "넥스트체인 팀",
  en: "Nextchain Team",
}

export const BLOG_COLUMNS =
  "id, translation_key, locale, slug, status, title, meta_title, description, category, cover_url, cover_width, cover_height, author, reading_minutes, answer, key_takeaways, sections, faqs, related_links, published_at, content_updated_at, updated_at"

/** Ảnh dùng khi bài chưa có ảnh bìa. */
export const DEFAULT_BLOG_COVER: BlogCover = { src: "/og-image-1200x630.jpg", width: 1200, height: 630 }

/** Ước lượng thời gian đọc: tiếng Hàn ~500 ký tự/phút, tiếng Việt/Anh ~220 từ/phút. */
export function estimateReadingMinutes(
  locale: string,
  parts: Pick<BlogPostRow, "answer" | "key_takeaways" | "sections" | "faqs">,
) {
  const text = [
    parts.answer,
    ...parts.key_takeaways,
    ...parts.sections.flatMap((s) => [s.heading, ...(s.paragraphs ?? []), ...(s.bullets ?? []), ...(s.table?.rows.flat() ?? [])]),
    ...parts.faqs.flatMap((f) => [f.q, f.a]),
  ].join(" ")
  const minutes = locale === "ko" ? text.replace(/\s/g, "").length / 500 : text.split(/\s+/).filter(Boolean).length / 220
  return Math.max(1, Math.round(minutes))
}

export function rowToPost(row: BlogPostRow): BlogPost {
  return {
    id: row.id,
    translationKey: row.translation_key,
    locale: isLocale(row.locale) ? row.locale : "vi",
    slug: row.slug,
    title: row.title,
    metaTitle: row.meta_title ?? undefined,
    description: row.description,
    category: row.category,
    cover:
      row.cover_url && row.cover_width && row.cover_height
        ? { src: row.cover_url, width: row.cover_width, height: row.cover_height }
        : DEFAULT_BLOG_COVER,
    publishedAt: row.published_at ?? row.updated_at.slice(0, 10),
    updatedAt: row.content_updated_at ?? undefined,
    author: row.author,
    readingMinutes: row.reading_minutes ?? estimateReadingMinutes(row.locale, row),
    answer: row.answer,
    keyTakeaways: row.key_takeaways ?? [],
    sections: row.sections ?? [],
    faqs: row.faqs ?? [],
    relatedLinks: row.related_links ?? [],
  }
}

/** URL tuyệt đối của ảnh bìa (ảnh trong /public cần ghép domain, ảnh Supabase đã là URL đầy đủ). */
export function coverUrl(cover: BlogCover) {
  return /^https?:\/\//.test(cover.src) ? cover.src : absoluteUrl(cover.src)
}

// Client không có cookie: chỉ đọc được bài đã đăng (RLS), và không làm trang thành dynamic.
const publicClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
  auth: { persistSession: false, autoRefreshToken: false },
})

const loadPublishedRows = unstable_cache(
  async (): Promise<BlogPostRow[]> => {
    const { data, error } = await publicClient
      .from("blog_posts")
      .select(BLOG_COLUMNS)
      .eq("status", "published")
      .order("published_at", { ascending: false })
    // Ném lỗi thay vì trả mảng rỗng: lúc build thì build dừng (không deploy một blog trống), lúc làm mới
    // ISR thì Next giữ trang cũ.
    if (error) throw new Error(`Không đọc được blog từ Supabase: ${error.message}. Đã chạy supabase_blog.sql chưa?`)
    return data as BlogPostRow[]
  },
  ["blog-posts"],
  { tags: [BLOG_TAG], revalidate: REVALIDATE_SECONDS },
)

/** Mọi bài đã đăng, mọi ngôn ngữ, mới nhất trước. Bài hẹn giờ (ngày đăng ở tương lai) chưa hiện. */
export async function getAllPublishedPosts(): Promise<BlogPost[]> {
  const today = new Date().toISOString().slice(0, 10)
  return (await loadPublishedRows())
    .map(rowToPost)
    .filter((post) => post.publishedAt <= today)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

/** Bài đã đăng của một ngôn ngữ, mới nhất trước. */
export async function getBlogPosts(locale: Locale): Promise<BlogPost[]> {
  return (await getAllPublishedPosts()).filter((post) => post.locale === locale)
}

export async function getPostFor(locale: Locale, slug: string) {
  return (await getBlogPosts(locale)).find((post) => post.slug === slug)
}

/** Đường dẫn các bản dịch đã đăng của một bài (kể cả chính nó) — nguồn cho hreflang và sitemap. */
export function postAlternates(post: Pick<BlogPost, "translationKey">, all: BlogPost[]) {
  const paths: Partial<Record<Locale, string>> = {}
  for (const locale of LOCALES) {
    const translation = all.find((other) => other.translationKey === post.translationKey && other.locale === locale)
    if (translation) paths[locale] = sectionPath("blog", locale, translation.slug)
  }
  return paths
}
