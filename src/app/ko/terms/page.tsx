import { LegalDocPage, legalMetadata } from "@/components/pages/LegalPages"

export const metadata = legalMetadata("ko", "terms")

export default function Page() {
  return <LegalDocPage locale="ko" doc="terms" />
}
