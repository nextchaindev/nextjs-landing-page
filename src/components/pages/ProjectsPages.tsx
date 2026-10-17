import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import PageHeader from "@/components/marketing/PageHeader"
import Section from "@/components/marketing/Section"
import ProjectCards from "@/components/marketing/ProjectCards"
import CtaBanner from "@/components/marketing/CtaBanner"
import ContactButton from "@/components/marketing/ContactButton"
import JsonLdScript from "@/components/marketing/JsonLdScript"
import { pageMetadata } from "@/lib/seo"
import { SITE_URL, absoluteUrl } from "@/lib/site"
import { getProjectFor, getProjects } from "@/content/projects"
import { PROJECTS_COPY } from "@/content/pageCopy/projects"
import { LANGUAGE_TAGS, type NonDefaultLocale } from "@/i18n/config"
import { sectionPath } from "@/i18n/paths"
import { localizeHref } from "@/i18n/routes"

export function projectsIndexMetadata(locale: NonDefaultLocale) {
  const copy = PROJECTS_COPY[locale].index
  return pageMetadata({
    title: copy.metaTitle,
    description: copy.metaDescription,
    path: sectionPath("projects", locale),
    locale,
  })
}

export function ProjectsIndexPage({ locale }: { locale: NonDefaultLocale }) {
  const copy = PROJECTS_COPY[locale].index
  const path = sectionPath("projects", locale)

  return (
    <>
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: copy.listName,
          itemListElement: getProjects(locale).map((project, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            url: absoluteUrl(sectionPath("projects", locale, project.slug)),
            name: project.headline,
          })),
        }}
      />
      <PageHeader
        locale={locale}
        crumbs={[{ name: copy.crumb, path }]}
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
      />
      <Section>
        <ProjectCards locale={locale} />
      </Section>
      <CtaBanner
        locale={locale}
        title={copy.ctaTitle}
        desc={copy.ctaDesc}
        secondaryHref={sectionPath("services", locale)}
        secondaryLabel={copy.ctaSecondary}
      />
    </>
  )
}

export function projectStaticParams(locale: NonDefaultLocale) {
  return getProjects(locale).map((project) => ({ slug: project.slug }))
}

export function projectDetailMetadata(locale: NonDefaultLocale, slug: string) {
  const project = getProjectFor(locale, slug)
  if (!project) return {}
  return pageMetadata({
    title: project.metaTitle,
    description: project.metaDescription,
    path: sectionPath("projects", locale, project.slug),
    ogImage: project.image.src,
    locale,
  })
}

export function ProjectDetailPage({ locale, slug }: { locale: NonDefaultLocale; slug: string }) {
  const project = getProjectFor(locale, slug)
  if (!project) return null
  const copy = PROJECTS_COPY[locale].detail
  const path = sectionPath("projects", locale, project.slug)
  const all = getProjects(locale)
  const related = all.filter((p) => p.slug !== project.slug && p.serviceSlug === project.serviceSlug)
  const others = (
    related.length >= 3 ? related : [...related, ...all.filter((p) => p.slug !== project.slug && !related.includes(p))]
  ).slice(0, 3)
  // serviceSlug là slug tiếng Việt; dịch vụ này có thể chưa có bản dịch → khi đó bỏ nút/đích liên kết.
  const servicePath = localizeHref(`/dich-vu/${project.serviceSlug}`, locale)

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
          inLanguage: LANGUAGE_TAGS[locale],
          genre: project.kind,
          creator: { "@id": `${SITE_URL}#organization` },
        }}
      />
      <PageHeader
        locale={locale}
        crumbs={[
          { name: PROJECTS_COPY[locale].index.crumb, path: sectionPath("projects", locale) },
          { name: project.name, path },
        ]}
        eyebrow={project.kind}
        title={`${project.name}: ${project.headline.charAt(0).toLowerCase()}${project.headline.slice(1)}`}
        intro={project.summary}
        image={project.image}
        imageAlt={project.imageAlt}>
        <ContactButton label={copy.consult} context={copy.consultContext.replace("{name}", project.name)} />
        {servicePath && (
          <Link
            href={servicePath}
            className="inline-flex items-center h-12 md:h-14 px-6 md:px-8 rounded-xl font-bold border border-gray-300 text-gray-900 hover:border-gray-400">
            {copy.serviceButton.replace("{name}", project.serviceName)}
          </Link>
        )}
      </PageHeader>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-gray-200 p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900">{copy.challenge}</h2>
            <p className="mt-3 text-gray-700 leading-relaxed">{project.challenge}</p>
          </article>
          <article className="rounded-2xl border border-orange-200 bg-orange-50/50 p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900">{copy.solution}</h2>
            <p className="mt-3 text-gray-700 leading-relaxed">{project.solution}</p>
          </article>
        </div>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2 text-sm">
          <div className="rounded-xl bg-gray-50 px-5 py-4">
            <dt className="font-semibold text-gray-500">{copy.platform}</dt>
            <dd className="mt-1 text-gray-900">{project.platform}</dd>
          </div>
          <div className="rounded-xl bg-gray-50 px-5 py-4">
            <dt className="font-semibold text-gray-500">{copy.tech}</dt>
            <dd className="mt-1 text-gray-900">{project.tech.join(", ")}</dd>
          </div>
        </dl>
      </Section>

      <Section title={copy.featuresTitle} muted>
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

      {others.length > 0 && (
        <Section title={copy.othersTitle}>
          <ProjectCards projects={others} locale={locale} />
          <p className="mt-10 text-center">
            <Link href={sectionPath("projects", locale)} className="font-semibold text-primary hover:underline">
              {copy.viewAll}
            </Link>
          </p>
        </Section>
      )}

      <CtaBanner
        locale={locale}
        title={copy.ctaTitle.replace("{kind}", project.kind.toLowerCase())}
        desc={copy.ctaDesc}
        secondaryHref={servicePath ?? sectionPath("services", locale)}
        secondaryLabel={copy.ctaSecondary.replace("{name}", project.serviceName)}
      />
    </>
  )
}
