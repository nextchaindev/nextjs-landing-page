import { absoluteUrl } from "@/lib/site"
import { DEFAULT_LOCALE, ENABLED_LOCALES, LOCALES, localizePath, type Locale, type NonDefaultLocale } from "./config"

/**
 * Bảng đối ứng đường dẫn giữa các ngôn ngữ, khóa là đường dẫn tiếng Việt (ngôn ngữ gốc).
 * Thêm một dòng khi một trang được dịch và công khai — bảng này cũng là nguồn cho hreflang (#25).
 * Đường dẫn ở đây KHÔNG gồm tiền tố ngôn ngữ.
 */
export const ROUTE_TRANSLATIONS: Record<string, Partial<Record<NonDefaultLocale, string>>> = {
  "/": { ko: "/", en: "/" },
  "/bang-gia": { ko: "/pricing", en: "/pricing" },
  "/lien-he": { ko: "/contact", en: "/contact" },
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
      : Object.entries(ROUTE_TRANSLATIONS).find(([, translations]) => translations[current as NonDefaultLocale] === path)?.[0]

  if (viPath === undefined) return localizePath("/", target)
  if (target === DEFAULT_LOCALE) return viPath

  const translated = ROUTE_TRANSLATIONS[viPath]?.[target as NonDefaultLocale]
  return localizePath(translated ?? "/", target)
}

/** Đường dẫn tiếng Việt (gốc) của một trang ở bất kỳ ngôn ngữ nào; undefined nếu trang đó không có bản gốc tương ứng. */
export function toDefaultPath(pathname: string): string | undefined {
  const { locale, path } = stripLocale(pathname)
  if (locale === DEFAULT_LOCALE) return path
  return Object.entries(ROUTE_TRANSLATIONS).find(([, translations]) => translations[locale as NonDefaultLocale] === path)?.[0]
}

/** Đường dẫn (có tiền tố) của trang gốc `viPath` ở ngôn ngữ `locale`; undefined nếu chưa có bản dịch. */
export function pathForLocale(viPath: string, locale: Locale): string | undefined {
  if (locale === DEFAULT_LOCALE) return viPath
  const translated = ROUTE_TRANSLATIONS[viPath]?.[locale as NonDefaultLocale]
  return translated === undefined ? undefined : localizePath(translated, locale)
}

/**
 * Bản đồ hreflang của một trang, chỉ gồm các ngôn ngữ đã bật (NEXT_PUBLIC_ENABLED_LOCALES) và có bản dịch.
 * Trả về undefined nếu trang chỉ có một ngôn ngữ — không cần khai báo hreflang.
 * Mỗi bản dịch đều phải gọi hàm này để các trang trỏ ngược lại nhau (yêu cầu của Google).
 */
export function alternateLanguages(pathname: string): Record<string, string> | undefined {
  const viPath = toDefaultPath(pathname)
  if (viPath === undefined) return undefined

  const languages: Record<string, string> = {}
  for (const locale of ENABLED_LOCALES) {
    const path = pathForLocale(viPath, locale)
    if (path !== undefined) languages[locale] = absoluteUrl(path)
  }
  if (Object.keys(languages).length < 2) return undefined

  return { ...languages, "x-default": absoluteUrl(viPath) }
}
