import Link from "next/link"
import PageHeader from "@/components/marketing/PageHeader"
import Section from "@/components/marketing/Section"
import CtaBanner from "@/components/marketing/CtaBanner"
import { pageMetadata } from "@/lib/seo"
import { COMPANY_NAME, CONTACT } from "@/lib/site"

const PATH = "/ve-chung-toi"

export const metadata = pageMetadata({
  title: "Về chúng tôi",
  description:
    "Nextchain.site do Nextchain Tech vận hành: dịch vụ làm và quản lý website theo gói tháng cho doanh nghiệp nhỏ tại Việt Nam. Thông tin đơn vị, cách làm việc và liên hệ.",
  path: PATH,
})

const PRINCIPLES = [
  {
    title: "Chủ cơ sở duyệt mọi nội dung",
    desc: "Đội ngũ Nextchain chuẩn bị thiết kế và nội dung; không nội dung nào được xuất bản khi chưa có chủ cơ sở xác nhận.",
  },
  {
    title: "Công bố rõ phạm vi",
    desc: "Mỗi gói ghi rõ bao gồm gì, không bao gồm gì. Việc phát sinh được báo giá trước khi làm.",
  },
  {
    title: "Không dùng số liệu không kiểm chứng",
    desc: "Nextchain không cam kết thứ hạng Google hay mức tăng doanh số. Chỉ giới thiệu những gì có thể chứng minh.",
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Về chúng tôi", path: PATH }]}
        eyebrow="Về chúng tôi"
        title="Nextchain.site — website chuyên nghiệp cho doanh nghiệp nhỏ, làm từ A–Z"
        intro={`Nextchain.site là dịch vụ do ${COMPANY_NAME} vận hành, giúp spa, salon, homestay và doanh nghiệp dịch vụ địa phương có website mà không cần tự thiết kế hay quản lý kỹ thuật.`}
      />

      <Section title="Cách chúng tôi làm việc" muted>
        <div className="grid md:grid-cols-3 gap-6">
          {PRINCIPLES.map((item) => (
            <div key={item.title} className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-gray-700 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Thông tin đơn vị">
        <dl className="max-w-[640px] mx-auto divide-y divide-gray-200 border-y border-gray-200">
          {[
            ["Đơn vị vận hành", COMPANY_NAME],
            ["Email", CONTACT.email],
            ["Điện thoại", CONTACT.phone],
            ["Địa chỉ", CONTACT.address],
          ].map(([label, value]) => (
            <div key={label} className="grid grid-cols-3 gap-4 py-4">
              <dt className="text-gray-500">{label}</dt>
              <dd className="col-span-2 text-gray-900 font-medium">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 text-center text-gray-700">
          Tìm hiểu thêm về{" "}
          <Link href="/quy-trinh" className="text-primary underline">
            quy trình làm việc
          </Link>{" "}
          và{" "}
          <Link href="/dieu-khoan" className="text-primary underline">
            điều khoản dịch vụ
          </Link>
          .
        </p>
      </Section>

      <CtaBanner />
    </>
  )
}
