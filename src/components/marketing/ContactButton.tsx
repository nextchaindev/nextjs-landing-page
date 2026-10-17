"use client"

import { ArrowRight } from "lucide-react"
import { useModal } from "@/context/ModalContext"
import { cn } from "@/components/ui/utils"
import { trackEvent } from "@/lib/analytics"
import { useDictionary } from "@/i18n/LocaleProvider"

interface ContactButtonProps {
  label?: string
  variant?: "primary" | "outline"
  className?: string
  context?: string
}

export default function ContactButton({
  label,
  variant = "primary",
  className,
  context,
}: ContactButtonProps) {
  const { openModal } = useModal()
  const { common } = useDictionary()
  const text = label ?? common.contactLabel

  return (
    <button
      type="button"
      onClick={() => {
        trackEvent("cta_click", { cta_text: text, ...(context && { cta_context: context }) })
        openModal(context ? { message: common.interest.replace("{context}", context) } : undefined)
      }}
      className={cn(
        "inline-flex items-center justify-center gap-2 h-12 md:h-14 px-6 md:px-8 rounded-xl font-bold text-sm md:text-base transition-all active:scale-95 cursor-pointer",
        variant === "primary"
          ? "bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary/90"
          : "border border-gray-300 bg-white text-gray-900 hover:border-gray-400",
        className,
      )}>
      {text}
      {variant === "primary" && <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />}
    </button>
  )
}
