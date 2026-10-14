import type { Metadata } from "next"
import { Be_Vietnam_Pro } from "next/font/google"
import "./globals.css"
import JsonLd from "@/components/JsonLd"
import GoogleAnalytics from "@/components/GoogleAnalytics"
import ClarityAnalytics from "@/components/ClarityAnalytics"
import { GoogleTagManager } from "@next/third-parties/google"
import { Toaster } from "sonner"
import { COMPANY_NAME, SITE_NAME, SITE_URL } from "@/lib/site"

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700"],
})

const DEFAULT_TITLE = "Nextchain.site | Landing page & website làm trọn gói"
const DEFAULT_DESCRIPTION =
  "Bạn tập trung bán hàng, Nextchain viết nội dung, thiết kế, xuất bản và vận hành website. Landing page theo tháng cho cơ sở nhỏ; website và phần mềm theo dự án cho doanh nghiệp."

export const metadata: Metadata = {
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
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
    locale: "vi_VN",
    url: SITE_URL,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
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
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
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

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

import { ModalProvider } from "@/context/ModalContext"
import ConditionalLayout from "@/components/layout/ConditionalLayout"
import FloatingContact from "@/components/layout/FloatingContact"
import ConsentGate from "@/components/marketing/ConsentGate"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${beVietnamPro.variable} antialiased`}>
        <JsonLd />
        <ConsentGate>
          <GoogleAnalytics gaId={["G-Z8NT4N1ZKB", "G-M1WX07RXCV"]} />
          <ClarityAnalytics projectId="vkqca6mwj1" />
          <GoogleTagManager gtmId="GTM-MCFFZTLK" />
        </ConsentGate>

        <ModalProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </ModalProvider>
        <FloatingContact />
        <Toaster />
      </body>
    </html>
  )
}
