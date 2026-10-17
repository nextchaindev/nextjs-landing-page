import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseClient'
import { checkConsultationRateLimit } from '@/lib/consultationRateLimit'
import { SITE_URL } from '@/lib/site'
import { ATTRIBUTION_KEYS } from '@/lib/attribution'
import { LEAD_INDUSTRIES, LEAD_WEBSITE_TYPES, pickOption } from '@/content/leadOptions'
import { parsePhone, type PhoneCountry } from '@/lib/phone'
import { DEFAULT_LOCALE, isLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

const ATTRIBUTION_FIELDS = [...ATTRIBUTION_KEYS, 'landing_page', 'referrer', 'captured_at', 'ga_client_id'] as const
const DUPLICATE_WINDOW_MS = 24 * 60 * 60 * 1000
const PREFERRED_CONTACTS = ['phone', 'email', 'kakao'] as const
const PHONE_PREFERENCE: Record<Locale, PhoneCountry> = { vi: 'VN', ko: 'KR' }

/** Nhãn hiển thị cho nhân viên: lead tiếng Hàn gửi về Discord của đội Hàn bằng tiếng Hàn. */
function discordLabels(locale: Locale) {
    if (locale === 'ko') {
        return {
            title: '새 상담 요청 (한국어 페이지)',
            duplicateTitle: '고객이 다시 문의했습니다 (24시간 내 동일 연락처)',
            industry: '업종',
            need: '요청 서비스',
            name: '이름',
            email: '이메일',
            phone: '연락처',
            preferred: '희망 연락 방법',
            message: '문의 내용',
            source: '유입 경로',
            noEmail: '미입력',
            noMessage: '내용 없음',
            direct: '직접 방문',
            enteredFrom: '진입 페이지',
        }
    }
    return {
        title: 'New Consultation Request',
        duplicateTitle: 'Khách gửi lại yêu cầu (trùng SĐT trong 24h)',
        industry: 'Ngành',
        need: 'Cần',
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        preferred: 'Liên hệ qua',
        message: 'Message',
        source: 'Nguồn',
        noEmail: 'Không cung cấp',
        noMessage: 'No message',
        direct: 'Trực tiếp',
        enteredFrom: 'vào từ',
    }
}

/** Giá trị ngành/loại website lưu DB luôn là tiếng Việt; dịch sang ngôn ngữ của nhân viên nhận lead. */
function displayOption(value: string, options: readonly string[], labels: string[], locale: Locale) {
    if (locale === DEFAULT_LOCALE) return value
    return labels[options.indexOf(value)] ?? value
}

/** Chỉ giữ các trường nguồn truy cập đã biết, dạng chuỗi ngắn. */
function sanitizeAttribution(value: unknown): Record<string, string> | null {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return null
    const clean: Record<string, string> = {}
    for (const key of ATTRIBUTION_FIELDS) {
        const field = (value as Record<string, unknown>)[key]
        if (typeof field === 'string' && field.trim()) clean[key] = field.trim().slice(0, 300)
    }
    return Object.keys(clean).length > 0 ? clean : null
}

export async function POST(request: Request) {
    try {
        if (Number(request.headers.get('content-length')) > 12000) {
            return NextResponse.json({ error: 'Request too large' }, { status: 413 })
        }

        const origin = request.headers.get('origin')
        if (origin && origin !== SITE_URL && !(process.env.NODE_ENV !== 'production' && /^http:\/\/localhost(:\d+)?$/.test(origin))) {
            return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
        }

        const rawBody = await request.text()
        if (rawBody.length > 12000) {
            return NextResponse.json({ error: 'Request too large' }, { status: 413 })
        }
        let body: Record<string, unknown>
        try {
            body = JSON.parse(rawBody)
        } catch {
            return NextResponse.json({ error: 'Invalid consultation details' }, { status: 400 })
        }
        if (!body || typeof body !== 'object' || Array.isArray(body)) {
            return NextResponse.json({ error: 'Invalid consultation details' }, { status: 400 })
        }
        const { name, email, phone, message, recaptchaToken } = body
        const attribution = sanitizeAttribution(body.attribution)
        const locale: Locale = typeof body.locale === 'string' && isLocale(body.locale) ? body.locale : DEFAULT_LOCALE
        const preferredContact = pickOption(PREFERRED_CONTACTS, body.preferredContact)
        const industry = pickOption(LEAD_INDUSTRIES, body.industry)
        const websiteType = pickOption(LEAD_WEBSITE_TYPES, body.websiteType)

        if (typeof body.verify_sum === 'string' && body.verify_sum.trim() !== '') {
            // Honeypot (phép tính ẩn): trả về thành công để bot không đoán được bộ lọc,
            // nhưng `verified: false` báo client không tính conversion.
            console.warn('Consultation honeypot triggered; lead dropped')
            return NextResponse.json({ success: true, verified: false }, { status: 200 })
        }

        if (
            typeof name !== 'string' || !name.trim() || name.length > 150 ||
            (email !== undefined && typeof email !== 'string') ||
            (typeof email === 'string' && (email.length > 254 || (email.trim() !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())))) ||
            !parsePhone(phone, PHONE_PREFERENCE[locale]) ||
            typeof message !== 'string' || message.length > 5000
        ) {
            return NextResponse.json({ error: 'Invalid consultation details' }, { status: 400 })
        }

        if (typeof recaptchaToken !== 'string' || !recaptchaToken) {
            return NextResponse.json(
                { error: 'Missing reCAPTCHA token' },
                { status: 400 }
            )
        }

        const secretKey = process.env.RECAPTCHA_SECRET_KEY
        if (!secretKey) {
            console.error('RECAPTCHA_SECRET_KEY is not defined in environment variables')
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            )
        }

        const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ secret: secretKey, response: recaptchaToken }),
            signal: AbortSignal.timeout(5000),
        })
        if (!recaptchaResponse.ok) {
            return NextResponse.json({ error: 'reCAPTCHA verification unavailable. Please try again.' }, { status: 502 })
        }
        const recaptchaData = await recaptchaResponse.json()

        if (recaptchaData.success !== true || typeof recaptchaData.hostname !== 'string' ||
            (recaptchaData.hostname !== new URL(SITE_URL).hostname && !(process.env.NODE_ENV !== 'production' && recaptchaData.hostname === 'localhost'))) {
            console.error('reCAPTCHA verification failed:', recaptchaData)
            return NextResponse.json(
                { error: 'reCAPTCHA verification failed. Please try again.' },
                { status: 400 }
            )
        }

        // validate ở trên đã đảm bảo parse được
        const parsedPhone = parsePhone(phone, PHONE_PREFERENCE[locale])!
        const normalizedPhone = parsedPhone.normalized
        try {
            if (!await checkConsultationRateLimit(normalizedPhone, request)) {
                return NextResponse.json({ error: 'Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau 10 phút.' }, {
                    status: 429,
                    headers: { 'Retry-After': '600' },
                })
            }
        } catch (error) {
            console.error('Consultation rate limit unavailable:', error)
            return NextResponse.json({ error: 'Server configuration error' }, { status: 503 })
        }

        // Cùng số điện thoại đã gửi trong 24 giờ và lead chưa đóng: không tạo lead
        // mới, không tính conversion lần nữa — chỉ báo nhân viên khách đã nhắn lại.
        const { data: recent } = await supabaseAdmin
            .from('consultations')
            .select('id')
            .eq('phone', normalizedPhone)
            .gte('created_at', new Date(Date.now() - DUPLICATE_WINDOW_MS).toISOString())
            .neq('status', 'closed')
            .limit(1)
        const isDuplicate = Boolean(recent && recent.length > 0)

        // 1. Insert into Supabase
        const lead = {
            name,
            contact: typeof email === 'string' && email.trim() ? email.trim() : normalizedPhone,
            phone: normalizedPhone,
            message,
            status: 'new',
        }
        const extras = {
            locale,
            ...(preferredContact && { preferred_contact: preferredContact }),
            ...(attribution && { attribution }),
            ...(industry && { industry }),
            ...(websiteType && { website_type: websiteType }),
        }
        let data: unknown = null
        let error: { message: string } | null = null
        if (!isDuplicate) {
            ;({ data, error } = await supabaseAdmin.from('consultations').insert([{ ...lead, ...extras }]).select())
            // Cột mới chưa được tạo (chưa chạy file SQL): lưu lead cơ bản thay vì làm hỏng form.
            if (error && /attribution|industry|website_type|locale|preferred_contact/.test(error.message)) {
                console.error('consultations columns missing; run supabase_attribution.sql, supabase_lead_details.sql and supabase_lead_locale.sql')
                ;({ data, error } = await supabaseAdmin.from('consultations').insert([lead]).select())
            }
        }

        if (error) {
            console.error('Supabase error:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        // 2. Send Discord Webhook — lead tiếng Hàn đi kênh của đội Hàn (nếu đã cấu hình), còn lại kênh mặc định.
        const discordWebhookUrl =
            (locale === 'ko' && process.env.DISCORD_WEBHOOK_URL_KO) || process.env.DISCORD_WEBHOOK_URL
        if (discordWebhookUrl) {
            const labels = discordLabels(locale)
            const formLabels = getDictionary(locale).form
            const contactMethodLabel = formLabels.contactMethods.find((method) => method.value === preferredContact)?.label
            const discordPayload = {
                embeds: [
                    {
                        title: isDuplicate ? labels.duplicateTitle : labels.title,
                        color: isDuplicate ? 16753920 : 5763719,
                        fields: [
                            ...(industry ? [{ name: labels.industry, value: displayOption(industry, LEAD_INDUSTRIES, formLabels.industries, locale), inline: true }] : []),
                            ...(websiteType ? [{ name: labels.need, value: displayOption(websiteType, LEAD_WEBSITE_TYPES, formLabels.websiteTypes, locale), inline: true }] : []),
                            { name: labels.name, value: name, inline: true },
                            { name: labels.email, value: typeof email === 'string' && email.trim() ? email.trim() : labels.noEmail, inline: true },
                            { name: labels.phone, value: normalizedPhone, inline: true },
                            ...(contactMethodLabel ? [{ name: labels.preferred, value: contactMethodLabel, inline: true }] : []),
                            { name: labels.message, value: message || labels.noMessage },
                            ...(attribution
                                ? [{
                                    name: labels.source,
                                    value: [
                                        attribution.utm_source && `utm: ${attribution.utm_source}/${attribution.utm_medium ?? '-'}/${attribution.utm_campaign ?? '-'}`,
                                        attribution.gclid && 'Google Ads (gclid)',
                                        attribution.fbclid && 'Facebook (fbclid)',
                                        attribution.ttclid && 'TikTok Ads (ttclid)',
                                        attribution.landing_page && `${labels.enteredFrom} ${attribution.landing_page}`,
                                    ].filter(Boolean).join(' · ') || labels.direct,
                                }]
                                : []),
                        ],
                        timestamp: new Date().toISOString(),
                    },
                ],
            }

            try {
                const webhookResponse = await fetch(discordWebhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(discordPayload),
                    signal: AbortSignal.timeout(5000),
                })
                if (!webhookResponse.ok) console.error('Discord webhook failed:', webhookResponse.status)
            } catch (error) {
                console.error('Discord webhook unavailable:', error)
            }
        }

        return NextResponse.json({ success: true, verified: !isDuplicate, data }, { status: 200 })
    } catch (error) {
        console.error('API error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
