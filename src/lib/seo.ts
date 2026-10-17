import type { Metadata } from "next"
import { SITE_NAME, absoluteUrl } from "@/lib/site"
import { DEFAULT_LOCALE, ENABLED_LOCALES, OG_LOCALES, type Locale } from "@/i18n/config"
import { alternateLanguages } from "@/i18n/routes"

interface PageMetadataInput {
  title: string
  description: string
  path: string
  noindex?: boolean
  /** Use the title verbatim instead of the "%s | Nextchain.site" template. */
  absoluteTitle?: boolean
  /** Ảnh OG riêng của trang (đường dẫn public, vd "/videos/xxx-poster.jpg"). */
  ogImage?: string
  /** Ngôn ngữ của trang; ngôn ngữ chưa bật (NEXT_PUBLIC_ENABLED_LOCALES) tự noindex. */
  locale?: Locale
}

export function pageMetadata({
  title,
  description,
  path,
  noindex,
  absoluteTitle,
  ogImage,
  locale = DEFAULT_LOCALE,
}: PageMetadataInput): Metadata {
  const published = locale === DEFAULT_LOCALE || ENABLED_LOCALES.includes(locale)
  const languages = alternateLanguages(path)
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`
  const images = ogImage
    ? [{ url: ogImage, width: 1200, height: 630, alt: title }]
    : [{ url: "/og-image-1200x630.jpg", width: 1200, height: 630, alt: SITE_NAME }]
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path, ...(languages && { languages }) },
    openGraph: {
      type: "website",
      locale: OG_LOCALES[locale],
      url: absoluteUrl(path),
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [images[0].url],
    },
    ...((noindex || !published) && { robots: { index: false, follow: true } }),
  }
}

export interface Crumb {
  name: string
  path: string
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  }
}

const SERVICE_SCHEMA_TEXT: Record<Locale, { serviceType: string; country: string }> = {
  vi: { serviceType: "Thiết kế và quản trị website", country: "Vietnam" },
  ko: { serviceType: "웹사이트 디자인 및 운영 관리", country: "South Korea" },
}

export function serviceSchema({
  name,
  description,
  path,
  audience,
  locale = DEFAULT_LOCALE,
}: {
  name: string
  description: string
  path: string
  audience?: string
  locale?: Locale
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    serviceType: SERVICE_SCHEMA_TEXT[locale].serviceType,
    areaServed: { "@type": "Country", name: SERVICE_SCHEMA_TEXT[locale].country },
    provider: { "@id": `${absoluteUrl("/")}#organization` },
    ...(audience && {
      audience: { "@type": "BusinessAudience", audienceType: audience },
    }),
  }
}
