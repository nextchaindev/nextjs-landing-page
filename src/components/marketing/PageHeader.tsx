import Image, { type StaticImageData } from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import JsonLdScript from "@/components/marketing/JsonLdScript"
import Reveal from "@/components/marketing/Reveal"
import { breadcrumbSchema, type Crumb } from "@/lib/seo"
import { cn } from "@/components/ui/utils"
import { getDictionary } from "@/i18n/dictionaries"
import { localizePath, type Locale } from "@/i18n/config"

interface PageHeaderProps {
  title: string
  intro?: string
  eyebrow?: string
  /** Trail excluding the home crumb; the last item is the current page. */
  crumbs: Crumb[]
  image?: StaticImageData
  imageAlt?: string
  locale?: Locale
  children?: React.ReactNode
}

export default function PageHeader({
  title,
  intro,
  eyebrow,
  crumbs,
  image,
  imageAlt = "",
  locale = "vi",
  children,
}: PageHeaderProps) {
  const trail: Crumb[] = [{ name: getDictionary(locale).common.home, path: localizePath("/", locale) }, ...crumbs]

  return (
    <section className="relative overflow-hidden pt-24 md:pt-36 pb-12 md:pb-20 px-4 md:px-6 bg-linear-to-b from-orange-50/50 to-white">
      <JsonLdScript data={breadcrumbSchema(trail)} />
      <div className="pointer-events-none absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full bg-[#FFD6A8]/40 blur-[120px]" />
      <div className="pointer-events-none absolute top-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#BEDBFF]/40 blur-[120px]" />

      <div
        className={cn(
          "relative max-w-[1200px] mx-auto",
          image && "grid md:grid-cols-2 gap-10 md:gap-16 items-center",
        )}>
        <Reveal>
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
              {trail.map((crumb, idx) => {
                const isLast = idx === trail.length - 1
                return (
                  <li key={crumb.path} className="inline-flex items-center gap-1.5">
                    {isLast ? (
                      <span aria-current="page" className="text-gray-900 line-clamp-1">
                        {crumb.name}
                      </span>
                    ) : (
                      <>
                        <Link href={crumb.path} className="hover:text-primary">
                          {crumb.name}
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>
          {eyebrow && (
            <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-orange-100 text-orange-700 text-sm font-medium">
              {eyebrow}
            </span>
          )}
          <h1 className="text-[28px] md:text-[44px] leading-tight font-bold text-gray-900 max-w-[860px]">
            {title}
          </h1>
          {intro && (
            <p className="mt-4 md:mt-6 text-base md:text-xl text-gray-700 leading-relaxed max-w-[760px]">
              {intro}
            </p>
          )}
          {children && <div className="mt-8 flex flex-wrap gap-3 md:gap-4">{children}</div>}
        </Reveal>

        {image && (
          <Reveal delay={0.15} className="relative">
            <div className="absolute -inset-4 bg-linear-to-br from-orange-200 to-orange-100 rounded-3xl rotate-2 opacity-40" />
            <div className="relative bg-white rounded-2xl shadow-2xl p-2 md:p-3">
              <Image
                src={image}
                alt={imageAlt}
                priority
                sizes="(min-width: 768px) 560px, 100vw"
                className="rounded-xl w-full h-auto object-cover"
              />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
