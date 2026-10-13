import LegalPage from "@/components/marketing/LegalPage"
import { pageMetadata } from "@/lib/seo"
import { LEGAL_UPDATED_AT, PRIVACY_SECTIONS } from "@/content/legal"

const PATH = "/chinh-sach-bao-mat"
const TITLE = "Chính sách bảo mật"
const INTRO = "Nextchain.site thu thập thông tin gì, dùng vào mục đích nào, lưu trữ ra sao và quyền của bạn đối với dữ liệu cá nhân."

export const metadata = pageMetadata({ title: TITLE, description: INTRO, path: PATH })

export default function PrivacyPage() {
  return (
    <LegalPage
      title={TITLE}
      path={PATH}
      intro={INTRO}
      updatedAt={LEGAL_UPDATED_AT}
      sections={PRIVACY_SECTIONS}
    />
  )
}
