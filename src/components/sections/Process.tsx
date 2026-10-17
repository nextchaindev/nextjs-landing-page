"use client"

import { motion } from "motion/react"
import { Target, Lightbulb, Code, Rocket } from "lucide-react"
import { getProcessSteps } from "@/content/process"
import { useDictionary, useLocale } from "@/i18n/LocaleProvider"
import Link from "next/link"
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  useScrollAnimation,
} from "@/hooks/useScrollAnimation"

const colorMap: Record<string, { bg: string; text: string; line: string }> = {
  blue: {
    bg: "bg-gradient-to-r from-blue-400 to-blue-300",
    text: "text-blue-600",
    line: "from-blue-200",
  },
  orange: {
    bg: "bg-gradient-to-r from-orange-400 to-orange-300",
    text: "text-orange-600",
    line: "via-orange-200",
  },
  purple: {
    bg: "bg-gradient-to-r from-purple-400 to-purple-300",
    text: "text-purple-600",
    line: "via-purple-200",
  },
  green: {
    bg: "bg-gradient-to-r from-green-400 to-green-300",
    text: "text-green-600",
    line: "to-green-200",
  },
}

const STEP_STYLES = [
  { icon: Target, color: "blue" },
  { icon: Lightbulb, color: "orange" },
  { icon: Code, color: "purple" },
  { icon: Rocket, color: "green" },
]

export default function Process() {
  const locale = useLocale()
  const { process } = useDictionary()
  const steps = getProcessSteps(locale).map((step, idx) => ({ ...step, ...STEP_STYLES[idx], step: idx + 1 }))
  const { ref: processRef, isVisible: processVisible } = useScrollAnimation(0.1)
  return (
    <section id="process" className="py-20 px-6" ref={processRef}>
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={processVisible ? "visible" : "hidden"}
          variants={fadeInUp}>
          <h2 className="text-2xl md:text-4xl text-gray-900 mb-4">
            {process.heading}
          </h2>
          <p className="text-[16px] md:text-xl text-gray-600">
            {process.subheading}
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-4 gap-8 relative"
          initial="hidden"
          animate={processVisible ? "visible" : "hidden"}
          variants={staggerContainer}>
          <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-linear-to-r from-blue-200 via-orange-200 to-green-200"></div>

          {steps.map((item, idx) => {
            const colors = colorMap[item.color]

            return (
              <motion.div
                key={idx}
                className="relative group"
                variants={staggerItem}>
                <div className="flex flex-row md:flex-col items-start md:items-center md:text-center gap-6">
                  <div className="flex flex-col items-start md:items-center gap-4 md:relative z-10 md:w-full">
                    <div
                      className={`w-20 h-20 ${colors.bg} rounded-2xl flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110 duration-300`}>
                      <item.icon className="w-10 h-10 text-white" />
                    </div>
                    <div
                      className={`text-sm w-full md:w-fit text-center ${colors.text} font-bold tracking-wider uppercase`}>
                      {process.step.replace("{n}", String(item.step))}
                    </div>
                  </div>
                  <div className="md:flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed max-w-[250px] md:mx-auto">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
        {process.moreHref && (
          <p className="mt-12 text-center">
            <Link href={process.moreHref} className="font-semibold text-primary hover:underline">
              {process.moreLink}
            </Link>
          </p>
        )}
      </div>
    </section>
  )
}
