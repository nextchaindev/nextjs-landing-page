"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { CalendarCheck, Lock, MapPin, Phone } from "lucide-react"
import { getHeroDemos } from "@/content/heroDemos"
import { useDictionary, useLocale } from "@/i18n/LocaleProvider"

const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const

export default function HeroShowcase() {
  const locale = useLocale()
  const { hero } = useDictionary()
  const DEMOS = getHeroDemos(locale)
  const [index, setIndex] = useState(0)
  const reduceMotion = useReducedMotion()
  const demo = DEMOS[index]

  useEffect(() => {
    if (reduceMotion) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % DEMOS.length), 4200)
    return () => clearInterval(timer)
  }, [reduceMotion, DEMOS.length])

  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-linear-to-br from-orange-200 to-orange-100 rounded-3xl rotate-2 opacity-40" />

      <div className="relative rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden">
        {/* Browser chrome */}
        <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex gap-1.5" aria-hidden>
            <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <span className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex-1 flex items-center gap-2 min-w-0 rounded-lg bg-white border border-gray-200 px-3 py-1.5 text-xs md:text-sm text-gray-600">
            <Lock className="w-3.5 h-3.5 shrink-0 text-green-600" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={demo.url}
                className="truncate"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: EASE_OUT_QUART }}>
                {demo.url}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Example site */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={demo.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT_QUART }}>
            <div className="relative h-[190px] md:h-[240px]">
              <Image
                src={demo.image}
                alt={hero.demoAlt.replace("{name}", demo.name)}
                fill
                priority={index === 0}
                placeholder="blur"
                sizes="(min-width: 768px) 560px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute left-5 right-5 bottom-4 text-white">
                <p className="text-xs uppercase tracking-wider text-white/80">{demo.tagline}</p>
                <p className="text-2xl md:text-3xl font-bold">{demo.name}</p>
              </div>
            </div>
            <div className="p-5 grid grid-cols-[1fr_auto] gap-x-6 gap-y-3 items-center">
              <ul className="col-span-2 sm:col-span-1 space-y-2">
                {demo.items.map(([service, price]) => (
                  <li key={service} className="flex justify-between gap-4 text-sm">
                    <span className="text-gray-700">{service}</span>
                    <span className="font-semibold text-gray-900">{price}</span>
                  </li>
                ))}
              </ul>
              <div className="col-span-2 sm:col-span-1 flex sm:flex-col gap-2">
                <span className={`inline-flex items-center justify-center gap-2 rounded-lg ${demo.accent} px-4 py-2.5 text-sm font-semibold text-white`}>
                  <CalendarCheck className="w-4 h-4" /> {demo.cta}
                </span>
                <span className="inline-flex items-center justify-center gap-3 text-gray-400">
                  <Phone className="w-4 h-4" />
                  <MapPin className="w-4 h-4" />
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating notes */}
      <motion.div
        className="absolute -left-4 md:-left-10 top-24 hidden sm:flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-xl ring-1 ring-black/5"
        animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
        <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
        <span className="text-sm font-semibold text-gray-900">{hero.floatingDomain}</span>
      </motion.div>
      <motion.div
        className="absolute -right-3 md:-right-6 bottom-5 rounded-xl bg-primary px-4 py-3 text-white shadow-xl shadow-primary/30"
        animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>
        <p className="text-xs text-white/85">{hero.floatingIncluded}</p>
        <p className="text-base font-bold">{hero.floatingApprove}</p>
      </motion.div>

      <div className="relative mt-3 flex justify-center gap-2" role="tablist" aria-label={hero.showcaseAria}>
        {DEMOS.map((item, i) => (
          <button
            key={item.name}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={item.name}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              i === index ? "w-8 bg-primary" : "w-2 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
