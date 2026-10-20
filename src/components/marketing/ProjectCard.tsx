import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Project } from "@/content/projects"
import { CARD_TEXT } from "@/content/cardText"
import { sectionPath } from "@/i18n/paths"
import type { Locale } from "@/i18n/config"

/** Thẻ một dự án — dùng chung cho ProjectCards (server) và ProjectGallery (client, có bộ lọc). */
export default function ProjectCard({ project, locale }: { project: Project; locale: Locale }) {
  const text = CARD_TEXT[locale]
  return (
    <Link
      href={sectionPath("projects", locale, project.slug)}
      className="group flex flex-col h-full bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative aspect-video overflow-hidden bg-stone-100">
        <Image
          src={project.image}
          alt={project.imageAlt}
          placeholder="blur"
          sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 text-xs font-semibold text-gray-800 shadow-sm">
          {project.kind}
        </span>
        {project.ownProduct && (
          <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-xs font-semibold text-white shadow-sm">
            {text.ownProduct}
          </span>
        )}
      </div>
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
        <p className="mt-1 text-sm font-medium text-primary">{project.headline}</p>
        <p className="mt-3 text-gray-700 leading-relaxed flex-1">{project.summary}</p>
        <span className="mt-5 inline-flex items-center gap-2 font-semibold text-primary">
          {text.viewProject}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
