import { COMPANY_NAME, CONTACT } from "@/lib/site"
import { getFreeSubdomainExample } from "@/content/plans"
import type { LegalTexts } from "../legal"

const FREE_SUBDOMAIN_EXAMPLE = getFreeSubdomainExample("ko")

// DRAFT translation (#27): do not publish before legal review. The Vietnamese version is the original.
export const KO_LEGAL_TEXTS: LegalTexts | null = {
  lastUpdatedLabel: "최종 업데이트",
  originalNotice:
    "본 문서는 편의를 위해 제공되는 번역본이며, 베트남어 본문이 원본입니다. 번역본과 베트남어 원본 사이에 차이가 있는 경우 베트남어 원본이 우선합니다.",
  dateLocale: "ko-KR",
  terms: {
    title: "이용약관",
    intro:
      "Nextchain.site의 월 구독 웹사이트 디자인 및 운영 서비스 이용약관입니다. 요금, 결제, 콘텐츠 검수 책임, SEO 범위를 안내합니다.",
    sections: [
      {
        heading: "적용 범위",
        paragraphs: [
          `본 약관은 ${COMPANY_NAME}이(가) Nextchain.site를 통해 제공하는 월 구독 방식의 웹사이트 디자인, 게시 및 운영 서비스에 적용됩니다. 개별 고객과 체결한 계약서 또는 견적서의 내용이 본 약관과 다른 경우 계약서 또는 견적서가 우선 적용됩니다.`,
        ],
      },
      {
        heading: "서비스 요금 및 결제",
        paragraphs: [
          "월 구독 플랜(랜딩 페이지, 소규모 비즈니스 웹사이트)은 월 단위로 요금이 청구되며, 초기 제작비가 없고 최소 이용 기간의 약정이 없습니다. 웹사이트, 소프트웨어, 마케팅 및 SEO 프로젝트는 프로젝트 견적에 따라 요금이 청구됩니다. 요금과 혜택은 요금 안내 페이지와 고객에게 발송된 견적서에 기재됩니다.",
          "플랜 범위를 벗어나는 작업은 사전에 견적을 제공하며, 고객이 동의한 경우에만 진행합니다.",
        ],
      },
      {
        heading: "콘텐츠 및 검수 책임",
        paragraphs: [
          "고객은 정보와 이미지를 제공하며, 해당 자료의 사용 권한에 대한 책임을 부담합니다. Nextchain은 콘텐츠 작성을 지원하고, 고객에게 검수를 요청하기 전에 내용을 확인합니다.",
          "콘텐츠는 고객이 확인한 후에만 게시됩니다. 고객은 자신의 웹사이트에 게재하는 가격, 서비스 및 약속의 정확성에 대한 책임을 부담합니다.",
        ],
      },
      {
        heading: "SEO 및 사업 성과",
        paragraphs: [
          "Nextchain은 플랜에 기재된 기술적 SEO 항목을 수행합니다. Nextchain은 검색엔진에서의 특정 순위나 매출 증가를 보장하지 않습니다.",
        ],
      },
      {
        heading: "일시 중단 및 종료",
        paragraphs: [
          "서비스 해지, 콘텐츠 및 도메인의 인계에 관한 사항은 서비스 해지 정책에서 정합니다.",
        ],
      },
      {
        heading: "문의",
        paragraphs: [`약관에 관한 모든 문의는 ${CONTACT.email}(으)로 보내 주시기 바랍니다.`],
      },
    ],
  },
  privacy: {
    title: "개인정보처리방침",
    intro:
      "Nextchain.site가 어떤 정보를 수집하고, 어떤 목적으로 사용하며, 어떻게 보관하는지, 그리고 개인정보에 대한 이용자의 권리를 안내합니다.",
    sections: [
      {
        heading: "수집하는 정보",
        paragraphs: [
          "상담을 요청하실 때: 성명, 이메일, 전화번호 및 메시지 내용.",
          "웹사이트에 접속하실 때: Google Analytics, Google Tag Manager 및 Microsoft Clarity를 통한 익명의 이용 데이터(조회한 페이지, 기기, 유입 경로). 양식은 Google reCAPTCHA로 보호됩니다.",
        ],
      },
      {
        heading: "이용 목적",
        paragraphs: [
          "상담 연락, 견적서 발송, 신청하신 서비스의 제공 및 웹사이트 이용 경험의 개선. 당사는 개인정보를 제3자에게 판매하지 않습니다.",
        ],
      },
      {
        heading: "보관 및 보안",
        paragraphs: [
          "상담 요청 데이터는 데이터베이스 서비스 제공업체의 인프라에 저장되며, 관련 담당자만 접근할 수 있습니다.",
        ],
      },
      {
        heading: "고객 웹사이트의 데이터",
        paragraphs: [
          "Nextchain이 고객을 위해 운영하는 웹사이트의 경우, 방문자가 양식을 통해 제출한 정보는 해당 웹사이트의 소유자에게 전달됩니다. 웹사이트 소유자는 해당 데이터를 올바른 목적으로 사용할 책임이 있습니다.",
        ],
      },
      {
        heading: "이용자의 권리",
        paragraphs: [
          `${CONTACT.email}(으)로 이메일을 보내 개인정보의 열람, 정정 또는 삭제를 요청하실 수 있습니다.`,
        ],
      },
    ],
  },
  cancellation: {
    title: "서비스 해지 정책",
    intro:
      "Nextchain.site의 월 구독 웹사이트 플랜 해지 방법, 이미 결제한 요금의 처리, 콘텐츠·도메인·데이터의 인계를 안내합니다.",
    sections: [
      {
        heading: "해지 요청 방법",
        paragraphs: [
          `해지 요청은 ${CONTACT.email}(으)로 이메일을 보내시거나 합의된 지원 채널을 통해 접수해 주시기 바랍니다. 사전 통지 기간과 요금 청구 중단 시점은 각 고객의 계약서 또는 견적서에 따릅니다.`,
        ],
      },
      {
        heading: "이미 결제한 요금",
        paragraphs: [
          "월 구독 플랜에는 최소 이용 기간의 약정이 없습니다. 이용 중단 시의 사전 통지 기간과 이용 중인 기간에 대한 요금 환불(있는 경우)은 계약서에 명시됩니다.",
          "Nextchain은 서명 전에 검토하실 수 있도록 계약서를 보내 드립니다. 계약서에 없는 요금은 발생하지 않습니다.",
        ],
      },
      {
        heading: "콘텐츠 및 이미지",
        paragraphs: [
          "고객이 제공한 텍스트 콘텐츠와 이미지는 고객에게 귀속됩니다. 해지 시 고객은 합의된 기간 내에 콘텐츠 사본의 인계를 요청할 수 있습니다.",
        ],
      },
      {
        heading: "도메인",
        paragraphs: [
          `고객이 직접 등록한 개별 도메인은 고객의 소유이며, Nextchain은 연결 설정만 수행합니다. 해지 시 고객은 도메인을 그대로 보유합니다. ${FREE_SUBDOMAIN_EXAMPLE}와 같은 무료 주소는 Nextchain 시스템에 속하며, 서비스가 종료되면 사용할 수 없게 됩니다.`,
        ],
      },
      {
        heading: "해지 후 웹사이트",
        paragraphs: [
          "서비스 종료 시점 이후 웹사이트는 Nextchain 인프라에서 운영이 중단됩니다. 방문자가 제출한 요청 데이터는 삭제 전에 요청에 따라 인계됩니다.",
        ],
      },
    ],
  },
}
