import { MIN_TERM_MONTHS, PLANS, formatVnd } from "@/content/plans"
import { parsePrice, projectServices } from "@/content/projectPricing"

export const dynamic = "force-static"

/**
 * /pricing.md — bảng giá dạng văn bản cho AI agent so sánh sản phẩm thay
 * cho khách. Sinh từ cùng dữ liệu PLANS/projectServices với trang bảng giá.
 */
export function GET() {
  const plans = PLANS.map((plan) => {
    const features = plan.features.map((feature) => `  - ${feature}`)
    const limits = plan.limits.map((limit) => `  - ${limit}`)
    return [
      `## ${plan.name}${plan.popular ? " (phổ biến nhất)" : ""}`,
      `- Giá: ${formatVnd(plan.monthlyPrice)}/tháng`,
      `- Dành cho: ${plan.tagline}`,
      "- Bao gồm:",
      ...features,
      "- Ghi chú:",
      ...limits,
    ].join("\n")
  }).join("\n\n")

  const projects = Object.values(projectServices)
    .map((service) => {
      const packages = service.packages.map((pkg) => {
        const { amount, isMinimum } = parsePrice(pkg.price)
        return `  - ${pkg.name}: ${isMinimum ? `từ ${amount.toLocaleString("vi-VN")}đ` : `${amount.toLocaleString("vi-VN")}đ`} — ${pkg.description}`
      })
      return [`## ${service.name} (theo dự án)`, ...packages].join("\n")
    })
    .join("\n\n")

  const body = `# Bảng giá — Nextchain.site

Đơn vị: VND. Gói tháng chưa gồm VAT. Cam kết tối thiểu ${MIN_TERM_MONTHS} tháng, không phí khởi tạo.
Chi tiết điều khoản: https://www.nextchain.site/bang-gia và https://www.nextchain.site/dieu-khoan

# Gói website theo tháng

${plans}

# Dịch vụ theo dự án

${projects}

Liên hệ báo giá riêng: contact@nextchain.kr | +84-909-807-687
`

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
