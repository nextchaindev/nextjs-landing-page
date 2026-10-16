import type { StaticImageData } from "next/image"
import type { Faq } from "@/content/faqs"
import coverLanding from "@/assets/project-4.png"
import coverCompare from "@/assets/project-3.png"
import coverSpa from "@/assets/stock/spa.jpg"
import coverMonthly from "@/assets/stock/cafe.jpg"
import coverFacebook from "@/assets/stock/nail.jpg"
import coverRestaurant from "@/assets/project-1.png"
import coverHomestay from "@/assets/stock/homestay.jpg"
import { FREE_SUBDOMAIN_EXAMPLE, PLANS, STARTING_PRICE, formatVnd } from "@/content/plans"

/**
 * Bài viết blog Nextchain.site.
 *
 * Chỉ thêm bài đã qua DRAFT → FACT_CHECK → OWNER_APPROVED → SEO_QA.
 * Mọi bài trong mảng này được coi là PUBLISHED: có route, có trong sitemap.
 *
 * Cấu trúc phục vụ GEO: `answer` trả lời trực tiếp câu hỏi chính ngay đầu
 * bài, heading viết dạng câu hỏi, dữ liệu so sánh đặt trong bảng, FAQ cuối bài.
 */
export interface BlogSection {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
  table?: { head: string[]; rows: string[][] }
}

export interface BlogPost {
  slug: string
  title: string
  /** Tiêu đề ngắn (~50 ký tự) cho thẻ <title> khi title đầy đủ quá dài. */
  metaTitle?: string
  description: string
  category: string
  cover: StaticImageData
  /** ISO date, e.g. "2026-10-13" */
  publishedAt: string
  updatedAt?: string
  author: string
  readingMinutes: number
  /** Trả lời trực tiếp câu hỏi chính của bài trong 2–3 câu. */
  answer: string
  keyTakeaways: string[]
  sections: BlogSection[]
  faqs: Faq[]
  /** Trang thương mại liên quan để liên kết nội bộ. */
  relatedLinks: { href: string; label: string }[]
}

const AUTHOR = "Đội ngũ Nextchain"

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "chi-phi-thiet-ke-landing-page",
    title: "Chi phí thiết kế landing page gồm những gì? Cách tính và checklist",
    metaTitle: "Chi phí thiết kế landing page",
    description:
      "Các khoản chi phí khi làm landing page: thiết kế, nội dung, tên miền, hosting, bảo trì. So sánh trả một lần và gói tháng, kèm checklist chọn đơn vị.",
    category: "Chi phí",
    cover: coverLanding,
    publishedAt: "2026-10-13",
    author: AUTHOR,
    readingMinutes: 6,
    answer:
      `Chi phí thiết kế landing page gồm phí thiết kế – nội dung – lập trình, tên miền và hosting (hằng năm) và chi phí chỉnh sửa, bảo trì về sau. Có hai cách trả: trả một lần rồi tự lo duy trì, hoặc gói tháng đã bao gồm thiết kế, hosting, cập nhật và bảo trì — cách Nextchain.site đang áp dụng, từ ${STARTING_PRICE}/tháng, không phí khởi tạo.`,
    keyTakeaways: [
      "Đừng chỉ so sánh giá thiết kế — hãy hỏi rõ tên miền, hosting, số lần chỉnh sửa và thời gian hỗ trợ.",
      "Landing page cho chiến dịch ngắn hạn có thể chọn gói cơ bản; trang chạy quảng cáo lâu dài nên đầu tư tracking và tối ưu chuyển đổi.",
      "Chi phí quảng cáo là khoản riêng, không nằm trong giá thiết kế.",
    ],
    sections: [
      {
        heading: "Chi phí landing page gồm những khoản nào?",
        bullets: [
          "Thiết kế giao diện: bố cục, màu sắc, hình ảnh theo thương hiệu.",
          "Nội dung: tiêu đề, lợi ích, lời kêu gọi hành động. Nhiều đơn vị tính riêng phần viết nội dung.",
          "Lập trình và responsive: hiển thị tốt trên điện thoại, tốc độ tải nhanh.",
          "Tích hợp: form, Zalo, Google Analytics, pixel quảng cáo, công cụ email marketing.",
          "Tên miền và hosting: trả theo năm, thường được tính riêng hoặc gộp trong gói duy trì.",
          "Chỉnh sửa và bảo trì: số lần sửa miễn phí, thời gian hỗ trợ sau bàn giao.",
        ],
      },
      {
        heading: "Mỗi khoản chi phí trả cho việc gì?",
        table: {
          head: ["Khoản", "Trả khi nào", "Ghi chú"],
          rows: [
            ["Thiết kế & nội dung", "Một lần khi bắt đầu", "Gồm bố cục, viết nội dung, số phương án thiết kế"],
            ["Tên miền", "Hằng năm", "Hỏi rõ tên miền đăng ký dưới tên ai"],
            ["Hosting & SSL", "Hằng tháng/năm", "Ảnh hưởng tốc độ và độ ổn định"],
            ["Chỉnh sửa, cập nhật", "Mỗi lần hoặc theo gói", "Số lượt miễn phí và thời gian xử lý"],
            ["Bảo trì, sao lưu", "Định kỳ", "Thường bị bỏ quên khi trả một lần"],
          ],
        },
      },
      {
        heading: "Nextchain.site tính phí landing page thế nào?",
        paragraphs: [
          `Nextchain.site bán landing page theo gói tháng từ ${STARTING_PRICE}, không phí khởi tạo. Phí tháng đã gồm thiết kế, soạn nội dung, hosting, SSL, bảo trì và số lượt chỉnh sửa theo gói. Về tên miền, bạn dùng miễn phí địa chỉ ${FREE_SUBDOMAIN_EXAMPLE} hoặc tự mua tên miền riêng để Nextchain kết nối. Gói Khởi đầu ${formatVnd(PLANS[0].monthlyPrice)}/tháng phù hợp một landing page; gói Tăng trưởng ${formatVnd(PLANS[1].monthlyPrice)}/tháng cho website đến 5 trang có blog.`,
        ],
      },
      {
        heading: "Vì sao cùng là landing page mà giá chênh lệch nhiều?",
        paragraphs: [
          "Một landing page dựng từ mẫu có sẵn và một landing page thiết kế riêng có khối lượng công việc rất khác nhau. Các yếu tố làm thay đổi giá: mức độ tùy biến giao diện, ai viết nội dung, số lượng hiệu ứng, số công cụ cần tích hợp và thời gian hỗ trợ sau bàn giao.",
          "Giá rẻ không sai, nhưng hãy kiểm tra trang có tải nhanh trên điện thoại không, form có gửi thông báo về đúng nơi không, và bạn có quyền với tên miền hay không.",
        ],
      },
      {
        heading: "Trả một lần hay theo tháng?",
        paragraphs: [
          "Nếu landing page chỉ dùng cho một chiến dịch, trả một lần là đủ. Nếu trang là kênh nhận khách lâu dài và cần thay đổi nội dung thường xuyên (giá, khuyến mãi, hình ảnh), gói quản trị theo tháng giúp bạn không phải tự xử lý kỹ thuật.",
        ],
      },
      {
        heading: "Checklist trước khi chọn đơn vị làm landing page",
        bullets: [
          "Giá đã gồm tên miền, hosting, SSL chưa?",
          "Bao nhiêu lần chỉnh sửa miễn phí? Sau đó tính phí thế nào?",
          "Ai viết nội dung? Có cần bạn chuẩn bị sẵn không?",
          "Có gắn Google Analytics và đo sự kiện gửi form không?",
          "Tên miền đăng ký dưới tên ai?",
        ],
      },
    ],
    faqs: [
      {
        q: "Vì sao có đơn vị làm landing page rất rẻ?",
        a: "Thường do dùng mẫu có sẵn, không viết nội dung, ít lượt chỉnh sửa hoặc chưa tính tên miền, hosting và bảo trì. Hãy so sánh tổng chi phí trong 1–2 năm thay vì chỉ giá ban đầu.",
      },
      {
        q: "Giá landing page đã gồm chạy quảng cáo chưa?",
        a: "Chưa. Ngân sách quảng cáo trả cho Google hoặc Meta là khoản riêng.",
      },
    ],
    relatedLinks: [
      { href: "/dich-vu/thiet-ke-landing-page", label: "Dịch vụ thiết kế landing page" },
      { href: "/bang-gia", label: "Bảng giá tất cả dịch vụ" },
      { href: "/blog/landing-page-khac-website-doanh-nghiep", label: "Landing page khác website doanh nghiệp thế nào?" },
    ],
  },
  {
    slug: "landing-page-khac-website-doanh-nghiep",
    title: "Landing page khác website doanh nghiệp như thế nào? Nên chọn loại nào",
    metaTitle: "Landing page hay website doanh nghiệp?",
    description:
      "So sánh landing page và website doanh nghiệp về mục tiêu, số trang, SEO, chi phí và thời gian. Hướng dẫn chọn theo mục tiêu kinh doanh.",
    category: "So sánh",
    cover: coverCompare,
    publishedAt: "2026-10-13",
    author: AUTHOR,
    readingMinutes: 5,
    answer:
      "Landing page là một trang duy nhất phục vụ một mục tiêu cụ thể, thường là thu thông tin khách từ quảng cáo. Website doanh nghiệp gồm nhiều trang giới thiệu đầy đủ công ty, dịch vụ và tin tức, phù hợp để xây uy tín và nhận khách từ Google. Chạy quảng cáo cho một sản phẩm: chọn landing page; cần hiện diện lâu dài và SEO: chọn website.",
    keyTakeaways: [
      "Landing page tối ưu cho chuyển đổi; website tối ưu cho uy tín và SEO dài hạn.",
      "Nhiều doanh nghiệp dùng cả hai: website làm nền, landing page cho từng chiến dịch.",
      "Doanh nghiệp nhỏ mới bắt đầu có thể đi từ landing page rồi mở rộng thành website.",
    ],
    sections: [
      {
        heading: "Bảng so sánh landing page và website doanh nghiệp",
        table: {
          head: ["Tiêu chí", "Landing page", "Website doanh nghiệp"],
          rows: [
            ["Mục tiêu", "Một hành động: để lại thông tin, gọi điện, đăng ký", "Giới thiệu toàn diện, xây uy tín"],
            ["Số trang", "1 trang", "5–15+ trang"],
            ["Điều hướng", "Hạn chế menu để khách không rời trang", "Menu đầy đủ, nhiều trang con"],
            ["SEO", "Hạn chế, phù hợp vài từ khóa", "Tốt hơn: mỗi dịch vụ một trang"],
            ["Nội dung cần chuẩn bị", "Ít: một thông điệp, một ưu đãi", "Nhiều: từng dịch vụ, giới thiệu, bài viết"],
            ["Chi phí tại Nextchain", `Gói tháng từ ${STARTING_PRICE}, không phí khởi tạo`, "Theo dự án, từ 12.000.000đ"],
          ],
        },
      },
      {
        heading: "Khi nào nên chọn landing page?",
        bullets: [
          "Chạy quảng cáo Google/Facebook cho một sản phẩm, khóa học, sự kiện.",
          "Ra mắt dự án bất động sản, chương trình khuyến mãi có thời hạn.",
          "Cơ sở nhỏ mới mở, cần nhanh chóng có trang nhận khách.",
        ],
      },
      {
        heading: "Khi nào nên chọn website doanh nghiệp?",
        bullets: [
          "Khách hàng (đặc biệt là B2B) cần tìm hiểu kỹ trước khi liên hệ.",
          "Doanh nghiệp có nhiều dịch vụ, muốn khách tìm thấy từng dịch vụ trên Google.",
          "Cần đăng tin tức, tuyển dụng, dự án thường xuyên.",
        ],
      },
      {
        heading: "Có thể bắt đầu bằng landing page rồi nâng cấp không?",
        paragraphs: [
          "Có. Nhiều cơ sở dịch vụ bắt đầu với một landing page để có mặt trên Google, sau đó bổ sung trang riêng cho từng dịch vụ và blog khi nhu cầu tăng. Điều quan trọng là giữ nguyên tên miền để không mất những gì đã xây dựng.",
        ],
      },
    ],
    faqs: [
      {
        q: "Landing page có lên Google được không?",
        a: "Có, nhưng vì chỉ có một trang nên thường chỉ phù hợp với tên thương hiệu và một vài từ khóa chính.",
      },
      {
        q: "Website doanh nghiệp có thay thế landing page khi chạy quảng cáo không?",
        a: "Có thể dẫn quảng cáo về trang dịch vụ trên website, nhưng landing page riêng thường cho tỉ lệ chuyển đổi tốt hơn vì ít yếu tố gây phân tán.",
      },
    ],
    relatedLinks: [
      { href: "/dich-vu/thiet-ke-landing-page", label: "Thiết kế landing page" },
      { href: "/dich-vu/thiet-ke-website-doanh-nghiep", label: "Thiết kế website doanh nghiệp" },
      { href: "/blog/chi-phi-thiet-ke-landing-page", label: "Chi phí thiết kế landing page" },
    ],
  },
  {
    slug: "website-spa-can-nhung-gi",
    title: "Website spa cần những trang và tính năng gì? Checklist cho chủ spa",
    metaTitle: "Website spa cần những trang gì?",
    description:
      "Danh sách trang và tính năng một website spa nên có: bảng dịch vụ, trang từng liệu trình, gallery, đặt hẹn, blog. Kèm lỗi thường gặp cần tránh.",
    category: "Ngành Spa",
    cover: coverSpa,
    publishedAt: "2026-10-13",
    author: AUTHOR,
    readingMinutes: 6,
    answer:
      "Một website spa cần tối thiểu: trang chủ giới thiệu không gian và dịch vụ nổi bật, bảng dịch vụ có giá, trang riêng cho từng liệu trình chính, gallery ảnh thật và nút đặt hẹn qua form hoặc Zalo luôn hiển thị trên điện thoại. Blog chăm sóc da là phần bổ sung giúp spa xuất hiện nhiều hơn trên Google.",
    keyTakeaways: [
      "Khách spa ra quyết định dựa trên ba điều: có dịch vụ mình cần, giá khoảng bao nhiêu, cơ sở trông thế nào.",
      "Mỗi liệu trình chính nên có trang riêng để khách tìm đúng trên Google.",
      "Chỉ dùng ảnh thật của spa; ảnh trước/sau phải có sự đồng ý của khách.",
    ],
    sections: [
      {
        heading: "Các trang bắt buộc của website spa",
        table: {
          head: ["Trang", "Nội dung chính", "Mục đích"],
          rows: [
            ["Trang chủ", "Không gian, dịch vụ nổi bật, địa chỉ, nút đặt hẹn", "Ấn tượng đầu, dẫn khách đến đặt hẹn"],
            ["Bảng dịch vụ", "Liệu trình theo nhóm, thời lượng, giá", "Trả lời câu hỏi “bao nhiêu tiền?”"],
            ["Trang từng dịch vụ", "Quy trình, lợi ích, lưu ý, giá", "SEO theo từng dịch vụ"],
            ["Gallery", "Ảnh phòng trị liệu, đội ngũ, sản phẩm", "Tạo niềm tin"],
            ["Liên hệ / Đặt hẹn", "Form, Zalo, bản đồ, giờ mở cửa", "Chuyển đổi"],
          ],
        },
      },
      {
        heading: "Tính năng nên có",
        bullets: [
          "Nút gọi và Zalo cố định ở góc màn hình điện thoại.",
          "Form đặt hẹn ngắn: tên, số điện thoại, dịch vụ, thời gian mong muốn.",
          "Bản đồ Google Maps và giờ mở cửa rõ ràng.",
          "Tốc độ tải nhanh — ảnh được nén, không dùng video nặng ở đầu trang.",
          "Thông tin khuyến mãi dễ thay đổi theo tháng.",
        ],
      },
      {
        heading: "Lỗi thường gặp trên website spa",
        bullets: [
          "Chỉ đăng ảnh mạng, không có ảnh thật của cơ sở.",
          "Bảng giá đã cũ, khác giá thực tế khiến khách mất niềm tin.",
          "Tất cả dịch vụ dồn vào một trang dài, khó đọc và khó lên Google.",
          "Không ghi rõ địa chỉ, khách phải nhắn tin hỏi.",
        ],
      },
      {
        heading: "Spa nhỏ có cần website khi đã có Facebook và Zalo?",
        paragraphs: [
          "Facebook và Zalo tốt cho việc chăm sóc khách quen, nhưng bài đăng trôi nhanh và khó xuất hiện khi khách mới tìm “spa chăm sóc da gần đây” trên Google. Website là nơi tập trung thông tin cố định — dịch vụ, giá, địa chỉ — và là đích đến cho mọi kênh khác.",
        ],
      },
    ],
    faqs: [
      {
        q: "Website spa có cần chức năng đặt lịch tự động không?",
        a: "Với spa nhỏ, form yêu cầu hẹn kèm Zalo thường đủ dùng vì chủ spa vẫn cần xác nhận khung giờ. Đặt lịch tự động phù hợp khi có nhiều kỹ thuật viên và lịch dày.",
      },
      {
        q: "Có nên ghi giá dịch vụ trên website không?",
        a: "Nên ghi giá hoặc khoảng giá. Khách biết trước chi phí sẽ liên hệ với ý định rõ ràng hơn, giảm số tin nhắn chỉ hỏi giá.",
      },
    ],
    relatedLinks: [
      { href: "/giai-phap/website-spa", label: "Giải pháp website cho spa" },
      { href: "/mau-website/spa", label: "Mẫu website spa" },
      { href: "/bang-gia", label: "Bảng giá" },
    ],
  },
  {
    slug: "lam-website-theo-goi-thang-hay-tra-mot-lan",
    title: "Làm website theo gói tháng hay trả tiền một lần: nên chọn cách nào?",
    metaTitle: "Gói tháng hay trả một lần khi làm website?",
    description:
      "So sánh hai cách làm website: trả một lần và thuê bao theo tháng. Ưu nhược điểm, chi phí ẩn và trường hợp phù hợp cho doanh nghiệp nhỏ.",
    category: "Chi phí",
    cover: coverMonthly,
    publishedAt: "2026-10-13",
    author: AUTHOR,
    readingMinutes: 5,
    answer:
      "Trả một lần phù hợp khi bạn có người tự quản trị website hoặc ít khi cần thay đổi nội dung. Gói theo tháng phù hợp với chủ cơ sở bận rộn, muốn có người lo thiết kế, cập nhật, bảo trì và hỗ trợ kỹ thuật liên tục với chi phí đầu vào thấp hơn.",
    keyTakeaways: [
      "Website trả một lần vẫn phát sinh chi phí hằng năm: tên miền, hosting, sửa lỗi, cập nhật.",
      "Gói tháng chuyển chi phí lớn ban đầu thành khoản đều đặn, kèm dịch vụ cập nhật.",
      "Dù chọn cách nào, hãy hỏi rõ quyền sở hữu tên miền và nội dung khi ngừng hợp tác.",
    ],
    sections: [
      {
        heading: "So sánh nhanh",
        table: {
          head: ["Tiêu chí", "Trả một lần", "Gói theo tháng"],
          rows: [
            ["Chi phí ban đầu", "Cao hơn", "Thấp (chỉ phí tháng đầu tiên)"],
            ["Cập nhật nội dung", "Tự làm hoặc trả phí từng lần", "Bao gồm theo phạm vi gói"],
            ["Bảo trì, sao lưu", "Tự lo hoặc thuê thêm", "Bao gồm"],
            ["Phù hợp", "Có nhân sự kỹ thuật, ít thay đổi", "Chủ cơ sở bận, cần thay đổi thường xuyên"],
          ],
        },
      },
      {
        heading: "Chi phí ẩn của website trả một lần",
        bullets: [
          "Gia hạn tên miền và hosting hằng năm.",
          "Sửa lỗi khi plugin, trình duyệt cập nhật.",
          "Thay đổi giá, dịch vụ, hình ảnh khi không tự làm được.",
          "Website cũ dần nhưng không ai cập nhật nội dung.",
        ],
      },
      {
        heading: "Câu hỏi cần hỏi trước khi đăng ký gói tháng",
        bullets: [
          "Mỗi tháng được bao nhiêu lượt cập nhật? Thời gian xử lý?",
          "Có phí khởi tạo không? Cam kết tối thiểu bao lâu?",
          "Hủy cần báo trước bao lâu? Nội dung và tên miền xử lý thế nào?",
          "Phần việc ngoài gói được báo giá trước không?",
        ],
      },
    ],
    faqs: [
      {
        q: "Gói tháng có đắt hơn về lâu dài không?",
        a: "Tùy cách so sánh. Nếu tính cả hosting, bảo trì và công cập nhật nội dung của website trả một lần, khoảng chênh thường nhỏ hơn bạn nghĩ. Hãy so sánh tổng chi phí trong 2–3 năm.",
      },
      {
        q: "Nextchain.site áp dụng hình thức nào?",
        a: `Landing page và website kinh doanh nhỏ: gói tháng từ ${STARTING_PRICE}, không phí khởi tạo, gồm cập nhật và bảo trì. Website doanh nghiệp, bán hàng và phần mềm: trả theo dự án, xem Bảng giá.`,
      },
    ],
    relatedLinks: [
      { href: "/bang-gia", label: "Bảng giá dịch vụ và gói tháng" },
      { href: "/dich-vu/quan-tri-website-theo-thang", label: "Quản trị website theo tháng" },
      { href: "/chinh-sach-huy-dich-vu", label: "Chính sách hủy dịch vụ" },
    ],
  },
  {
    slug: "website-hay-facebook-cho-kinh-doanh-nho",
    title: "Đã có Fanpage Facebook, kinh doanh nhỏ có cần website không?",
    metaTitle: "Đã có Fanpage, có cần website không?",
    description:
      "So sánh Fanpage Facebook và website cho spa, salon, quán cà phê, homestay: khách tìm thấy bạn ở đâu, ai sở hữu dữ liệu, chi phí và khi nào nên làm website.",
    category: "So sánh",
    cover: coverFacebook,
    publishedAt: "2026-10-15",
    author: AUTHOR,
    readingMinutes: 5,
    answer:
      "Fanpage giúp giữ liên lạc với khách quen; website giúp khách mới tìm thấy bạn trên Google và tin tưởng trước khi liên hệ. Nếu khách của bạn thường tìm “spa gần đây”, “homestay Đà Lạt” hay xem bảng giá trước khi đến, nên có cả hai: website làm nơi thông tin chính thức, Fanpage để đăng bài và trò chuyện hằng ngày.",
    keyTakeaways: [
      "Fanpage và website không thay thế nhau — mỗi kênh giải quyết một việc khác.",
      "Bài đăng Fanpage trôi theo thời gian; website giữ bảng giá, dịch vụ, địa chỉ luôn ở chỗ dễ tìm.",
      "Website và tên miền là tài sản của bạn; Fanpage phụ thuộc chính sách của nền tảng.",
      `Chi phí website cho cơ sở nhỏ hiện có thể bắt đầu từ ${STARTING_PRICE}/tháng, không cần trả một khoản lớn ban đầu.`,
    ],
    sections: [
      {
        heading: "Fanpage và website khác nhau ở điểm nào?",
        table: {
          head: ["Tiêu chí", "Fanpage Facebook", "Website"],
          rows: [
            ["Khách mới tìm thấy bạn", "Chủ yếu qua bạn bè chia sẻ, quảng cáo", "Qua Google, Google Maps, link chia sẻ"],
            ["Thông tin dịch vụ, bảng giá", "Nằm trong bài đăng, dễ bị trôi", "Có trang riêng, luôn ở vị trí cố định"],
            ["Hình ảnh thương hiệu", "Giao diện giống mọi Fanpage khác", "Thiết kế riêng theo màu sắc, phong cách của bạn"],
            ["Quyền sở hữu", "Phụ thuộc chính sách và tài khoản Facebook", "Bạn sở hữu tên miền và nội dung"],
            ["Nhận yêu cầu", "Tin nhắn, bình luận", "Form, nút gọi, Zalo — gửi thẳng cho bạn"],
            ["Chi phí", "Miễn phí tạo, trả tiền nếu chạy quảng cáo", "Phí thiết kế hoặc gói tháng, tên miền, hosting"],
          ],
        },
      },
      {
        heading: "Khi nào chỉ cần Fanpage là đủ?",
        bullets: [
          "Bạn mới thử nghiệm sản phẩm, chưa có địa điểm hay bảng giá cố định.",
          "Gần như toàn bộ khách đến từ người quen giới thiệu và nhắn tin trực tiếp.",
          "Bạn chưa có thời gian trả lời yêu cầu từ kênh mới.",
        ],
      },
      {
        heading: "Khi nào nên có website?",
        bullets: [
          "Khách thường tìm trên Google trước khi chọn: spa, nha khoa, homestay, nhà hàng, trung tâm đào tạo.",
          "Bạn chạy quảng cáo Google và cần một trang đích rõ ràng để đo hiệu quả.",
          "Khách hỏi đi hỏi lại cùng một câu về giá, giờ mở cửa, địa chỉ.",
          "Bạn muốn trông chuyên nghiệp hơn khi làm việc với đối tác, khách doanh nghiệp.",
          "Bạn lo mất kênh liên lạc nếu tài khoản Fanpage gặp sự cố.",
        ],
      },
      {
        heading: "Dùng website và Fanpage cùng nhau thế nào?",
        paragraphs: [
          "Website là nơi đặt thông tin chính thức: dịch vụ, bảng giá, hình ảnh, địa chỉ, cách đặt lịch. Fanpage dùng để đăng bài mới, khuyến mãi và trò chuyện với khách.",
          "Trong mỗi bài Fanpage, dẫn link về trang dịch vụ hoặc bảng giá trên website. Trên website, gắn nút Zalo, Facebook và form để khách chọn cách liên hệ quen thuộc.",
        ],
      },
      {
        heading: "Website cho cơ sở nhỏ tốn bao nhiêu?",
        paragraphs: [
          `Có hai cách phổ biến: trả một lần cho thiết kế rồi tự lo hosting, cập nhật; hoặc trả theo tháng với dịch vụ trọn gói. Nextchain.site áp dụng gói tháng từ ${STARTING_PRICE}, không phí khởi tạo, có địa chỉ miễn phí dạng ${FREE_SUBDOMAIN_EXAMPLE} hoặc dùng tên miền riêng của bạn.`,
        ],
      },
    ],
    faqs: [
      {
        q: "Có website rồi có nên bỏ Fanpage không?",
        a: "Không nên. Fanpage vẫn là kênh tốt để giữ liên lạc với khách quen và đăng nội dung hằng ngày. Website bổ sung phần khách mới tìm kiếm và thông tin chính thức.",
      },
      {
        q: "Website có giúp tôi lên Google Maps không?",
        a: "Google Maps hiển thị theo Hồ sơ doanh nghiệp trên Google (Google Business Profile). Gắn link website vào hồ sơ này giúp khách xem thêm thông tin và liên hệ dễ hơn.",
      },
      {
        q: "Tôi không rành công nghệ, có tự quản lý website được không?",
        a: "Với gói tháng của Nextchain, bạn chỉ cần gửi nội dung muốn thay đổi; đội ngũ Nextchain cập nhật theo số lượt của gói.",
      },
    ],
    relatedLinks: [
      { href: "/giai-phap", label: "Website theo ngành" },
      { href: "/bang-gia", label: "Bảng giá gói tháng" },
      { href: "/so-sanh/tu-lam-hay-thue-tron-goi", label: "Tự làm hay thuê trọn gói?" },
    ],
  },
  {
    slug: "website-nha-hang-khach-can-thay-gi",
    title: "Website nhà hàng: khách cần thấy gì ngay khi mở trang?",
    metaTitle: "Website nhà hàng cần có gì? Checklist",
    description:
      "Khách mở website nhà hàng trên điện thoại cần thấy ngay món, giá, địa chỉ và cách đặt bàn. Checklist sắp xếp màn hình đầu, thực đơn, đặt bàn và chi nhánh.",
    category: "Ngành Nhà hàng",
    cover: coverRestaurant,
    publishedAt: "2026-10-16",
    author: AUTHOR,
    readingMinutes: 6,
    answer:
      "Khi mở website nhà hàng, khách cần trả lời được bốn câu hỏi mà không phải cuộn nhiều: quán bán món gì, giá khoảng bao nhiêu, quán ở đâu và mở cửa lúc nào, đặt bàn bằng cách nào. Đặt bốn thông tin này ở màn hình đầu trên điện thoại, các phần còn lại như câu chuyện thương hiệu hay tiệc sự kiện để phía dưới.",
    keyTakeaways: [
      "Màn hình đầu trên điện thoại quan trọng nhất: món đặc trưng, khoảng giá, địa chỉ, giờ mở cửa và nút đặt bàn.",
      "Thực đơn phải là chữ đọc được, có giá — không chỉ là ảnh chụp tờ menu.",
      "Form đặt bàn nên hỏi ít: ngày, giờ, số khách, số điện thoại. Ghi rõ quán sẽ gọi hoặc nhắn Zalo để xác nhận.",
      "Thông tin trên website phải khớp với Google Maps và Fanpage, nhất là giờ mở cửa và số điện thoại.",
    ],
    sections: [
      {
        heading: "Khách vào website nhà hàng để làm gì?",
        paragraphs: [
          "Phần lớn khách mở website nhà hàng khi đã biết tên quán: thấy trên Google Maps, được bạn giới thiệu hoặc xem một bài đăng. Họ không cần đọc giới thiệu dài; họ đang kiểm tra nhanh xem quán có hợp với bữa ăn sắp tới không.",
          "Vì vậy, website nhà hàng hiệu quả là website giúp khách quyết định nhanh và liên hệ dễ, chứ không phải website có nhiều hiệu ứng nhất.",
        ],
      },
      {
        heading: "Màn hình đầu tiên trên điện thoại nên có gì?",
        bullets: [
          "Ảnh món đặc trưng hoặc không gian thật của quán — không dùng ảnh mẫu trên mạng.",
          "Một dòng mô tả quán bán gì: “Lẩu nấm và nướng than hoa”, “Cơm nhà kiểu Bắc”…",
          "Khoảng giá tham khảo, ví dụ “150.000đ – 300.000đ/người”.",
          "Địa chỉ ngắn và giờ mở cửa hôm nay.",
          "Nút “Đặt bàn” và nút gọi hoặc Zalo luôn nhìn thấy, kể cả khi cuộn trang.",
        ],
      },
      {
        heading: "Thực đơn nên trình bày thế nào?",
        table: {
          head: ["Nên làm", "Nên tránh"],
          rows: [
            ["Chia nhóm: khai vị, món chính, lẩu, đồ uống…", "Một danh sách dài không phân nhóm"],
            ["Thực đơn dạng chữ, có giá từng món", "Chỉ đăng ảnh chụp tờ menu (khó đọc, không phóng to được)"],
            ["Ghi khẩu phần hoặc số người ăn với món lớn", "Để khách đoán món đủ cho mấy người"],
            ["Ảnh thật cho món bán chạy", "Ảnh mạng không giống món thật"],
            ["Ghi rõ ngày cập nhật giá", "Giá cũ không ai sửa sau khi tăng giá"],
          ],
        },
      },
      {
        heading: "Đặt bàn: form, gọi điện hay Zalo?",
        paragraphs: [
          "Với đa số nhà hàng nhỏ và vừa, không cần hệ thống đặt bàn tự động. Một form ngắn gửi về Zalo hoặc email của quán, kèm nút gọi điện, là đủ để quán chủ động xác nhận và sắp xếp chỗ.",
        ],
        bullets: [
          "Form chỉ hỏi: ngày, giờ, số khách, họ tên, số điện thoại, ghi chú (sinh nhật, ghế trẻ em…).",
          "Ghi rõ sau khi gửi: “Quán sẽ gọi hoặc nhắn Zalo xác nhận trong 30 phút” — và làm đúng như vậy.",
          "Đặt tiệc, đặt nhóm đông nên có mục riêng với set menu và sức chứa từng khu.",
          "Nếu cần quản lý bàn trống hay đặt cọc online, đó là phần mềm riêng — nên tách khỏi website giới thiệu.",
        ],
      },
      {
        heading: "Nhiều chi nhánh thì sắp xếp ra sao?",
        bullets: [
          "Mỗi chi nhánh một mục hoặc một trang: địa chỉ, giờ mở cửa, số điện thoại, nút chỉ đường.",
          "Nút đặt bàn hỏi rõ khách chọn chi nhánh nào.",
          "Nếu thực đơn hoặc giá khác nhau giữa các chi nhánh, ghi chú rõ để tránh khách hiểu nhầm.",
        ],
      },
      {
        heading: "Checklist trước khi đưa website nhà hàng lên mạng",
        bullets: [
          "Mở website trên điện thoại: thấy món, giá, địa chỉ, giờ mở cửa và nút đặt bàn mà không cần cuộn nhiều.",
          "Bấm thử nút gọi, nút Zalo, nút chỉ đường — tất cả mở đúng.",
          "Gửi thử form đặt bàn và kiểm tra người phụ trách nhận được.",
          "Giờ mở cửa, số điện thoại, địa chỉ khớp với Google Maps và Fanpage.",
          "Giá trong thực đơn là giá hiện tại.",
          "Có người chịu trách nhiệm cập nhật khi đổi món, đổi giá, nghỉ lễ.",
        ],
      },
      {
        heading: "Làm website nhà hàng tốn bao nhiêu?",
        paragraphs: [
          `Website giới thiệu nhà hàng với thực đơn, đặt bàn và chi nhánh không cần là dự án lớn. Nextchain.site làm theo gói tháng từ ${STARTING_PRICE}, không phí khởi tạo, gồm thiết kế, hosting và cập nhật thực đơn theo số lượt của gói. Bạn dùng miễn phí địa chỉ dạng ${FREE_SUBDOMAIN_EXAMPLE} hoặc kết nối tên miền riêng.`,
        ],
      },
    ],
    faqs: [
      {
        q: "Nhà hàng đã có Google Maps và Fanpage thì còn cần website không?",
        a: "Google Maps giúp khách tìm thấy quán, Fanpage giúp trò chuyện và đăng món mới. Website là nơi đặt thực đơn, giá, chi nhánh và đặt bàn ở dạng dễ đọc, và là đường link bạn gắn vào Google Maps để khách xem thêm.",
      },
      {
        q: "Có nên đăng ảnh chụp tờ menu lên website không?",
        a: "Có thể thêm, nhưng không nên chỉ có ảnh. Thực đơn dạng chữ dễ đọc trên điện thoại, phóng to được và cập nhật giá nhanh hơn.",
      },
      {
        q: "Website có nhận đặt cọc hoặc thanh toán online được không?",
        a: "Website giới thiệu thường chỉ nhận yêu cầu đặt bàn để quán xác nhận. Đặt cọc, thanh toán hay quản lý bàn trống cần hệ thống riêng và được báo giá theo dự án.",
      },
    ],
    relatedLinks: [
      { href: "/giai-phap/website-nha-hang", label: "Giải pháp website nhà hàng" },
      { href: "/mau-website/nha-hang", label: "Mẫu website nhà hàng" },
      { href: "/bang-gia", label: "Bảng giá gói tháng" },
    ],
  },
  {
    slug: "website-homestay-7-thong-tin-khach-can",
    title: "7 thông tin khách cần xem trước khi hỏi phòng homestay",
    metaTitle: "Website homestay cần có gì? 7 thông tin",
    description:
      "Khách hỏi phòng homestay cần biết giá theo đêm, sức chứa, ảnh thật, vị trí, tiện ích, chính sách và cách đặt. Checklist website homestay nhận khách trực tiếp.",
    category: "Ngành Homestay",
    cover: coverHomestay,
    publishedAt: "2026-10-16",
    author: AUTHOR,
    readingMinutes: 6,
    answer:
      "Trước khi nhắn hỏi phòng, khách muốn biết 7 điều: giá theo đêm, phòng ở được mấy người, ảnh thật từng phòng, vị trí và cách đi, tiện ích, chính sách nhận/trả phòng – cọc – hủy, và cách đặt. Website homestay trình bày đủ 7 điều này sẽ giảm tin nhắn hỏi đi hỏi lại và giúp bạn nhận khách đặt trực tiếp, bổ trợ cho các nền tảng đặt phòng.",
    keyTakeaways: [
      "Ghi giá theo đêm cho ngày thường và cuối tuần, kèm ghi chú phụ thu lễ Tết.",
      "Mỗi loại phòng cần sức chứa, loại giường và ảnh thật riêng.",
      "Chính sách cọc và hủy phải ghi rõ trước khi khách chuyển khoản.",
      "Form hỏi phòng chỉ cần ngày đến, ngày đi, số khách và số điện thoại; trả lời qua Zalo nhanh nhất có thể.",
    ],
    sections: [
      {
        heading: "Vì sao homestay cần website khi đã có Booking, Airbnb?",
        paragraphs: [
          "Các nền tảng đặt phòng giúp khách mới tìm thấy bạn, nhưng mỗi đơn đều mất phí hoa hồng và bạn khó giữ liên lạc với khách cũ. Website là nơi khách quay lại, khách được giới thiệu và khách xem Fanpage có thể đặt trực tiếp với bạn.",
          "Website không thay thế nền tảng đặt phòng — nó bổ trợ, và chỉ hiệu quả khi trả lời đủ những câu khách vẫn thường nhắn hỏi.",
        ],
      },
      {
        heading: "7 thông tin khách cần thấy trước khi hỏi phòng",
        table: {
          head: ["Thông tin", "Nên trình bày thế nào"],
          rows: [
            ["1. Giá theo đêm", "Giá ngày thường, cuối tuần; ghi chú phụ thu lễ Tết và giá thêm người"],
            ["2. Sức chứa", "Số khách tối đa, loại giường, có kê thêm nệm được không"],
            ["3. Ảnh thật từng phòng", "Ảnh phòng ngủ, phòng tắm, view — chụp ban ngày, không dùng ảnh mạng"],
            ["4. Vị trí và cách đi", "Khoảng cách tới trung tâm, đường cho ô tô hay chỉ xe máy, nút chỉ đường"],
            ["5. Tiện ích", "Bếp, BBQ, chỗ đậu xe, nước nóng, máy sưởi hoặc điều hòa, wifi"],
            ["6. Chính sách", "Giờ nhận/trả phòng, mức cọc, điều kiện hủy, trẻ em, thú cưng"],
            ["7. Cách đặt", "Form ngày đến – ngày đi – số khách, kèm nút Zalo và gọi điện"],
          ],
        },
      },
      {
        heading: "Trang phòng nên sắp xếp thế nào?",
        bullets: [
          "Mỗi loại phòng một khối: tên phòng, ảnh, sức chứa, loại giường, giá theo đêm.",
          "Nút “Hỏi phòng này” ngay dưới từng loại phòng, tự điền sẵn tên phòng vào form.",
          "Nếu có nguyên căn cho nhóm, tách thành mục riêng với tổng sức chứa và giá nguyên căn.",
          "Ghi rõ giá đã gồm gì: bữa sáng, nước uống, đưa đón — tránh khách hiểu nhầm khi thanh toán.",
        ],
      },
      {
        heading: "Chính sách: viết rõ để tránh tranh cãi",
        paragraphs: [
          "Phần lớn hiểu lầm giữa chủ homestay và khách đến từ cọc và hủy phòng. Ghi chính sách bằng câu ngắn, cụ thể, và nhắc lại khi xác nhận đặt phòng qua Zalo.",
        ],
        bullets: [
          "Giờ nhận phòng và trả phòng; có nhận sớm/trả muộn không, phụ thu thế nào.",
          "Mức cọc giữ phòng và thời hạn chuyển cọc.",
          "Hủy trước bao lâu thì được hoàn cọc, hủy sát ngày thì xử lý ra sao.",
          "Quy định về trẻ em, thú cưng, hút thuốc, giờ yên tĩnh.",
        ],
      },
      {
        heading: "Hỏi phòng: form hay Zalo?",
        paragraphs: [
          "Nên có cả hai. Form giúp khách gửi đủ thông tin một lần (ngày đến, ngày đi, số khách); Zalo giúp trao đổi nhanh và gửi ảnh. Website homestay thường chỉ nhận yêu cầu để chủ nhà xác nhận phòng trống — nếu cần lịch phòng tự động hoặc thanh toán online, đó là hệ thống riêng.",
        ],
      },
      {
        heading: "Checklist trước khi đưa website homestay lên mạng",
        bullets: [
          "Mở trên điện thoại: thấy ngay ảnh đẹp nhất, giá từ bao nhiêu và nút hỏi phòng.",
          "Mỗi loại phòng có đủ ảnh, sức chứa, giá.",
          "Chính sách cọc và hủy nằm ở chỗ dễ thấy, không chỉ trong chân trang.",
          "Gửi thử form hỏi phòng và kiểm tra Zalo/email nhận được.",
          "Địa chỉ, số điện thoại khớp với Google Maps và các nền tảng đặt phòng.",
          "Có người cập nhật giá theo mùa và ngày lễ.",
        ],
      },
      {
        heading: "Làm website homestay tốn bao nhiêu?",
        paragraphs: [
          `Website homestay giới thiệu phòng, tiện ích, chính sách và nhận yêu cầu hỏi phòng không cần là dự án lớn. Nextchain.site làm theo gói tháng từ ${STARTING_PRICE}, không phí khởi tạo, gồm thiết kế, hosting và cập nhật giá, ảnh theo số lượt của gói. Bạn dùng miễn phí địa chỉ dạng ${FREE_SUBDOMAIN_EXAMPLE} hoặc kết nối tên miền riêng.`,
        ],
      },
    ],
    faqs: [
      {
        q: "Website homestay có tự động hiện phòng trống không?",
        a: "Website giới thiệu thường không quản lý phòng trống. Khách gửi yêu cầu theo ngày, chủ nhà kiểm tra và xác nhận qua Zalo hoặc điện thoại. Lịch phòng tự động hoặc kết nối nền tảng đặt phòng là phần mềm riêng, báo giá theo dự án.",
      },
      {
        q: "Có nên ghi giá công khai trên website không?",
        a: "Nên ghi giá tham khảo theo đêm cho ngày thường và cuối tuần. Khách thấy giá trước sẽ hỏi phòng đúng nhu cầu hơn; giá lễ Tết có thể ghi “liên hệ” kèm thời gian áp dụng.",
      },
      {
        q: "Homestay nhỏ chỉ 2–3 phòng có cần website không?",
        a: "Có thể chỉ cần một trang: ảnh, từng phòng kèm giá, chính sách và nút hỏi phòng. Gói landing page một trang phù hợp với quy mô này.",
      },
    ],
    relatedLinks: [
      { href: "/giai-phap/website-homestay", label: "Giải pháp website homestay" },
      { href: "/mau-website/homestay", label: "Mẫu website homestay" },
      { href: "/bang-gia", label: "Bảng giá gói tháng" },
    ],
  },
  {
    slug: "toi-uu-google-maps-cho-nha-hang-spa",
    title: "Tối ưu Google Maps cho nhà hàng, spa: 7 việc chủ cơ sở tự làm được",
    metaTitle: "Tối ưu Google Maps cho nhà hàng, spa",
    description:
      "7 việc giúp nhà hàng, spa, homestay hiện rõ hơn trên Google Maps: xác minh hồ sơ, chọn đúng danh mục, giờ mở cửa, ảnh thật, đánh giá, bài đăng và website.",
    category: "Marketing",
    cover: coverMonthly,
    publishedAt: "2026-10-16",
    author: AUTHOR,
    readingMinutes: 7,
    answer:
      "Khách tìm “nhà hàng gần đây” hay “spa Quận 1” thường chọn quán ngay trên Google Maps. Để hồ sơ hiện rõ và được chọn, chủ cơ sở cần: xác minh Hồ sơ doanh nghiệp trên Google, chọn đúng danh mục chính, giữ giờ mở cửa chính xác, đăng ảnh thật, nhờ khách đánh giá và trả lời đánh giá, cập nhật bài đăng, và gắn website có đủ thông tin. Phần lớn việc này miễn phí và tự làm được.",
    keyTakeaways: [
      "Thứ hạng trên Google Maps phụ thuộc vào mức độ liên quan, khoảng cách và độ nổi bật của cơ sở — không mua được vị trí tự nhiên.",
      "Tên trên hồ sơ phải đúng tên thật của cơ sở; nhồi từ khóa vào tên có thể khiến hồ sơ bị tạm ngưng.",
      "Không mua đánh giá hay tặng quà đổi đánh giá 5 sao — đây là hành vi Google cấm.",
      "Website có thực đơn, bảng giá, giờ mở cửa khớp với hồ sơ giúp khách quyết định nhanh hơn sau khi thấy bạn trên bản đồ.",
    ],
    sections: [
      {
        heading: "Google Maps xếp hạng cơ sở địa phương thế nào?",
        paragraphs: [
          "Theo hướng dẫn công khai của Google, kết quả địa phương dựa chủ yếu vào ba yếu tố: mức độ liên quan (hồ sơ có khớp với điều khách tìm không), khoảng cách (cơ sở cách người tìm bao xa) và độ nổi bật (cơ sở được biết đến thế nào, gồm số lượng và chất lượng đánh giá, thông tin trên web).",
          "Bạn không thay đổi được khoảng cách, nhưng làm được nhiều việc cho hai yếu tố còn lại. Bảy việc dưới đây đi theo đúng thứ tự nên làm.",
        ],
      },
      {
        heading: "1. Tạo và xác minh Hồ sơ doanh nghiệp trên Google",
        bullets: [
          "Vào business.google.com, tìm tên cơ sở — nếu đã có hồ sơ do người khác tạo, chọn yêu cầu quyền sở hữu thay vì tạo hồ sơ mới.",
          "Hoàn tất bước xác minh theo cách Google đưa ra (video, điện thoại, email hoặc thư). Hồ sơ chưa xác minh bị hạn chế chỉnh sửa và hiển thị.",
          "Dùng email công ty và thêm ít nhất một người quản lý dự phòng để không mất quyền truy cập.",
        ],
      },
      {
        heading: "2. Điền đúng tên, danh mục và thông tin cơ bản",
        table: {
          head: ["Mục", "Nên làm", "Tránh"],
          rows: [
            ["Tên", "Đúng tên trên biển hiệu", "“Nhà hàng Hải Âu – Hải sản ngon rẻ nhất Q1”"],
            ["Danh mục chính", "Danh mục sát nhất: “Nhà hàng hải sản”, “Spa chăm sóc da”", "Danh mục chung chung hoặc sai ngành"],
            ["Danh mục phụ", "Thêm vài danh mục đúng thực tế", "Thêm danh mục không phục vụ"],
            ["Địa chỉ, SĐT", "Giống hệt website, Fanpage, biển hiệu", "Mỗi nơi ghi một kiểu"],
            ["Mô tả", "Cơ sở phục vụ gì, cho ai, điểm khác biệt", "Lặp từ khóa, chèn link, khuyến mãi"],
          ],
        },
      },
      {
        heading: "3. Giữ giờ mở cửa luôn chính xác",
        bullets: [
          "Cập nhật giờ mở cửa thường ngày và giờ đặc biệt cho lễ, Tết trước vài ngày.",
          "Khách đến nơi thấy đóng cửa trong khi Maps ghi đang mở là trải nghiệm tệ và dễ dẫn đến đánh giá xấu.",
          "Nếu nghỉ tạm thời, dùng trạng thái tạm đóng cửa thay vì xóa hồ sơ.",
        ],
      },
      {
        heading: "4. Đăng ảnh thật và cập nhật thường xuyên",
        bullets: [
          "Ảnh mặt tiền giúp khách nhận ra quán khi đến nơi.",
          "Ảnh không gian, món ăn hoặc dịch vụ thật, chụp đủ sáng — không dùng ảnh mạng.",
          "Nhà hàng: thêm thực đơn hoặc ảnh món; spa: ảnh phòng dịch vụ; homestay: ảnh từng phòng.",
          "Bổ sung ảnh mới định kỳ, nhất là khi đổi món, đổi không gian.",
        ],
      },
      {
        heading: "5. Xin đánh giá đúng cách và trả lời mọi đánh giá",
        paragraphs: [
          "Đánh giá là phần khách đọc nhiều nhất trước khi chọn quán. Hãy chủ động xin đánh giá từ khách thật bằng đường link đánh giá của hồ sơ (lấy trong trang quản lý hồ sơ), ví dụ in mã QR tại quầy hoặc gửi kèm tin nhắn cảm ơn.",
        ],
        bullets: [
          "Không mua đánh giá, không nhờ người quen viết đánh giá giả, không tặng quà để đổi đánh giá tốt.",
          "Trả lời cả đánh giá tốt lẫn xấu, lịch sự và cụ thể. Với đánh giá xấu: xin lỗi, nêu cách khắc phục, mời liên hệ trực tiếp.",
          "Không tranh cãi hay để lộ thông tin cá nhân của khách trong phần trả lời.",
        ],
      },
      {
        heading: "6. Dùng bài đăng và thông tin sản phẩm, dịch vụ",
        bullets: [
          "Đăng bài cập nhật: món mới, ưu đãi trong tháng, sự kiện — kèm ảnh và nút dẫn về website.",
          "Điền mục sản phẩm/dịch vụ hoặc thực đơn với giá tham khảo nếu hồ sơ hỗ trợ.",
          "Chọn các thuộc tính đúng thực tế: có chỗ đậu xe, có wifi, nhận thanh toán thẻ…",
        ],
      },
      {
        heading: "7. Gắn website có đủ thông tin và khớp với hồ sơ",
        paragraphs: [
          "Nhiều khách bấm vào website từ hồ sơ Google Maps để xem kỹ thực đơn, bảng giá hoặc phòng trước khi gọi. Website cần trả lời ngay những điều đó trên điện thoại và có nút gọi, Zalo, đặt bàn hoặc đặt hẹn.",
          "Tên, địa chỉ, số điện thoại và giờ mở cửa trên website phải giống hồ sơ Google. Thông tin nhất quán giữa các nơi giúp cả khách lẫn Google tin rằng đó là cùng một cơ sở.",
        ],
      },
      {
        heading: "Checklist hằng tháng cho chủ cơ sở",
        bullets: [
          "Giờ mở cửa và giờ lễ đã đúng chưa?",
          "Đã trả lời hết đánh giá mới chưa?",
          "Có ít nhất vài ảnh mới và một bài đăng trong tháng?",
          "Thực đơn, bảng giá trên hồ sơ và website có khớp nhau?",
          "Đường link website trên hồ sơ còn hoạt động?",
        ],
      },
      {
        heading: "Khi nào nên nhờ đơn vị làm thay?",
        paragraphs: [
          `Nếu bạn không có thời gian cập nhật đều đặn, Nextchain có dịch vụ Marketing & SEO gồm tối ưu Hồ sơ doanh nghiệp trên Google, nội dung và báo cáo định kỳ. Với cơ sở chưa có website, gói tháng từ ${STARTING_PRICE} giúp bạn có trang thực đơn, bảng giá và đặt bàn để gắn vào Google Maps. Nextchain không cam kết thứ hạng cụ thể — thứ hạng do Google quyết định.`,
        ],
      },
    ],
    faqs: [
      {
        q: "Có trả tiền để lên top Google Maps được không?",
        a: "Không mua được vị trí tự nhiên. Bạn có thể chạy quảng cáo Google để hiện ở vị trí quảng cáo, nhưng thứ hạng tự nhiên phụ thuộc vào mức độ liên quan, khoảng cách và độ nổi bật của cơ sở.",
      },
      {
        q: "Đặt từ khóa vào tên quán trên Google Maps có giúp lên hạng không?",
        a: "Không nên. Hướng dẫn của Google yêu cầu tên phản ánh đúng tên thật của cơ sở; thêm từ khóa có thể khiến hồ sơ bị chỉnh sửa hoặc tạm ngưng.",
      },
      {
        q: "Bao lâu thì thấy hồ sơ hiện tốt hơn?",
        a: "Không có mốc cố định. Thường cần vài tuần đến vài tháng cập nhật đều đặn và tích lũy đánh giá thật mới thấy thay đổi rõ.",
      },
    ],
    relatedLinks: [
      { href: "/dich-vu/marketing-seo", label: "Dịch vụ Marketing & SEO" },
      { href: "/giai-phap/website-nha-hang", label: "Website nhà hàng" },
      { href: "/giai-phap/website-spa", label: "Website spa" },
    ],
  },
]

export function getPost(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug)
}

export function sortedPosts() {
  return [...BLOG_POSTS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}
