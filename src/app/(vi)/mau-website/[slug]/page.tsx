import Link from "next/link"
import { notFound } from "next/navigation"
import { ExternalLink } from "lucide-react"
import PageHeader from "@/components/marketing/PageHeader"
import Section from "@/components/marketing/Section"
import CtaBanner from "@/components/marketing/CtaBanner"
import ContactButton from "@/components/marketing/ContactButton"
import { pageMetadata } from "@/lib/seo"
import { getTemplate, hasTemplateDetail, templatesWithDetail } from "@/content/templates"
import { getIndustry } from "@/content/industries"
import { getServiceBySlug } from "@/content/services"

export const dynamicParams = false

export function generateStaticParams() {
  return templatesWithDetail().map((template) => ({ slug: template.slug }))
}

export async function generateMetadata({ params }: PageProps<"/mau-website/[slug]">) {
  const { slug } = await params
  const template = getTemplate(slug)
  if (!template || !hasTemplateDetail(template)) return {}
  return pageMetadata({
    title: `Mẫu website ${template.name.toLowerCase()}`,
    description: `${template.description} Xem bố cục và các trang chính; liên hệ để được tư vấn website phù hợp.`,
    path: `/mau-website/${template.slug}`,
  })
}

export default async function TemplatePage({ params }: PageProps<"/mau-website/[slug]">) {
  const { slug } = await params
  const template = getTemplate(slug)
  if (!template || !hasTemplateDetail(template)) notFound()
  const industry = template.industrySlug ? getIndustry(template.industrySlug) : undefined
  const service = !industry && template.serviceSlug ? getServiceBySlug(template.serviceSlug) : undefined
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

      <Section title={template.demoUrl ? "Bản demo gồm những khối nào?" : "Mẫu gồm những khối nào?"}>
        <div className="grid gap-6 md:grid-cols-3">
          {(template.highlights ?? []).map((highlight) => (
            <article key={highlight} className="rounded-2xl border border-gray-200 p-6">
              <p className="flex gap-3 text-gray-800 leading-relaxed">
                <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                {highlight}
              </p>
            </article>
          ))}
        </div>
      </Section>
      <Section title="Xem demo hay tư vấn gói?" muted>
        <div className="grid gap-6 md:grid-cols-2 max-w-[900px] mx-auto text-gray-700 leading-relaxed">
          <p>
            <strong className="text-gray-900">Trang này</strong> cho bạn thấy bố cục và trải nghiệm: khách
            vào sẽ nhìn thấy gì, bấm ở đâu, bảng giá hiện thế nào.
            {template.demoUrl && (
              <>
                {" "}Mở{" "}
                <a
                  href={template.demoUrl}
                  target="_blank"
                  rel="noopener"
                  className="text-primary underline">
                  bản demo {(industry?.shortName ?? template.name).toLowerCase()}
                </a>{" "}
                để xem nguyên một trang hoàn chỉnh.
              </>
            )}
          </p>
          <p>
            <strong className="text-gray-900">{industry ? "Trang giải pháp" : "Trang dịch vụ"}</strong> trả lời câu
            hỏi mua hàng: gói nào phù hợp, phí bao nhiêu, Nextchain làm những gì và bạn cần duyệt gì. Xem tại{" "}
            {industry && (
              <>
                <Link href={`/giai-phap/${industry.slug}`} className="text-primary underline">
                  giải pháp {industry.name.toLowerCase()}
                </Link>{" "}
                hoặc xem{" "}
              </>
            )}
            {service && (
              <>
                <Link href={`/dich-vu/${service.slug}`} className="text-primary underline">
                  dịch vụ {service.name.toLowerCase()}
                </Link>{" "}
                hoặc xem{" "}
              </>
            )}
            <Link href="/bang-gia" className="text-primary underline">
              bảng giá
            </Link>
            .
          </p>
        </div>
      </Section>

      <CtaBanner />
    </>
  )
}
