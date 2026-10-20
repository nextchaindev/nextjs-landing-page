import type { NonDefaultLocale } from "@/i18n/config"

export interface ProjectsCopy {
  index: {
    metaTitle: string
    metaDescription: string
    listName: string
    crumb: string
    eyebrow: string
    title: string
    intro: string
    ctaTitle: string
    ctaDesc: string
    ctaSecondary: string
  }
  detail: {
    consult: string
    consultContext: string
    serviceButton: string
    challenge: string
    solution: string
    platform: string
    tech: string
    featuresTitle: string
    othersTitle: string
    viewAll: string
    ctaTitle: string
    ctaDesc: string
    ctaSecondary: string
  }
}

export const PROJECTS_COPY: Record<NonDefaultLocale, ProjectsCopy> = {
  ko: {
    index: {
      metaTitle: "넥스트체인 웹사이트·AI·소프트웨어 프로젝트",
      metaDescription:
        "넥스트체인 팀이 진행한 프로젝트: 랜딩페이지, 웹사이트, AI 서비스, 매칭 플랫폼, 교육·스포츠·소매·게임 분야의 관리 소프트웨어.",
      listName: "넥스트체인이 진행한 프로젝트",
      crumb: "프로젝트",
      eyebrow: "진행한 프로젝트",
      title: "넥스트체인이 진행한 프로젝트",
      intro:
        "넥스트체인 팀이 직접 디자인하고 개발한 랜딩페이지, 웹사이트, AI 서비스, 관리 소프트웨어입니다. 고객 프로젝트와 자체 제품을 함께 소개하며, 프로젝트마다 문제, 해결 방식, 납품한 기능을 분명하게 적었습니다.",
      ctaTitle: "비슷한 프로젝트가 있으신가요?",
      ctaDesc: "필요한 내용을 보내 주시면 영업일 기준 24시간 이내에 방안과 예상 비용을 안내해 드립니다.",
      ctaSecondary: "서비스 보기",
    },
    detail: {
      consult: "비슷한 프로젝트 상담",
      consultContext: "{name}과(와) 비슷한 프로젝트",
      serviceButton: "{name} 서비스",
      challenge: "해결할 문제",
      solution: "넥스트체인의 해결 방식",
      platform: "플랫폼",
      tech: "사용 기술",
      featuresTitle: "납품한 기능",
      othersTitle: "다른 프로젝트",
      viewAll: "전체 프로젝트 보기 →",
      ctaTitle: "비슷한 {kind}이(가) 필요하신가요?",
      ctaDesc: "필요한 내용을 보내 주시면 영업일 기준 24시간 이내에 방안과 예상 비용을 안내해 드립니다.",
      ctaSecondary: "{name} 서비스 보기",
    },
  },
  en: {
    index: {
      metaTitle: "Website, AI & software projects",
      metaDescription:
        "Projects the Nextchain team has delivered: landing pages, websites, AI products, matching platforms and management software for education, sports, retail and gaming.",
      listName: "Projects delivered by Nextchain",
      crumb: "Projects",
      eyebrow: "Projects delivered",
      title: "Projects delivered by Nextchain",
      intro:
        "Landing pages, websites, AI products and management software designed and built by the Nextchain team itself, covering client work and our own products. Each project states the problem, the approach and the features delivered.",
      ctaTitle: "Have a similar project?",
      ctaDesc: "Send us what you need and Nextchain will reply within 1 business day with an approach and estimated cost.",
      ctaSecondary: "See services",
    },
    detail: {
      consult: "Discuss a similar project",
      consultContext: "a project like {name}",
      serviceButton: "{name} service",
      challenge: "The challenge",
      solution: "How Nextchain solved it",
      platform: "Platform",
      tech: "Technology",
      featuresTitle: "Features delivered",
      othersTitle: "Other projects",
      viewAll: "View all projects →",
      ctaTitle: "Need a similar {kind}?",
      ctaDesc: "Send us what you need and Nextchain will reply within 1 business day with an approach and estimated cost.",
      ctaSecondary: "See the {name} service",
    },
  },
}
