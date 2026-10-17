import Link from "next/link"
import { getDictionary } from "@/i18n/dictionaries"
import { localizePath, type Locale } from "@/i18n/config"

export default function NotFoundView({ locale }: { locale: Locale }) {
  const { notFound } = getDictionary(locale)

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 pt-28 pb-20 bg-linear-to-b from-orange-50/50 to-white">
      <div className="max-w-[640px] text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">{notFound.code}</p>
        <h1 className="mt-3 text-3xl md:text-5xl font-bold text-gray-900 leading-tight">{notFound.heading}</h1>
        <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">{notFound.body}</p>
        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {notFound.links.map((link) => (
            <li key={link.href}>
              <Link
                href={localizePath(link.href, locale)}
                className="inline-flex items-center h-11 px-5 rounded-full border border-gray-300 bg-white font-semibold text-gray-800 hover:border-primary hover:text-primary transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
