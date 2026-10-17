import { ComparePage, compareMetadata } from "@/components/pages/MiscPages"

export const metadata = compareMetadata("en")

export default function Page() {
  return <ComparePage locale="en" />
}
