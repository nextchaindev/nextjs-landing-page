"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { trackEvent } from "@/lib/analytics"
import { cn } from "@/components/ui/utils"
import { ENABLED_LOCALES, LOCALE_NAMES } from "@/i18n/config"
import { useDictionary, useLocale } from "@/i18n/LocaleProvider"
import { alternatePath } from "@/i18n/routes"

interface LanguageSwitcherProps {
  className?: string
  onNavigate?: () => void
}

/** Chuyển sang trang tương ứng ở ngôn ngữ khác; chưa có bản dịch thì về trang chủ ngôn ngữ đó. */
export default function LanguageSwitcher({ className, onNavigate }: LanguageSwitcherProps) {
  const pathname = usePathname() ?? "/"
  const locale = useLocale()
  const { header } = useDictionary()

  if (ENABLED_LOCALES.length < 2) return null

  return (
    <nav aria-label={header.languageAria} className={cn("items-center gap-1 text-sm font-semibold", className ?? "flex")}>
      {ENABLED_LOCALES.map((target, idx) => {
        const active = target === locale
        return (
          <span key={target} className="flex items-center gap-1">
            {idx > 0 && <span aria-hidden="true" className="text-gray-300">|</span>}
            {active ? (
              <span aria-current="true" lang={target} title={LOCALE_NAMES[target].full} className="px-1 text-orange-600">
                {LOCALE_NAMES[target].short}
              </span>
            ) : (
              <Link
                href={alternatePath(pathname, target)}
                hrefLang={target}
                lang={target}
                title={LOCALE_NAMES[target].full}
                onClick={() => {
                  trackEvent("language_switch", { from: locale, to: target })
                  onNavigate?.()
                }}
                className="px-1 text-gray-600 hover:text-gray-900">
                {LOCALE_NAMES[target].short}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
