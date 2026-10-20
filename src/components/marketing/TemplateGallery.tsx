"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, Eye } from "lucide-react"
import { useModal } from "@/context/ModalContext"
import { getTemplates, TEMPLATE_CATEGORIES, TEMPLATE_CATEGORY_LABELS, type TemplateCategory } from "@/content/templates"
import { CARD_TEXT } from "@/content/cardText"
import { sectionPath } from "@/i18n/paths"
import { useLocale } from "@/i18n/LocaleProvider"
import { cn } from "@/components/ui/utils"
import { MOBILE_CAROUSEL, MOBILE_CAROUSEL_ITEM } from "@/components/marketing/carousel"

type Filter = TemplateCategory | "all"

/** Filterable gallery of reference templates. All cards render in the HTML; filtering only hides. */
/** `carousel` swipes horizontally on mobile (homepage preview); the full gallery page stays a grid. */
export default function TemplateGallery({ limit, carousel }: { limit?: number; carousel?: boolean }) {
  const [filter, setFilter] = useState<Filter>("all")
  const { openModal } = useModal()
  const locale = useLocale()
  const text = CARD_TEXT[locale]

  const visible = getTemplates(locale).filter((template) => filter === "all" || template.category === filter).slice(
    0,
    limit,
  )
  const categoryLabel = (id: TemplateCategory) =>
    locale === "vi" ? TEMPLATE_CATEGORIES.find((category) => category.id === id)?.label : TEMPLATE_CATEGORY_LABELS[locale][id]
  const categories = TEMPLATE_CATEGORIES.map((category) => ({ id: category.id, label: categoryLabel(category.id) }))

  return (
    <div>
      <div className="w-full overflow-x-auto scrollbar-hide mb-8">
        <div className="flex md:flex-wrap md:justify-center gap-3 w-max md:w-full mx-auto">
          {[{ id: "all" as const, label: text.all }, ...categories].map((category) => (
            <motion.button
              key={category.id}
              type="button"
              onClick={() => setFilter(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "px-5 py-2.5 rounded-full border-2 text-sm font-medium whitespace-nowrap cursor-pointer transition-colors",
                filter === category.id
                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/30"
                  : "bg-white border-gray-200 text-gray-600 hover:border-gray-300",
              )}>
              {category.label}
            </motion.button>
          ))}
        </div>
      </div>

      <motion.div layout className={carousel ? `${MOBILE_CAROUSEL} md:grid-cols-2 lg:grid-cols-3` : "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"}>
        <AnimatePresence mode="popLayout">
          {visible.map((template) => (
            <motion.article
              key={template.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "group relative flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300",
                carousel && MOBILE_CAROUSEL_ITEM,
              )}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={template.image}
                  alt={template.imageAlt}
                  placeholder="blur"
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 text-xs font-semibold text-gray-800">
                  {text.sampleBadge}
                </span>
                <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-primary text-xs font-semibold text-white">
                  {categoryLabel(template.category)}
                </span>
              </div>
              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-lg font-bold text-gray-900">{template.name}</h3>
                <p className="mt-1 text-sm text-primary font-medium">{template.style}</p>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed flex-1">{template.description}</p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  {template.industrySlug ? (
                    <Link
                      href={sectionPath("templates", locale, template.slug)}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary after:absolute after:inset-0">
                      {text.viewDetails} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  ) : (
                    <span />
                  )}
                  {template.demoUrl ? (
                    <Link
                      href={template.demoUrl}
                      target="_blank"
                      rel="noopener"
                      className="relative z-10 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:border-primary hover:text-primary transition-colors">
                      <Eye className="w-4 h-4" /> {text.viewDemo}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openModal({ message: text.consultMessage.replace("{name}", template.name) })}
                      className="relative z-10 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:border-primary hover:text-primary transition-colors cursor-pointer">
                      <Eye className="w-4 h-4" /> {text.consultLayout}
                    </button>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
