import { NextResponse, type NextRequest } from "next/server"
import { DEFAULT_LOCALE, ENABLED_LOCALES, LOCALE_COOKIE, isLocale, type Locale } from "./config"
import { pathForLocale } from "./routes"

/** Quốc gia (ISO 3166-1 alpha-2, header của Vercel/Cloudflare) → ngôn ngữ. Quốc gia khác dùng tiếng Anh. */
const COUNTRY_LOCALES: Record<string, Locale> = { VN: "vi", KR: "ko" }

/** Bot/crawler không bị chuyển: Googlebot crawl từ Mỹ, chuyển nó sang /en thì bản tiếng Việt mất index. */
const BOT_PATTERN = /bot|crawler|spider|slurp|facebookexternalhit|scrap|lighthouse|headless/i

/**
 * Ngôn ngữ nên hiển thị: cookie người dùng tự chọn → ngôn ngữ đầu tiên của trình duyệt (chỉ vi/ko — nhiều người Việt
 * để trình duyệt tiếng Anh nên "en" không phải tín hiệu) → quốc gia theo IP. Không có header vị trí (local) thì tiếng Việt.
 */
function preferredLocale(request: NextRequest): Locale {
  const chosen = request.cookies.get(LOCALE_COOKIE)?.value
  if (chosen && isLocale(chosen)) return chosen

  const browser = request.headers.get("accept-language")?.split(",")[0]?.trim().slice(0, 2).toLowerCase()
  if (browser === "vi" || browser === "ko") return browser

  const country = request.headers.get("x-vercel-ip-country") ?? request.headers.get("cf-ipcountry")
  if (!country) return DEFAULT_LOCALE
  return COUNTRY_LOCALES[country.toUpperCase()] ?? "en"
}

/**
 * Chuyển (307) từ trang tiếng Việt sang bản dịch theo vị trí khi người dùng mở trang. Chỉ áp dụng khi ngôn ngữ đích đã bật
 * (NEXT_PUBLIC_ENABLED_LOCALES) và trang đó đã có bản dịch; không bao giờ chuyển khỏi /ko, /en (URL có tiền tố là lựa chọn rõ ràng).
 */
export function localeRedirect(request: NextRequest): NextResponse | undefined {
  if (request.method !== "GET") return undefined
  // Chỉ lần tải trang đầy đủ. Điều hướng phía client (RSC, prefetch) không chuyển, kẻo bấm "VI" lại bị đẩy về bản dịch.
  if (request.headers.get("rsc") || !request.headers.get("accept")?.includes("text/html")) return undefined
  if (BOT_PATTERN.test(request.headers.get("user-agent") ?? "")) return undefined

  const locale = preferredLocale(request)
  if (locale === DEFAULT_LOCALE || !ENABLED_LOCALES.includes(locale)) return undefined

  const target = pathForLocale(request.nextUrl.pathname, locale)
  if (target === undefined) return undefined

  const url = request.nextUrl.clone()
  url.pathname = target
  return NextResponse.redirect(url)
}
