import type { Metadata } from "next"
import NotFoundView from "@/components/marketing/NotFoundView"
import { getDictionary } from "@/i18n/dictionaries"

export const metadata: Metadata = {
  title: getDictionary("en").notFound.title,
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return <NotFoundView locale="en" />
}
