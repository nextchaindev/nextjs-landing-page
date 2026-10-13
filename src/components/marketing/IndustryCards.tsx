import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Reveal from "@/components/marketing/Reveal"
import { INDUSTRIES } from "@/content/industries"
import { STARTING_PRICE } from "@/content/plans"

export default function IndustryCards() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {INDUSTRIES.map((industry, idx) => (
        <Reveal key={industry.slug} delay={idx * 0.1} as="article">
          <Link
            href={`/giai-phap/${industry.slug}`}
            className="group flex flex-col h-full bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={industry.image}
                alt={industry.imageAlt}
                placeholder="blur"
                sizes="(min-width: 768px) 380px, 100vw"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold">{industry.name}</h3>
                <p className="mt-1 text-sm text-white/85">{industry.audience}</p>
              </div>
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 text-xs font-semibold text-gray-800">
                Từ {STARTING_PRICE}/tháng
              </span>
            </div>
            <div className="flex flex-col flex-1 p-6">
              <p className="text-gray-700 leading-relaxed flex-1">{industry.problems[0].desc}</p>
              <span className="mt-5 inline-flex items-center gap-2 font-semibold text-primary">
                Xem giải pháp {industry.shortName.toLowerCase()}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  )
}
