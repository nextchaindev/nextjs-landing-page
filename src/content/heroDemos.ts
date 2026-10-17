import type { StaticImageData } from "next/image"
import imageSpa from "@/assets/stock/spa.jpg"
import imageSalon from "@/assets/stock/salon.jpg"
import imageHomestay from "@/assets/stock/homestay.jpg"
import type { Locale } from "@/i18n/config"

/**
 * Hero visual: a browser frame cycling through example customer sites, so a
 * visitor sees what they get and that the address can be a free
 * *.nextchain.site subdomain or their own domain. Illustrative examples only.
 */
export interface HeroDemo {
  url: string
  name: string
  tagline: string
  image: StaticImageData
  cta: string
  accent: string
  items: readonly (readonly [string, string])[]
}

const VI_DEMOS: readonly HeroDemo[] = [
  {
    url: "spa-hoa-mai.example",
    name: "Spa Hoa Mai",
    tagline: "Chăm sóc da & thư giãn",
    image: imageSpa,
    cta: "Đặt lịch hẹn",
    accent: "bg-[#C2410C]",
    items: [
      ["Chăm sóc da mặt", "350.000đ"],
      ["Gội đầu dưỡng sinh", "150.000đ"],
      ["Massage thư giãn", "300.000đ"],
    ],
  },
  {
    url: "salon-minh-anh.example",
    name: "Salon Minh Anh",
    tagline: "Cắt, nhuộm, uốn tóc",
    image: imageSalon,
    cta: "Đặt lịch cắt tóc",
    accent: "bg-[#1F2937]",
    items: [
      ["Cắt tạo kiểu", "120.000đ"],
      ["Nhuộm thời trang", "450.000đ"],
      ["Uốn phồng", "550.000đ"],
    ],
  },
  {
    url: "homestay-doi-thong.example",
    name: "Homestay Đồi Thông",
    tagline: "Nghỉ dưỡng giữa rừng thông",
    image: imageHomestay,
    cta: "Hỏi phòng trống",
    accent: "bg-[#166534]",
    items: [
      ["Phòng đôi view đồi", "650.000đ"],
      ["Phòng gia đình", "1.100.000đ"],
      ["Nguyên căn gỗ", "2.400.000đ"],
    ],
  },
]

const KO_DEMOS: readonly HeroDemo[] = [
  {
    url: "spa-hana.example",
    name: "스파 하나",
    tagline: "피부 관리 & 휴식",
    image: imageSpa,
    cta: "예약 문의",
    accent: "bg-[#C2410C]",
    items: [
      ["피부 관리", "45,000원"],
      ["두피 케어", "25,000원"],
      ["아로마 마사지", "55,000원"],
    ],
  },
  {
    url: "salon-miso.example",
    name: "헤어 살롱 미소",
    tagline: "커트 · 염색 · 펌",
    image: imageSalon,
    cta: "예약하기",
    accent: "bg-[#1F2937]",
    items: [
      ["커트 스타일링", "25,000원"],
      ["트렌드 염색", "80,000원"],
      ["볼륨 펌", "90,000원"],
    ],
  },
  {
    url: "pension-solsup.example",
    name: "펜션 솔숲",
    tagline: "소나무 숲속의 휴식",
    image: imageHomestay,
    cta: "빈 객실 문의",
    accent: "bg-[#166534]",
    items: [
      ["언덕 전망 더블룸", "120,000원"],
      ["가족룸", "200,000원"],
      ["독채 통나무집", "450,000원"],
    ],
  },
]

const EN_DEMOS: readonly HeroDemo[] = [
  {
    url: "lotus-spa.example",
    name: "Lotus Spa",
    tagline: "Skin care & relaxation",
    image: imageSpa,
    cta: "Book an appointment",
    accent: "bg-[#C2410C]",
    items: [
      ["Facial care", "$15"],
      ["Scalp treatment", "$7"],
      ["Aroma massage", "$18"],
    ],
  },
  {
    url: "studio-mia.example",
    name: "Studio Mia",
    tagline: "Cut, color & perm",
    image: imageSalon,
    cta: "Book a haircut",
    accent: "bg-[#1F2937]",
    items: [
      ["Cut & style", "$8"],
      ["Fashion color", "$20"],
      ["Volume perm", "$25"],
    ],
  },
  {
    url: "pine-hill-stay.example",
    name: "Pine Hill Stay",
    tagline: "A retreat among the pines",
    image: imageHomestay,
    cta: "Check availability",
    accent: "bg-[#166534]",
    items: [
      ["Hill-view double room", "$28"],
      ["Family room", "$48"],
      ["Wooden cabin", "$105"],
    ],
  },
]

const DEMOS: Record<Locale, readonly HeroDemo[]> = { vi: VI_DEMOS, ko: KO_DEMOS, en: EN_DEMOS }

export function getHeroDemos(locale: Locale): readonly HeroDemo[] {
  return DEMOS[locale]
}
