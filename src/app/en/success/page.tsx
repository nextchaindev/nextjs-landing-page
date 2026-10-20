import SuccessPage, { successMetadata } from "@/components/pages/SuccessPage"

export const metadata = successMetadata("en")

export default function Page() {
  return <SuccessPage locale="en" />
}
