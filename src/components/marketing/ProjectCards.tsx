import Reveal from "@/components/marketing/Reveal"
import ProjectCard from "@/components/marketing/ProjectCard"
import { MOBILE_CAROUSEL, MOBILE_CAROUSEL_ITEM } from "@/components/marketing/carousel"
import { getProjects, type Project } from "@/content/projects"
import type { Locale } from "@/i18n/config"

/** Hàng thẻ dự án ngắn (trang chủ, "Dự án khác"): carousel vuốt ngang trên mobile. Trang /du-an dùng ProjectGallery. */
export default function ProjectCards({ projects, locale = "vi" }: { projects?: Project[]; locale?: Locale }) {
  const items = projects ?? getProjects(locale)
  return (
    <div className={`${MOBILE_CAROUSEL} md:grid-cols-2 lg:grid-cols-3`}>
      {items.map((project, idx) => (
        <Reveal key={project.slug} delay={(idx % 3) * 0.1} as="article" className={MOBILE_CAROUSEL_ITEM}>
          <ProjectCard project={project} locale={locale} />
        </Reveal>
      ))}
    </div>
  )
}
