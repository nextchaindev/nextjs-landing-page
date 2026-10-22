import Image from "next/image"
import { Eye } from "lucide-react"
import Reveal from "@/components/marketing/Reveal"
import { CARD_TEXT } from "@/content/cardText"
import { getDemoTemplates } from "@/content/templates"
import type { Locale } from "@/i18n/config"

/** Thẻ mẫu website có bản demo bên ngoài; `slugs` là slug tiếng Việt trong content/templates.ts. */
export default function DemoCards({ slugs, locale = "vi" }: { slugs: string[]; locale?: Locale }) {
  const text = CARD_TEXT[locale]

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {getDemoTemplates(locale, slugs).map((template, idx) => (
        <Reveal
          key={template.slug}
          as="article"
          delay={idx * 0.1}
          className="group relative flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={template.image}
              alt={template.imageAlt}
              placeholder="blur"
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div className="flex flex-col flex-1 p-6">
            <h3 className="text-lg font-bold text-gray-900">{template.name}</h3>
            <p className="mt-1 text-sm text-primary font-medium">{template.style}</p>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed flex-1">{template.description}</p>
            <a
              href={template.demoUrl}
              target="_blank"
              rel="noopener"
              className="mt-5 self-start inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 group-hover:border-primary group-hover:text-primary transition-colors after:absolute after:inset-0">
              <Eye className="w-4 h-4" /> {text.viewDemo}
            </a>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
