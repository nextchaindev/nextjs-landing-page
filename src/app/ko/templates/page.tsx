import { TemplatesIndexPage, templatesIndexMetadata } from "@/components/pages/TemplatesPages"

export const metadata = templatesIndexMetadata("ko")

export default function Page() {
  return <TemplatesIndexPage locale="ko" />
}
