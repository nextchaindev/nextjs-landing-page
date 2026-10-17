import { FREE_SUBDOMAIN_EXAMPLE, PLANS, formatVnd } from "@/content/plans"
import { SERVICE_DETAILS } from "@/content/services"
import { INDUSTRIES } from "@/content/industries"
import { KO_PLANS } from "@/content/ko/plans"
import { ENABLED_LOCALES } from "@/i18n/config"
import { CONTACT, SITE_NAME, SITE_URL } from "@/lib/site"

export const dynamic = "force-static"

/**
 * llms.txt (llmstxt.org) — tóm tắt site cho AI engine ngoài Google
 * (ChatGPT, Claude, Perplexity). Google không yêu cầu file này; nội dung
 * sinh từ cùng nguồn dữ liệu giá với trang bảng giá nên luôn đồng bộ.
 */
export function GET() {
  const planLines = PLANS.map(
    (plan) =>
      `- ${plan.name}: ${formatVnd(plan.monthlyPrice)}/tháng — ${plan.tagline}`,
  )
  const serviceLines = SERVICE_DETAILS.map((service) =>
    `- [${service.name}](${SITE_URL}/dich-vu/${service.slug}): ${service.metaDescription}`,
  )
  const industryLines = INDUSTRIES.map((industry) =>
    `- [${industry.name}](${SITE_URL}/giai-phap/${industry.slug}): ${industry.metaDescription}`,
  )
  const blogLines = `- [Blog](${SITE_URL}/blog): hướng dẫn chi phí và lựa chọn website cho chủ cơ sở`

  // Phần tiếng Hàn chỉ xuất hiện khi trang tiếng Hàn đã công khai (NEXT_PUBLIC_ENABLED_LOCALES có ko).
  const koreanSection = ENABLED_LOCALES.includes("ko")
    ? `
## 한국어 (Korean)

${SITE_NAME}(넥스트체인) — 소규모 사업자를 위한 랜딩페이지·웹사이트 월 구독 서비스. 한국어 상담은 한국 본사에서 진행합니다.

${KO_PLANS.map(
  (plan) => `- ${plan.name}: 월 ${plan.monthlyPrice.toLocaleString("ko-KR")}원 (부가세 별도) — ${plan.tagline}`,
).join("\n")}
- [요금 안내](${SITE_URL}/ko/pricing)
- [문의](${SITE_URL}/ko/contact)
- 요금표(텍스트): ${SITE_URL}/ko/pricing.md
`
    : ""

  const body = `> ${SITE_NAME} — dịch vụ làm website trọn gói theo tháng cho spa, salon, homestay, cửa hàng và cơ sở dịch vụ nhỏ tại Việt Nam; website doanh nghiệp, bán hàng và phần mềm theo dự án. Chủ quản: Nextchain Tech, Hồ Chí Minh.

Liên hệ: ${CONTACT.email} | ${CONTACT.phone} | phản hồi ${CONTACT.responseTime}

## Gói theo tháng (VND, không phí khởi tạo, trả theo tháng)

${planLines.join("\n")}
- Địa chỉ miễn phí dạng ${FREE_SUBDOMAIN_EXAMPLE} hoặc kết nối tên miền riêng của khách.
- Bảng giá đầy đủ: ${SITE_URL}/bang-gia

## Dịch vụ (landing page theo gói tháng, còn lại theo dự án)

${serviceLines.join("\n")}

## Giải pháp theo ngành

${industryLines.join("\n")}

## Nội dung

${blogLines}
${koreanSection}`

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
