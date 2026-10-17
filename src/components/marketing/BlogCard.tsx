import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import type { BlogPost } from "@/content/blog"
import { CARD_TEXT } from "@/content/cardText"
import { LANGUAGE_TAGS, type Locale } from "@/i18n/config"
import { sectionPath } from "@/i18n/paths"

export const dateFormat = new Intl.DateTimeFormat("vi-VN", { dateStyle: "long" })

export function getDateFormat(locale: Locale) {
  return locale === "vi" ? dateFormat : new Intl.DateTimeFormat(LANGUAGE_TAGS[locale], { dateStyle: "long" })
}

export default function BlogCard({ post, locale = "vi" }: { post: BlogPost; index?: number; locale?: Locale }) {
  const href = sectionPath("blog", locale, post.slug)
  const text = CARD_TEXT[locale]
  const format = getDateFormat(locale)
  return (
    <article className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden
        className="relative aspect-[16/9] p-5 flex items-end overflow-hidden">
        <Image
          src={post.cover}
          alt=""
          fill
          sizes="(min-width: 768px) 380px, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
        <span className="relative px-3 py-1 rounded-full bg-white/90 text-gray-900 text-xs font-semibold">
          {post.category}
        </span>
      </Link>
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <time dateTime={post.publishedAt}>{format.format(new Date(post.publishedAt))}</time>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {text.readMinutes.replace("{n}", String(post.readingMinutes))}
          </span>
        </div>
        <h3 className="mt-3 text-lg font-bold text-gray-900 leading-snug">
          <Link href={href} className="hover:text-primary">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed flex-1">{post.description}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          {text.readArticle} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  )
}
