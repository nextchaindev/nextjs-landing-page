'use client'

import Script from 'next/script'

type GoogleAnalyticsProps = {
    gaId: string | string[]
}

/** Google Ads tag (AW-XXXXXXXXX). Configured on the same gtag so conversions and Enhanced Conversions reach Ads. */
const ADS_ID = process.env.NEXT_PUBLIC_GAW_ID

export default function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
    const gaIds = Array.isArray(gaId) ? gaId : [gaId]
    const primaryId = gaIds[0] ?? ADS_ID
    if (!primaryId) return null

    const configs = [
        ...gaIds.map((id) => `gtag('config', '${id}');`),
        ...(ADS_ID ? [`gtag('config', '${ADS_ID}', { allow_enhanced_conversions: true });`] : []),
    ]

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          ${configs.join('\n          ')}
        `}
            </Script>
        </>
    )
}
