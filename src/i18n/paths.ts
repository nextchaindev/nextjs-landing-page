import { DEFAULT_LOCALE, localizePath, type Locale } from "./config"

/**
 * Đường dẫn gốc của từng mục: [tiếng Việt, ngôn ngữ khác]. Khớp slugs.ts (STATIC_PAGE_SLUGS) và các trang
 * đã có sẵn (bang-gia/pricing, lien-he/contact).
 */
const SECTIONS = {
  services: ["/dich-vu", "/services"],
  solutions: ["/giai-phap", "/solutions"],
  projects: ["/du-an", "/projects"],
  templates: ["/mau-website", "/templates"],
  blog: ["/blog", "/blog"],
  pricing: ["/bang-gia", "/pricing"],
  contact: ["/lien-he", "/contact"],
  process: ["/quy-trinh", "/process"],
  about: ["/ve-chung-toi", "/about"],
  compare: ["/so-sanh/tu-lam-hay-thue-tron-goi", "/compare/diy-or-done-for-you"],
  terms: ["/dieu-khoan", "/terms"],
  privacy: ["/chinh-sach-bao-mat", "/privacy-policy"],
  cancellation: ["/chinh-sach-huy-dich-vu", "/cancellation-policy"],
} as const

export type Section = keyof typeof SECTIONS

/** Đường dẫn (đã gồm tiền tố ngôn ngữ) tới một mục, tuỳ chọn kèm slug của mục con. */
export function sectionPath(section: Section, locale: Locale, slug?: string): string {
  const base = SECTIONS[section][locale === DEFAULT_LOCALE ? 0 : 1]
  return localizePath(slug ? `${base}/${slug}` : base, locale)
}
