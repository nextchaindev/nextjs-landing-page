import type { Metadata } from "next"
import { SITE_NAME, absoluteUrl } from "@/lib/site"

interface PageMetadataInput {
  title: string
  description: string
  path: string
  noindex?: boolean
  /** Use the title verbatim instead of the "%s | Nextchain.site" template. */
  absoluteTitle?: boolean
}

export function pageMetadata({
  title,
  description,
  path,
  noindex,
  absoluteTitle,
}: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "vi_VN",
      url: absoluteUrl(path),
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/og-image.png"],
    },
    ...(noindex && { robots: { index: false, follow: true } }),
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

export function serviceSchema({
  name,
  description,
  path,
  audience,
}: {
  name: string
  description: string
  path: string
  audience?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    serviceType: "Thiết kế và quản trị website",
    areaServed: { "@type": "Country", name: "Vietnam" },
    provider: { "@id": `${absoluteUrl("/")}#organization` },
    ...(audience && {
      audience: { "@type": "BusinessAudience", audienceType: audience },
    }),
  }
}
