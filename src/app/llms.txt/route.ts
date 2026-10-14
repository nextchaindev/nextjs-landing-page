import { FREE_SUBDOMAIN_EXAMPLE, MIN_TERM_MONTHS, PLANS, formatVnd } from "@/content/plans"
import { SERVICE_DETAILS } from "@/content/services"
import { INDUSTRIES } from "@/content/industries"
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

  const body = `> ${SITE_NAME} — dịch vụ làm website trọn gói theo tháng cho spa, salon, homestay, cửa hàng và cơ sở dịch vụ nhỏ tại Việt Nam; website doanh nghiệp, bán hàng và phần mềm theo dự án. Chủ quản: Nextchain Tech, Hồ Chí Minh.

Liên hệ: ${CONTACT.email} | ${CONTACT.phone} | phản hồi ${CONTACT.responseTime}

## Gói theo tháng (VND, không phí khởi tạo, cam kết tối thiểu ${MIN_TERM_MONTHS} tháng)

${planLines.join("\n")}
- Địa chỉ miễn phí dạng ${FREE_SUBDOMAIN_EXAMPLE} hoặc kết nối tên miền riêng của khách.
- Bảng giá đầy đủ: ${SITE_URL}/bang-gia

## Dịch vụ (landing page theo gói tháng, còn lại theo dự án)

${serviceLines.join("\n")}

## Giải pháp theo ngành

${industryLines.join("\n")}

## Nội dung

${blogLines}
`

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
