import Link from "next/link"
import { notFound } from "next/navigation"
import PageHeader from "@/components/marketing/PageHeader"
import Section from "@/components/marketing/Section"
import ProcessList from "@/components/marketing/ProcessList"
import FaqSection from "@/components/marketing/FaqSection"
import CtaBanner from "@/components/marketing/CtaBanner"
import ContactButton from "@/components/marketing/ContactButton"
import JsonLdScript from "@/components/marketing/JsonLdScript"
import { pageMetadata, serviceSchema } from "@/lib/seo"
import { STARTING_PRICE } from "@/content/plans"
import { INDUSTRIES, getIndustry } from "@/content/industries"
import { TEMPLATES } from "@/content/templates"

export const dynamicParams = false

export function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({ slug: industry.slug }))
}

export async function generateMetadata({ params }: PageProps<"/giai-phap/[slug]">) {
  const { slug } = await params
  const industry = getIndustry(slug)
  if (!industry) return {}
  return pageMetadata({
    title: industry.metaTitle,
    description: industry.metaDescription,
    path: `/giai-phap/${industry.slug}`,
  })
}

export default async function IndustryPage({ params }: PageProps<"/giai-phap/[slug]">) {
  const { slug } = await params
  const industry = getIndustry(slug)
  if (!industry) notFound()
  const path = `/giai-phap/${industry.slug}`
  const template = TEMPLATES.find((t) => t.industrySlug === industry.slug)

  return (
    <>
      <JsonLdScript
        data={serviceSchema({
          name: `Thiết kế ${industry.name.toLowerCase()}`,
          description: industry.metaDescription,
          path,
          audience: industry.audience,
        })}
      />
      <PageHeader
        crumbs={[{ name: industry.name, path }]}
        eyebrow={`Dành cho ${industry.audience.toLowerCase()}`}
        title={industry.h1}
        intro={industry.intro}
        image={industry.image}
        imageAlt={industry.imageAlt}>
        <ContactButton context={industry.name} />
        {template && (
          <Link
            href={`/mau-website/${template.slug}`}
            className="inline-flex items-center h-12 md:h-14 px-6 md:px-8 rounded-xl font-bold border border-gray-300 text-gray-900 hover:border-gray-400">
            Xem mẫu {industry.shortName.toLowerCase()}
          </Link>
        )}
      </PageHeader>

      <Section title={`Vấn đề thường gặp của ${industry.shortName.toLowerCase()}`}>
        <div className="grid md:grid-cols-3 gap-6">
          {industry.problems.map((problem) => (
            <div key={problem.title} className="border border-gray-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 text-lg">{problem.title}</h3>
              <p className="mt-3 text-gray-700 leading-relaxed">{problem.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title={`${industry.name} của bạn sẽ có gì?`} muted>
        <div className="grid md:grid-cols-3 gap-6">
          {industry.pages.map((page) => (
            <div key={page.title} className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900">{page.title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{page.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Chi phí và quy trình"
        desc={`Trả theo tháng từ ${STARTING_PRICE}, không phí khởi tạo. Dùng tên miền riêng hoặc địa chỉ miễn phí của Nextchain. Bạn chỉ cần gửi thông tin và duyệt.`}>
        <ProcessList />
        <p className="mt-10 text-center text-gray-700">
          Chi tiết từng gói tại{" "}
          <Link href="/bang-gia" className="text-primary underline">
            bảng giá
          </Link>
          {" · "}
          Các bước cụ thể tại{" "}
          <Link href="/quy-trinh" className="text-primary underline">
            quy trình làm website
          </Link>
          .
        </p>
      </Section>

      <FaqSection faqs={industry.faqs} />
      <CtaBanner title={`Bắt đầu ${industry.name.toLowerCase()} của bạn`} />
    </>
  )
}
