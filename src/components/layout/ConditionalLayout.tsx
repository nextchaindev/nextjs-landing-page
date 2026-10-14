"use client"

import { usePathname } from "next/navigation"
import Header from "@/components/sections/Header"
import Footer from "@/components/sections/Footer"
import ContactModal from "@/components/sections/ContactModal"
import { ReactNode } from "react"

interface ConditionalLayoutProps {
  children: ReactNode
}

export default function ConditionalLayout({
  children,
}: ConditionalLayoutProps) {
  const pathname = usePathname()
  const isStandalonePage = pathname?.startsWith("/admin") || pathname?.startsWith("/demo/")

  if (isStandalonePage) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <ContactModal />
    </>
  )
}
