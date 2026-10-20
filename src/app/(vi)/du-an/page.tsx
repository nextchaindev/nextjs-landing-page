import PageHeader from "@/components/marketing/PageHeader"
import Section from "@/components/marketing/Section"
import ProjectGallery from "@/components/marketing/ProjectGallery"
import CtaBanner from "@/components/marketing/CtaBanner"
import JsonLdScript from "@/components/marketing/JsonLdScript"
import { pageMetadata } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site"
import { PROJECTS, PROJECT_CATEGORIES, PROJECT_CATEGORY_LABELS } from "@/content/projects"

const PATH = "/du-an"

export const metadata = pageMetadata({
  title: "Dự án website, ứng dụng AI và phần mềm",
  description: `${PROJECTS.length} dự án đội ngũ Nextchain đã làm: landing page, website, ứng dụng AI, nền tảng kết nối và phần mềm quản lý cho đào tạo, thể thao, bán lẻ, game.`,
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
          numberOfItems: PROJECTS.length,
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
        intro={`${PROJECTS.length} landing page, website, ứng dụng AI và phần mềm quản lý do chính đội ngũ Nextchain thiết kế và phát triển — cả dự án cho khách hàng lẫn sản phẩm tự làm. Mỗi dự án ghi rõ bài toán, cách làm và tính năng đã bàn giao.`}
      />
      <Section>
        <ProjectGallery
          projects={PROJECTS}
          categories={PROJECT_CATEGORIES.map((id) => ({ id, label: PROJECT_CATEGORY_LABELS.vi[id] }))}
          locale="vi"
        />
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
