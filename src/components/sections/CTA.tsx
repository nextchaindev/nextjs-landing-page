"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { useModal } from "@/context/ModalContext"
import { useDictionary } from "@/i18n/LocaleProvider"

export default function CTA() {
  const { openModalClean } = useModal()
  const { cta, contact } = useDictionary()

  return (
    <section
      id="cta"
      className="py-24 px-4 md:px-6 bg-[#F9FAFB] relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFD6A8]/30 blur-[128px] rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#BEDBFF]/40 blur-[128px] rounded-full -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-[1000px] mx-auto relative z-10">
        <div className="bg-white border border-[#F3F4F6] rounded-[32px] p-4 md:p-16 shadow-xl text-center">
          <h2 className="text-2xl md:text-[36px] font-medium text-[#101828] mb-2 leading-tight mx-auto">
            {cta.headingLead} <span className="text-[#F54900]">{cta.headingAccent}</span>
          </h2>
          <p className="text-lg md:text-[20px] text-[#4A5565] mb-12 max-w-2xl mx-auto leading-relaxed">
            {cta.desc}
          </p>

          <div className="flex flex-col items-center gap-6">
            <Button
              size="lg"
              className="bg-[#F54900] hover:bg-[#F54900]/90 text-white px-4 md:px-8 py-4 md:py-7 text-[16px] md:text-lg font-bold rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all w-full md:w-auto"
              onClick={openModalClean}>
              {cta.button}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <p className="text-[#364153] text-sm md:text-lg font-medium text-left">
              {cta.orContact}{" "}
              <a
                href={`mailto:${contact.email}`}
                className="text-[#2B7FFF] hover:underline">
                {contact.email}
              </a>
            </p>

            <div className="flex flex-wrap justify-start md:justify-center gap-6 md:gap-12 mt-8 pt-8 border-t border-gray-100 w-full">
              <div className="flex items-center gap-2 text-[#6A7282] text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#00A63E]" />
                {cta.trust[0]}
              </div>
              <div className="flex items-center gap-2 text-[#6A7282] text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#00A63E]" />
                {cta.trust[1]}
              </div>
              <div className="flex items-center gap-2 text-[#6A7282] text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#00A63E]" />
                {cta.trust[2]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
