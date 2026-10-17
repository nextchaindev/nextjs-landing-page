import { TemplateDetailPage, templateDetailMetadata, templateStaticParams } from "@/components/pages/TemplatesPages"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return templateStaticParams("en")
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  return templateDetailMetadata("en", slug)
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  return <TemplateDetailPage locale="en" slug={slug} />
}
