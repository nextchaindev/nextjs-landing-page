import { createHmac } from 'node:crypto'
import { supabaseAdmin } from '@/lib/supabaseClient'

export async function checkConsultationRateLimit(phone: string, request: Request) {
    const secret = process.env.CONSULTATION_RATE_LIMIT_SECRET
    if (!secret) throw new Error('CONSULTATION_RATE_LIMIT_SECRET is not configured')

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    const limits = [
        { value: `phone:${phone}`, maxAttempts: 3 },
        ...(ip ? [{ value: `ip:${ip}`, maxAttempts: 10 }] : []),
    ]

    for (const { value, maxAttempts } of limits) {
        const key = createHmac('sha256', secret).update(value).digest('hex')
        const { data, error } = await supabaseAdmin.rpc('check_consultation_rate_limit', {
            p_key: key,
            p_window_seconds: 600,
            p_max_attempts: maxAttempts,
        })
        if (error) throw error
        if (data !== true) return false
    }

    return true
}
