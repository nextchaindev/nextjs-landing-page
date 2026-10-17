import type { Metadata } from "next"
import { Be_Vietnam_Pro } from "next/font/google"
import "./globals.css"
import SiteShell from "@/components/layout/SiteShell"
import NotFoundView from "@/components/marketing/NotFoundView"
import { getDictionary } from "@/i18n/dictionaries"

// Có nhiều root layout (mỗi ngôn ngữ một cái) nên URL không khớp route nào do file này xử lý.
// Mặc định tiếng Việt; trang 404 theo ngôn ngữ nằm ở (vi)/not-found.tsx và ko/not-found.tsx.
const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: getDictionary("vi").notFound.title,
  robots: { index: false, follow: true },
}

export default function GlobalNotFound() {
  return (
    <SiteShell locale="vi" fontClassName={beVietnamPro.variable}>
      <NotFoundView locale="vi" />
    </SiteShell>
  )
}
