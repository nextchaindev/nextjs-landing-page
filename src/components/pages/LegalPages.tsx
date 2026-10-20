import { notFound } from "next/navigation"
import type { Metadata } from "next"
import PageHeader from "@/components/marketing/PageHeader"
import { pageMetadata } from "@/lib/seo"
import { LEGAL_TEXTS, LEGAL_UPDATED_AT, type LegalDocText } from "@/content/legal"
import { LEGAL_REVIEWED_LOCALES, type NonDefaultLocale } from "@/i18n/config"
import { sectionPath, type Section } from "@/i18n/paths"

export type LegalDocKey = "terms" | "privacy" | "cancellation"

/** Bản dịch pháp lý chỉ công khai sau khi pháp chế rà soát (NEXT_PUBLIC_LEGAL_REVIEWED_LOCALES). */
function getDoc(locale: NonDefaultLocale, doc: LegalDocKey) {
  const texts = LEGAL_TEXTS[locale]
  if (!texts || !LEGAL_REVIEWED_LOCALES.includes(locale)) return undefined
  return { texts, doc: texts[doc] as LegalDocText }
}

export function legalMetadata(locale: NonDefaultLocale, doc: LegalDocKey): Metadata {
  const found = getDoc(locale, doc)
  if (!found) return {}
  return pageMetadata({
    title: found.doc.title,
    description: found.doc.intro,
    path: sectionPath(doc as Section, locale),
    locale,
  })
}

export function LegalDocPage({ locale, doc }: { locale: NonDefaultLocale; doc: LegalDocKey }) {
  const found = getDoc(locale, doc)
  if (!found) notFound()
  const { texts, doc: text } = found
  const path = sectionPath(doc as Section, locale)
  const dateFormat = new Intl.DateTimeFormat(texts.dateLocale, { dateStyle: "long" })

  return (
    <>
      <PageHeader locale={locale} crumbs={[{ name: text.title, path }]} title={text.title} intro={text.intro} />
      <article className="px-4 md:px-6 pb-20">
        <div className="max-w-[760px] mx-auto">
          <p className="text-sm text-gray-500 mb-2">
            {texts.lastUpdatedLabel}: <time dateTime={LEGAL_UPDATED_AT}>{dateFormat.format(new Date(LEGAL_UPDATED_AT))}</time>
          </p>
          <p className="text-sm text-gray-500 mb-10">{texts.originalNotice}</p>
          {text.sections.map((section, idx) => (
            <section key={section.heading} className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {idx + 1}. {section.heading}
              </h2>
              {section.paragraphs.map((paragraph, pIdx) => (
                <p key={pIdx} className="mb-3 text-gray-800 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </>
  )
}
