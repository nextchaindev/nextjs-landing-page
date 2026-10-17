import type { NonDefaultLocale } from "@/i18n/config"
import type { Faq } from "@/content/faqs"

/** Chữ cố định của nhóm trang dịch vụ (ko, en). Nội dung từng dịch vụ nằm ở content/{ko,en}/services.ts. */
export interface ServicesCopy {
  index: {
    metaTitle: string
    metaDescription: string
    crumb: string
    eyebrow: string
    title: string
    intro: string
    managementTitle: string
    managementDesc: string
    managementCta: string
    industriesTitle: string
  }
  detail: {
    forAudience: string
    seePricing: string
    summary: string
    whyTitle: string
    subscriptionTitle: string
    subscriptionDesc: string
    comparePlans: string
    projectTitle: string
    projectDesc: string
    scopeTitle: string
    youGet: string
    notIncluded: string
    updatesBefore: string
    updatesLink: string
    updatesAfter: string
    processTitle: string
    moreTitle: string
    relatedTitle: string
    otherServices: string
    ctaTitle: string
    offerName: string
    unitText: string
    contextBack: string
  }
  management: {
    metaTitle: string
    metaDescription: string
    eyebrow: string
    title: string
    intro: string
    tasksTitle: string
    tasks: { title: string; desc: string }[]
    noteBefore: string
    noteLink: string
    noteAfter: string
    faqs: Faq[]
  }
}

export const SERVICES_COPY: Record<NonDefaultLocale, ServicesCopy> = {
  ko: {
    index: {
      metaTitle: "웹사이트 제작·SEO·소프트웨어 서비스",
      metaDescription:
        "랜딩페이지 올인원 제작은 월 {price}부터. 기업 웹사이트, 쇼핑몰, 맞춤 제작, SEO, 소프트웨어는 프로젝트 단위로 진행합니다.",
      crumb: "서비스",
      eyebrow: "서비스",
      title: "웹사이트 올인원 제작과 기업을 위한 기술 서비스",
      intro:
        "랜딩페이지와 소규모 사업자용 웹사이트는 초기 제작비 없이 월 단위로 결제합니다. 기업 웹사이트, 쇼핑몰, 소프트웨어, 마케팅·SEO는 공개된 요금표에 따라 프로젝트 단위로 진행합니다.",
      managementTitle: "월 단위 웹사이트 운영 관리",
      managementDesc: "콘텐츠 수정, 유지보수, 백업, 기술 지원까지. 직접 관리하지 않으셔도 됩니다.",
      managementCta: "자세히 보기",
      industriesTitle: "업종별 솔루션",
    },
    detail: {
      forAudience: "대상: {audience}.",
      seePricing: "요금 보기",
      summary: "요약",
      whyTitle: "넥스트체인의 {name} 서비스가 좋은 이유",
      subscriptionTitle: "월 구독 요금",
      subscriptionDesc:
        "초기 제작비가 없습니다. 디자인, 호스팅, SSL, 콘텐츠 수정이 모두 포함된 금액입니다. 넥스트체인의 무료 주소를 쓰거나 보유하신 도메인을 연결하실 수 있습니다.",
      comparePlans: "전체 플랜 비교하기 →",
      projectTitle: "{name} 요금",
      projectDesc: "패키지별 참고 금액입니다. 문의해 주시면 프로젝트에 맞는 정확한 견적을 안내해 드립니다.",
      scopeTitle: "작업 범위",
      youGet: "제공 내용",
      notIncluded: "포함되지 않는 것",
      updatesBefore: "납품 후에도 꾸준한 수정이 필요하신가요? ",
      updatesLink: "월 단위 웹사이트 운영 관리",
      updatesAfter: "를 확인해 보세요.",
      processTitle: "진행 절차",
      moreTitle: "더 알아보기",
      relatedTitle: "관련 글·페이지",
      otherServices: "다른 서비스",
      ctaTitle: "{name} 프로젝트를 시작해 보세요",
      offerName: "{name} 플랜",
      unitText: "월",
      contextBack: "{name}",
    },
    management: {
      metaTitle: "월 단위 웹사이트 운영 관리",
      metaDescription:
        "월 단위 웹사이트 운영 관리: 서비스·가격·사진·블로그 수정, 유지보수, 백업, 기술 지원. 요청만 보내 주시면 넥스트체인이 처리합니다.",
      eyebrow: "서비스",
      title: "월 단위 웹사이트 운영 관리: 사장님은 사업에, 웹사이트는 넥스트체인에",
      intro:
        "웹사이트는 정보가 항상 정확해야 쓸모가 있습니다. 넥스트체인의 월 구독 플랜에는 콘텐츠 수정, 기술 유지보수, 지원이 포함되어 있어 직접 로그인하거나 도구를 배우실 필요가 없습니다.",
      tasksTitle: "넥스트체인이 매달 해 드리는 일",
      tasks: [
        { title: "서비스·가격표 업데이트", desc: "메뉴가 바뀌면 서비스를 추가·수정·숨김 처리합니다. 주요 서비스마다 전용 페이지를 둘 수 있습니다." },
        { title: "블로그", desc: "넥스트체인이 초안을 쓰고 정보를 확인하며, 고객님이 확인한 뒤에 게시합니다. 편수는 플랜에 따라 다릅니다." },
        { title: "상품 페이지", desc: "판매 중인 상품의 사진, 설명, 옵션, 가격, 구매 문의 버튼을 관리합니다." },
        { title: "사진·연락처", desc: "매장 사진, 영업시간, 지점 주소, 전화번호를 교체합니다." },
        { title: "기술 유지보수", desc: "호스팅, SSL, 백업, 사이트 가동 상태 확인, 발생한 오류 수정." },
        { title: "기술 SEO", desc: "새 페이지를 추가해도 제목, 설명, 사이트맵, 구조화 데이터가 올바르게 유지되도록 관리합니다." },
      ],
      noteBefore: "월별 수정 횟수와 블로그 편수는 플랜마다 다릅니다. ",
      noteLink: "요금 안내",
      noteAfter: "를 확인해 주세요.",
      faqs: [
        {
          q: "수정 요청은 어떻게 보내나요?",
          a: "시작할 때 정한 이메일 또는 지원 채널로 보내 주세요. 넥스트체인이 요청을 확인하고 완료 예정 시간을 안내합니다.",
        },
        {
          q: "플랜 범위를 넘는 요청은 어떻게 되나요?",
          a: "추가 작업은 진행 전에 견적을 안내해 드립니다. 고객님이 동의하기 전에는 어떤 비용도 청구하지 않습니다.",
        },
        {
          q: "블로그 글은 누가 쓰나요?",
          a: "넥스트체인 콘텐츠팀이 작성하고 정보를 확인한 뒤, 게시 전에 고객님께 확인을 요청합니다.",
        },
      ],
    },
  },
  en: {
    index: {
      metaTitle: "Website, SEO & software services",
      metaDescription:
        "All-in-one landing pages from {price}/month. Corporate websites, online stores, custom design, SEO and software are done as projects.",
      crumb: "Services",
      eyebrow: "Services",
      title: "All-in-one websites and technology services for businesses",
      intro:
        "Landing pages and websites for small businesses are billed monthly with no setup fee. Corporate websites, online stores, software and Marketing & SEO are done per project with published pricing.",
      managementTitle: "Monthly website management",
      managementDesc: "Content updates, maintenance, backups and technical support — you don't have to do it yourself.",
      managementCta: "Learn more",
      industriesTitle: "Solutions by industry",
    },
    detail: {
      forAudience: "For: {audience}.",
      seePricing: "See pricing",
      summary: "Summary",
      whyTitle: "Why choose Nextchain's {name} service?",
      subscriptionTitle: "Monthly plan pricing",
      subscriptionDesc:
        "No setup fee. The price includes design, hosting, SSL and content updates. Use Nextchain's free address or connect your own domain.",
      comparePlans: "Compare all plans →",
      projectTitle: "{name} pricing",
      projectDesc: "Guide prices by package. Contact us for detailed advice and an exact quote for your project.",
      scopeTitle: "Scope of work",
      youGet: "What you get",
      notIncluded: "Not included",
      updatesBefore: "Need regular updates after handover? See ",
      updatesLink: "monthly website management",
      updatesAfter: ".",
      processTitle: "How we work",
      moreTitle: "Learn more",
      relatedTitle: "Related articles & pages",
      otherServices: "Other services",
      ctaTitle: "Start your {name} project",
      offerName: "{name} plan",
      unitText: "month",
      contextBack: "{name}",
    },
    management: {
      metaTitle: "Monthly website management",
      metaDescription:
        "Monthly website management: updates to services, prices, photos and blog; maintenance, backups and technical support. You send requests, Nextchain does the work.",
      eyebrow: "Services",
      title: "Monthly website management: you run the business, Nextchain runs the website",
      intro:
        "A website is only useful when its information is always correct. Nextchain's monthly plans include content updates, technical maintenance and support, so you don't have to log in or learn any tools.",
      tasksTitle: "What Nextchain does every month",
      tasks: [
        { title: "Service & price updates", desc: "Add, edit or hide services when your menu changes. Each main service can have its own page." },
        { title: "Blog", desc: "Nextchain drafts and fact-checks; you approve before anything is published. The number of posts depends on your plan." },
        { title: "Product pages", desc: "Photos, descriptions, options, prices and an order inquiry button for the products you sell." },
        { title: "Photos & contact details", desc: "Swap in new photos, opening hours, branch addresses and phone numbers." },
        { title: "Technical maintenance", desc: "Hosting, SSL, backups, uptime monitoring and fixing issues as they arise." },
        { title: "Technical SEO", desc: "Keep titles, descriptions, the sitemap and structured data correct as new pages are added." },
      ],
      noteBefore: "The number of edits and blog posts per month differs by plan — see ",
      noteLink: "pricing",
      noteAfter: ".",
      faqs: [
        {
          q: "How do I send an edit request?",
          a: "By email or the support channel we agree on at the start. Nextchain confirms your request and tells you when it will be done.",
        },
        {
          q: "What if a request goes beyond my plan?",
          a: "Nextchain quotes the extra work before doing it. Nothing is charged until you agree.",
        },
        {
          q: "Who writes the blog posts for my website?",
          a: "Nextchain's content team writes and fact-checks them, then sends them to you for approval before publishing.",
        },
      ],
    },
  },
}
