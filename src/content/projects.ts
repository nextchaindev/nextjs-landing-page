import type { StaticImageData } from "next/image"
import imageKyunghyang from "@/assets/projects/kyunghyang.jpg"
import imageYamicoco from "@/assets/projects/yamicoco.jpg"
import imageRegistry from "@/assets/projects/registry.jpg"
import imageRcSport from "@/assets/projects/rc-sport.jpg"
import imageImr from "@/assets/projects/imr.jpg"
import imageHrdData from "@/assets/projects/hrd-data.jpg"
import imageYoungFeel from "@/assets/projects/young-feel.jpg"
import type { Locale, NonDefaultLocale } from "@/i18n/config"
import { KO_PROJECT_TEXTS } from "./ko/projects"
import { EN_PROJECT_TEXTS } from "./en/projects"

/**
 * Dự án thật do đội ngũ Nextchain thực hiện (nguồn: nextchain.tech/products).
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
  },
]

export function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug)
}

/** Phần chữ của một dự án ở ngôn ngữ khác (ảnh, công nghệ, liên kết dịch vụ dùng chung). Khóa: slug (giữ nguyên ở mọi ngôn ngữ). */
export type ProjectText = Omit<Project, "image" | "tech" | "serviceSlug">
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
