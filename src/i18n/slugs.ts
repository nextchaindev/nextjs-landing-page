import type { NonDefaultLocale } from "./config"

/**
 * Slug tiếng Anh cho các ngôn ngữ ngoài tiếng Việt (ko, en dùng chung slug). Khóa là slug tiếng Việt (gốc).
 * File này chỉ chứa chuỗi — LanguageSwitcher (client) import qua routes.ts nên KHÔNG import nội dung trang vào đây.
 */

/** /dich-vu/<slug> → /<locale>/services/<slug> */
export const SERVICE_SLUGS: Record<string, string> = {
  "thiet-ke-landing-page": "landing-page",
  "thiet-ke-website-doanh-nghiep": "corporate-website",
  "thiet-ke-website-ban-hang": "ecommerce-website",
  "thiet-ke-website-theo-yeu-cau": "custom-website",
  "marketing-seo": "marketing-seo",
  "phat-trien-phan-mem": "software-development",
}

/** Trang quản trị website theo tháng (một trang riêng, không nằm trong SERVICE_DETAILS). */
export const MONTHLY_MANAGEMENT_SLUG = { vi: "quan-tri-website-theo-thang", other: "monthly-website-management" }

/** /giai-phap/<slug> → /<locale>/solutions/<slug> */
export const INDUSTRY_SLUGS: Record<string, string> = {
  "website-spa": "spa-website",
  "website-salon": "salon-website",
  "website-homestay": "homestay-website",
  "website-nail": "nail-salon-website",
  "website-quan-ca-phe": "cafe-website",
  "website-nha-hang": "restaurant-website",
  "website-nha-khoa": "dental-clinic-website",
  "landing-page-bat-dong-san": "real-estate-landing-page",
  "landing-page-khoa-hoc": "course-landing-page",
}

/**
 * /mau-website/<slug> → /<locale>/templates/<slug>. Chỉ những mẫu có trang chi tiết (có `industrySlug` trong
 * content/templates.ts) — mẫu limousine, yoga, thời trang, mỹ phẩm chỉ hiện trong thư viện, không có trang riêng.
 */
export const TEMPLATE_SLUGS: Record<string, string> = {
  spa: "spa",
  salon: "salon",
  nail: "nail",
  homestay: "homestay",
  cafe: "cafe",
  "nha-hang": "restaurant",
  "nha-khoa": "dental",
  "bat-dong-san": "real-estate",
  "giao-duc": "education",
}

/** Dự án giữ nguyên slug (tên thương hiệu): /du-an/<slug> → /<locale>/projects/<slug> */
export const PROJECT_SLUGS = [
  "kyunghyang",
  "yamicoco",
  "z2w",
  "gotax",
  "nextapi",
  "registry",
  "rc-sport",
  "imr",
  "hrd-data",
  "young-feel",
  "partnerit",
  "bronto",
  "itembox",
  "schoolarflow-ai",
  "nextpainter",
  "kevin",
  "ai-smart-learning",
  "24hagent-chat",
]

/**
 * /blog/<slug> → /<locale>/blog/<slug>. Bài chưa dịch sang một ngôn ngữ thì không khai báo ngôn ngữ đó
 * (không có trang, không vào sitemap/hreflang). Phải khớp các bài có trong content/{ko,en}/blog.ts.
 */
export const BLOG_SLUGS: Record<string, Partial<Record<NonDefaultLocale, string>>> = {
  "chi-phi-thiet-ke-landing-page": { ko: "landing-page-design-cost", en: "landing-page-design-cost" },
  "landing-page-khac-website-doanh-nghiep": { ko: "landing-page-vs-business-website", en: "landing-page-vs-business-website" },
  "website-spa-can-nhung-gi": { ko: "spa-website-checklist", en: "spa-website-checklist" },
  "lam-website-theo-goi-thang-hay-tra-mot-lan": { ko: "monthly-plan-vs-one-time-website", en: "monthly-plan-vs-one-time-website" },
  "website-hay-facebook-cho-kinh-doanh-nho": { en: "website-or-facebook-page" },
  "website-nha-hang-khach-can-thay-gi": { ko: "restaurant-website-essentials", en: "restaurant-website-essentials" },
  "website-homestay-7-thong-tin-khach-can": { ko: "homestay-website-7-things", en: "homestay-website-7-things" },
  "toi-uu-google-maps-cho-nha-hang-spa": { en: "google-maps-for-restaurants-and-spas" },
}

/** Trang tĩnh: đường dẫn tiếng Việt → đường dẫn (không tiền tố) ở các ngôn ngữ khác. */
export const STATIC_PAGE_SLUGS: Record<string, string> = {
  "/dich-vu": "/services",
  "/giai-phap": "/solutions",
  "/du-an": "/projects",
  "/mau-website": "/templates",
  "/quy-trinh": "/process",
  "/so-sanh/tu-lam-hay-thue-tron-goi": "/compare/diy-or-done-for-you",
  "/ve-chung-toi": "/about",
  "/blog": "/blog",
}

/** Trang pháp lý: chỉ có khi bản dịch đã được rà soát (NEXT_PUBLIC_LEGAL_REVIEWED_LOCALES). */
export const LEGAL_SLUGS: Record<string, string> = {
  "/dieu-khoan": "/terms",
  "/chinh-sach-bao-mat": "/privacy-policy",
  "/chinh-sach-huy-dich-vu": "/cancellation-policy",
}
