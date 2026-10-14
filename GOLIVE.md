# Checklist go-live nextchain.site

Cập nhật: 2026-10-14. Chạy theo thứ tự; tick xong mục nào ghi ngày vào cạnh mục đó.

## 1. Trước deploy

- [ ] Đặt biến môi trường production (hosting/Vercel):
  - `RECAPTCHA_SECRET_KEY`, `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
  - Supabase service key (đang dùng cho lưu lead)
  - `CONSULTATION_RATE_LIMIT_SECRET` (chạy `supabase_consultation_rate_limit.sql` trong Supabase trước)
  - `DISCORD_WEBHOOK_URL`
  - `GOOGLE_SITE_VERIFICATION` (xem mục 2)
  - `NEXT_PUBLIC_GAW_ID`, `NEXT_PUBLIC_GAW_LABEL` (sau khi có conversion Ads)
- [ ] Build local sạch: `npm run build` (44+ trang tĩnh).

## 2. Search Console

- [ ] Vào https://search.google.com/search-console → thêm property `https://www.nextchain.site`.
- [ ] Xác minh bằng **DNS TXT** (khuyên dùng) hoặc lấy mã content của meta method rồi đặt vào env `GOOGLE_SITE_VERIFICATION` và deploy lại.
- [ ] Submit `https://www.nextchain.site/sitemap.xml` (phải có 32 URL).
- [ ] Kiểm tra URL Inspection cho `/`, `/bang-gia`, một trang `/dich-vu/*`.

## 3. Sau deploy — kiểm tra nhanh (15 phút)

- [ ] `https://www.nextchain.site/robots.txt` — Allow `/`, có dòng Sitemap.
- [ ] `https://www.nextchain.site/sitemap.xml` — đủ 32 URL, không còn 1 URL như bản cũ.
- [ ] Trang chủ + `/bang-gia` + `/giai-phap/website-spa` — HTTP 200, canonical đúng, không còn số liệu 50+/98%.
- [ ] `curl -I https://www.nextchain.site` — 200 (không redirect loop), HTTPS hợp lệ.
- [ ] `/llms.txt` và `/pricing.md` trả nội dung bảng giá.
- [ ] Form: gửi 1 lead thử thật (SĐT nội bộ) → thấy trong Supabase + Discord; event `generate_lead` trong GA4 DebugView (cần bấm Chấp nhận cookie trước).
- [ ] Banner cookie hiện lần đầu; chọn "Từ chối" thì GA/GTM/Clarity không tải.

## 4. Tuần đầu sau deploy

- [ ] GA4 Admin → đánh dấu `generate_lead` là conversion (key event).
- [ ] Google Ads → import conversion từ GA4 hoặc tạo conversion mới → điền env (mục 1), deploy lại.
- [ ] Theo dõi GSC Coverage 2–4 tuần; nếu "Discovered - currently not indexed" kéo dài ở trang dịch vụ → đẩy link nội bộ từ trang chủ/blog.
- [ ] Điền các chỗ `[NEED: ...]` trong `.agents/product-marketing.md` khi có khách thật; thay section "Tham khảo cách trình bày" trên trang chủ bằng case study thật.

## Đã biết — không phải việc của deploy

- Bản live hiện tại (trước deploy) là build cũ: sitemap 1 URL, `/bang-gia` 404, còn testimonial chưa kiểm chứng. Deploy bản này sẽ thay toàn bộ.
