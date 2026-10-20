import { ManagementPage, managementMetadata } from "@/components/pages/ServicesPages"

export const metadata = managementMetadata("en")

export default function Page() {
  return <ManagementPage locale="en" />
}
