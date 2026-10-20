import type { NextConfig } from "next"

// Ảnh bìa blog upload ở /admin/blog nằm trong bucket "blog" của Supabase Storage.
const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname : undefined

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },

  /* SEO & Performance Optimizations */

  // Compress responses
  compress: true,

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: supabaseHost
      ? [{ protocol: "https", hostname: supabaseHost, pathname: "/storage/v1/object/public/blog/**" }]
      : [],
  },

  // Đổi hoặc xóa slug của trang đã public: thêm một dòng ở đây (308 vĩnh viễn),
  // trỏ thẳng tới URL cuối cùng (không nối chuỗi redirect) và sửa link nội bộ.
  async redirects() {
    return [
      { source: "/admin", destination: "/admin/consultations", permanent: false },
      { source: "/demo/:slug", destination: "/mau-website/:slug", permanent: true },
      { source: "/gioi-thieu", destination: "/ve-chung-toi", permanent: true },
      { source: "/about", destination: "/ve-chung-toi", permanent: true },
      { source: "/contact", destination: "/lien-he", permanent: true },
      { source: "/pricing", destination: "/bang-gia", permanent: true },
      { source: "/projects", destination: "/du-an", permanent: true },
      { source: "/dich-vu/landing-page", destination: "/dich-vu/thiet-ke-landing-page", permanent: true },
    ]
  },

  // Security and SEO headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000",
          },
        ],
      },
    ]
  },

  // Nhiều root layout (mỗi ngôn ngữ một cái) → 404 toàn cục render ở app/global-not-found.tsx.
  experimental: { globalNotFound: true },

  // Enable React strict mode for better development
  reactStrictMode: true,

  // Power optimizations
  poweredByHeader: false,
}

export default nextConfig
