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
import imageRestaurant from "@/assets/project-1.png"
import imageEducation from "@/assets/project-3.png"
import imageRealEstate from "@/assets/project-4.png"
import imageLimousine from "@/assets/project-5.png"

/**
 * Mẫu website tham khảo. Đây không phải danh sách giới hạn — mỗi website
 * được thiết kế riêng; mẫu chỉ giúp khách hình dung bố cục theo ngành.
 *
 * - `industrySlug`: có trang giải pháp riêng → có trang chi tiết mẫu.
 * - `demoUrl`: có bản demo thật → trang chi tiết được index và vào sitemap.
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
  image: StaticImageData
  imageAlt: string
  industrySlug?: string
  demoUrl?: string
}

export const TEMPLATES: Template[] = [
  {
    slug: "spa",
    name: "Spa & chăm sóc da",
    category: "lam-dep",
    style: "Nhẹ nhàng, thư giãn",
    description: "Bảng dịch vụ theo liệu trình, ảnh không gian lớn và nút đặt hẹn luôn hiển thị.",
    image: imageSpa,
    imageAlt: "Mẫu website spa chăm sóc da",
    industrySlug: "website-spa",
  },
  {
    slug: "salon",
    name: "Salon tóc",
    category: "lam-dep",
    style: "Hiện đại, cá tính",
    description: "Portfolio kiểu tóc dạng lưới, bảng giá theo nhóm dịch vụ và đặt lịch nhanh.",
    image: imageSalon,
    imageAlt: "Mẫu website salon tóc",
    industrySlug: "website-salon",
  },
  {
    slug: "nail",
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
    image: imageHomestay,
    imageAlt: "Mẫu website homestay",
    industrySlug: "website-homestay",
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
    name: "Quán cà phê",
    category: "am-thuc",
    style: "Tối giản, nhiều ảnh",
    description: "Menu đồ uống, không gian quán, giờ mở cửa và chỉ đường Google Maps.",
    image: imageCafe,
    imageAlt: "Mẫu website quán cà phê",
  },
  {
    slug: "nha-hang",
    name: "Nhà hàng",
    category: "am-thuc",
    style: "Sang trọng, ấm áp",
    description: "Thực đơn có hình, đặt bàn trực tuyến, khuyến mãi và đánh giá món ăn.",
    image: imageRestaurant,
    imageAlt: "Mẫu website đặt bàn nhà hàng",
  },
  {
    slug: "nha-khoa",
    name: "Phòng khám nha khoa",
    category: "suc-khoe",
    style: "Sạch sẽ, đáng tin cậy",
    description: "Dịch vụ điều trị, đội ngũ bác sĩ, bảng giá tham khảo và đặt lịch khám.",
    image: imageDental,
    imageAlt: "Mẫu website phòng khám nha khoa",
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
    image: imageRealEstate,
    imageAlt: "Mẫu landing page dự án căn hộ",
  },
  {
    slug: "giao-duc",
    name: "Trung tâm đào tạo",
    category: "doanh-nghiep",
    style: "Rõ ràng, nhiều thông tin",
    description: "Khóa học, lịch khai giảng, học phí, giảng viên và form đăng ký tư vấn.",
    image: imageEducation,
    imageAlt: "Mẫu website trung tâm đào tạo",
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
  return Boolean(template.demoUrl)
}

export function templateIndustry(template: Template) {
  const industry = template.industrySlug ? getIndustry(template.industrySlug) : undefined
  if (!industry) throw new Error(`Template ${template.slug} has no industry page`)
  return industry
}
