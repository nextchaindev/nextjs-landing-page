This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install the dependencies:

```bash
bun install
```

Then, run the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Đa ngôn ngữ (vi / ko / en)

> English version below: [Multi-language support](#multi-language-support-vi--ko--en--english-summary). Tài liệu liên quan: [`GOLIVE.md`](./GOLIVE.md), [`ANALYTICS.md`](./ANALYTICS.md), [`PRODUCT.md`](./PRODUCT.md), [`supabase_lead_locale.sql`](./supabase_lead_locale.sql) — xem bảng [Documentation](#documentation).

- Tiếng Việt là mặc định, URL không có tiền tố; `/ko/...` và `/en/...` là bản dịch (mỗi ngôn ngữ một root layout, `<html lang>` tĩnh).
- Cấu trúc: `src/i18n/` (config, từ điển UI, slug, bảng đối ứng đường dẫn), `src/content/{ko,en}/` (nội dung dịch, giá cố định theo thị trường), `src/components/pages/` (trang dùng chung cho ko/en), `src/content/pageCopy/` và `src/content/pages.ts` (chữ cố định của từng trang).
- Bật ngôn ngữ bằng biến môi trường `NEXT_PUBLIC_ENABLED_LOCALES=vi,ko,en` (mặc định chỉ `vi`: trang `/ko`, `/en` tự `noindex`, không có trong sitemap/hreflang). Biến khác: `NEXT_PUBLIC_KAKAO_CHANNEL_URL`, `NEXT_PUBLIC_WHATSAPP_URL`, `DISCORD_WEBHOOK_URL_KO`, `NEXT_PUBLIC_LEGAL_REVIEWED_LOCALES` (xem [`GOLIVE.md`](./GOLIVE.md)).
- Thêm một trang đã dịch: tạo route mỏng trong `src/app/<locale>/...`, thêm slug vào `src/i18n/slugs.ts` (nếu cần), rồi chạy `npm run build && npm run i18n:check` và `npm run seo:check` (kiểm tra hreflang hai chiều).
- Thêm ngôn ngữ mới: `LOCALES` trong `src/i18n/config.ts`, từ điển `dictionaries/<locale>.ts`, root layout `src/app/<locale>/layout.tsx`, nội dung `content/<locale>/*`.

## Multi-language support (vi / ko / en) — English summary

- Vietnamese is the default and has no URL prefix. `/ko/...` (Korean) and `/en/...` (English) are translations. Each locale has its own root layout, so `<html lang>` is static and pages stay statically rendered.
- Layout of the code:
  - `src/i18n/` — locale config, UI dictionaries, slug maps (`slugs.ts`) and the route table (`routes.ts`) that drives the language switcher, hreflang and the sitemap
  - `src/content/{ko,en}/` — translated content and fixed per-market prices (KRW for ko, USD for en; never converted by exchange rate)
  - `src/content/pages.ts`, `src/content/pageCopy/` — fixed copy of each translated page
  - `src/components/pages/` — page components shared by ko and en; `src/app/{ko,en}/` only holds thin route files
- **Turn a language on** with `NEXT_PUBLIC_ENABLED_LOCALES=vi,ko,en` (default `vi` only). Until a locale is listed, its pages are `noindex` and excluded from the sitemap, hreflang and `llms.txt`.
- Other environment variables: `NEXT_PUBLIC_KAKAO_CHANNEL_URL` (ko), `NEXT_PUBLIC_WHATSAPP_URL` (en), `DISCORD_WEBHOOK_URL_KO` (Korean leads), `NEXT_PUBLIC_LEGAL_REVIEWED_LOCALES` (publishes the translated legal pages; leave unset until a lawyer has reviewed them). Details: [`GOLIVE.md`](./GOLIVE.md).
- **Add a translated page:** create a thin route in `src/app/<locale>/...`, add its slug to `src/i18n/slugs.ts` if needed, then run `bun run build && bun run i18n:check` (fails if Vietnamese text or VND prices leak into ko/en pages) and `bun run seo:check` against a running build (checks `<html lang>` and two-way hreflang).
- **Add a new locale:** add it to `LOCALES` in `src/i18n/config.ts`, create `dictionaries/<locale>.ts` and `src/app/<locale>/layout.tsx`, then add content under `src/content/<locale>/`.
- Leads from translated pages store the locale (`consultations.locale`, `preferred_contact`): run [`supabase_lead_locale.sql`](./supabase_lead_locale.sql) first.

## Documentation

| Document | What it covers |
| --- | --- |
| [`GOLIVE.md`](./GOLIVE.md) | Go-live checklist: environment variables, Search Console, post-deploy checks, enabling ko/en |
| [`ANALYTICS.md`](./ANALYTICS.md) | GA4 events and conversions, including `lead_locale` and `language_switch` |
| [`PRODUCT.md`](./PRODUCT.md) | Audience, brand voice and tone per language (vi / ko / en), hard rules |
| [`supabase_schema.sql`](./supabase_schema.sql) | Base `consultations` table |
| [`supabase_lead_details.sql`](./supabase_lead_details.sql), [`supabase_attribution.sql`](./supabase_attribution.sql) | Industry / website type and traffic-source columns |
| [`supabase_lead_locale.sql`](./supabase_lead_locale.sql) | Lead language and preferred contact method (needed for ko/en) |
| [`supabase_consultation_rate_limit.sql`](./supabase_consultation_rate_limit.sql) | Shared rate limit for the consultation form |
| [`scripts/seo-check.mjs`](./scripts/seo-check.mjs) | `bun run seo:check` — technical SEO and hreflang checks on a running site |
| [`scripts/i18n-check.mjs`](./scripts/i18n-check.mjs) | `bun run i18n:check` — checks the build for untranslated Vietnamese text |
| [`scripts/backlinks-check.mjs`](./scripts/backlinks-check.mjs) | `bun run backlinks:check` |
| Issue [#20](https://github.com/nextchaindev/nextjs-landing-page/issues/20) · PR [#30](https://github.com/nextchaindev/nextjs-landing-page/pull/30) | Multi-language plan, decisions and implementation notes |

## Form tư vấn và chống spam

Form yêu cầu số điện thoại, email tùy chọn. Honeypot và reCAPTCHA v2 được xác minh ở API trước khi lưu lead. Giới hạn chia sẻ giữa các instance qua Supabase: tối đa 3 yêu cầu mỗi số điện thoại và 10 yêu cầu mỗi IP trong 10 phút. CAPTCHA và giới hạn tần suất chỉ giảm spam, không chặn tuyệt đối bot hoặc lead không hợp lệ.

Trước khi triển khai, chạy [`supabase_consultation_rate_limit.sql`](./supabase_consultation_rate_limit.sql) trong Supabase SQL Editor; đặt `CONSULTATION_RATE_LIMIT_SECRET` (chuỗi bí mật ngẫu nhiên dài, chỉ phía server), `RECAPTCHA_SECRET_KEY` và `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` trong môi trường triển khai. Cho phép domain production và localhost (nếu thử local) trong cấu hình reCAPTCHA. Nếu chưa có bảng/hàm hoặc secret giới hạn tần suất, API từ chối gửi lead thay vì bỏ qua lớp bảo vệ. Lên lịch dọn bảng theo câu lệnh `pg_cron` ở cuối tệp SQL hoặc tác vụ định kỳ tương đương.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
