import Link from "next/link"
import PageHeader from "@/components/marketing/PageHeader"
import Section from "@/components/marketing/Section"
import ProcessList from "@/components/marketing/ProcessList"
import FaqSection from "@/components/marketing/FaqSection"
import CtaBanner from "@/components/marketing/CtaBanner"
import { pageMetadata } from "@/lib/seo"
import { GENERAL_FAQS } from "@/content/faqs"

const PATH = "/quy-trinh"

export const metadata = pageMetadata({
  title: "Quy Trình Làm Website Trọn Gói",
  description:
    "Quy trình 4 bước làm website cùng Nextchain: khảo sát & phân tích, thiết kế giải pháp, phát triển & triển khai, bàn giao & đồng hành. Minh bạch từng bước.",
  path: PATH,
})

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Quy trình", path: PATH }]}
        eyebrow="Quy trình"
        title="Quy trình làm việc: khảo sát, thiết kế, triển khai và đồng hành"
        intro="Phương pháp chuyên nghiệp, minh bạch từng bước. Bạn không cần biết thiết kế hay lập trình — chỉ cung cấp thông tin và duyệt, mọi phần còn lại Nextchain thực hiện."
      />
      <Section>
        <ProcessList detailed />
      </Section>

      <Section title="Bạn cần chuẩn bị gì?" muted>
        <ul className="max-w-[760px] mx-auto grid md:grid-cols-2 gap-x-8 gap-y-3 text-gray-800">
          <li>• Tên cơ sở, địa chỉ, giờ mở cửa</li>
          <li>• Danh sách dịch vụ/sản phẩm và giá</li>
          <li>• Ảnh không gian, sản phẩm, đội ngũ (nếu có)</li>
          <li>• Logo và màu thương hiệu (nếu có)</li>
          <li>• Số điện thoại, Zalo, fanpage</li>
          <li>• Tên miền đang dùng (nếu có)</li>
        </ul>
        <p className="mt-10 text-center text-gray-700">
          Thiếu ảnh hoặc nội dung? Nextchain sẽ hỏi thêm và gợi ý. Xem các{" "}
          <Link href="/mau-website" className="text-primary underline">
            mẫu website theo ngành
          </Link>{" "}
          để hình dung kết quả.
        </p>
      </Section>

      <FaqSection faqs={GENERAL_FAQS} />
      <CtaBanner />
    </>
  )
}
