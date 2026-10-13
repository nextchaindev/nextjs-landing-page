export interface ProcessStep {
  title: string
  desc: string
  detail: string
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    title: "Khảo sát & phân tích",
    desc: "Tìm hiểu sâu về doanh nghiệp, khách hàng mục tiêu và mục tiêu kinh doanh",
    detail:
      "Bạn gửi thông tin qua form hoặc gọi trực tiếp. Nextchain hỏi về dịch vụ, bảng giá, khách hàng và hình ảnh hiện có — không cần chuẩn bị nội dung hoàn chỉnh.",
  },
  {
    title: "Thiết kế giải pháp",
    desc: "Đề xuất ý tưởng sáng tạo và thiết kế phù hợp với thương hiệu",
    detail:
      "Đội ngũ Nextchain chuẩn bị phương án thiết kế và nội dung dựa trên thông tin thật của bạn. Bạn góp ý và duyệt trước khi chuyển sang bước tiếp theo.",
  },
  {
    title: "Phát triển & triển khai",
    desc: "Xây dựng sản phẩm với chất lượng cao và kiểm thử kỹ lưỡng",
    detail:
      "Lập trình, kết nối tên miền, cài SEO kỹ thuật, kiểm tra hiển thị trên điện thoại và máy tính, kiểm tra form trước khi website hoạt động chính thức.",
  },
  {
    title: "Bàn giao & đồng hành",
    desc: "Hỗ trợ vận hành và tối ưu hóa liên tục sau khi ra mắt",
    detail:
      "Với gói tháng, Nextchain cập nhật nội dung và bảo trì liên tục. Với dự án, bạn được hướng dẫn sử dụng và hỗ trợ trong thời gian bảo hành của gói.",
  },
]
