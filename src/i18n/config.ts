export const LOCALES = ["vi", "ko"] as const
export type Locale = (typeof LOCALES)[number]

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
}

/** Giá trị `og:locale`. */
export const OG_LOCALES: Record<Locale, string> = {
  vi: "vi_VN",
  ko: "ko_KR",
}
