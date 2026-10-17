import { KO_PLANS } from "@/content/ko/plans"
import { KO_PROJECT_SERVICES } from "@/content/ko/projectPricing"
import { formatPrice } from "@/content/plans"
import { getDictionary } from "@/i18n/dictionaries"
import { ENABLED_LOCALES } from "@/i18n/config"
import { SITE_URL } from "@/lib/site"

export const dynamic = "force-static"

/**
 * /ko/pricing.md — 한국어 요금표(텍스트). AI 에이전트가 고객 대신 상품을 비교할 때 쓴다.
 * 한국어 페이지와 같은 데이터(KO_PLANS, KO_PROJECT_SERVICES)에서 생성한다.
 * 한국어 사이트를 공개(NEXT_PUBLIC_ENABLED_LOCALES에 ko 포함)하기 전에는 404.
 */
export function GET() {
  if (!ENABLED_LOCALES.includes("ko")) return new Response("Not found", { status: 404 })

  const { contact } = getDictionary("ko")

  const plans = KO_PLANS.map((plan) => {
    const features = plan.features.map((feature) => `  - ${feature}`)
    const limits = plan.limits.map((limit) => `  - ${limit}`)
    return [
      `## ${plan.name}${plan.popular ? " (가장 인기)" : ""}`,
      `- 가격: 월 ${formatPrice(plan.monthlyPrice, "ko")}`,
      `- 대상: ${plan.tagline}`,
      "- 포함 내용:",
      ...features,
      "- 참고:",
      ...limits,
    ].join("\n")
  }).join("\n\n")

  const projects = Object.values(KO_PROJECT_SERVICES)
    .map((service) => {
      const packages = service.packages.map((pkg) => `  - ${pkg.name}: ${pkg.price} — ${pkg.description}`)
      return [`## ${service.name} (프로젝트 단위)`, ...packages].join("\n")
    })
    .join("\n\n")

  const body = `# 요금 안내 — Nextchain.site (넥스트체인)

통화: KRW(원). 모든 금액은 부가세(10%) 별도. 월 구독 플랜은 초기 제작비가 없고 월 단위로 결제합니다.
자세한 내용: ${SITE_URL}/ko/pricing

# 웹사이트 월 구독 플랜

${plans}

# 프로젝트 단위 서비스

${projects}

별도 견적 문의: ${contact.email}
`

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
