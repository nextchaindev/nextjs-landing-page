"use client"

import { ArrowRight } from "lucide-react"
import { useModal } from "@/context/ModalContext"
import { cn } from "@/components/ui/utils"

interface ContactButtonProps {
  label?: string
  variant?: "primary" | "outline"
  className?: string
}

export default function ContactButton({
  label = "Nhận tư vấn miễn phí",
  variant = "primary",
  className,
}: ContactButtonProps) {
  const { openModalClean } = useModal()

  return (
    <button
      type="button"
      onClick={openModalClean}
      className={cn(
        "inline-flex items-center justify-center gap-2 h-12 md:h-14 px-6 md:px-8 rounded-xl font-bold text-sm md:text-base transition-all active:scale-95 cursor-pointer",
        variant === "primary"
          ? "bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary/90"
          : "border border-gray-300 bg-white text-gray-900 hover:border-gray-400",
        className,
      )}>
      {label}
      {variant === "primary" && <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />}
    </button>
  )
}
