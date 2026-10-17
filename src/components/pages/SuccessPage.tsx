import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2, Clock, Mail, MessageCircle } from "lucide-react"
import type { Metadata } from "next"
import { getMessenger } from "@/lib/messenger"
import { PAGE_COPY } from "@/content/pages"
import { getDictionary } from "@/i18n/dictionaries"
import { localizePath, type NonDefaultLocale } from "@/i18n/config"

/** Trang cảm ơn sau khi gửi form (ko, en); không index. Trang tiếng Việt là app/(vi)/success/page.tsx. */
export function successMetadata(locale: NonDefaultLocale): Metadata {
  return {
    title: PAGE_COPY[locale].success.metaTitle,
    robots: { index: false, follow: false },
  }
}

export default function SuccessPage({ locale }: { locale: NonDefaultLocale }) {
  const copy = PAGE_COPY[locale].success
  const { contact } = getDictionary(locale)
  const messenger = getMessenger(locale)

  return (
    <div className="min-h-screen bg-[#F9FBFF] flex items-center justify-center mt-20 p-4">
      <div className="max-w-[800px] w-full bg-white rounded-[32px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] p-8 md:p-16 text-center">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-[#E6F9EE] rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-[#00A63E]" />
          </div>
        </div>

        <h1 className="text-2xl md:text-[36px] font-bold text-[#101828] mb-3">{copy.heading}</h1>
        <p className="text-[#4A5565] text-lg md:text-[20px] mb-12">{copy.subtitle}</p>

        <div className="bg-[#F0F7FF] rounded-2xl p-6 md:p-8 text-left space-y-6 mb-12">
          <div className="flex gap-4">
            <div className="mt-1">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-[#101828] mb-1 text-base md:text-lg">{copy.quick.title}</h3>
              <p className="text-[#4A5565] text-sm md:text-base leading-relaxed">
                {copy.quick.body.replace("{hours}", contact.hours ?? "")}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mt-1">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-[#101828] mb-1 text-base md:text-lg">{copy.mail.title}</h3>
              <p className="text-[#4A5565] text-sm md:text-base leading-relaxed">{copy.mail.body}</p>
            </div>
          </div>

          {messenger.href && (
            <div className="flex gap-4">
              <div className="mt-1">
                <MessageCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-[#101828] mb-1 text-base md:text-lg">{copy.messenger.title}</h3>
                <p className="text-[#4A5565] text-sm md:text-base leading-relaxed">
                  {copy.messenger.before}
                  <a
                    href={messenger.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-bold hover:underline">
                    {copy.messenger.link}
                  </a>
                  {copy.messenger.after}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
          <Button
            asChild
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-14 font-medium w-full md:w-auto flex items-center gap-2">
            <Link href={localizePath("/", locale)}>
              <ArrowLeft className="w-5 h-5" />
              {copy.back}
            </Link>
          </Button>
        </div>

        <div className="border-t border-gray-100 mb-8 w-full" />

        <p className="text-gray-500 text-sm font-medium">
          {copy.questionsBefore}
          <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
            {contact.email}
          </a>
          {copy.questionsAfter}
        </p>
      </div>
    </div>
  )
}
