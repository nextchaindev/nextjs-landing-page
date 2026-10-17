import { TemplatesIndexPage, templatesIndexMetadata } from "@/components/pages/TemplatesPages"

export const metadata = templatesIndexMetadata("en")

export default function Page() {
  return <TemplatesIndexPage locale="en" />
}
