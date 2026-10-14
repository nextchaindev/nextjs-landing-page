"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import HeroShowcase from "@/components/marketing/HeroShowcase"
import { STARTING_PRICE } from "@/content/plans"

const HIGHLIGHTS = ["Không phí khởi tạo cho gói tháng", "Tên miền riêng hoặc địa chỉ miễn phí"]

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-24 md:pt-36 pb-16 md:pb-24 px-4 md:px-6 bg-linear-to-b from-orange-50/40 to-white">
      <div className="pointer-events-none absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-[#FFD6A8]/30 blur-[128px]" />
      <div className="pointer-events-none absolute top-1/2 -left-48 w-[420px] h-[420px] rounded-full bg-[#BEDBFF]/30 blur-[128px]" />

      <div className="relative max-w-[1200px] mx-auto grid md:grid-cols-[1.05fr_1fr] gap-12 md:gap-16 items-center">
        <div>
          <p className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-xs md:text-sm font-medium mb-5">
            Landing page theo tháng · Website doanh nghiệp theo dự án
          </p>

          <h1 className="leading-[1.12] text-gray-900 text-[32px] md:text-[52px] font-bold tracking-tight">
            Website cho cơ sở của bạn. <span className="text-orange-600">Nextchain làm, bạn duyệt.</span>
          </h1>

          <p className="mt-5 text-base md:text-xl text-gray-700 leading-relaxed max-w-[34em]">
            Bạn gửi thông tin. Chúng tôi viết nội dung, thiết kế, xuất bản và chăm sóc website theo gói.
          </p>

          <div className="mt-7 grid sm:flex gap-3 md:gap-4">
            <Link
              href="/dich-vu/thiet-ke-landing-page"
              className="inline-flex items-center justify-center gap-2 h-12 md:h-14 px-6 md:px-8 rounded-xl font-bold bg-primary text-white shadow-lg shadow-primary/30 text-sm md:text-base transition-all duration-300 hover:bg-primary/90 hover:-translate-y-0.5 active:scale-95">
              Xem gói theo tháng
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
            <Link
              href="/dich-vu/thiet-ke-website-doanh-nghiep"
              className="inline-flex items-center justify-center h-12 md:h-14 px-6 md:px-8 rounded-xl font-bold border border-gray-300 bg-white text-gray-900 text-sm md:text-base transition-all duration-300 hover:border-gray-400 hover:-translate-y-0.5">
              Xem dịch vụ theo dự án
            </Link>
          </div>
          <p className="mt-3 text-sm text-gray-600">
            Gói tháng từ {STARTING_PRICE}/tháng, tối thiểu 6 tháng. Dự án lớn báo giá riêng.
          </p>

          <ul className="mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-2.5 sm:gap-x-6">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm md:text-base text-gray-700 font-medium">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <HeroShowcase />
      </div>
    </section>
  )
}
