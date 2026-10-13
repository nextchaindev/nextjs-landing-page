import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Check, Lightbulb, X } from "lucide-react"
import PageHeader from "@/components/marketing/PageHeader"
import Section from "@/components/marketing/Section"
import Reveal from "@/components/marketing/Reveal"
import PricingCards from "@/components/marketing/PricingCards"
import ProjectPackages from "@/components/marketing/ProjectPackages"
import ProcessList from "@/components/marketing/ProcessList"
import FaqSection from "@/components/marketing/FaqSection"
import CtaBanner from "@/components/marketing/CtaBanner"
import ContactButton from "@/components/marketing/ContactButton"
import JsonLdScript from "@/components/marketing/JsonLdScript"
import { pageMetadata, serviceSchema } from "@/lib/seo"
import { SERVICE_LINKS, absoluteUrl } from "@/lib/site"
import { SERVICE_DETAILS, getServiceBySlug } from "@/content/services"
import { PLANS } from "@/content/plans"
import { parsePrice, projectServices } from "@/content/projectPricing"

export const dynamicParams = false

export function generateStaticParams() {
  return SERVICE_DETAILS.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: PageProps<"/dich-vu/[slug]">) {
  const { slug } = await params
  const detail = getServiceBySlug(slug)
  if (!detail) return {}
  return pageMetadata({
    title: detail.metaTitle,
    description: detail.metaDescription,
    path: `/dich-vu/${detail.slug}`,
  })
}

export default async function ServicePage({ params }: PageProps<"/dich-vu/[slug]">) {
  const { slug } = await params
  const detail = getServiceBySlug(slug)
  if (!detail) notFound()
  const path = `/dich-vu/${detail.slug}`

  const pricing = detail.pricing
  const schema = {
    ...serviceSchema({
      name: detail.name,
      description: detail.metaDescription,
      path,
      audience: detail.audience,
    }),
    image: absoluteUrl(detail.image.src),
    offers:
      pricing.model === "subscription"
        ? PLANS.filter((plan) => pricing.planIds.includes(plan.id)).map((plan) => ({
            "@type": "Offer",
            name: `Gói ${plan.name}`,
            priceCurrency: "VND",
            price: plan.monthlyPrice,
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: plan.monthlyPrice,
              priceCurrency: "VND",
              unitText: "tháng",
            },
          }))
        : projectServices[pricing.key].packages.map((pkg) => {
            const { amount, isMinimum } = parsePrice(pkg.price)
            return {
              "@type": "Offer",
              name: `${detail.name} - ${pkg.name}`,
              description: pkg.description,
              priceCurrency: "VND",
              ...(isMinimum
                ? { priceSpecification: { "@type": "PriceSpecification", minPrice: amount, priceCurrency: "VND" } }
                : { price: amount }),
            }
          }),
  }

  const otherServices = SERVICE_LINKS.filter((link) => link.href !== path)

  return (
    <>
      <JsonLdScript data={schema} />
      <PageHeader
        crumbs={[
          { name: "Dịch vụ", path: "/dich-vu" },
          { name: detail.name, path },
        ]}
        eyebrow={detail.name}
        title={detail.h1}
        intro={`Dành cho: ${detail.audience}.`}
        image={detail.image}
        imageAlt={detail.imageAlt}>
        <ContactButton />
        <Link
          href="#bang-gia"
          className="inline-flex items-center h-12 md:h-14 px-6 md:px-8 rounded-xl font-bold border border-gray-300 bg-white text-gray-900 hover:border-gray-400 transition-all hover:scale-105">
          Xem bảng giá
        </Link>
      </PageHeader>

      <section className="px-4 md:px-6 -mt-4 md:-mt-8 relative">
        <Reveal className="max-w-[1000px] mx-auto bg-white border border-orange-200 rounded-3xl shadow-xl p-6 md:p-10">
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
            <Lightbulb className="w-4 h-4" /> Tóm tắt
          </p>
          <p className="mt-3 text-base md:text-lg text-gray-800 leading-relaxed">{detail.summary}</p>
        </Reveal>
      </section>

      <Section title={`Vì sao chọn dịch vụ ${detail.name.toLowerCase()} của Nextchain?`}>
        <div className="grid md:grid-cols-3 gap-6">
          {detail.benefits.map((benefit, idx) => (
            <Reveal
              key={benefit.title}
              delay={idx * 0.1}
              className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <span className="w-12 h-12 rounded-xl bg-orange-100 text-primary font-bold text-lg flex items-center justify-center">
                {idx + 1}
              </span>
              <h3 className="mt-5 text-lg font-bold text-gray-900">{benefit.title}</h3>
              <p className="mt-2 text-gray-700 leading-relaxed">{benefit.desc}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {detail.pricing.model === "subscription" ? (
        <Section
          id="bang-gia"
          title="Chi phí theo gói tháng"
          desc="Không phí khởi tạo. Giá đã gồm thiết kế, hosting, SSL và cập nhật nội dung. Dùng địa chỉ miễn phí của Nextchain hoặc kết nối tên miền riêng."
          muted>
          <PricingCards planIds={detail.pricing.planIds} />
          <p className="mt-4 text-center">
            <Link href="/bang-gia" className="font-semibold text-primary hover:underline">
              So sánh tất cả các gói →
            </Link>
          </p>
        </Section>
      ) : (
        <Section
          id="bang-gia"
          title={`Bảng giá ${detail.name.toLowerCase()}`}
          desc="Giá tham khảo theo gói. Liên hệ để được tư vấn chi tiết và báo giá chính xác cho dự án của bạn."
          muted>
          <ProjectPackages serviceKey={detail.pricing.key} />
        </Section>
      )}

      <Section title="Phạm vi công việc">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-2xl p-6 md:p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Bạn nhận được</h3>
            <ul className="space-y-3">
              {detail.deliverables.map((item) => (
                <li key={item} className="flex gap-3 text-gray-800">
                  <Check className="w-5 h-5 shrink-0 text-green-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-gray-200 rounded-2xl p-6 md:p-8 bg-gray-50">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Không bao gồm</h3>
            <ul className="space-y-3">
              {detail.notIncluded.map((item) => (
                <li key={item} className="flex gap-3 text-gray-700">
                  <X className="w-5 h-5 shrink-0 text-gray-400" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-gray-600">
              Cần cập nhật thường xuyên sau bàn giao? Xem{" "}
              <Link href="/dich-vu/quan-tri-website-theo-thang" className="text-primary underline">
                gói quản trị website theo tháng
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>

      <Section title="Quy trình làm việc" muted>
        <ProcessList />
      </Section>

      <FaqSection faqs={detail.faqs} />

      <Section title="Tìm hiểu thêm">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Bài viết & trang liên quan</h3>
            <ul className="space-y-3">
              {detail.related.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group inline-flex items-center gap-2 text-primary hover:underline">
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Dịch vụ khác</h3>
            <ul className="flex flex-wrap gap-2">
              {otherServices.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-700 hover:border-primary hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CtaBanner title={`Bắt đầu dự án ${detail.name.toLowerCase()} của bạn`} />
    </>
  )
}
