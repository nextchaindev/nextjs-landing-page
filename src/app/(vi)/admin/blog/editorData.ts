import type { SupabaseClient } from "@supabase/supabase-js"
import type { BlogPostInput, BlogPostRow } from "@/lib/blog"
import type { Locale } from "@/i18n/config"

/** Dòng DB → dữ liệu form soạn bài. */
export function rowToInput(row: BlogPostRow): BlogPostInput {
  return {
    id: row.id,
    translationKey: row.translation_key,
    locale: row.locale as Locale,
    slug: row.slug,
    status: row.status,
    title: row.title,
    metaTitle: row.meta_title ?? "",
    description: row.description,
    category: row.category,
    coverUrl: row.cover_url ?? "",
    coverWidth: row.cover_width,
    coverHeight: row.cover_height,
    author: row.author,
    readingMinutes: row.reading_minutes,
    answer: row.answer,
    keyTakeaways: row.key_takeaways ?? [],
    sections: row.sections ?? [],
    faqs: row.faqs ?? [],
    relatedLinks: row.related_links ?? [],
    publishedAt: row.published_at ?? "",
    contentUpdatedAt: row.content_updated_at ?? "",
  }
}

/** Các chuyên mục đã dùng trong một ngôn ngữ — gợi ý cho ô Category. */
export async function categoriesFor(supabase: SupabaseClient, locale: Locale) {
  const { data } = await supabase.from("blog_posts").select("category").eq("locale", locale)
  return [...new Set((data ?? []).map((row) => row.category as string).filter(Boolean))].sort()
}
