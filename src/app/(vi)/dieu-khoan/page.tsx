import LegalPage from "@/components/marketing/LegalPage"
import { pageMetadata } from "@/lib/seo"
import { LEGAL_UPDATED_AT, TERMS_SECTIONS } from "@/content/legal"

const PATH = "/dieu-khoan"
const TITLE = "Điều khoản dịch vụ"
const INTRO = "Điều khoản sử dụng dịch vụ thiết kế và quản trị website theo gói tháng của Nextchain.site: phí, thanh toán, trách nhiệm duyệt nội dung và phạm vi SEO."

export const metadata = pageMetadata({ title: TITLE, description: INTRO, path: PATH })

export default function TermsPage() {
  return (
    <LegalPage
      title={TITLE}
      path={PATH}
      intro={INTRO}
      updatedAt={LEGAL_UPDATED_AT}
      sections={TERMS_SECTIONS}
    />
  )
}
