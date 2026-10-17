import { ManagementPage, managementMetadata } from "@/components/pages/ServicesPages"

export const metadata = managementMetadata("ko")

export default function Page() {
  return <ManagementPage locale="ko" />
}
