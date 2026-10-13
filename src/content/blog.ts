import type { Faq } from "@/content/faqs"
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
  description: string
  category: string
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
    description:
      "Giải thích các khoản chi phí khi làm landing page: thiết kế, nội dung, tên miền, hosting, chỉnh sửa và bảo trì. So sánh trả một lần và gói tháng, kèm checklist trước khi chọn đơn vị.",
    category: "Chi phí",
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
    description:
      "So sánh landing page và website doanh nghiệp về mục tiêu, số trang, SEO, chi phí và thời gian. Hướng dẫn chọn theo mục tiêu kinh doanh.",
    category: "So sánh",
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
    description:
      "Danh sách trang và tính năng một website spa nên có: bảng dịch vụ, trang từng liệu trình, gallery, đặt hẹn, blog. Kèm lỗi thường gặp cần tránh.",
    category: "Ngành Spa",
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
    description:
      "So sánh hai cách làm website: trả một lần và thuê bao theo tháng. Ưu nhược điểm, chi phí ẩn và trường hợp phù hợp cho doanh nghiệp nhỏ.",
    category: "Chi phí",
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
]

export function getPost(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug)
}

export function sortedPosts() {
  return [...BLOG_POSTS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}
