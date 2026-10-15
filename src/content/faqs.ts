import { STARTING_PRICE } from "@/content/plans"

export interface Faq {
  q: string
  a: string
}

export const GENERAL_FAQS: Faq[] = [
  {
    q: "Nextchain.site là dịch vụ gì?",
    a: "Dịch vụ làm landing page và website trọn gói theo tháng cho kinh doanh nhỏ: đội ngũ Nextchain thiết kế, viết nội dung, xuất bản và quản lý website cho bạn. Ngoài ra Nextchain nhận dự án website doanh nghiệp, bán hàng, thiết kế theo yêu cầu, Marketing & SEO và phát triển phần mềm.",
  },
  {
    q: "Tôi có phải tự thiết kế hay biết lập trình không?",
    a: "Không. Bạn gửi thông tin cơ sở, chọn phương án thiết kế chúng tôi chuẩn bị và duyệt nội dung. Mọi phần kỹ thuật do Nextchain thực hiện.",
  },
  {
    q: "Chi phí gồm những khoản nào?",
    a: `Landing page và website kinh doanh nhỏ trả theo tháng từ ${STARTING_PRICE}, không phí khởi tạo, dùng tên miền riêng hoặc địa chỉ miễn phí. Website doanh nghiệp (từ 12.000.000đ), website bán hàng (từ 18.000.000đ), thiết kế theo yêu cầu, Marketing & SEO và phần mềm trả theo dự án. Chi tiết tại trang Bảng giá.`,
  },
  {
    q: "Website có được tối ưu SEO không?",
    a: "Có các hạng mục SEO kỹ thuật: tiêu đề và mô tả riêng cho từng trang, sitemap, dữ liệu có cấu trúc, tốc độ tải và hiển thị tốt trên điện thoại. Nextchain không cam kết thứ hạng cụ thể trên Google.",
  },
  {
    q: "Khi ngừng sử dụng dịch vụ thì website và dữ liệu xử lý thế nào?",
    a: "Xem chi tiết tại Chính sách hủy dịch vụ, gồm thời hạn báo trước, việc bàn giao nội dung và tên miền.",
  },
]
