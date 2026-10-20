"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { X, Menu, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import ImageLogo from "@/assets/logo.png"
import Image from "next/image"
import Link from "next/link"
import { useModal } from "@/context/ModalContext"
import { SITE_NAME, type NavItem } from "@/lib/site"
import { cn } from "@/components/ui/utils"
import { useDictionary, useLocale } from "@/i18n/LocaleProvider"
import { localizePath } from "@/i18n/config"
import LanguageSwitcher from "@/components/layout/LanguageSwitcher"

interface MenuGroup {
  title: string
  links: NavItem[]
  allHref?: string
  allLabel?: string
}

export default function Header() {
  const pathname = usePathname()
  const locale = useLocale()
  const { header, nav } = useDictionary()
  // Nhóm không có trang nào (vd. tiếng Hàn khi chưa dịch xong) thì không hiển thị.
  const MENU_GROUPS: MenuGroup[] = [
    { title: header.solutionsTitle, links: nav.solutions, allHref: header.solutionsAllHref, allLabel: header.solutionsAll },
    { title: header.servicesTitle, links: nav.services, allHref: header.servicesAllHref, allLabel: header.servicesAll },
  ].filter((group) => group.links.length > 0)
  const MAIN_NAV = nav.main
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { openModalClean } = useModal()

  const isActive = (href: string) => pathname === href || pathname?.startsWith(`${href}/`)
  const isGroupActive = (group: MenuGroup) =>
    group.links.some((link) => isActive(link.href)) || (group.allHref !== undefined && pathname === group.allHref)
  const [openGroup, setOpenGroup] = useState<string | null>(null)

  useEffect(() => {
    document.body.toggleAttribute("data-menu-open", isMenuOpen)
    return () => document.body.removeAttribute("data-menu-open")
  }, [isMenuOpen])
  const closeMenu = () => setIsMenuOpen(false)
  const toggleMenu = () => {
    // Mở menu: nhóm chứa trang hiện tại tự bung, các nhóm khác gập lại.
    if (!isMenuOpen) setOpenGroup(MENU_GROUPS.find(isGroupActive)?.title ?? null)
    setIsMenuOpen(!isMenuOpen)
  }

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
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-4 xl:gap-6">
        <Link
          href={localizePath("/", locale)}
          onClick={closeMenu}
          aria-label={`${SITE_NAME} - ${header.homeAria}`}
          className="w-[70px] h-[37px] md:w-[91px] md:h-[48px] relative shrink-0">
          <Image src={ImageLogo} alt={SITE_NAME} fill className="object-cover" priority />
        </Link>

        {/* 1280–1535px: chữ và khoảng cách nhỏ lại một chút để 9 mục + chọn ngôn ngữ + CTA vừa khung 1200px. */}
        <nav
          aria-label={header.mainNavAria}
          className="hidden xl:flex items-center gap-5 2xl:gap-6 text-[15px] 2xl:text-base whitespace-nowrap">
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

        <div className="flex items-center gap-2 shrink-0">
          <LanguageSwitcher variant="menu" className="hidden xl:block" />
          <Button
            onClick={openModalClean}
            className="bg-blue-600 hover:bg-blue-600/90 text-white text-sm md:text-base px-5 md:px-6 rounded-lg font-medium transition-all shadow-md active:scale-95 hidden xl:block whitespace-nowrap">
            {header.cta}
          </Button>
          <button
            onClick={toggleMenu}
            className="xl:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            aria-expanded={isMenuOpen}
            aria-label={header.openMenuAria}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            aria-label={header.mobileNavAria}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-white border-b border-gray-100 overflow-hidden flex flex-col max-h-[calc(100dvh-64px)]">
            <div className="flex flex-col p-4 gap-1 overflow-y-auto overscroll-contain">
              {MENU_GROUPS.map((group) => {
                const expanded = openGroup === group.title
                return (
                  <div key={group.title}>
                    <button
                      type="button"
                      onClick={() => setOpenGroup(expanded ? null : group.title)}
                      aria-expanded={expanded}
                      className={cn(
                        "w-full flex items-center justify-between px-2 py-2 text-lg font-medium",
                        isGroupActive(group) ? "text-orange-600" : "text-gray-700",
                      )}>
                      {group.title}
                      <ChevronDown className={cn("w-5 h-5 transition-transform", expanded && "rotate-180")} />
                    </button>
                    {expanded && (
                      <div className="mb-2 ml-2 border-l-2 border-orange-100 pl-3">
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
                        {group.allHref && (
                          <Link
                            href={group.allHref}
                            onClick={closeMenu}
                            className="block px-2 py-2 text-sm font-semibold text-primary">
                            {group.allLabel}
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
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
            </div>
            <div className="shrink-0 border-t border-gray-100 bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <LanguageSwitcher className="mb-3 justify-center" onNavigate={closeMenu} />
              <Button
                onClick={() => {
                  closeMenu()
                  openModalClean()
                }}
                className="w-full h-12 bg-blue-600 hover:bg-blue-600/90 text-white rounded-lg font-medium text-base">
                {header.ctaMobile}
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
