import Link from "next/link"
import { ArrowRight, Check, Lightbulb, X } from "lucide-react"
import PageHeader from "@/components/marketing/PageHeader"
import Section from "@/components/marketing/Section"
import Reveal from "@/components/marketing/Reveal"
import ServiceCards from "@/components/marketing/ServiceCards"
import IndustryCards from "@/components/marketing/IndustryCards"
import PricingCards from "@/components/marketing/PricingCards"
import ProjectPackages from "@/components/marketing/ProjectPackages"
import ProcessList from "@/components/marketing/ProcessList"
import FaqSection from "@/components/marketing/FaqSection"
import CtaBanner from "@/components/marketing/CtaBanner"
import ContactButton from "@/components/marketing/ContactButton"
import JsonLdScript from "@/components/marketing/JsonLdScript"
import { pageMetadata, serviceSchema } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site"
import { getServiceBySlugFor, getServices } from "@/content/services"
import { getPlans, getStartingPrice } from "@/content/plans"
import { getProjectServices, parsePrice } from "@/content/projectPricing"
import { SERVICES_COPY } from "@/content/pageCopy/services"
import { getDictionary } from "@/i18n/dictionaries"
import { MONTHLY_MANAGEMENT_SLUG } from "@/i18n/slugs"
import { sectionPath } from "@/i18n/paths"
import type { NonDefaultLocale } from "@/i18n/config"
import { CURRENCY, localizeLinks } from "./helpers"

/* ----------------------------- /services ----------------------------- */

export function servicesIndexMetadata(locale: NonDefaultLocale) {
  const copy = SERVICES_COPY[locale].index
  return pageMetadata({
    title: copy.metaTitle,
    description: copy.metaDescription.replace("{price}", getStartingPrice(locale)),
    path: sectionPath("services", locale),
    locale,
  })
}

export function ServicesIndexPage({ locale }: { locale: NonDefaultLocale }) {
  const copy = SERVICES_COPY[locale].index
  const path = sectionPath("services", locale)

  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[{ name: copy.crumb, path }]}
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
      />

      <Section>
        <ServiceCards locale={locale} />
        <Reveal className="mt-8 rounded-2xl bg-linear-to-r from-orange-50 to-amber-50 border border-orange-100 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{copy.managementTitle}</h2>
            <p className="mt-1 text-gray-700">{copy.managementDesc}</p>
          </div>
          <Link
            href={sectionPath("services", locale, MONTHLY_MANAGEMENT_SLUG.other)}
            className="inline-flex items-center gap-2 font-semibold text-primary whitespace-nowrap">
            {copy.managementCta} <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </Section>

      <Section title={copy.industriesTitle} muted>
        <IndustryCards locale={locale} />
      </Section>

      <CtaBanner locale={locale} />
    </>
  )
}

/* -------------------------- /services/[slug] -------------------------- */

export function serviceStaticParams(locale: NonDefaultLocale) {
  return getServices(locale).map((service) => ({ slug: service.slug }))
}

export function serviceDetailMetadata(locale: NonDefaultLocale, slug: string) {
  const detail = getServiceBySlugFor(locale, slug)
  if (!detail) return {}
  return pageMetadata({
    title: detail.metaTitle,
    description: detail.metaDescription,
    path: sectionPath("services", locale, detail.slug),
    ogImage: detail.image,
    locale,
  })
}

export function ServiceDetailPage({ locale, slug }: { locale: NonDefaultLocale; slug: string }) {
  const detail = getServiceBySlugFor(locale, slug)
  if (!detail) return null
  const copy = SERVICES_COPY[locale].detail
  const path = sectionPath("services", locale, detail.slug)
  const currency = CURRENCY[locale]
  const pricing = detail.pricing

  const schema = {
    ...serviceSchema({
      name: detail.name,
      description: detail.metaDescription,
      path,
      audience: detail.audience,
      locale,
    }),
    image: absoluteUrl(detail.image.src),
    offers:
      pricing.model === "subscription"
        ? getPlans(locale)
            .filter((plan) => pricing.planIds.includes(plan.id))
            .map((plan) => ({
              "@type": "Offer",
              name: copy.offerName.replace("{name}", plan.name),
              priceCurrency: currency,
              price: plan.monthlyPrice,
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: plan.monthlyPrice,
                priceCurrency: currency,
                unitText: copy.unitText,
              },
            }))
        : getProjectServices(locale)[pricing.key].packages.map((pkg) => {
            const { amount, isMinimum } = parsePrice(pkg.price)
            return {
              "@type": "Offer",
              name: `${detail.name} - ${pkg.name}`,
              description: pkg.description,
              priceCurrency: currency,
              ...(isMinimum
                ? { priceSpecification: { "@type": "PriceSpecification", minPrice: amount, priceCurrency: currency } }
                : { price: amount }),
            }
          }),
  }

  const otherServices = getServices(locale).filter((service) => service.slug !== detail.slug)
  const related = localizeLinks(detail.related, locale)

  return (
    <>
      <JsonLdScript data={schema} />
      <PageHeader
        locale={locale}
        crumbs={[
          { name: SERVICES_COPY[locale].index.crumb, path: sectionPath("services", locale) },
          { name: detail.name, path },
        ]}
        eyebrow={detail.name}
        title={detail.h1}
        intro={copy.forAudience.replace("{audience}", detail.audience)}
        image={detail.image}
        imageAlt={detail.imageAlt}>
        <ContactButton context={detail.name} />
        <Link
          href="#bang-gia"
          className="inline-flex items-center h-12 md:h-14 px-6 md:px-8 rounded-xl font-bold border border-gray-300 bg-white text-gray-900 hover:border-gray-400 transition-all hover:scale-105">
          {copy.seePricing}
        </Link>
      </PageHeader>

      <section className="px-4 md:px-6 -mt-4 md:-mt-8 relative">
        <Reveal className="max-w-[1000px] mx-auto bg-white border border-orange-200 rounded-3xl shadow-xl p-6 md:p-10">
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
            <Lightbulb className="w-4 h-4" /> {copy.summary}
          </p>
          <p className="mt-3 text-base md:text-lg text-gray-800 leading-relaxed">{detail.summary}</p>
        </Reveal>
      </section>

      <Section title={copy.whyTitle.replace("{name}", detail.name)}>
        <div className="grid md:grid-cols-3 gap-6">
          {detail.benefits.map((benefit, idx) => (
            <Reveal
              key={benefit.title}
              delay={idx * 0.1}
              className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <span className="w-12 h-12 rounded-xl bg-orange-100 text-primary font-bold text-lg flex items-center justify-center">
                {idx + 1}
              </span>
              <h3 className="mt-5 text-lg font-bold text-gray-900">{benefit.title}</h3>
              <p className="mt-2 text-gray-700 leading-relaxed">{benefit.desc}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {pricing.model === "subscription" ? (
        <Section id="bang-gia" title={copy.subscriptionTitle} desc={copy.subscriptionDesc} muted>
          <PricingCards planIds={pricing.planIds} locale={locale} />
          <p className="mt-4 text-center">
            <Link href={sectionPath("pricing", locale)} className="font-semibold text-primary hover:underline">
              {copy.comparePlans}
            </Link>
          </p>
        </Section>
      ) : (
        <Section id="bang-gia" title={copy.projectTitle.replace("{name}", detail.name)} desc={copy.projectDesc} muted>
          <ProjectPackages serviceKey={pricing.key} />
        </Section>
      )}

      <Section title={copy.scopeTitle}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-2xl p-6 md:p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{copy.youGet}</h3>
            <ul className="space-y-3">
              {detail.deliverables.map((item) => (
                <li key={item} className="flex gap-3 text-gray-800">
                  <Check className="w-5 h-5 shrink-0 text-green-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-gray-200 rounded-2xl p-6 md:p-8 bg-gray-50">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{copy.notIncluded}</h3>
            <ul className="space-y-3">
              {detail.notIncluded.map((item) => (
                <li key={item} className="flex gap-3 text-gray-700">
                  <X className="w-5 h-5 shrink-0 text-gray-400" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-gray-600">
              {copy.updatesBefore}
              <Link
                href={sectionPath("services", locale, MONTHLY_MANAGEMENT_SLUG.other)}
                className="text-primary underline">
                {copy.updatesLink}
              </Link>
              {copy.updatesAfter}
            </p>
          </div>
        </div>
      </Section>

      <Section title={copy.processTitle} muted>
        <ProcessList locale={locale} />
      </Section>

      <FaqSection faqs={detail.faqs} title={getDictionary(locale).faq.title} />

      <Section title={copy.moreTitle}>
        <div className="grid md:grid-cols-2 gap-8">
          {related.length > 0 && (
            <div>
              <h3 className="font-bold text-gray-900 mb-4">{copy.relatedTitle}</h3>
              <ul className="space-y-3">
                {related.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="group inline-flex items-center gap-2 text-primary hover:underline">
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">{copy.otherServices}</h3>
            <ul className="flex flex-wrap gap-2">
              {otherServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={sectionPath("services", locale, service.slug)}
                    className="inline-block px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-700 hover:border-primary hover:text-primary transition-colors">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CtaBanner locale={locale} title={copy.ctaTitle.replace("{name}", detail.name)} />
    </>
  )
}

/* ------------------- /services/monthly-website-management ------------------- */

export function managementMetadata(locale: NonDefaultLocale) {
  const copy = SERVICES_COPY[locale].management
  return pageMetadata({
    title: copy.metaTitle,
    description: copy.metaDescription,
    path: sectionPath("services", locale, MONTHLY_MANAGEMENT_SLUG.other),
    locale,
  })
}

export function ManagementPage({ locale }: { locale: NonDefaultLocale }) {
  const copy = SERVICES_COPY[locale].management
  const path = sectionPath("services", locale, MONTHLY_MANAGEMENT_SLUG.other)

  return (
    <>
      <JsonLdScript
        data={serviceSchema({ name: copy.metaTitle, description: copy.metaDescription, path, locale })}
      />
      <PageHeader
        locale={locale}
        crumbs={[{ name: copy.metaTitle, path }]}
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}>
        <ContactButton />
      </PageHeader>

      <Section title={copy.tasksTitle} muted>
        <div className="grid md:grid-cols-3 gap-6">
          {copy.tasks.map((task) => (
            <div key={task.title} className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900">{task.title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{task.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-gray-700">
          {copy.noteBefore}
          <Link href={sectionPath("pricing", locale)} className="text-primary underline">
            {copy.noteLink}
          </Link>
          {copy.noteAfter}
        </p>
      </Section>

      <FaqSection faqs={copy.faqs} title={getDictionary(locale).faq.title} />
      <CtaBanner locale={locale} />
    </>
  )
}

