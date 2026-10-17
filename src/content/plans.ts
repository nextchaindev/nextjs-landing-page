/**
 * Gói website theo tháng — chỉ dành cho landing page và kinh doanh nhỏ
 * (spa, salon, homestay, cửa hàng, cơ sở dịch vụ địa phương).
 * Không có phí khởi tạo. Website/phần mềm quy mô lớn hơn dùng bảng giá
 * theo dự án trong content/projectPricing.ts.
 *
 * Sửa giá tại đây — bảng giá, trang dịch vụ, trang ngành và JSON-LD dùng chung.
 */
import type { Locale } from "@/i18n/config"
import { KO_FREE_SUBDOMAIN_EXAMPLE, KO_PLANS } from "./ko/plans"
import { EN_FREE_SUBDOMAIN_EXAMPLE, EN_PLANS } from "./en/plans"

export interface Plan {
  id: string
  name: string
  tagline: string
  /** VND / tháng */
  monthlyPrice: number
  popular?: boolean
  features: string[]
  limits: string[]
}

/** Free address every plan gets; customers may connect their own domain instead. */
export const FREE_SUBDOMAIN_EXAMPLE = "ten-cua-ban.nextchain.site"

export const PLANS: Plan[] = [
  {
    id: "khoi-dau",
    name: "Khởi đầu",
    tagline: "Một landing page giới thiệu cơ sở và nhận yêu cầu liên hệ",
    monthlyPrice: 249000,
    features: [
      "1 landing page thiết kế theo ngành",
      `Địa chỉ miễn phí ${FREE_SUBDOMAIN_EXAMPLE} hoặc kết nối tên miền riêng của bạn`,
      "Hosting tốc độ cao, chứng chỉ SSL (https)",
      "Form nhận yêu cầu, nút gọi điện và Zalo",
      "SEO cơ bản: tiêu đề, mô tả, sitemap, Google Maps",
      "2 lượt chỉnh sửa nội dung mỗi tháng",
    ],
    limits: ["Không bao gồm blog"],
  },
  {
    id: "tang-truong",
    name: "Tăng trưởng",
    tagline: "Website nhiều trang cho cơ sở có nhiều dịch vụ",
    monthlyPrice: 790000,
    popular: true,
    features: [
      "Website đến 5 trang: trang chủ, dịch vụ, bảng giá, gallery, liên hệ",
      "Trang riêng cho từng dịch vụ chính",
      "2 bài blog mỗi tháng do Nextchain biên soạn, bạn duyệt trước khi đăng",
      "5 lượt chỉnh sửa nội dung mỗi tháng",
      "Báo cáo lượt truy cập và yêu cầu nhận được hằng tháng",
    ],
    limits: ["Tất cả quyền lợi gói Khởi đầu"],
  },
  {
    id: "chuyen-nghiep",
    name: "Chuyên nghiệp",
    tagline: "Cho cơ sở nhiều dịch vụ, nhiều chi nhánh hoặc có bán sản phẩm",
    monthlyPrice: 1490000,
    features: [
      "Website đến 10 trang, trang riêng cho từng chi nhánh",
      "Danh mục đến 50 sản phẩm: ảnh, mô tả, giá, nút đặt mua",
      "4 bài blog mỗi tháng",
      "Không giới hạn lượt chỉnh sửa nhỏ, xử lý ưu tiên trong 24 giờ làm việc",
    ],
    limits: ["Tất cả quyền lợi gói Tăng trưởng", "Giỏ hàng & thanh toán online: báo giá theo dự án"],
  },
]

export function formatVnd(value: number) {
  return `${value.toLocaleString("vi-VN")}đ`
}

/** Định dạng giá theo ngôn ngữ: vi → "249.000đ", ko → "39,000원", en → "$29". */
export function formatPrice(value: number, locale: Locale = "vi") {
  if (locale === "ko") return `${value.toLocaleString("ko-KR")}원`
  if (locale === "en") return `$${value.toLocaleString("en-US")}`
  return formatVnd(value)
}

/** Gói tháng theo ngôn ngữ (giá cố định theo từng thị trường, không quy đổi tỷ giá). */
export function getPlans(locale: Locale = "vi"): Plan[] {
  return { vi: PLANS, ko: KO_PLANS, en: EN_PLANS }[locale]
}

/** Giá mỗi ngày (làm tròn lên): vi/ko theo bậc 100 đơn vị, en theo đô la nguyên. */
export function getDailyPrice(monthlyPrice: number, locale: Locale = "vi") {
  const perDay = monthlyPrice / 30
  return locale === "en" ? Math.ceil(perDay) : Math.ceil(perDay / 100) * 100
}

export function getStartingPrice(locale: Locale = "vi") {
  return formatPrice(Math.min(...getPlans(locale).map((plan) => plan.monthlyPrice)), locale)
}

export function getFreeSubdomainExample(locale: Locale = "vi") {
  return { vi: FREE_SUBDOMAIN_EXAMPLE, ko: KO_FREE_SUBDOMAIN_EXAMPLE, en: EN_FREE_SUBDOMAIN_EXAMPLE }[locale]
}

/** e.g. "249.000đ" — cheapest monthly plan, for copy like "từ 249.000đ/tháng". */
export const STARTING_PRICE = formatVnd(Math.min(...PLANS.map((plan) => plan.monthlyPrice)))
