import { BlogIndexPage, blogIndexMetadata } from "@/components/pages/BlogPages"

export const metadata = blogIndexMetadata("en")

export default function Page() {
  return <BlogIndexPage locale="en" />
}
