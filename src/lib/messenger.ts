import type { Locale } from "@/i18n/config"

/**
 * Kênh nhắn tin theo ngôn ngữ của trang: Zalo (vi), KakaoTalk (ko), WhatsApp (en).
 * Đường dẫn KakaoTalk/WhatsApp lấy từ env; chưa đặt thì `href` là undefined và nút bị ẩn (xem issue #20).
 * Phải đọc `process.env.NEXT_PUBLIC_*` trực tiếp (không truy cập động) để Next nhúng giá trị lúc build.
 */
export interface Messenger {
  name: string
  href: string | undefined
  /** Tên event GA4 khi bấm nút. */
  event: string
  /** Tailwind class đầy đủ cho màu nền (không ghép chuỗi để Tailwind quét được). */
  bg: string
}

export function getMessenger(locale: Locale): Messenger {
  switch (locale) {
    case "ko":
      return {
        name: "KakaoTalk",
        href: process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL || undefined,
        event: "click_kakao",
        bg: "bg-[#FEE500]",
      }
    case "en":
      return {
        name: "WhatsApp",
        href: process.env.NEXT_PUBLIC_WHATSAPP_URL || undefined,
        event: "click_whatsapp",
        bg: "bg-[#25D366]",
      }
    default:
      return {
        name: "Zalo",
        href: "https://zalo.me/0909807687",
        event: "click_zalo",
        bg: "bg-[#0068FF]",
      }
  }
}
