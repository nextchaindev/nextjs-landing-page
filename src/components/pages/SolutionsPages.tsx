import Link from "next/link"
import PageHeader from "@/components/marketing/PageHeader"
import Section from "@/components/marketing/Section"
import IndustryCards from "@/components/marketing/IndustryCards"
import ProcessList from "@/components/marketing/ProcessList"
import FaqSection from "@/components/marketing/FaqSection"
import CtaBanner from "@/components/marketing/CtaBanner"
import ContactButton from "@/components/marketing/ContactButton"
import JsonLdScript from "@/components/marketing/JsonLdScript"
import { pageMetadata, serviceSchema } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site"
import { getIndustries, getIndustryFor } from "@/content/industries"
import { getTemplates } from "@/content/templates"
import { getBlogPosts } from "@/content/blog"
import { getStartingPrice } from "@/content/plans"
import { SOLUTIONS_COPY } from "@/content/pageCopy/solutions"
import { getDictionary } from "@/i18n/dictionaries"
import { defaultIndustrySlug } from "@/content/industries"
import { sectionPath } from "@/i18n/paths"
import type { NonDefaultLocale } from "@/i18n/config"

/* ----------------------------- /solutions ----------------------------- */

export function solutionsIndexMetadata(locale: NonDefaultLocale) {
  const copy = SOLUTIONS_COPY[locale].index
  return pageMetadata({
    title: copy.metaTitle,
    description: copy.metaDescription.replace("{price}", getStartingPrice(locale)),
    path: sectionPath("solutions", locale),
    locale,
  })
}

export function SolutionsIndexPage({ locale }: { locale: NonDefaultLocale }) {
  const copy = SOLUTIONS_COPY[locale].index
  const path = sectionPath("solutions", locale)

  return (
    <>
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: copy.listName,
          itemListElement: getIndustries(locale).map((industry, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            url: absoluteUrl(sectionPath("solutions", locale, industry.slug)),
            name: industry.name,
          })),
        }}
      />
      <PageHeader
        locale={locale}
        crumbs={[{ name: copy.crumb, path }]}
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro.replace("{price}", getStartingPrice(locale))}
      />
      <Section>
        <IndustryCards locale={locale} />
        <p className="mt-10 text-center text-gray-700">
          {copy.notFoundBefore}
          <Link href={sectionPath("templates", locale)} className="text-primary underline">
            {copy.templatesLink}
          </Link>
          {copy.notFoundMid}
          <Link href={sectionPath("services", locale)} className="text-primary underline">
            {copy.servicesLink}
          </Link>
          {copy.notFoundAfter}
        </p>
      </Section>
      <CtaBanner locale={locale} title={copy.ctaTitle} desc={copy.ctaDesc} />
    </>
  )
}

/* -------------------------- /solutions/[slug] -------------------------- */

export function solutionStaticParams(locale: NonDefaultLocale) {
  return getIndustries(locale).map((industry) => ({ slug: industry.slug }))
}

export function solutionDetailMetadata(locale: NonDefaultLocale, slug: string) {
  const industry = getIndustryFor(locale, slug)
  if (!industry) return {}
  return pageMetadata({
    title: industry.metaTitle,
    description: industry.metaDescription,
    path: sectionPath("solutions", locale, industry.slug),
    ogImage: industry.image.src,
    locale,
  })
}

export function SolutionDetailPage({ locale, slug }: { locale: NonDefaultLocale; slug: string }) {
  const industry = getIndustryFor(locale, slug)
  if (!industry) return null
  const copy = SOLUTIONS_COPY[locale].detail
  const path = sectionPath("solutions", locale, industry.slug)
  const viSlug = defaultIndustrySlug(locale, industry.slug)
  const template = getTemplates(locale).find((t) => t.industrySlug === viSlug)
  // Bài blog liên quan: bài có liên kết trỏ về trang giải pháp này (so khớp theo đường dẫn tiếng Việt).
  const relatedPosts = getBlogPosts(locale).filter((post) =>
    post.relatedLinks.some((link) => viSlug !== undefined && link.href === `/giai-phap/${viSlug}`),
  )
  const short = industry.shortName.toLowerCase()
  const price = getStartingPrice(locale)

  return (
    <>
      <JsonLdScript
        data={serviceSchema({
          name: copy.schemaName.replace("{name}", industry.name),
          description: industry.metaDescription,
          path,
          audience: industry.audience,
          locale,
        })}
      />
      <PageHeader
        locale={locale}
        crumbs={[
          { name: SOLUTIONS_COPY[locale].index.crumb, path: sectionPath("solutions", locale) },
          { name: industry.name, path },
        ]}
        eyebrow={copy.eyebrow.replace("{audience}", industry.audience.toLowerCase())}
        title={industry.h1}
        intro={industry.intro}
        image={industry.image}
        imageAlt={industry.imageAlt}>
        <ContactButton context={industry.name} />
        {template && (
          <Link
            href={sectionPath("templates", locale, template.slug)}
            className="inline-flex items-center h-12 md:h-14 px-6 md:px-8 rounded-xl font-bold border border-gray-300 text-gray-900 hover:border-gray-400">
            {copy.seeTemplate.replace("{short}", short)}
          </Link>
        )}
      </PageHeader>

      <Section title={copy.problemsTitle.replace("{short}", short)}>
        <div className="grid md:grid-cols-3 gap-6">
          {industry.problems.map((problem) => (
            <div key={problem.title} className="border border-gray-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 text-lg">{problem.title}</h3>
              <p className="mt-3 text-gray-700 leading-relaxed">{problem.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title={copy.pagesTitle.replace("{name}", industry.name)} muted>
        <div className="grid md:grid-cols-3 gap-6">
          {industry.pages.map((page) => (
            <div key={page.title} className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900">{page.title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{page.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title={copy.costTitle} desc={copy.costDesc.replace("{price}", price)}>
        <ProcessList locale={locale} />
        <p className="mt-10 text-center text-gray-700">
          {copy.detailsBefore}
          <Link href={sectionPath("pricing", locale)} className="text-primary underline">
            {copy.pricingLink}
          </Link>
          {copy.detailsMid}
          <Link href={sectionPath("process", locale)} className="text-primary underline">
            {copy.processLink}
          </Link>
          {copy.detailsAfter}
        </p>
      </Section>

      {relatedPosts.length > 0 && (
        <Section title={copy.relatedPosts} muted>
          <ul className="max-w-[760px] mx-auto space-y-3">
            {relatedPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={sectionPath("blog", locale, post.slug)}
                  className="block rounded-2xl border border-gray-200 bg-white p-5 hover:border-primary transition-colors">
                  <span className="font-bold text-gray-900">{post.title}</span>
                  <span className="mt-1 block text-sm text-gray-600">{post.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <FaqSection faqs={industry.faqs} title={getDictionary(locale).faq.title} />
      <CtaBanner locale={locale} title={copy.ctaTitle.replace("{name}", industry.name)} />
    </>
  )
}

