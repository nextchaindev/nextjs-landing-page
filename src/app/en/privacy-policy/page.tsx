import { LegalDocPage, legalMetadata } from "@/components/pages/LegalPages"

export const metadata = legalMetadata("en", "privacy")

export default function Page() {
  return <LegalDocPage locale="en" doc="privacy" />
}
