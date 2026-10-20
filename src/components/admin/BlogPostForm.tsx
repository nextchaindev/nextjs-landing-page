"use client"

import { useEffect, useState, useTransition } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowDown, ArrowUp, Plus, Trash2, Upload } from "lucide-react"
import { createClient } from "@/utils/supabase/client"
import { deletePost, savePost } from "@/app/(vi)/admin/blog/actions"
import type { BlogPostInput, BlogSection, BlogStatus } from "@/lib/blog"
import { LOCALES, LOCALE_NAMES, type Locale } from "@/i18n/config"
import { cn } from "@/components/ui/utils"

/** Một mục của bài ở dạng dễ gõ: đoạn văn cách nhau dòng trống, bullet mỗi dòng một ý, bảng phân cách bằng "|". */
interface SectionDraft {
  heading: string
  paragraphs: string
  bullets: string
  table: string
}

interface Draft extends Omit<BlogPostInput, "keyTakeaways" | "sections" | "relatedLinks" | "readingMinutes"> {
  keyTakeaways: string
  sections: SectionDraft[]
  relatedLinks: string
  readingMinutes: string
}

const TITLE_SUFFIX = " | Nextchain.site"
const COVER_MAX_WIDTH = 1600

const lines = (value: string) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)

/** Bỏ ô rỗng ở hai đầu khi người gõ viết "| a | b |". */
const cells = (row: string) => {
  const parts = row.split("|").map((cell) => cell.trim())
  if (parts[0] === "") parts.shift()
  if (parts.at(-1) === "") parts.pop()
  return parts
}

function toDraft(input: BlogPostInput): Draft {
  return {
    ...input,
    keyTakeaways: input.keyTakeaways.join("\n"),
    sections: input.sections.map((section) => ({
      heading: section.heading,
      paragraphs: (section.paragraphs ?? []).join("\n\n"),
      bullets: (section.bullets ?? []).join("\n"),
      table: section.table ? [section.table.head, ...section.table.rows].map((row) => row.join(" | ")).join("\n") : "",
    })),
    relatedLinks: input.relatedLinks.map((link) => `${link.href} | ${link.label}`).join("\n"),
    readingMinutes: input.readingMinutes ? String(input.readingMinutes) : "",
  }
}

function fromDraft(draft: Draft, status: BlogStatus): BlogPostInput {
  const sections: BlogSection[] = draft.sections.map((section) => {
    const rows = lines(section.table).map(cells)
    return {
      heading: section.heading.trim(),
      paragraphs: section.paragraphs
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.replace(/\s*\n\s*/g, " ").trim())
        .filter(Boolean),
      bullets: lines(section.bullets).map((bullet) => bullet.replace(/^[-*•]\s+/, "")),
      ...(rows.length >= 2 && { table: { head: rows[0], rows: rows.slice(1) } }),
    }
  })
  return {
    ...draft,
    status,
    keyTakeaways: lines(draft.keyTakeaways),
    sections,
    faqs: draft.faqs.filter((faq) => faq.q.trim() && faq.a.trim()),
    relatedLinks: lines(draft.relatedLinks).flatMap((line) => {
      const [href, ...label] = line.split("|")
      return href?.trim() && label.join("|").trim() ? [{ href: href.trim(), label: label.join("|").trim() }] : []
    }),
    readingMinutes: draft.readingMinutes ? Number(draft.readingMinutes) : null,
  }
}

/** Slug từ tiêu đề: bỏ dấu tiếng Việt, chữ thường, gạch nối. Tiêu đề tiếng Hàn cho ra rỗng → gõ slug tiếng Anh. */
function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/, "")
}

/** Thu nhỏ ảnh về tối đa 1600px ngang, xuất WebP — ảnh bìa nhẹ mà không cần xử lý phía server. */
async function compressImage(file: File) {
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, COVER_MAX_WIDTH / bitmap.width)
  const width = Math.round(bitmap.width * scale)
  const height = Math.round(bitmap.height * scale)
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, width, height)
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", 0.82))
  if (!blob) throw new Error("Could not process the image")
  return { blob, width, height }
}

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"

function Field({
  label,
  hint,
  counter,
  children,
}: {
  label: string
  hint?: React.ReactNode
  counter?: { value: number; min?: number; max: number }
  children: React.ReactNode
}) {
  const bad = counter && (counter.value > counter.max || (counter.min !== undefined && counter.value > 0 && counter.value < counter.min))
  return (
    <label className="block space-y-1">
      <span className="flex items-center justify-between text-sm font-semibold text-gray-800">
        {label}
        {counter && (
          <span className={cn("text-xs font-normal", bad ? "text-red-600" : "text-gray-400")}>
            {counter.value}/{counter.min !== undefined ? `${counter.min}–` : ""}
            {counter.max}
          </span>
        )}
      </span>
      {children}
      {hint && <span className="block text-xs text-gray-500">{hint}</span>}
    </label>
  )
}

interface BlogPostFormProps {
  initial: BlogPostInput
  /** Trạng thái đang lưu trong DB (bài mới = draft). */
  savedStatus: BlogStatus
  categories: string[]
  publicPath?: string
}

export default function BlogPostForm({ initial, savedStatus, categories, publicPath }: BlogPostFormProps) {
  const router = useRouter()
  const [draft, setDraft] = useState<Draft>(() => toDraft(initial))
  const [slugTouched, setSlugTouched] = useState(Boolean(initial.slug))
  const [dirty, setDirty] = useState(false)
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null)
  const [uploading, setUploading] = useState(false)
  const [pending, startTransition] = useTransition()
  const isNew = !initial.id

  useEffect(() => {
    if (!dirty) return
    const warn = (event: BeforeUnloadEvent) => event.preventDefault()
    window.addEventListener("beforeunload", warn)
    return () => window.removeEventListener("beforeunload", warn)
  }, [dirty])

  const update = (patch: Partial<Draft>) => {
    setDraft((current) => ({ ...current, ...patch }))
    setDirty(true)
  }
  const updateSection = (index: number, patch: Partial<SectionDraft>) =>
    update({ sections: draft.sections.map((section, i) => (i === index ? { ...section, ...patch } : section)) })
  const moveSection = (index: number, offset: number) => {
    const sections = [...draft.sections]
    const [moved] = sections.splice(index, 1)
    sections.splice(index + offset, 0, moved)
    update({ sections })
  }

  const save = (status: BlogStatus) => {
    setMessage(null)
    startTransition(async () => {
      const result = await savePost(fromDraft(draft, status))
      if (!result.ok) {
        setMessage({ type: "error", text: result.error })
        return
      }
      setDirty(false)
      setMessage({ type: "success", text: status === "published" ? "Saved and live on the website." : "Draft saved." })
      if (isNew) router.replace(`/admin/blog/${result.id}`)
      else router.refresh()
    })
  }

  const remove = () => {
    if (!initial.id || !window.confirm("Delete this language version permanently? This cannot be undone.")) return
    startTransition(async () => {
      const result = await deletePost(initial.id!)
      if (!result.ok) return setMessage({ type: "error", text: result.error ?? "Delete failed" })
      setDirty(false)
      router.push("/admin/blog")
    })
  }

  const uploadCover = async (file: File) => {
    setUploading(true)
    setMessage(null)
    try {
      const { blob, width, height } = await compressImage(file)
      const supabase = createClient()
      const path = `covers/${Date.now()}-${draft.slug || "cover"}.webp`
      const { error } = await supabase.storage
        .from("blog")
        .upload(path, blob, { contentType: "image/webp", cacheControl: "31536000", upsert: false })
      if (error) throw error
      update({ coverUrl: supabase.storage.from("blog").getPublicUrl(path).data.publicUrl, coverWidth: width, coverHeight: height })
    } catch (error) {
      setMessage({ type: "error", text: `Upload failed: ${error instanceof Error ? error.message : String(error)}` })
    } finally {
      setUploading(false)
    }
  }

  /** Dán đường dẫn ảnh bằng tay: đo kích thước thật để khai báo OG/next/image đúng. */
  const measureCover = (url: string) => {
    if (!url) return update({ coverUrl: "", coverWidth: null, coverHeight: null })
    const img = new window.Image()
    img.onload = () => update({ coverWidth: img.naturalWidth, coverHeight: img.naturalHeight })
    img.src = url
  }

  const shownTitle = (draft.metaTitle || draft.title).length + TITLE_SUFFIX.length
  const slugChanged = savedStatus === "published" && !isNew && draft.slug !== initial.slug

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className="space-y-6">
        <section className="space-y-4 rounded-xl border bg-white p-5">
          <Field label="Title" counter={{ value: draft.title.length, max: 120 }}>
            <input
              className={cn(inputClass, "text-base font-semibold")}
              value={draft.title}
              onChange={(event) =>
                update({ title: event.target.value, ...(!slugTouched && isNew && { slug: slugify(event.target.value) }) })
              }
              placeholder="Write the title as the question readers search for"
            />
          </Field>
          <Field
            label="Description"
            counter={{ value: draft.description.length, min: 70, max: 160 }}
            hint="Shown in Google results and on the blog card.">
            <textarea className={inputClass} rows={3} value={draft.description} onChange={(e) => update({ description: e.target.value })} />
          </Field>
          <Field label="Quick answer" hint="2–3 sentences that directly answer the main question. Shown first; AI search engines quote it.">
            <textarea className={inputClass} rows={4} value={draft.answer} onChange={(e) => update({ answer: e.target.value })} />
          </Field>
          <Field label="Key takeaways" hint="One per line.">
            <textarea className={inputClass} rows={4} value={draft.keyTakeaways} onChange={(e) => update({ keyTakeaways: e.target.value })} />
          </Field>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Sections</h2>
            <span className="text-xs text-gray-500">Each section becomes an H2 and an entry in the table of contents.</span>
          </div>
          {draft.sections.map((section, index) => (
            <div key={index} className="space-y-3 rounded-xl border bg-white p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase text-gray-400">Section {index + 1}</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    aria-label="Move up"
                    disabled={index === 0}
                    onClick={() => moveSection(index, -1)}
                    className="rounded p-1 text-gray-500 hover:bg-gray-100 disabled:opacity-30">
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Move down"
                    disabled={index === draft.sections.length - 1}
                    onClick={() => moveSection(index, 1)}
                    className="rounded p-1 text-gray-500 hover:bg-gray-100 disabled:opacity-30">
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Remove section"
                    onClick={() => update({ sections: draft.sections.filter((_, i) => i !== index) })}
                    className="rounded p-1 text-red-500 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <Field label="Heading" hint="Phrase it as a question where possible.">
                <input className={inputClass} value={section.heading} onChange={(e) => updateSection(index, { heading: e.target.value })} />
              </Field>
              <Field label="Paragraphs" hint="Leave a blank line between paragraphs.">
                <textarea
                  className={inputClass}
                  rows={5}
                  value={section.paragraphs}
                  onChange={(e) => updateSection(index, { paragraphs: e.target.value })}
                />
              </Field>
              <Field label="Bullet list" hint="One item per line (optional).">
                <textarea className={inputClass} rows={3} value={section.bullets} onChange={(e) => updateSection(index, { bullets: e.target.value })} />
              </Field>
              <Field label="Table" hint={<>First line is the header row; separate cells with |. Example: <code>Option | Price | Notes</code></>}>
                <textarea
                  className={cn(inputClass, "font-mono text-xs")}
                  rows={3}
                  value={section.table}
                  onChange={(e) => updateSection(index, { table: e.target.value })}
                />
              </Field>
            </div>
          ))}
          <button
            type="button"
            onClick={() => update({ sections: [...draft.sections, { heading: "", paragraphs: "", bullets: "", table: "" }] })}
            className="inline-flex items-center gap-2 rounded-lg border border-dashed border-gray-400 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-indigo-500 hover:text-indigo-600">
            <Plus className="h-4 w-4" /> Add section
          </button>
        </section>

        <section className="space-y-4 rounded-xl border bg-white p-5">
          <h2 className="text-lg font-bold text-gray-900">FAQ</h2>
          {draft.faqs.map((faq, index) => (
            <div key={index} className="grid gap-2 rounded-lg bg-gray-50 p-3">
              <div className="flex gap-2">
                <input
                  className={inputClass}
                  placeholder="Question"
                  value={faq.q}
                  onChange={(e) => update({ faqs: draft.faqs.map((f, i) => (i === index ? { ...f, q: e.target.value } : f)) })}
                />
                <button
                  type="button"
                  aria-label="Remove question"
                  onClick={() => update({ faqs: draft.faqs.filter((_, i) => i !== index) })}
                  className="rounded p-2 text-red-500 hover:bg-red-50">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <textarea
                className={inputClass}
                rows={2}
                placeholder="Answer"
                value={faq.a}
                onChange={(e) => update({ faqs: draft.faqs.map((f, i) => (i === index ? { ...f, a: e.target.value } : f)) })}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => update({ faqs: [...draft.faqs, { q: "", a: "" }] })}
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:underline">
            <Plus className="h-4 w-4" /> Add question
          </button>
        </section>

        <section className="rounded-xl border bg-white p-5">
          <Field
            label="Related pages"
            hint={
              <>
                One per line: <code>/bang-gia | Bảng giá</code>. Use Vietnamese paths — Korean/English posts translate them automatically
                (pages without a translation are skipped). Linking to <code>/giai-phap/…</code> also lists this post on that solution page.
              </>
            }>
            <textarea
              className={cn(inputClass, "font-mono text-xs")}
              rows={4}
              value={draft.relatedLinks}
              onChange={(e) => update({ relatedLinks: e.target.value })}
            />
          </Field>
        </section>
      </div>

      <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
        <section className="space-y-3 rounded-xl border bg-white p-5">
          <p className="text-sm">
            Status:{" "}
            <span className={cn("font-semibold", savedStatus === "published" ? "text-green-700" : "text-gray-700")}>
              {isNew ? "Not saved yet" : savedStatus === "published" ? "Published" : "Draft"}
            </span>
            {dirty && <span className="ml-2 text-xs text-amber-600">• unsaved changes</span>}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              disabled={pending || uploading}
              onClick={() => save("draft")}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 disabled:opacity-50">
              {savedStatus === "published" && !isNew ? "Unpublish" : "Save draft"}
            </button>
            <button
              type="button"
              disabled={pending || uploading}
              onClick={() => save("published")}
              className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50">
              {savedStatus === "published" && !isNew ? "Update" : "Publish"}
            </button>
          </div>
          {message && (
            <p className={cn("rounded-lg p-2 text-sm", message.type === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700")}>
              {message.text}
            </p>
          )}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {!isNew && (
              <a href={`/admin/blog/${initial.id}/preview`} target="_blank" rel="noopener" className="font-semibold text-indigo-600 hover:underline">
                Preview
              </a>
            )}
            {publicPath && (
              <a href={publicPath} target="_blank" rel="noopener" className="text-gray-600 hover:underline">
                View live
              </a>
            )}
            {!isNew && (
              <button type="button" onClick={remove} disabled={pending} className="ml-auto text-red-600 hover:underline">
                Delete
              </button>
            )}
          </div>
        </section>

        <section className="space-y-4 rounded-xl border bg-white p-5">
          <Field label="Language" hint={isNew ? undefined : "Language can't change after saving — add a translation instead."}>
            <select
              className={inputClass}
              value={draft.locale}
              disabled={!isNew}
              onChange={(e) => update({ locale: e.target.value as Locale })}>
              {LOCALES.map((locale) => (
                <option key={locale} value={locale}>
                  {LOCALE_NAMES[locale].full}
                </option>
              ))}
            </select>
          </Field>
          <Field
            label="Slug (URL)"
            hint={
              slugChanged ? (
                <span className="text-amber-700">Changing the URL of a published post breaks existing links and Google results.</span>
              ) : (
                "Lowercase letters, numbers and hyphens. Korean posts need an English slug."
              )
            }>
            <input
              className={cn(inputClass, "font-mono text-xs")}
              value={draft.slug}
              onChange={(e) => {
                setSlugTouched(true)
                update({ slug: e.target.value.toLowerCase() })
              }}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Publish date" hint="Future date = scheduled.">
              <input type="date" className={inputClass} value={draft.publishedAt} onChange={(e) => update({ publishedAt: e.target.value })} />
            </Field>
            <Field label="Updated on" hint="Shown as “Updated”.">
              <input
                type="date"
                className={inputClass}
                value={draft.contentUpdatedAt}
                onChange={(e) => update({ contentUpdatedAt: e.target.value })}
              />
            </Field>
          </div>
        </section>

        <section className="space-y-3 rounded-xl border bg-white p-5">
          <span className="text-sm font-semibold text-gray-800">Cover image</span>
          {draft.coverUrl && draft.coverWidth && draft.coverHeight ? (
            <Image
              src={draft.coverUrl}
              alt=""
              width={draft.coverWidth}
              height={draft.coverHeight}
              unoptimized
              className="w-full rounded-lg border object-cover"
            />
          ) : (
            <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed text-xs text-gray-400">
              No cover — the default image is used
            </div>
          )}
          <label
            className={cn(
              "flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50",
              uploading && "pointer-events-none opacity-50",
            )}>
            <Upload className="h-4 w-4" /> {uploading ? "Uploading…" : "Upload image"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) uploadCover(file)
                e.target.value = ""
              }}
            />
          </label>
          <Field label="…or image URL / path" hint="Resized to max 1600px and converted to WebP on upload.">
            <input
              className={cn(inputClass, "font-mono text-xs")}
              value={draft.coverUrl}
              onChange={(e) => update({ coverUrl: e.target.value })}
              onBlur={(e) => measureCover(e.target.value.trim())}
            />
          </Field>
        </section>

        <section className="space-y-4 rounded-xl border bg-white p-5">
          <Field label="Category">
            <input className={inputClass} list="blog-categories" value={draft.category} onChange={(e) => update({ category: e.target.value })} />
            <datalist id="blog-categories">
              {categories.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
          </Field>
          <Field label="Author">
            <input className={inputClass} value={draft.author} onChange={(e) => update({ author: e.target.value })} />
          </Field>
          <Field label="Reading time (minutes)" hint="Leave empty to calculate automatically.">
            <input
              type="number"
              min={1}
              max={60}
              className={inputClass}
              value={draft.readingMinutes}
              onChange={(e) => update({ readingMinutes: e.target.value })}
            />
          </Field>
          <Field
            label="SEO title (optional)"
            counter={{ value: shownTitle, max: 60 }}
            hint={`Shorter title for Google when the full title is long. Counter includes “${TITLE_SUFFIX}”.`}>
            <input className={inputClass} value={draft.metaTitle} onChange={(e) => update({ metaTitle: e.target.value })} />
          </Field>
        </section>
      </aside>
    </div>
  )
}
