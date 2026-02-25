"use client"

import { Button } from "@/components/ui/button"
import { ImageWithFallback } from "@/components/figma/ImageWithFallback"
import { ArrowRight, ShoppingCart } from "lucide-react"
import { CounterStat } from "@/components/CounterStat"
import { IMAGES, IMAGE_ALT_TEXTS } from "@/constants/images"
import image_b1d2ddd0462d3f186ceed6ffb811a6df98b993cc from "@/assets/b1d2ddd0462d3f186ceed6ffb811a6df98b993cc.png"

import { useModal } from "@/context/ModalContext"

interface HeroProps {
  heroStatsRef: React.RefObject<HTMLDivElement | null>
  heroStatsVisible: boolean
}

export default function Hero({ heroStatsRef, heroStatsVisible }: HeroProps) {
  const { openModalClean } = useModal()

  return (
    <section
      id="home"
      className="pt-24 md:pt-40 pb-12 md:pb-20 px-4 md:px-6 bg-linear-to-b from-orange-50/30 to-white">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        <div>
          <div className="inline-flex items-center whitespace-nowrap gap-1 md:gap-2 px-1 md:px-4 py-1.5 md:py-2 bg-orange-100 text-orange-700 rounded-full text-[11px] md:text-sm font-medium mb-4 md:mb-6">
            <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 shrink-0" />
            <span className="leading-tight">
              Giải pháp website cho cửa hàng & doanh nghiệp kinh doanh
            </span>
          </div>

          <h1 className="leading-tight text-gray-900 mb-4 md:mb-6 text-[28px] md:text-[44px]">
            Thiết kế website giúp bạn
            <br />
            <span className="text-orange-600 font-bold">
              {" "}
              BÁN ĐƯỢC NHIỀU HƠN
            </span>
          </h1>

          <p className="text-base md:text-xl text-gray-700 mb-6 md:mb-8 leading-relaxed">
            Thu hút khách hàng mới, tăng tỉ lệ chuyển đổi và tối ưu hoạt động
            kinh doanh mỗi ngày.
          </p>

          <div className="flex flex-wrap gap-3 md:gap-4 mb-8 md:mb-12">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white gap-2 shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105 active:scale-95 text-sm md:text-base h-12 md:h-14 px-6 md:px-8 rounded-xl font-bold"
              onClick={openModalClean}>
              Nhận tư vấn miễn phí
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </div>

          <div
            ref={heroStatsRef}
            className="flex items-center gap-4 md:gap-8 pt-6 md:pt-8 border-t border-gray-200">
            <CounterStat
              target={50}
              suffix="+"
              label="Dự án hoàn thành"
              isVisible={heroStatsVisible}
            />
            <div className="w-px h-10 md:h-14 bg-gray-300"></div>
            <CounterStat
              target={30}
              suffix="+"
              label="Doanh nghiệp tin tưởng"
              isVisible={heroStatsVisible}
            />
            <div className="w-px h-10 md:h-14 bg-gray-300"></div>
            <CounterStat
              target={98}
              suffix="%"
              label="Khách hàng hài lòng"
              isVisible={heroStatsVisible}
            />
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-linear-to-br from-orange-200 to-orange-100 rounded-3xl transform rotate-2 opacity-30"></div>

          <div className="relative bg-white rounded-2xl shadow-2xl p-2 md:p-4">
            <ImageWithFallback
              src={IMAGES.heroMockup}
              alt={IMAGE_ALT_TEXTS.heroMockup}
              className="rounded-lg w-full h-[300px] md:h-[450px] object-cover"
            />

            <div className="absolute -bottom-8 -left-8 rounded-xl p-2 w-40 hidden md:block">
              <ImageWithFallback
                src={image_b1d2ddd0462d3f186ceed6ffb811a6df98b993cc}
                alt="Mobile app mockup"
                className="rounded-lg h-78 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
