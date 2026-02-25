"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { X, Menu } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import ImageLogo from "@/assets/logo.png"
import Image from "next/image"
import { useModal } from "@/context/ModalContext"
import { useActiveSection } from "@/hooks/useActiveSection"
import Link from "next/link"

export default function Header() {
  const { openModalClean } = useModal()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const sectionIds = useRef([
    "home",
    "services",
    "process",
    "projects",
    "customers",
  ])
  const activeSection = useActiveSection(sectionIds.current)

  const navLinks = [
    { id: "services", label: "Dịch vụ" },
    { id: "process", label: "Quy trình" },
    { id: "projects", label: "Dự án" },
    { id: "customers", label: "Khách hàng" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="w-[70px] h-[37px] md:w-[91px] md:h-[48px] relative">
            <Image src={ImageLogo} alt="Logo" fill className="object-cover" />
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`relative py-1 transition-colors font-medium group ${
                activeSection === link.id
                  ? "text-orange-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}>
              {link.label}
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-600 transition-transform duration-300 origin-left ${
                  activeSection === link.id
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-50"
                }`}
              />
            </a>
          ))}
          <a
            href="https://www.nextchain.kr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
            Về chúng tôi
          </a>
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
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-lg font-medium transition-colors ${
                    activeSection === link.id
                      ? "text-orange-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}>
                  {link.label}
                </a>
              ))}
              <a
                href="https://www.nextchain.kr/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Về chúng tôi
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
