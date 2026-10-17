import { ProcessPage, processMetadata } from "@/components/pages/MiscPages"

export const metadata = processMetadata("en")

export default function Page() {
  return <ProcessPage locale="en" />
}
