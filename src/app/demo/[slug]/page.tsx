import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { TEMPLATES } from "@/content/templates"
import { getIndustry } from "@/content/industries"

const demos = TEMPLATES.filter((template) => template.demoUrl)

export const dynamicParams = false

export function generateStaticParams() {
  return demos.map((template) => ({ slug: template.slug }))
}

export async function generateMetadata({ params }: PageProps<"/demo/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const template = demos.find((item) => item.slug === slug)
  if (!template) return { robots: { index: false, follow: false } }
  return {
    title: `Bản demo minh họa ${template.name}`,
    description: "Bản demo minh họa bố cục, không phải website của khách hàng thật.",
    robots: { index: false, follow: false },
  }
}

export default async function DemoPage({ params }: PageProps<"/demo/[slug]">) {
  const { slug } = await params
  const template = demos.find((item) => item.slug === slug)
  const industry = template?.industrySlug ? getIndustry(template.industrySlug) : undefined
  if (!template || !industry) notFound()

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-gray-900">
      <div className="bg-gray-900 px-4 py-3 text-center text-sm text-white">
        Bản demo minh họa. Hình ảnh và nội dung chưa phải của khách hàng.
        <Link href={`/mau-website/${template.slug}`} className="ml-2 font-semibold underline underline-offset-4">
          Xem giải pháp Nextchain
        </Link>
      </div>
      <div className="mx-auto max-w-6xl px-5">
        <header className="flex flex-wrap items-center justify-between gap-4 py-6">
          <span className="text-xl font-bold tracking-tight">{template.name}</span>
          <nav aria-label="Mục trong bản demo" className="flex gap-5 text-sm font-medium">
            <a href="#dich-vu">Dịch vụ</a>
            <a href="#ve-chung-toi">Giới thiệu</a>
            <a href="#lien-he">Liên hệ</a>
          </nav>
        </header>
        <section className="grid items-center gap-8 py-8 md:grid-cols-2 md:py-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-orange-700">{template.style}</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">{industry.shortName}: nơi khách tìm đúng điều họ cần</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-700">{industry.intro}</p>
            <a href="#lien-he" className="mt-7 inline-flex rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700">
              Xem cách liên hệ
            </a>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image src={template.image} alt={template.imageAlt} fill priority sizes="(min-width: 768px) 540px, 100vw" className="object-cover" />
          </div>
        </section>
        <section id="dich-vu" className="py-14">
          <h2 className="text-3xl font-bold">Thông tin khách thường muốn xem</h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industry.pages.slice(0, 6).map((page) => (
              <article key={page.title} className="rounded-2xl border border-gray-200 bg-white p-6">
                <h3 className="text-lg font-bold">{page.title}</h3>
                <p className="mt-3 leading-relaxed text-gray-700">{page.desc}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="ve-chung-toi" className="max-w-3xl py-14">
          <h2 className="text-3xl font-bold">Vì sao cần một trang riêng?</h2>
          {industry.problems.map((problem) => (
            <div key={problem.title} className="mt-6 border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold">{problem.title}</h3>
              <p className="mt-2 text-gray-700">{problem.desc}</p>
            </div>
          ))}
        </section>
        <section id="lien-he" className="mb-12 rounded-3xl bg-orange-100 p-8 md:p-12">
          <h2 className="text-3xl font-bold">Bản demo kết thúc tại đây</h2>
          <p className="mt-3 max-w-2xl text-gray-700">Trang thực tế sẽ sử dụng thông tin, hình ảnh và nút liên hệ của doanh nghiệp bạn. Đây chỉ là minh họa bố cục, không thu thập yêu cầu đặt lịch.</p>
          <Link href={`/mau-website/${template.slug}`} className="mt-6 inline-flex font-semibold text-orange-800 underline underline-offset-4">
            Xem chi tiết mẫu và tư vấn triển khai
          </Link>
        </section>
      </div>
    </main>
  )
}
