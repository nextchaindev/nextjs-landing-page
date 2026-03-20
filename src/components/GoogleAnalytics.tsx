'use client'

import Script from 'next/script'

type GoogleAnalyticsProps = {
    gaId: string | string[]
}

export default function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
    const gaIds = Array.isArray(gaId) ? gaId : [gaId]
    const primaryGaId = gaIds[0]

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${primaryGaId}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          ${gaIds.map((id) => `gtag('config', '${id}');`).join('\n          ')}
        `}
            </Script>
        </>
    )
}
