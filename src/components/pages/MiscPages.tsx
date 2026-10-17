import Link from "next/link"
import PageHeader from "@/components/marketing/PageHeader"
import Section from "@/components/marketing/Section"
import ProcessList from "@/components/marketing/ProcessList"
import FaqSection from "@/components/marketing/FaqSection"
import CtaBanner from "@/components/marketing/CtaBanner"
import { pageMetadata } from "@/lib/seo"
import { COMPANY_NAME } from "@/lib/site"
import { getGeneralFaqs } from "@/content/faqs"
import { MISC_COPY } from "@/content/pageCopy/misc"
import { getDictionary } from "@/i18n/dictionaries"
import { sectionPath } from "@/i18n/paths"
import { localizeHref } from "@/i18n/routes"
import { LEGAL_REVIEWED_LOCALES, type NonDefaultLocale } from "@/i18n/config"

/* ------------------------------- /process ------------------------------- */

export function processMetadata(locale: NonDefaultLocale) {
  const copy = MISC_COPY[locale].process
  return pageMetadata({
    title: copy.metaTitle,
    description: copy.metaDescription,
    path: sectionPath("process", locale),
    locale,
  })
}

export function ProcessPage({ locale }: { locale: NonDefaultLocale }) {
  const copy = MISC_COPY[locale].process

  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[{ name: copy.crumb, path: sectionPath("process", locale) }]}
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
      />
      <Section>
        <ProcessList detailed locale={locale} />
      </Section>

      <Section title={copy.prepareTitle} muted>
        <ul className="max-w-[760px] mx-auto grid md:grid-cols-2 gap-x-8 gap-y-3 text-gray-800">
          {copy.prepare.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
        <p className="mt-10 text-center text-gray-700">
          {copy.notEnoughBefore}
          <Link href={sectionPath("templates", locale)} className="text-primary underline">
            {copy.templatesLink}
          </Link>
          {copy.notEnoughAfter}
        </p>
      </Section>

      <FaqSection faqs={getGeneralFaqs(locale)} title={getDictionary(locale).faq.title} />
      <CtaBanner locale={locale} />
    </>
  )
}

/* ------------------------------- /compare ------------------------------- */

export function compareMetadata(locale: NonDefaultLocale) {
  const copy = MISC_COPY[locale].compare
  return pageMetadata({
    title: copy.metaTitle,
    description: copy.metaDescription,
    path: sectionPath("compare", locale),
    locale,
  })
}

export function ComparePage({ locale }: { locale: NonDefaultLocale }) {
  const copy = MISC_COPY[locale].compare
  const corporatePath = localizeHref("/dich-vu/thiet-ke-website-doanh-nghiep", locale)

  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[{ name: copy.crumb, path: sectionPath("compare", locale) }]}
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
      />
      <Section title={copy.tableTitle}>
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full min-w-[680px] text-left text-sm md:text-base">
            <thead className="bg-orange-50">
              <tr>
                {copy.headers.map((header) => (
                  <th key={header} className="p-4">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {copy.rows.map(([criterion, self, done]) => (
                <tr key={criterion}>
                  <th scope="row" className="p-4 font-semibold">
                    {criterion}
                  </th>
                  <td className="p-4 text-gray-700">{self}</td>
                  <td className="p-4 text-gray-700">{done}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Section muted title={copy.whenTitle}>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-bold">{copy.diyTitle}</h3>
            <p className="mt-3 text-gray-700">{copy.diyDesc}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">{copy.doneTitle}</h3>
            <p className="mt-3 text-gray-700">{copy.doneDesc}</p>
          </div>
        </div>
        <p className="mt-8 text-gray-700">
          {copy.seeBefore}
          <Link href={sectionPath("pricing", locale)} className="font-semibold text-primary underline">
            {copy.pricingLink}
          </Link>
          {corporatePath && (
            <>
              {copy.seeMid}
              <Link href={corporatePath} className="font-semibold text-primary underline">
                {copy.corporateLink}
              </Link>
            </>
          )}
          {copy.seeAfter}
        </p>
      </Section>
      <CtaBanner locale={locale} title={copy.ctaTitle} />
    </>
  )
}

/* -------------------------------- /about -------------------------------- */

export function aboutMetadata(locale: NonDefaultLocale) {
  const copy = MISC_COPY[locale].about
  return pageMetadata({
    title: copy.metaTitle,
    description: copy.metaDescription,
    path: sectionPath("about", locale),
    locale,
  })
}

export function AboutPage({ locale }: { locale: NonDefaultLocale }) {
  const copy = MISC_COPY[locale].about
  const { contact } = getDictionary(locale)
  const rows: [string, string][] = [
    [copy.operator, COMPANY_NAME],
    [copy.email, contact.email],
    ...(contact.phone ? ([[copy.phone, contact.phone]] as [string, string][]) : []),
    ...contact.addresses.map((office): [string, string] => [office.label, office.value]),
  ]
  const termsPublished = LEGAL_REVIEWED_LOCALES.includes(locale)

  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[{ name: copy.crumb, path: sectionPath("about", locale) }]}
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro.replace("{company}", COMPANY_NAME)}
      />

      <Section title={copy.principlesTitle} muted>
        <div className="grid md:grid-cols-3 gap-6">
          {copy.principles.map((item) => (
            <div key={item.title} className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-gray-700 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title={copy.infoTitle}>
        <dl className="max-w-[640px] mx-auto divide-y divide-gray-200 border-y border-gray-200">
          {rows.map(([label, value]) => (
            <div key={label} className="grid grid-cols-3 gap-4 py-4">
              <dt className="text-gray-500">{label}</dt>
              <dd className="col-span-2 text-gray-900 font-medium">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 text-center text-gray-700">
          {copy.moreBefore}
          <Link href={sectionPath("process", locale)} className="text-primary underline">
            {copy.processLink}
          </Link>
          {termsPublished && (
            <>
              {copy.moreMid}
              <Link href={sectionPath("terms", locale)} className="text-primary underline">
                {copy.termsLink}
              </Link>
            </>
          )}
          {copy.moreAfter}
        </p>
      </Section>

      <CtaBanner locale={locale} />
    </>
  )
}
