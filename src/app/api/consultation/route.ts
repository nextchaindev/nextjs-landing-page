import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseClient'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, email, phone, message } = body

        // 1. Insert into Supabase
        const { data, error } = await supabaseAdmin
            .from('consultations')
            .insert([
                {
                    name,
                    contact: email, // Store email as contact for now, or add phone column
                    phone,
                    message,
                    status: 'new',
                },
            ])
            .select()

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
                        title: 'New Consultation Request',
                        color: 5763719, // Green
                        fields: [
                            { name: 'Name', value: name, inline: true },
                            { name: 'Email', value: email, inline: true },
                            { name: 'Phone', value: phone, inline: true },
                            { name: 'Message', value: message || 'No message' },
                        ],
                        timestamp: new Date().toISOString(),
                    },
                ],
            }

            await fetch(discordWebhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(discordPayload),
            })
        }

        return NextResponse.json({ success: true, data }, { status: 200 })
    } catch (error) {
        console.error('API error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
