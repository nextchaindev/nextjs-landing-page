import Reveal from "@/components/marketing/Reveal"
import { cn } from "@/components/ui/utils"

interface SectionProps {
  title?: string
  desc?: string
  eyebrow?: string
  id?: string
  muted?: boolean
  className?: string
  children: React.ReactNode
}

export default function Section({ title, desc, eyebrow, id, muted, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24 px-4 md:px-6", muted && "bg-gray-50", className)}>
      <div className="max-w-[1200px] mx-auto">
        {title && (
          <Reveal className="text-center mb-10 md:mb-14">
            {eyebrow && (
              <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-orange-100 text-orange-700 text-sm font-medium">
                {eyebrow}
              </span>
            )}
            <h2 className="text-2xl md:text-4xl text-gray-900 leading-tight">{title}</h2>
            {desc && (
              <p className="mt-4 text-base md:text-xl text-gray-600 max-w-[760px] mx-auto">{desc}</p>
            )}
          </Reveal>
        )}
        <Reveal delay={0.1}>{children}</Reveal>
      </div>
    </section>
  )
}
