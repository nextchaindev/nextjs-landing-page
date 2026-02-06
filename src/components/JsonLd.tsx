import Script from "next/script"

export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NextChain",
    url: "https://nextchain.kr",
    logo: "https://nextchain.kr/logo.png",
    description:
      "Thiết kế website chuyên nghiệp giúp doanh nghiệp tăng doanh số bán hàng",
    address: {
      "@type": "PostalAddress",
      addressCountry: "VN",
    },
    sameAs: [
      // Thêm các link mạng xã hội nếu có
      // "https://facebook.com/nextchain",
      // "https://linkedin.com/company/nextchain",
    ],
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NextChain",
    url: "https://nextchain.kr",
    description:
      "Thiết kế website chuyên nghiệp giúp doanh nghiệp tăng doanh số bán hàng. Landing page, website bán hàng, website doanh nghiệp với SEO tối ưu.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://nextchain.kr/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Thiết kế Website",
    provider: {
      "@type": "Organization",
      name: "NextChain",
    },
    areaServed: {
      "@type": "Country",
      name: "Vietnam",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Dịch vụ thiết kế website",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Landing Page",
            description: "Thiết kế landing page chuyên nghiệp",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Website Doanh nghiệp",
            description: "Thiết kế website doanh nghiệp chuyên nghiệp",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Website Bán hàng",
            description: "Thiết kế website thương mại điện tử",
          },
        },
      ],
    },
  }

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
    </>
  )
}
