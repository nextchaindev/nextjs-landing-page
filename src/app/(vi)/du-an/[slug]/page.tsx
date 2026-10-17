import Link from "next/link"
import { notFound } from "next/navigation"
import { CheckCircle2 } from "lucide-react"
import PageHeader from "@/components/marketing/PageHeader"
import Section from "@/components/marketing/Section"
import ProjectCards from "@/components/marketing/ProjectCards"
import CtaBanner from "@/components/marketing/CtaBanner"
import ContactButton from "@/components/marketing/ContactButton"
import JsonLdScript from "@/components/marketing/JsonLdScript"
import { pageMetadata } from "@/lib/seo"
import { SITE_URL, absoluteUrl } from "@/lib/site"
import { PROJECTS, getProject } from "@/content/projects"

export const dynamicParams = false

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: PageProps<"/du-an/[slug]">) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return pageMetadata({
    title: project.metaTitle,
    description: project.metaDescription,
    path: `/du-an/${project.slug}`,
    ogImage: project.image.src,
  })
}

export default async function ProjectPage({ params }: PageProps<"/du-an/[slug]">) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()
  const path = `/du-an/${project.slug}`
  const related = PROJECTS.filter((p) => p.slug !== project.slug && p.serviceSlug === project.serviceSlug)
  const others = (related.length >= 3 ? related : [...related, ...PROJECTS.filter((p) => p.slug !== project.slug && !related.includes(p))]).slice(0, 3)

  return (
    <>
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: `${project.name} — ${project.headline}`,
          description: project.metaDescription,
          url: absoluteUrl(path),
          image: absoluteUrl(project.image.src),
          inLanguage: "vi-VN",
          genre: project.kind,
          creator: { "@id": `${SITE_URL}#organization` },
        }}
      />
      <PageHeader
        crumbs={[
          { name: "Dự án", path: "/du-an" },
          { name: project.name, path },
        ]}
        eyebrow={project.kind}
        title={`${project.name}: ${project.headline.charAt(0).toLowerCase()}${project.headline.slice(1)}`}
        intro={project.summary}
        image={project.image}
        imageAlt={project.imageAlt}>
        <ContactButton label="Tư vấn dự án tương tự" context={`dự án giống ${project.name}`} />
        <Link
          href={`/dich-vu/${project.serviceSlug}`}
          className="inline-flex items-center h-12 md:h-14 px-6 md:px-8 rounded-xl font-bold border border-gray-300 text-gray-900 hover:border-gray-400">
          Dịch vụ {project.serviceName}
        </Link>
      </PageHeader>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-gray-200 p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900">Bài toán</h2>
            <p className="mt-3 text-gray-700 leading-relaxed">{project.challenge}</p>
          </article>
          <article className="rounded-2xl border border-orange-200 bg-orange-50/50 p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900">Cách Nextchain giải quyết</h2>
            <p className="mt-3 text-gray-700 leading-relaxed">{project.solution}</p>
          </article>
        </div>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2 text-sm">
          <div className="rounded-xl bg-gray-50 px-5 py-4">
            <dt className="font-semibold text-gray-500">Nền tảng</dt>
            <dd className="mt-1 text-gray-900">{project.platform}</dd>
          </div>
          <div className="rounded-xl bg-gray-50 px-5 py-4">
            <dt className="font-semibold text-gray-500">Công nghệ</dt>
            <dd className="mt-1 text-gray-900">{project.tech.join(", ")}</dd>
          </div>
        </dl>
      </Section>

      <Section title="Tính năng đã bàn giao" muted>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {project.features.map((feature) => (
            <article key={feature.title} className="bg-white border border-gray-200 rounded-2xl p-6">
              <CheckCircle2 className="w-6 h-6 text-primary" />
              <h3 className="mt-3 font-bold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-gray-700 leading-relaxed">{feature.desc}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Dự án khác">
        <ProjectCards projects={others} />
        <p className="mt-10 text-center">
          <Link href="/du-an" className="font-semibold text-primary hover:underline">
            Xem tất cả dự án →
          </Link>
        </p>
      </Section>

      <CtaBanner
        title={`Cần ${project.kind.toLowerCase()} tương tự?`}
        desc="Gửi nhu cầu, Nextchain phản hồi trong 24 giờ làm việc với phương án và chi phí dự kiến."
        secondaryHref={`/dich-vu/${project.serviceSlug}`}
        secondaryLabel={`Xem dịch vụ ${project.serviceName}`}
      />
    </>
  )
}
