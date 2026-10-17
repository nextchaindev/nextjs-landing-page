import type { Plan } from "../plans"

/**
 * 한국어 월 구독 플랜. 금액은 KRW(원)이며 환율 자동 변환이 아닌 고정 가격표다.
 * 구조는 ../plans.ts의 베트남어 플랜과 동일하게 유지한다 (수정 시 두 파일을 함께 확인).
 */
export const KO_FREE_SUBDOMAIN_EXAMPLE = "your-brand.nextchain.site"

export const KO_PLANS: Plan[] = [
  {
    id: "starter",
    name: "스타터",
    tagline: "매장을 소개하고 문의를 받는 랜딩페이지 1페이지",
    monthlyPrice: 39000,
    features: [
      "업종에 맞춰 디자인한 랜딩페이지 1개",
      `무료 주소 ${KO_FREE_SUBDOMAIN_EXAMPLE} 제공 또는 보유하신 도메인 연결`,
      "고속 호스팅, SSL 인증서(https) 포함",
      "문의 폼, 전화 걸기, 카카오톡 채널 버튼",
      "기본 SEO: 제목·설명, 사이트맵, 구글 지도 연동",
      "월 2회 내용 수정",
    ],
    limits: ["블로그 미포함"],
  },
  {
    id: "growth",
    name: "그로스",
    tagline: "서비스가 여러 가지인 매장을 위한 다페이지 웹사이트",
    monthlyPrice: 99000,
    popular: true,
    features: [
      "최대 5페이지: 홈, 서비스, 가격, 갤러리, 문의",
      "주요 서비스별 전용 페이지",
      "매월 블로그 글 2편을 넥스트체인이 작성하고, 게시 전에 고객님이 확인",
      "월 5회 내용 수정",
      "월간 방문자 및 문의 현황 리포트",
    ],
    limits: ["스타터 플랜의 모든 혜택 포함"],
  },
  {
    id: "pro",
    name: "프로",
    tagline: "서비스·지점이 많거나 상품을 판매하는 매장을 위한 플랜",
    monthlyPrice: 199000,
    features: [
      "최대 10페이지, 지점별 전용 페이지",
      "상품 최대 50개 카탈로그: 사진, 설명, 가격, 구매 문의 버튼",
      "매월 블로그 글 4편",
      "소규모 수정 횟수 무제한, 영업일 기준 24시간 이내 우선 처리",
    ],
    limits: ["그로스 플랜의 모든 혜택 포함", "장바구니·온라인 결제는 프로젝트별 견적"],
  },
]
