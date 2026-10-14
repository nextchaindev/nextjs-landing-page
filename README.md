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
