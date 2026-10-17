import PageHeader from "@/components/marketing/PageHeader"
import Section from "@/components/marketing/Section"
import PricingCards from "@/components/marketing/PricingCards"
import ProjectPricingTabs from "@/components/sections/ProjectPricingTabs"
import FaqSection from "@/components/marketing/FaqSection"
import CtaBanner from "@/components/marketing/CtaBanner"
import JsonLdScript from "@/components/marketing/JsonLdScript"
import { pageMetadata, serviceSchema } from "@/lib/seo"
import { getStartingPrice } from "@/content/plans"
import { EN_PRICING_FAQS } from "@/content/en/faqs"
import { KO_PRICING_FAQS } from "@/content/ko/faqs"
import { PAGE_COPY } from "@/content/pages"
import { getDictionary } from "@/i18n/dictionaries"
import { localizePath, type NonDefaultLocale } from "@/i18n/config"

const PRICING_FAQS = { ko: KO_PRICING_FAQS, en: EN_PRICING_FAQS }

function describe(locale: NonDefaultLocale) {
  return PAGE_COPY[locale].pricing.metaDescription.replace("{price}", getStartingPrice(locale))
}

/** Trang bảng giá của các ngôn ngữ ngoài tiếng Việt. Trang tiếng Việt là app/(vi)/bang-gia/page.tsx. */
export function pricingMetadata(locale: NonDefaultLocale) {
  return pageMetadata({
    title: PAGE_COPY[locale].pricing.metaTitle,
    description: describe(locale),
    path: localizePath("/pricing", locale),
    locale,
  })
}

export default function PricingPage({ locale }: { locale: NonDefaultLocale }) {
  const copy = PAGE_COPY[locale].pricing
  const path = localizePath("/pricing", locale)

  return (
    <>
      <JsonLdScript
        data={serviceSchema({ name: copy.serviceName, description: describe(locale), path, locale })}
      />
      <PageHeader
        locale={locale}
        crumbs={[{ name: copy.crumb, path }]}
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
      />

      <Section className="pt-4 md:pt-8">
        <PricingCards locale={locale} />
        <p className="mt-8 text-sm text-gray-500 text-center">{copy.taxNote}</p>
      </Section>

      <Section title={copy.planGuideTitle}>
        <div className="grid md:grid-cols-3 gap-6 text-gray-700 leading-relaxed">
          {copy.planGuide.map((item) => (
            <p key={item.body}>
              <strong className="text-gray-900">{item.lead}</strong> {item.body}
            </p>
          ))}
        </div>
      </Section>

      <ProjectPricingTabs />

      <FaqSection faqs={PRICING_FAQS[locale]} title={getDictionary(locale).faq.title} />
      <CtaBanner locale={locale} secondaryHref={localizePath("/contact", locale)} secondaryLabel={copy.ctaSecondaryLabel} />
    </>
  )
}
