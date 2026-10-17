export const LOCALES = ["vi", "ko", "en"] as const
export type Locale = (typeof LOCALES)[number]
/** Ngôn ngữ có tiền tố URL (/ko, /en). */
export type NonDefaultLocale = Exclude<Locale, "vi">

/** Ngôn ngữ mặc định: URL không có tiền tố (/bang-gia). Các ngôn ngữ khác nằm dưới /<locale>. */
export const DEFAULT_LOCALE: Locale = "vi"

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}

/** Thêm tiền tố ngôn ngữ vào đường dẫn nội bộ: localizePath("/", "ko") → "/ko". */
export function localizePath(path: string, locale: Locale) {
  if (locale === DEFAULT_LOCALE) return path
  return path === "/" ? `/${locale}` : `/${locale}${path}`
}

/** BCP 47 cho `inLanguage`, `Intl.*`. */
export const LANGUAGE_TAGS: Record<Locale, string> = {
  vi: "vi-VN",
  ko: "ko-KR",
  en: "en-US",
}

/** Giá trị `og:locale`. */
export const OG_LOCALES: Record<Locale, string> = {
  vi: "vi_VN",
  ko: "ko_KR",
  en: "en_US",
}

/**
 * Ngôn ngữ đã công khai. Route của ngôn ngữ chưa bật vẫn tồn tại (noindex) để xem thử,
 * nhưng không hiện trong bộ chuyển ngôn ngữ. Bật khi sẵn sàng: NEXT_PUBLIC_ENABLED_LOCALES=vi,ko
 */
export const ENABLED_LOCALES: Locale[] = (process.env.NEXT_PUBLIC_ENABLED_LOCALES ?? DEFAULT_LOCALE)
  .split(",")
  .map((value) => value.trim())
  .filter(isLocale)

/** Tên ngôn ngữ viết bằng chính ngôn ngữ đó — dùng cho bộ chuyển ngôn ngữ. */
export const LOCALE_NAMES: Record<Locale, { short: string; full: string }> = {
  vi: { short: "VI", full: "Tiếng Việt" },
  ko: { short: "KO", full: "한국어" },
  en: { short: "EN", full: "English" },
}
