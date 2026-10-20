"use client"

import { useState } from "react"
import Reveal from "@/components/marketing/Reveal"
import ProjectCard from "@/components/marketing/ProjectCard"
import { cn } from "@/components/ui/utils"
import { CARD_TEXT } from "@/content/cardText"
import type { Project, ProjectCategory } from "@/content/projects"
import type { Locale } from "@/i18n/config"

type Filter = ProjectCategory | "all"

interface ProjectGalleryProps {
  projects: Project[]
  categories: { id: ProjectCategory; label: string }[]
  locale: Locale
}

/**
 * Toàn bộ dự án kèm bộ lọc theo nhóm (trang /du-an). Lưới dọc trên mobile thay vì carousel vì danh sách dài.
 * Mọi thẻ luôn nằm trong HTML — lọc chỉ ẩn bớt — để crawler thấy đủ liên kết tới từng dự án.
 */
export default function ProjectGallery({ projects, categories, locale }: ProjectGalleryProps) {
  const [filter, setFilter] = useState<Filter>("all")
  const tabs = [
    { id: "all" as const, label: CARD_TEXT[locale].all, count: projects.length },
    ...categories.map((category) => ({
      ...category,
      count: projects.filter((project) => project.category === category.id).length,
    })),
  ].filter((tab) => tab.count > 0)

  return (
    <div>
      <div className="w-full overflow-x-auto scrollbar-hide mb-8 -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex md:flex-wrap md:justify-center gap-3 w-max md:w-full mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              aria-pressed={filter === tab.id}
              onClick={() => setFilter(tab.id)}
              className={cn(
                "inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 text-sm font-medium whitespace-nowrap cursor-pointer transition-colors",
                filter === tab.id
                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/30"
                  : "bg-white border-gray-200 text-gray-600 hover:border-gray-300",
              )}>
              {tab.label}
              <span className={cn("text-xs", filter === tab.id ? "text-white/80" : "text-gray-400")}>{tab.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => (
          <Reveal
            key={project.slug}
            delay={(idx % 3) * 0.1}
            as="article"
            className={cn(filter !== "all" && project.category !== filter && "hidden")}>
            <ProjectCard project={project} locale={locale} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}
