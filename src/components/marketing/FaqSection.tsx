import { ChevronDown } from "lucide-react"
import JsonLdScript from "@/components/marketing/JsonLdScript"
import type { Faq } from "@/content/faqs"

export default function FaqSection({
  faqs,
  title = "Câu hỏi thường gặp",
}: {
  faqs: Faq[]
  title?: string
}) {
  // FAQPage không còn cho rich result trên Google (ngừng 5/2026) nhưng vẫn
  // giúp các AI engine ngoài Google trích xuất đúng cặp hỏi–đang hiển thị.
  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }
      : null

  return (
    <section className="py-16 md:py-20 px-4 md:px-6">
      {faqSchema && <JsonLdScript data={faqSchema} />}
      <div className="max-w-[860px] mx-auto">
        <h2 className="text-2xl md:text-4xl text-gray-900 mb-8 md:mb-10 text-center">
          {title}
        </h2>
        <div className="divide-y divide-gray-200 border-y border-gray-200">
          {faqs.map((faq) => (
            <details key={faq.q} className="group py-5">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-semibold text-gray-900 md:text-lg">
                {faq.q}
                <ChevronDown className="w-5 h-5 shrink-0 text-gray-500 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-gray-700 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
