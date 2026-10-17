import { Be_Vietnam_Pro } from "next/font/google"
import "../globals.css"
import SiteShell from "@/components/layout/SiteShell"
import { rootMetadata, rootViewport } from "@/lib/rootMetadata"

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata = rootMetadata("vi")
export const viewport = rootViewport

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SiteShell locale="vi" fontClassName={beVietnamPro.variable}>
      {children}
    </SiteShell>
  )
}
