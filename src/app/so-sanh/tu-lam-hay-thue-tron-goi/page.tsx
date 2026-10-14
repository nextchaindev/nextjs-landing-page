import Link from "next/link"
import PageHeader from "@/components/marketing/PageHeader"
import Section from "@/components/marketing/Section"
import CtaBanner from "@/components/marketing/CtaBanner"
import { pageMetadata } from "@/lib/seo"

const path = "/so-sanh/tu-lam-hay-thue-tron-goi"

export const metadata = pageMetadata({
  title: "Tự Làm Landing Page Hay Thuê Trọn Gói: Cách Nào Hợp Với Bạn?",
  description: "Tự làm hay thuê trọn gói? So sánh thời gian, chi phí, việc cần tự làm và trách nhiệm vận hành để chọn cách phù hợp.",
  path,
})

const rows = [
  ["Thời gian của bạn", "Tự học công cụ, viết nội dung, kiểm tra hiển thị và sửa lỗi", "Cung cấp thông tin, phản hồi và duyệt bản cuối"],
  ["Chi phí", "Phí công cụ, tên miền và thời gian tự làm; tùy nền tảng", "Phí dịch vụ theo gói, phạm vi và thời hạn công bố trước"],
  ["Nội dung bán hàng", "Bạn tự viết hoặc thuê người viết riêng", "Đội ngũ biên tập từ thông tin bạn cung cấp, bạn duyệt"],
  ["Đo lường & tích hợp", "Bạn thiết lập hoặc thuê kỹ thuật theo nền tảng", "Khảo sát nhu cầu; tích hợp nâng cao được báo giá theo phạm vi"],
  ["Sau khi xuất bản", "Bạn tự cập nhật, theo dõi và xử lý lỗi", "Nextchain bảo trì và chỉnh sửa theo số lượt trong gói"],
]

export default function ComparisonPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Tự làm hay thuê trọn gói", path }]}
        eyebrow="So sánh trước khi quyết định"
        title="Tự làm landing page hay thuê trọn gói?"
        intro="Bạn muốn tự kiểm soát từng bước, hay dành thời gian cho việc kinh doanh? So sánh phần việc, chi phí và cách vận hành trước khi chọn."
      />
      <Section title="So sánh theo công việc thực tế">
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full min-w-[680px] text-left text-sm md:text-base">
            <thead className="bg-orange-50"><tr><th className="p-4">Tiêu chí</th><th className="p-4">Tự làm bằng công cụ</th><th className="p-4">Nextchain làm trọn gói</th></tr></thead>
            <tbody className="divide-y divide-gray-200">{rows.map(([criterion, self, done]) => (
              <tr key={criterion}><th scope="row" className="p-4 font-semibold">{criterion}</th><td className="p-4 text-gray-700">{self}</td><td className="p-4 text-gray-700">{done}</td></tr>
            ))}</tbody>
          </table>
        </div>
      </Section>
      <Section muted title="Khi nào nên tự làm, khi nào nên thuê?">
        <div className="grid gap-8 md:grid-cols-2">
          <div><h3 className="text-xl font-bold">Tự làm khi bạn có thời gian</h3><p className="mt-3 text-gray-700">Bạn muốn tự viết, thiết kế và cập nhật trang. Đổi lại, bạn cần kiểm tra form, tên miền và hiển thị trên điện thoại sau mỗi lần sửa.</p></div>
          <div><h3 className="text-xl font-bold">Thuê trọn gói khi bạn muốn có người làm thay</h3><p className="mt-3 text-gray-700">Bạn cung cấp thông tin và duyệt; Nextchain triển khai theo phạm vi đã thống nhất. Xem số lượt chỉnh sửa, thời hạn tối thiểu và điều kiện hủy trước khi đăng ký.</p></div>
        </div>
        <p className="mt-8 text-gray-700">Xem <Link href="/bang-gia" className="font-semibold text-primary underline">giá gói tháng</Link> hoặc <Link href="/dich-vu/thiet-ke-website-doanh-nghiep" className="font-semibold text-primary underline">giải pháp doanh nghiệp</Link>.</p>
      </Section>
      <CtaBanner title="Bạn chỉ cần duyệt, Nextchain lo triển khai" />
    </>
  )
}
