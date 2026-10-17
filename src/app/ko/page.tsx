import Link from "next/link"
import { FileText, LayoutGrid, ShoppingBag } from "lucide-react"
import Hero from "@/components/sections/Hero"
import Process from "@/components/sections/Process"
import WhyChooseUs from "@/components/sections/WhyChooseUs"
import CTA from "@/components/sections/CTA"
import Section from "@/components/marketing/Section"
import Reveal from "@/components/marketing/Reveal"
import ProjectPricingTabs from "@/components/sections/ProjectPricingTabs"
import PricingCards from "@/components/marketing/PricingCards"
import FaqSection from "@/components/marketing/FaqSection"
import { MOBILE_CAROUSEL, MOBILE_CAROUSEL_ITEM } from "@/components/marketing/carousel"
import { pageMetadata } from "@/lib/seo"
import { getStartingPrice } from "@/content/plans"
import { getGeneralFaqs } from "@/content/faqs"
import { getDictionary } from "@/i18n/dictionaries"

export const metadata = pageMetadata({
  title: getDictionary("ko").meta.defaultTitle,
  description: `랜딩페이지와 웹사이트를 월 구독으로 시작하세요. 디자인, 콘텐츠 작성, 게시, 운영까지 넥스트체인이 맡습니다. 초기 제작비 없이 월 ${getStartingPrice("ko")}부터.`,
  path: "/ko",
  absoluteTitle: true,
  locale: "ko",
})

const GROWTH_FEATURES = [
  {
    icon: LayoutGrid,
    title: "서비스별 전용 페이지",
    desc: "예를 들어 스파라면 피부 관리, 두피 케어, 아로마 마사지 페이지를 각각 만들고 설명, 사진, 확정된 가격, 예약 문의 버튼을 넣습니다.",
    iconBg: "bg-[#FFEDD4] text-[#F54900]",
  },
  {
    icon: FileText,
    title: "필요할 때 갱신하는 블로그",
    desc: "스파는 피부 관리 팁을, 펜션은 주변 여행 정보를 올립니다. 넥스트체인이 초안을 쓰고 검토한 뒤 플랜에 포함된 편수만큼 게시합니다.",
    iconBg: "bg-[#DBEAFE] text-[#155DFC]",
  },
  {
    icon: ShoppingBag,
    title: "깔끔한 상품 카탈로그",
    desc: "미용실은 헤어 케어 제품을, 스파는 화장품을 소개할 수 있습니다. 사진, 설명, 옵션, 가격, 구매 문의 버튼을 제공합니다.",
    iconBg: "bg-[#DCFCE7] text-[#008236]",
  },
]

export default function KoHomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />

      <Section
        muted
        id="pricing"
        eyebrow="요금 안내"
        title="월 단위 결제, 초기 제작비 없음"
        desc="랜딩페이지와 소규모 사업자를 위한 플랜입니다. 혜택, 제한, 해지 조건을 분명하게 안내합니다.">
        <PricingCards locale="ko" />
        <p className="mt-10 text-center">
          <Link href="/ko/pricing" className="font-semibold text-primary hover:underline">
            상세 요금과 자주 묻는 질문 보기 →
          </Link>
        </p>
      </Section>

      <ProjectPricingTabs />

      <Process />

      <Section
        muted
        title="사업과 함께 성장하는 웹사이트"
        desc="플랜 범위 안에서 서비스, 상품 카탈로그, 블로그, 사진, 연락처를 계속 업데이트합니다.">
        <div className={`${MOBILE_CAROUSEL} md:grid-cols-3`}>
          {GROWTH_FEATURES.map(({ icon: Icon, title, desc, iconBg }, idx) => (
            <Reveal
              key={title}
              delay={idx * 0.1}
              className={`${MOBILE_CAROUSEL_ITEM} group bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300`}>
              <span className={`w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${iconBg}`}>
                <Icon className="w-7 h-7" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-[#101828]">{title}</h3>
              <p className="mt-2 text-sm md:text-base text-[#4A5565] leading-relaxed break-keep">{desc}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <WhyChooseUs />

      <FaqSection faqs={getGeneralFaqs("ko")} title={getDictionary("ko").faq.title} />
      <CTA />
    </div>
  )
}
