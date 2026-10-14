/**
 * Gửi event tới GA4 qua gtag (được nạp sau khi người dùng đồng ý cookie).
 * Khi chưa có gtag (chưa đồng ý hoặc chặn quảng cáo), gọi hàm này là no-op
 * — các event funnel không làm lỗi UI.
 */
export function trackEvent(name: string, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag
  if (typeof gtag === "function") gtag("event", name, params)
}
