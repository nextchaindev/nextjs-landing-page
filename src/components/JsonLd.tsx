import JsonLdScript from "@/components/marketing/JsonLdScript"
import { COMPANY_NAME, CONTACT, SITE_NAME, SITE_URL, socialProfiles } from "@/lib/site"
import { LANGUAGE_TAGS, localizePath, type Locale } from "@/i18n/config"

const ORGANIZATION_TEXT: Record<Locale, { description: string; priceRange: string; areaServed: object[]; alternateName: string[] }> = {
  vi: {
    description:
      "Dịch vụ thiết kế, xuất bản và quản lý website/landing page theo gói tháng cho doanh nghiệp nhỏ tại Việt Nam.",
    priceRange: "249.000đ - 45.000.000đ+",
    areaServed: [{ "@type": "Country", name: "Vietnam" }],
    alternateName: ["Nextchain", "nextchain.site"],
  },
  ko: {
    description:
      "소규모 사업자를 위한 웹사이트·랜딩페이지 디자인, 게시, 운영을 월 구독으로 제공하는 서비스입니다.",
    priceRange: "39,000원 - 6,900,000원+",
    areaServed: [
      { "@type": "Country", name: "South Korea" },
      { "@type": "Country", name: "Vietnam" },
    ],
    alternateName: ["넥스트체인", "Nextchain", "nextchain.site"],
  },
  en: {
    description:
      "Website and landing page design, publishing and management on monthly plans for small businesses, plus project-based websites and software.",
    priceRange: "$29 - $4,990+",
    areaServed: [{ "@type": "Country", name: "Vietnam" }],
    alternateName: ["Nextchain", "nextchain.site"],
  },
}

/** Site-wide entity data. Page-level Service/Breadcrumb schemas live on each route. */
export default function JsonLd({ locale = "vi" }: { locale?: Locale }) {
  const profiles = socialProfiles()
  const text = ORGANIZATION_TEXT[locale]
  const organizationSchema = {
    "@context": "https://schema.org",
    // ProfessionalService giúp Google/AI ghép Nextchain với ngành dịch vụ
    // website có địa chỉ liên hệ thật; Organization giữ các tham chiếu @id.
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${SITE_URL}#organization`,
    name: SITE_NAME,
    legalName: COMPANY_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: text.description,
    email: CONTACT.email,
    telephone: CONTACT.phone,
    address: [
      {
        "@type": "PostalAddress",
        streetAddress:
          "Tầng 3, Khối đế - Tháp 1 và 2, Tòa nhà The Vista, Số 628C Đường Võ Nguyên Giáp, Phường An Khánh",
        addressLocality: "Thành phố Hồ Chí Minh",
        addressCountry: "VN",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "S1.01 Vinhomes Grand Park, Phường Long Bình",
        addressLocality: "Thành phố Hồ Chí Minh",
        addressCountry: "VN",
      },
    ],
    areaServed: text.areaServed.length === 1 ? text.areaServed[0] : text.areaServed,
    priceRange: text.priceRange,
    ...(profiles.length > 0 && { sameAs: profiles }),
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    // Mỗi ngôn ngữ một thực thể WebSite; Organization dùng chung.
    "@id": `${SITE_URL}${locale === "vi" ? "" : localizePath("/", locale)}#website`,
    name: SITE_NAME,
    alternateName: text.alternateName,
    url: `${SITE_URL}${locale === "vi" ? "" : localizePath("/", locale)}`,
    inLanguage: LANGUAGE_TAGS[locale],
    publisher: { "@id": `${SITE_URL}#organization` },
  }

  return <JsonLdScript data={[organizationSchema, websiteSchema]} />
}
