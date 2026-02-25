"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { useModal } from "@/context/ModalContext"

export default function CTA() {
  const { openModalClean } = useModal()

  return (
    <section
      id="cta"
      className="py-24 px-4 md:px-6 bg-[#F9FAFB] relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFD6A8]/30 blur-[128px] rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#BEDBFF]/40 blur-[128px] rounded-full -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-[1000px] mx-auto relative z-10">
        <div className="bg-white border border-[#F3F4F6] rounded-[32px] p-4 md:p-16 shadow-xl text-center">
          <h2 className="text-2xl md:text-[36px] font-medium text-[#101828] mb-2 leading-tight mx-auto">
            Bắt đầu website giúp bạn <br />
            <span className="text-[#F54900]">thu hút khách hàng</span> ngay hôm
            nay
          </h2>
          {/* <h2 className="text-2xl md:text-[36px] font-bold  mb-8 leading-tight">
            
          </h2> */}
          <p className="text-lg md:text-[20px] text-[#4A5565] mb-12 max-w-2xl mx-auto leading-relaxed">
            Nhận tư vấn miễn phí để biết website của bạn cần làm gì để tăng
            khách và chuyển đổi tốt hơn.
          </p>

          <div className="flex flex-col items-center gap-6">
            <Button
              size="lg"
              className="bg-[#F54900] hover:bg-[#F54900]/90 text-white px-4 md:px-8 py-4 md:py-7 text-[16px] md:text-lg font-bold rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all w-full md:w-auto"
              onClick={openModalClean}>
              Nhận tư vấn miễn phí
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <p className="text-[#364153] text-sm md:text-lg font-medium text-left">
              Hoặc liên hệ trực tiếp:{" "}
              <a
                href="mailto:contact@nextchain.kr"
                className="text-[#2B7FFF] hover:underline">
                contact@nextchain.kr
              </a>
            </p>

            <div className="flex flex-wrap justify-start md:justify-center gap-6 md:gap-12 mt-8 pt-8 border-t border-gray-100 w-full">
              <div className="flex items-center gap-2 text-[#6A7282] text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#00A63E]" />
                Tư vấn 100% miễn phí
              </div>
              <div className="flex items-center gap-2 text-[#6A7282] text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#00A63E]" />
                Không yêu cầu cam kết
              </div>
              <div className="flex items-center gap-2 text-[#6A7282] text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#00A63E]" />
                Phản hồi trong 24h
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
