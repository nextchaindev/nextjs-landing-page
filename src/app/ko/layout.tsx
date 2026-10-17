import { Be_Vietnam_Pro, Noto_Sans_KR } from "next/font/google"
import "../globals.css"
import SiteShell from "@/components/layout/SiteShell"
import { rootMetadata, rootViewport } from "@/lib/rootMetadata"

// Be Vietnam Pro vẫn cần cho chữ Latin/số đang dùng chung theme; Noto Sans KR là font chính.
const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
})

export const metadata = rootMetadata("ko")
export const viewport = rootViewport

export default function KoRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SiteShell
      locale="ko"
      fontClassName={`${beVietnamPro.variable} ${notoSansKr.variable}`}
      fontVariable="--font-noto-sans-kr">
      {children}
    </SiteShell>
  )
}
