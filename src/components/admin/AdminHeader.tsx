import Link from "next/link"
import { logout } from "@/app/(vi)/admin/actions"
import { cn } from "@/components/ui/utils"

const LINKS = [
  { href: "/admin/consultations", label: "Consultations" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/users", label: "Users" },
]

/** Thanh điều hướng chung của các trang admin. */
export default function AdminHeader({ active, email }: { active: string; email?: string }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b bg-white px-6 py-4 shadow-sm">
      <nav className="flex items-center gap-6">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-sm font-semibold",
              active === link.href ? "text-indigo-600" : "text-gray-600 hover:text-gray-900",
            )}>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        {email && <span className="text-sm text-gray-500">{email}</span>}
        <form action={logout}>
          <button type="submit" className="text-sm font-medium text-red-600 hover:text-red-500">
            Logout
          </button>
        </form>
      </div>
    </header>
  )
}
