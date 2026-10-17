import type { Metadata } from "next"
import NotFoundView from "@/components/marketing/NotFoundView"
import { getDictionary } from "@/i18n/dictionaries"

export const metadata: Metadata = {
  title: getDictionary("ko").notFound.title,
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return <NotFoundView locale="ko" />
}
