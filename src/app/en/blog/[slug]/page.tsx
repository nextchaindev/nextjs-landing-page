import { BlogPostPage, blogPostMetadata, blogStaticParams } from "@/components/pages/BlogPages"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return blogStaticParams("en")
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  return blogPostMetadata("en", slug)
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  return <BlogPostPage locale="en" slug={slug} />
}
