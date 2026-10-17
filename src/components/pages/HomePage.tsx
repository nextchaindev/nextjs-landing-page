import Link from "next/link"
import { FileText, LayoutGrid, ShoppingBag } from "lucide-react"
import Hero from "@/components/sections/Hero"
import Process from "@/components/sections/Process"
import WhyChooseUs from "@/components/sections/WhyChooseUs"
import CTA from "@/components/sections/CTA"
import Section from "@/components/marketing/Section"
import Reveal from "@/components/marketing/Reveal"
import ProjectPricingTabs from "@/components/sections/ProjectPricingTabs"
import PricingCards from "@/components/marketing/PricingCards"
import FaqSection from "@/components/marketing/FaqSection"
import { MOBILE_CAROUSEL, MOBILE_CAROUSEL_ITEM } from "@/components/marketing/carousel"
import { pageMetadata } from "@/lib/seo"
import { getStartingPrice } from "@/content/plans"
import { getGeneralFaqs } from "@/content/faqs"
import { PAGE_COPY } from "@/content/pages"
import { getDictionary } from "@/i18n/dictionaries"
import { localizePath, type NonDefaultLocale } from "@/i18n/config"

/** Trang chủ của các ngôn ngữ ngoài tiếng Việt (ko, en). Trang tiếng Việt là app/(vi)/page.tsx. */
export function homeMetadata(locale: NonDefaultLocale) {
  return pageMetadata({
    title: getDictionary(locale).meta.defaultTitle,
    description: PAGE_COPY[locale].home.metaDescription.replace("{price}", getStartingPrice(locale)),
    path: localizePath("/", locale),
    absoluteTitle: true,
    locale,
  })
}

const GROWTH_STYLES = [
  { icon: LayoutGrid, iconBg: "bg-[#FFEDD4] text-[#F54900]" },
  { icon: FileText, iconBg: "bg-[#DBEAFE] text-[#155DFC]" },
  { icon: ShoppingBag, iconBg: "bg-[#DCFCE7] text-[#008236]" },
]

export default function HomePage({ locale }: { locale: NonDefaultLocale }) {
  const copy = PAGE_COPY[locale].home
  const dictionary = getDictionary(locale)

  return (
    <div className="min-h-screen bg-white">
      <Hero />

      <Section muted id="pricing" eyebrow={copy.pricing.eyebrow} title={copy.pricing.title} desc={copy.pricing.desc}>
        <PricingCards locale={locale} />
        <p className="mt-10 text-center">
          <Link href={localizePath("/pricing", locale)} className="font-semibold text-primary hover:underline">
            {copy.pricing.link}
          </Link>
        </p>
      </Section>

      <ProjectPricingTabs />

      <Process />

      <Section muted title={copy.growth.title} desc={copy.growth.desc}>
        <div className={`${MOBILE_CAROUSEL} md:grid-cols-3`}>
          {copy.growth.features.map(({ title, desc }, idx) => {
            const { icon: Icon, iconBg } = GROWTH_STYLES[idx]
            return (
              <Reveal
                key={title}
                delay={idx * 0.1}
                className={`${MOBILE_CAROUSEL_ITEM} group bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300`}>
                <span className={`w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${iconBg}`}>
                  <Icon className="w-7 h-7" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-[#101828]">{title}</h3>
                <p className="mt-2 text-sm md:text-base text-[#4A5565] leading-relaxed">{desc}</p>
              </Reveal>
            )
          })}
        </div>
      </Section>

      <WhyChooseUs />

      <FaqSection faqs={getGeneralFaqs(locale)} title={dictionary.faq.title} />
      <CTA />
    </div>
  )
}
