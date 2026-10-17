import { ServiceDetailPage, serviceDetailMetadata, serviceStaticParams } from "@/components/pages/ServicesPages"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return serviceStaticParams("ko")
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  return serviceDetailMetadata("ko", slug)
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  return <ServiceDetailPage locale="ko" slug={slug} />
}
