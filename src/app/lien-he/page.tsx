import { Clock, Mail, MapPin, Phone } from "lucide-react"
import PageHeader from "@/components/marketing/PageHeader"
import Section from "@/components/marketing/Section"
import ContactButton from "@/components/marketing/ContactButton"
import { pageMetadata } from "@/lib/seo"
import { CONTACT } from "@/lib/site"

const PATH = "/lien-he"

export const metadata = pageMetadata({
  title: "Liên hệ tư vấn làm website",
  description:
    "Liên hệ Nextchain.site để được tư vấn gói website theo tháng. Gửi yêu cầu qua form, email hoặc điện thoại — phản hồi trong 24 giờ làm việc.",
  path: PATH,
})

export default function ContactPage() {
  const channels: { icon: typeof Mail; label: string; value: string; href?: string }[] = [
    { icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: Phone, label: "Điện thoại / Zalo", value: CONTACT.phone, href: CONTACT.phoneHref },
    ...CONTACT.addresses.map((office) => ({ icon: MapPin, label: office.label, value: office.value })),
    { icon: Clock, label: "Thời gian phản hồi", value: CONTACT.responseTime },
  ]

  return (
    <>
      <PageHeader
        crumbs={[{ name: "Liên hệ", path: PATH }]}
        eyebrow="Liên hệ"
        title="Liên hệ tư vấn làm website"
        intro="Cho Nextchain biết bạn cần website để làm gì. Chúng tôi sẽ trao đổi phương án và chi phí; buổi tư vấn miễn phí, chưa cần đăng ký gói.">
        <ContactButton label="Gửi yêu cầu tư vấn" />
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
