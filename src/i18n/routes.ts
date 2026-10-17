import { DEFAULT_LOCALE, LOCALES, localizePath, type Locale } from "./config"

/**
 * Bảng đối ứng đường dẫn giữa các ngôn ngữ, khóa là đường dẫn tiếng Việt (ngôn ngữ gốc).
 * Thêm một dòng khi một trang được dịch và công khai — bảng này cũng là nguồn cho hreflang (#25).
 * Đường dẫn ở đây KHÔNG gồm tiền tố ngôn ngữ.
 */
export const ROUTE_TRANSLATIONS: Record<string, Partial<Record<Exclude<Locale, "vi">, string>>> = {
  "/": { ko: "/" },
}

function stripLocale(pathname: string): { locale: Locale; path: string } {
  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue
    if (pathname === `/${locale}`) return { locale, path: "/" }
    if (pathname.startsWith(`/${locale}/`)) return { locale, path: pathname.slice(locale.length + 1) }
  }
  return { locale: DEFAULT_LOCALE, path: pathname || "/" }
}

/** Đường dẫn của trang hiện tại ở ngôn ngữ `target`; không có bản dịch thì về trang chủ của ngôn ngữ đó. */
export function alternatePath(pathname: string, target: Locale): string {
  const { locale: current, path } = stripLocale(pathname)
  if (current === target) return localizePath(path, target)

  const viPath =
    current === DEFAULT_LOCALE
      ? path
      : Object.entries(ROUTE_TRANSLATIONS).find(([, translations]) => translations[current as "ko"] === path)?.[0]

  if (viPath === undefined) return localizePath("/", target)
  if (target === DEFAULT_LOCALE) return viPath

  const translated = ROUTE_TRANSLATIONS[viPath]?.[target as "ko"]
  return localizePath(translated ?? "/", target)
}
