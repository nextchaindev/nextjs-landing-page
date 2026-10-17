"use client";

import type { ReactNode } from "react";
import { Phone } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import Image from "next/image";
import { useDictionary, useLocale } from "@/i18n/LocaleProvider";
import type { Locale } from "@/i18n/config";

interface Messenger {
  href: string | undefined;
  /** Tailwind class đầy đủ (không ghép chuỗi để Tailwind quét được). */
  bg: string;
  event: string;
  icon: ReactNode;
}

/**
 * Kênh nhắn tin theo ngôn ngữ: Zalo (vi), KakaoTalk (ko).
 * Đường dẫn KakaoTalk lấy từ env; chưa có thì ẩn nút (xem issue #20).
 */
const MESSENGERS: Record<Locale, Messenger> = {
  vi: {
    href: "https://zalo.me/0909807687",
    bg: "bg-[#0068FF]",
    event: "click_zalo",
    icon: <Image src="/images/zalo-icon.png" alt="Zalo" width={56} height={56} />,
  },
  ko: {
    href: process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL || undefined,
    bg: "bg-[#FEE500]",
    event: "click_kakao",
    icon: (
      <svg viewBox="0 0 56 56" width={56} height={56} role="img" aria-label="KakaoTalk">
        <path
          fill="#191919"
          d="M28 13C18.6 13 11 19.1 11 26.6c0 4.8 3.1 9 7.8 11.4l-1.6 5.9c-.1.5.4.8.8.6l6.9-4.6c1 .1 2 .2 3.1.2 9.4 0 17-6.1 17-13.6S37.4 13 28 13z"
        />
      </svg>
    ),
  },
};

export default function FloatingContact() {
  const locale = useLocale();
  const { floating } = useDictionary();
  const messenger = MESSENGERS[locale];

  if (!messenger.href && !floating.phoneHref) return null;

  return (
    <div className="floating-contact fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {/* Messenger Button (Zalo / KakaoTalk) */}
      {messenger.href && (
        <a
          href={messenger.href}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group flex items-center justify-center"
          aria-label={floating.messengerAria}
          onClick={() => trackEvent(messenger.event, { location: "floating" })}
        >
          {/* Glow effect */}
          <div className={`absolute inset-0 rounded-full ${messenger.bg} opacity-30 blur-xl scale-150 group-hover:opacity-50 transition-opacity duration-300`} />
          {/* Radar ping effect */}
          <div className={`absolute inset-0 rounded-full ${messenger.bg} animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-40`} />

          <div className={`relative flex items-center justify-center rounded-full ${messenger.bg} text-white shadow-xl transition-transform duration-300 group-hover:scale-110`}>
            {messenger.icon}
          </div>
        </a>
      )}

      {/* Phone Button */}
      {floating.phoneHref && (
        <a
          href={floating.phoneHref}
          onClick={() => trackEvent("click_phone", { location: "floating" })}
          className="relative group flex items-center justify-center mt-2"
          aria-label={floating.phoneAria}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-[#00C35B] opacity-30 blur-xl scale-150 group-hover:opacity-50 transition-opacity duration-300" />
          {/* Radar ping effect */}
          <div className="absolute inset-0 rounded-full bg-[#00C35B] animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-40" />

          <div className="relative flex items-center justify-center w-[56px] h-[56px] rounded-full bg-[#00C35B] text-white shadow-xl transition-transform duration-300 group-hover:scale-110">
            <Phone className="w-7 h-7" strokeWidth={2.5} />
          </div>
        </a>
      )}
    </div>
  );
}
