/**
 * Gói website theo tháng — chỉ dành cho landing page và kinh doanh nhỏ
 * (spa, salon, homestay, cửa hàng, cơ sở dịch vụ địa phương).
 * Không có phí khởi tạo. Website/phần mềm quy mô lớn hơn dùng bảng giá
 * theo dự án trong content/projectPricing.ts.
 *
 * Sửa giá tại đây — bảng giá, trang dịch vụ, trang ngành và JSON-LD dùng chung.
 */
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

export const MIN_TERM_MONTHS = 6

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

/** e.g. "249.000đ" — cheapest monthly plan, for copy like "từ 249.000đ/tháng". */
export const STARTING_PRICE = formatVnd(Math.min(...PLANS.map((plan) => plan.monthlyPrice)))
