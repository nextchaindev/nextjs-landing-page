"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "motion/react"
import { CheckCircle2, Clock } from "lucide-react"
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  useScrollAnimation,
} from "@/hooks/useScrollAnimation"
import { getProjectServices, colorClasses } from "@/content/projectPricing"
import { SERVICE_DETAILS } from "@/content/services"

import { useModal } from "@/context/ModalContext"
import { useDictionary, useLocale } from "@/i18n/LocaleProvider"

interface ServicesProps {
  title?: string
  desc?: string
}

/** Tabbed project pricing (Basic/Premium/Professional) for the larger services. */
export default function Services({ title, desc }: ServicesProps) {
  const locale = useLocale()
  const { projectPricing } = useDictionary()
  const services = getProjectServices(locale)
  title ??= projectPricing.defaultTitle
  desc ??= projectPricing.defaultDesc
  const { openModal, keyService, setKeyService } = useModal()
  const pricingCarouselRef = useRef<HTMLDivElement>(null)
  const { ref: servicesRef, isVisible: servicesVisible } = useScrollAnimation(0.1)

  const openModalWithService = (
    serviceName: string,
    packageName: string,
    price: string,
  ) => {
    openModal({
      message: projectPricing.interest
        .replace("{service}", serviceName)
        .replace("{package}", packageName)
        .replace("{price}", price),
    })
  }

  const currentService = services[keyService as keyof typeof services] ?? services.corporate
  // Trang chi tiết dịch vụ chỉ có bản tiếng Việt cho tới khi được dịch (issue #26).
  const detailPath =
    locale === "vi"
      ? `/dich-vu/${
          SERVICE_DETAILS.find(
            (detail) => detail.pricing.model === "project" && detail.pricing.key === keyService,
          )?.slug ?? ""
        }`
      : null
  const colorTheme =
    colorClasses[currentService.color as keyof typeof colorClasses]

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= 768) return

    let rafId: number
    let attempts = 0

    const scrollToPopular = () => {
      const carouselContainer = pricingCarouselRef.current
      if (!carouselContainer) return

      const popularEl = carouselContainer.querySelector(
        `.popular-${keyService}`,
      ) as HTMLElement
      if (popularEl) {
        const scrollableParent = carouselContainer.parentElement
        if (scrollableParent) {
          const parentRect = scrollableParent.getBoundingClientRect()
          const elRect = popularEl.getBoundingClientRect()
          const scrollLeft =
            scrollableParent.scrollLeft +
            (elRect.left - parentRect.left) -
            parentRect.width / 2 +
            elRect.width / 2
          scrollableParent.scrollTo({ left: scrollLeft, behavior: "smooth" })
        }
      } else if (attempts < 50) {
        attempts++
        rafId = requestAnimationFrame(scrollToPopular)
      }
    }

    rafId = requestAnimationFrame(scrollToPopular)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [keyService, pricingCarouselRef])

  const reorderedPackages = (() => {
    const packages = [...currentService.packages]
    const popularIndex = packages.findIndex((pkg) => pkg.popular)
    if (popularIndex !== -1 && packages.length === 3) {
      if (popularIndex === 0) {
        return [packages[1], packages[0], packages[2]]
      } else if (popularIndex === 2) {
        return [packages[0], packages[2], packages[1]]
      }
    }
    return packages
  })()

  return (
    <section
      id="bang-gia-du-an"
      className="py-20 px-4 md:px-6 bg-gray-50"
      ref={servicesRef}>
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={servicesVisible ? "visible" : "hidden"}
          variants={fadeInUp}>
          <h2 className="text-2xl md:text-4xl font-medium text-gray-900 mb-6 leading-tight">
            {title}
          </h2>
          <p className="text-[16px] md:text-xl text-gray-600 max-w-2xl mx-auto">
            {desc}
          </p>
        </motion.div>

        <div className="w-full overflow-x-auto scrollbar-hide mb-5">
          <div className="w-fit md:w-full flex flex-nowrap items-center md:flex-wrap justify-center gap-4">
            {Object.entries(services).map(([key, service]) => (
              <motion.button
                key={key}
                onClick={(e) => {
                  setKeyService(key)
                  e.currentTarget.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center",
                  })
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-3 p-2 rounded-2xl border-2 cursor-pointer ${
                  keyService === key
                    ? `${
                        colorClasses[service.color as keyof typeof colorClasses]
                          .border
                      } ${
                        colorClasses[service.color as keyof typeof colorClasses]
                          .bg
                      } text-white shadow-xl`
                    : "bg-white border-gray-100 text-gray-500 hover:border-gray-200 hover:bg-gray-50"
                }`}>
                <service.icon
                  className={`w-4 h-4 ${
                    keyService === key ? "text-white" : ""
                  }`}
                />
                <span className="whitespace-nowrap font-medium text-sm">
                  {service.name}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="w-full overflow-x-auto scrollbar-hide h-fit snap-x snap-mandatory">
          <div
            ref={pricingCarouselRef}
            className="flex flex-nowrap justify-center md:grid grid-cols-3 max-w-[1400px] mx-auto gap-6 h-fit pb-12 pt-12 w-fit md:w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={keyService}
                className="contents"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}>
                {reorderedPackages.map((pkg, idx) => {
                  return (
                    <motion.div
                      key={`${keyService}-${pkg.name}`}
                      style={{
                        borderColor: pkg.popular
                          ? colorTheme.borderPopular
                          : "",
                      }}
                      className={`min-w-[300px] md:min-w-0 rounded-2xl relative flex flex-col bg-white border-2 border-gray-200 text-gray-900 shadow-sm p-8 md:p-6 lg:p-10 ${pkg.popular ? `popular-${keyService} md:scale-105 md:snap-start snap-center` : "snap-center"}`}
                      whileHover={{
                        y: -12,
                        boxShadow:
                          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        },
                      }}
                      variants={staggerItem}>
                      {pkg.popular && (
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-linear-to-r from-[#FFB900] to-[#FF8904] text-white text-[10px] md:text-xs font-semibold px-6 py-2 rounded-full uppercase tracking-widest shadow-lg whitespace-nowrap">
                          {projectPricing.popular}
                        </div>
                      )}

                      <div className="mb-8 flex flex-col gap-2 items-center">
                        <h3 className="text-2xl font-bold">{pkg.name}</h3>
                        <p className="text-sm opacity-60 font-medium text-center">
                          {pkg.description}
                        </p>
                        <p
                          className={`text-3xl md:text-lg lg:text-4xl font-bold ${colorTheme.text}`}>
                          {pkg.price}
                        </p>
                        <div className="text-sm opacity-60 font-medium flex items-center gap-2 w-fit">
                          <Clock size={16} />
                          <span>{pkg.duration}</span>
                        </div>
                      </div>

                      <div className="space-y-4 mb-8">
                        {pkg.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <CheckCircle2
                              className={`w-5 h-5 shrink-0 mt-0.5 ${colorTheme.text}`}
                            />
                            <span className="text-sm font-medium leading-relaxed">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}>
                        <Button
                          className={`cursor-pointer w-full py-5 md:py-7 text-lg font-bold rounded-2xl border ${
                            pkg.popular
                              ? `${colorTheme.bg} ${colorTheme.hover} text-white shadow-xl ${colorTheme.bg.replace("bg-", "shadow-")}/20 ${colorTheme.border.replace("border-", "border-")}`
                              : `${colorTheme.text} bg-white hover:bg-white ${colorTheme.border}`
                          }`}
                          onClick={() =>
                            openModalWithService(
                              currentService.name,
                              pkg.name,
                              pkg.price,
                            )
                          }>
                          {projectPricing.cta}
                        </Button>
                      </motion.div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        {detailPath && (
          <p className="text-center mt-4">
            <Link href={detailPath} className={`font-semibold hover:underline ${colorTheme.text}`}>
              {projectPricing.detailLink.replace("{service}", currentService.name)}
            </Link>
          </p>
        )}
        <p className="text-center text-[16px] text-gray-600 mt-4">
          {projectPricing.note}
        </p>
      </div>
    </section>
  )
}
