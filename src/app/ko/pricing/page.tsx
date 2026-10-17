import PricingPage, { pricingMetadata } from "@/components/pages/PricingPage"

export const metadata = pricingMetadata("ko")

export default function Page() {
  return <PricingPage locale="ko" />
}
