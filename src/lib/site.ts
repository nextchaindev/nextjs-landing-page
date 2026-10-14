export const SITE_URL = "https://www.nextchain.site"
export const SITE_NAME = "Nextchain.site"
export const COMPANY_NAME = "Nextchain Tech"

export const CONTACT = {
  email: "contact@nextchain.kr",
  phone: "+84-909-807-687",
  phoneHref: "tel:+84909807687",
  address: "Hồ Chí Minh, Việt Nam",
  responseTime: "trong vòng 24 giờ làm việc",
}

export interface NavItem {
  href: string
  label: string
  description?: string
}

export const SOLUTION_LINKS: NavItem[] = [
  { href: "/dich-vu/thiet-ke-landing-page", label: "Landing Page Trọn Gói", description: "Thiết kế, xuất bản, quản lý theo tháng" },
  { href: "/giai-phap/website-spa", label: "Website Spa", description: "Bảng dịch vụ, gallery, nhận yêu cầu hẹn" },
  { href: "/giai-phap/website-salon", label: "Website Salon", description: "Portfolio, bảng giá, đặt lịch" },
  { href: "/giai-phap/website-homestay", label: "Website Homestay", description: "Phòng, tiện ích, hỏi phòng" },
  { href: "/giai-phap/website-nha-khoa", label: "Website Nha khoa", description: "Dịch vụ, bác sĩ, yêu cầu lịch khám" },
  { href: "/giai-phap/landing-page-bat-dong-san", label: "Landing Page Bất động sản", description: "Thông tin dự án và nhận tư vấn" },
  { href: "/giai-phap/landing-page-khoa-hoc", label: "Landing Page Khóa học", description: "Chương trình và tuyển sinh" },
]

export const SERVICE_LINKS: NavItem[] = [
  { href: "/dich-vu/thiet-ke-landing-page", label: "Landing Page", description: "Gói tháng giá rẻ, có tên miền miễn phí" },
  { href: "/dich-vu/thiet-ke-website-doanh-nghiep", label: "Website Doanh nghiệp", description: "Giới thiệu công ty, dịch vụ, tin tức" },
  { href: "/dich-vu/thiet-ke-website-ban-hang", label: "Website Bán hàng", description: "Danh mục sản phẩm, đặt mua" },
  { href: "/dich-vu/thiet-ke-website-theo-yeu-cau", label: "Thiết kế theo yêu cầu", description: "Giao diện và tính năng riêng" },
  { href: "/dich-vu/marketing-seo", label: "Marketing & SEO", description: "SEO, GEO, quảng cáo, nội dung" },
  { href: "/dich-vu/phat-trien-phan-mem", label: "Phát triển phần mềm", description: "Ứng dụng web, mobile, quản lý" },
  { href: "/dich-vu/quan-tri-website-theo-thang", label: "Quản trị website theo tháng", description: "Cập nhật, bảo trì, hỗ trợ" },
]

export const MAIN_NAV: NavItem[] = [
  { href: "/mau-website", label: "Mẫu Website" },
  { href: "/bang-gia", label: "Bảng giá" },
  { href: "/quy-trinh", label: "Quy trình" },
  { href: "/so-sanh/tu-lam-hay-thue-tron-goi", label: "Tự làm hay thuê?" },
  { href: "/blog", label: "Blog" },
  { href: "/lien-he", label: "Liên hệ" },
]

export const LEGAL_LINKS: NavItem[] = [
  { href: "/dieu-khoan", label: "Điều khoản dịch vụ" },
  { href: "/chinh-sach-bao-mat", label: "Chính sách bảo mật" },
  { href: "/chinh-sach-huy-dich-vu", label: "Chính sách hủy dịch vụ" },
]

export function absoluteUrl(path: string) {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`
}
