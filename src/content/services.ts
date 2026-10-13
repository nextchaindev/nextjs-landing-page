import type { StaticImageData } from "next/image"
import type { LucideIcon } from "lucide-react"
import { Boxes, FileText, Globe, PenTool, Search, ShoppingCart } from "lucide-react"
import type { Faq } from "@/content/faqs"
import type { ProjectServiceKey } from "@/content/projectPricing"
import { FREE_SUBDOMAIN_EXAMPLE, STARTING_PRICE } from "@/content/plans"
import imageRestaurant from "@/assets/project-1.png"
import imageEcommerce from "@/assets/stock/ecommerce.jpg"
import imageEducation from "@/assets/project-3.png"
import imageRealEstate from "@/assets/project-4.png"
import imageLimousine from "@/assets/project-5.png"
import imageDashboard from "@/assets/project-6.png"

/**
 * Cách tính phí của dịch vụ:
 * - subscription: gói tháng cho landing page & kinh doanh nhỏ (content/plans.ts).
 * - project: bảng giá theo dự án Basic/Premium/Professional (content/projectPricing.ts).
 */
export type ServicePricing =
  | { model: "subscription"; planIds: string[] }
  | { model: "project"; key: ProjectServiceKey }

export interface ServiceDetail {
  slug: string
  name: string
  icon: LucideIcon
  accent: { bg: string; text: string }
  metaTitle: string
  metaDescription: string
  h1: string
  /** Câu trả lời trực tiếp 2–3 câu ở đầu trang (phục vụ SEO/GEO). */
  summary: string
  audience: string
  image: StaticImageData
  imageAlt: string
  benefits: { title: string; desc: string }[]
  deliverables: string[]
  notIncluded: string[]
  pricing: ServicePricing
  faqs: Faq[]
  related: { href: string; label: string }[]
}

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: "thiet-ke-landing-page",
    name: "Landing Page Trọn Gói",
    icon: FileText,
    accent: { bg: "bg-primary", text: "text-primary" },
    metaTitle: "Thiết Kế Landing Page Trọn Gói Theo Tháng",
    metaDescription:
      `Làm landing page trọn gói theo tháng từ ${STARTING_PRICE}, không phí khởi tạo: thiết kế theo ngành, hosting, SSL, SEO, cập nhật và bảo trì. Dùng tên miền riêng hoặc địa chỉ miễn phí.`,
    h1: "Thiết kế landing page trọn gói, quản lý theo tháng",
    summary:
      `Nextchain làm landing page trọn gói cho doanh nghiệp nhỏ: bạn gửi thông tin, chọn 1 trong 3 phương án thiết kế do chúng tôi chuẩn bị và duyệt nội dung; Nextchain xuất bản, gắn tên miền, cài SEO và cập nhật hằng tháng. Giá từ ${STARTING_PRICE}/tháng, không phí khởi tạo; dùng tên miền riêng của bạn hoặc địa chỉ miễn phí ${FREE_SUBDOMAIN_EXAMPLE}.`,
    audience: "Spa, salon, homestay và doanh nghiệp dịch vụ địa phương",
    image: imageRealEstate,
    imageAlt: "Landing page dự án căn hộ do Nextchain thiết kế",
    benefits: [
      {
        title: "Không cần biết thiết kế",
        desc: "Bạn chỉ gửi thông tin và duyệt. Bố cục, nội dung, kỹ thuật do Nextchain thực hiện.",
      },
      {
        title: "3 phương án để chọn",
        desc: "Đội ngũ Nextchain chuẩn bị ba hướng thiết kế với nội dung thật của cơ sở bạn để bạn so sánh và chọn.",
      },
      {
        title: "Luôn được cập nhật",
        desc: "Đổi giá, thêm dịch vụ, thay ảnh — gửi yêu cầu, Nextchain thực hiện theo phạm vi gói tháng.",
      },
    ],
    deliverables: [
      "3 phương án thiết kế dùng nội dung thật",
      "Soạn nội dung giới thiệu, dịch vụ, lời kêu gọi hành động",
      "Form nhận yêu cầu, nút gọi điện và Zalo",
      `Địa chỉ miễn phí ${FREE_SUBDOMAIN_EXAMPLE} hoặc kết nối tên miền riêng`,
      "Hosting, chứng chỉ SSL (https)",
      "Tiêu đề, mô tả, sitemap, dữ liệu có cấu trúc",
      "Cập nhật nội dung hằng tháng theo gói",
    ],
    notIncluded: [
      "Phí mua và gia hạn tên miền riêng (nếu dùng)",
      "Chi phí chạy quảng cáo Google/Facebook",
      "Chụp ảnh tại cơ sở",
      "Cam kết thứ hạng cụ thể trên Google",
    ],
    pricing: { model: "subscription", planIds: ["khoi-dau", "tang-truong"] },
    faqs: [
      {
        q: "Landing page khác website nhiều trang như thế nào?",
        a: "Landing page là một trang tập trung vào một mục tiêu, thường là nhận liên hệ. Website nhiều trang có trang riêng cho từng dịch vụ, blog và thông tin chi tiết, phù hợp khi muốn khách tìm thấy từng dịch vụ trên Google.",
      },
      {
        q: "Gói tháng có phí khởi tạo không?",
        a: "Không. Bạn chỉ trả phí tháng theo gói, đã bao gồm thiết kế, hosting, SSL và cập nhật nội dung.",
      },
      {
        q: "Tôi có cần mua tên miền không?",
        a: `Không bắt buộc. Bạn có thể dùng miễn phí địa chỉ ${FREE_SUBDOMAIN_EXAMPLE}, hoặc tự mua tên miền riêng (.com, .vn) và Nextchain kết nối giúp.`,
      },
      {
        q: "Hủy gói tháng thì landing page xử lý thế nào?",
        a: "Việc bàn giao nội dung và tên miền được nêu rõ tại Chính sách hủy dịch vụ.",
      },
    ],
    related: [
      { href: "/blog/chi-phi-thiet-ke-landing-page", label: "Chi phí thiết kế landing page gồm những gì?" },
      { href: "/giai-phap/website-spa", label: "Landing page cho spa" },
      { href: "/mau-website", label: "Mẫu website theo ngành" },
    ],
  },
  {
    slug: "thiet-ke-website-doanh-nghiep",
    name: "Website Doanh nghiệp",
    icon: Globe,
    accent: { bg: "bg-blue-500", text: "text-blue-600" },
    metaTitle: "Thiết Kế Website Doanh Nghiệp Chuyên Nghiệp",
    metaDescription:
      "Thiết kế website doanh nghiệp từ 12.000.000đ: 5–15+ trang, quản trị nội dung, blog, đa ngôn ngữ, chuẩn SEO. Xây dựng uy tín thương hiệu và nhận khách từ Google.",
    h1: "Thiết kế website doanh nghiệp: uy tín thương hiệu, khách tìm thấy trên Google",
    summary:
      "Website doanh nghiệp của Nextchain giới thiệu công ty, dịch vụ, dự án và tin tức trên nhiều trang riêng, có hệ thống quản trị nội dung. Giá từ 12.000.000đ cho 5–7 trang, hoàn thành trong 7–30 ngày tùy quy mô, hỗ trợ đa ngôn ngữ và SEO.",
    audience: "Công ty dịch vụ, sản xuất, giáo dục, xây dựng, B2B",
    image: imageEducation,
    imageAlt: "Website tuyển sinh trung tâm đào tạo do Nextchain thiết kế",
    benefits: [
      {
        title: "Tạo niềm tin với khách",
        desc: "Thông tin công ty, dịch vụ, đội ngũ rõ ràng giúp khách và đối tác yên tâm trước khi liên hệ.",
      },
      {
        title: "Mỗi dịch vụ một trang",
        desc: "Trang riêng cho từng dịch vụ giúp Google hiển thị đúng khi khách tìm dịch vụ cụ thể.",
      },
      {
        title: "Tự cập nhật tin tức",
        desc: "Trang quản trị đơn giản để đăng tin, tuyển dụng, dự án mới mà không cần lập trình viên.",
      },
    ],
    deliverables: [
      "Trang chủ, giới thiệu, dịch vụ, dự án, tin tức, liên hệ",
      "Hệ thống quản trị nội dung",
      "Google Maps, form liên hệ",
      "Đa ngôn ngữ (gói Premium trở lên)",
      "SEO on-page, sitemap, dữ liệu có cấu trúc",
      "Đào tạo sử dụng trang quản trị",
    ],
    notIncluded: ["Chụp ảnh doanh nghiệp", "Cam kết thứ hạng cụ thể trên Google"],
    pricing: { model: "project", key: "corporate" },
    faqs: [
      {
        q: "Website doanh nghiệp cần bao nhiêu trang?",
        a: "Doanh nghiệp nhỏ thường cần trang chủ, giới thiệu, dịch vụ, blog và liên hệ. Nếu có nhiều dịch vụ, nên tách mỗi dịch vụ một trang riêng.",
      },
      {
        q: "Website có hỗ trợ tiếng Anh, tiếng Hàn không?",
        a: "Gói Premium hỗ trợ 2 ngôn ngữ, Professional hỗ trợ từ 3 ngôn ngữ.",
      },
    ],
    related: [
      { href: "/blog/landing-page-khac-website-doanh-nghiep", label: "Landing page hay website doanh nghiệp?" },
      { href: "/dich-vu/quan-tri-website-theo-thang", label: "Quản trị website theo tháng" },
    ],
  },
  {
    slug: "thiet-ke-website-ban-hang",
    name: "Website Bán hàng",
    icon: ShoppingCart,
    accent: { bg: "bg-teal-500", text: "text-teal-600" },
    metaTitle: "Thiết Kế Website Bán Hàng, Thương Mại Điện Tử",
    metaDescription:
      "Thiết kế website bán hàng từ 18.000.000đ: giỏ hàng, thanh toán online, quản lý đơn hàng, kho, mã giảm giá, SEO sản phẩm. Bán hàng 24/7 không phụ thuộc sàn.",
    h1: "Thiết kế website bán hàng: bán 24/7, không phụ thuộc sàn",
    summary:
      "Nextchain xây dựng website thương mại điện tử có giỏ hàng, thanh toán online, quản lý đơn hàng và kho. Giá từ 18.000.000đ cho tối đa 100 sản phẩm, hoàn thành trong 10–45 ngày tùy gói. Cửa hàng nhỏ chỉ cần giới thiệu sản phẩm có thể dùng gói tháng Chuyên nghiệp.",
    audience: "Shop thời trang, mỹ phẩm, thực phẩm, đồ gia dụng, thương hiệu bán lẻ",
    image: imageEcommerce,
    imageAlt: "Giao diện website giới thiệu sản phẩm",
    benefits: [
      {
        title: "Kênh của riêng bạn",
        desc: "Không phụ thuộc hoàn toàn vào sàn, sở hữu thông tin khách liên hệ để chăm sóc lại.",
      },
      {
        title: "Sản phẩm lên Google",
        desc: "Mỗi sản phẩm có trang riêng, tiêu đề, mô tả và dữ liệu có cấu trúc phù hợp.",
      },
      {
        title: "Cập nhật không cần tự làm",
        desc: "Thêm sản phẩm, đổi giá, thay ảnh — Nextchain thực hiện theo phạm vi gói.",
      },
    ],
    deliverables: [
      "Danh mục, trang sản phẩm, giỏ hàng, thanh toán",
      "Tích hợp cổng thanh toán và vận chuyển",
      "Quản lý đơn hàng, kho, khách hàng",
      "Mã giảm giá, khuyến mãi (Premium trở lên)",
      "SEO sản phẩm, sitemap, dữ liệu có cấu trúc",
      "Báo cáo doanh số",
    ],
    notIncluded: [
      "Phí cổng thanh toán và vận chuyển theo nhà cung cấp",
      "Nhập liệu toàn bộ sản phẩm (báo giá riêng)",
    ],
    pricing: { model: "project", key: "ecommerce" },
    faqs: [
      {
        q: "Có nên làm website khi đã bán trên sàn?",
        a: "Sàn giúp tiếp cận khách mới; website giúp xây thương hiệu, giữ khách quen và giới thiệu sản phẩm đầy đủ hơn. Nhiều cửa hàng dùng song song cả hai.",
      },
      {
        q: "Giới hạn số lượng sản phẩm là bao nhiêu?",
        a: "Gói Basic tối đa 100 sản phẩm; Premium và Professional không giới hạn.",
      },
    ],
    related: [
      { href: "/giai-phap/website-salon", label: "Website salon có trang sản phẩm" },
      { href: "/bang-gia", label: "Gói Chuyên nghiệp" },
    ],
  },
  {
    slug: "thiet-ke-website-theo-yeu-cau",
    name: "Thiết kế theo yêu cầu",
    icon: PenTool,
    accent: { bg: "bg-orange-500", text: "text-orange-600" },
    metaTitle: "Thiết Kế Website Theo Yêu Cầu, Tính Năng Riêng",
    metaDescription:
      "Thiết kế website theo yêu cầu từ 20.000.000đ: phân tích nghiệp vụ, UI/UX riêng, tính năng tùy chỉnh, admin panel, tích hợp API và hệ thống bên thứ ba.",
    h1: "Thiết kế website theo yêu cầu: tính năng riêng cho nghiệp vụ riêng",
    summary:
      "Khi mẫu có sẵn không đáp ứng, Nextchain phân tích nghiệp vụ và xây website với giao diện, tính năng riêng: đặt lịch, cổng khách hàng, quản trị nội bộ, tích hợp API. Giá từ 20.000.000đ, thời gian 14–60+ ngày tùy độ phức tạp.",
    audience: "Doanh nghiệp có quy trình đặc thù, nền tảng dịch vụ",
    image: imageLimousine,
    imageAlt: "Landing page đặt xe limousine thiết kế theo yêu cầu",
    benefits: [
      {
        title: "Đúng quy trình của bạn",
        desc: "Tính năng được thiết kế theo cách doanh nghiệp vận hành, không ép theo khuôn mẫu.",
      },
      {
        title: "Duyệt trước khi lập trình",
        desc: "Giao diện và luồng sử dụng được duyệt trên bản thiết kế trước khi xây dựng.",
      },
      {
        title: "Mở rộng về sau",
        desc: "Tài liệu kỹ thuật rõ ràng để bổ sung tính năng khi doanh nghiệp phát triển.",
      },
    ],
    deliverables: [
      "Phân tích yêu cầu và đặc tả tính năng",
      "Thiết kế giao diện và luồng sử dụng",
      "Lập trình, tích hợp hệ thống bên thứ ba",
      "Kiểm thử và tài liệu kỹ thuật",
    ],
    notIncluded: ["Phí hạ tầng và dịch vụ bên thứ ba (báo theo thực tế)"],
    pricing: { model: "project", key: "custom" },
    faqs: [
      {
        q: "Làm sao biết chi phí chính xác?",
        a: "Sau buổi phân tích yêu cầu, Nextchain gửi bảng đặc tả tính năng và báo giá theo từng hạng mục.",
      },
      {
        q: "Quyền sở hữu mã nguồn thế nào?",
        a: "Được thỏa thuận rõ trong hợp đồng trước khi triển khai.",
      },
    ],
    related: [
      { href: "/dich-vu/phat-trien-phan-mem", label: "Phát triển phần mềm" },
      { href: "/quy-trinh", label: "Quy trình làm việc" },
    ],
  },
  {
    slug: "marketing-seo",
    name: "Marketing & SEO",
    icon: Search,
    accent: { bg: "bg-indigo-500", text: "text-indigo-600" },
    metaTitle: "Dịch Vụ Marketing & SEO Website",
    metaDescription:
      "Dịch vụ SEO và marketing online từ 8.000.000đ: nghiên cứu từ khóa, SEO on-page và kỹ thuật, nội dung, Google Business Profile, Google Ads, báo cáo định kỳ.",
    h1: "Marketing & SEO: đưa website đến đúng khách hàng",
    summary:
      "Nextchain triển khai SEO kỹ thuật, nội dung và quảng cáo để website có khách truy cập và chuyển đổi. Gói từ 8.000.000đ, gồm nghiên cứu từ khóa, tối ưu on-page, thiết lập Google Business Profile, Google Analytics và báo cáo định kỳ. Nextchain không cam kết thứ hạng cụ thể.",
    audience: "Doanh nghiệp đã có website muốn tăng khách từ Google và quảng cáo",
    image: imageRestaurant,
    imageAlt: "Website nhà hàng hiển thị trên điện thoại",
    benefits: [
      {
        title: "Khách tìm đến bạn",
        desc: "SEO giúp website xuất hiện khi khách tìm đúng dịch vụ — nguồn khách bền vững hơn quảng cáo.",
      },
      {
        title: "Nội dung trả lời đúng câu hỏi",
        desc: "Bài viết trả lời thẳng câu hỏi của khách, có dữ liệu có cấu trúc và thông tin nhất quán — dễ được Google hiển thị và trích dẫn.",
      },
      {
        title: "Báo cáo minh bạch",
        desc: "Theo dõi lượt truy cập, truy vấn và lượt liên hệ qua Google Analytics và Search Console.",
      },
    ],
    deliverables: [
      "Nghiên cứu từ khóa theo ý định tìm kiếm",
      "SEO on-page và kỹ thuật (tốc độ, sitemap, schema)",
      "Google Business Profile, Analytics, Search Console",
      "Nội dung blog có kiểm tra thông tin",
      "Thiết lập và theo dõi quảng cáo (theo phạm vi)",
      "Báo cáo định kỳ",
    ],
    notIncluded: [
      "Ngân sách quảng cáo trả cho Google/Meta",
      "Mua backlink hoặc thủ thuật vi phạm chính sách Google",
      "Tạo hàng loạt trang mỏng chỉ để lấy index",
    ],
    pricing: { model: "project", key: "marketing" },
    faqs: [
      {
        q: "Bao lâu thì SEO có kết quả?",
        a: "Thường cần vài tháng để thấy thay đổi rõ về lượt truy cập tự nhiên, tùy mức cạnh tranh và tình trạng website ban đầu.",
      },
      {
        q: "Có cam kết top 1 Google không?",
        a: "Không. Nextchain cam kết về hạng mục công việc và báo cáo minh bạch, không cam kết thứ hạng.",
      },
    ],
    related: [
      { href: "/blog/website-spa-can-nhung-gi", label: "Ví dụ: website spa cần những gì?" },
      { href: "/dich-vu/thiet-ke-website-doanh-nghiep", label: "Website doanh nghiệp" },
    ],
  },
  {
    slug: "phat-trien-phan-mem",
    name: "Phát triển phần mềm",
    icon: Boxes,
    accent: { bg: "bg-emerald-500", text: "text-emerald-600" },
    metaTitle: "Phát Triển Phần Mềm, Ứng Dụng Web Theo Yêu Cầu",
    metaDescription:
      "Phát triển phần mềm và ứng dụng web/mobile theo yêu cầu từ 20.000.000đ: phân tích nghiệp vụ, phát triển, tích hợp API, bảo mật, phân quyền và bảo trì.",
    h1: "Phát triển phần mềm theo quy trình doanh nghiệp",
    summary:
      "Nextchain phát triển ứng dụng web, mobile và hệ thống quản lý theo quy trình riêng của doanh nghiệp: dashboard, CRM nội bộ, đặt lịch, quản lý dữ liệu. Giá từ 20.000.000đ, thời gian 7–30+ ngày tùy quy mô, có bảo trì sau bàn giao.",
    audience: "Doanh nghiệp cần số hóa quy trình, startup xây phiên bản đầu",
    image: imageDashboard,
    imageAlt: "SaaS dashboard quản lý dữ liệu do Nextchain phát triển",
    benefits: [
      {
        title: "Tự động hóa việc lặp lại",
        desc: "Thay bảng tính và quy trình thủ công bằng hệ thống có phân quyền, lịch sử và báo cáo.",
      },
      {
        title: "Dữ liệu tập trung",
        desc: "Tích hợp các công cụ đang dùng qua API để dữ liệu không bị phân tán.",
      },
      {
        title: "Bảo mật & phân quyền",
        desc: "Phân quyền người dùng và sao lưu theo mức độ nhạy cảm của dữ liệu.",
      },
    ],
    deliverables: [
      "Phân tích nghiệp vụ và đặc tả",
      "Ứng dụng web / mobile",
      "Tích hợp API, dữ liệu",
      "Phân quyền người dùng, bảo mật",
      "Bảo trì sau bàn giao",
    ],
    notIncluded: ["Phí phát hành ứng dụng trên App Store / Google Play", "Phí hạ tầng cloud"],
    pricing: { model: "project", key: "software" },
    faqs: [
      {
        q: "Nên làm phần mềm riêng hay dùng phần mềm có sẵn?",
        a: "Nếu phần mềm có sẵn đáp ứng phần lớn nhu cầu, hãy dùng nó. Phần mềm riêng phù hợp khi quy trình đặc thù hoặc chi phí thuê bao lâu dài vượt chi phí xây dựng.",
      },
    ],
    related: [
      { href: "/dich-vu/thiet-ke-website-theo-yeu-cau", label: "Thiết kế website theo yêu cầu" },
      { href: "/lien-he", label: "Liên hệ tư vấn" },
    ],
  },
]

export function getServiceBySlug(slug: string) {
  return SERVICE_DETAILS.find((service) => service.slug === slug)
}
