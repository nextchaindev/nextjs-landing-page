import { TemplateDetailPage, templateDetailMetadata, templateStaticParams } from "@/components/pages/TemplatesPages"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return templateStaticParams("ko")
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  return templateDetailMetadata("ko", slug)
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  return <TemplateDetailPage locale="ko" slug={slug} />
}
