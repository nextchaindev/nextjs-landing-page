import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import JsonLd from "@/components/JsonLd"
import GoogleAnalytics from "@/components/GoogleAnalytics"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Thiết kế Website Chuyên Nghiệp | Tăng Doanh Số Bán Hàng",
    template: "%s | NextChain",
  },
  description:
    "Thiết kế website chuyên nghiệp giúp doanh nghiệp tăng doanh số bán hàng. Landing page, website bán hàng, website doanh nghiệp với SEO tối ưu. Hơn 50+ dự án thành công.",
  keywords: [
    "thiết kế website",
    "thiết kế landing page",
    "website bán hàng",
    "website doanh nghiệp",
    "SEO website",
    "thiết kế web chuyên nghiệp",
    "tăng doanh số",
    "marketing online",
    "phát triển website",
    "NextChain",
  ],
  authors: [{ name: "NextChain" }],
  creator: "NextChain",
  publisher: "NextChain",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.nextchain.site"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://www.nextchain.site",
    title: "Thiết kế Website Chuyên Nghiệp | Tăng Doanh Số Bán Hàng",
    description:
      "Thiết kế website chuyên nghiệp giúp doanh nghiệp tăng doanh số bán hàng. Landing page, website bán hàng, website doanh nghiệp với SEO tối ưu.",
    siteName: "NextChain",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NextChain - Thiết kế Website Chuyên Nghiệp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thiết kế Website Chuyên Nghiệp | Tăng Doanh Số Bán Hàng",
    description:
      "Thiết kế website chuyên nghiệp giúp doanh nghiệp tăng doanh số bán hàng. Landing page, website bán hàng, website doanh nghiệp với SEO tối ưu.",
    images: ["/twitter-image.jpg"],
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
    // Thêm các mã xác minh khi có
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <JsonLd />
        <GoogleAnalytics gaId="G-Z8NT4N1ZKB" />
        {children}
      </body>
    </html>
  )
}
