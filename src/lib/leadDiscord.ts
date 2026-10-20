import { SITE_URL, absoluteUrl } from '@/lib/site'
import { LEAD_INDUSTRIES, LEAD_WEBSITE_TYPES } from '@/content/leadOptions'
import { getDictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/config'

/**
 * Tin nhắn Discord báo lead mới cho nhân viên. Mọi nhãn bằng tiếng Anh (cả kênh đội Hàn) để hai đội đọc chung một
 * định dạng; chỉ nội dung khách nhập giữ nguyên. Gồm mọi thông tin server có: liên hệ, nguồn quảng cáo/UTM,
 * referrer, trang vào, vị trí gần đúng (header Vercel/Cloudflare), thiết bị và ngôn ngữ.
 */
export interface LeadNotification {
    id?: string | number
    isDuplicate: boolean
    locale: Locale
    name: string
    email: string
    phone: string
    preferredContact: string | null
    industry: string | null
    websiteType: string | null
    message: string
    attribution: Record<string, string> | null
}

type EmbedField = { name: string; value: string; inline?: boolean }

/** Discord từ chối cả tin nhắn nếu một field dài quá 1024 ký tự (tin nhắn khách được tới 5000). */
const MAX_FIELD = 1024
const clip = (value: string, max = MAX_FIELD) => (value.length > max ? `${value.slice(0, max - 1)}…` : value)

const CONTACT_LABELS: Record<string, string> = { phone: 'Phone', email: 'Email', kakao: 'KakaoTalk', whatsapp: 'WhatsApp' }

/** gclid/gbraid/wbraid/ttclid chỉ có khi bấm quảng cáo; fbclid Facebook gắn cho mọi link ra ngoài, kể cả bài đăng thường. */
const AD_CLICK_IDS = [
    ['gclid', 'Google Ads'],
    ['gbraid', 'Google Ads (iOS)'],
    ['wbraid', 'Google Ads (iOS web-to-app)'],
    ['ttclid', 'TikTok Ads'],
    ['fbclid', 'Facebook/Instagram click (ad or post)'],
] as const

const SEARCH_ENGINES: [RegExp, string][] = [
    [/(^|\.)google\./, 'Google'],
    [/(^|\.)bing\.com$/, 'Bing'],
    [/(^|\.)coccoc\.com$/, 'Coc Coc'],
    [/(^|\.)naver\.com$/, 'Naver'],
    [/(^|\.)daum\.net$/, 'Daum'],
    [/(^|\.)yahoo\./, 'Yahoo'],
    [/(^|\.)duckduckgo\.com$/, 'DuckDuckGo'],
]

const BROWSERS: [RegExp, string][] = [
    [/Zalo/i, 'Zalo in-app'],
    [/KAKAOTALK/i, 'KakaoTalk in-app'],
    [/FBAN|FBAV|FB_IAB/, 'Facebook in-app'],
    [/Instagram/, 'Instagram in-app'],
    [/\bLine\//, 'LINE in-app'],
    [/coc_coc_browser/i, 'Coc Coc'],
    [/SamsungBrowser/, 'Samsung Internet'],
    [/Whale\//, 'Naver Whale'],
    [/Edg(A|iOS)?\//, 'Edge'],
    [/OPR\/|Opera/, 'Opera'],
    [/Firefox\/|FxiOS/, 'Firefox'],
    [/CriOS|Chrome\//, 'Chrome'],
    [/Safari\//, 'Safari'],
]

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
const languageNames = new Intl.DisplayNames(['en'], { type: 'language' })

function displayName(names: Intl.DisplayNames, code: string) {
    try {
        return names.of(code) ?? code
    } catch {
        return code
    }
}

function hostOf(url: string) {
    try {
        return new URL(url).hostname.replace(/^www\./, '')
    } catch {
        return null
    }
}

/** Giá trị ngành/loại website lưu DB bằng tiếng Việt → nhãn tiếng Anh cùng vị trí trong từ điển en. */
function englishOption(value: string, options: readonly string[], labels: string[]) {
    return labels[options.indexOf(value)] ?? value
}

/** Tóm tắt một dòng: khách tới từ đâu. */
function trafficSource(a: Record<string, string>) {
    if (a.gclid || a.gbraid || a.wbraid) return 'Paid · Google Ads'
    if (a.ttclid) return 'Paid · TikTok Ads'
    if (a.utm_medium && /cpc|ppc|paid|ads?\b|display|retarget/i.test(a.utm_medium)) return `Paid · ${a.utm_source ?? a.utm_medium}`
    if (a.fbclid) return 'Social · Facebook/Instagram'
    if (a.utm_source) return `Campaign · ${a.utm_source}${a.utm_medium ? ` / ${a.utm_medium}` : ''}`
    const host = a.referrer ? hostOf(a.referrer) : null
    if (host) {
        const engine = SEARCH_ENGINES.find(([pattern]) => pattern.test(host))?.[1]
        return engine ? `Organic search · ${engine}` : `Referral · ${host}`
    }
    return 'Direct (no referrer)'
}

function adClicks(a: Record<string, string>) {
    const lines = AD_CLICK_IDS.filter(([key]) => a[key]).map(([key, label]) => `**${label}** · ${key} \`${clip(a[key], 200)}\``)
    return lines.length > 0 ? lines.join('\n') : 'No ad click ID'
}

function utmLines(a: Record<string, string>) {
    return ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
        .filter((key) => a[key])
        .map((key) => `${key.replace('utm_', '')}: \`${a[key]}\``)
        .join('\n')
}

/** Mã quốc gia → cờ emoji (VN → 🇻🇳). */
function flag(country: string) {
    return /^[A-Z]{2}$/.test(country) ? String.fromCodePoint(...[...country].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)) : ''
}

/** Vị trí gần đúng theo IP do Vercel (hoặc Cloudflare) gắn vào request — không lưu, chỉ hiển thị. */
function visitorLocation(headers: Headers) {
    const country = (headers.get('x-vercel-ip-country') ?? headers.get('cf-ipcountry'))?.toUpperCase()
    if (!country || country === 'XX') return null
    let city = headers.get('x-vercel-ip-city')
    try {
        city = city && decodeURIComponent(city)
    } catch {
        // giữ nguyên chuỗi gốc nếu không giải mã được
    }
    const region = headers.get('x-vercel-ip-country-region')
    const timezone = headers.get('x-vercel-ip-timezone')
    const place = [city, region, displayName(regionNames, country)].filter(Boolean).join(', ')
    return `${flag(country)} ${place}${timezone ? `\n${timezone}` : ''}`
}

function describeDevice(ua: string | null) {
    if (!ua) return null
    const type = /iPad|Tablet/i.test(ua) || (/Android/.test(ua) && !/Mobile/.test(ua)) ? 'Tablet' : /Mobi|iPhone|Android/.test(ua) ? 'Mobile' : 'Desktop'
    const os = /Windows NT/.test(ua)
        ? 'Windows'
        : /iPhone|iPad|iPod/.test(ua)
          ? 'iOS'
          : /Mac OS X/.test(ua)
            ? 'macOS'
            : /Android/.test(ua)
              ? 'Android'
              : /CrOS/.test(ua)
                ? 'ChromeOS'
                : /Linux/.test(ua)
                  ? 'Linux'
                  : 'Unknown OS'
    const browser = BROWSERS.find(([pattern]) => pattern.test(ua))?.[1] ?? 'Unknown browser'
    return `${type} · ${os} · ${browser}`
}

/** "<t:…>" hiển thị theo giờ máy của người xem trên Discord (đội Việt Nam và đội Hàn đều đúng múi giờ). */
function discordTime(iso: string) {
    const seconds = Math.floor(Date.parse(iso) / 1000)
    return Number.isFinite(seconds) ? `<t:${seconds}:f> (<t:${seconds}:R>)` : iso
}

export function buildLeadDiscordPayload(lead: LeadNotification, request: Request) {
    const headers = request.headers
    const a = lead.attribution ?? {}
    const en = getDictionary('en').form
    const fields: EmbedField[] = []
    const add = (name: string, value: string | null | undefined, inline = true) => {
        if (value && value.trim()) fields.push({ name, value: clip(value), inline })
    }

    // Liên hệ
    add('Name', lead.name)
    add('Phone', lead.phone)
    add('Email', lead.email || 'Not provided')
    add('Preferred contact', lead.preferredContact ? (CONTACT_LABELS[lead.preferredContact] ?? lead.preferredContact) : null)
    add('Industry', lead.industry ? englishOption(lead.industry, LEAD_INDUSTRIES, en.industries) : null)
    add('Website type', lead.websiteType ? englishOption(lead.websiteType, LEAD_WEBSITE_TYPES, en.websiteTypes) : null)
    add('Message', lead.message || 'No message', false)

    // Nguồn
    add('Ads', adClicks(a), false)
    add('UTM', utmLines(a), false)
    add('Referrer', a.referrer ?? 'None')
    add('Landing page', a.landing_page ? absoluteUrl(a.landing_page) : null)
    // Cắt ngắn để tổng embed luôn dưới giới hạn 6000 ký tự của Discord kể cả khi mọi field dài tối đa.
    const submittedFrom = headers.get('referer')
    add('Submitted from', submittedFrom && clip(submittedFrom, 300))
    add('First visit', a.captured_at ? discordTime(a.captured_at) : null)

    // Khách truy cập
    add('Location', visitorLocation(headers) ?? 'Unknown')
    add('Device', describeDevice(headers.get('user-agent')))
    const browserLanguage = headers.get('accept-language')?.split(',')[0]?.split(';')[0]?.trim()
    add(
        'Language',
        [`Page: ${displayName(languageNames, lead.locale)}`, browserLanguage && `Browser: ${browserLanguage}`].filter(Boolean).join('\n'),
    )
    add('GA client ID', a.ga_client_id)

    return {
        // Không bao giờ ping ai dù khách gõ @everyone trong nội dung.
        allowed_mentions: { parse: [] },
        embeds: [
            {
                title: lead.isDuplicate ? 'Repeat request (same phone within 24h)' : 'New consultation request',
                url: `${SITE_URL}/admin/consultations`,
                description: `**Source:** ${trafficSource(a)}`,
                color: lead.isDuplicate ? 16753920 : 5763719,
                fields,
                footer: {
                    text: [lead.id !== undefined && `Lead #${lead.id}`, `${displayName(languageNames, lead.locale)} page`]
                        .filter(Boolean)
                        .join(' · '),
                },
                timestamp: new Date().toISOString(),
            },
        ],
    }
}
