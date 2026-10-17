import { LegalDocPage, legalMetadata } from "@/components/pages/LegalPages"

export const metadata = legalMetadata("en", "cancellation")

export default function Page() {
  return <LegalDocPage locale="en" doc="cancellation" />
}
