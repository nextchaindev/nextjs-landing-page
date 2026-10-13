import { MetadataRoute } from "next"
import { absoluteUrl } from "@/lib/site"
import { INDUSTRIES } from "@/content/industries"
import { SERVICE_DETAILS } from "@/content/services"
import { TEMPLATES, isTemplateIndexable } from "@/content/templates"
import { BLOG_POSTS } from "@/content/blog"
import { LEGAL_UPDATED_AT } from "@/content/legal"

/**
 * Date of the last substantive content change to the marketing pages.
 * Bump only when page content actually changes — Google ignores lastmod
 * values that move on every deploy.
 */
const CONTENT_UPDATED_AT = "2026-10-13"

const STATIC_PATHS = [
  "/",
  "/bang-gia",
  "/mau-website",
  "/dich-vu",
  "/dich-vu/quan-tri-website-theo-thang",
  "/quy-trinh",
  "/ve-chung-toi",
  "/lien-he",
]

const LEGAL_PATHS = ["/dieu-khoan", "/chinh-sach-bao-mat", "/chinh-sach-huy-dich-vu"]

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, lastModified: string) => ({
    url: absoluteUrl(path),
    lastModified,
  })

  return [
    ...STATIC_PATHS.map((path) => entry(path, CONTENT_UPDATED_AT)),
    ...SERVICE_DETAILS.map((service) => entry(`/dich-vu/${service.slug}`, CONTENT_UPDATED_AT)),
    ...INDUSTRIES.map((industry) => entry(`/giai-phap/${industry.slug}`, CONTENT_UPDATED_AT)),
    ...TEMPLATES.filter(isTemplateIndexable).map((template) =>
      entry(`/mau-website/${template.slug}`, CONTENT_UPDATED_AT),
    ),
    ...(BLOG_POSTS.length > 0
      ? [
          entry(
            "/blog",
            BLOG_POSTS.map((post) => post.updatedAt ?? post.publishedAt).sort().at(-1)!,
          ),
        ]
      : []),
    ...BLOG_POSTS.map((post) => entry(`/blog/${post.slug}`, post.updatedAt ?? post.publishedAt)),
    ...LEGAL_PATHS.map((path) => entry(path, LEGAL_UPDATED_AT)),
  ]
}
