import { BlogPostPage, blogPostMetadata, blogStaticParams } from "@/components/pages/BlogPages"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

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
