"use client"

import { useState, useRef, useEffect } from "react"
import { useActiveSection } from "@/hooks/useActiveSection"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import Hero from "@/components/sections/Hero"
import WhyChooseUs from "@/components/sections/WhyChooseUs"
import Services from "@/components/sections/Services"
import Process from "@/components/sections/Process"
import Projects from "@/components/sections/Projects"
import CTA from "@/components/sections/CTA"
import Client from "@/components/sections/Client"

export default function Home() {
  const [selectedService, setSelectedService] = useState("landing")

  // Counter animation hook for hero stats
  const { ref: heroStatsRef, isVisible: heroStatsVisible } =
    useScrollAnimation(0.3)

  // Scroll animations for sections
  const { ref: servicesRef, isVisible: servicesVisible } =
    useScrollAnimation(0.1)
  const { ref: processRef, isVisible: processVisible } = useScrollAnimation(0.1)
  const { ref: projectsRef, isVisible: projectsVisible } =
    useScrollAnimation(0.1)

  const { ref: clientsRef, isVisible: clientsVisible } = useScrollAnimation(0.1)

  // Active section tracking for GA
  const sectionIds = useRef(["home", "services", "process", "projects", "cta"])
  const activeSection = useActiveSection(sectionIds.current)

  // Track section view in GA
  useEffect(() => {
    if (
      activeSection &&
      typeof window !== "undefined" &&
      (window as any).gtag
    ) {
      ;(window as any).gtag("event", "section_view", {
        section_name: activeSection,
      })
    }
  }, [activeSection])

  // Ref for pricing carousel to auto-scroll to popular card
  const pricingCarouselRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to popular card on mobile when service changes
  useEffect(() => {
    if (
      pricingCarouselRef.current &&
      typeof window !== "undefined" &&
      window.innerWidth < 768
    ) {
      // Popular card is always in the middle (index 1) after reordering
      const middleIndex = 1
      // All services have 3 packages
      const cardWidth = pricingCarouselRef.current.scrollWidth / 3
      const scrollPosition =
        cardWidth * middleIndex - (window.innerWidth - cardWidth) / 2

      // Wait for animation to complete (300ms) before scrolling
      const timer = setTimeout(() => {
        pricingCarouselRef.current?.scrollTo({
          left: Math.max(0, scrollPosition),
          behavior: "smooth",
        })
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [selectedService])

  return (
    <div className="min-h-screen bg-white">
      <Hero heroStatsRef={heroStatsRef} heroStatsVisible={heroStatsVisible} />

      <Services
        // selectedService={selectedService}
        // setSelectedService={setSelectedService}
        pricingCarouselRef={pricingCarouselRef}
        servicesRef={servicesRef}
        servicesVisible={servicesVisible}
      />

      <Process processRef={processRef} processVisible={processVisible} />

      <Projects projectsRef={projectsRef} projectsVisible={projectsVisible} />

      <Client clientsRef={clientsRef} clientsVisible={clientsVisible} />

      <WhyChooseUs />

      <CTA />
    </div>
  )
}
