import type { StaticImageData } from "next/image"
import type { Faq } from "@/content/faqs"
import imageSpa from "@/assets/stock/spa.jpg"
import imageSalon from "@/assets/stock/salon.jpg"
import imageHomestay from "@/assets/stock/homestay.jpg"
import imageDental from "@/assets/stock/dental.jpg"
import imageRealEstate from "@/assets/project-4.png"
import imageEducation from "@/assets/project-3.png"

export interface Industry {
  slug: string
  name: string
  shortName: string
  audience: string
  image: StaticImageData
  imageAlt: string
  metaTitle: string
  metaDescription: string
  h1: string
  intro: string
  problems: { title: string; desc: string }[]
  pages: { title: string; desc: string }[]
  faqs: Faq[]
}

export const INDUSTRIES: Industry[] = [
  {
    slug: "website-spa",
    name: "Website Spa",
    shortName: "Spa",
    audience: "Spa, thẩm mỹ viện và cơ sở chăm sóc da",
    image: imageSpa,
    imageAlt: "Liệu trình chăm sóc da mặt tại spa",
    metaTitle: "Thiết Kế Website Spa Trọn Gói Theo Tháng",
    metaDescription:
      "Website spa có bảng dịch vụ, gallery, nhận yêu cầu hẹn qua form và Zalo. Nextchain thiết kế, xuất bản và cập nhật hằng tháng — chủ spa không cần tự làm.",
    h1: "Thiết kế website spa: bảng dịch vụ rõ ràng, khách đặt hẹn dễ dàng",
    intro:
      "Khách tìm spa thường muốn biết ba điều trước khi nhắn tin: có dịch vụ mình cần không, giá khoảng bao nhiêu và cơ sở trông thế nào. Website spa của Nextchain trả lời ba câu hỏi đó ngay trên màn hình điện thoại, rồi dẫn khách đến nút đặt hẹn.",
    problems: [
      {
        title: "Bảng giá nằm rải rác trong bài Facebook",
        desc: "Khách phải lướt nhiều bài hoặc nhắn hỏi từng dịch vụ. Website gom bảng giá vào một trang dễ xem và dễ cập nhật.",
      },
      {
        title: "Khách mới không tìm thấy spa trên Google",
        desc: "Fanpage khó xuất hiện khi khách tìm “spa chăm sóc da gần đây”. Mỗi dịch vụ chính có trang riêng giúp Google hiểu bạn làm gì.",
      },
      {
        title: "Không có thời gian tự làm website",
        desc: "Bạn gửi thông tin và ảnh, Nextchain thiết kế, viết nội dung, xuất bản và cập nhật khi bảng dịch vụ thay đổi.",
      },
    ],
    pages: [
      { title: "Trang chủ", desc: "Giới thiệu spa, dịch vụ nổi bật, ảnh không gian và nút đặt hẹn." },
      { title: "Bảng dịch vụ", desc: "Nhóm theo liệu trình: chăm sóc da, massage, gội đầu dưỡng sinh…" },
      { title: "Trang từng dịch vụ", desc: "Mô tả quy trình, thời lượng, mức giá đã duyệt và lưu ý trước khi làm." },
      { title: "Gallery", desc: "Ảnh không gian, phòng trị liệu và đội ngũ do chính spa cung cấp." },
      { title: "Yêu cầu hẹn", desc: "Form ngắn và nút Zalo; thông báo gửi về chủ spa." },
      { title: "Blog chăm sóc da", desc: "Bài hướng dẫn do Nextchain soạn nháp, spa duyệt trước khi đăng (tùy gói)." },
    ],
    faqs: [
      {
        q: "Website spa có nhận đặt lịch tự động không?",
        a: "Website nhận yêu cầu hẹn qua form và Zalo, thông tin gửi về chủ spa để xác nhận. Lịch đặt tự động theo khung giờ cần tích hợp riêng — vui lòng liên hệ để kiểm tra.",
      },
      {
        q: "Tôi có phải tự viết mô tả dịch vụ không?",
        a: "Không. Bạn gửi tên dịch vụ, giá và vài ghi chú, Nextchain soạn mô tả. Bạn duyệt trước khi xuất bản.",
      },
      {
        q: "Có được đăng ảnh trước/sau điều trị không?",
        a: "Chỉ đăng ảnh do spa cung cấp và có sự đồng ý của khách hàng trong ảnh. Nextchain không dùng ảnh mạng để làm ảnh kết quả.",
      },
    ],
  },
  {
    slug: "website-salon",
    name: "Website Salon",
    shortName: "Salon",
    audience: "Salon tóc, tiệm nail, barber shop",
    image: imageSalon,
    imageAlt: "Không gian salon tóc hiện đại",
    metaTitle: "Thiết Kế Website Salon Tóc, Nail Theo Gói Tháng",
    metaDescription:
      "Website cho salon tóc, nail, barber: portfolio kiểu tóc/mẫu nail, bảng giá, nhận yêu cầu đặt lịch. Nextchain thiết kế và quản lý theo gói tháng.",
    h1: "Website salon: khoe tác phẩm, báo giá rõ, khách đặt lịch nhanh",
    intro:
      "Khách chọn salon chủ yếu qua hình ảnh tác phẩm. Website salon của Nextchain đặt portfolio lên đầu, đi kèm bảng giá theo nhóm dịch vụ để khách biết trước chi phí trước khi đến.",
    problems: [
      {
        title: "Tác phẩm đẹp bị trôi trên mạng xã hội",
        desc: "Portfolio trên website được phân loại theo kiểu tóc, màu, mẫu nail — khách tìm lại dễ dàng.",
      },
      {
        title: "Khách hỏi giá liên tục qua tin nhắn",
        desc: "Bảng giá công khai theo nhóm dịch vụ giúp lọc khách và tiết kiệm thời gian trả lời.",
      },
      {
        title: "Bán sản phẩm chăm sóc tóc nhưng chưa có nơi giới thiệu",
        desc: "Gói Chuyên nghiệp có trang danh mục sản phẩm với ảnh, mô tả, giá và nút liên hệ đặt mua.",
      },
    ],
    pages: [
      { title: "Trang chủ", desc: "Phong cách salon, tác phẩm nổi bật, địa chỉ và giờ mở cửa." },
      { title: "Portfolio", desc: "Gallery tác phẩm phân loại theo dịch vụ." },
      { title: "Bảng giá", desc: "Cắt, nhuộm, uốn, nail, gội… theo nhóm, có ghi chú phụ phí." },
      { title: "Đội ngũ", desc: "Giới thiệu thợ chính và chuyên môn (tùy chọn)." },
      { title: "Đặt lịch", desc: "Form yêu cầu hẹn, nút gọi và Zalo." },
      { title: "Sản phẩm", desc: "Danh mục sản phẩm salon đang bán (gói Chuyên nghiệp)." },
    ],
    faqs: [
      {
        q: "Salon có nhiều chi nhánh thì sao?",
        a: "Mỗi chi nhánh có thể có trang riêng với địa chỉ, giờ mở cửa và bản đồ. Phạm vi phụ thuộc gói đã chọn.",
      },
      {
        q: "Tôi muốn cập nhật ảnh tác phẩm mới thường xuyên?",
        a: "Gửi ảnh cho Nextchain, đội ngũ sẽ đăng vào portfolio theo số lượt cập nhật của gói.",
      },
      {
        q: "Website có bán hàng online được không?",
        a: "Trang sản phẩm hiện hỗ trợ giới thiệu và nhận yêu cầu đặt mua. Giỏ hàng và thanh toán online cần trao đổi riêng trước khi cam kết.",
      },
    ],
  },
  {
    slug: "website-homestay",
    name: "Website Homestay",
    shortName: "Homestay",
    audience: "Homestay, villa, nhà nghỉ và căn hộ dịch vụ",
    image: imageHomestay,
    imageAlt: "Homestay gỗ giữa rừng thông và núi",
    metaTitle: "Thiết Kế Website Homestay, Villa Theo Gói Tháng",
    metaDescription:
      "Website homestay giới thiệu phòng, tiện ích, chính sách và nhận yêu cầu hỏi phòng trực tiếp. Bổ trợ cho Booking, Airbnb — Nextchain thiết kế và quản lý.",
    h1: "Website homestay: giới thiệu phòng đầy đủ, nhận khách đặt trực tiếp",
    intro:
      "Booking.com và Airbnb giúp khách tìm thấy bạn, nhưng mỗi lượt đặt đều mất phí hoa hồng và bạn khó giữ liên hệ với khách cũ. Website riêng là nơi khách quay lại hỏi phòng trực tiếp và tìm hiểu kỹ hơn về chỗ ở.",
    problems: [
      {
        title: "Phụ thuộc hoàn toàn vào nền tảng đặt phòng",
        desc: "Website riêng là kênh cho khách quen, khách được giới thiệu và khách tìm theo tên homestay.",
      },
      {
        title: "Thông tin phòng thiếu nhất quán",
        desc: "Mỗi loại phòng có trang riêng với ảnh, sức chứa, tiện ích và chính sách — cập nhật tại một nơi.",
      },
      {
        title: "Khách muốn biết khu vực xung quanh",
        desc: "Bài viết về điểm tham quan, quán ăn gần homestay giúp khách lên kế hoạch và tăng lý do chọn bạn.",
      },
    ],
    pages: [
      { title: "Trang chủ", desc: "Không gian, vị trí, điểm nổi bật và nút hỏi phòng." },
      { title: "Danh sách phòng", desc: "Từng loại phòng với ảnh, sức chứa, tiện ích và giá tham khảo." },
      { title: "Tiện ích & chính sách", desc: "Giờ nhận/trả phòng, đặt cọc, hủy phòng, thú cưng…" },
      { title: "Vị trí", desc: "Bản đồ, hướng dẫn đường đi, khoảng cách đến điểm tham quan." },
      { title: "Hỏi phòng", desc: "Form ngày đến/đi, số khách và nút Zalo." },
      { title: "Cẩm nang du lịch", desc: "Bài viết về trải nghiệm quanh homestay (tùy gói)." },
    ],
    faqs: [
      {
        q: "Website homestay có thay thế Booking.com được không?",
        a: "Không nên xem là thay thế. Website là kênh trực tiếp bổ sung, phù hợp với khách quen và khách tìm theo tên homestay; các nền tảng vẫn giúp tiếp cận khách mới.",
      },
      {
        q: "Website có hiển thị phòng trống theo thời gian thực không?",
        a: "Hiện website nhận yêu cầu hỏi phòng để chủ homestay xác nhận. Đồng bộ lịch phòng với nền tảng khác cần trao đổi riêng.",
      },
      {
        q: "Tôi có thể nhận thanh toán đặt cọc qua website không?",
        a: "Website hiển thị hướng dẫn chuyển khoản đặt cọc theo chính sách của bạn. Cổng thanh toán online cần kiểm tra trước khi cam kết.",
      },
    ],
  },
  {
    slug: "website-nha-khoa",
    name: "Website Nha khoa",
    shortName: "Nha khoa",
    audience: "Phòng khám nha khoa và cơ sở chăm sóc răng miệng",
    image: imageDental,
    imageAlt: "Không gian điều trị tại phòng khám nha khoa minh họa",
    metaTitle: "Thiết Kế Website Nha Khoa Trọn Gói",
    metaDescription: "Website nha khoa có trang dịch vụ, thông tin bác sĩ và form yêu cầu lịch khám. Nextchain viết nội dung, thiết kế và vận hành theo phạm vi gói.",
    h1: "Website nha khoa: dịch vụ rõ ràng, khách dễ yêu cầu lịch khám",
    intro: "Người tìm phòng khám muốn hiểu bác sĩ, dịch vụ, chi phí tham khảo và cách liên hệ trước khi đặt lịch. Nextchain giúp sắp xếp các thông tin đó thành một trải nghiệm dễ đọc trên điện thoại; nội dung chuyên môn do phòng khám kiểm tra và duyệt.",
    problems: [
      { title: "Dịch vụ khó so sánh", desc: "Tách từng nhóm khám, điều trị và chăm sóc, kèm lưu ý về chỉ định và mức giá tham khảo đã duyệt." },
      { title: "Thiếu thông tin đội ngũ", desc: "Trang bác sĩ thể hiện bằng cấp và kinh nghiệm dựa trên hồ sơ phòng khám cung cấp." },
      { title: "Khách hỏi lịch qua nhiều kênh", desc: "Form nhận yêu cầu và nút gọi/Zalo dẫn về người phụ trách xác nhận; không giả lập lịch trống." },
    ],
    pages: [
      { title: "Dịch vụ", desc: "Trang riêng cho các nhóm dịch vụ phù hợp chuyên môn phòng khám." },
      { title: "Đội ngũ", desc: "Thông tin bác sĩ, chứng chỉ và ảnh được xác nhận." },
      { title: "Chi phí tham khảo", desc: "Mức giá và điều kiện áp dụng, tránh hứa kết quả điều trị." },
      { title: "Liên hệ đặt lịch", desc: "Form yêu cầu, số điện thoại, bản đồ và giờ hoạt động." },
    ],
    faqs: [
      { q: "Website có xác nhận lịch khám tự động không?", a: "Gói cơ bản nhận yêu cầu để phòng khám xác nhận. Lịch tự động và đồng bộ phần mềm cần khảo sát, báo giá riêng." },
      { q: "Ai duyệt nội dung chuyên môn?", a: "Phòng khám chịu trách nhiệm kiểm tra thông tin chuyên môn, chứng chỉ, giá và sự đồng ý sử dụng ảnh trước khi xuất bản." },
    ],
  },
  {
    slug: "landing-page-bat-dong-san",
    name: "Landing Page Bất động sản",
    shortName: "Bất động sản",
    audience: "Đơn vị phân phối và dự án bất động sản",
    image: imageRealEstate,
    imageAlt: "Bố cục minh họa landing page dự án căn hộ",
    metaTitle: "Thiết Kế Landing Page Bất Động Sản Trọn Gói",
    metaDescription: "Landing page dự án bất động sản có tổng quan, pháp lý, mặt bằng và form nhận tư vấn. Nội dung do chủ dự án xác nhận trước khi đăng.",
    h1: "Landing page bất động sản: thông tin dự án rõ, tư vấn đúng nhu cầu",
    intro: "Khách xem dự án cần hiểu vị trí, sản phẩm, tiến độ và điều kiện giao dịch trước khi để lại liên hệ. Landing page nên đưa thông tin có nguồn, cập nhật được và tạo đường liên hệ rõ ràng trên điện thoại.",
    problems: [
      { title: "Thông tin phân tán", desc: "Gom vị trí, mặt bằng, tiện ích và tiến độ từ tài liệu được phép công bố." },
      { title: "Form không đủ ngữ cảnh", desc: "Hỏi loại căn, ngân sách và thời điểm quan tâm nếu đội tư vấn có quy trình xử lý tương ứng." },
      { title: "Giá và pháp lý thay đổi", desc: "Thể hiện ngày cập nhật, nguồn thông tin và đầu mối duyệt; không hứa lợi nhuận hoặc pháp lý chưa xác nhận." },
    ],
    pages: [
      { title: "Tổng quan", desc: "Vị trí, loại hình và điểm khác biệt đã xác minh." },
      { title: "Sản phẩm", desc: "Mặt bằng, diện tích và giá tham khảo khi được phép công bố." },
      { title: "Pháp lý & tiến độ", desc: "Tài liệu và mốc thời gian có nguồn do chủ dự án cung cấp." },
      { title: "Nhận tư vấn", desc: "Form gọn, chính sách dữ liệu và chuyển thông tin tới người phụ trách." },
    ],
    faqs: [
      { q: "Có thể chạy quảng cáo ngay không?", a: "Cần kiểm tra nội dung, quyền dùng ảnh và chính sách nền tảng quảng cáo trước khi xuất bản. Ngân sách quảng cáo không nằm trong giá thiết kế." },
      { q: "Có tích hợp dữ liệu về CRM không?", a: "Có thể khảo sát luồng dữ liệu và tích hợp theo CRM bạn đang dùng; chi phí được báo trước." },
    ],
  },
  {
    slug: "landing-page-khoa-hoc",
    name: "Landing Page Khóa học",
    shortName: "Khóa học",
    audience: "Trung tâm đào tạo và đơn vị tuyển sinh",
    image: imageEducation,
    imageAlt: "Bố cục minh họa website tuyển sinh khóa học",
    metaTitle: "Thiết Kế Landing Page Khóa Học Trọn Gói",
    metaDescription: "Landing page tuyển sinh khóa học với chương trình, lịch học, học phí và form tư vấn. Nextchain lo nội dung, thiết kế, xuất bản và cập nhật.",
    h1: "Landing page khóa học: hiểu chương trình, đăng ký tư vấn nhanh",
    intro: "Phụ huynh và học viên muốn biết mình sẽ học gì, với ai, khi nào và học phí bao nhiêu. Trang tuyển sinh nên trả lời đủ trước khi mời để lại liên hệ, thay vì chỉ đặt form ở đầu trang.",
    problems: [
      { title: "Bài quảng cáo thiếu thông tin", desc: "Trang gom mục tiêu học, đối tượng phù hợp, nội dung và lịch khai giảng." },
      { title: "Khách hỏi lại học phí", desc: "Nêu mức phí và điều kiện ưu đãi có thời hạn rõ ràng để tránh tư vấn sai." },
      { title: "Đăng ký chưa đúng khóa", desc: "Form lưu khóa hoặc lịch học quan tâm để nhân viên tiếp nhận đúng nhu cầu." },
    ],
    pages: [
      { title: "Chương trình", desc: "Mục tiêu, nội dung học và yêu cầu đầu vào." },
      { title: "Giảng viên", desc: "Hồ sơ giảng viên và kinh nghiệm được xác nhận." },
      { title: "Lịch & học phí", desc: "Ngày khai giảng, hình thức học, học phí và chính sách." },
      { title: "Đăng ký tư vấn", desc: "Form ngắn chuyển đúng khóa quan tâm về đội tuyển sinh." },
    ],
    faqs: [
      { q: "Có nhận thanh toán học phí trực tuyến không?", a: "Gói landing page nhận yêu cầu tư vấn. Cổng thanh toán hoặc quản lý học viên cần khảo sát và báo giá riêng." },
      { q: "Ai cung cấp thông tin về khóa học?", a: "Trung tâm cung cấp chương trình, học phí và lịch thực tế; Nextchain biên tập cách trình bày để trung tâm duyệt." },
    ],
  },
]

export function getIndustry(slug: string) {
  return INDUSTRIES.find((industry) => industry.slug === slug)
}
