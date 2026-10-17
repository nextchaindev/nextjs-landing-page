import ContactPage, { contactMetadata } from "@/components/pages/ContactPage"

export const metadata = contactMetadata("ko")

export default function Page() {
  return <ContactPage locale="ko" />
}
