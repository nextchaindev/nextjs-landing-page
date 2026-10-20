'use server'

import { revalidatePath, updateTag } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import { BLOG_TAG, estimateReadingMinutes, type BlogPostInput, type BlogSection } from '@/lib/blog'
import { isLocale, type Locale } from '@/i18n/config'
import { sectionPath } from '@/i18n/paths'

type Result = { ok: true; id: string } | { ok: false; error: string }

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/
const DATE = /^\d{4}-\d{2}-\d{2}$/

const text = (value: unknown, max: number) => (typeof value === 'string' ? value.trim().slice(0, max) : '')
const list = (value: unknown, maxItems: number, maxLength: number) =>
    Array.isArray(value) ? value.map((item) => text(item, maxLength)).filter(Boolean).slice(0, maxItems) : []

/** Ảnh bìa: file trong /public hoặc ảnh trong bucket "blog" của chính dự án Supabase này. */
function isAllowedCover(url: string) {
    if (url === '') return true
    if (url.startsWith('/') && !url.startsWith('//')) return true
    const base = process.env.NEXT_PUBLIC_SUPABASE_URL
    return Boolean(base) && url.startsWith(`${base}/storage/v1/object/public/blog/`)
}

function cleanSections(value: unknown): BlogSection[] {
    if (!Array.isArray(value)) return []
    return value.slice(0, 30).flatMap((raw) => {
        const section = raw as Record<string, unknown>
        const heading = text(section.heading, 200)
        if (!heading) return []
        const paragraphs = list(section.paragraphs, 30, 4000)
        const bullets = list(section.bullets, 50, 600)
        const table = section.table as { head?: unknown; rows?: unknown } | undefined
        const head = list(table?.head, 8, 200)
        const rows = Array.isArray(table?.rows)
            ? table.rows.slice(0, 50).map((row) => list(row, 8, 600)).filter((row) => row.length > 0)
            : []
        return [{
            heading,
            ...(paragraphs.length > 0 && { paragraphs }),
            ...(bullets.length > 0 && { bullets }),
            ...(head.length > 0 && rows.length > 0 && { table: { head, rows } }),
        }]
    })
}

function postPath(locale: string, slug: string) {
    return isLocale(locale) ? sectionPath('blog', locale, slug) : null
}

/** Làm mới mọi trang dùng blog (tag) và chắc chắn cả đường dẫn cũ/mới của bài. */
function refreshBlog(paths: (string | null)[]) {
    updateTag(BLOG_TAG)
    for (const path of paths) if (path) revalidatePath(path)
    revalidatePath('/admin/blog')
}

async function requireUser() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    return { supabase, user }
}

export async function savePost(input: BlogPostInput): Promise<Result> {
    const { supabase, user } = await requireUser()
    if (!user) return { ok: false, error: 'Unauthorized — please log in again.' }

    const locale: Locale | null = isLocale(input.locale) ? input.locale : null
    const status = input.status === 'published' ? 'published' : 'draft'
    const slug = text(input.slug, 120)
    const title = text(input.title, 200)
    const coverUrl = text(input.coverUrl, 500)
    const publishedAt = text(input.publishedAt, 10)
    const contentUpdatedAt = text(input.contentUpdatedAt, 10)

    if (!locale) return { ok: false, error: 'Invalid language.' }
    if (!title) return { ok: false, error: 'Title is required.' }
    if (!SLUG.test(slug)) return { ok: false, error: 'Slug may only contain lowercase letters, numbers and hyphens (e.g. website-spa-checklist).' }
    if (!isAllowedCover(coverUrl)) return { ok: false, error: 'Cover image must be uploaded here or be a path in /public.' }
    if ((publishedAt && !DATE.test(publishedAt)) || (contentUpdatedAt && !DATE.test(contentUpdatedAt))) {
        return { ok: false, error: 'Dates must be in YYYY-MM-DD format.' }
    }

    const row = {
        locale,
        slug,
        status,
        title,
        meta_title: text(input.metaTitle, 120) || null,
        description: text(input.description, 400),
        category: text(input.category, 80),
        cover_url: coverUrl || null,
        cover_width: coverUrl && Number.isInteger(input.coverWidth) ? input.coverWidth : null,
        cover_height: coverUrl && Number.isInteger(input.coverHeight) ? input.coverHeight : null,
        author: text(input.author, 120),
        answer: text(input.answer, 3000),
        key_takeaways: list(input.keyTakeaways, 12, 600),
        sections: cleanSections(input.sections),
        faqs: Array.isArray(input.faqs)
            ? input.faqs.slice(0, 20).map((faq) => ({ q: text(faq?.q, 300), a: text(faq?.a, 3000) })).filter((faq) => faq.q && faq.a)
            : [],
        related_links: Array.isArray(input.relatedLinks)
            ? input.relatedLinks
                .slice(0, 12)
                .map((link) => ({ href: text(link?.href, 300), label: text(link?.label, 120) }))
                .filter((link) => link.label && (/^\/(?!\/)/.test(link.href) || /^https:\/\//.test(link.href)))
            : [],
        published_at: publishedAt || (status === 'published' ? new Date().toISOString().slice(0, 10) : null),
        content_updated_at: contentUpdatedAt || null,
        updated_by: user.id,
    }

    if (status === 'published') {
        if (!row.description) return { ok: false, error: 'A published post needs a description (shown in Google and on the card).' }
        if (row.sections.length === 0) return { ok: false, error: 'A published post needs at least one section.' }
    }

    const minutes = Number(input.readingMinutes)
    const reading_minutes = Number.isInteger(minutes) && minutes > 0 && minutes < 120 ? minutes : estimateReadingMinutes(locale, row)

    let previousPath: string | null = null
    let id = input.id
    if (id) {
        const { data: previous } = await supabase.from('blog_posts').select('locale, slug').eq('id', id).maybeSingle()
        if (!previous) return { ok: false, error: 'Post not found (it may have been deleted).' }
        previousPath = postPath(previous.locale, previous.slug)
        const { error } = await supabase.from('blog_posts').update({ ...row, reading_minutes }).eq('id', id)
        if (error) return { ok: false, error: friendlyError(error) }
    } else {
        const translation_key = text(input.translationKey, 120) || slug
        const { data, error } = await supabase
            .from('blog_posts')
            .insert({ ...row, reading_minutes, translation_key })
            .select('id')
            .single()
        if (error) return { ok: false, error: friendlyError(error) }
        id = data.id as string
    }

    refreshBlog([previousPath, postPath(locale, slug), sectionPath('blog', locale)])
    return { ok: true, id: id! }
}

export async function deletePost(id: string): Promise<{ ok: boolean; error?: string }> {
    const { supabase, user } = await requireUser()
    if (!user) return { ok: false, error: 'Unauthorized — please log in again.' }

    const { data: previous } = await supabase.from('blog_posts').select('locale, slug').eq('id', id).maybeSingle()
    const { error } = await supabase.from('blog_posts').delete().eq('id', id)
    if (error) return { ok: false, error: error.message }

    if (previous) refreshBlog([postPath(previous.locale, previous.slug), isLocale(previous.locale) ? sectionPath('blog', previous.locale) : null])
    return { ok: true }
}

function friendlyError(error: { code?: string; message: string }) {
    if (error.code === '23505') {
        return error.message.includes('translation_key')
            ? 'This post already has a version in that language — edit the existing one instead.'
            : 'Another post in this language already uses that slug.'
    }
    if (error.code === '42P01') return 'Table blog_posts does not exist yet — run supabase_blog.sql in Supabase.'
    return error.message
}
