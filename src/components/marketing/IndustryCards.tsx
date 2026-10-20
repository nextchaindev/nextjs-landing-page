import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Reveal from "@/components/marketing/Reveal"
import { MOBILE_CAROUSEL, MOBILE_CAROUSEL_ITEM } from "@/components/marketing/carousel"
import { getIndustries } from "@/content/industries"
import { getStartingPrice } from "@/content/plans"
import { CARD_TEXT } from "@/content/cardText"
import { sectionPath } from "@/i18n/paths"
import type { Locale } from "@/i18n/config"

export default function IndustryCards({ locale = "vi" }: { locale?: Locale }) {
  const text = CARD_TEXT[locale]
  return (
    <div className={`${MOBILE_CAROUSEL} md:grid-cols-3`}>
      {getIndustries(locale).map((industry, idx) => (
        <Reveal key={industry.slug} delay={idx * 0.1} as="article" className={MOBILE_CAROUSEL_ITEM}>
          <Link
            href={sectionPath("solutions", locale, industry.slug)}
            className="group flex flex-col h-full bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={industry.image}
                alt={industry.imageAlt}
                placeholder="blur"
                sizes="(min-width: 768px) 380px, 100vw"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold">{industry.name}</h3>
                <p className="mt-1 text-sm text-white/85">{industry.audience}</p>
              </div>
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 text-xs font-semibold text-gray-800">
                {text.fromMonth.replace("{price}", getStartingPrice(locale))}
              </span>
            </div>
            <div className="flex flex-col flex-1 p-6">
              <p className="text-gray-700 leading-relaxed flex-1">{industry.problems[0].desc}</p>
              <span className="mt-5 inline-flex items-center gap-2 font-semibold text-primary">
                {text.viewSolution.replace("{name}", industry.shortName.toLowerCase())}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  )
}
