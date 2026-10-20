"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import HeroShowcase from "@/components/marketing/HeroShowcase"
import { getStartingPrice } from "@/content/plans"
import { useDictionary, useLocale } from "@/i18n/LocaleProvider"

export default function Hero() {
  const locale = useLocale()
  const { hero } = useDictionary()

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-24 md:pt-36 pb-16 md:pb-24 px-4 md:px-6 bg-linear-to-b from-orange-50/40 to-white">
      <div className="pointer-events-none absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-[#FFD6A8]/30 blur-[128px]" />
      <div className="pointer-events-none absolute top-1/2 -left-48 w-[420px] h-[420px] rounded-full bg-[#BEDBFF]/30 blur-[128px]" />

      <div className="relative max-w-[1200px] mx-auto grid md:grid-cols-[1.05fr_1fr] gap-12 md:gap-16 items-center">
        <div>
          <p className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-xs md:text-sm font-medium mb-5">
            {hero.badge}
          </p>

          <h1 className="leading-[1.12] text-gray-900 text-[32px] md:text-[52px] font-bold tracking-tight">
            {hero.headingLead} <span className="text-orange-600">{hero.headingAccent}</span>
          </h1>

          <p className="mt-5 text-base md:text-xl text-gray-700 leading-relaxed max-w-[34em]">
            {hero.lead}
          </p>

          <div className="mt-7 grid sm:flex gap-3 md:gap-4">
            <Link
              href={hero.primaryHref}
              className="inline-flex items-center justify-center gap-2 h-12 md:h-14 px-6 md:px-8 rounded-xl font-bold bg-primary text-white shadow-lg shadow-primary/30 text-sm md:text-base transition-all duration-300 hover:bg-primary/90 hover:-translate-y-0.5 active:scale-95">
              {hero.primaryCta}
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
            <Link
              href={hero.secondaryHref}
              className="inline-flex items-center justify-center h-12 md:h-14 px-6 md:px-8 rounded-xl font-bold border border-gray-300 bg-white text-gray-900 text-sm md:text-base transition-all duration-300 hover:border-gray-400 hover:-translate-y-0.5">
              {hero.secondaryCta}
            </Link>
          </div>
          <p className="mt-3 text-sm text-gray-600">
            {hero.priceNote.replace("{price}", getStartingPrice(locale))}
          </p>

          <ul className="mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-2.5 sm:gap-x-6">
            {hero.highlights.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm md:text-base text-gray-700 font-medium">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <HeroShowcase />
      </div>
    </section>
  )
}
