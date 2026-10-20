import { BlogPostPage, blogPostMetadata, blogStaticParams } from "@/components/pages/BlogPages"

type Props = { params: Promise<{ slug: string }> }

// Bài mới đăng sau lần build vẫn mở được (dynamicParams mặc định true), rồi được cache như trang tĩnh.
export const revalidate = 3600

export function generateStaticParams() {
  return blogStaticParams("ko")
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  return blogPostMetadata("ko", slug)
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  return <BlogPostPage locale="ko" slug={slug} />
}
