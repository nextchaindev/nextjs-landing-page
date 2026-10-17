import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2, Clock, Mail, MessageCircle } from "lucide-react"
import type { Metadata } from "next"
import { getDictionary } from "@/i18n/dictionaries"

export const metadata: Metadata = {
  title: "문의가 접수되었습니다",
  robots: { index: false, follow: false },
}

const KAKAO_CHANNEL_URL = process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL

export default function KoSuccessPage() {
  const { contact } = getDictionary("ko")

  return (
    <div className="min-h-screen bg-[#F9FBFF] flex items-center justify-center mt-20 p-4">
      <div className="max-w-[800px] w-full bg-white rounded-[32px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] p-8 md:p-16 text-center">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-[#E6F9EE] rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-[#00A63E]" />
          </div>
        </div>

        <h1 className="text-2xl md:text-[36px] font-bold text-[#101828] mb-3 break-keep">문의해 주셔서 감사합니다!</h1>
        <p className="text-[#4A5565] text-lg md:text-[20px] mb-12 break-keep">상담 요청이 정상적으로 접수되었습니다</p>

        <div className="bg-[#F0F7FF] rounded-2xl p-6 md:p-8 text-left space-y-6 mb-12">
          <div className="flex gap-4">
            <div className="mt-1">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-[#101828] mb-1 text-base md:text-lg">빠른 회신</h3>
              <p className="text-[#4A5565] text-sm md:text-base leading-relaxed break-keep">
                한국 본사 상담팀이 영업일 기준 24시간 이내에 연락드립니다. ({contact.hours})
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mt-1">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-[#101828] mb-1 text-base md:text-lg">이메일 확인</h3>
              <p className="text-[#4A5565] text-sm md:text-base leading-relaxed break-keep">
                이메일을 남겨 주셨다면 스팸함까지 함께 확인해 주세요. 남기지 않으셨다면 입력하신 연락처로 연락드립니다.
              </p>
            </div>
          </div>

          {KAKAO_CHANNEL_URL && (
            <div className="flex gap-4">
              <div className="mt-1">
                <MessageCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-[#101828] mb-1 text-base md:text-lg">카카오톡으로 바로 문의</h3>
                <p className="text-[#4A5565] text-sm md:text-base leading-relaxed break-keep">
                  급한 문의는{" "}
                  <a
                    href={KAKAO_CHANNEL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-bold hover:underline">
                    카카오톡 채널
                  </a>
                  로 남겨 주세요.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
          <Button
            asChild
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-14 font-medium w-full md:w-auto flex items-center gap-2">
            <Link href="/ko">
              <ArrowLeft className="w-5 h-5" />
              홈으로 돌아가기
            </Link>
          </Button>
        </div>

        <div className="border-t border-gray-100 mb-8 w-full" />

        <p className="text-gray-500 text-sm font-medium">
          궁금한 점이 있으시면{" "}
          <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
            {contact.email}
          </a>
          로 메일 주세요.
        </p>
      </div>
    </div>
  )
}
