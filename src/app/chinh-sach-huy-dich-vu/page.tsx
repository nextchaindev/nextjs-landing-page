import LegalPage from "@/components/marketing/LegalPage"
import { pageMetadata } from "@/lib/seo"
import { LEGAL_UPDATED_AT, CANCELLATION_SECTIONS } from "@/content/legal"

const PATH = "/chinh-sach-huy-dich-vu"
const TITLE = "Chính sách hủy dịch vụ"
const INTRO = "Cách hủy gói website theo tháng tại Nextchain.site, xử lý phí đã thanh toán, bàn giao nội dung, tên miền và dữ liệu."

export const metadata = pageMetadata({ title: TITLE, description: INTRO, path: PATH })

export default function CancellationPage() {
  return (
    <LegalPage
      title={TITLE}
      path={PATH}
      intro={INTRO}
      updatedAt={LEGAL_UPDATED_AT}
      sections={CANCELLATION_SECTIONS}
    />
  )
}
