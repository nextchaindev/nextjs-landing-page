import { absoluteUrl } from "@/lib/site"
import {
  DEFAULT_LOCALE,
  ENABLED_LOCALES,
  LEGAL_REVIEWED_LOCALES,
  LOCALES,
  localizePath,
  type Locale,
  type NonDefaultLocale,
} from "./config"
import {
  INDUSTRY_SLUGS,
  LEGAL_SLUGS,
  MONTHLY_MANAGEMENT_SLUG,
  PROJECT_SLUGS,
  SERVICE_SLUGS,
  STATIC_PAGE_SLUGS,
  TEMPLATE_SLUGS,
} from "./slugs"

/**
 * Bảng đối ứng đường dẫn giữa các ngôn ngữ, khóa là đường dẫn tiếng Việt (ngôn ngữ gốc).
 * Thêm một dòng khi một trang được dịch và công khai — bảng này cũng là nguồn cho hreflang (#25).
 * Đường dẫn ở đây KHÔNG gồm tiền tố ngôn ngữ.
 */
type RouteTable = Record<string, Partial<Record<NonDefaultLocale, string>>>

const OTHER_LOCALES: NonDefaultLocale[] = ["ko", "en"]

/** Cùng một đường dẫn (không tiền tố) cho mọi ngôn ngữ ngoài tiếng Việt. */
function sameForAll(path: string): Partial<Record<NonDefaultLocale, string>> {
  return Object.fromEntries(OTHER_LOCALES.map((locale) => [locale, path]))
}

function entriesFor(prefix: string, viPrefix: string, slugs: Record<string, string>): RouteTable {
  return Object.fromEntries(Object.entries(slugs).map(([vi, other]) => [`${viPrefix}/${vi}`, sameForAll(`${prefix}/${other}`)]))
}

function legalEntries(): RouteTable {
  const entries: RouteTable = {}
  for (const [vi, other] of Object.entries(LEGAL_SLUGS)) {
    const locales = OTHER_LOCALES.filter((locale) => LEGAL_REVIEWED_LOCALES.includes(locale))
    if (locales.length > 0) entries[vi] = Object.fromEntries(locales.map((locale) => [locale, other]))
  }
  return entries
}

/**
 * Bảng đối ứng đường dẫn giữa các ngôn ngữ, khóa là đường dẫn tiếng Việt (ngôn ngữ gốc).
 * Mỗi dòng ứng với một trang đã được dịch và công khai — bảng này cũng là nguồn cho hreflang và sitemap.
 * Đường dẫn ở đây KHÔNG gồm tiền tố ngôn ngữ. Slug nằm ở slugs.ts. Bài blog không nằm ở đây: bản dịch lưu trong
 * Supabase (src/lib/blog.ts), trang bài tự khai báo hreflang và LanguageSwitcher đọc thẻ hreflang đó.
 */
export const ROUTE_TRANSLATIONS: RouteTable = {
  "/": sameForAll("/"),
  "/bang-gia": sameForAll("/pricing"),
  "/lien-he": sameForAll("/contact"),
  ...Object.fromEntries(Object.entries(STATIC_PAGE_SLUGS).map(([vi, other]) => [vi, sameForAll(other)])),
  ...entriesFor("/services", "/dich-vu", SERVICE_SLUGS),
  [`/dich-vu/${MONTHLY_MANAGEMENT_SLUG.vi}`]: sameForAll(`/services/${MONTHLY_MANAGEMENT_SLUG.other}`),
  ...entriesFor("/solutions", "/giai-phap", INDUSTRY_SLUGS),
  ...entriesFor("/templates", "/mau-website", TEMPLATE_SLUGS),
  ...Object.fromEntries(PROJECT_SLUGS.map((slug) => [`/du-an/${slug}`, sameForAll(`/projects/${slug}`)])),
  ...legalEntries(),
}

function stripLocale(pathname: string): { locale: Locale; path: string } {
  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue
    if (pathname === `/${locale}`) return { locale, path: "/" }
    if (pathname.startsWith(`/${locale}/`)) return { locale, path: pathname.slice(locale.length + 1) }
  }
  return { locale: DEFAULT_LOCALE, path: pathname || "/" }
}

function parentPath(path: string) {
  const cut = path.lastIndexOf("/")
  return cut <= 0 ? "/" : path.slice(0, cut)
}

/**
 * Đường dẫn của trang hiện tại ở ngôn ngữ `target`. Trang chưa có bản dịch (hoặc không nằm trong bảng, vd bài blog)
 * thì về trang cha gần nhất đã dịch: /blog/<bài> → /ko/blog, cuối cùng là trang chủ.
 */
export function alternatePath(pathname: string, target: Locale): string {
  const { locale: current, path } = stripLocale(pathname)
  if (current === target) return localizePath(path, target)

  for (let candidate = path; ; candidate = parentPath(candidate)) {
    const viPath =
      current === DEFAULT_LOCALE
        ? candidate
        : Object.entries(ROUTE_TRANSLATIONS).find(([, translations]) => translations[current as NonDefaultLocale] === candidate)?.[0]
    const translated =
      viPath === undefined ? undefined : target === DEFAULT_LOCALE ? viPath : ROUTE_TRANSLATIONS[viPath]?.[target as NonDefaultLocale]
    if (translated !== undefined) return localizePath(translated, target)
    if (candidate === "/") return localizePath("/", target)
  }
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
  return languagesFromPaths(Object.fromEntries(LOCALES.map((locale) => [locale, pathForLocale(viPath, locale)])))
}

/**
 * Bản đồ hreflang từ đường dẫn (đã gồm tiền tố) của từng bản dịch — dùng cho trang không nằm trong ROUTE_TRANSLATIONS
 * (bài blog lưu trong DB). Chỉ giữ ngôn ngữ đã bật; dưới hai ngôn ngữ thì không cần hreflang.
 * x-default trỏ bản tiếng Việt, không có thì bản đầu tiên.
 */
export function languagesFromPaths(paths: Partial<Record<Locale, string | undefined>>): Record<string, string> | undefined {
  const languages: Record<string, string> = {}
  for (const locale of ENABLED_LOCALES) {
    const path = paths[locale]
    if (path !== undefined) languages[locale] = absoluteUrl(path)
  }
  const enabled = Object.keys(languages)
  if (enabled.length < 2) return undefined
  return { ...languages, "x-default": languages[DEFAULT_LOCALE] ?? languages[enabled[0]] }
}

/**
 * Đổi liên kết nội bộ viết theo đường dẫn tiếng Việt (trong nội dung dịch) sang đường dẫn của `locale`.
 * Trả về undefined nếu trang đích chưa có bản dịch — người gọi bỏ liên kết đó thay vì trỏ vào 404.
 * Hỗ trợ #hash / ?query ở cuối.
 */
export function localizeHref(href: string, locale: Locale): string | undefined {
  if (locale === DEFAULT_LOCALE) return href
  const match = href.match(/^([^#?]*)([#?].*)?$/)
  const path = match?.[1] || "/"
  const suffix = match?.[2] ?? ""
  const translated = pathForLocale(path, locale)
  return translated === undefined ? undefined : `${translated}${suffix}`
}
