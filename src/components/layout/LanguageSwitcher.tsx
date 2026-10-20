"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Check, ChevronDown, Globe } from "lucide-react"
import { trackEvent } from "@/lib/analytics"
import { cn } from "@/components/ui/utils"
import { ENABLED_LOCALES, LOCALE_COOKIE, LOCALE_NAMES, type Locale } from "@/i18n/config"
import { useDictionary, useLocale } from "@/i18n/LocaleProvider"
import { alternatePath } from "@/i18n/routes"

interface LanguageSwitcherProps {
  className?: string
  onNavigate?: () => void
  /** "inline": VI | KO | EN (menu mobile). "menu": nút 🌐 VI gọn kèm dropdown (header desktop, nơi chật chỗ). */
  variant?: "inline" | "menu"
}

/** Nhớ lựa chọn 1 năm để proxy không chuyển về ngôn ngữ đoán theo vị trí (src/i18n/detect.ts). */
function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`
}

/** Chuyển sang trang tương ứng ở ngôn ngữ khác; chưa có bản dịch thì về trang chủ ngôn ngữ đó. */
export default function LanguageSwitcher({ className, onNavigate, variant = "inline" }: LanguageSwitcherProps) {
  const pathname = usePathname() ?? "/"
  const locale = useLocale()
  const { header } = useDictionary()

  if (ENABLED_LOCALES.length < 2) return null

  const choose = (target: Locale) => {
    rememberLocale(target)
    trackEvent("language_switch", { from: locale, to: target })
    onNavigate?.()
  }

  if (variant === "menu") {
    return (
      <div className={cn("relative group/lang", className)}>
        <button
          type="button"
          aria-haspopup="true"
          aria-label={header.languageAria}
          title={LOCALE_NAMES[locale].full}
          className="inline-flex items-center gap-1 h-10 px-2 rounded-lg text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer">
          <Globe className="w-4 h-4" />
          {LOCALE_NAMES[locale].short}
          <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover/lang:rotate-180" />
        </button>
        <div className="invisible opacity-0 translate-y-2 group-hover/lang:visible group-hover/lang:opacity-100 group-hover/lang:translate-y-0 group-focus-within/lang:visible group-focus-within/lang:opacity-100 group-focus-within/lang:translate-y-0 transition-all duration-200 absolute right-0 top-full pt-2">
          <ul className="min-w-[180px] bg-white border border-gray-200 rounded-xl shadow-xl p-1">
            {ENABLED_LOCALES.map((target) => (
              <li key={target}>
                {target === locale ? (
                  <span
                    aria-current="true"
                    lang={target}
                    className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-orange-600 bg-orange-50">
                    {LOCALE_NAMES[target].full}
                    <Check className="w-4 h-4" />
                  </span>
                ) : (
                  <Link
                    href={alternatePath(pathname, target)}
                    hrefLang={target}
                    lang={target}
                    onClick={() => choose(target)}
                    className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-orange-50 transition-colors">
                    {LOCALE_NAMES[target].full}
                    <span className="text-xs text-gray-400">{LOCALE_NAMES[target].short}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

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
                onClick={() => choose(target)}
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
