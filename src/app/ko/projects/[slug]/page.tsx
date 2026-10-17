import { ProjectDetailPage, projectDetailMetadata, projectStaticParams } from "@/components/pages/ProjectsPages"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return projectStaticParams("ko")
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  return projectDetailMetadata("ko", slug)
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  return <ProjectDetailPage locale="ko" slug={slug} />
}
