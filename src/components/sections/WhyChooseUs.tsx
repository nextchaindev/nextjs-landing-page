"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { CheckCircle2, Crown, Target, Zap, Heart } from "lucide-react"
import { fadeInUp } from "@/hooks/useScrollAnimation"
import { useDictionary } from "@/i18n/LocaleProvider"

const FEATURE_STYLES = [
  {
    icon: Crown,
    iconBg: "bg-[#FFEDD4]",
    iconColor: "text-[#F54900]",
    statBg: "bg-[#FFF7ED]",
    statColor: "text-[#F54900]",
  },
  {
    icon: Target,
    iconBg: "bg-[#DCFCE7]",
    iconColor: "text-[#008236]",
    statBg: "bg-[#F0FDF4]",
    statColor: "text-[#00A63E]",
  },
  {
    icon: Zap,
    iconBg: "bg-[#DBEAFE]",
    iconColor: "text-[#155DFC]",
    statBg: "bg-[#EFF6FF]",
    statColor: "text-[#155DFC]",
  },
  {
    icon: Heart,
    iconBg: "bg-[#FCE7F3]",
    iconColor: "text-[#E60076]",
    statBg: "bg-[#FDF2F8]",
    statColor: "text-[#E60076]",
  },
]

export default function WhyChooseUs() {
  const { why } = useDictionary()
  const features = why.features.map((feature, idx) => ({ ...feature, ...FEATURE_STYLES[idx] }))

  return (
    <section className="py-20 px-4 md:px-6 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F0FDF4] text-[#008236] rounded-full text-sm font-medium mb-6">
              <CheckCircle2 className="w-4 h-4" />
              {why.badge}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#101828] mb-6 leading-tight">
              {why.heading}
            </h2>
            <p className="text-sm md:text-base text-[#4A5565] leading-relaxed max-w-2xl mx-auto">
              {why.subheading}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1024px] mx-auto">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="flex gap-4 md:gap-6 items-start">
                <div
                  className={`w-14 h-14 ${item.iconBg} ${item.iconColor} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <h3 className="text-base md:text-lg font-bold text-[#101828]">
                      {item.title}
                    </h3>
                    <div
                      className={`inline-block px-3 py-1 ${item.statBg} ${item.statColor} text-xs font-bold rounded-full`}>
                      {item.stat}
                    </div>
                  </div>
                  <p className="text-sm text-[#4A5565] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {(why.aboutHref || why.cancelHref) && (
          <p className="mt-12 text-center text-gray-700">
            {why.aboutHref && (
              <Link href={why.aboutHref} className="font-semibold text-primary hover:underline">
                {why.aboutLink}
              </Link>
            )}
            {why.aboutHref && why.cancelHref && " · "}
            {why.cancelHref && (
              <Link href={why.cancelHref} className="font-semibold text-primary hover:underline">
                {why.cancelLink}
              </Link>
            )}
          </p>
        )}
      </div>
    </section>
  )
}
