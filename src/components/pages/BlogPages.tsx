import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, CheckCircle2, Clock, Lightbulb } from "lucide-react"
import PageHeader from "@/components/marketing/PageHeader"
import Section from "@/components/marketing/Section"
import Reveal from "@/components/marketing/Reveal"
import BlogCard, { getDateFormat } from "@/components/marketing/BlogCard"
import FaqSection from "@/components/marketing/FaqSection"
import CtaBanner from "@/components/marketing/CtaBanner"
import JsonLdScript from "@/components/marketing/JsonLdScript"
import { pageMetadata } from "@/lib/seo"
import { SITE_URL, absoluteUrl } from "@/lib/site"
import { coverUrl, getAllPublishedPosts, getBlogPosts, postAlternates, type BlogPost } from "@/lib/blog"
import { BLOG_COPY } from "@/content/pageCopy/blog"
import { CARD_TEXT } from "@/content/cardText"
import { getDictionary } from "@/i18n/dictionaries"
import { DEFAULT_LOCALE, LANGUAGE_TAGS, type Locale } from "@/i18n/config"
import { sectionPath } from "@/i18n/paths"
import { localizeHref } from "@/i18n/routes"

/* -------------------------------- /blog -------------------------------- */

export async function blogIndexMetadata(locale: Locale) {
  const copy = BLOG_COPY[locale].index
  return pageMetadata({
    title: copy.metaTitle,
    description: copy.metaDescription,
    path: sectionPath("blog", locale),
    noindex: (await getBlogPosts(locale)).length === 0,
    locale,
  })
}

export async function BlogIndexPage({ locale }: { locale: Locale }) {
  const copy = BLOG_COPY[locale].index
  const posts = await getBlogPosts(locale)

  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[{ name: copy.crumb, path: sectionPath("blog", locale) }]}
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
      />
      <Section>
        {posts.length === 0 ? (
          <p className="text-center text-gray-600">
            {copy.emptyBefore}
            <Link href={sectionPath("services", locale)} className="text-primary underline">
              {copy.emptyLink}
            </Link>
            {copy.emptyAfter}
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, idx) => (
              <BlogCard key={post.slug} post={post} index={idx} locale={locale} />
            ))}
          </div>
        )}
      </Section>
      <CtaBanner locale={locale} />
    </>
  )
}

/* ---------------------------- /blog/[slug] ---------------------------- */

export async function blogStaticParams(locale: Locale) {
  return (await getBlogPosts(locale)).map((post) => ({ slug: post.slug }))
}

export async function blogPostMetadata(locale: Locale, slug: string) {
  const all = await getAllPublishedPosts()
  const post = all.find((other) => other.locale === locale && other.slug === slug)
  if (!post) return {}
  const metadata = pageMetadata({
    title: post.metaTitle ?? post.title,
    description: post.description,
    path: sectionPath("blog", locale, post.slug),
    ogImage: { ...post.cover, src: coverUrl(post.cover) },
    locale,
    alternates: postAlternates(post, all),
  })
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article" as const,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author],
    },
  }
}

export async function BlogPostPage({ locale, slug }: { locale: Locale; slug: string }) {
  const posts = await getBlogPosts(locale)
  const post = posts.find((other) => other.slug === slug)
  if (!post) notFound()
  return <BlogPostView post={post} locale={locale} morePosts={posts.filter((other) => other.slug !== post.slug).slice(0, 3)} />
}

function sectionId(idx: number, prefix: string) {
  return `${prefix}-${idx + 1}`
}

/**
 * Tác giả bài viết. Mặc định là Organization; đặt NEXT_PUBLIC_BLOG_AUTHOR_NAME (ví dụ tên founder) để Google/AI thấy
 * tác giả là người thật — tín hiệu E-E-A-T mạnh hơn cho nội dung mang tính chuyên môn.
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

/**
 * Liên kết "Trang liên quan" lưu theo đường dẫn tiếng Việt và tự đổi sang ngôn ngữ của bài; trang đích chưa dịch thì bỏ.
 * Đường dẫn đã có tiền tố ngôn ngữ của bài (/en/…) hoặc URL ngoài giữ nguyên.
 */
function localizeRelated(links: BlogPost["relatedLinks"], locale: Locale) {
  if (locale === DEFAULT_LOCALE) return links
  return links.flatMap((link) => {
    if (/^https?:\/\//.test(link.href) || link.href === `/${locale}` || link.href.startsWith(`/${locale}/`)) return [link]
    const href = localizeHref(link.href, locale)
    return href === undefined ? [] : [{ ...link, href }]
  })
}

/** Nội dung một bài — dùng cho trang public và trang xem trước bài nháp trong admin. */
export function BlogPostView({ post, locale, morePosts }: { post: BlogPost; locale: Locale; morePosts: BlogPost[] }) {
  const copy = BLOG_COPY[locale].post
  const path = sectionPath("blog", locale, post.slug)
  const modified = post.updatedAt ?? post.publishedAt
  const format = getDateFormat(locale)
  const related = localizeRelated(post.relatedLinks, locale)
  const anchor = copy.sectionAnchor

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
          inLanguage: LANGUAGE_TAGS[locale],
          articleSection: post.category,
          image: coverUrl(post.cover),
          author: authorSchema(post.author),
          publisher: { "@id": `${SITE_URL}#organization` },
          mainEntityOfPage: absoluteUrl(path),
        }}
      />
      <PageHeader
        locale={locale}
        crumbs={[
          { name: BLOG_COPY[locale].index.crumb, path: sectionPath("blog", locale) },
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
            {post.updatedAt ? copy.updated : ""}
            {format.format(new Date(modified))}
          </time>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {CARD_TEXT[locale].readMinutes.replace("{n}", String(post.readingMinutes))}
          </span>
        </p>
      </PageHeader>

      <div className="px-4 md:px-6 pb-8">
        <div className="max-w-[1100px] mx-auto grid lg:grid-cols-[1fr_280px] gap-12">
          <article className="min-w-0">
            {post.answer && (
              <Reveal className="rounded-2xl bg-linear-to-br from-orange-50 to-amber-50 border border-orange-200 p-6 md:p-8">
                <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
                  <Lightbulb className="w-4 h-4" /> {copy.quickAnswer}
                </p>
                <p className="mt-3 text-gray-900 leading-relaxed md:text-lg">{post.answer}</p>
              </Reveal>
            )}

            {post.keyTakeaways.length > 0 && (
              <Reveal className="mt-8 rounded-2xl border border-gray-200 p-6 md:p-8">
                <h2 className="font-bold text-gray-900 text-lg mb-4">{copy.keyTakeaways}</h2>
                <ul className="space-y-3">
                  {post.keyTakeaways.map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-gray-800">
                      <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-green-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {post.sections.map((section, idx) => (
              <Reveal key={idx} className="mt-12">
                <section id={sectionId(idx, anchor)} className="scroll-mt-28">
                  <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-4 leading-snug">{section.heading}</h2>
                  {section.paragraphs?.map((paragraph, pIdx) => (
                    <p key={pIdx} className="mb-4 text-gray-800 leading-relaxed md:text-lg">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="mb-4 space-y-2 list-disc pl-6 text-gray-800 md:text-lg marker:text-primary">
                      {section.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="leading-relaxed">
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
                            {section.table.head.map((cell, cIdx) => (
                              <th key={cIdx} scope="col" className="px-4 py-3 font-semibold text-gray-900">
                                {cell}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {section.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-orange-50/50 transition-colors">
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
              {post.sections.length > 0 && (
                <nav aria-label={copy.toc} className="rounded-2xl border border-gray-200 p-5">
                  <p className="font-bold text-gray-900 mb-3">{copy.toc}</p>
                  <ol className="space-y-2 text-sm">
                    {post.sections.map((section, idx) => (
                      <li key={idx}>
                        <a href={`#${sectionId(idx, anchor)}`} className="text-gray-600 hover:text-primary">
                          {section.heading}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
              <div className="rounded-2xl bg-[#111827] text-white p-5">
                <p className="font-bold">{copy.needHelp}</p>
                <p className="mt-2 text-sm text-gray-300">{copy.replyTime}</p>
                <Link
                  href={sectionPath("contact", locale)}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-orange-400">
                  {copy.contactNow} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {post.faqs.length > 0 && <FaqSection faqs={post.faqs} title={getDictionary(locale).faq.title} />}

      {related.length > 0 && (
        <section className="px-4 md:px-6 pb-16">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{copy.related}</h2>
            <ul className="grid sm:grid-cols-3 gap-4">
              {related.map((link) => (
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
      )}

      {morePosts.length > 0 && (
        <section className="px-4 md:px-6 pb-20">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6">{copy.morePosts}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {morePosts.map((other, idx) => (
                <BlogCard key={other.slug} post={other} index={idx + 1} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner locale={locale} />
    </>
  )
}
