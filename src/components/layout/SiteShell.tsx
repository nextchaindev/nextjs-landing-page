import type { CSSProperties, ReactNode } from "react"
import JsonLd from "@/components/JsonLd"
import GoogleAnalytics from "@/components/GoogleAnalytics"
import ClarityAnalytics from "@/components/ClarityAnalytics"
import { GoogleTagManager } from "@next/third-parties/google"
import { Toaster } from "sonner"
import { ModalProvider } from "@/context/ModalContext"
import ConditionalLayout from "@/components/layout/ConditionalLayout"
import ConsentGate from "@/components/marketing/ConsentGate"
import { LocaleProvider } from "@/i18n/LocaleProvider"
import { getDictionary } from "@/i18n/dictionaries"
import type { Locale } from "@/i18n/config"

/**
 * Tracking IDs come from env so a duplicate tag can be switched off without a
 * code change. Unset → current production IDs; set to an empty string → off.
 * Keep GA4 either here (gtag) OR inside the GTM container, never both, or
 * page_view is counted twice.
 */
function envList(value: string | undefined, fallback: string[]) {
  if (value === undefined) return fallback
  return value.split(",").map((id) => id.trim()).filter(Boolean)
}
const GA_IDS = envList(process.env.NEXT_PUBLIC_GA_IDS, ["G-Z8NT4N1ZKB", "G-M1WX07RXCV"])
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-MCFFZTLK"
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID ?? "vkqca6mwj1"

interface SiteShellProps {
  locale: Locale
  /** Class `.variable` của next/font — khai báo font ở layout vì next/font chỉ chạy ở module scope. */
  fontClassName: string
  /** Tên CSS variable font chính của ngôn ngữ, vd "--font-noto-sans-kr". Bỏ trống để dùng font mặc định (Be Vietnam Pro). */
  fontVariable?: string
  children: ReactNode
}

/** Khung `<html>`/`<body>` dùng chung cho mọi root layout (mỗi ngôn ngữ một root layout). */
export default function SiteShell({ locale, fontClassName, fontVariable, children }: SiteShellProps) {
  const bodyStyle = fontVariable
    ? ({ "--font-app": `var(${fontVariable})` } as CSSProperties)
    : undefined

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${fontClassName} antialiased`} style={bodyStyle}>
        <JsonLd />
        <ConsentGate>
          {(GA_IDS.length > 0 || process.env.NEXT_PUBLIC_GAW_ID) && <GoogleAnalytics gaId={GA_IDS} />}
          {CLARITY_ID && <ClarityAnalytics projectId={CLARITY_ID} />}
          {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
        </ConsentGate>

        <LocaleProvider locale={locale} dictionary={getDictionary(locale)}>
          <ModalProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
          </ModalProvider>
        </LocaleProvider>
        <Toaster />
      </body>
    </html>
  )
}
