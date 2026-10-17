import { Info, Palette } from "lucide-react"
import PageHeader from "@/components/marketing/PageHeader"
import Section from "@/components/marketing/Section"
import Reveal from "@/components/marketing/Reveal"
import TemplateGallery from "@/components/marketing/TemplateGallery"
import CtaBanner from "@/components/marketing/CtaBanner"
import ContactButton from "@/components/marketing/ContactButton"
import { pageMetadata } from "@/lib/seo"
import { TEMPLATES } from "@/content/templates"

const PATH = "/mau-website"

export const metadata = pageMetadata({
  title: "Mẫu website tham khảo theo ngành",
  description:
    "Mẫu website tham khảo cho spa, salon, nail, homestay, nhà hàng, cà phê, nha khoa và nhiều ngành khác. Mỗi website được thiết kế riêng theo thương hiệu.",
  path: PATH,
})

export default function TemplatesPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Mẫu website", path: PATH }]}
        eyebrow="Mẫu website tham khảo"
        title="Mẫu website tham khảo theo ngành"
        intro={`${TEMPLATES.length}+ mẫu bố cục để bạn hình dung website của mình. Đội ngũ Nextchain thiết kế riêng cho từng khách hàng — màu sắc, bố cục và nội dung theo thương hiệu của bạn.`}
      />

      <section className="px-4 md:px-6 -mt-2">
        <Reveal className="max-w-[1200px] mx-auto grid md:grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-6 rounded-2xl border border-orange-200 bg-linear-to-r from-orange-50 to-amber-50 p-5 md:p-6">
          <span className="w-12 h-12 rounded-xl bg-white text-primary flex items-center justify-center shadow-sm">
            <Info className="w-6 h-6" />
          </span>
          <p className="text-gray-800 leading-relaxed">
            <strong>Đây là các mẫu tham khảo, không phải giới hạn lựa chọn.</strong> Website của bạn sẽ được thiết kế
            riêng dựa trên ngành, thương hiệu và nội dung thật. Chưa thấy ngành của mình? Nextchain vẫn thiết kế được.
          </p>
          <ContactButton label="Tư vấn mẫu phù hợp" className="w-full md:w-auto" />
        </Reveal>
      </section>

      <Section>
        <TemplateGallery />
      </Section>

      <Section title="Mẫu được tùy biến thế nào?" muted>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            ["Màu sắc & logo", "Theo nhận diện thương hiệu của bạn, hoặc Nextchain đề xuất bộ màu phù hợp ngành."],
            ["Bố cục & trang", "Thêm, bớt, đổi thứ tự các phần theo cách khách hàng của bạn tìm hiểu và liên hệ."],
            ["Nội dung & hình ảnh", "Dùng dịch vụ, bảng giá, ảnh thật của cơ sở — không dùng chữ mẫu khi bàn giao."],
          ].map(([title, desc], idx) => (
            <Reveal
              key={title}
              delay={idx * 0.1}
              className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:shadow-lg transition-shadow">
              <Palette className="w-8 h-8 text-primary" />
              <h3 className="mt-4 text-lg font-bold text-gray-900">{title}</h3>
              <p className="mt-2 text-gray-700 leading-relaxed">{desc}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBanner
        title="Chưa thấy ngành của bạn?"
        desc="Các mẫu trên chỉ là tham khảo. Gửi thông tin, Nextchain đề xuất bố cục phù hợp với doanh nghiệp của bạn."
      />
    </>
  )
}
