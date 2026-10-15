import Link from "next/link"
import PageHeader from "@/components/marketing/PageHeader"
import Section from "@/components/marketing/Section"
import IndustryCards from "@/components/marketing/IndustryCards"
import CtaBanner from "@/components/marketing/CtaBanner"
import JsonLdScript from "@/components/marketing/JsonLdScript"
import { pageMetadata } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site"
import { INDUSTRIES } from "@/content/industries"
import { STARTING_PRICE } from "@/content/plans"

const PATH = "/giai-phap"

export const metadata = pageMetadata({
  title: "Giải pháp website theo ngành",
  description: `Website cho spa, salon, nail, homestay, quán cà phê, nha khoa, bất động sản và khóa học. Thiết kế riêng theo ngành, trả theo tháng từ ${STARTING_PRICE}.`,
  path: PATH,
})

export default function SolutionsPage() {
  return (
    <>
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Giải pháp website theo ngành",
          itemListElement: INDUSTRIES.map((industry, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            url: absoluteUrl(`/giai-phap/${industry.slug}`),
            name: industry.name,
          })),
        }}
      />
      <PageHeader
        crumbs={[{ name: "Giải pháp", path: PATH }]}
        eyebrow="Giải pháp theo ngành"
        title="Website thiết kế riêng cho từng ngành"
        intro={`Mỗi ngành có cách khách tìm hiểu và liên hệ khác nhau: spa cần bảng dịch vụ, homestay cần danh sách phòng, quán cà phê cần menu và chỉ đường. Chọn ngành của bạn để xem website gồm những gì. Trả theo tháng từ ${STARTING_PRICE}, không phí khởi tạo.`}
      />
      <Section>
        <IndustryCards />
        <p className="mt-10 text-center text-gray-700">
          Chưa thấy ngành của bạn? Xem{" "}
          <Link href="/mau-website" className="text-primary underline">
            mẫu website tham khảo
          </Link>{" "}
          hoặc{" "}
          <Link href="/dich-vu" className="text-primary underline">
            các dịch vụ theo dự án
          </Link>
          .
        </p>
      </Section>
      <CtaBanner
        title="Chưa chắc ngành mình cần website thế nào?"
        desc="Gửi thông tin cơ sở, Nextchain đề xuất bố cục và gói phù hợp trong 24 giờ làm việc."
      />
    </>
  )
}
