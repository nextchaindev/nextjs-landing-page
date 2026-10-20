import type { Locale } from "@/i18n/config"

export interface BlogCopy {
  index: {
    metaTitle: string
    metaDescription: string
    crumb: string
    eyebrow: string
    title: string
    intro: string
    emptyBefore: string
    emptyLink: string
    emptyAfter: string
  }
  post: {
    updated: string
    quickAnswer: string
    keyTakeaways: string
    toc: string
    needHelp: string
    replyTime: string
    contactNow: string
    related: string
    morePosts: string
    sectionAnchor: string
  }
}

export const BLOG_COPY: Record<Locale, BlogCopy> = {
  vi: {
    index: {
      metaTitle: "Blog hướng dẫn làm website",
      metaDescription:
        "Kinh nghiệm làm website cho doanh nghiệp và cơ sở dịch vụ: chi phí landing page, so sánh landing page và website, website spa cần gì, gói tháng hay trả một lần.",
      crumb: "Blog",
      eyebrow: "Blog & Hướng dẫn",
      title: "Kinh nghiệm làm website cho doanh nghiệp",
      intro:
        "Bài viết thực tế về chi phí, tính năng và cách chọn loại website phù hợp — trả lời thẳng vào câu hỏi, có bảng so sánh và checklist.",
      emptyBefore: "Bài viết đầu tiên đang được biên soạn. Trong lúc chờ, xem ",
      emptyLink: "các dịch vụ",
      emptyAfter: ".",
    },
    post: {
      updated: "Cập nhật ",
      quickAnswer: "Trả lời nhanh",
      keyTakeaways: "Ý chính",
      toc: "Mục lục",
      needHelp: "Cần tư vấn website?",
      replyTime: "Nextchain phản hồi trong 24 giờ làm việc.",
      contactNow: "Liên hệ ngay",
      related: "Trang liên quan",
      morePosts: "Bài viết khác",
      sectionAnchor: "muc",
    },
  },
  ko: {
    index: {
      metaTitle: "웹사이트 제작 가이드 블로그",
      metaDescription:
        "소규모 사업자를 위한 웹사이트 제작 노하우: 랜딩페이지 비용, 랜딩페이지와 웹사이트의 차이, 월 구독과 일시불 비교 등.",
      crumb: "블로그",
      eyebrow: "블로그 & 가이드",
      title: "사업자를 위한 웹사이트 제작 노하우",
      intro: "비용, 필요한 기능, 알맞은 웹사이트 유형 고르는 법을 다룹니다. 질문에 바로 답하고 비교표와 체크리스트를 함께 담았습니다.",
      emptyBefore: "첫 글을 준비하고 있습니다. 그동안 ",
      emptyLink: "서비스",
      emptyAfter: "를 둘러보세요.",
    },
    post: {
      updated: "업데이트 ",
      quickAnswer: "먼저 답부터",
      keyTakeaways: "핵심 정리",
      toc: "목차",
      needHelp: "웹사이트 상담이 필요하신가요?",
      replyTime: "넥스트체인이 영업일 기준 24시간 이내에 회신드립니다.",
      contactNow: "바로 문의하기",
      related: "관련 페이지",
      morePosts: "다른 글",
      sectionAnchor: "section",
    },
  },
  en: {
    index: {
      metaTitle: "Website guides & blog",
      metaDescription:
        "Practical know-how on websites for small businesses: landing page costs, landing page vs business website, monthly plan vs one-time payment and more.",
      crumb: "Blog",
      eyebrow: "Blog & guides",
      title: "Website know-how for small businesses",
      intro: "Practical articles on cost, features and choosing the right type of website — straight answers, with comparison tables and checklists.",
      emptyBefore: "The first article is being written. In the meantime, see our ",
      emptyLink: "services",
      emptyAfter: ".",
    },
    post: {
      updated: "Updated ",
      quickAnswer: "Quick answer",
      keyTakeaways: "Key takeaways",
      toc: "Contents",
      needHelp: "Need advice on your website?",
      replyTime: "Nextchain replies within 1 business day.",
      contactNow: "Contact us now",
      related: "Related pages",
      morePosts: "More articles",
      sectionAnchor: "section",
    },
  },
}
