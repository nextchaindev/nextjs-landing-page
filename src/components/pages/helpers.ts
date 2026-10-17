import { localizeHref } from "@/i18n/routes"
import type { Locale } from "@/i18n/config"

/** Tiền tệ dùng trong dữ liệu có cấu trúc (JSON-LD) theo ngôn ngữ. */
export const CURRENCY: Record<Locale, string> = { vi: "VND", ko: "KRW", en: "USD" }

/**
 * Liên kết trong nội dung dịch viết theo đường dẫn tiếng Việt: đổi sang ngôn ngữ hiện tại,
 * bỏ liên kết có trang đích chưa được dịch (thay vì trỏ vào 404).
 */
export function localizeLinks<T extends { href: string }>(links: T[], locale: Locale): T[] {
  return links.flatMap((link) => {
    const href = localizeHref(link.href, locale)
    return href === undefined ? [] : [{ ...link, href }]
  })
}
