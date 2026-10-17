import { ServicesIndexPage, servicesIndexMetadata } from "@/components/pages/ServicesPages"

export const metadata = servicesIndexMetadata("ko")

export default function Page() {
  return <ServicesIndexPage locale="ko" />
}
