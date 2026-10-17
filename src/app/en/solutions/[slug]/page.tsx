import { SolutionDetailPage, solutionDetailMetadata, solutionStaticParams } from "@/components/pages/SolutionsPages"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return solutionStaticParams("en")
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  return solutionDetailMetadata("en", slug)
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  return <SolutionDetailPage locale="en" slug={slug} />
}
