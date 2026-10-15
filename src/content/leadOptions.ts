/** Lựa chọn trong form tư vấn — dùng chung cho client (select) và server (whitelist). */
export const LEAD_INDUSTRIES = [
  "Spa, thẩm mỹ",
  "Salon tóc, barber",
  "Tiệm nail",
  "Homestay, khách sạn",
  "Nhà hàng, quán cà phê",
  "Nha khoa, phòng khám",
  "Shop, bán lẻ",
  "Giáo dục, đào tạo",
  "Bất động sản",
  "Doanh nghiệp dịch vụ",
  "Ngành khác",
] as const

export const LEAD_WEBSITE_TYPES = [
  "Landing page theo gói tháng",
  "Website doanh nghiệp",
  "Website bán hàng",
  "Thiết kế theo yêu cầu",
  "Marketing & SEO",
  "Phần mềm, ứng dụng",
  "Chưa rõ, cần tư vấn",
] as const

export function pickOption<T extends readonly string[]>(options: T, value: unknown): T[number] | null {
  return typeof value === "string" && (options as readonly string[]).includes(value) ? (value as T[number]) : null
}
