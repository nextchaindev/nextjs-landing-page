"use client"

import { useState, useEffect } from "react"

export default function useWidth() {
  const [width, setWidth] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const updateWidth = () => {
      setWidth(window.innerWidth)
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
      setIsDesktop(window.innerWidth >= 1024)
    }
    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  return { width, isMobile, isTablet, isDesktop }
}
