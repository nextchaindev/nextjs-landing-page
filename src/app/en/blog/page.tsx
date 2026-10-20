import { BlogIndexPage, blogIndexMetadata } from "@/components/pages/BlogPages"

// Bài lấy từ Supabase: dựng tĩnh, làm mới ngay khi admin lưu bài (updateTag) và tối đa mỗi giờ.
export const revalidate = 3600

export function generateMetadata() {
  return blogIndexMetadata("en")
}

export default function Page() {
  return <BlogIndexPage locale="en" />
}
