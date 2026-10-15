/** Cột Kanban → event vòng đời lead đề xuất của GA4. */
const STATUS_EVENTS: Record<string, string> = {
  contacted: "working_lead",
  qualified: "qualify_lead",
  won: "close_convert_lead",
  closed: "close_unconvert_lead",
}

/**
 * Gửi trạng thái lead về GA4 qua Measurement Protocol, gắn với đúng người dùng
 * (client_id lấy từ cookie _ga lúc gửi form). Đánh dấu qualify_lead /
 * close_convert_lead là key event trong GA4 rồi nhập sang Google Ads để Ads
 * tối ưu theo khách tốt thay vì mọi form gửi đi.
 *
 * Bật bằng GA4_MEASUREMENT_ID + GA4_API_SECRET. Thiếu biến hoặc lead không có
 * client_id (khách chặn cookie) thì bỏ qua — không chặn việc đổi trạng thái.
 */
export async function sendLeadStatusEvent(status: string, gaClientId: string | undefined, leadId: string) {
  const eventName = STATUS_EVENTS[status]
  const measurementId = process.env.GA4_MEASUREMENT_ID
  const apiSecret = process.env.GA4_API_SECRET
  if (!eventName || !gaClientId || !measurementId || !apiSecret) return

  const url = `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(measurementId)}&api_secret=${encodeURIComponent(apiSecret)}`
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: gaClientId,
        events: [{ name: eventName, params: { lead_id: leadId } }],
      }),
      signal: AbortSignal.timeout(5000),
    })
    if (!response.ok) console.error("GA4 lead event failed:", response.status)
  } catch (error) {
    console.error("GA4 lead event unavailable:", error)
  }
}
