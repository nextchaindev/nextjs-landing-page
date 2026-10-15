/**
 * Ghi lại nguồn truy cập (click id quảng cáo + UTM + trang đầu tiên) để gắn vào
 * lead. Cần cho Enhanced Conversions, nhập conversion offline từ Kanban và báo
 * cáo theo chiến dịch.
 *
 * Quy tắc: lần truy cập mang click id / UTM mới sẽ ghi đè (last paid touch);
 * lần truy cập không có tham số nào giữ nguyên dữ liệu cũ. Hết hạn sau 90 ngày,
 * bằng cửa sổ chuyển đổi tối đa của Google Ads.
 */
const STORAGE_KEY = "nc_attribution"
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000

export const ATTRIBUTION_KEYS = [
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "ttclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const

export type Attribution = Partial<Record<(typeof ATTRIBUTION_KEYS)[number] | "landing_page" | "referrer" | "captured_at", string>>

export function captureAttribution() {
  if (typeof window === "undefined") return
  try {
    const params = new URLSearchParams(window.location.search)
    const fresh: Attribution = {}
    for (const key of ATTRIBUTION_KEYS) {
      const value = params.get(key)
      if (value) fresh[key] = value.slice(0, 300)
    }
    const existing = readAttribution()
    if (Object.keys(fresh).length === 0 && existing) return

    const referrer = document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : ""
    const record: Attribution = {
      ...fresh,
      landing_page: window.location.pathname.slice(0, 300),
      ...(referrer && { referrer: referrer.slice(0, 300) }),
      captured_at: new Date().toISOString(),
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
  } catch {
    // localStorage bị chặn (chế độ ẩn danh nghiêm ngặt) — bỏ qua, lead vẫn gửi được.
  }
}

export function readAttribution(): Attribution | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const record = JSON.parse(raw) as Attribution
    if (!record.captured_at || Date.now() - Date.parse(record.captured_at) > MAX_AGE_MS) {
      window.localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return record
  } catch {
    return null
  }
}
