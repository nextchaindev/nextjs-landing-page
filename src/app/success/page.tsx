"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock, Mail, Phone, ArrowLeft } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cảm ơn bạn | NextChain",
  robots: {
    index: false,
    follow: false,
  },
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#F9FBFF] flex items-center justify-center mt-20 p-4">
      <div className="max-w-[800px] w-full bg-white rounded-[32px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] p-8 md:p-16 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-[#E6F9EE] rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-[#00A63E]" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-2xl md:text-[36px] font-bold text-[#101828] mb-3">
          Cảm ơn bạn đã liên hệ!
        </h1>
        <p className="text-[#4A5565] text-lg md:text-[20px] mb-12">
          Chúng tôi đã nhận được yêu cầu tư vấn của bạn
        </p>

        {/* Info Box */}
        <div className="bg-[#F0F7FF] rounded-2xl p-6 md:p-8 text-left space-y-6 mb-12">
          <div className="flex gap-4">
            <div className="mt-1">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-[#101828] mb-1 text-base md:text-lg">
                Phản hồi nhanh chóng
              </h3>
              <p className="text-[#4A5565] text-sm md:text-base leading-relaxed">
                Đội ngũ tư vấn của chúng tôi sẽ liên hệ với bạn trong vòng 24
                giờ làm việc.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mt-1">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-[#101828] mb-1 text-base md:text-lg">
                Kiểm tra email
              </h3>
              <p className="text-[#4A5565] text-sm md:text-base leading-relaxed">
                Vui lòng kiểm tra hộp thư email (bao gồm cả thư mục spam) để
                nhận thông tin xác nhận từ chúng tôi.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mt-1">
              <Phone className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-[#101828] mb-1 text-base md:text-lg">
                Liên hệ trực tiếp
              </h3>
              <p className="text-[#4A5565] text-sm md:text-base leading-relaxed">
                Nếu cần hỗ trợ gấp, vui lòng gọi:{" "}
                <a
                  href="tel:0909807687"
                  className="text-blue-600 font-bold hover:underline">
                  0909-807-687
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
          <Button
            asChild
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl  h-14 font-medium w-full md:w-auto flex items-center gap-2">
            <Link href="/">
              <ArrowLeft className="w-5 h-5" />
              Quay về trang chủ
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="border-gray-200 text-[#364153] hover:bg-gray-50 rounded-xl px-8 h-14 font-medium w-full md:w-auto">
            <Link href="https://www.nextchain.kr/" target="_blank">
              Tìm hiểu về chúng tôi
            </Link>
          </Button>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-8 w-full" />

        {/* Footer Text */}
        <p className="text-gray-500 text-sm font-medium">
          Có câu hỏi? Email chúng tôi tại{" "}
          <a
            href="mailto:contact@nextchain.kr"
            className="text-blue-600 hover:underline">
            contact@nextchain.kr
          </a>
        </p>
      </div>
    </div>
  )
}
