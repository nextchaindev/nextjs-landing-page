import HomePage, { homeMetadata } from "@/components/pages/HomePage"

export const metadata = homeMetadata("ko")

export default function Page() {
  return <HomePage locale="ko" />
}
