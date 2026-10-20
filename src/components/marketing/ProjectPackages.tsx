"use client"

import { motion } from "motion/react"
import { CheckCircle2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useModal } from "@/context/ModalContext"
import { colorClasses, getProjectServices, type ProjectServiceKey } from "@/content/projectPricing"
import { useDictionary, useLocale } from "@/i18n/LocaleProvider"
import { staggerContainer, staggerItem } from "@/hooks/useScrollAnimation"
import { cn } from "@/components/ui/utils"

/** Basic / Premium / Professional project packages for one larger service. */
export default function ProjectPackages({ serviceKey }: { serviceKey: ProjectServiceKey }) {
  const { openModal } = useModal()
  const locale = useLocale()
  const { projectPricing } = useDictionary()
  const service = getProjectServices(locale)[serviceKey]
  const theme = colorClasses[service.color]

  return (
    <motion.div
      className="grid md:grid-cols-3 gap-6 pt-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      variants={staggerContainer}>
      {service.packages.map((pkg) => {
        const popular = "popular" in pkg && pkg.popular
        return (
          <motion.div
            key={pkg.name}
            variants={staggerItem}
            whileHover={{ y: -10, transition: { type: "spring", stiffness: 400, damping: 17 } }}
            style={{ borderColor: popular ? theme.borderPopular : undefined }}
            className={cn(
              "relative flex flex-col rounded-2xl bg-white border-2 border-gray-200 p-8 shadow-sm hover:shadow-xl transition-shadow",
              popular && "md:scale-105",
            )}>
            {popular && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-linear-to-r from-[#FFB900] to-[#FF8904] text-white text-xs font-semibold px-6 py-2 rounded-full uppercase tracking-widest shadow-lg whitespace-nowrap">
                {projectPricing.popular}
              </div>
            )}
            <div className="mb-8 flex flex-col gap-2 items-center text-center">
              <h3 className="text-2xl font-bold text-gray-900">{pkg.name}</h3>
              <p className="text-sm text-gray-500 font-medium">{pkg.description}</p>
              <p className={cn("text-3xl lg:text-4xl font-bold", theme.text)}>{pkg.price}</p>
              <p className="text-sm text-gray-500 font-medium flex items-center gap-2">
                <Clock size={16} /> {pkg.duration}
              </p>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckCircle2 className={cn("w-5 h-5 shrink-0 mt-0.5", theme.text)} />
                  <span className="text-sm font-medium leading-relaxed text-gray-800">{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              onClick={() =>
                openModal({
                  message: projectPricing.interest
                    .replace("{service}", service.name)
                    .replace("{package}", pkg.name)
                    .replace("{price}", pkg.price),
                })
              }
              className={cn(
                "cursor-pointer w-full py-6 text-lg font-bold rounded-2xl border",
                popular
                  ? `${theme.bg} ${theme.hover} text-white shadow-xl`
                  : `${theme.text} bg-white hover:bg-white ${theme.border}`,
              )}>
              {projectPricing.cta}
            </Button>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
