# Chuẩn event & UTM — Nextchain.site

> Related: [GOLIVE.md](./GOLIVE.md) · [README – multi-language setup](./README.md#multi-language-support-vi--ko--en--english-summary)

Cập nhật: 2026-10-14. Tools: GA4 (G-Z8NT4N1ZKB, G-M1WX07RXCV), GTM (GTM-MCFFZTLK), Microsoft Clarity.
Nguyên tắc: đếm conversion từ nguồn chân truth (bảng `consultations` trong Supabase); event client chỉ để đo phễu.

## Cookie consent

GA/GTM/Clarity **chỉ tải sau khi người dùng bấm "Chấp nhận"** trên banner
(`src/components/marketing/ConsentGate.tsx`, lưu localStorage 12 tháng).
Event gtag khi chưa đồng ý là no-op an toàn.

## Events (GA4)

| Event | Khi nào bắn | Params | Ghi chú |
|---|---|---|---|
| `form_start` | Focus vào trường đầu tiên trong modal tư vấn (một lần/phiên) | `form_id` | Đo tỷ lệ mở form → bắt đầu điền. |
| `form_error` | Bấm gửi nhưng validate lỗi | `fields` (vd. `phone,email`) | Chẩn đoán trường gây rơi. |
| `form_submit` | Bấm gửi, đã qua validate + captcha | `form_id`, `lead_locale` | Submit attempt. |
| `generate_lead` | API trả `{success: true, verified: true}` (lead đã lưu Supabase) | `form_id`, `lead_locale`, `currency` | **Conversion chính** — đánh dấu conversion trong GA4 Admin. |
| `conversion` | Ngay sau generate_lead khi đã cấu hình Ads | `send_to`, `currency`, `value` | Google Ads conversion; chỉ bắn khi có `NEXT_PUBLIC_GAW_ID` + `NEXT_PUBLIC_GAW_LABEL`. |

Honeypot (bot đi qua UI) nhận `{success: true, verified: false}` → không bắn
event nào → không làm nhiễu số liệu Ads/GA4.

## Việc cần làm trong tài khoản (không nằm trong code)

1. GA4 Admin → Events → đánh dấu `generate_lead` là **Key event/conversion**.
2. Google Ads → Công cụ → Chuyển đổi → **Import từ GA4** (chọn `generate_lead`)
   hoặc tạo conversion riêng rồi điền ID/nhãn vào env (xem dưới).
3. Enhanced Conversions: bật ở cấp conversion trong Google Ads.

## Quy ước UTM

Toàn bộ chữ thường, gạch ngang; ghi vào bảng này khi tạo campaign mới.

| Tham số | Quy ước | Ví dụ |
|---|---|---|
| utm_source | Nền tảng | `google`, `facebook`, `zalo` |
| utm_medium | Loại kênh | `cpc`, `social`, `referral` |
| utm_campaign | `ngay-ten-muc-tieu` | `2026-10-thiet-ke-website-spa` |
| utm_content | Phân biệt mẫu quảng cáo/CTA | `cta-goi-thang`, `cta-du-an` |
| utm_term | Từ khoá (Search) | `thiet-ke-website-spa` |

## Env liên quan

| Biến | Dùng để |
|---|---|
| `NEXT_PUBLIC_GAW_ID` | ID conversion Google Ads (`AW-XXXXXXXXX`) |
| `NEXT_PUBLIC_GAW_LABEL` | Nhãn conversion Google Ads |
| `NEXT_PUBLIC_BLOG_AUTHOR_NAME` | Tác giả người thật cho BlogPosting schema |
| `NEXT_PUBLIC_BLOG_AUTHOR_JOB` | Chức danh tác giả (tuỳ chọn) |
| `NEXT_PUBLIC_FACEBOOK_URL` | Fanpage — thêm vào `sameAs` của Organization |
| `GOOGLE_SITE_VERIFICATION` | Mã xác minh Search Console (meta) |

## Ngôn ngữ (vi / ko)

- `lead_locale` (`vi` | `ko`) có trên `form_submit` và `generate_lead`. Trong GA4 Admin → Custom definitions tạo
  custom dimension **event-scoped** `lead_locale` để lọc/so sánh conversion theo ngôn ngữ.
- `language_switch` (`from`, `to`) bắn khi khách bấm bộ chuyển ngôn ngữ trên header.
- Lead lưu thêm cột `locale` (vi | ko) và `preferred_contact` trong bảng `consultations` — chạy `supabase_lead_locale.sql`.
- Lead tiếng Hàn gửi về Discord qua `DISCORD_WEBHOOK_URL_KO` (nếu không đặt thì dùng `DISCORD_WEBHOOK_URL`), nội dung bằng tiếng Hàn.
- Số điện thoại Hàn Quốc được lưu dạng E.164 (`+8210…`); số Việt Nam giữ dạng cũ (`0901…`).
