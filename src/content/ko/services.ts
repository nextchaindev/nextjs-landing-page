import type { ServiceTexts } from "../services"
import { getFreeSubdomainExample, getStartingPrice } from "../plans"
import { getProjectServices } from "../projectPricing"

const STARTING_PRICE = getStartingPrice("ko")
const FREE_SUBDOMAIN_EXAMPLE = getFreeSubdomainExample("ko")
const PROJECT_PRICES = getProjectServices("ko")
const CORPORATE_PRICE = PROJECT_PRICES.corporate.packages[0].price
const ECOMMERCE_PRICE = PROJECT_PRICES.ecommerce.packages[0].price
const CUSTOM_PRICE = PROJECT_PRICES.custom.packages[0].price
const MARKETING_PRICE = PROJECT_PRICES.marketing.packages[0].price
const SOFTWARE_PRICE = PROJECT_PRICES.software.packages[0].price

export const KO_SERVICE_TEXTS: ServiceTexts = {
  "thiet-ke-landing-page": {
    slug: "landing-page",
    name: "랜딩페이지 올인원 제작",
    metaTitle: "월 구독형 랜딩페이지 올인원 제작",
    metaDescription: `월 ${STARTING_PRICE}부터 시작하는 랜딩페이지 올인원 제작. 초기 제작비 없이 업종별 디자인, 호스팅, SSL, SEO, 콘텐츠 업데이트까지 제공합니다. 보유 도메인 또는 무료 주소를 사용할 수 있습니다.`,
    h1: "랜딩페이지 올인원 제작, 월 구독으로 운영",
    summary: `넥스트체인은 소규모 사업자를 위한 랜딩페이지를 올인원으로 제작합니다. 정보를 보내 주시면 저희가 준비한 3가지 디자인안 중 하나를 고르고 콘텐츠를 확인해 주시면 됩니다. 게시, 도메인 연결, SEO 설정, 매월 업데이트는 넥스트체인이 진행합니다. 월 ${STARTING_PRICE}부터, 초기 제작비는 없으며 보유하신 도메인 또는 무료 주소 ${FREE_SUBDOMAIN_EXAMPLE}를 사용할 수 있습니다.`,
    audience: "스파, 미용실, 숙박업소 등 지역 서비스 사업자",
    imageAlt: "넥스트체인이 디자인한 아파트 분양 랜딩페이지",
    benefits: [
      {
        title: "디자인을 몰라도 괜찮습니다",
        desc: "정보를 보내고 확인만 해 주세요. 구성, 콘텐츠, 기술 작업은 넥스트체인이 진행합니다.",
      },
      {
        title: "3가지 디자인안 중에서 선택",
        desc: "넥스트체인 팀이 사업장의 실제 콘텐츠를 담은 세 가지 디자인안을 준비하므로 비교해 보고 고르실 수 있습니다.",
      },
      {
        title: "항상 최신 상태로 유지",
        desc: "가격 변경, 서비스 추가, 사진 교체가 필요하면 요청만 보내 주세요. 월 구독 범위 안에서 넥스트체인이 처리합니다.",
      },
    ],
    deliverables: [
      "실제 콘텐츠를 반영한 디자인안 3종",
      "소개, 서비스, 행동 유도 문구 작성",
      "문의 폼, 전화 걸기 버튼, 카카오톡 채널 버튼",
      `무료 주소 ${FREE_SUBDOMAIN_EXAMPLE} 제공 또는 보유 도메인 연결`,
      "호스팅, SSL 인증서(https)",
      "제목, 설명, 사이트맵, 구조화 데이터",
      "구독 플랜에 따른 월간 콘텐츠 업데이트",
    ],
    notIncluded: [
      "개별 도메인 구입 및 갱신 비용(사용하는 경우)",
      "구글/페이스북 광고 집행 비용",
      "매장 현장 사진 촬영",
      "구글 검색 순위 보장",
    ],
    faqs: [
      {
        q: "랜딩페이지와 여러 페이지로 된 웹사이트는 어떻게 다른가요?",
        a: "랜딩페이지는 상담 문의 받기와 같은 하나의 목표에 집중한 한 페이지입니다. 여러 페이지 웹사이트는 서비스별 페이지, 블로그, 상세 정보를 따로 갖추고 있어서 고객이 구글에서 각 서비스를 찾게 하고 싶을 때 적합합니다.",
      },
      {
        q: "월 구독에 초기 제작비가 있나요?",
        a: "아니요. 플랜별 월 이용료만 내시면 되며, 디자인, 호스팅, SSL, 콘텐츠 업데이트가 포함되어 있습니다.",
      },
      {
        q: "도메인을 따로 구매해야 하나요?",
        a: `필수는 아닙니다. 무료 주소 ${FREE_SUBDOMAIN_EXAMPLE}를 사용하셔도 되고, .com, .kr 등 원하는 도메인을 직접 구매하시면 넥스트체인이 연결해 드립니다.`,
      },
      {
        q: "구독을 해지하면 랜딩페이지는 어떻게 되나요?",
        a: "콘텐츠와 도메인 인계 방법은 해지 정책에 따릅니다. 자세한 내용은 문의해 주시면 안내해 드립니다.",
      },
    ],
    related: [
      { href: "/blog/chi-phi-thiet-ke-landing-page", label: "랜딩페이지 제작 비용에는 무엇이 포함되나요?" },
      { href: "/giai-phap/website-spa", label: "스파 랜딩페이지" },
      { href: "/mau-website", label: "업종별 웹사이트 템플릿" },
    ],
  },
  "thiet-ke-website-doanh-nghiep": {
    slug: "corporate-website",
    name: "기업 웹사이트",
    metaTitle: "전문 기업 웹사이트 제작",
    metaDescription: `${CORPORATE_PRICE}부터 시작하는 기업 웹사이트 제작. 5~15페이지 이상, 콘텐츠 관리, 블로그, 다국어, SEO를 갖춰 브랜드 신뢰를 높이고 구글에서 고객을 만나 보세요.`,
    h1: "기업 웹사이트 제작: 브랜드 신뢰를 높이고 구글에서 고객을 만나세요",
    summary: `넥스트체인의 기업 웹사이트는 회사, 서비스, 프로젝트, 소식을 여러 페이지로 나누어 소개하며 콘텐츠 관리 시스템이 포함됩니다. 5~7페이지 구성이 ${CORPORATE_PRICE}부터이며, 규모에 따라 7~30일 안에 완료합니다. 다국어와 SEO를 지원합니다.`,
    audience: "서비스, 제조, 교육, 건설, B2B 기업",
    imageAlt: "넥스트체인이 디자인한 교육기관 입학 안내 웹사이트",
    benefits: [
      {
        title: "고객에게 신뢰를 줍니다",
        desc: "회사, 서비스, 팀 정보를 명확히 보여 주면 고객과 파트너가 안심하고 문의할 수 있습니다.",
      },
      {
        title: "서비스마다 별도 페이지",
        desc: "서비스별 페이지가 있으면 고객이 특정 서비스를 검색할 때 구글이 해당 페이지를 알맞게 보여 줄 수 있습니다.",
      },
      {
        title: "소식을 직접 업데이트",
        desc: "개발자 없이도 간단한 관리자 페이지에서 소식, 채용 공고, 새 프로젝트를 올릴 수 있습니다.",
      },
    ],
    deliverables: [
      "홈, 회사 소개, 서비스, 프로젝트, 소식, 문의 페이지",
      "콘텐츠 관리 시스템",
      "구글 지도, 문의 폼",
      "다국어 지원(Premium 이상)",
      "온페이지 SEO, 사이트맵, 구조화 데이터",
      "관리자 페이지 사용법 교육",
    ],
    notIncluded: ["기업 사진 촬영", "구글 검색 순위 보장"],
    faqs: [
      {
        q: "기업 웹사이트는 몇 페이지가 필요한가요?",
        a: "소규모 기업은 보통 홈, 회사 소개, 서비스, 블로그, 문의 페이지가 필요합니다. 서비스가 여러 개라면 서비스마다 페이지를 따로 만드는 것이 좋습니다.",
      },
      {
        q: "여러 언어를 지원하나요?",
        a: "Premium은 2개 언어, Professional은 3개 이상의 언어를 지원합니다.",
      },
    ],
    related: [
      { href: "/blog/landing-page-khac-website-doanh-nghiep", label: "랜딩페이지와 기업 웹사이트, 무엇이 다를까요?" },
      { href: "/dich-vu/quan-tri-website-theo-thang", label: "월 단위 웹사이트 운영 관리" },
    ],
  },
  "thiet-ke-website-ban-hang": {
    slug: "ecommerce-website",
    name: "쇼핑몰 웹사이트",
    metaTitle: "전문 쇼핑몰 웹사이트 제작",
    metaDescription: `${ECOMMERCE_PRICE}부터 시작하는 쇼핑몰 웹사이트 제작. 장바구니, 온라인 결제, 주문·재고 관리, 쿠폰, 상품 SEO를 제공합니다. 오픈마켓에만 의존하지 않고 24시간 판매하세요.`,
    h1: "쇼핑몰 웹사이트 제작: 오픈마켓에 의존하지 않고 24시간 판매",
    summary: `넥스트체인은 장바구니, 온라인 결제, 주문·재고 관리를 갖춘 쇼핑몰 웹사이트를 구축합니다. 상품 최대 100개 구성이 ${ECOMMERCE_PRICE}부터이며, 패키지에 따라 10~45일 안에 완료합니다. 상품 소개만 필요한 소규모 매장은 월 구독 프로 플랜을 이용할 수 있습니다.`,
    audience: "패션, 화장품, 식품, 생활용품 매장과 소매 브랜드",
    imageAlt: "상품 소개 웹사이트 화면",
    benefits: [
      {
        title: "나만의 판매 채널",
        desc: "오픈마켓에만 의존하지 않고, 문의한 고객의 연락처를 직접 보유해 다시 안내할 수 있습니다.",
      },
      {
        title: "상품을 구글에 노출",
        desc: "상품마다 별도 페이지가 생기고, 알맞은 제목, 설명, 구조화 데이터가 적용됩니다.",
      },
      {
        title: "업데이트도 맡겨 주세요",
        desc: "상품 추가, 가격 변경, 사진 교체는 패키지 범위 안에서 넥스트체인이 처리합니다.",
      },
    ],
    deliverables: [
      "카테고리, 상품 페이지, 장바구니, 결제",
      "결제 대행사 및 배송 연동",
      "주문, 재고, 고객 관리",
      "쿠폰 및 프로모션(Premium 이상)",
      "상품 SEO, 사이트맵, 구조화 데이터",
      "매출 리포트",
    ],
    notIncluded: [
      "결제 대행사 및 배송업체별 수수료",
      "전체 상품 정보 입력 작업(별도 견적)",
    ],
    faqs: [
      {
        q: "오픈마켓에서 이미 판매 중인데 웹사이트도 필요할까요?",
        a: "오픈마켓은 새로운 고객에게 다가가는 데 도움이 되고, 웹사이트는 브랜드를 쌓고 단골 고객을 유지하며 상품을 더 자세히 소개하는 데 도움이 됩니다. 많은 매장이 둘을 함께 운영합니다.",
      },
      {
        q: "상품은 몇 개까지 등록할 수 있나요?",
        a: "Basic은 최대 100개이며, Premium과 Professional은 제한이 없습니다.",
      },
    ],
    related: [
      { href: "/giai-phap/website-salon", label: "상품 페이지가 있는 미용실 웹사이트" },
      { href: "/bang-gia", label: "프로 플랜" },
    ],
  },
  "thiet-ke-website-theo-yeu-cau": {
    slug: "custom-website",
    name: "맞춤 제작",
    metaTitle: "맞춤형 웹사이트 제작",
    metaDescription: `${CUSTOM_PRICE}부터 시작하는 맞춤형 웹사이트 제작. 업무 분석, 고유한 UI/UX, 맞춤 기능, 관리자 페이지, API 및 외부 시스템 연동을 진행합니다.`,
    h1: "맞춤형 웹사이트 제작: 우리 업무에 맞는 고유한 기능",
    summary: `기존 템플릿으로 해결되지 않을 때, 넥스트체인이 업무를 분석해 고유한 디자인과 기능을 갖춘 웹사이트를 구축합니다. 예약, 고객 포털, 내부 관리자 페이지, API 연동 등을 구현할 수 있습니다. ${CUSTOM_PRICE}부터이며, 복잡도에 따라 14~60일 이상 소요됩니다.`,
    audience: "고유한 업무 프로세스를 가진 기업, 서비스 플랫폼",
    imageAlt: "맞춤 제작한 리무진 예약 랜딩페이지",
    benefits: [
      {
        title: "우리 업무 방식 그대로",
        desc: "정해진 틀에 맞추지 않고, 기업이 실제로 운영하는 방식에 맞춰 기능을 설계합니다.",
      },
      {
        title: "개발 전에 먼저 확인",
        desc: "화면과 사용 흐름을 디자인 시안으로 먼저 확인한 뒤 개발을 시작합니다.",
      },
      {
        title: "나중에도 확장 가능",
        desc: "기술 문서를 명확히 정리해 두므로 사업이 성장할 때 기능을 추가할 수 있습니다.",
      },
    ],
    deliverables: [
      "요구사항 분석 및 기능 명세",
      "화면 디자인 및 사용 흐름 설계",
      "개발 및 외부 시스템 연동",
      "테스트 및 기술 문서",
    ],
    notIncluded: ["인프라 및 외부 서비스 비용(실비 기준 안내)"],
    faqs: [
      {
        q: "정확한 비용은 어떻게 알 수 있나요?",
        a: "요구사항 분석 미팅 후 넥스트체인이 기능 명세서와 항목별 견적서를 보내 드립니다.",
      },
      {
        q: "소스 코드의 소유권은 어떻게 되나요?",
        a: "작업 시작 전에 계약서에 명확히 합의합니다.",
      },
    ],
    related: [
      { href: "/dich-vu/phat-trien-phan-mem", label: "소프트웨어 개발" },
      { href: "/quy-trinh", label: "진행 절차" },
    ],
  },
  "marketing-seo": {
    slug: "marketing-seo",
    name: "마케팅·SEO",
    metaTitle: "마케팅·웹사이트 SEO 서비스",
    metaDescription: `${MARKETING_PRICE}부터 시작하는 SEO 및 온라인 마케팅. 키워드 조사, 온페이지·기술 SEO, 콘텐츠, 구글 비즈니스 프로필, 구글 광고, 정기 리포트를 제공합니다.`,
    h1: "마케팅·SEO: 웹사이트를 알맞은 고객에게 연결합니다",
    summary: `넥스트체인은 기술 SEO, 콘텐츠, 광고를 통해 웹사이트의 방문과 전환을 늘립니다. ${MARKETING_PRICE}부터 시작하며 키워드 조사, 온페이지 최적화, 구글 비즈니스 프로필 설정, 구글 애널리틱스 설정, 정기 리포트가 포함됩니다. 넥스트체인은 특정 검색 순위를 보장하지 않습니다.`,
    audience: "이미 웹사이트가 있고 구글 검색과 광고를 통한 유입을 늘리고 싶은 기업",
    imageAlt: "스마트폰에 표시된 레스토랑 웹사이트",
    benefits: [
      {
        title: "고객이 찾아옵니다",
        desc: "SEO를 하면 고객이 알맞은 서비스를 검색할 때 웹사이트가 노출됩니다. 광고보다 오래 유지되는 유입 경로입니다.",
      },
      {
        title: "고객의 질문에 맞는 콘텐츠",
        desc: "고객의 질문에 바로 답하는 글을 구조화 데이터와 일관된 정보와 함께 제공하므로 구글이 노출하고 인용하기 쉽습니다.",
      },
      {
        title: "투명한 리포트",
        desc: "구글 애널리틱스와 서치 콘솔로 방문 수, 검색어, 문의 수를 확인할 수 있습니다.",
      },
    ],
    deliverables: [
      "검색 의도에 따른 키워드 조사",
      "온페이지 및 기술 SEO(속도, 사이트맵, 스키마)",
      "구글 비즈니스 프로필, 애널리틱스, 서치 콘솔",
      "사실 확인을 거친 블로그 콘텐츠",
      "광고 설정 및 모니터링(범위에 따름)",
      "정기 리포트",
    ],
    notIncluded: [
      "구글/메타에 지불하는 광고비",
      "백링크 구매 또는 구글 정책에 위반되는 방식",
      "색인만을 노린 부실 페이지 대량 생성",
    ],
    faqs: [
      {
        q: "SEO 효과는 얼마나 걸리나요?",
        a: "자연 검색 유입에서 뚜렷한 변화를 보려면 보통 몇 달이 필요합니다. 경쟁 정도와 웹사이트의 초기 상태에 따라 달라집니다.",
      },
      {
        q: "구글 1위를 보장하나요?",
        a: "아니요. 넥스트체인은 작업 항목과 투명한 리포트를 약속드리며, 특정 순위는 보장하지 않습니다.",
      },
    ],
    related: [
      { href: "/blog/website-spa-can-nhung-gi", label: "예시: 스파 웹사이트에는 무엇이 필요할까요?" },
      { href: "/dich-vu/thiet-ke-website-doanh-nghiep", label: "기업 웹사이트" },
    ],
  },
  "phat-trien-phan-mem": {
    slug: "software-development",
    name: "소프트웨어 개발",
    metaTitle: "맞춤형 소프트웨어 개발",
    metaDescription: `${SOFTWARE_PRICE}부터 시작하는 웹/모바일 소프트웨어 및 애플리케이션 맞춤 개발. 업무 분석, 개발, API 연동, 보안, 사용자 권한 관리, 유지보수를 제공합니다.`,
    h1: "기업 업무 프로세스에 맞춘 소프트웨어 개발",
    summary: `넥스트체인은 기업의 업무 프로세스에 맞춰 웹, 모바일 애플리케이션과 관리 시스템을 개발합니다. 대시보드, 사내 CRM, 예약, 데이터 관리 등이 해당됩니다. ${SOFTWARE_PRICE}부터이며, 규모에 따라 7~30일 이상 소요됩니다. 인도 후 유지보수도 제공합니다.`,
    audience: "업무 프로세스를 디지털화하려는 기업, 첫 버전을 만드는 스타트업",
    imageAlt: "넥스트체인이 개발한 데이터 관리 SaaS 대시보드",
    benefits: [
      {
        title: "반복 업무를 자동화",
        desc: "스프레드시트와 수작업 프로세스를 권한 관리, 이력, 리포트가 있는 시스템으로 바꿉니다.",
      },
      {
        title: "데이터를 한곳에",
        desc: "사용 중인 도구를 API로 연동해 데이터가 흩어지지 않도록 합니다.",
      },
      {
        title: "보안 및 권한 관리",
        desc: "데이터의 민감도에 맞춰 사용자 권한과 백업을 설정합니다.",
      },
    ],
    deliverables: [
      "업무 분석 및 명세",
      "웹 / 모바일 애플리케이션",
      "API 및 데이터 연동",
      "사용자 권한 관리, 보안",
      "인도 후 유지보수",
    ],
    notIncluded: ["App Store / Google Play 앱 등록 비용", "클라우드 인프라 비용"],
    faqs: [
      {
        q: "맞춤 소프트웨어를 만들어야 할까요, 기존 소프트웨어를 써야 할까요?",
        a: "기존 소프트웨어가 필요의 대부분을 충족한다면 그것을 사용하세요. 업무 프로세스가 특수하거나 장기 구독료가 개발 비용보다 커질 때 맞춤 소프트웨어가 적합합니다.",
      },
    ],
    related: [
      { href: "/dich-vu/thiet-ke-website-theo-yeu-cau", label: "맞춤형 웹사이트 제작" },
      { href: "/lien-he", label: "상담 문의" },
    ],
  },
}
