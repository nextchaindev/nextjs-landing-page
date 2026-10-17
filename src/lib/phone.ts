import type { Locale } from "@/i18n/config"

/**
 * Kiểm tra và chuẩn hóa số điện thoại — dùng chung cho client (form) và server (API),
 * để hai bên luôn cùng một quy tắc. Hỗ trợ số Việt Nam, Hàn Quốc và (trang tiếng Anh) số quốc tế.
 */
export type PhoneCountry = "VN" | "KR" | "INTL"

export interface ParsedPhone {
  country: PhoneCountry
  /** Giá trị lưu DB / dùng cho rate-limit và kiểm tra trùng. VN giữ nguyên dạng cũ (0901… hoặc +84901…), KR là E.164 (+8210…). */
  normalized: string
  /** E.164, dùng cho Enhanced Conversions của Google Ads. */
  e164: string
}

const VN_PATTERN = /^(0|\+84)[35789][0-9]{8}$/
// Di động: 010 + 8 số; đầu số cũ 011/016/017/018/019 + 7–8 số.
const KR_MOBILE_PATTERN = /^0(10\d{8}|1[16-9]\d{7,8})$/
// Máy bàn: Seoul 02, vùng 031–065, internet phone 070.
const KR_LANDLINE_PATTERN = /^0(2\d{7,8}|[3-6][1-5]\d{7,8}|70\d{8})$/

function clean(raw: string) {
  return raw.replace(/[\s\-.()]/g, "")
}

/** "+8210…" / "+82010…" → "010…"; chuỗi khác giữ nguyên. */
function koreanLocalForm(cleaned: string) {
  if (!cleaned.startsWith("+82")) return cleaned
  const rest = cleaned.slice(3).replace(/^0/, "")
  return `0${rest}`
}

function parseVietnam(cleaned: string): ParsedPhone | null {
  if (!VN_PATTERN.test(cleaned)) return null
  const national = cleaned.replace(/^(\+84|0)/, "")
  return { country: "VN", normalized: cleaned, e164: `+84${national}` }
}

function parseKorea(cleaned: string): ParsedPhone | null {
  const local = koreanLocalForm(cleaned)
  if (!KR_MOBILE_PATTERN.test(local) && !KR_LANDLINE_PATTERN.test(local)) return null
  const e164 = `+82${local.slice(1)}`
  return { country: "KR", normalized: e164, e164 }
}

// Số quốc tế khác (E.164): bắt buộc có "+" để không nhầm với số nội địa.
const INTL_PATTERN = /^\+[1-9]\d{7,14}$/

function parseInternational(cleaned: string): ParsedPhone | null {
  if (!INTL_PATTERN.test(cleaned)) return null
  return { country: "INTL", normalized: cleaned, e164: cleaned }
}

export interface ParsePhoneOptions {
  /** Cho phép số quốc tế bất kỳ dạng +<mã nước><số> (dùng cho trang tiếng Anh). */
  international?: boolean
}

/**
 * `prefer` quyết định nước nào được thử trước khi một dãy số hợp lệ ở cả hai nước
 * (vd. 032… vừa là di động VN vừa là máy bàn Incheon). Mặc định VN để giữ hành vi cũ.
 */
export function parsePhone(
  raw: unknown,
  prefer: Exclude<PhoneCountry, "INTL"> = "VN",
  options: ParsePhoneOptions = {},
): ParsedPhone | null {
  if (typeof raw !== "string" || raw.length > 40) return null
  const cleaned = clean(raw)
  if (!/^\+?\d+$/.test(cleaned)) return null

  const parsers = prefer === "KR" ? [parseKorea, parseVietnam] : [parseVietnam, parseKorea]
  for (const parse of parsers) {
    const parsed = parse(cleaned)
    if (parsed) return parsed
  }
  return options.international ? parseInternational(cleaned) : null
}

/** Quy tắc theo ngôn ngữ của trang: nước ưu tiên khi trùng, và có cho số quốc tế hay không. */
const LOCALE_PHONE_RULES: Record<Locale, { prefer: Exclude<PhoneCountry, "INTL">; international: boolean }> = {
  vi: { prefer: "VN", international: false },
  ko: { prefer: "KR", international: false },
  en: { prefer: "VN", international: true },
}

export function parsePhoneForLocale(raw: unknown, locale: Locale): ParsedPhone | null {
  const { prefer, international } = LOCALE_PHONE_RULES[locale]
  return parsePhone(raw, prefer, { international })
}
