import type { Locale } from "@/i18n/config"

/**
 * Chữ ngắn trên các thẻ (dịch vụ, ngành, dự án, mẫu website, bài blog, các bước quy trình).
 * Giá trị tiếng Việt giữ nguyên như trước khi có đa ngôn ngữ. Placeholder {price}/{name}/{n} thay ở nơi hiển thị.
 */
export interface CardText {
  fromMonth: string
  from: string
  viewDetails: string
  viewSolution: string
  viewProject: string
  all: string
  sampleBadge: string
  viewDemo: string
  consultLayout: string
  consultMessage: string
  step: string
  readMinutes: string
  readArticle: string
}

export const CARD_TEXT: Record<Locale, CardText> = {
  vi: {
    fromMonth: "Từ {price}/tháng",
    from: "Từ {price}",
    viewDetails: "Xem chi tiết",
    viewSolution: "Xem giải pháp {name}",
    viewProject: "Xem dự án",
    all: "Tất cả",
    sampleBadge: "Mẫu tham khảo",
    viewDemo: "Xem bản demo",
    consultLayout: "Tư vấn bố cục",
    consultMessage: 'Tôi muốn tư vấn bố cục tham khảo "{name}". ',
    step: "Bước {n}",
    readMinutes: "{n} phút đọc",
    readArticle: "Đọc bài",
  },
  ko: {
    fromMonth: "월 {price}부터",
    from: "{price}부터",
    viewDetails: "자세히 보기",
    viewSolution: "{name} 솔루션 보기",
    viewProject: "프로젝트 보기",
    all: "전체",
    sampleBadge: "참고 템플릿",
    viewDemo: "데모 보기",
    consultLayout: "구성 상담",
    consultMessage: '"{name}" 참고 구성에 대해 상담받고 싶습니다. ',
    step: "STEP {n}",
    readMinutes: "{n}분 소요",
    readArticle: "글 읽기",
  },
  en: {
    fromMonth: "From {price}/month",
    from: "From {price}",
    viewDetails: "View details",
    viewSolution: "See the {name} solution",
    viewProject: "View project",
    all: "All",
    sampleBadge: "Reference template",
    viewDemo: "View demo",
    consultLayout: "Discuss layout",
    consultMessage: 'I\'d like advice on the "{name}" reference layout. ',
    step: "Step {n}",
    readMinutes: "{n} min read",
    readArticle: "Read article",
  },
}
