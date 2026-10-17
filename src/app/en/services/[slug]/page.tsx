import { ServiceDetailPage, serviceDetailMetadata, serviceStaticParams } from "@/components/pages/ServicesPages"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return serviceStaticParams("en")
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  return serviceDetailMetadata("en", slug)
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  return <ServiceDetailPage locale="en" slug={slug} />
}
