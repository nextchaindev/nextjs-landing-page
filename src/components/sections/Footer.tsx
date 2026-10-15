import FooterLogo from "@/imports/Logo-8-285"
import Link from "next/link"
import {
  COMPANY_NAME,
  CONTACT,
  LEGAL_LINKS,
  MAIN_NAV,
  SERVICE_LINKS,
  SOLUTION_LINKS,
  type NavItem,
} from "@/lib/site"

const COMPANY_LINKS: NavItem[] = [
  { href: "/ve-chung-toi", label: "Về chúng tôi" },
  { href: "/dich-vu", label: "Tất cả dịch vụ" },
  { href: "/giai-phap", label: "Tất cả giải pháp" },
  ...MAIN_NAV,
]

function LinkColumn({ title, links }: { title: string; links: NavItem[] }) {
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
  return (
    <footer className="bg-[#111827] text-white pt-20 pb-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="w-[120px] mb-6">
              <FooterLogo />
            </div>
            <p className="text-[#99A1AF] leading-relaxed mb-4">
              Website chuyên nghiệp cho doanh nghiệp nhỏ. Nextchain làm từ A–Z và quản lý theo gói tháng.
            </p>
            <p className="text-[#6A7282] text-sm leading-relaxed mb-6">
              Nextchain.site là dịch vụ của {COMPANY_NAME}, hoạt động tại Thành phố Hồ Chí Minh.
            </p>
          </div>

          <LinkColumn title="Giải pháp" links={SOLUTION_LINKS} />
          <LinkColumn title="Dịch vụ" links={SERVICE_LINKS} />
          <LinkColumn title="Nextchain" links={COMPANY_LINKS} />

          <div>
            <h2 className="text-lg font-medium mb-6">Liên hệ</h2>
            <ul className="space-y-3 text-[#99A1AF]">
              <li>
                Email:{" "}
                <a href={`mailto:${CONTACT.email}`} className="hover:text-primary">
                  {CONTACT.email}
                </a>
              </li>
              <li>
                Điện thoại:{" "}
                <a href={CONTACT.phoneHref} className="hover:text-primary">
                  {CONTACT.phone}
                </a>
              </li>
              <li>Địa chỉ: {CONTACT.address}</li>
              {CONTACT.addresses.slice(1).map((office) => (
                <li key={office.label}>
                  {office.label}: {office.value}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1E2939] flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#6A7282] text-sm">
            © {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
          </p>
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {LEGAL_LINKS.map((link) => (
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
