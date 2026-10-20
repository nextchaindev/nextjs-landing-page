import type { NonDefaultLocale } from "@/i18n/config"

/** Chữ của trang quy trình, so sánh tự làm/thuê trọn gói và giới thiệu. */
export interface MiscCopy {
  process: {
    metaTitle: string
    metaDescription: string
    crumb: string
    eyebrow: string
    title: string
    intro: string
    prepareTitle: string
    prepare: string[]
    notEnoughBefore: string
    templatesLink: string
    notEnoughAfter: string
  }
  compare: {
    metaTitle: string
    metaDescription: string
    crumb: string
    eyebrow: string
    title: string
    intro: string
    tableTitle: string
    headers: [string, string, string]
    rows: [string, string, string][]
    whenTitle: string
    diyTitle: string
    diyDesc: string
    doneTitle: string
    doneDesc: string
    seeBefore: string
    pricingLink: string
    seeMid: string
    corporateLink: string
    seeAfter: string
    ctaTitle: string
  }
  about: {
    metaTitle: string
    metaDescription: string
    crumb: string
    eyebrow: string
    title: string
    intro: string
    principlesTitle: string
    principles: { title: string; desc: string }[]
    infoTitle: string
    operator: string
    email: string
    phone: string
    moreBefore: string
    processLink: string
    moreMid: string
    termsLink: string
    moreAfter: string
  }
}

export const MISC_COPY: Record<NonDefaultLocale, MiscCopy> = {
  ko: {
    process: {
      metaTitle: "웹사이트 올인원 제작 진행 절차",
      metaDescription:
        "넥스트체인과 함께하는 4단계 웹사이트 제작 절차: 상담·분석, 솔루션 설계, 개발·적용, 인도·운영 지원. 단계마다 투명하게 진행합니다.",
      crumb: "진행 절차",
      eyebrow: "진행 절차",
      title: "진행 절차: 상담, 설계, 적용, 그리고 운영 지원",
      intro:
        "전문적이고 투명한 단계별 진행입니다. 디자인이나 코딩을 몰라도 괜찮습니다. 정보를 보내고 확인만 해 주시면 나머지는 넥스트체인이 진행합니다.",
      prepareTitle: "무엇을 준비하면 되나요?",
      prepare: [
        "매장 이름, 주소, 영업시간",
        "서비스·상품 목록과 가격",
        "매장·상품·직원 사진 (있다면)",
        "로고와 브랜드 색상 (있다면)",
        "전화번호, 카카오톡 채널, SNS 계정",
        "사용 중인 도메인 (있다면)",
      ],
      notEnoughBefore: "사진이나 내용이 부족해도 괜찮습니다. 넥스트체인이 추가로 여쭤보고 제안해 드립니다. ",
      templatesLink: "업종별 템플릿",
      notEnoughAfter: "으로 완성된 모습을 미리 확인해 보세요.",
    },
    compare: {
      metaTitle: "직접 만들까, 올인원으로 맡길까?",
      metaDescription: "직접 만들지 올인원으로 맡길지 고민이신가요? 시간, 비용, 직접 해야 할 일, 운영 책임을 비교해 보세요.",
      crumb: "직접 vs 올인원",
      eyebrow: "결정하기 전에 비교해 보세요",
      title: "랜딩페이지, 직접 만들까 올인원으로 맡길까?",
      intro: "모든 과정을 직접 챙기고 싶으신가요, 아니면 사업에 시간을 쓰고 싶으신가요? 선택하기 전에 해야 할 일, 비용, 운영 방식을 비교해 보세요.",
      tableTitle: "실제 작업 기준으로 비교",
      headers: ["항목", "도구로 직접 제작", "넥스트체인 올인원 제작"],
      rows: [
        ["내 시간", "도구를 배우고, 문구를 쓰고, 화면을 점검하고, 오류를 직접 고칩니다", "정보를 보내고, 의견을 주고, 최종본을 확인합니다"],
        ["비용", "도구·도메인 비용과 직접 들이는 시간 (플랫폼에 따라 다름)", "플랜별 서비스 요금, 범위는 사전에 안내"],
        ["판매용 문구", "직접 쓰거나 별도로 작가를 구합니다", "보내 주신 정보로 팀이 작성하고 고객님이 확인합니다"],
        ["분석·연동", "직접 설정하거나 플랫폼에 맞는 개발자를 구합니다", "필요를 먼저 파악하고, 고급 연동은 범위에 따라 견적을 드립니다"],
        ["게시 이후", "직접 수정하고, 확인하고, 오류를 처리합니다", "플랜에 포함된 횟수만큼 넥스트체인이 유지보수와 수정을 진행합니다"],
      ],
      whenTitle: "언제 직접 만들고, 언제 맡기면 좋을까요?",
      diyTitle: "시간이 있다면 직접 만드세요",
      diyDesc: "직접 쓰고, 디자인하고, 수정하고 싶으실 때 적합합니다. 대신 수정할 때마다 문의 폼, 도메인, 모바일 화면을 직접 점검하셔야 합니다.",
      doneTitle: "대신 해 줄 사람이 필요하다면 맡기세요",
      doneDesc: "정보를 보내고 확인만 하시면 넥스트체인이 합의한 범위대로 진행합니다. 가입 전에 수정 횟수와 해지 조건을 꼭 확인해 보세요.",
      seeBefore: "",
      pricingLink: "월 구독 요금",
      seeMid: " 또는 ",
      corporateLink: "기업용 솔루션",
      seeAfter: "도 확인해 보세요.",
      ctaTitle: "확인만 하세요. 진행은 넥스트체인이 맡습니다",
    },
    about: {
      metaTitle: "회사 소개",
      metaDescription:
        "Nextchain.site는 Nextchain Tech가 운영합니다. 소규모 사업자를 위한 웹사이트 제작·운영 월 구독 서비스. 운영 주체와 일하는 방식을 소개합니다.",
      crumb: "회사 소개",
      eyebrow: "회사 소개",
      title: "Nextchain.site — 소규모 사업자를 위한 전문 웹사이트, A부터 Z까지",
      intro:
        "Nextchain.site는 {company}가 운영하는 서비스입니다. 스파, 살롱, 숙박업, 지역 서비스 사업자가 직접 디자인하거나 기술을 관리하지 않고도 웹사이트를 가질 수 있도록 돕습니다.",
      principlesTitle: "일하는 방식",
      principles: [
        { title: "모든 내용은 사장님이 확인", desc: "디자인과 콘텐츠는 넥스트체인이 준비하고, 사장님이 확정하기 전에는 어떤 내용도 게시하지 않습니다." },
        { title: "작업 범위를 분명하게", desc: "플랜마다 포함되는 것과 포함되지 않는 것을 적어 둡니다. 추가 작업은 진행 전에 견적을 안내합니다." },
        { title: "검증되지 않은 수치는 쓰지 않습니다", desc: "구글 순위나 매출 증가를 약속하지 않습니다. 증명할 수 있는 것만 소개합니다." },
      ],
      infoTitle: "운영 정보",
      operator: "운영 주체",
      email: "이메일",
      phone: "전화",
      moreBefore: "더 알아보기: ",
      processLink: "진행 절차",
      moreMid: ", ",
      termsLink: "이용약관",
      moreAfter: "",
    },
  },
  en: {
    process: {
      metaTitle: "How all-in-one website creation works",
      metaDescription:
        "The 4-step process for building a website with Nextchain: discovery & analysis, solution design, development & launch, handover & support. Transparent at every step.",
      crumb: "Process",
      eyebrow: "Process",
      title: "How we work: discovery, design, launch and ongoing support",
      intro:
        "A professional, transparent process at every step. You don't need to know design or code — just provide your information and approve; Nextchain does the rest.",
      prepareTitle: "What do you need to prepare?",
      prepare: [
        "Business name, address, opening hours",
        "List of services/products and prices",
        "Photos of your space, products, team (if you have them)",
        "Logo and brand colors (if you have them)",
        "Phone number, messaging app, social accounts",
        "The domain you already use (if any)",
      ],
      notEnoughBefore: "Missing photos or content? Nextchain will ask and suggest options. Browse the ",
      templatesLink: "website templates by industry",
      notEnoughAfter: " to picture the result.",
    },
    compare: {
      metaTitle: "DIY or done-for-you landing page?",
      metaDescription: "Build it yourself or have it done for you? Compare time, cost, what you do yourself and who runs it afterwards.",
      crumb: "DIY or done-for-you",
      eyebrow: "Compare before you decide",
      title: "Build your landing page yourself or have it done for you?",
      intro: "Do you want control over every step, or time for your business? Compare the work, the cost and how it's run before choosing.",
      tableTitle: "Compared by the real work involved",
      headers: ["Criteria", "DIY with a website builder", "Nextchain done-for-you"],
      rows: [
        ["Your time", "Learn the tool, write the content, check the display and fix problems yourself", "Provide information, give feedback and approve the final version"],
        ["Cost", "Tool and domain fees plus your own time; depends on the platform", "Service fee per plan, with scope stated up front"],
        ["Sales copy", "You write it or hire a writer separately", "Our team writes from the information you provide; you approve"],
        ["Tracking & integrations", "You set them up or hire a developer for your platform", "We assess your needs; advanced integrations are quoted by scope"],
        ["After launch", "You update, monitor and fix problems yourself", "Nextchain maintains and edits, up to the number of edits in your plan"],
      ],
      whenTitle: "When to DIY, and when to hire?",
      diyTitle: "DIY when you have the time",
      diyDesc: "You want to write, design and update the page yourself. In return, you check the form, the domain and the mobile display after every change.",
      doneTitle: "Hire when you want someone to do it for you",
      doneDesc: "You provide information and approve; Nextchain delivers within the agreed scope. Check the number of edits and the cancellation terms before signing up.",
      seeBefore: "See ",
      pricingLink: "monthly plan pricing",
      seeMid: " or ",
      corporateLink: "business solutions",
      seeAfter: ".",
      ctaTitle: "You only approve — Nextchain handles the build",
    },
    about: {
      metaTitle: "About us",
      metaDescription:
        "Nextchain.site is operated by Nextchain Tech: websites built and managed on monthly plans for small businesses. About the operator and how we work.",
      crumb: "About us",
      eyebrow: "About us",
      title: "Nextchain.site — professional websites for small businesses, done from A to Z",
      intro:
        "Nextchain.site is a service operated by {company}, helping spas, salons, homestays and local service businesses get a website without designing it or managing the technology themselves.",
      principlesTitle: "How we work",
      principles: [
        { title: "The owner approves all content", desc: "The Nextchain team prepares the design and content; nothing is published until the business owner confirms it." },
        { title: "Clear scope", desc: "Every plan states what is and isn't included. Extra work is quoted before we start." },
        { title: "No unverifiable numbers", desc: "Nextchain doesn't promise Google rankings or sales growth. We only present what we can prove." },
      ],
      infoTitle: "Company information",
      operator: "Operated by",
      email: "Email",
      phone: "Phone",
      moreBefore: "Learn more about our ",
      processLink: "process",
      moreMid: " and ",
      termsLink: "terms of service",
      moreAfter: ".",
    },
  },
}
