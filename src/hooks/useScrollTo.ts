"use client"

import { useCallback } from "react"
import { useRouter, usePathname } from "next/navigation"

export const useScrollTo = (offset = 80) => {
  const router = useRouter()
  const pathname = usePathname()

  const scrollToSection = useCallback(
    (id: string) => {
      if (pathname !== "/") {
        router.push(`/#${id}`)
        return
      }

      const element = document.getElementById(id)
      if (element) {
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })

        // Optional: clear hash from URL if already there
        if (window.location.hash) {
          window.history.replaceState(null, "", window.location.pathname)
        }
      } else {
        // Fallback if element not found (e.g., navigating to / then to section)
        router.push(`/#${id}`)
      }
    },
    [offset, pathname, router],
  )

  return { scrollToSection }
}
