import Link from "next/link"
import { ExternalLink, Info, Palette } from "lucide-react"
import PageHeader from "@/components/marketing/PageHeader"
import Section from "@/components/marketing/Section"
import Reveal from "@/components/marketing/Reveal"
import TemplateGallery from "@/components/marketing/TemplateGallery"
import CtaBanner from "@/components/marketing/CtaBanner"
import ContactButton from "@/components/marketing/ContactButton"
import { pageMetadata } from "@/lib/seo"
import { getTemplates, hasTemplateDetail } from "@/content/templates"
import { getIndustryFor } from "@/content/industries"
import { getServiceBySlugFor } from "@/content/services"
import { TEMPLATES_COPY } from "@/content/pageCopy/templates"
import { sectionPath } from "@/i18n/paths"
import { localizeHref } from "@/i18n/routes"
import { SERVICE_SLUGS } from "@/i18n/slugs"
import type { NonDefaultLocale } from "@/i18n/config"

export function templatesIndexMetadata(locale: NonDefaultLocale) {
  const copy = TEMPLATES_COPY[locale].index
  return pageMetadata({
    title: copy.metaTitle,
    description: copy.metaDescription,
    path: sectionPath("templates", locale),
    locale,
  })
}

export function TemplatesIndexPage({ locale }: { locale: NonDefaultLocale }) {
  const copy = TEMPLATES_COPY[locale].index
  const path = sectionPath("templates", locale)
  const count = getTemplates(locale).length

  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[{ name: copy.crumb, path }]}
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro.replace("{count}", String(count))}
      />

      <section className="px-4 md:px-6 -mt-2">
        <Reveal className="max-w-[1200px] mx-auto grid md:grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-6 rounded-2xl border border-orange-200 bg-linear-to-r from-orange-50 to-amber-50 p-5 md:p-6">
          <span className="w-12 h-12 rounded-xl bg-white text-primary flex items-center justify-center shadow-sm">
            <Info className="w-6 h-6" />
          </span>
          <p className="text-gray-800 leading-relaxed">
            <strong>{copy.noticeStrong}</strong>
            {copy.noticeRest}
          </p>
          <ContactButton label={copy.noticeCta} className="w-full md:w-auto" />
        </Reveal>
      </section>

      <Section>
        <TemplateGallery />
      </Section>

      <Section title={copy.customizeTitle} muted>
        <div className="grid md:grid-cols-3 gap-6">
          {copy.customize.map(({ title, desc }, idx) => (
            <Reveal
              key={title}
              delay={idx * 0.1}
              className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:shadow-lg transition-shadow">
              <Palette className="w-8 h-8 text-primary" />
              <h3 className="mt-4 text-lg font-bold text-gray-900">{title}</h3>
              <p className="mt-2 text-gray-700 leading-relaxed">{desc}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBanner locale={locale} title={copy.ctaTitle} desc={copy.ctaDesc} />
    </>
  )
}

export function templateStaticParams(locale: NonDefaultLocale) {
  return getTemplates(locale)
    .filter(hasTemplateDetail)
    .map((template) => ({ slug: template.slug }))
}

function findTemplate(locale: NonDefaultLocale, slug: string) {
  const template = getTemplates(locale).find((t) => t.slug === slug)
  return template && hasTemplateDetail(template) ? template : undefined
}

export function templateDetailMetadata(locale: NonDefaultLocale, slug: string) {
  const template = findTemplate(locale, slug)
  if (!template) return {}
  const copy = TEMPLATES_COPY[locale].detail
  return pageMetadata({
    title: copy.metaTitle.replace("{name}", template.name.toLowerCase()),
    description: copy.metaDescription.replace("{description}", template.description),
    path: sectionPath("templates", locale, template.slug),
    locale,
  })
}

export function TemplateDetailPage({ locale, slug }: { locale: NonDefaultLocale; slug: string }) {
  const template = findTemplate(locale, slug)
  if (!template) return null
  const copy = TEMPLATES_COPY[locale].detail
  const path = sectionPath("templates", locale, template.slug)

  // industrySlug/serviceSlug là slug tiếng Việt; tìm bản dịch tương ứng để lấy tên/đường dẫn.
  const industry = template.industrySlug ? findIndustryForTemplate(locale, template.industrySlug) : undefined
  const service =
    !industry && template.serviceSlug ? getServiceBySlugFor(locale, SERVICE_SLUGS[template.serviceSlug]) : undefined
  const name = template.name.toLowerCase()

  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[
          { name: TEMPLATES_COPY[locale].index.crumb, path: sectionPath("templates", locale) },
          { name: template.name, path },
        ]}
        eyebrow={copy.eyebrow}
        title={copy.title.replace("{name}", name)}
        intro={copy.intro
          .replace("{style}", template.style)
          .replace("{description}", template.description)}
        image={template.image}
        imageAlt={template.imageAlt}>
        {template.demoUrl ? (
          <a
            href={template.demoUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 h-12 md:h-14 px-6 md:px-8 rounded-xl font-bold bg-primary text-white hover:bg-primary/90">
            {copy.openDemo} <ExternalLink className="w-4 h-4" />
          </a>
        ) : (
          <ContactButton label={copy.consult} context={template.name} />
        )}
      </PageHeader>

      <Section title={template.demoUrl ? copy.blocksDemo : copy.blocksTemplate}>
        <div className="grid gap-6 md:grid-cols-3">
          {(template.highlights ?? []).map((highlight) => (
            <article key={highlight} className="rounded-2xl border border-gray-200 p-6">
              <p className="flex gap-3 text-gray-800 leading-relaxed">
                <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                {highlight}
              </p>
            </article>
          ))}
        </div>
      </Section>
      <Section title={copy.chooseTitle} muted>
        <div className="grid gap-6 md:grid-cols-2 max-w-[900px] mx-auto text-gray-700 leading-relaxed">
          <p>
            <strong className="text-gray-900">{copy.thisPageStrong}</strong>
            {copy.thisPageRest}
            {template.demoUrl && (
              <>
                {copy.demoBefore}
                <a href={template.demoUrl} target="_blank" rel="noopener" className="text-primary underline">
                  {copy.demoLink.replace("{short}", (industry?.shortName ?? template.name).toLowerCase())}
                </a>
                {copy.demoAfter}
              </>
            )}
          </p>
          <p>
            <strong className="text-gray-900">{industry ? copy.solutionPageStrong : copy.servicePageStrong}</strong>
            {copy.solutionPageRest}
            {service && (
              <>
                <Link href={sectionPath("services", locale, service.slug)} className="text-primary underline">
                  {copy.serviceLink.replace("{name}", service.name.toLowerCase())}
                </Link>
                {copy.solutionMid}
              </>
            )}
            {industry && (
              <>
                <Link href={sectionPath("solutions", locale, industry.slug)} className="text-primary underline">
                  {copy.solutionLink.replace("{name}", industry.name.toLowerCase())}
                </Link>
                {copy.solutionMid}
              </>
            )}
            <Link href={sectionPath("pricing", locale)} className="text-primary underline">
              {copy.pricingLink}
            </Link>
            {copy.solutionEnd}
          </p>
        </div>
      </Section>

      <CtaBanner locale={locale} />
    </>
  )
}

function findIndustryForTemplate(locale: NonDefaultLocale, viIndustrySlug: string) {
  // Bản dịch của giải pháp ngành nằm dưới slug tiếng Anh; dò theo slug tiếng Việt gốc.
  const path = localizeHref(`/giai-phap/${viIndustrySlug}`, locale)
  const slug = path?.split("/").pop()
  return slug ? getIndustryFor(locale, slug) : undefined
}
