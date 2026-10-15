import PageHeader from "@/components/marketing/PageHeader"

export interface LegalSection {
  heading: string
  paragraphs: string[]
}

interface LegalPageProps {
  title: string
  path: string
  intro: string
  /** ISO date of the last substantive change */
  updatedAt: string
  sections: LegalSection[]
}

const dateFormat = new Intl.DateTimeFormat("vi-VN", { dateStyle: "long" })

export default function LegalPage({ title, path, intro, updatedAt, sections }: LegalPageProps) {
  return (
    <>
      <PageHeader crumbs={[{ name: title, path }]} title={title} intro={intro} />
      <article className="px-4 md:px-6 pb-20">
        <div className="max-w-[760px] mx-auto">
          <p className="text-sm text-gray-500 mb-10">
            Cập nhật lần cuối:{" "}
            <time dateTime={updatedAt}>{dateFormat.format(new Date(updatedAt))}</time>
          </p>
          {sections.map((section, idx) => (
            <section key={section.heading} className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {idx + 1}. {section.heading}
              </h2>
              {section.paragraphs.map((paragraph, pIdx) => (
                <p key={pIdx} className="mb-3 text-gray-800 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </>
  )
}
