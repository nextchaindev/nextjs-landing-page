"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { X, Menu, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import ImageLogo from "@/assets/logo.png"
import Image from "next/image"
import Link from "next/link"
import { useModal } from "@/context/ModalContext"
import { MAIN_NAV, SERVICE_LINKS, SITE_NAME, SOLUTION_LINKS, type NavItem } from "@/lib/site"
import { cn } from "@/components/ui/utils"

const MENU_GROUPS: { title: string; links: NavItem[]; allHref?: string; allLabel?: string }[] = [
  { title: "Giải pháp", links: SOLUTION_LINKS, allHref: "/giai-phap", allLabel: "Xem tất cả giải pháp →" },
  { title: "Dịch vụ", links: SERVICE_LINKS, allHref: "/dich-vu", allLabel: "Xem tất cả dịch vụ →" },
]

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { openModalClean } = useModal()

  const isActive = (href: string) => pathname === href || pathname?.startsWith(`${href}/`)
  const isGroupActive = (group: (typeof MENU_GROUPS)[number]) =>
    group.links.some((link) => isActive(link.href)) || (group.allHref !== undefined && pathname === group.allHref)
  const closeMenu = () => setIsMenuOpen(false)

  const desktopLinkClass = (active: boolean) =>
    cn(
      "relative py-1 transition-colors font-medium group",
      active ? "text-orange-600" : "text-gray-600 hover:text-gray-900",
    )

  const underline = (active: boolean) => (
    <span
      className={cn(
        "absolute bottom-0 left-0 w-full h-0.5 bg-orange-600 transition-transform duration-300 origin-left",
        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50",
      )}
    />
  )

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur border-b border-gray-200 z-50">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
        <Link
          href="/"
          onClick={closeMenu}
          aria-label={`${SITE_NAME} - Trang chủ`}
          className="w-[70px] h-[37px] md:w-[91px] md:h-[48px] relative">
          <Image src={ImageLogo} alt={SITE_NAME} fill className="object-cover" priority />
        </Link>

        <nav aria-label="Điều hướng chính" className="hidden xl:flex items-center gap-6 whitespace-nowrap">
          {MENU_GROUPS.map((group) => (
            <div key={group.title} className="relative group/dd">
              <button
                type="button"
                aria-haspopup="true"
                className={cn(desktopLinkClass(isGroupActive(group)), "inline-flex items-center gap-1 cursor-pointer")}>
                {group.title}
                <ChevronDown className="w-4 h-4 transition-transform group-hover/dd:rotate-180" />
                {underline(isGroupActive(group))}
              </button>
              <div className="invisible opacity-0 translate-y-2 group-hover/dd:visible group-hover/dd:opacity-100 group-hover/dd:translate-y-0 group-focus-within/dd:visible group-focus-within/dd:opacity-100 group-focus-within/dd:translate-y-0 transition-all duration-200 absolute left-0 top-full pt-3">
                <ul className="w-[340px] bg-white border border-gray-200 rounded-2xl shadow-2xl p-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "block rounded-xl px-4 py-2.5 hover:bg-orange-50 transition-colors",
                          isActive(link.href) && "bg-orange-50",
                        )}>
                        <span className="block font-semibold text-gray-900">{link.label}</span>
                        <span className="block text-sm text-gray-500">{link.description}</span>
                      </Link>
                    </li>
                  ))}
                  {group.allHref && (
                    <li className="border-t border-gray-100 mt-1 pt-1">
                      <Link
                        href={group.allHref}
                        className="block rounded-xl px-4 py-2.5 text-sm font-semibold text-primary hover:bg-orange-50">
                        {group.allLabel}
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))}
          {MAIN_NAV.map((link) => (
            <Link key={link.href} href={link.href} className={desktopLinkClass(isActive(link.href))}>
              {link.label}
              {underline(isActive(link.href))}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            onClick={openModalClean}
            className="bg-blue-600 hover:bg-blue-600/90 text-white text-sm md:text-base px-5 md:px-6 rounded-lg font-medium transition-all shadow-md active:scale-95 hidden xl:block whitespace-nowrap">
            Nhận tư vấn
          </Button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="xl:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            aria-expanded={isMenuOpen}
            aria-label="Mở menu">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            aria-label="Điều hướng di động"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-white border-b border-gray-100 overflow-y-auto max-h-[calc(100dvh-64px)]">
            <div className="flex flex-col p-4 gap-1">
              {MENU_GROUPS.map((group) => (
                <div key={group.title} className="mb-2">
                  <p className="px-2 pt-2 pb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {group.title}
                  </p>
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className={cn(
                        "block px-2 py-2 text-base font-medium",
                        isActive(link.href) ? "text-orange-600" : "text-gray-700",
                      )}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
              <div className="mb-2 border-t border-gray-100" />
              {MAIN_NAV.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={cn(
                    "px-2 py-2 text-lg font-medium",
                    isActive(link.href) ? "text-orange-600" : "text-gray-700",
                  )}>
                  {link.label}
                </Link>
              ))}
              <Button
                onClick={() => {
                  closeMenu()
                  openModalClean()
                }}
                className="mt-3 bg-blue-600 hover:bg-blue-600/90 text-white rounded-lg font-medium">
                Nhận tư vấn miễn phí
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
