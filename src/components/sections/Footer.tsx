"use client"

import FooterLogo from "@/imports/Logo-8-285"
import Link from "next/link"
import { COMPANY_NAME, type NavItem } from "@/lib/site"
import { useDictionary } from "@/i18n/LocaleProvider"

function LinkColumn({ title, links }: { title: string; links: NavItem[] }) {
  if (links.length === 0) return null

  return (
    <div>
      <h2 className="text-lg font-medium mb-6">{title}</h2>
      <ul className="space-y-3 text-[#99A1AF]">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:text-primary transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  const { footer, nav, contact } = useDictionary()
  const companyLinks = [...nav.company, ...nav.main]
  const [mainAddress, ...otherOffices] = contact.addresses
  // Số cột = cột có liên kết + giới thiệu + liên hệ; cột trống thì thu hẹp lưới.
  const columns = 2 + [nav.solutions, nav.services, companyLinks].filter((links) => links.length > 0).length

  return (
    <footer className="bg-[#111827] text-white pt-20 pb-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${
            columns >= 5 ? "lg:grid-cols-5" : columns === 4 ? "lg:grid-cols-4" : columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
          } gap-12 mb-16`}>
          <div className="lg:col-span-1">
            <div className="w-[120px] mb-6">
              <FooterLogo />
            </div>
            <p className="text-[#99A1AF] leading-relaxed mb-4">{footer.tagline}</p>
            <p className="text-[#6A7282] text-sm leading-relaxed mb-6">
              {footer.companyNote.replace("{company}", COMPANY_NAME)}
            </p>
          </div>

          <LinkColumn title={footer.solutions} links={nav.solutions} />
          <LinkColumn title={footer.services} links={nav.services} />
          <LinkColumn title={footer.company} links={companyLinks} />

          <div>
            <h2 className="text-lg font-medium mb-6">{footer.contact}</h2>
            <ul className="space-y-3 text-[#99A1AF]">
              <li>
                {footer.email}:{" "}
                <a href={`mailto:${contact.email}`} className="hover:text-primary">
                  {contact.email}
                </a>
              </li>
              {contact.phone && contact.phoneHref && (
                <li>
                  {footer.phone}:{" "}
                  <a href={contact.phoneHref} className="hover:text-primary">
                    {contact.phone}
                  </a>
                </li>
              )}
              {mainAddress && (
                <li>
                  {footer.address}: {mainAddress.value}
                </li>
              )}
              {otherOffices.map((office) => (
                <li key={office.label}>
                  {office.label}: {office.value}
                </li>
              ))}
              {contact.hours && (
                <li>
                  {footer.hours}: {contact.hours}
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1E2939] flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#6A7282] text-sm">
            © {new Date().getFullYear()} {COMPANY_NAME}. {footer.rights}
          </p>
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {nav.legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-[#99A1AF] text-sm hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
