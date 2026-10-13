import type { LegalSection } from "@/components/marketing/LegalPage"
import { COMPANY_NAME, CONTACT } from "@/lib/site"
import { FREE_SUBDOMAIN_EXAMPLE } from "@/content/plans"

/**
 * Nội dung pháp lý bản đầu. Cần bộ phận pháp chế/kinh doanh rà soát trước
 * khi chạy quảng cáo: thời hạn báo trước, hoàn phí và quyền sở hữu tên miền
 * phải khớp với hợp đồng thực tế. Khi sửa nội dung, cập nhật LEGAL_UPDATED_AT.
 */
export const LEGAL_UPDATED_AT = "2026-10-13"

export const TERMS_SECTIONS: LegalSection[] = [
  {
    heading: "Phạm vi áp dụng",
    paragraphs: [
      `Điều khoản này áp dụng cho dịch vụ thiết kế, xuất bản và quản trị website theo gói tháng do ${COMPANY_NAME} cung cấp qua Nextchain.site. Hợp đồng hoặc báo giá ký với từng khách hàng được ưu tiên áp dụng nếu có điểm khác biệt.`,
    ],
  },
  {
    heading: "Phí dịch vụ và thanh toán",
    paragraphs: [
      "Gói tháng (landing page, website kinh doanh nhỏ) tính phí theo tháng, không có phí khởi tạo, cam kết tối thiểu 6 tháng. Dự án website, phần mềm và Marketing & SEO tính phí theo báo giá dự án. Mức phí và quyền lợi được ghi tại trang Bảng giá và báo giá gửi khách hàng.",
      "Công việc ngoài phạm vi gói được báo giá trước và chỉ thực hiện khi khách hàng đồng ý.",
    ],
  },
  {
    heading: "Nội dung và trách nhiệm duyệt",
    paragraphs: [
      "Khách hàng cung cấp thông tin, hình ảnh và chịu trách nhiệm về quyền sử dụng các tài liệu đó. Nextchain hỗ trợ soạn nội dung và kiểm tra trước khi gửi khách hàng duyệt.",
      "Nội dung chỉ được xuất bản sau khi khách hàng xác nhận. Khách hàng chịu trách nhiệm về tính chính xác của giá, dịch vụ và cam kết công bố trên website của mình.",
    ],
  },
  {
    heading: "SEO và kết quả kinh doanh",
    paragraphs: [
      "Nextchain thực hiện các hạng mục SEO kỹ thuật được mô tả trong gói. Nextchain không cam kết thứ hạng cụ thể trên công cụ tìm kiếm hay mức tăng doanh thu.",
    ],
  },
  {
    heading: "Tạm ngưng và chấm dứt",
    paragraphs: [
      "Việc hủy dịch vụ, bàn giao nội dung và tên miền được quy định tại Chính sách hủy dịch vụ.",
    ],
  },
  {
    heading: "Liên hệ",
    paragraphs: [`Mọi câu hỏi về điều khoản vui lòng gửi đến ${CONTACT.email}.`],
  },
]

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    heading: "Thông tin chúng tôi thu thập",
    paragraphs: [
      "Khi bạn gửi yêu cầu tư vấn: họ tên, email, số điện thoại và nội dung tin nhắn.",
      "Khi bạn truy cập website: dữ liệu sử dụng ẩn danh qua Google Analytics, Google Tag Manager và Microsoft Clarity (trang đã xem, thiết bị, nguồn truy cập). Form được bảo vệ bằng Google reCAPTCHA.",
    ],
  },
  {
    heading: "Mục đích sử dụng",
    paragraphs: [
      "Liên hệ tư vấn, gửi báo giá, thực hiện dịch vụ đã đăng ký và cải thiện trải nghiệm website. Chúng tôi không bán thông tin cá nhân cho bên thứ ba.",
    ],
  },
  {
    heading: "Lưu trữ và bảo mật",
    paragraphs: [
      "Dữ liệu yêu cầu tư vấn được lưu trên hạ tầng của nhà cung cấp dịch vụ cơ sở dữ liệu và chỉ nhân sự liên quan được truy cập.",
    ],
  },
  {
    heading: "Dữ liệu trên website của khách hàng",
    paragraphs: [
      "Với website Nextchain vận hành cho khách hàng, thông tin do khách truy cập gửi qua form được chuyển đến chủ website. Chủ website chịu trách nhiệm sử dụng dữ liệu đó đúng mục đích.",
    ],
  },
  {
    heading: "Quyền của bạn",
    paragraphs: [
      `Bạn có thể yêu cầu xem, sửa hoặc xóa thông tin cá nhân bằng cách gửi email đến ${CONTACT.email}.`,
    ],
  },
]

export const CANCELLATION_SECTIONS: LegalSection[] = [
  {
    heading: "Cách yêu cầu hủy",
    paragraphs: [
      `Gửi yêu cầu hủy qua email ${CONTACT.email} hoặc kênh hỗ trợ đã thống nhất. Thời hạn báo trước và thời điểm dừng tính phí theo hợp đồng/báo giá của từng khách hàng.`,
    ],
  },
  {
    heading: "Phí đã thanh toán",
    paragraphs: [
      "Gói tháng có thời hạn cam kết tối thiểu 6 tháng. Hủy trước thời hạn cam kết và việc hoàn phí tháng cho kỳ đang sử dụng (nếu có) được áp dụng theo hợp đồng.",
    ],
  },
  {
    heading: "Nội dung và hình ảnh",
    paragraphs: [
      "Nội dung văn bản và hình ảnh do khách hàng cung cấp thuộc về khách hàng. Khi hủy, khách hàng có thể yêu cầu bàn giao bản sao nội dung trong thời hạn thỏa thuận.",
    ],
  },
  {
    heading: "Tên miền",
    paragraphs: [
      `Tên miền riêng do khách hàng tự đăng ký và thuộc quyền sở hữu của khách hàng; Nextchain chỉ cấu hình kết nối, khi hủy khách hàng giữ nguyên tên miền. Địa chỉ miễn phí dạng ${FREE_SUBDOMAIN_EXAMPLE} thuộc hệ thống Nextchain và ngừng hoạt động khi kết thúc dịch vụ.`,
    ],
  },
  {
    heading: "Website sau khi hủy",
    paragraphs: [
      "Website ngừng hoạt động trên hạ tầng Nextchain sau thời điểm kết thúc dịch vụ. Dữ liệu yêu cầu từ khách truy cập được bàn giao theo yêu cầu trước khi xóa.",
    ],
  },
]
