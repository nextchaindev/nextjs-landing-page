import type { StaticImageData } from "next/image"
import imageKyunghyang from "@/assets/projects/kyunghyang.jpg"
import imageYamicoco from "@/assets/projects/yamicoco.jpg"
import imageZ2w from "@/assets/projects/z2w.jpg"
import imageGotax from "@/assets/projects/gotax.jpg"
import imageNextapi from "@/assets/projects/nextapi.jpg"
import imageRegistry from "@/assets/projects/registry.jpg"
import imageRcSport from "@/assets/projects/rc-sport.jpg"
import imageImr from "@/assets/projects/imr.jpg"
import imageHrdData from "@/assets/projects/hrd-data.jpg"
import imageYoungFeel from "@/assets/projects/young-feel.jpg"
import imagePartnerit from "@/assets/projects/partnerit.jpg"
import imageBronto from "@/assets/projects/bronto.jpg"
import imageItembox from "@/assets/projects/itembox.jpg"
import imageSchoolarflow from "@/assets/projects/schoolarflow-ai.jpg"
import imageNextpainter from "@/assets/projects/nextpainter.jpg"
import imageKevin from "@/assets/projects/kevin.jpg"
import imageAiSmartLearning from "@/assets/projects/ai-smart-learning.jpg"
import image24hagent from "@/assets/projects/24hagent-chat.jpg"
import type { Locale, NonDefaultLocale } from "@/i18n/config"
import { KO_PROJECT_TEXTS } from "./ko/projects"
import { EN_PROJECT_TEXTS } from "./en/projects"

/** Nhóm dự án cho bộ lọc ở trang /du-an. */
export type ProjectCategory = "website" | "ai" | "management" | "platform"

export const PROJECT_CATEGORIES: ProjectCategory[] = ["website", "ai", "management", "platform"]

export const PROJECT_CATEGORY_LABELS: Record<Locale, Record<ProjectCategory, string>> = {
  vi: { website: "Website & landing page", ai: "Ứng dụng AI", management: "Phần mềm quản lý", platform: "Nền tảng & ứng dụng" },
  ko: { website: "웹사이트·랜딩페이지", ai: "AI 서비스", management: "관리 소프트웨어", platform: "플랫폼·앱" },
  en: { website: "Websites & landing pages", ai: "AI products", management: "Management software", platform: "Platforms & apps" },
}

/**
 * Dự án thật do đội ngũ Nextchain thực hiện (nguồn: nextchain.tech/products — đủ 18 mục).
 * Chỉ ghi những gì đã làm — không thêm số liệu kết quả khi chưa có dữ liệu đo.
 */
export interface Project {
  slug: string
  name: string
  kind: string
  headline: string
  summary: string
  metaTitle: string
  metaDescription: string
  image: StaticImageData
  imageAlt: string
  platform: string
  tech: string[]
  /** Bài toán khách hàng gặp phải, hoặc mục tiêu dự án khi khách không nêu vấn đề cụ thể. */
  challenge: string
  solution: string
  features: { title: string; desc: string }[]
  serviceSlug: string
  serviceName: string
  category: ProjectCategory
  /** Sản phẩm do Nextchain tự phát triển ("Our product" trên nextchain.tech); không có = dự án hợp tác cho khách. */
  ownProduct?: boolean
}

export const PROJECTS: Project[] = [
  {
    slug: "kyunghyang",
    name: "Kyunghyang",
    kind: "Landing page",
    headline: "Landing page giới thiệu viện dưỡng lão",
    summary:
      "Landing page giới thiệu một viện dưỡng lão: dịch vụ chăm sóc, tiện ích, không gian sống và tham quan ảo cho người thân trước khi đến.",
    metaTitle: "Landing page viện dưỡng lão Kyunghyang",
    metaDescription:
      "Landing page giới thiệu viện dưỡng lão Kyunghyang: dịch vụ, tiện ích, tham quan ảo và cảm nhận của gia đình. Dự án do đội ngũ Nextchain thực hiện.",
    image: imageKyunghyang,
    imageAlt: "Giao diện landing page viện dưỡng lão Kyunghyang trên laptop và điện thoại",
    platform: "Website, hiển thị tốt trên điện thoại",
    tech: ["HTML", "JavaScript", "GSAP", "Three.js"],
    challenge:
      "Cơ sở cần một trang web ấm áp, dễ tin cậy để người cao tuổi và gia đình tìm hiểu kỹ trước khi quyết định — từ vị trí, lịch sử hoạt động đến dịch vụ chăm sóc hằng ngày.",
    solution:
      "Một landing page kể câu chuyện về cơ sở theo từng phần, kết hợp hiệu ứng chuyển động nhẹ và tham quan ảo để khách hình dung không gian sống như đang đến tận nơi.",
    features: [
      { title: "Giới thiệu cơ sở", desc: "Vị trí, lịch sử và sứ mệnh của viện dưỡng lão ở ngay phần đầu trang." },
      {
        title: "Dịch vụ và tiện ích",
        desc: "Phòng ở, chăm sóc sức khỏe, ăn uống, hoạt động giải trí và các chương trình đặc biệt.",
      },
      {
        title: "Tham quan ảo",
        desc: "Xem phòng ở, khu sinh hoạt chung, phòng ăn và sân vườn ngay trên website.",
      },
      { title: "Cảm nhận của gia đình", desc: "Chia sẻ từ người đang ở và người thân giúp gia đình mới yên tâm hơn." },
    ],
    serviceSlug: "thiet-ke-landing-page",
    serviceName: "Landing Page Trọn Gói",
    category: "website",
  },
  {
    slug: "yamicoco",
    name: "Yamicoco",
    kind: "Website bán hàng",
    headline: "Website dùng thử thức ăn cho thú cưng",
    summary:
      "Website giúp chủ nuôi tìm loại thức ăn hợp với thú cưng và đặt dùng thử nhiều mẫu trước khi mua số lượng lớn.",
    metaTitle: "Dự án website thức ăn thú cưng Yamicoco",
    metaDescription:
      "Website Yamicoco giúp chủ nuôi tìm thức ăn phù hợp theo loài, kích cỡ, độ tuổi và dùng thử nhiều mẫu. Dự án website bán hàng do Nextchain thực hiện.",
    image: imageYamicoco,
    imageAlt: "Giao diện website dùng thử thức ăn thú cưng Yamicoco",
    platform: "Website",
    tech: ["HTML", "CSS", "JavaScript"],
    challenge:
      "Thú cưng biếng ăn, chủ nuôi không biết chọn loại thức ăn nào và ngại mua nguyên bao chỉ để thử.",
    solution:
      "Website có công cụ gợi ý thức ăn theo đặc điểm của thú cưng, kèm danh sách mẫu dùng thử ghi rõ thành phần, giá và cách dùng.",
    features: [
      {
        title: "Gợi ý thức ăn phù hợp",
        desc: "Nhập loài, kích cỡ, độ tuổi và nhu cầu dinh dưỡng để nhận gợi ý.",
      },
      { title: "Danh sách mẫu dùng thử", desc: "Mỗi mẫu có thành phần, giá và hướng dẫn sử dụng." },
      { title: "Giao diện dễ dùng", desc: "Tìm, so sánh và chọn mẫu thử chỉ trong vài bước." },
    ],
    serviceSlug: "thiet-ke-website-ban-hang",
    serviceName: "Website Bán hàng",
    category: "website",
  },
  {
    slug: "z2w",
    name: "Z2W",
    kind: "Website tra cứu",
    headline: "Website tra cứu vật phẩm trong game",
    summary:
      "Website giúp người chơi tìm, so sánh và hiểu rõ vật phẩm trong các tựa game phổ biến: chỉ số, độ hiếm, cách nhận và thông tin do cộng đồng đóng góp.",
    metaTitle: "Dự án website tra cứu vật phẩm game Z2W",
    metaDescription:
      "Z2W: website tra cứu vật phẩm game với tìm kiếm, so sánh nhiều vật phẩm, hồ sơ chi tiết và đóng góp từ cộng đồng. Dự án do Nextchain thực hiện.",
    image: imageZ2w,
    imageAlt: "Giao diện website tra cứu vật phẩm game Z2W",
    platform: "Website",
    tech: ["React", "Node.js", "MongoDB", "Elasticsearch"],
    challenge:
      "Cho người chơi một nơi để tìm, so sánh và hiểu rõ vật phẩm trong các tựa game phổ biến, từ đó chọn đồ và ra quyết định tốt hơn khi chơi.",
    solution:
      "Một website có cơ sở dữ liệu vật phẩm theo từng game, tìm kiếm nhanh, so sánh song song và hồ sơ chi tiết từng vật phẩm; người chơi có thể gửi bổ sung và chỉnh sửa.",
    features: [
      { title: "Dữ liệu nhiều tựa game", desc: "Vật phẩm của nhiều tựa game phổ biến gom về một nơi." },
      { title: "Tìm kiếm và so sánh", desc: "Tìm vật phẩm nhanh và so sánh nhiều món cạnh nhau." },
      { title: "Hồ sơ vật phẩm chi tiết", desc: "Chỉ số, mô tả, thuộc tính, độ hiếm và cách nhận vật phẩm." },
      { title: "Đóng góp từ cộng đồng", desc: "Người chơi gửi vật phẩm mới, sửa lỗi và cập nhật thông tin." },
    ],
    serviceSlug: "thiet-ke-website-theo-yeu-cau",
    serviceName: "Thiết kế theo yêu cầu",
    category: "website",
  },
  {
    slug: "gotax",
    name: "Gotax",
    kind: "Nền tảng kết nối",
    headline: "Nền tảng tìm dịch vụ kế toán cho doanh nghiệp",
    summary:
      "Nền tảng giúp doanh nghiệp tìm, so sánh và liên hệ đơn vị kế toán phù hợp với ngành nghề, quy mô và nhu cầu, kèm hồ sơ và đánh giá từ khách hàng trước.",
    metaTitle: "Dự án nền tảng tìm dịch vụ kế toán Gotax",
    metaDescription:
      "Gotax giúp doanh nghiệp tìm đơn vị kế toán phù hợp: gợi ý theo nhu cầu, hồ sơ, đánh giá và yêu cầu báo giá ngay trên web. Sản phẩm do Nextchain phát triển.",
    image: imageGotax,
    imageAlt: "Giao diện nền tảng tìm dịch vụ kế toán Gotax",
    platform: "Ứng dụng web",
    tech: ["Next.js", "Node.js", "MongoDB"],
    challenge:
      "Giúp doanh nghiệp tìm, so sánh và chọn đơn vị kế toán hợp với nhu cầu của mình ở cùng một nơi, thay vì tự tìm hiểu và hỏi giá từng đơn vị.",
    solution:
      "Một nền tảng tập trung: doanh nghiệp nhập nhu cầu để nhận gợi ý, xem hồ sơ và đánh giá của từng đơn vị, rồi gửi yêu cầu báo giá hoặc đặt lịch tư vấn ngay trên website.",
    features: [
      {
        title: "Gợi ý dịch vụ phù hợp",
        desc: "Ghép doanh nghiệp với đơn vị kế toán theo ngành nghề, quy mô và nhu cầu cụ thể.",
      },
      { title: "Hồ sơ đơn vị kế toán", desc: "Chuyên môn, kinh nghiệm và nhận xét của khách hàng trước." },
      { title: "Đánh giá và xếp hạng", desc: "Doanh nghiệp chia sẻ trải nghiệm để người sau chọn dễ hơn." },
      { title: "Liên hệ và báo giá", desc: "Hỏi dịch vụ, yêu cầu báo giá và đặt lịch tư vấn trực tiếp trên nền tảng." },
      { title: "Thư viện kiến thức", desc: "Bài viết, hướng dẫn về kế toán, thuế và quản lý tài chính." },
    ],
    serviceSlug: "thiet-ke-website-theo-yeu-cau",
    serviceName: "Thiết kế theo yêu cầu",
    category: "platform",
    ownProduct: true,
  },
  {
    slug: "nextapi",
    name: "NextAPI",
    kind: "Ứng dụng AI",
    headline: "Nền tảng quản lý API AI tập trung",
    summary:
      "Nền tảng cho lập trình viên dùng nhiều nhà cung cấp AI qua một API duy nhất: quản lý khóa API, theo dõi lượt dùng, chi phí và nạp credit trên cùng một bảng điều khiển.",
    metaTitle: "NextAPI: nền tảng quản lý API AI tập trung",
    metaDescription:
      "NextAPI gom nhiều nhà cung cấp AI vào một API: quản lý khóa API, thống kê lượt gọi, token, chi phí và nạp credit. Sản phẩm do đội ngũ Nextchain phát triển.",
    image: imageNextapi,
    imageAlt: "Bảng điều khiển nền tảng quản lý API AI NextAPI",
    platform: "Ứng dụng web",
    tech: ["NestJS"],
    challenge:
      "Mỗi nhà cung cấp AI có API, cách xác thực và cách tính tiền riêng. Đội phát triển tốn thời gian duy trì từng kết nối, so sánh chi phí giữa các model và quản lý khóa API ở nhiều nơi.",
    solution:
      "Một cổng AI thống nhất: một endpoint và một bảng điều khiển để quản lý nhà cung cấp, khóa API, lượt dùng, chi phí và credit cho từng dự án.",
    features: [
      { title: "Bảng điều khiển", desc: "Tổng quan lượt gọi API, số dư credit, thống kê request và hoạt động gần đây." },
      {
        title: "Quản lý nhà cung cấp AI",
        desc: "Cấu hình nhiều nhà cung cấp, quản lý thông tin xác thực và đổi model ở một nơi.",
      },
      { title: "Quản lý khóa API", desc: "Tạo, phân quyền và bảo vệ khóa API theo từng dự án." },
      { title: "Credit và thanh toán", desc: "Nạp credit, theo dõi số dư, lịch sử thanh toán và ước tính chi phí AI." },
      { title: "Thống kê sử dụng", desc: "Theo dõi request, token tiêu thụ, thời gian phản hồi và báo cáo chi phí." },
      { title: "Quản lý dự án", desc: "Tách dự án, môi trường và lượt dùng API theo từng ứng dụng." },
    ],
    serviceSlug: "phat-trien-phan-mem",
    serviceName: "Phát triển phần mềm",
    category: "ai",
    ownProduct: true,
  },
  {
    slug: "registry",
    name: "Registry",
    kind: "Ứng dụng mua sắm",
    headline: "Ứng dụng danh sách quà cưới",
    summary:
      "Ứng dụng mua sắm giúp cặp đôi lập danh sách quà cưới, quản lý quỹ chi tiêu, và giúp khách mời chọn đúng món quà cô dâu chú rể cần.",
    metaTitle: "Dự án ứng dụng danh sách quà cưới Registry",
    metaDescription:
      "Registry là ứng dụng danh sách quà cưới: quỹ tiền mặt, quà từ nhiều thương hiệu, thẻ quà tặng và danh sách mong muốn. Dự án do Nextchain phát triển.",
    image: imageRegistry,
    imageAlt: "Giao diện ứng dụng danh sách quà cưới Registry trên điện thoại",
    platform: "Ứng dụng di động",
    tech: ["React", "Next.js", "NestJS"],
    challenge:
      "Cặp đôi khó quản lý chi phí đám cưới, còn khách mời không biết nên tặng gì để vừa ý cô dâu chú rể.",
    solution:
      "Một ứng dụng gom danh sách quà, quỹ tiền mặt và gợi ý quà vào cùng một nơi để cả cặp đôi lẫn khách mời đều dễ chuẩn bị.",
    features: [
      {
        title: "Quỹ tiền mặt",
        desc: "Cặp đôi tạo quỹ cho đám cưới để quản lý ngân sách, không giới hạn số quỹ.",
      },
      {
        title: "Quà từ nhiều thương hiệu",
        desc: "Thêm sản phẩm, thẻ quà tặng và trải nghiệm vào danh sách quà cưới.",
      },
      { title: "Danh sách mong muốn", desc: "Thêm món quà từ bất kỳ cửa hàng nào vào danh sách." },
      { title: "Khách mời chọn quà nhanh", desc: "Khách xem danh sách gợi ý và đặt quà ngay trong ứng dụng." },
    ],
    serviceSlug: "phat-trien-phan-mem",
    serviceName: "Phát triển phần mềm",
    category: "platform",
  },
  {
    slug: "rc-sport",
    name: "RC Sport",
    kind: "Phần mềm quản lý",
    headline: "Nền tảng quản lý câu lạc bộ bóng đá",
    summary:
      "Nền tảng cho câu lạc bộ bóng đá RC: đăng ký cầu thủ, thẻ QR xác minh danh tính, điểm danh, quản lý giải đấu và thành viên.",
    metaTitle: "Phần mềm quản lý CLB bóng đá RC Sport",
    metaDescription:
      "RC Sport: nền tảng quản lý câu lạc bộ bóng đá với thẻ cầu thủ QR, điểm danh theo trận, lịch thi đấu và cổng thông tin cầu thủ. Dự án do Nextchain thực hiện.",
    image: imageRcSport,
    imageAlt: "Màn hình quản trị đội bóng của nền tảng RC Sport",
    platform: "Ứng dụng web",
    tech: ["React", "Supabase"],
    challenge:
      "Xác minh cầu thủ, điểm danh và điều hành trận đấu đều làm thủ công: check-in chậm, dữ liệu trùng lặp, khó theo dõi hồ sơ cầu thủ qua các giải.",
    solution:
      "Một nền tảng tập trung với thẻ cầu thủ QR, xác minh bằng điện thoại, quản lý trận đấu, tài khoản cầu thủ và điểm danh tự động theo trận.",
    features: [
      {
        title: "Quản lý cầu thủ, thành viên",
        desc: "Hồ sơ cầu thủ, đội, chuyển nhượng, chỉ số chuyên môn và thẻ QR.",
      },
      {
        title: "Quản lý giải đấu",
        desc: "Tạo giải, xếp lịch, cập nhật trạng thái trận và gắn điểm danh vào trận đang diễn ra.",
      },
      { title: "Quét QR điểm danh", desc: "Xác minh danh tính cầu thủ bằng QR và lưu lịch sử quét." },
      {
        title: "Trang cá nhân cầu thủ",
        desc: "Lịch sử điểm danh, điểm thưởng và thống kê thi đấu của từng cầu thủ.",
      },
      { title: "Lịch thi đấu công khai", desc: "Lịch, kết quả và thông tin giải cho cầu thủ và khán giả." },
      { title: "Nhập dữ liệu từ Excel", desc: "Quản lý danh sách cầu thủ bằng file Excel và kết nối hệ thống đánh giá." },
    ],
    serviceSlug: "phat-trien-phan-mem",
    serviceName: "Phát triển phần mềm",
    category: "management",
  },
  {
    slug: "imr",
    name: "IMR",
    kind: "Phần mềm quản lý",
    headline: "Hệ thống quản lý khách hàng, bản quyền và bảo trì",
    summary:
      "Nền tảng gom dữ liệu khách hàng, bản quyền phần mềm, bảo trì, báo giá, hỗ trợ và email về một chỗ, có cả ứng dụng web và di động.",
    metaTitle: "Dự án hệ thống quản lý khách hàng IMR",
    metaDescription:
      "IMR: hệ thống quản lý khách hàng, bản quyền phần mềm, bảo trì, báo giá và email, có ứng dụng web và di động. Dự án phần mềm do Nextchain thực hiện.",
    image: imageImr,
    imageAlt: "Bảng điều khiển hệ thống IMR trên laptop và điện thoại",
    platform: "Ứng dụng web và di động",
    tech: ["NestJS", "React", "PostgreSQL"],
    challenge:
      "Dữ liệu khách hàng, bản quyền, báo giá và email nằm rải rác ở nhiều công cụ, dễ làm trùng việc và sai sót khi chuyển đổi bản quyền hay lập báo giá.",
    solution:
      "Một quy trình thống nhất: quản trị viên quản lý khách hàng, kiểm tra thông tin bản quyền, tạo báo giá và trao đổi email trên cùng một hệ thống.",
    features: [
      { title: "Bảng điều khiển", desc: "Tổng quan khách hàng, bản quyền và tình trạng bảo trì." },
      {
        title: "Khách hàng và khách tiềm năng",
        desc: "Chuyển khách tiềm năng đủ điều kiện thành hồ sơ khách hàng đã xác thực.",
      },
      { title: "Quản lý đơn hàng", desc: "Theo dõi đơn từ lúc tạo đến khi cài đặt xong." },
      { title: "Quản lý bản quyền", desc: "Phiên bản, trạng thái và thông tin bảo trì của từng bản quyền." },
      { title: "Tạo báo giá", desc: "Báo giá mua mới, gia hạn, nâng cấp theo từng bước có hướng dẫn." },
      { title: "Quản lý email", desc: "Mẫu email dùng lại được và gửi trao đổi với khách ngay trên hệ thống." },
    ],
    serviceSlug: "phat-trien-phan-mem",
    serviceName: "Phát triển phần mềm",
    category: "management",
  },
  {
    slug: "hrd-data",
    name: "HRD-data",
    kind: "Phần mềm quản lý",
    headline: "Phần mềm quản lý khóa học và học viên",
    summary:
      "Nền tảng quản lý hoạt động đào tạo: lịch học, giảng viên, học viên, phòng học và báo cáo tỉ lệ tham gia, hoàn thành khóa.",
    metaTitle: "Dự án phần mềm quản lý khóa học HRD-data",
    metaDescription:
      "HRD-data: phần mềm quản lý khóa học, đăng ký học viên, phân bổ phòng học, thiết bị và báo cáo đào tạo. Dự án do đội ngũ Nextchain phát triển.",
    image: imageHrdData,
    imageAlt: "Giao diện quản trị phần mềm quản lý khóa học HRD-data",
    platform: "Ứng dụng web",
    tech: ["React", "TypeScript", "NestJS", "PostgreSQL", "Redis"],
    challenge:
      "Tổ chức có nhiều khóa học cần một nơi duy nhất để điều phối lịch, giảng viên, học viên và tài nguyên thay vì làm thủ công qua nhiều bảng tính.",
    solution:
      "Một hệ thống tập trung giúp quản trị viên tạo khóa học, quản lý đăng ký, phân bổ phòng học, thiết bị và theo dõi báo cáo đào tạo.",
    features: [
      { title: "Quản lý khóa học", desc: "Lịch học, nội dung, giảng viên và học viên của từng khóa." },
      { title: "Đăng ký học viên", desc: "Học viên tự đăng ký, quản trị viên theo dõi trạng thái và điểm danh." },
      { title: "Phân bổ tài nguyên", desc: "Sắp xếp phòng học, thiết bị và tài liệu cho từng buổi." },
      {
        title: "Báo cáo đào tạo",
        desc: "Theo dõi tỉ lệ tham gia, hoàn thành khóa và phản hồi của học viên.",
      },
    ],
    serviceSlug: "phat-trien-phan-mem",
    serviceName: "Phát triển phần mềm",
    category: "management",
  },
  {
    slug: "young-feel",
    name: "Young Feel",
    kind: "Nền tảng theo yêu cầu",
    headline: "Nền tảng kết nối khách hàng với đơn vị sản xuất video",
    summary:
      "Nền tảng giúp khách hàng gửi yêu cầu làm video, so sánh báo giá của các đơn vị sản xuất và cùng duyệt video, góp ý trong một không gian làm việc chung.",
    metaTitle: "Dự án nền tảng sản xuất video Young Feel",
    metaDescription:
      "Young Feel: nền tảng kết nối khách hàng với đơn vị sản xuất video — gửi yêu cầu, so sánh báo giá, duyệt video và góp ý. Dự án do Nextchain thực hiện.",
    image: imageYoungFeel,
    imageAlt: "Màn hình duyệt video trên nền tảng Young Feel",
    platform: "Ứng dụng web",
    tech: ["React"],
    challenge:
      "Dự án làm video trao đổi qua email và tin nhắn rời rạc: khó theo dõi các lần sửa, tiến độ, so sánh đề xuất và trao đổi giữa khách với đơn vị sản xuất.",
    solution:
      "Một nền tảng thống nhất từ gửi yêu cầu, chọn đối tác, quản lý sản xuất, theo dõi chỉnh sửa đến bàn giao video cuối cùng.",
    features: [
      { title: "Gửi yêu cầu sản xuất", desc: "Khách nêu yêu cầu, ngân sách và thời gian để được ghép đối tác." },
      { title: "Báo giá và hồ sơ năng lực", desc: "Đơn vị sản xuất gửi đề xuất, báo giá, portfolio để khách so sánh." },
      { title: "Không gian làm việc chung", desc: "Trao đổi, theo dõi tiến độ và chia sẻ sản phẩm theo từng dự án." },
      { title: "Duyệt video và góp ý", desc: "Bình luận theo luồng, quản lý các lần sửa và lịch sử phiên bản." },
      { title: "Quản trị dự án", desc: "Quản trị viên theo dõi đối tác, trạng thái dự án và xử lý vướng mắc." },
    ],
    serviceSlug: "thiet-ke-website-theo-yeu-cau",
    serviceName: "Thiết kế theo yêu cầu",
    category: "platform",
  },
  {
    slug: "partnerit",
    name: "PartnerIT",
    kind: "Ứng dụng AI",
    headline: "Nền tảng ghép doanh nghiệp với chương trình hỗ trợ của chính phủ",
    summary:
      "Nền tảng tự thu thập thông báo hỗ trợ từ các cơ quan nhà nước, chấm điểm mức độ phù hợp với hồ sơ từng doanh nghiệp và tạo báo cáo phân tích bằng AI.",
    metaTitle: "PartnerIT: tìm chương trình hỗ trợ phù hợp",
    metaDescription:
      "PartnerIT thu thập thông báo hỗ trợ của chính phủ, chấm điểm phù hợp theo hồ sơ doanh nghiệp và tạo báo cáo phân tích bằng AI. Dự án do Nextchain thực hiện.",
    image: imagePartnerit,
    imageAlt: "Giao diện nền tảng PartnerIT gợi ý chương trình hỗ trợ cho doanh nghiệp",
    platform: "Ứng dụng web",
    tech: ["Next.js", "NestJS"],
    challenge:
      "Doanh nghiệp phải tự lục tìm chương trình hỗ trợ trên nhiều website nhà nước và khó tự đánh giá mình có đủ điều kiện hay không; cách ghép chỉ dựa vào AI trước đó cho kết quả thiếu chính xác.",
    solution:
      "Một nền tảng gom thông báo từ nhiều nguồn công, ghép bằng thuật toán chấm điểm theo quy tắc và dùng AI viết báo cáo phân tích; quản trị viên duyệt doanh nghiệp và điều chỉnh gợi ý trên trang quản trị.",
    features: [
      {
        title: "Hồ sơ doanh nghiệp",
        desc: "Năng lực công nghệ, chứng nhận, tài chính và thông tin kinh doanh dùng để ghép chương trình.",
      },
      {
        title: "Quản lý thông báo hỗ trợ",
        desc: "Thu thập từ nhiều nguồn nhà nước, loại trùng và quản lý thông báo còn hiệu lực.",
      },
      { title: "Báo cáo phân tích AI", desc: "Mức độ phù hợp, điểm mạnh, khuyến nghị và tóm tắt cho từng thông báo." },
      { title: "Duyệt doanh nghiệp", desc: "Quản trị viên xét duyệt doanh nghiệp mới trước khi mở gợi ý." },
      {
        title: "Trang quản trị",
        desc: "Quản lý doanh nghiệp, thông báo, báo cáo AI, trạng thái thu thập và chỉnh gợi ý thủ công.",
      },
      {
        title: "Thu thập và xử lý dữ liệu",
        desc: "Lấy dữ liệu từ API công và crawler, chuẩn hóa để gợi ý luôn cập nhật.",
      },
    ],
    serviceSlug: "phat-trien-phan-mem",
    serviceName: "Phát triển phần mềm",
    category: "ai",
  },
  {
    slug: "bronto",
    name: "Bronto",
    kind: "Phần mềm quản lý",
    headline: "Nền tảng quản lý dự án khảo sát và người trả lời",
    summary:
      "Nền tảng cho đội nghiên cứu thị trường quản lý dự án khảo sát: khách hàng, đối tác phân phối, sàng lọc chất lượng người trả lời và theo dõi kết quả theo thời gian thực.",
    metaTitle: "Dự án phần mềm quản lý khảo sát Bronto",
    metaDescription:
      "Bronto: quản lý dự án khảo sát, đối tác, link khảo sát, sàng lọc người trả lời (Quality Gate) và báo cáo theo thời gian thực. Dự án do Nextchain thực hiện.",
    image: imageBronto,
    imageAlt: "Bảng điều khiển nền tảng quản lý khảo sát Bronto",
    platform: "Ứng dụng web",
    tech: ["Next.js", "NestJS", "Supabase"],
    challenge:
      "Dự án khảo sát nằm rải rác ở nhiều công cụ; link khảo sát và người trả lời phải theo dõi thủ công nên khó nắm tiến độ, hiệu quả từng đối tác và kiểm soát chất lượng dữ liệu.",
    solution:
      "Một hệ thống quản trị tập trung: tự tạo link khảo sát cho từng đối tác, kết nối hệ thống khảo sát bên ngoài qua callback, sàng lọc người trả lời trước khảo sát và theo dõi trạng thái theo thời gian thực.",
    features: [
      {
        title: "Bảng điều khiển và báo cáo",
        desc: "Tiến độ dự án, trạng thái người trả lời, tỉ lệ hoàn thành, thời lượng khảo sát và xuất báo cáo.",
      },
      { title: "Quản lý dự án", desc: "Tạo dự án, gán khách hàng và nhiều đối tác, tạo link khảo sát trên một màn hình." },
      { title: "Quản lý đối tác", desc: "Thông tin đối tác, URL chuyển hướng và link khảo sát riêng để theo dõi." },
      {
        title: "Quality Gate",
        desc: "Câu hỏi sàng lọc, quy tắc loại ngay, kiểm tra IP theo quốc gia và phát hiện trả lời trùng.",
      },
      {
        title: "Quản lý người trả lời",
        desc: "Kết quả sàng lọc, trạng thái, đối tác, thời lượng; tìm kiếm, lọc và xuất Excel.",
      },
      { title: "Phân quyền người dùng", desc: "Phân quyền theo vai trò để mỗi tài khoản chỉ thấy phần việc của mình." },
    ],
    serviceSlug: "phat-trien-phan-mem",
    serviceName: "Phát triển phần mềm",
    category: "management",
  },
  {
    slug: "itembox",
    name: "Itembox",
    kind: "Ứng dụng AI",
    headline: "Công cụ chỉnh ảnh sản phẩm bằng AI cho người bán online",
    summary:
      "Trình chỉnh ảnh kéo thả tích hợp AI giúp người bán và marketer tạo ảnh sản phẩm đạt chuẩn sàn thương mại điện tử: tách nền, thay người mẫu, tạo ảnh và làm nét ảnh.",
    metaTitle: "Dự án công cụ chỉnh ảnh sản phẩm AI Itembox",
    metaDescription:
      "Itembox: chỉnh ảnh sản phẩm bằng AI với tách nền một chạm, thay người mẫu, tạo ảnh từ mô tả và tăng độ phân giải. Dự án do Nextchain thực hiện.",
    image: imageItembox,
    imageAlt: "Giao diện trình chỉnh ảnh sản phẩm AI Itembox",
    platform: "Ứng dụng web",
    tech: ["React", "Next.js", "NestJS", "PostgreSQL", "Python", "Supabase"],
    challenge:
      "Chỉnh ảnh sản phẩm thủ công tốn thời gian, công cụ chuyên nghiệp khó dùng và ảnh làm ra không đồng đều giữa các sản phẩm trong cùng cửa hàng.",
    solution:
      "Một nền tảng chỉnh ảnh tất cả trong một: trình chỉnh sửa kéo thả kết hợp các tính năng AI, hỗ trợ nhiều ngôn ngữ, tự lưu và quản lý toàn bộ ảnh sản phẩm.",
    features: [
      { title: "Tách nền bằng AI", desc: "Xóa nền ảnh sản phẩm chỉ với một lần bấm." },
      { title: "Thay người mẫu", desc: "Đổi người mẫu trong ảnh sản phẩm bằng các mẫu do AI tạo." },
      { title: "Tạo ảnh bằng AI", desc: "Tạo ảnh sản phẩm từ mô tả hoặc ảnh tham khảo." },
      { title: "Tăng độ phân giải", desc: "Làm nét ảnh độ phân giải thấp mà vẫn giữ chất lượng." },
      { title: "Quản lý ảnh sản phẩm", desc: "Sắp xếp, tìm kiếm và quản lý mọi ảnh sản phẩm ở một nơi." },
      { title: "Tự động lưu", desc: "Lưu theo thời gian thực để không mất công chỉnh sửa." },
    ],
    serviceSlug: "phat-trien-phan-mem",
    serviceName: "Phát triển phần mềm",
    category: "ai",
  },
  {
    slug: "schoolarflow-ai",
    name: "SchoolarFlow AI",
    kind: "Ứng dụng AI",
    headline: "Gia sư AI tạo lộ trình học lập trình riêng",
    summary:
      "Nền tảng học lập trình dùng AI: nhập mục tiêu để nhận lộ trình riêng, học theo từng module, làm bài tập sau mỗi chặng và một dự án cuối lộ trình.",
    metaTitle: "SchoolarFlow AI: gia sư AI dạy lập trình",
    metaDescription:
      "SchoolarFlow AI tạo lộ trình học lập trình theo mục tiêu, chia module, giao bài tập sau mỗi chặng và theo dõi tiến độ. Sản phẩm do đội ngũ Nextchain phát triển.",
    image: imageSchoolarflow,
    imageAlt: "Giao diện nền tảng học lập trình SchoolarFlow AI trên laptop",
    platform: "Ứng dụng web",
    tech: ["Node.js"],
    challenge:
      "Người tự học lập trình có quá nhiều tài liệu rời rạc mà thiếu một lộ trình rõ ràng: không biết học gì trước, học đến đâu và làm gì để thực hành.",
    solution:
      "Một gia sư AI dựng lộ trình riêng theo mục tiêu, dẫn người học qua từng module, giải thích từng bước và kết thúc mỗi chặng bằng bài tập; cuối lộ trình là một dự án tổng hợp.",
    features: [
      { title: "Lộ trình học cá nhân hóa", desc: "Nhập mục tiêu hoặc bài toán để nhận lộ trình lập trình riêng." },
      { title: "Học theo module", desc: "Nội dung chia nhỏ theo module để không bị quá tải." },
      { title: "Bài tập sau mỗi chặng", desc: "Mỗi module kết thúc bằng bài tập nhỏ, cuối lộ trình có dự án tổng hợp." },
      { title: "Theo dõi tiến độ", desc: "Thấy rõ phần đã học xong và việc cần làm tiếp theo." },
      { title: "Duyệt nội dung AI", desc: "Công cụ quản trị để xem lại, đánh giá và duyệt nội dung học do AI tạo." },
    ],
    serviceSlug: "phat-trien-phan-mem",
    serviceName: "Phát triển phần mềm",
    category: "ai",
    ownProduct: true,
  },
  {
    slug: "nextpainter",
    name: "NextPainter",
    kind: "Ứng dụng AI",
    headline: "Công cụ tách nền và chỉnh ảnh bằng AI",
    summary:
      "Dịch vụ chỉnh ảnh trên web: tải ảnh lên, AI tách nền trong một bước, so sánh trước và sau bằng thanh trượt rồi tải về; hỗ trợ tiếng Hàn và tiếng Anh.",
    metaTitle: "NextPainter: công cụ tách nền ảnh bằng AI",
    metaDescription:
      "NextPainter tách nền ảnh bằng AI, xử lý tốt tóc và viền mềm, có thanh so sánh trước/sau, kéo thả tải ảnh và dùng tốt trên điện thoại. Sản phẩm của Nextchain.",
    image: imageNextpainter,
    imageAlt: "Giao diện tách nền ảnh bằng AI của NextPainter trên màn hình và điện thoại",
    platform: "Ứng dụng web, hiển thị tốt trên máy tính, máy tính bảng và điện thoại",
    tech: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
    challenge:
      "Phần lớn công cụ tách nền bắt trả phí theo tháng, khó dùng với người mới và chưa hỗ trợ tốt người dùng tiếng Hàn.",
    solution:
      "Một luồng thao tác một chạm từ tải ảnh đến tải về, dùng model AI tách nền xử lý trên máy chủ để giữ an toàn khóa API, và sẵn nền móng để thêm các công cụ chỉnh ảnh khác.",
    features: [
      { title: "Tách nền bằng AI", desc: "Dùng model BRIA RMBG-1.4, xử lý tốt tóc, viền mềm và đường biên phức tạp." },
      { title: "Thanh so sánh trước/sau", desc: "Kéo để xem ảnh gốc và ảnh đã tách nền cạnh nhau." },
      { title: "Thao tác một chạm", desc: "Từ tải ảnh lên đến tải kết quả về, người mới cũng làm được." },
      { title: "Kéo thả tải ảnh", desc: "Kéo thả hoặc chọn file, kiểm tra dung lượng trước khi tải lên." },
      { title: "Song ngữ Hàn – Anh", desc: "Tự hiển thị tiếng Hàn hoặc tiếng Anh theo người dùng." },
      { title: "Xử lý an toàn trên máy chủ", desc: "Các lệnh gọi API nhạy cảm chạy ở máy chủ, không lộ ra trình duyệt." },
    ],
    serviceSlug: "phat-trien-phan-mem",
    serviceName: "Phát triển phần mềm",
    category: "ai",
    ownProduct: true,
  },
  {
    slug: "kevin",
    name: "Kevin",
    kind: "Phần mềm quản lý",
    headline: "Công cụ quản lý nội dung cho game cốt truyện Unity",
    summary:
      "Ứng dụng giúp đội phát triển quản lý nội dung game cốt truyện trên Unity: đoạn truyện, nhân vật, sự kiện, lựa chọn của người chơi và đưa thẳng vào dự án Unity.",
    metaTitle: "Công cụ quản lý nội dung game Unity Kevin",
    metaDescription:
      "Kevin: công cụ quản lý nội dung game cốt truyện trên Unity — đoạn truyện, nhân vật, sự kiện, lựa chọn và tích hợp Unity. Dự án do Nextchain thực hiện.",
    image: imageKevin,
    imageAlt: "Màn hình quản lý cốt truyện của công cụ Kevin trên laptop",
    platform: "Ứng dụng web, tích hợp Unity",
    tech: ["React", "C#", "Unity"],
    challenge:
      "Xây dựng một công cụ quản lý nội dung linh hoạt, dễ dùng cho game cốt truyện trên Unity, để đội phát triển tập trung vào nội dung và dùng lại nội dung giữa các phần dễ dàng.",
    solution:
      "Một giao diện trực quan để thêm, sửa, xóa nội dung game, liên kết nhân vật với sự kiện và đưa dữ liệu vào dự án Unity qua ScriptableObject.",
    features: [
      { title: "Quản lý cốt truyện", desc: "Tạo các đoạn truyện gồm chữ, hình, âm thanh, video và sắp xếp thứ tự." },
      {
        title: "Nhân vật và vật thể",
        desc: "Mô tả, hình ảnh, thông số kỹ thuật và liên kết với sự kiện, đoạn truyện.",
      },
      {
        title: "Sự kiện và lựa chọn",
        desc: "Điều khiển mạch truyện, tạo lựa chọn và kết quả theo quyết định của người chơi.",
      },
      { title: "Tích hợp Unity", desc: "Đưa nội dung vào dự án Unity để dùng ngay trong game." },
    ],
    serviceSlug: "phat-trien-phan-mem",
    serviceName: "Phát triển phần mềm",
    category: "management",
  },
  {
    slug: "ai-smart-learning",
    name: "AI Smart Learning",
    kind: "Ứng dụng AI",
    headline: "Nền tảng khóa học trực tuyến cá nhân hóa bằng AI",
    summary:
      "Nền tảng học trực tuyến dùng AI cá nhân hóa trải nghiệm: lộ trình tự điều chỉnh theo tiến độ, bài kiểm tra theo trình độ, phân tích kết quả và cộng đồng học tập.",
    metaTitle: "Nền tảng học trực tuyến AI Smart Learning",
    metaDescription:
      "AI Smart Learning: khóa học trực tuyến cá nhân hóa bằng AI, lộ trình thích ứng, bài kiểm tra theo trình độ và phân tích tiến độ. Dự án của Nextchain.",
    image: imageAiSmartLearning,
    imageAlt: "Giao diện nền tảng học trực tuyến AI Smart Learning",
    platform: "Ứng dụng web",
    tech: ["React", "TypeScript", "Node.js", "NestJS", "PostgreSQL"],
    challenge:
      "Mang nội dung học chất lượng đến người học theo cách tương tác, để mỗi người có trải nghiệm hợp với nhu cầu, tốc độ và điểm mạnh, điểm yếu của riêng mình.",
    solution:
      "Một nền tảng học trực tuyến dùng AI để đề xuất lộ trình, tạo bài kiểm tra theo trình độ và phân tích tiến độ, kết hợp không gian trao đổi giữa người học, giảng viên và mentor.",
    features: [
      { title: "Khóa học có AI hỗ trợ", desc: "AI cá nhân hóa khóa học theo sở thích, tốc độ và kết quả của từng người." },
      { title: "Lộ trình thích ứng", desc: "Lộ trình tự điều chỉnh theo tiến độ, điểm mạnh và phần còn yếu." },
      {
        title: "Nội dung và bài kiểm tra tương tác",
        desc: "Video, câu đố, mô phỏng, bài tập; bài kiểm tra theo trình độ kèm nhận xét.",
      },
      {
        title: "Theo dõi và phân tích tiến độ",
        desc: "Người học xem tiến độ, kết quả; AI chỉ ra xu hướng, điểm mạnh và điểm yếu.",
      },
      { title: "Cộng đồng học tập", desc: "Thảo luận, chia sẻ kiến thức và kết nối với bạn học, giảng viên, mentor." },
    ],
    serviceSlug: "phat-trien-phan-mem",
    serviceName: "Phát triển phần mềm",
    category: "ai",
  },
  {
    slug: "24hagent-chat",
    name: "24hagent.chat",
    kind: "Ứng dụng AI",
    headline: "Tạo chatbot AI riêng từ tài liệu của bạn",
    summary:
      "Công cụ cho cá nhân và doanh nghiệp tạo trợ lý AI riêng: tải tài liệu lên, hệ thống tự phân tích và tạo chatbot trả lời câu hỏi theo đúng nội dung tài liệu.",
    metaTitle: "24hagent.chat: tạo chatbot AI từ tài liệu",
    metaDescription:
      "24hagent.chat tạo chatbot AI riêng từ tài liệu: tải file văn bản, bảng tính lên, AI tự phân tích và trả lời câu hỏi. Sản phẩm của Nextchain.",
    image: image24hagent,
    imageAlt: "Giao diện tạo chatbot AI từ tài liệu của 24hagent.chat",
    platform: "Ứng dụng web",
    tech: ["React", "Node.js", "Express", "MongoDB", "Pinecone"],
    challenge:
      "Tự xây một trợ lý AI từ đầu tốn nhiều thời gian và công sức, nhất là khi muốn nó trả lời đúng theo tài liệu riêng của mình.",
    solution:
      "Người dùng chỉ cần tải tài liệu lên; hệ thống dùng AI và xử lý ngôn ngữ tự nhiên để phân tích nội dung, tạo trợ lý trả lời câu hỏi, và cho phép bổ sung, chỉnh sửa để trả lời tốt hơn.",
    features: [
      { title: "Tải tài liệu lên", desc: "Hỗ trợ file văn bản, bảng tính và nhiều định dạng khác." },
      { title: "Tự tạo trợ lý AI", desc: "AI phân tích nội dung tài liệu và tạo trợ lý trả lời câu hỏi." },
      { title: "Cá nhân hóa", desc: "Bổ sung thông tin, sửa câu trả lời để trợ lý hoạt động tốt hơn." },
      { title: "Giao diện dễ dùng", desc: "Tải tài liệu và quản lý các trợ lý trên một giao diện đơn giản." },
    ],
    serviceSlug: "phat-trien-phan-mem",
    serviceName: "Phát triển phần mềm",
    category: "ai",
    ownProduct: true,
  },
]

export function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug)
}

/** Dự án gợi ý ở cuối trang chi tiết: cùng nhóm trước, thiếu thì lấy dự án khác theo thứ tự danh sách. */
export function relatedProjects(all: Project[], project: Project, count = 3) {
  const others = all.filter((p) => p.slug !== project.slug)
  return [
    ...others.filter((p) => p.category === project.category),
    ...others.filter((p) => p.category !== project.category),
  ].slice(0, count)
}

/** Phần chữ của một dự án ở ngôn ngữ khác (ảnh, công nghệ, nhóm, liên kết dịch vụ dùng chung). Khóa: slug (giữ nguyên ở mọi ngôn ngữ). */
export type ProjectText = Omit<Project, "image" | "tech" | "serviceSlug" | "category" | "ownProduct">
export type ProjectTexts = Record<string, ProjectText>

const PROJECT_TEXTS: Record<NonDefaultLocale, ProjectTexts> = { ko: KO_PROJECT_TEXTS, en: EN_PROJECT_TEXTS }

export function getProjects(locale: Locale = "vi"): Project[] {
  if (locale === "vi") return PROJECTS
  const texts = PROJECT_TEXTS[locale]
  return PROJECTS.flatMap((base) => (texts[base.slug] ? [{ ...base, ...texts[base.slug] }] : []))
}

export function getProjectFor(locale: Locale, slug: string) {
  return getProjects(locale).find((project) => project.slug === slug)
}
