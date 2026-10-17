import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import PageHeader from "@/components/marketing/PageHeader"
import Section from "@/components/marketing/Section"
import ContactButton from "@/components/marketing/ContactButton"
import { pageMetadata } from "@/lib/seo"
import { getDictionary } from "@/i18n/dictionaries"

const PATH = "/ko/contact"
const KAKAO_CHANNEL_URL = process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL

export const metadata = pageMetadata({
  title: "웹사이트 제작 상담 문의",
  description:
    "넥스트체인에 웹사이트 월 구독 플랜을 상담해 보세요. 문의 폼, 이메일, 카카오톡으로 문의하시면 영업일 기준 24시간 이내에 회신드립니다.",
  path: PATH,
  locale: "ko",
})

export default function KoContactPage() {
  const { contact } = getDictionary("ko")
  const channels: { icon: typeof Mail; label: string; value: string; href?: string }[] = [
    { icon: Mail, label: "이메일", value: contact.email, href: `mailto:${contact.email}` },
    ...(KAKAO_CHANNEL_URL
      ? [{ icon: MessageCircle, label: "카카오톡 채널", value: "카카오톡으로 문의하기", href: KAKAO_CHANNEL_URL }]
      : []),
    ...(contact.phone && contact.phoneHref
      ? [{ icon: Phone, label: "전화", value: contact.phone, href: contact.phoneHref }]
      : []),
    ...contact.addresses.map((office) => ({ icon: MapPin, label: office.label, value: office.value })),
    ...(contact.hours ? [{ icon: Clock, label: "운영 시간", value: contact.hours }] : []),
    { icon: Clock, label: "회신 시간", value: "영업일 기준 24시간 이내" },
  ]

  return (
    <>
      <PageHeader
        locale="ko"
        crumbs={[{ name: "문의", path: PATH }]}
        eyebrow="문의"
        title="웹사이트 제작 상담 문의"
        intro="웹사이트가 어떤 용도로 필요하신지 알려 주세요. 작업 범위와 비용을 안내해 드립니다. 상담은 무료이며 플랜 가입 없이도 문의하실 수 있습니다.">
        <ContactButton label="상담 신청하기" />
      </PageHeader>
      <Section>
        <div className="grid sm:grid-cols-2 gap-6 max-w-[860px] mx-auto">
          {channels.map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="flex gap-4 border border-gray-200 rounded-2xl p-6">
              <Icon className="w-6 h-6 text-primary shrink-0" />
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                {href ? (
                  <a href={href} className="font-semibold text-gray-900 hover:text-primary">
                    {value}
                  </a>
                ) : (
                  <p className="font-semibold text-gray-900">{value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
