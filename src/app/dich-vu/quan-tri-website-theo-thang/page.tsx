import Link from "next/link"
import PageHeader from "@/components/marketing/PageHeader"
import Section from "@/components/marketing/Section"
import FaqSection from "@/components/marketing/FaqSection"
import CtaBanner from "@/components/marketing/CtaBanner"
import ContactButton from "@/components/marketing/ContactButton"
import JsonLdScript from "@/components/marketing/JsonLdScript"
import { pageMetadata, serviceSchema } from "@/lib/seo"
import type { Faq } from "@/content/faqs"

const PATH = "/dich-vu/quan-tri-website-theo-thang"
const DESCRIPTION =
  "Quản trị website theo tháng: cập nhật dịch vụ, bảng giá, ảnh, bài blog, trang sản phẩm; bảo trì kỹ thuật, sao lưu và hỗ trợ. Bạn gửi yêu cầu, Nextchain thực hiện."

export const metadata = pageMetadata({
  title: "Quản Trị Website Theo Tháng Cho Doanh Nghiệp Nhỏ",
  description: DESCRIPTION,
  path: PATH,
})

const TASKS = [
  {
    title: "Cập nhật dịch vụ & bảng giá",
    desc: "Thêm, sửa, ẩn dịch vụ khi menu thay đổi. Mỗi dịch vụ chính có thể có trang riêng.",
  },
  {
    title: "Blog",
    desc: "Nextchain soạn bản nháp, kiểm tra thông tin; bạn duyệt rồi mới đăng. Số bài theo gói.",
  },
  {
    title: "Trang sản phẩm",
    desc: "Ảnh, mô tả, thuộc tính, giá và nút liên hệ đặt mua cho sản phẩm cơ sở đang bán.",
  },
  {
    title: "Ảnh & thông tin liên hệ",
    desc: "Thay ảnh không gian, giờ mở cửa, địa chỉ chi nhánh, số điện thoại.",
  },
  {
    title: "Bảo trì kỹ thuật",
    desc: "Hosting, SSL, sao lưu, theo dõi website hoạt động và sửa lỗi phát sinh.",
  },
  {
    title: "SEO kỹ thuật",
    desc: "Giữ tiêu đề, mô tả, sitemap và dữ liệu có cấu trúc đúng khi thêm trang mới.",
  },
]

const ADMIN_FAQS: Faq[] = [
  {
    q: "Tôi gửi yêu cầu chỉnh sửa bằng cách nào?",
    a: "Qua email hoặc kênh hỗ trợ được thống nhất khi bắt đầu. Nextchain xác nhận yêu cầu và báo thời gian hoàn thành.",
  },
  {
    q: "Yêu cầu vượt phạm vi gói thì sao?",
    a: "Nextchain báo giá phần phát sinh trước khi thực hiện. Không có chi phí nào được tính khi bạn chưa đồng ý.",
  },
  {
    q: "Ai viết bài blog cho website của tôi?",
    a: "Đội ngũ nội dung của Nextchain biên soạn, kiểm tra thông tin và gửi bạn duyệt trước khi xuất bản.",
  },
]

export default function WebsiteManagementPage() {
  return (
    <>
      <JsonLdScript
        data={serviceSchema({
          name: "Quản trị website theo tháng",
          description: DESCRIPTION,
          path: PATH,
        })}
      />
      <PageHeader
        crumbs={[{ name: "Quản trị website theo tháng", path: PATH }]}
        eyebrow="Dịch vụ"
        title="Quản trị website theo tháng: bạn kinh doanh, Nextchain lo website"
        intro="Website chỉ hữu ích khi thông tin luôn đúng. Gói tháng của Nextchain bao gồm cập nhật nội dung, bảo trì kỹ thuật và hỗ trợ, để bạn không phải tự đăng nhập hay học công cụ.">
        <ContactButton />
      </PageHeader>

      <Section title="Những việc Nextchain làm hằng tháng" muted>
        <div className="grid md:grid-cols-3 gap-6">
          {TASKS.map((task) => (
            <div key={task.title} className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900">{task.title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{task.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-gray-700">
          Số lượt cập nhật và số bài blog mỗi tháng khác nhau theo gói — xem{" "}
          <Link href="/bang-gia" className="text-primary underline">
            bảng giá
          </Link>
          .
        </p>
      </Section>

      <FaqSection faqs={ADMIN_FAQS} />
      <CtaBanner />
    </>
  )
}
