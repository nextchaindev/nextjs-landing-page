import PageHeader from "@/components/marketing/PageHeader"
import Section from "@/components/marketing/Section"
import ProjectCards from "@/components/marketing/ProjectCards"
import CtaBanner from "@/components/marketing/CtaBanner"
import JsonLdScript from "@/components/marketing/JsonLdScript"
import { pageMetadata } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site"
import { PROJECTS } from "@/content/projects"

const PATH = "/du-an"

export const metadata = pageMetadata({
  title: "Dự án website, ứng dụng đã thực hiện",
  description:
    "Các dự án đội ngũ Nextchain đã thực hiện: landing page, website bán hàng, ứng dụng di động và phần mềm quản lý cho câu lạc bộ, đào tạo, bán lẻ.",
  path: PATH,
})

export default function ProjectsPage() {
  return (
    <>
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Dự án Nextchain đã thực hiện",
          itemListElement: PROJECTS.map((project, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            url: absoluteUrl(`/du-an/${project.slug}`),
            name: project.headline,
          })),
        }}
      />
      <PageHeader
        crumbs={[{ name: "Dự án", path: PATH }]}
        eyebrow="Dự án đã thực hiện"
        title="Dự án Nextchain đã thực hiện"
        intro="Landing page, website bán hàng, ứng dụng di động và phần mềm quản lý do chính đội ngũ Nextchain thiết kế và phát triển. Mỗi dự án ghi rõ bài toán, cách làm và tính năng đã bàn giao."
      />
      <Section>
        <ProjectCards />
      </Section>
      <CtaBanner
        title="Bạn có dự án tương tự?"
        desc="Gửi nhu cầu, Nextchain phản hồi trong 24 giờ làm việc với phương án và chi phí dự kiến."
        secondaryHref="/dich-vu"
        secondaryLabel="Xem dịch vụ"
      />
    </>
  )
}
