import { CONTACT, LEGAL_LINKS, MAIN_NAV, SERVICE_LINKS, SOLUTION_LINKS, type NavItem } from "@/lib/site"
import { LEAD_INDUSTRIES, LEAD_WEBSITE_TYPES } from "@/content/leadOptions"

/**
 * Từ điển phải là dữ liệu thuần (JSON-serializable): nó được truyền từ Server Component
 * sang LocaleProvider (Client Component), nên không đặt hàm vào đây. Chỗ cần chèn giá trị
 * dùng placeholder dạng {company} và thay ở nơi hiển thị.
 */
export const vi = {
  meta: {
    defaultTitle: "Nextchain.site | Landing page & website làm trọn gói",
    defaultDescription:
      "Bạn tập trung bán hàng, Nextchain viết nội dung, thiết kế, xuất bản và vận hành website. Landing page theo tháng cho cơ sở nhỏ; website và phần mềm theo dự án cho doanh nghiệp.",
  },
  notFound: {
    title: "Không tìm thấy trang",
    code: "Lỗi 404",
    heading: "Không tìm thấy trang bạn cần",
    body: "Đường dẫn có thể đã đổi hoặc gõ nhầm. Bạn có thể xem các trang dưới đây hoặc liên hệ để được tư vấn trực tiếp.",
    links: [
      { href: "/", label: "Trang chủ" },
      { href: "/bang-gia", label: "Bảng giá" },
      { href: "/mau-website", label: "Mẫu website" },
      { href: "/dich-vu", label: "Dịch vụ" },
      { href: "/lien-he", label: "Liên hệ" },
    ],
  },
  /** Liên kết điều hướng — href đã gồm tiền tố ngôn ngữ. */
  nav: {
    solutions: SOLUTION_LINKS as NavItem[],
    services: SERVICE_LINKS as NavItem[],
    main: MAIN_NAV as NavItem[],
    /** Cột "Nextchain" ở chân trang (ngoài `main`). */
    company: [
      { href: "/ve-chung-toi", label: "Về chúng tôi" },
      { href: "/dich-vu", label: "Tất cả dịch vụ" },
      { href: "/giai-phap", label: "Tất cả giải pháp" },
    ] as NavItem[],
    legal: LEGAL_LINKS as NavItem[],
  },
  header: {
    homeAria: "Trang chủ",
    mainNavAria: "Điều hướng chính",
    mobileNavAria: "Điều hướng di động",
    openMenuAria: "Mở menu",
    solutionsTitle: "Giải pháp",
    solutionsAll: "Xem tất cả giải pháp →",
    solutionsAllHref: "/giai-phap",
    servicesTitle: "Dịch vụ",
    servicesAll: "Xem tất cả dịch vụ →",
    servicesAllHref: "/dich-vu",
    cta: "Nhận tư vấn",
    ctaMobile: "Nhận tư vấn miễn phí",
    languageAria: "Ngôn ngữ",
  },
  footer: {
    tagline: "Website chuyên nghiệp cho doanh nghiệp nhỏ. Nextchain làm từ A–Z và quản lý theo gói tháng.",
    companyNote: "Nextchain.site là dịch vụ của {company}, hoạt động tại Thành phố Hồ Chí Minh.",
    solutions: "Giải pháp",
    services: "Dịch vụ",
    company: "Nextchain",
    contact: "Liên hệ",
    email: "Email",
    phone: "Điện thoại",
    address: "Địa chỉ",
    hours: "Giờ làm việc",
    rights: "All rights reserved.",
  },
  contact: {
    email: CONTACT.email as string,
    phone: CONTACT.phone as string | null,
    phoneHref: CONTACT.phoneHref as string | null,
    addresses: CONTACT.addresses as { label: string; value: string }[],
    hours: null as string | null,
  },
  floating: {
    messengerAria: "Liên hệ Zalo",
    messengerName: "Zalo",
    phoneAria: "Gọi điện thoại",
    phoneHref: "tel:0909807687" as string | null,
  },
  consent: {
    ariaLabel: "Cookie phân tích",
    text: "Chúng tôi dùng cookie phân tích (Google Analytics, Microsoft Clarity) để đo lường và cải thiện website. Chi tiết tại",
    privacyLink: "chính sách bảo mật",
    privacyHref: "/chinh-sach-bao-mat",
    reject: "Từ chối",
    accept: "Chấp nhận",
  },
  form: {
    title: "Nhận tư vấn miễn phí",
    subtitle: "Để lại thông tin, Nextchain sẽ phản hồi trong 24 giờ làm việc.",
    closeAria: "Đóng",
    name: "Họ và tên",
    namePlaceholder: "Nguyễn Văn A",
    email: "Email",
    optional: "(không bắt buộc)",
    emailPlaceholder: "email@example.com",
    emailSuggestPrefix: "Ý bạn là",
    emailSuggestSuffix: "?",
    phone: "Số điện thoại",
    phonePlaceholder: "0901 234 567",
    phoneNote: "Bắt buộc để nhân viên gọi lại tư vấn — không dùng cho mục đích khác.",
    industry: "Ngành kinh doanh",
    websiteType: "Bạn cần",
    selectPlaceholder: "Chọn (không bắt buộc)",
    message: "Nội dung cần tư vấn",
    messagePlaceholder: "Mô tả ngắn gọn về dự án của bạn...",
    trust: ["Tư vấn miễn phí 100%", "Thông tin chỉ dùng để liên hệ tư vấn", "Phản hồi trong 24 giờ làm việc"],
    /** Kênh liên hệ ưu tiên; để trống thì không hiện ô chọn (tiếng Việt dùng Zalo/điện thoại như cũ). */
    contactMethod: "",
    contactMethods: [] as { value: string; label: string }[],
    submit: "Gửi yêu cầu",
    recaptchaLang: "vi",
    /** Nhãn hiển thị, cùng thứ tự với LEAD_INDUSTRIES / LEAD_WEBSITE_TYPES (giá trị lưu vào DB luôn là tiếng Việt). */
    industries: [...LEAD_INDUSTRIES] as string[],
    websiteTypes: [...LEAD_WEBSITE_TYPES] as string[],
    errors: {
      nameRequired: "Vui lòng nhập họ và tên",
      emailInvalid: "Email không hợp lệ",
      phoneRequired: "Vui lòng nhập số điện thoại",
      phoneInvalid: "Số điện thoại chưa đúng, ví dụ: 0901234567",
    },
    toast: {
      recaptcha: "Vui lòng xác nhận bạn không phải robot.",
      rateLimited: "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau 10 phút.",
      failed: "Có lỗi xảy ra, vui lòng thử lại.",
      network: "Có lỗi xảy ra, vui lòng kết nối mạng và thử lại.",
    },
  },
}

export type Dictionary = typeof vi
