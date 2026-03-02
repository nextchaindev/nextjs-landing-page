"use client"

import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "motion/react"
import { CheckCircle2, ArrowRight, Clock } from "lucide-react"
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
} from "@/hooks/useScrollAnimation"
import { services, colorClasses } from "@/constants/services"

import { useModal } from "@/context/ModalContext"

interface ServicesProps {
  // selectedService: string
  // setSelectedService: (service: string) => void
  pricingCarouselRef: React.RefObject<HTMLDivElement | null>
  servicesRef: React.RefObject<HTMLDivElement | null>
  servicesVisible: boolean
}

export default function Services({
  // selectedService,
  // setSelectedService,
  pricingCarouselRef,
  servicesRef,
  servicesVisible,
}: ServicesProps) {
  const { openModal, keyService, setKeyService } = useModal()

  const openModalWithService = (
    serviceName: string,
    packageName: string,
    price: string,
  ) => {
    openModal({
      message: `Tôi quan tâm đến gói ${serviceName} - ${packageName} (${price}đ). `,
    })
  }

  const currentService = services[keyService as keyof typeof services]
  const colorTheme =
    colorClasses[currentService.color as keyof typeof colorClasses]

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
      id="services"
      className="py-20 px-4 md:px-6 bg-white"
      ref={servicesRef}>
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={servicesVisible ? "visible" : "hidden"}
          variants={fadeInUp}>
          <h2 className="text-2xl md:text-4xl font-medium text-gray-900 mb-6 leading-tight">
            Bảng giá dịch vụ chi tiết
          </h2>
          <p className="text-[16px] md:text-xl text-gray-600 max-w-2xl mx-auto">
            Chọn gói phù hợp với nhu cầu và ngân sách của bạn
          </p>
        </motion.div>

        <div className="w-full overflow-x-auto scrollbar-hide">
          <div className="w-fit md:w-full flex flex-nowrap items-center  md:flex-wrap justify-center gap-4">
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
                className={`flex items-center gap-3 p-2 rounded-2xl border-2 ${
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

        <div className="w-full overflow-x-auto scrollbar-hide">
          <div
            ref={pricingCarouselRef}
            className="flex flex-nowrap justify-center gap-6 h-fit  pb-8 md:pb-0 pt-15 md:pt-12">
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
                      className={`min-w-[300px] md:min-w-0 snap-center rounded-2xl p-8 lg:p-10 relative flex flex-col bg-white border border-gray-100 text-gray-900 shadow-sm`}
                      whileHover={{
                        y: -12,
                        boxShadow:
                          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        borderColor:
                          currentService.color === "orange"
                            ? "var(--color-orange-200)"
                            : `var(--color-${currentService.color}-200)`,
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        },
                      }}
                      variants={staggerItem}>
                      {pkg.popular && (
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-linear-to-r from-[#FFB900] to-[#FF8904] text-white text-[10px] md:text-xs font-semibold px-6 py-2 rounded-full uppercase tracking-widest shadow-lg whitespace-nowrap">
                          Phổ biến nhất
                        </div>
                      )}

                      <div className="mb-8 flex flex-col gap-2 items-center">
                        <h3 className="text-2xl font-bold">{pkg.name}</h3>
                        <p className="text-sm opacity-60 font-medium text-center">
                          {pkg.description}
                        </p>
                        <p className={`text-4xl font-bold ${colorTheme.text}`}>
                          {pkg.price}đ
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
                          Tư vấn ngay
                        </Button>
                      </motion.div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <p className="text-center text-[16px] text-gray-600 mt-8">
          Các gói giá trên là mức tham khảo. Liên hệ với chúng tôi để được tư
          vấn chi tiết và báo giá chính xác cho dự án của bạn.
        </p>
      </div>
    </section>
  )
}
