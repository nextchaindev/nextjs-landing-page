import { useEffect, useState } from "react"

export const useActiveSection = (
  sectionIds: string[],
  dependency: any = null,
) => {
  const [activeSection, setActiveSection] = useState<string>("")

  useEffect(() => {
    const observerOptions = {
      root: null,
      // Target sections when they reach near the top, accounting for fixed header (80px)
      rootMargin: "-81px 0px -50% 0px",
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Small delay to ensure DOM is rendered after page transition
    const timeoutId = setTimeout(() => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          observer.observe(element)
        }
      })
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [sectionIds, dependency])

  return activeSection
}
