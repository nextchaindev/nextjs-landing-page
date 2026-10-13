import JsonLdScript from "@/components/marketing/JsonLdScript"
import { COMPANY_NAME, CONTACT, SITE_NAME, SITE_URL } from "@/lib/site"

/** Site-wide entity data. Page-level Service/Breadcrumb schemas live on each route. */
export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: SITE_NAME,
    legalName: COMPANY_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "Dịch vụ thiết kế, xuất bản và quản lý website/landing page theo gói tháng cho doanh nghiệp nhỏ tại Việt Nam.",
    email: CONTACT.email,
    telephone: CONTACT.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hồ Chí Minh",
      addressCountry: "VN",
    },
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "vi-VN",
    publisher: { "@id": `${SITE_URL}#organization` },
  }

  return <JsonLdScript data={[organizationSchema, websiteSchema]} />
}
