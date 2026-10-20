import { LegalDocPage, legalMetadata } from "@/components/pages/LegalPages"

export const metadata = legalMetadata("en", "terms")

export default function Page() {
  return <LegalDocPage locale="en" doc="terms" />
}
