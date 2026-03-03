"use client"

import { useState, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { X, Menu } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import ImageLogo from "@/assets/logo.png"
import Image from "next/image"
import { useModal } from "@/context/ModalContext"
import { useActiveSection } from "@/hooks/useActiveSection"
import { useScrollTo } from "@/hooks/useScrollTo"
import Link from "next/link"

export default function Header() {
  const pathname = usePathname()
  const { scrollToSection } = useScrollTo()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { openModalClean } = useModal()
  const router = useRouter()

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }

  const sectionIds = useRef([
    "home",
    "services",
    "process",
    "projects",
    "customers",
  ])
  const activeSection = useActiveSection(sectionIds.current, pathname)

  const navLinks = [
    { id: "services", label: "Dịch vụ" },
    { id: "process", label: "Quy trình" },
    { id: "projects", label: "Dự án" },
    { id: "customers", label: "Khách hàng" },
    { id: "about", label: "Về chúng tôi" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
        <Link
          href="/"
          onClick={handleLogoClick}
          className="w-[70px] h-[37px] md:w-[91px] md:h-[48px] relative">
          <Image src={ImageLogo} alt="Logo" fill className="object-cover" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            if (link.id === "about") {
              return (
                <a
                  key={link.id}
                  href={`https://www.nextchain.kr/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative py-1 transition-colors font-medium group ${
                    pathname === "/" && activeSection === link.id
                      ? "text-orange-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}>
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-600 transition-transform duration-300 origin-left ${
                      pathname === "/" && activeSection === link.id
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-50"
                    }`}
                  />
                </a>
              )
            }
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative py-1 transition-colors font-medium group cursor-pointer ${
                  pathname === "/" && activeSection === link.id
                    ? "text-orange-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}>
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-600 transition-transform duration-300 origin-left ${
                    pathname === "/" && activeSection === link.id
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-50"
                  }`}
                />
              </button>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            onClick={openModalClean}
            className="bg-blue-600 hover:bg-blue-600/90 text-white text-sm md:text-base px-5 md:px-6 rounded-lg font-medium transition-all shadow-md active:scale-95 hidden md:block">
            Liên hệ
          </Button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Toggle menu">
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden">
            <div className="flex flex-col p-4 space-y-4">
              {navLinks.map((link) => {
                if (link.id === "about") {
                  return (
                    <a
                      key={link.id}
                      href={`https://www.nextchain.kr/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-lg font-medium transition-colors ${
                        pathname === "/" && activeSection === link.id
                          ? "text-orange-600"
                          : "text-gray-700 hover:text-blue-600"
                      }`}>
                      {link.label}
                    </a>
                  )
                }
                return (
                  <button
                    key={link.id}
                    onClick={() => {
                      setIsMenuOpen(false)
                      scrollToSection(link.id)
                    }}
                    className={`text-lg font-medium transition-colors text-left cursor-pointer ${
                      pathname === "/" && activeSection === link.id
                        ? "text-orange-600"
                        : "text-gray-700 hover:text-blue-600"
                    }`}>
                    {link.label}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
