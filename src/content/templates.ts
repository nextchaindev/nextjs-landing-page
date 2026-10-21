import type { StaticImageData } from "next/image"
import { getIndustry } from "@/content/industries"
import imageSpa from "@/assets/stock/spa.jpg"
import imageSalon from "@/assets/stock/salon.jpg"
import imageHomestay from "@/assets/stock/homestay.jpg"
import imageNail from "@/assets/stock/nail.jpg"
import imageCafe from "@/assets/stock/cafe.jpg"
import imageDental from "@/assets/stock/dental.jpg"
import imageYoga from "@/assets/stock/yoga.jpg"
import imageFashion from "@/assets/stock/fashion.jpg"
import imageEcommerce from "@/assets/stock/ecommerce.jpg"
import imageLogistics from "@/assets/stock/logistics.jpg"
import imageAccounting from "@/assets/stock/accounting.jpg"
import imagePlumbing from "@/assets/stock/plumbing.jpg"
import imageRestaurant from "@/assets/project-1.png"
import imageEducation from "@/assets/project-3.png"
import imageRealEstate from "@/assets/project-4.png"
import imageLimousine from "@/assets/project-5.png"
import type { Locale, NonDefaultLocale } from "@/i18n/config"
import { TEMPLATE_SLUGS } from "@/i18n/slugs"
import { KO_TEMPLATE_TEXTS } from "./ko/templates"
import { EN_TEMPLATE_TEXTS } from "./en/templates"

/**
 * Mẫu website tham khảo. Đây không phải danh sách giới hạn — mỗi website
 * được thiết kế riêng; mẫu chỉ giúp khách hình dung bố cục theo ngành.
 *
 * - `industrySlug`: có trang giải pháp riêng → có trang chi tiết mẫu.
 * - `demoUrl`: URL bản demo BÊN NGOÀI (web do Nextchain chuẩn bị sẵn,
 *   tách khỏi site marketing). Chưa có → nút "Tư vấn bố cục".
 */
export const TEMPLATE_CATEGORIES = [
  { id: "lam-dep", label: "Làm đẹp" },
  { id: "luu-tru", label: "Lưu trú & Du lịch" },
  { id: "am-thuc", label: "Ăn uống" },
  { id: "suc-khoe", label: "Sức khỏe" },
  { id: "ban-le", label: "Bán lẻ" },
  { id: "doanh-nghiep", label: "Doanh nghiệp" },
] as const

export type TemplateCategory = (typeof TEMPLATE_CATEGORIES)[number]["id"]

export interface Template {
  slug: string
  name: string
  category: TemplateCategory
  style: string
  description: string
  /** Các khối bố cục trên bản demo — nội dung riêng của trang mẫu, không lặp trang giải pháp. */
  highlights?: string[]
  image: StaticImageData
  imageAlt: string
  industrySlug?: string
  /** URL demo bên ngoài (https://...). Bỏ trống khi chưa có bản demo. */
  demoUrl?: string
}

export const TEMPLATES: Template[] = [
  {
    slug: "spa",
    name: "Spa & chăm sóc da",
    category: "lam-dep",
    style: "Nhẹ nhàng, thư giãn",
    description: "Bảng dịch vụ theo liệu trình, ảnh không gian lớn và nút đặt hẹn luôn hiển thị.",
    highlights: [
      "Hero có ảnh không gian lớn và nút “Đặt lịch hẹn” nhìn thấy ngay",
      "Bảng dịch vụ kèm thời lượng và giá từng liệu trình",
      "Khối ưu đãi tháng hiển thị ngay trên trang chủ",
      "Gallery ảnh không gian dạng lưới 3 cột",
      "Form đặt hẹn ngắn: tên, số điện thoại, dịch vụ, ngày",
      "Chân trang có giờ mở cửa, địa chỉ và nút gọi",
    ],
    image: imageSpa,
    imageAlt: "Mẫu website spa chăm sóc da",
    industrySlug: "website-spa",
    demoUrl: "https://api-portal.nextchain.site/preview/wyf47vx3cope3ibdjni8/v/1?owner=4f5f7db73b42434c84e41a3dec4565f9",
  },
  {
    slug: "salon",
    name: "Salon tóc",
    category: "lam-dep",
    style: "Hiện đại, cá tính",
    description: "Portfolio kiểu tóc dạng lưới, bảng giá theo nhóm dịch vụ và đặt lịch nhanh.",
    highlights: [
      "Hero nêu cam kết “biết giá trước khi cắt”",
      "Bảng giá từng hạng mục: cắt, gội, uốn, nhuộm, dưỡng",
      "Gallery tác phẩm mới nhất ở vị trí giữa trang",
      "Combo khuyến mãi cho khách đặt lịch online",
      "Nút gọi ngay trên header, không cần cuộn",
      "Phần giới thiệu thợ và năm kinh nghiệm",
    ],
    image: imageSalon,
    imageAlt: "Mẫu website salon tóc",
    industrySlug: "website-salon",
    demoUrl: "https://api-portal.nextchain.site/preview/neub4rkqqynga539ofmp/v/1?owner=a95774f9daec4d27b1c96056e3a929d3",
  },
  {
    slug: "nail",
    industrySlug: "website-nail",
    demoUrl: "https://api-portal.nextchain.site/preview/ddzpj67pku32s28o6fw7/v/1?owner=9856f16eb7084ff1885e7caef847a6d5",
    name: "Tiệm nail",
    category: "lam-dep",
    style: "Tươi sáng, nữ tính",
    description: "Bộ sưu tập mẫu nail, bảng giá, khuyến mãi theo tháng và nút nhắn Zalo.",
    image: imageNail,
    imageAlt: "Mẫu website tiệm nail",
  },
  {
    slug: "homestay",
    name: "Homestay & villa",
    category: "luu-tru",
    style: "Ấm cúng, gần gũi thiên nhiên",
    description: "Danh sách phòng, tiện ích, bản đồ vị trí và form hỏi phòng theo ngày.",
    highlights: [
      "Hero nêu trải nghiệm nghỉ — “ngủ giữa rừng thông”",
      "Danh sách từng loại phòng kèm sức chứa và giá/đêm",
      "Khối ưu đãi cho khách ở 2 đêm trở lên",
      "Gallery view phòng, khu ngoại thất, bữa sáng",
      "Giờ nhận/trả phòng và chính sách nêu rõ",
      "Form hỏi phòng có ngày đến – ngày đi",
    ],
    image: imageHomestay,
    imageAlt: "Mẫu website homestay",
    industrySlug: "website-homestay",
    demoUrl: "https://api-portal.nextchain.site/preview/nsvkv8t2fnfvwxquqpkq/v/1?owner=a18880b054064db696280ea484f58229",
  },
  {
    slug: "limousine",
    name: "Nhà xe & limousine",
    category: "luu-tru",
    style: "Mobile-first, chuyển đổi nhanh",
    description: "Lịch trình, bảng giá vé, nút gọi và đặt xe nổi bật trên điện thoại.",
    image: imageLimousine,
    imageAlt: "Mẫu landing page đặt xe limousine",
  },
  {
    slug: "cafe",
    industrySlug: "website-quan-ca-phe",
    demoUrl: "https://api-portal.nextchain.site/preview/a6sqguqktwgjspfgn5ii/v/1?owner=f6d7c885c4474e17952e23b5d7f79930",
    name: "Quán cà phê",
    category: "am-thuc",
    style: "Tối giản, nhiều ảnh",
    description: "Menu đồ uống, không gian quán, giờ mở cửa và chỉ đường Google Maps.",
    image: imageCafe,
    imageAlt: "Mẫu website quán cà phê",
  },
  {
    slug: "nha-hang",
    industrySlug: "website-nha-hang",
    name: "Nhà hàng",
    category: "am-thuc",
    style: "Sang trọng, ấm áp",
    description: "Thực đơn hải sản và món Việt có giá, đặt tiệc gia đình – công ty và form đặt bàn.",
    highlights: [
      "Hero giới thiệu nhà hàng với nút “Đặt bàn” và số điện thoại",
      "Thực đơn món nổi bật kèm mô tả và giá VND",
      "Lời giới thiệu từ chủ nhà hàng",
      "Khối ưu đãi trưa và đặt tiệc sinh nhật, công ty",
      "Hỏi đáp về đặt bàn, phòng riêng, giờ phục vụ",
      "Form đặt bàn gửi yêu cầu để nhà hàng xác nhận",
    ],
    image: imageRestaurant,
    imageAlt: "Mẫu website đặt bàn nhà hàng",
    demoUrl: "https://api-portal.nextchain.site/preview/v338fu4vep5jgc4882p8/v/1?owner=4305093506d740dbb67176e521a2b037",
  },
  {
    slug: "nha-khoa",
    name: "Phòng khám nha khoa",
    category: "suc-khoe",
    style: "Sạch sẽ, đáng tin cậy",
    description: "Dịch vụ điều trị, đội ngũ bác sĩ, bảng giá tham khảo và đặt lịch khám.",
    highlights: [
      "Hero đặt lịch khám ngay trên màn hình đầu",
      "Dịch vụ tách theo nhóm: khám, nạo vôi, điều trị, thẩm mỹ",
      "Mục đội ngũ bác sĩ với chuyên môn và kinh nghiệm",
      "Bảng giá tham khảo kèm điều kiện áp dụng",
      "Bản đồ và hướng dẫn đường đến phòng khám",
      "Giờ hoạt động và số điện thoại khẩn cấp",
    ],
    image: imageDental,
    imageAlt: "Mẫu website phòng khám nha khoa",
    industrySlug: "website-nha-khoa",
    demoUrl: "https://api-portal.nextchain.site/preview/jxgyqu4uz3cffu65ggfc/v/1?owner=e4cf1ab2e0a74fab91a0a2fb805b7182",
  },
  {
    slug: "yoga",
    name: "Yoga & fitness",
    category: "suc-khoe",
    style: "Năng động, thoáng",
    description: "Lịch lớp, gói tập, giới thiệu huấn luyện viên và đăng ký học thử.",
    image: imageYoga,
    imageAlt: "Mẫu website phòng tập yoga",
  },
  {
    slug: "thoi-trang",
    name: "Shop thời trang",
    category: "ban-le",
    style: "Thời thượng, tập trung sản phẩm",
    description: "Bộ sưu tập theo mùa, trang sản phẩm có size và nút đặt mua.",
    image: imageFashion,
    imageAlt: "Mẫu website shop thời trang",
  },
  {
    slug: "my-pham",
    name: "Cửa hàng mỹ phẩm",
    category: "ban-le",
    style: "Tinh tế, sáng",
    description: "Danh mục sản phẩm, công dụng, đánh giá khách hàng và giỏ hàng.",
    image: imageEcommerce,
    imageAlt: "Mẫu website cửa hàng mỹ phẩm online",
  },
  {
    slug: "bat-dong-san",
    name: "Dự án bất động sản",
    category: "doanh-nghiep",
    style: "Cao cấp, nhiều hình ảnh",
    description: "Tổng quan dự án, mặt bằng, tiện ích, chính sách bán hàng và form nhận báo giá.",
    highlights: [
      "Hero tổng quan dự án với thông tin vị trí nổi bật",
      "Mục vị trí kết nối tiện ích xung quanh",
      "Bảng mặt bằng và các loại hình sản phẩm",
      "Tiến độ xây dựng theo mốc thời gian",
      "Chính sách bán hàng và ưu đãi hiện hành",
      "Form nhận báo giá gọn, hỏi rõ loại sản phẩm quan tâm",
    ],
    image: imageRealEstate,
    imageAlt: "Mẫu landing page dự án căn hộ",
    industrySlug: "landing-page-bat-dong-san",
    demoUrl: "https://api-portal.nextchain.site/preview/thfmu6aou4ntvvj8mgup/v/1?owner=477223d046954575a42affb088261003",
  },
  {
    slug: "giao-duc",
    name: "Trung tâm đào tạo",
    category: "doanh-nghiep",
    style: "Rõ ràng, nhiều thông tin",
    description: "Khóa học, lịch khai giảng, học phí, giảng viên và form đăng ký tư vấn.",
    highlights: [
      "Hero nêu mục tiêu khóa học và nút đăng ký tư vấn",
      "Danh sách khóa học theo lộ trình và đối tượng",
      "Hồ sơ giảng viên kèm kinh nghiệm thực tế",
      "Lịch khai giảng và học phí minh bạch từng khóa",
      "Mục phản hồi học viên cũ",
      "Form đăng ký lưu sẵn khóa đang quan tâm",
    ],
    image: imageEducation,
    imageAlt: "Mẫu website trung tâm đào tạo",
    industrySlug: "landing-page-khoa-hoc",
    demoUrl: "https://api-portal.nextchain.site/preview/ejbovui6fbkjpetrmg84/v/1?owner=55c2085ac65f4c01979fbfe9266629cc",
  },
  {
    slug: "logistics",
    name: "Logistics & xuất nhập khẩu",
    category: "doanh-nghiep",
    style: "Cổ điển, đáng tin cậy",
    description: "Dịch vụ hải quan, vận chuyển đường biển và hàng không, phí tham khảo ghi rõ từng khoản và form gửi thông tin lô hàng.",
    image: imageLogistics,
    imageAlt: "Mẫu website công ty logistics xuất nhập khẩu",
    demoUrl: "https://api-portal.nextchain.site/preview/hdahbv82j7r6vvr62dak/v/1?owner=cb31926fc67a458c84afc958febd1280",
  },
  {
    slug: "ke-toan-thue",
    name: "Kế toán & dịch vụ thuế",
    category: "doanh-nghiep",
    style: "Chuyên nghiệp, dễ hiểu",
    description: "Quy trình làm việc 3 bước, đội ngũ kế toán, bảng phí khai thuế và sổ sách, form đặt lịch tư vấn.",
    image: imageAccounting,
    imageAlt: "Mẫu website văn phòng kế toán thuế",
    demoUrl: "https://api-portal.nextchain.site/preview/iuokavtkamgujwvmv2h6/v/1?owner=068a0d974cc64ca7a73de79bb8725ee4",
  },
  {
    slug: "sua-ong-nuoc",
    name: "Sửa ống nước & thông tắc",
    category: "doanh-nghiep",
    style: "Rõ giá, gọi nhanh",
    description: "Dịch vụ sửa chữa tại nhà, báo giá trọn gói trước khi làm, khu vực phục vụ, ưu đãi và form yêu cầu báo giá.",
    image: imagePlumbing,
    imageAlt: "Mẫu website dịch vụ sửa ống nước",
    demoUrl: "https://api-portal.nextchain.site/preview/28ancrwym8wa9nr3zv2u/v/1?owner=d7f794584aa04758bd185b7c719acece",
  },
]

export function getTemplate(slug: string) {
  return TEMPLATES.find((template) => template.slug === slug)
}

/** Templates that have their own detail page (linked to an industry solution page). */
export function templatesWithDetail() {
  return TEMPLATES.filter((template) => template.industrySlug)
}

export function isTemplateIndexable(template: Template) {
  return Boolean(template.industrySlug)
}

export function templateIndustry(template: Template) {
  const industry = template.industrySlug ? getIndustry(template.industrySlug) : undefined
  if (!industry) throw new Error(`Template ${template.slug} has no industry page`)
  return industry
}

/** Tên nhóm mẫu website ở các ngôn ngữ khác. */
export const TEMPLATE_CATEGORY_LABELS: Record<NonDefaultLocale, Record<TemplateCategory, string>> = {
  ko: {
    "lam-dep": "뷰티",
    "luu-tru": "숙박·여행",
    "am-thuc": "식음료",
    "suc-khoe": "건강",
    "ban-le": "소매",
    "doanh-nghiep": "기업",
  },
  en: {
    "lam-dep": "Beauty",
    "luu-tru": "Stay & Travel",
    "am-thuc": "Food & Drink",
    "suc-khoe": "Health",
    "ban-le": "Retail",
    "doanh-nghiep": "Business",
  },
}

/** Phần chữ của một mẫu website ở ngôn ngữ khác (ảnh, nhóm, demo, liên kết ngành dùng chung). Khóa: slug tiếng Việt. */
export type TemplateText = Pick<Template, "name" | "style" | "description" | "highlights" | "imageAlt">
export type TemplateTexts = Record<string, TemplateText>

const TEMPLATE_TEXTS: Record<NonDefaultLocale, TemplateTexts> = { ko: KO_TEMPLATE_TEXTS, en: EN_TEMPLATE_TEXTS }

function localizeTemplate(base: Template, locale: Locale): Template | undefined {
  if (locale === "vi") return base
  const text = TEMPLATE_TEXTS[locale][base.slug]
  // Slug trang chi tiết dùng slug tiếng Anh (i18n/slugs.ts); khóa nội dung vẫn là slug tiếng Việt.
  return text && { ...base, ...text, slug: TEMPLATE_SLUGS[base.slug] ?? base.slug }
}

export function getTemplates(locale: Locale = "vi"): Template[] {
  return TEMPLATES.flatMap((base) => localizeTemplate(base, locale) ?? [])
}

/** Mẫu có bản demo, theo slug tiếng Việt và đúng thứ tự truyền vào. */
export function getDemoTemplates(locale: Locale, slugs: string[]): Template[] {
  return slugs.flatMap((slug) => {
    const base = getTemplate(slug)
    return (base?.demoUrl && localizeTemplate(base, locale)) || []
  })
}
