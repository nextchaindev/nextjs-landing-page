import type { Metadata, Viewport } from "next"
import { COMPANY_NAME, SITE_NAME, SITE_URL } from "@/lib/site"
import { OG_LOCALES, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"

/** Metadata mặc định của từng ngôn ngữ; từng trang ghi đè bằng pageMetadata(). */
export function rootMetadata(locale: Locale): Metadata {
  const { defaultTitle, defaultDescription } = getDictionary(locale).meta

  return {
    title: {
      default: defaultTitle,
      template: `%s | ${SITE_NAME}`,
    },
    description: defaultDescription,
    applicationName: SITE_NAME,
    authors: [{ name: COMPANY_NAME }],
    creator: COMPANY_NAME,
    publisher: COMPANY_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(SITE_URL),
    // Canonical is set per page via pageMetadata(); no site-wide default so
    // pages without their own canonical don't point at the homepage.
    openGraph: {
      type: "website",
      locale: OG_LOCALES[locale],
      url: SITE_URL,
      title: defaultTitle,
      description: defaultDescription,
      siteName: SITE_NAME,
      images: [
        {
          url: "/og-image-1200x630.jpg",
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: defaultDescription,
      images: ["/og-image-1200x630.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      // Đặt GOOGLE_SITE_VERIFICATION trong .env.local (giá trị content= của
      // meta tag Search Console) hoặc xác minh bằng DNS rồi bỏ trống.
      ...(process.env.GOOGLE_SITE_VERIFICATION && {
        google: process.env.GOOGLE_SITE_VERIFICATION,
      }),
    },
  }
}

export const rootViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}
