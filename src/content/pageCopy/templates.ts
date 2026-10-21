import type { NonDefaultLocale } from "@/i18n/config"

export interface TemplatesCopy {
  index: {
    metaTitle: string
    metaDescription: string
    crumb: string
    eyebrow: string
    title: string
    intro: string
    noticeStrong: string
    noticeRest: string
    noticeCta: string
    customizeTitle: string
    customize: { title: string; desc: string }[]
    ctaTitle: string
    ctaDesc: string
  }
  detail: {
    metaTitle: string
    metaDescription: string
    eyebrow: string
    title: string
    intro: string
    openDemo: string
    consult: string
    blocksDemo: string
    blocksTemplate: string
    chooseTitle: string
    thisPageStrong: string
    thisPageRest: string
    demoBefore: string
    demoLink: string
    demoAfter: string
    solutionPageStrong: string
    solutionPageRest: string
    solutionLink: string
    servicePageStrong: string
    serviceLink: string
    solutionMid: string
    pricingLink: string
    solutionEnd: string
  }
}

export const TEMPLATES_COPY: Record<NonDefaultLocale, TemplatesCopy> = {
  ko: {
    index: {
      metaTitle: "업종별 웹사이트 참고 템플릿",
      metaDescription:
        "스파, 헤어살롱, 네일, 숙박, 식당, 카페, 치과 등 다양한 업종의 웹사이트 참고 템플릿. 모든 웹사이트는 브랜드에 맞춰 새로 디자인합니다.",
      crumb: "템플릿",
      eyebrow: "참고 템플릿",
      title: "업종별 웹사이트 참고 템플릿",
      intro:
        "{count}개 이상의 구성 예시로 완성된 웹사이트를 미리 그려 보세요. 넥스트체인은 고객마다 색상, 구성, 내용을 브랜드에 맞춰 새로 디자인합니다.",
      noticeStrong: "참고용 템플릿이며 선택의 한계가 아닙니다.",
      noticeRest: " 웹사이트는 업종, 브랜드, 실제 콘텐츠에 맞춰 새로 디자인합니다. 찾으시는 업종이 없어도 넥스트체인이 디자인해 드립니다.",
      noticeCta: "알맞은 템플릿 상담",
      customizeTitle: "템플릿은 어떻게 맞춤 제작되나요?",
      customize: [
        { title: "색상·로고", desc: "브랜드 아이덴티티에 맞추거나, 넥스트체인이 업종에 어울리는 색상 조합을 제안합니다." },
        { title: "구성·페이지", desc: "고객이 알아보고 문의하는 방식에 맞춰 섹션을 더하거나 빼고 순서를 바꿉니다." },
        { title: "내용·이미지", desc: "매장의 실제 서비스, 가격표, 사진을 사용하며 납품 시 샘플 문구는 남기지 않습니다." },
      ],
      ctaTitle: "찾으시는 업종이 없나요?",
      ctaDesc: "위 템플릿은 참고용입니다. 정보를 보내 주시면 비즈니스에 맞는 구성을 제안해 드립니다.",
    },
    detail: {
      metaTitle: "{name} 웹사이트 템플릿",
      metaDescription: "{description} 구성과 주요 페이지를 확인하시고, 알맞은 웹사이트에 대해 상담해 보세요.",
      eyebrow: "참고 템플릿",
      title: "{name} 웹사이트 템플릿",
      intro: "{style}. {description} 참고용 템플릿이며, 고객님의 웹사이트는 브랜드에 맞춰 새로 디자인합니다.",
      openDemo: "데모 열기",
      consult: "참고 템플릿 상담",
      blocksDemo: "데모에는 어떤 블록이 있나요?",
      blocksTemplate: "템플릿에는 어떤 블록이 있나요?",
      chooseTitle: "데모를 볼까요, 플랜을 상담할까요?",
      thisPageStrong: "이 페이지는",
      thisPageRest: " 구성과 사용 경험을 보여 줍니다. 방문자가 무엇을 보고 어디를 누르는지, 가격표가 어떻게 보이는지 확인하세요.",
      demoBefore: " ",
      demoLink: "{short} 데모",
      demoAfter: "를 열어 완성된 한 페이지 전체를 확인해 보세요.",
      solutionPageStrong: "솔루션 페이지는",
      solutionPageRest: " 구매 전 궁금한 점에 답합니다. 어떤 플랜이 맞는지, 비용은 얼마인지, 넥스트체인이 무엇을 하고 고객님이 무엇을 확인하는지 알려 드립니다. ",
      solutionLink: "{name} 솔루션",
      servicePageStrong: "서비스 페이지는",
      serviceLink: "{name} 서비스",
      solutionMid: " 또는 ",
      pricingLink: "요금 안내",
      solutionEnd: "를 확인해 보세요.",
    },
  },
  en: {
    index: {
      metaTitle: "Reference website templates by industry",
      metaDescription:
        "Reference website templates for spas, salons, nail studios, homestays, restaurants, cafes, dental clinics and more. Every website is designed around your brand.",
      crumb: "Templates",
      eyebrow: "Reference templates",
      title: "Reference website templates by industry",
      intro:
        "{count}+ layouts to help you picture your own website. The Nextchain team designs each website for the customer — colors, layout and content follow your brand.",
      noticeStrong: "These are reference templates, not a limit on your choices.",
      noticeRest: " Your website is designed around your industry, brand and real content. Don't see your industry? Nextchain can still design it.",
      noticeCta: "Find a template that fits",
      customizeTitle: "How are templates customized?",
      customize: [
        { title: "Colors & logo", desc: "Following your brand identity, or Nextchain suggests a color palette that suits your industry." },
        { title: "Layout & pages", desc: "Add, remove or reorder sections to match how your customers research and get in touch." },
        { title: "Content & images", desc: "Your real services, prices and photos — no sample text is left at handover." },
      ],
      ctaTitle: "Don't see your industry?",
      ctaDesc: "The templates above are for reference only. Send your details and Nextchain will suggest a layout that fits your business.",
    },
    detail: {
      metaTitle: "{name} website template",
      metaDescription: "{description} See the layout and main pages, then get in touch for a website that fits.",
      eyebrow: "Reference template",
      title: "{name} website template",
      intro: "{style}. {description} This is a reference template — your website is designed around your brand.",
      openDemo: "Open demo",
      consult: "Discuss this template",
      blocksDemo: "What blocks does the demo include?",
      blocksTemplate: "What blocks does the template include?",
      chooseTitle: "See the demo or discuss a plan?",
      thisPageStrong: "This page",
      thisPageRest: " shows the layout and experience: what visitors see, where they click and how the price list looks.",
      demoBefore: " Open the ",
      demoLink: "{short} demo",
      demoAfter: " to see a complete page.",
      solutionPageStrong: "The solution page",
      solutionPageRest: " answers the buying questions: which plan fits, what it costs, what Nextchain does and what you approve. See ",
      solutionLink: "the {name} solution",
      servicePageStrong: "The service page",
      serviceLink: "the {name} service",
      solutionMid: " or ",
      pricingLink: "pricing",
      solutionEnd: ".",
    },
  },
}
