import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import PageHeader from "@/components/marketing/PageHeader"
import Section from "@/components/marketing/Section"
import ContactButton from "@/components/marketing/ContactButton"
import { pageMetadata } from "@/lib/seo"
import { getMessenger } from "@/lib/messenger"
import { PAGE_COPY } from "@/content/pages"
import { getDictionary } from "@/i18n/dictionaries"
import { localizePath, type NonDefaultLocale } from "@/i18n/config"

/** Trang liên hệ của các ngôn ngữ ngoài tiếng Việt. Trang tiếng Việt là app/(vi)/lien-he/page.tsx. */
export function contactMetadata(locale: NonDefaultLocale) {
  const copy = PAGE_COPY[locale].contact
  return pageMetadata({
    title: copy.metaTitle,
    description: copy.metaDescription,
    path: localizePath("/contact", locale),
    locale,
  })
}

export default function ContactPage({ locale }: { locale: NonDefaultLocale }) {
  const copy = PAGE_COPY[locale].contact
  const { contact } = getDictionary(locale)
  const messenger = getMessenger(locale)

  const channels: { icon: typeof Mail; label: string; value: string; href?: string }[] = [
    { icon: Mail, label: copy.labels.email, value: contact.email, href: `mailto:${contact.email}` },
    ...(messenger.href
      ? [{ icon: MessageCircle, label: copy.labels.messenger, value: copy.labels.messengerCta, href: messenger.href }]
      : []),
    ...(contact.phone && contact.phoneHref
      ? [{ icon: Phone, label: copy.labels.phone, value: contact.phone, href: contact.phoneHref }]
      : []),
    ...contact.addresses.map((office) => ({ icon: MapPin, label: office.label, value: office.value })),
    ...(contact.hours ? [{ icon: Clock, label: copy.labels.hours, value: contact.hours }] : []),
    { icon: Clock, label: copy.labels.response, value: copy.responseTime },
  ]

  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[{ name: copy.crumb, path: localizePath("/contact", locale) }]}
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}>
        <ContactButton label={copy.button} />
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
