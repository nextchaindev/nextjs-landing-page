import type { NonDefaultLocale } from "@/i18n/config"

export interface SolutionsCopy {
  index: {
    metaTitle: string
    metaDescription: string
    listName: string
    crumb: string
    eyebrow: string
    title: string
    intro: string
    notFoundBefore: string
    templatesLink: string
    notFoundMid: string
    servicesLink: string
    notFoundAfter: string
    ctaTitle: string
    ctaDesc: string
  }
  detail: {
    eyebrow: string
    seeTemplate: string
    problemsTitle: string
    pagesTitle: string
    costTitle: string
    costDesc: string
    detailsBefore: string
    pricingLink: string
    detailsMid: string
    processLink: string
    detailsAfter: string
    relatedPosts: string
    ctaTitle: string
    schemaName: string
  }
}

export const SOLUTIONS_COPY: Record<NonDefaultLocale, SolutionsCopy> = {
  ko: {
    index: {
      metaTitle: "업종별 웹사이트 솔루션",
      metaDescription:
        "스파, 헤어살롱, 네일, 숙박, 카페, 식당, 치과, 부동산, 강의 랜딩페이지. 업종에 맞춰 디자인하고 월 {price}부터 이용하실 수 있습니다.",
      listName: "업종별 웹사이트 솔루션",
      crumb: "업종별 솔루션",
      eyebrow: "업종별 솔루션",
      title: "업종마다 따로 설계하는 웹사이트",
      intro:
        "업종마다 고객이 알아보고 문의하는 방식이 다릅니다. 스파는 서비스 가격표, 숙박은 객실 목록, 카페는 메뉴와 길 안내가 필요합니다. 업종을 선택해 웹사이트에 무엇이 담기는지 확인해 보세요. 월 {price}부터, 초기 제작비는 없습니다.",
      notFoundBefore: "찾으시는 업종이 없나요? ",
      templatesLink: "참고 템플릿",
      notFoundMid: "을 보시거나 ",
      servicesLink: "프로젝트 단위 서비스",
      notFoundAfter: "를 확인해 보세요.",
      ctaTitle: "우리 업종에 어떤 웹사이트가 필요한지 모르겠나요?",
      ctaDesc: "매장 정보를 보내 주시면 영업일 기준 24시간 이내에 알맞은 구성과 플랜을 제안해 드립니다.",
    },
    detail: {
      eyebrow: "대상: {audience}",
      seeTemplate: "{short} 템플릿 보기",
      problemsTitle: "{short} 사업자가 자주 겪는 문제",
      pagesTitle: "{name}에는 이런 내용이 담깁니다",
      costTitle: "비용과 진행 절차",
      costDesc:
        "월 {price}부터 시작하며 초기 제작비는 없습니다. 보유하신 도메인 또는 넥스트체인의 무료 주소를 쓰실 수 있고, 고객님은 정보를 보내고 확인만 하시면 됩니다.",
      detailsBefore: "플랜별 자세한 내용은 ",
      pricingLink: "요금 안내",
      detailsMid: "에서, 단계별 진행은 ",
      processLink: "진행 절차",
      detailsAfter: "에서 확인하실 수 있습니다.",
      relatedPosts: "관련 글",
      ctaTitle: "{name}을(를) 시작해 보세요",
      schemaName: "{name} 제작",
    },
  },
  en: {
    index: {
      metaTitle: "Website solutions by industry",
      metaDescription:
        "Websites for spas, salons, nail studios, homestays, cafes, restaurants, dental clinics, real estate and courses. Designed for your industry, from {price}/month.",
      listName: "Website solutions by industry",
      crumb: "Solutions",
      eyebrow: "Solutions by industry",
      title: "Websites designed for each industry",
      intro:
        "Every industry has customers who research and make contact differently: a spa needs a service menu, a homestay needs a room list, a cafe needs a menu and directions. Pick your industry to see what your website will include. From {price}/month, no setup fee.",
      notFoundBefore: "Don't see your industry? Browse the ",
      templatesLink: "reference templates",
      notFoundMid: " or see the ",
      servicesLink: "project-based services",
      notFoundAfter: ".",
      ctaTitle: "Not sure what your industry needs from a website?",
      ctaDesc: "Send us your business details and Nextchain will suggest a layout and plan within 1 business day.",
    },
    detail: {
      eyebrow: "For {audience}",
      seeTemplate: "See the {short} template",
      problemsTitle: "Common problems for {short} businesses",
      pagesTitle: "What will your {name} include?",
      costTitle: "Cost and process",
      costDesc:
        "From {price}/month, no setup fee. Use your own domain or Nextchain's free address. You only send your details and approve.",
      detailsBefore: "See each plan in ",
      pricingLink: "pricing",
      detailsMid: ", and the steps in ",
      processLink: "how we work",
      detailsAfter: ".",
      relatedPosts: "Related articles",
      ctaTitle: "Start your {name}",
      schemaName: "{name} design",
    },
  },
}
