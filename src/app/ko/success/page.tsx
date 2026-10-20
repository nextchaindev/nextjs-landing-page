import SuccessPage, { successMetadata } from "@/components/pages/SuccessPage"

export const metadata = successMetadata("ko")

export default function Page() {
  return <SuccessPage locale="ko" />
}
