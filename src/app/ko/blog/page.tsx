import { BlogIndexPage, blogIndexMetadata } from "@/components/pages/BlogPages"

export const metadata = blogIndexMetadata("ko")

export default function Page() {
  return <BlogIndexPage locale="ko" />
}
