"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react"
import imageLandingPage from "@/assets/project-4.png"
import imageMobileProduct from "@/assets/b1d2ddd0462d3f186ceed6ffb811a6df98b993cc.png"
import { fadeInUp, staggerContainer, staggerItem } from "@/hooks/useScrollAnimation"
import { STARTING_PRICE } from "@/content/plans"

const HIGHLIGHTS = [`Từ ${STARTING_PRICE}/tháng`, "Không phí khởi tạo", "Dùng tên miền riêng hoặc miễn phí"]

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-24 md:pt-40 pb-12 md:pb-20 px-4 md:px-6 bg-linear-to-b from-orange-50/30 to-white">
      <div className="pointer-events-none absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-[#FFD6A8]/30 blur-[128px]" />
      <div className="relative max-w-[1200px] mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.div
            variants={staggerItem}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6">
            <Sparkles className="w-4 h-4 shrink-0" />
            Nextchain.site · Làm website trọn gói theo tháng
          </motion.div>

          <motion.h1
            variants={staggerItem}
            className="leading-tight text-gray-900 mb-4 md:mb-6 text-[28px] md:text-[44px] font-bold">
            Website chuyên nghiệp cho cơ sở của bạn.{" "}
            <span className="text-orange-600">Chúng tôi làm từ A–Z.</span>
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="text-base md:text-xl text-gray-700 mb-6 md:mb-8 leading-relaxed">
            Không cần biết thiết kế hay lập trình. Gửi thông tin cơ sở, chọn một trong ba phương án chúng tôi
            chuẩn bị — Nextchain hoàn thiện, xuất bản và quản lý website cho bạn theo gói tháng.
          </motion.p>

          <motion.div variants={staggerItem} className="flex flex-wrap gap-3 md:gap-4 mb-8 md:mb-10">
            <Link
              href="/mau-website"
              className="inline-flex items-center gap-2 h-12 md:h-14 px-6 md:px-8 rounded-xl font-bold bg-primary text-white shadow-lg shadow-primary/30 text-sm md:text-base transition-all duration-300 hover:bg-primary/90 hover:scale-105 active:scale-95">
              Xem mẫu theo ngành
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
            <Link
              href="/bang-gia"
              className="inline-flex items-center h-12 md:h-14 px-6 md:px-8 rounded-xl font-bold border border-gray-300 bg-white text-gray-900 text-sm md:text-base transition-all duration-300 hover:border-gray-400 hover:scale-105">
              Xem bảng giá
            </Link>
          </motion.div>

          <motion.ul
            variants={staggerItem}
            className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-x-6 pt-6 md:pt-8 border-t border-gray-200">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm md:text-base text-gray-700 font-medium">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                {item}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div className="relative" initial="hidden" animate="visible" variants={fadeInUp}>
          <div className="absolute -inset-4 bg-linear-to-br from-orange-200 to-orange-100 rounded-3xl transform rotate-2 opacity-30" />
          <div className="relative bg-white rounded-2xl shadow-2xl p-2 md:p-4">
            <Image
              src={imageLandingPage}
              alt="Landing page dự án căn hộ do Nextchain thiết kế"
              priority
              sizes="(min-width: 768px) 560px, 100vw"
              className="rounded-lg w-full h-[300px] md:h-[450px] object-cover"
            />
            <motion.div
              className="absolute -bottom-8 -left-8 w-40 hidden md:block"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              <Image
                src={imageMobileProduct}
                alt="Trang sản phẩm trên điện thoại do Nextchain thiết kế"
                sizes="160px"
                className="w-full h-auto drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
