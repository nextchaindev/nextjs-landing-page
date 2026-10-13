"use client"

import { motion } from "motion/react"

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: "div" | "li" | "article"
}

/** Fade-up on first scroll into view. Content stays in the HTML for crawlers. */
export default function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const Component = motion[as]
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}>
      {children}
    </Component>
  )
}
