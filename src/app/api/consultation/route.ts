import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseClient'
import { checkConsultationRateLimit } from '@/lib/consultationRateLimit'
import { SITE_URL } from '@/lib/site'
import { ATTRIBUTION_KEYS } from '@/lib/attribution'
import { LEAD_INDUSTRIES, LEAD_WEBSITE_TYPES, pickOption } from '@/content/leadOptions'

const ATTRIBUTION_FIELDS = [...ATTRIBUTION_KEYS, 'landing_page', 'referrer', 'captured_at', 'ga_client_id'] as const
const DUPLICATE_WINDOW_MS = 24 * 60 * 60 * 1000

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
        const { name, email, phone, message, company_website, recaptchaToken } = body
        const attribution = sanitizeAttribution(body.attribution)
        const industry = pickOption(LEAD_INDUSTRIES, body.industry)
        const websiteType = pickOption(LEAD_WEBSITE_TYPES, body.websiteType)

        if (typeof company_website !== 'string' || company_website.trim() !== '') {
            // Honeypot: trả về thành công để bot không đoán được bộ lọc,
            // nhưng `verified: false` báo client không tính conversion.
            console.warn('Consultation honeypot triggered; lead dropped')
            return NextResponse.json({ success: true, verified: false }, { status: 200 })
        }

        if (
            typeof name !== 'string' || !name.trim() || name.length > 150 ||
            (email !== undefined && typeof email !== 'string') ||
            (typeof email === 'string' && (email.length > 254 || (email.trim() !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())))) ||
            typeof phone !== 'string' || !/^(0|\+84)[35789][0-9]{8}$/.test(phone.replace(/\s/g, '')) ||
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

        const normalizedPhone = phone.replace(/\s/g, '')
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
            ...(attribution && { attribution }),
            ...(industry && { industry }),
            ...(websiteType && { website_type: websiteType }),
        }
        let data: unknown = null
        let error: { message: string } | null = null
        if (!isDuplicate) {
            ;({ data, error } = await supabaseAdmin.from('consultations').insert([{ ...lead, ...extras }]).select())
            // Cột mới chưa được tạo (chưa chạy file SQL): lưu lead cơ bản thay vì làm hỏng form.
            if (error && /attribution|industry|website_type/.test(error.message)) {
                console.error('consultations columns missing; run supabase_attribution.sql and supabase_lead_details.sql')
                ;({ data, error } = await supabaseAdmin.from('consultations').insert([lead]).select())
            }
        }

        if (error) {
            console.error('Supabase error:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        // 2. Send Discord Webhook
        const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL
        if (discordWebhookUrl) {
            const discordPayload = {
                embeds: [
                    {
                        title: isDuplicate ? 'Khách gửi lại yêu cầu (trùng SĐT trong 24h)' : 'New Consultation Request',
                        color: isDuplicate ? 16753920 : 5763719,
                        fields: [
                            ...(industry ? [{ name: 'Ngành', value: industry, inline: true }] : []),
                            ...(websiteType ? [{ name: 'Cần', value: websiteType, inline: true }] : []),
                            { name: 'Name', value: name, inline: true },
                            { name: 'Email', value: typeof email === 'string' && email.trim() ? email.trim() : 'Không cung cấp', inline: true },
                            { name: 'Phone', value: phone, inline: true },
                            { name: 'Message', value: message || 'No message' },
                            ...(attribution
                                ? [{
                                    name: 'Nguồn',
                                    value: [
                                        attribution.utm_source && `utm: ${attribution.utm_source}/${attribution.utm_medium ?? '-'}/${attribution.utm_campaign ?? '-'}`,
                                        attribution.gclid && 'Google Ads (gclid)',
                                        attribution.fbclid && 'Facebook (fbclid)',
                                        attribution.landing_page && `vào từ ${attribution.landing_page}`,
                                    ].filter(Boolean).join(' · ') || 'Trực tiếp',
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
