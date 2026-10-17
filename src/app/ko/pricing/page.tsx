import PageHeader from "@/components/marketing/PageHeader"
import Section from "@/components/marketing/Section"
import PricingCards from "@/components/marketing/PricingCards"
import ProjectPricingTabs from "@/components/sections/ProjectPricingTabs"
import FaqSection from "@/components/marketing/FaqSection"
import CtaBanner from "@/components/marketing/CtaBanner"
import JsonLdScript from "@/components/marketing/JsonLdScript"
import { pageMetadata, serviceSchema } from "@/lib/seo"
import { getStartingPrice } from "@/content/plans"
import { KO_PRICING_FAQS } from "@/content/ko/faqs"
import { getDictionary } from "@/i18n/dictionaries"

const PATH = "/ko/pricing"
const DESCRIPTION = `월 ${getStartingPrice("ko")}부터 시작하는 웹사이트 월 구독 플랜. 초기 제작비 없이 월 단위로 결제합니다. 기업 웹사이트, 쇼핑몰, 소프트웨어, SEO는 프로젝트별로 견적을 드립니다.`

export const metadata = pageMetadata({
  title: "웹사이트 월 구독 요금 안내",
  description: DESCRIPTION,
  path: PATH,
  locale: "ko",
})

const PLAN_GUIDE = [
  { lead: "이제 막 매장을 열었고 구글에 노출되고 싶다면:", body: "스타터 플랜" },
  { lead: "서비스가 여러 가지이고 서비스별로 고객이 찾아오게 하고 싶다면:", body: "그로스 플랜" },
  { lead: "지점이 여러 곳이거나 상품을 판매한다면:", body: "프로 플랜" },
]

export default function KoPricingPage() {
  return (
    <>
      <JsonLdScript
        data={serviceSchema({
          name: "넥스트체인 웹사이트 월 구독 플랜",
          description: DESCRIPTION,
          path: PATH,
          locale: "ko",
        })}
      />
      <PageHeader
        locale="ko"
        crumbs={[{ name: "요금 안내", path: PATH }]}
        eyebrow="요금 안내"
        title="웹사이트 월 구독 요금 안내"
        intro="소규모 사업자를 위한 랜딩페이지와 웹사이트는 초기 제작비 없이 월 단위로 결제합니다. 더 큰 규모의 웹사이트와 소프트웨어는 아래 프로젝트 견적을 확인해 주세요."
      />

      <Section className="pt-4 md:pt-8">
        <PricingCards locale="ko" />
        <p className="mt-8 text-sm text-gray-500 text-center">
          모든 금액은 부가세(10%) 별도이며, 사업자 고객께는 세금계산서를 발행합니다. 결제는 계좌이체 또는 카드로 가능합니다.
        </p>
      </Section>

      <Section title="어떤 플랜이 맞을까요?">
        <div className="grid md:grid-cols-3 gap-6 text-gray-700 leading-relaxed break-keep">
          {PLAN_GUIDE.map((item) => (
            <p key={item.body}>
              <strong className="text-gray-900">{item.lead}</strong> {item.body}
            </p>
          ))}
        </div>
      </Section>

      <ProjectPricingTabs />

      <FaqSection faqs={KO_PRICING_FAQS} title={getDictionary("ko").faq.title} />
      <CtaBanner locale="ko" secondaryHref="/ko/contact" secondaryLabel="문의 방법 보기" />
    </>
  )
}
