import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Không tìm thấy trang",
  robots: { index: false, follow: true },
}

const LINKS = [
  { href: "/", label: "Trang chủ" },
  { href: "/bang-gia", label: "Bảng giá" },
  { href: "/mau-website", label: "Mẫu website" },
  { href: "/dich-vu", label: "Dịch vụ" },
  { href: "/lien-he", label: "Liên hệ" },
]

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 pt-28 pb-20 bg-linear-to-b from-orange-50/50 to-white">
      <div className="max-w-[640px] text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Lỗi 404</p>
        <h1 className="mt-3 text-3xl md:text-5xl font-bold text-gray-900 leading-tight">Không tìm thấy trang bạn cần</h1>
        <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
          Đường dẫn có thể đã đổi hoặc gõ nhầm. Bạn có thể xem các trang dưới đây hoặc liên hệ để được tư vấn trực
          tiếp.
        </p>
        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex items-center h-11 px-5 rounded-full border border-gray-300 bg-white font-semibold text-gray-800 hover:border-primary hover:text-primary transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
