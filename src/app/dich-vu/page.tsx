import Link from "next/link"
import { ArrowRight } from "lucide-react"
import PageHeader from "@/components/marketing/PageHeader"
import Section from "@/components/marketing/Section"
import Reveal from "@/components/marketing/Reveal"
import ServiceCards from "@/components/marketing/ServiceCards"
import CtaBanner from "@/components/marketing/CtaBanner"
import IndustryCards from "@/components/marketing/IndustryCards"
import { pageMetadata } from "@/lib/seo"
import { STARTING_PRICE } from "@/content/plans"

const PATH = "/dich-vu"

export const metadata = pageMetadata({
  title: "Dịch vụ website trọn gói, SEO & phần mềm",
  description:
    `Landing page trọn gói từ ${STARTING_PRICE}/tháng; website doanh nghiệp, bán hàng, thiết kế theo yêu cầu, SEO và phần mềm làm theo dự án.`,
  path: PATH,
})

export default function ServicesIndexPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Dịch vụ", path: PATH }]}
        eyebrow="Dịch vụ"
        title="Dịch vụ website trọn gói và công nghệ cho doanh nghiệp"
        intro="Landing page và website kinh doanh nhỏ trả theo tháng, không phí khởi tạo. Website doanh nghiệp, bán hàng, phần mềm và Marketing & SEO trả theo dự án với bảng giá công khai."
      />

      <Section>
        <ServiceCards />
        <Reveal className="mt-8 rounded-2xl bg-linear-to-r from-orange-50 to-amber-50 border border-orange-100 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Quản trị website theo tháng</h2>
            <p className="mt-1 text-gray-700">Cập nhật nội dung, bảo trì, sao lưu và hỗ trợ kỹ thuật — bạn không cần tự làm.</p>
          </div>
          <Link
            href={`${PATH}/quan-tri-website-theo-thang`}
            className="inline-flex items-center gap-2 font-semibold text-primary whitespace-nowrap">
            Tìm hiểu <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </Section>

      <Section title="Giải pháp theo ngành" muted>
        <IndustryCards />
      </Section>

      <CtaBanner />
    </>
  )
}
