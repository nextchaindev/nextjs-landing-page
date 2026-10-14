import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, CheckCircle2, Clock, Lightbulb } from "lucide-react"
import PageHeader from "@/components/marketing/PageHeader"
import Reveal from "@/components/marketing/Reveal"
import BlogCard, { dateFormat } from "@/components/marketing/BlogCard"
import FaqSection from "@/components/marketing/FaqSection"
import CtaBanner from "@/components/marketing/CtaBanner"
import JsonLdScript from "@/components/marketing/JsonLdScript"
import { pageMetadata } from "@/lib/seo"
import { SITE_URL, absoluteUrl } from "@/lib/site"
import { BLOG_POSTS, getPost, sortedPosts } from "@/content/blog"

export const dynamicParams = false

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  const metadata = pageMetadata({
    title: post.metaTitle ?? post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  })
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author],
    },
  }
}

function sectionId(idx: number) {
  return `muc-${idx + 1}`
}

/**
 * Tác giả bài viết. Mặc định là Organization; đặt NEXT_PUBLIC_BLOG_AUTHOR_NAME
 * (ví dụ tên founder) để Google/AI thấy tác giả là người thật — tín hiệu
 * E-E-A-T mạnh hơn cho nội dung mang tính chuyên môn.
 */
function authorSchema(postAuthor: string) {
  const personName = process.env.NEXT_PUBLIC_BLOG_AUTHOR_NAME
  const personJob = process.env.NEXT_PUBLIC_BLOG_AUTHOR_JOB
  if (personName) {
    return {
      "@type": "Person",
      name: personName,
      ...(personJob && { jobTitle: personJob }),
      worksFor: { "@id": `${SITE_URL}#organization` },
    }
  }
  return { "@type": "Organization", name: postAuthor, url: SITE_URL }
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()
  const path = `/blog/${post.slug}`
  const modified = post.updatedAt ?? post.publishedAt
  const morePosts = sortedPosts().filter((other) => other.slug !== post.slug).slice(0, 3)

  return (
    <>
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.publishedAt,
          dateModified: modified,
          inLanguage: "vi-VN",
          articleSection: post.category,
          image: absoluteUrl(post.cover.src),
          author: authorSchema(post.author),
          publisher: { "@id": `${SITE_URL}#organization` },
          mainEntityOfPage: absoluteUrl(path),
        }}
      />
      <PageHeader
        crumbs={[
          { name: "Blog", path: "/blog" },
          { name: post.title, path },
        ]}
        eyebrow={post.category}
        title={post.title}
        intro={post.description}
        image={post.cover}
        imageAlt={post.title}>
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
          <span>{post.author}</span>
          <time dateTime={modified}>
            {post.updatedAt ? "Cập nhật " : ""}
            {dateFormat.format(new Date(modified))}
          </time>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {post.readingMinutes} phút đọc
          </span>
        </p>
      </PageHeader>

      <div className="px-4 md:px-6 pb-8">
        <div className="max-w-[1100px] mx-auto grid lg:grid-cols-[1fr_280px] gap-12">
          <article className="min-w-0">
            <Reveal className="rounded-2xl bg-linear-to-br from-orange-50 to-amber-50 border border-orange-200 p-6 md:p-8">
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
                <Lightbulb className="w-4 h-4" /> Trả lời nhanh
              </p>
              <p className="mt-3 text-gray-900 leading-relaxed md:text-lg">{post.answer}</p>
            </Reveal>

            <Reveal className="mt-8 rounded-2xl border border-gray-200 p-6 md:p-8">
              <h2 className="font-bold text-gray-900 text-lg mb-4">Ý chính</h2>
              <ul className="space-y-3">
                {post.keyTakeaways.map((item) => (
                  <li key={item} className="flex gap-3 text-gray-800">
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-green-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            {post.sections.map((section, idx) => (
              <Reveal key={section.heading} className="mt-12">
                <section id={sectionId(idx)} className="scroll-mt-28">
                  <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-4 leading-snug">
                    {section.heading}
                  </h2>
                  {section.paragraphs?.map((paragraph, pIdx) => (
                    <p key={pIdx} className="mb-4 text-gray-800 leading-relaxed md:text-lg">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="mb-4 space-y-2 list-disc pl-6 text-gray-800 md:text-lg marker:text-primary">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="leading-relaxed">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.table && (
                    <div className="overflow-x-auto rounded-2xl border border-gray-200">
                      <table className="w-full text-left text-sm md:text-base">
                        <thead className="bg-gray-50">
                          <tr>
                            {section.table.head.map((cell) => (
                              <th key={cell} scope="col" className="px-4 py-3 font-semibold text-gray-900">
                                {cell}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {section.table.rows.map((row) => (
                            <tr key={row[0]} className="hover:bg-orange-50/50 transition-colors">
                              {row.map((cell, cIdx) =>
                                cIdx === 0 ? (
                                  <th key={cIdx} scope="row" className="px-4 py-3 font-semibold text-gray-900">
                                    {cell}
                                  </th>
                                ) : (
                                  <td key={cIdx} className="px-4 py-3 text-gray-700">
                                    {cell}
                                  </td>
                                ),
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              </Reveal>
            ))}
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              <nav aria-label="Mục lục" className="rounded-2xl border border-gray-200 p-5">
                <p className="font-bold text-gray-900 mb-3">Mục lục</p>
                <ol className="space-y-2 text-sm">
                  {post.sections.map((section, idx) => (
                    <li key={section.heading}>
                      <a href={`#${sectionId(idx)}`} className="text-gray-600 hover:text-primary">
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
              <div className="rounded-2xl bg-[#111827] text-white p-5">
                <p className="font-bold">Cần tư vấn website?</p>
                <p className="mt-2 text-sm text-gray-300">Nextchain phản hồi trong 24 giờ làm việc.</p>
                <Link href="/lien-he" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-orange-400">
                  Liên hệ ngay <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {post.faqs.length > 0 && <FaqSection faqs={post.faqs} />}

      <section className="px-4 md:px-6 pb-16">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Trang liên quan</h2>
          <ul className="grid sm:grid-cols-3 gap-4">
            {post.relatedLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-center justify-between gap-3 h-full rounded-2xl border border-gray-200 p-5 font-semibold text-gray-900 hover:border-primary hover:text-primary transition-colors">
                  {link.label}
                  <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {morePosts.length > 0 && (
        <section className="px-4 md:px-6 pb-20">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Bài viết khác</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {morePosts.map((other, idx) => (
                <BlogCard key={other.slug} post={other} index={idx + 1} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner />
    </>
  )
}
