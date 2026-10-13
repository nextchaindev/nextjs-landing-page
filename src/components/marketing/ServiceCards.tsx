import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Reveal from "@/components/marketing/Reveal"
import { SERVICE_DETAILS, type ServiceDetail } from "@/content/services"
import { STARTING_PRICE } from "@/content/plans"
import { projectServices } from "@/content/projectPricing"

function startingPrice(detail: ServiceDetail) {
  if (detail.pricing.model === "subscription") {
    return `Từ ${STARTING_PRICE}/tháng`
  }
  return `Từ ${projectServices[detail.pricing.key].packages[0].price}`
}

export default function ServiceCards() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {SERVICE_DETAILS.map((detail, idx) => {
        const Icon = detail.icon
        return (
          <Reveal key={detail.slug} delay={(idx % 3) * 0.1} as="article">
            <Link
              href={`/dich-vu/${detail.slug}`}
              className="group flex flex-col h-full bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={detail.image}
                  alt={detail.imageAlt}
                  sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                <span className={`absolute top-4 left-4 w-11 h-11 rounded-xl ${detail.accent.bg} text-white flex items-center justify-center shadow-lg`}>
                  <Icon className="w-5 h-5" />
                </span>
                <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-white/90 text-xs font-semibold text-gray-800">
                  {startingPrice(detail)}
                </span>
              </div>
              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-xl font-bold text-gray-900">{detail.name}</h3>
                <p className="mt-2 text-gray-600 text-sm leading-relaxed flex-1">{detail.audience}</p>
                <span className={`mt-4 inline-flex items-center gap-2 font-semibold ${detail.accent.text}`}>
                  Xem chi tiết <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        )
      })}
    </div>
  )
}
