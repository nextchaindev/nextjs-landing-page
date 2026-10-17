import type { NonDefaultLocale } from "@/i18n/config"

/**
 * Nội dung riêng của từng trang cho các ngôn ngữ ngoài tiếng Việt (ko, en). Trang tiếng Việt giữ chữ
 * ngay trong file trang. Chuỗi dùng placeholder {price}/{hours}, thay ở nơi hiển thị (chuỗi dữ liệu thuần).
 */
export interface PageCopy {
  home: {
    metaDescription: string
    pricing: { eyebrow: string; title: string; desc: string; link: string }
    growth: { title: string; desc: string; features: { title: string; desc: string }[] }
  }
  pricing: {
    metaTitle: string
    metaDescription: string
    serviceName: string
    crumb: string
    eyebrow: string
    title: string
    intro: string
    taxNote: string
    planGuideTitle: string
    planGuide: { lead: string; body: string }[]
    ctaSecondaryLabel: string
  }
  contact: {
    metaTitle: string
    metaDescription: string
    crumb: string
    eyebrow: string
    title: string
    intro: string
    button: string
    labels: { email: string; phone: string; hours: string; response: string; messenger: string; messengerCta: string }
    responseTime: string
  }
  success: {
    metaTitle: string
    heading: string
    subtitle: string
    quick: { title: string; body: string }
    mail: { title: string; body: string }
    messenger: { title: string; before: string; link: string; after: string }
    back: string
    questionsBefore: string
    questionsAfter: string
  }
}

export const PAGE_COPY: Record<NonDefaultLocale, PageCopy> = {
  ko: {
    home: {
      metaDescription:
        "랜딩페이지와 웹사이트를 월 구독으로 시작하세요. 디자인, 콘텐츠 작성, 게시, 운영까지 넥스트체인이 맡습니다. 초기 제작비 없이 월 {price}부터.",
      pricing: {
        eyebrow: "요금 안내",
        title: "월 단위 결제, 초기 제작비 없음",
        desc: "랜딩페이지와 소규모 사업자를 위한 플랜입니다. 혜택, 제한, 해지 조건을 분명하게 안내합니다.",
        link: "상세 요금과 자주 묻는 질문 보기 →",
      },
      growth: {
        title: "사업과 함께 성장하는 웹사이트",
        desc: "플랜 범위 안에서 서비스, 상품 카탈로그, 블로그, 사진, 연락처를 계속 업데이트합니다.",
        features: [
          {
            title: "서비스별 전용 페이지",
            desc: "예를 들어 스파라면 피부 관리, 두피 케어, 아로마 마사지 페이지를 각각 만들고 설명, 사진, 확정된 가격, 예약 문의 버튼을 넣습니다.",
          },
          {
            title: "필요할 때 갱신하는 블로그",
            desc: "스파는 피부 관리 팁을, 펜션은 주변 여행 정보를 올립니다. 넥스트체인이 초안을 쓰고 검토한 뒤 플랜에 포함된 편수만큼 게시합니다.",
          },
          {
            title: "깔끔한 상품 카탈로그",
            desc: "미용실은 헤어 케어 제품을, 스파는 화장품을 소개할 수 있습니다. 사진, 설명, 옵션, 가격, 구매 문의 버튼을 제공합니다.",
          },
        ],
      },
    },
    pricing: {
      metaTitle: "웹사이트 월 구독 요금 안내",
      metaDescription:
        "월 {price}부터 시작하는 웹사이트 월 구독 플랜. 초기 제작비 없이 월 단위로 결제합니다. 기업 웹사이트, 쇼핑몰, 소프트웨어, SEO는 프로젝트별로 견적을 드립니다.",
      serviceName: "넥스트체인 웹사이트 월 구독 플랜",
      crumb: "요금 안내",
      eyebrow: "요금 안내",
      title: "웹사이트 월 구독 요금 안내",
      intro:
        "소규모 사업자를 위한 랜딩페이지와 웹사이트는 초기 제작비 없이 월 단위로 결제합니다. 더 큰 규모의 웹사이트와 소프트웨어는 아래 프로젝트 견적을 확인해 주세요.",
      taxNote: "모든 금액은 부가세(10%) 별도이며, 사업자 고객께는 세금계산서를 발행합니다. 결제는 계좌이체 또는 카드로 가능합니다.",
      planGuideTitle: "어떤 플랜이 맞을까요?",
      planGuide: [
        { lead: "이제 막 매장을 열었고 구글에 노출되고 싶다면:", body: "스타터 플랜" },
        { lead: "서비스가 여러 가지이고 서비스별로 고객이 찾아오게 하고 싶다면:", body: "그로스 플랜" },
        { lead: "지점이 여러 곳이거나 상품을 판매한다면:", body: "프로 플랜" },
      ],
      ctaSecondaryLabel: "문의 방법 보기",
    },
    contact: {
      metaTitle: "웹사이트 제작 상담 문의",
      metaDescription:
        "넥스트체인에 웹사이트 월 구독 플랜을 상담해 보세요. 문의 폼, 이메일, 카카오톡으로 문의하시면 영업일 기준 24시간 이내에 회신드립니다.",
      crumb: "문의",
      eyebrow: "문의",
      title: "웹사이트 제작 상담 문의",
      intro:
        "웹사이트가 어떤 용도로 필요하신지 알려 주세요. 작업 범위와 비용을 안내해 드립니다. 상담은 무료이며 플랜 가입 없이도 문의하실 수 있습니다.",
      button: "상담 신청하기",
      labels: {
        email: "이메일",
        phone: "전화",
        hours: "운영 시간",
        response: "회신 시간",
        messenger: "카카오톡 채널",
        messengerCta: "카카오톡으로 문의하기",
      },
      responseTime: "영업일 기준 24시간 이내",
    },
    success: {
      metaTitle: "문의가 접수되었습니다",
      heading: "문의해 주셔서 감사합니다!",
      subtitle: "상담 요청이 정상적으로 접수되었습니다",
      quick: { title: "빠른 회신", body: "한국 본사 상담팀이 영업일 기준 24시간 이내에 연락드립니다. ({hours})" },
      mail: {
        title: "이메일 확인",
        body: "이메일을 남겨 주셨다면 스팸함까지 함께 확인해 주세요. 남기지 않으셨다면 입력하신 연락처로 연락드립니다.",
      },
      messenger: { title: "카카오톡으로 바로 문의", before: "급한 문의는 ", link: "카카오톡 채널", after: "로 남겨 주세요." },
      back: "홈으로 돌아가기",
      questionsBefore: "궁금한 점이 있으시면 ",
      questionsAfter: "로 메일 주세요.",
    },
  },
  en: {
    home: {
      metaDescription:
        "Start a landing page or website on a monthly plan. Nextchain handles design, content, publishing and management. No setup fee, from {price}/month.",
      pricing: {
        eyebrow: "Pricing",
        title: "Billed monthly, no setup fee",
        desc: "For landing pages and small businesses. Benefits, limits and cancellation terms are clearly stated.",
        link: "See detailed pricing and FAQs →",
      },
      growth: {
        title: "A website that grows with your business",
        desc: "Within your plan, we keep updating services, product catalog, blog, photos and contact details.",
        features: [
          {
            title: "A page for each service",
            desc: "For example, a spa gets separate pages for facials, scalp care and aroma massage — each with a description, photos, approved prices and a booking inquiry button.",
          },
          {
            title: "A blog that stays fresh",
            desc: "A spa shares skin-care tips, a homestay shares local travel ideas. Nextchain drafts and checks each post, then publishes the number included in your plan.",
          },
          {
            title: "A clear product catalog",
            desc: "A salon can show hair-care products, a spa its cosmetics: photos, descriptions, options, prices and an order inquiry button.",
          },
        ],
      },
    },
    pricing: {
      metaTitle: "Monthly website plan pricing",
      metaDescription:
        "Monthly website plans from {price}. No setup fee, billed monthly. Corporate websites, online stores, software and SEO are quoted per project.",
      serviceName: "Nextchain.site monthly website plans",
      crumb: "Pricing",
      eyebrow: "Pricing",
      title: "Monthly website plan pricing",
      intro:
        "Landing pages and websites for small businesses are billed monthly with no setup fee. For larger websites or software, see the project pricing below.",
      taxNote: "Prices exclude applicable taxes. Pay by card or international bank transfer; we can issue an invoice for your business.",
      planGuideTitle: "Which plan fits you?",
      planGuide: [
        { lead: "Just opened and want to show up on Google:", body: "Starter plan" },
        { lead: "Several services, and you want customers to find each one:", body: "Growth plan" },
        { lead: "Multiple locations or you sell products:", body: "Professional plan" },
      ],
      ctaSecondaryLabel: "How to reach us",
    },
    contact: {
      metaTitle: "Contact us about your website",
      metaDescription:
        "Talk to Nextchain.site about a monthly website plan. Send a request through the form, email or WhatsApp — we reply within 1 business day.",
      crumb: "Contact",
      eyebrow: "Contact",
      title: "Contact us about your website",
      intro:
        "Tell Nextchain what you need your website for. We'll discuss options and costs; the consultation is free and you don't need to sign up for a plan.",
      button: "Request a consultation",
      labels: {
        email: "Email",
        phone: "Phone",
        hours: "Business hours",
        response: "Response time",
        messenger: "WhatsApp",
        messengerCta: "Chat on WhatsApp",
      },
      responseTime: "Within 1 business day",
    },
    success: {
      metaTitle: "Thank you",
      heading: "Thank you for getting in touch!",
      subtitle: "We've received your consultation request",
      quick: { title: "A quick reply", body: "Our team will contact you within 1 business day. ({hours})" },
      mail: {
        title: "Check your email",
        body: "If you left an email address, please check your inbox (and spam folder). If not, we'll contact you using the phone number you provided.",
      },
      messenger: { title: "Chat with us right away", before: "For urgent questions, message us on ", link: "WhatsApp", after: "." },
      back: "Back to home",
      questionsBefore: "Questions? Email us at ",
      questionsAfter: ".",
    },
  },
}
