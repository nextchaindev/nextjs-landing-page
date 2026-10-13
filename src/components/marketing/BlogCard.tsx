import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import type { BlogPost } from "@/content/blog"

const COVER_GRADIENTS = [
  "from-orange-400 via-orange-300 to-amber-200",
  "from-blue-500 via-blue-400 to-cyan-300",
  "from-purple-500 via-fuchsia-400 to-pink-300",
  "from-emerald-500 via-teal-400 to-cyan-200",
]

export const dateFormat = new Intl.DateTimeFormat("vi-VN", { dateStyle: "long" })

export default function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const href = `/blog/${post.slug}`
  return (
    <article className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden
        className={`relative aspect-[16/9] bg-linear-to-br ${COVER_GRADIENTS[index % COVER_GRADIENTS.length]} p-6 flex items-end overflow-hidden`}>
        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/20 transition-transform duration-700 group-hover:scale-150" />
        <span className="relative px-3 py-1 rounded-full bg-white/90 text-gray-900 text-xs font-semibold">
          {post.category}
        </span>
      </Link>
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <time dateTime={post.publishedAt}>{dateFormat.format(new Date(post.publishedAt))}</time>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {post.readingMinutes} phút đọc
          </span>
        </div>
        <h3 className="mt-3 text-lg font-bold text-gray-900 leading-snug">
          <Link href={href} className="hover:text-primary">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed flex-1">{post.description}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          Đọc bài <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  )
}
