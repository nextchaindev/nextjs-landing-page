import type { Dictionary } from "./vi"

export const ko = {
  meta: {
    defaultTitle: "넥스트체인 | 랜딩페이지·웹사이트 올인원 제작",
    defaultDescription:
      "영업에만 집중하세요. 콘텐츠 작성, 디자인, 게시, 운영까지 넥스트체인이 맡습니다. 소규모 매장을 위한 월 구독형 랜딩페이지와 기업을 위한 프로젝트형 웹사이트·소프트웨어.",
  },
  notFound: {
    title: "페이지를 찾을 수 없습니다",
    code: "404 오류",
    heading: "찾으시는 페이지가 없습니다",
    body: "주소가 바뀌었거나 잘못 입력되었을 수 있습니다. 아래 페이지를 둘러보시거나 문의해 주세요.",
    links: [{ href: "/", label: "홈" }],
  },
} satisfies Dictionary
