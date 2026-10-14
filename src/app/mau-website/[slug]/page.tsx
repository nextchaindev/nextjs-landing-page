import Link from "next/link"
import { notFound } from "next/navigation"
import { ExternalLink } from "lucide-react"
import PageHeader from "@/components/marketing/PageHeader"
import Section from "@/components/marketing/Section"
import CtaBanner from "@/components/marketing/CtaBanner"
import ContactButton from "@/components/marketing/ContactButton"
import { pageMetadata } from "@/lib/seo"
import {
  getTemplate,
  templatesWithDetail,
  isTemplateIndexable,
  templateIndustry,
} from "@/content/templates"

export const dynamicParams = false

export function generateStaticParams() {
  return templatesWithDetail().map((template) => ({ slug: template.slug }))
}

export async function generateMetadata({ params }: PageProps<"/mau-website/[slug]">) {
  const { slug } = await params
  const template = getTemplate(slug)
  if (!template?.industrySlug) return {}
  return pageMetadata({
    title: `Mẫu website ${template.name.toLowerCase()}`,
    description: `${template.description} Xem bố cục và các trang chính; liên hệ để được tư vấn website phù hợp.`,
    path: `/mau-website/${template.slug}`,
    noindex: !isTemplateIndexable(template),
  })
}

export default async function TemplatePage({ params }: PageProps<"/mau-website/[slug]">) {
  const { slug } = await params
  const template = getTemplate(slug)
  if (!template?.industrySlug) notFound()
  const industry = templateIndustry(template)
  const path = `/mau-website/${template.slug}`

  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Mẫu website", path: "/mau-website" },
          { name: template.name, path },
        ]}
        eyebrow="Mẫu website tham khảo"
        title={`Mẫu website ${template.name.toLowerCase()}`}
        intro={`${template.style}. ${template.description} Đây là mẫu tham khảo — website của bạn được thiết kế riêng theo thương hiệu.`}
        image={template.image}
        imageAlt={template.imageAlt}>
        {template.demoUrl ? (
          <a
            href={template.demoUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 h-12 md:h-14 px-6 md:px-8 rounded-xl font-bold bg-primary text-white hover:bg-primary/90">
            Mở bản demo <ExternalLink className="w-4 h-4" />
          </a>
        ) : (
          <ContactButton label="Tư vấn mẫu tham khảo" context={template.name} />
        )}
      </PageHeader>

      <Section title={`Vì sao bố cục này phù hợp ${industry.shortName.toLowerCase()}?`}>
        <div className="grid gap-6 md:grid-cols-3">
          {industry.problems.map((problem) => (
            <article key={problem.title} className="rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900">{problem.title}</h3>
              <p className="mt-3 text-gray-700">{problem.desc}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section title="Mẫu gồm những trang nào?" muted>
        <div className="grid md:grid-cols-3 gap-6">
          {industry.pages.map((page) => (
            <div key={page.title} className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900">{page.title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{page.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-gray-700">
          Tìm hiểu vấn đề mẫu này giải quyết tại trang{" "}
          <Link href={`/giai-phap/${industry.slug}`} className="text-primary underline">
            giải pháp {industry.name.toLowerCase()}
          </Link>
          , hoặc xem{" "}
          <Link href="/bang-gia" className="text-primary underline">
            bảng giá
          </Link>
          .
        </p>
      </Section>

      <CtaBanner />
    </>
  )
}
