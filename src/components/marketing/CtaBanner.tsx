import Link from "next/link"
import ContactButton from "@/components/marketing/ContactButton"
import { getDictionary } from "@/i18n/dictionaries"
import type { Locale } from "@/i18n/config"

interface CtaBannerProps {
  title?: string
  desc?: string
  secondaryHref?: string
  secondaryLabel?: string
  locale?: Locale
}

export default function CtaBanner({
  locale = "vi",
  title,
  desc,
  secondaryHref,
  secondaryLabel,
}: CtaBannerProps) {
  const defaults = getDictionary(locale).ctaBanner
  title ??= defaults.title
  desc ??= defaults.desc
  secondaryHref ??= defaults.secondaryHref
  secondaryLabel ??= defaults.secondaryLabel

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-[#F9FAFB]">
      <div className="max-w-[1000px] mx-auto bg-white border border-gray-100 rounded-[32px] p-6 md:p-14 shadow-xl text-center">
        <h2 className="text-2xl md:text-[36px] font-medium text-gray-900 leading-tight">
          {title}
        </h2>
        <p className="mt-4 text-base md:text-xl text-gray-600 max-w-2xl mx-auto">{desc}</p>
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4">
          <ContactButton className="w-full md:w-auto" />
          <Link
            href={secondaryHref}
            className="inline-flex items-center justify-center h-12 md:h-14 px-6 md:px-8 rounded-xl font-bold border border-gray-300 text-gray-900 hover:border-gray-400 w-full md:w-auto">
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
