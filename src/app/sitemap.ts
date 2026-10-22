import { MetadataRoute } from "next"
import { absoluteUrl } from "@/lib/site"
import { INDUSTRIES } from "@/content/industries"
import { SERVICE_DETAILS } from "@/content/services"
import { templatesWithDetail } from "@/content/templates"
import { LEGAL_UPDATED_AT } from "@/content/legal"
import { PROJECTS } from "@/content/projects"
import { ENABLED_LOCALES, LOCALES, localizePath, type NonDefaultLocale } from "@/i18n/config"
import { ROUTE_TRANSLATIONS, alternateLanguages, languagesFromPaths } from "@/i18n/routes"
import { sectionPath } from "@/i18n/paths"
import { getAllPublishedPosts, postAlternates } from "@/lib/blog"

/**
 * Date of the last substantive content change to the marketing pages.
 * Bump only when page content actually changes — Google ignores lastmod
 * values that move on every deploy.
 */
const CONTENT_UPDATED_AT = "2026-10-21"

const STATIC_PATHS = [
  "/",
  "/bang-gia",
  "/mau-website",
  "/dich-vu",
  "/dich-vu/quan-tri-website-theo-thang",
  "/giai-phap",
  "/du-an",
  "/quy-trinh",
  "/so-sanh/tu-lam-hay-thue-tron-goi",
  "/ve-chung-toi",
  "/lien-he",
]

const LEGAL_PATHS = ["/dieu-khoan", "/chinh-sach-bao-mat", "/chinh-sach-huy-dich-vu"]

// Bài blog lấy từ Supabase: sitemap dựng lại khi admin lưu bài (updateTag) và tối đa mỗi giờ.
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entry = (path: string, lastModified: string) => {
    const languages = alternateLanguages(path)
    return {
      url: absoluteUrl(path),
      lastModified,
      ...(languages && { alternates: { languages } }),
    }
  }

  // Trang đã dịch của các ngôn ngữ đã bật. Ngôn ngữ chưa bật không vào sitemap (và tự noindex).
  const translatedEntries = LOCALES.filter((locale) => locale !== "vi" && ENABLED_LOCALES.includes(locale)).flatMap(
    (locale) =>
      Object.values(ROUTE_TRANSLATIONS).flatMap((translations) => {
        const path = translations[locale as NonDefaultLocale]
        return path === undefined ? [] : [entry(localizePath(path, locale), CONTENT_UPDATED_AT)]
      }),
  )

  // Bài blog (mọi ngôn ngữ đã bật), hreflang theo các bản dịch lưu trong DB.
  const posts = (await getAllPublishedPosts()).filter((post) => post.locale === "vi" || ENABLED_LOCALES.includes(post.locale))
  const viPosts = posts.filter((post) => post.locale === "vi")
  const blogEntries = posts.map((post) => {
    const languages = languagesFromPaths(postAlternates(post, posts))
    return {
      url: absoluteUrl(sectionPath("blog", post.locale, post.slug)),
      lastModified: post.updatedAt ?? post.publishedAt,
      ...(languages && { alternates: { languages } }),
    }
  })

  return [
    ...STATIC_PATHS.map((path) => entry(path, CONTENT_UPDATED_AT)),
    ...SERVICE_DETAILS.map((service) => entry(`/dich-vu/${service.slug}`, CONTENT_UPDATED_AT)),
    ...INDUSTRIES.map((industry) => entry(`/giai-phap/${industry.slug}`, CONTENT_UPDATED_AT)),
    ...PROJECTS.map((project) => entry(`/du-an/${project.slug}`, CONTENT_UPDATED_AT)),
    ...templatesWithDetail().map((template) =>
      entry(`/mau-website/${template.slug}`, CONTENT_UPDATED_AT),
    ),
    ...(viPosts.length > 0
      ? [entry("/blog", viPosts.map((post) => post.updatedAt ?? post.publishedAt).sort().at(-1)!)]
      : []),
    ...blogEntries,
    ...LEGAL_PATHS.map((path) => entry(path, LEGAL_UPDATED_AT)),
    ...translatedEntries,
  ]
}
