import Link from "next/link"
import PageHeader from "@/components/marketing/PageHeader"
import Section from "@/components/marketing/Section"
import PricingCards from "@/components/marketing/PricingCards"
import ProjectPricingTabs from "@/components/sections/ProjectPricingTabs"
import FaqSection from "@/components/marketing/FaqSection"
import CtaBanner from "@/components/marketing/CtaBanner"
import JsonLdScript from "@/components/marketing/JsonLdScript"
import { pageMetadata, serviceSchema } from "@/lib/seo"
import { FREE_SUBDOMAIN_EXAMPLE, STARTING_PRICE } from "@/content/plans"
import type { Faq } from "@/content/faqs"

const PATH = "/bang-gia"
const DESCRIPTION =
  `Bảng giá làm landing page và website theo tháng từ ${STARTING_PRICE}, không phí khởi tạo, tên miền miễn phí hoặc tên miền riêng. Website doanh nghiệp, bán hàng, phần mềm, Marketing & SEO báo giá theo dự án từ 8.000.000đ.`

export const metadata = pageMetadata({
  title: "Bảng Giá Gói Website Theo Tháng",
  description: DESCRIPTION,
  path: PATH,
})

const PRICING_FAQS: Faq[] = [
  {
    q: "Gói tháng có phí khởi tạo không?",
    a: "Không. Thiết kế, soạn nội dung, hosting và SEO ban đầu đã nằm trong phí tháng. Gói yêu cầu cam kết tối thiểu 6 tháng.",
  },
  {
    q: "Tôi có cần mua tên miền không?",
    a: `Không bắt buộc. Website dùng miễn phí địa chỉ dạng ${FREE_SUBDOMAIN_EXAMPLE}. Nếu đã có hoặc muốn mua tên miền riêng (.com, .vn), bạn tự đăng ký với nhà cung cấp tên miền và Nextchain kết nối giúp — phí tên miền bạn trả trực tiếp cho nhà cung cấp.`,
  },
  {
    q: "Phí tháng bao gồm những gì?",
    a: "Hosting, SSL, bảo trì kỹ thuật, sao lưu và số lượt cập nhật nội dung theo từng gói như liệt kê ở trên.",
  },
  {
    q: "Tôi có thể đổi gói giữa chừng không?",
    a: "Có. Nâng gói áp dụng từ kỳ thanh toán kế tiếp; phần việc phát sinh (ví dụ thêm trang mới) được báo giá trước khi làm.",
  },
  {
    q: "Hủy dịch vụ thì sao?",
    a: "Điều kiện báo trước, bàn giao nội dung và tên miền được nêu tại Chính sách hủy dịch vụ.",
  },
]

export default function PricingPage() {
  return (
    <>
      <JsonLdScript
        data={serviceSchema({
          name: "Gói website theo tháng Nextchain.site",
          description: DESCRIPTION,
          path: PATH,
        })}
      />
      <PageHeader
        crumbs={[{ name: "Bảng giá", path: PATH }]}
        eyebrow="Bảng giá"
        title="Bảng giá gói website theo tháng"
        intro="Landing page và website cho kinh doanh nhỏ: trả theo tháng, không phí khởi tạo. Doanh nghiệp cần website hoặc phần mềm quy mô lớn hơn xem bảng giá dự án bên dưới."
      />

      <Section className="pt-4 md:pt-8">
        <PricingCards />
        <p className="mt-8 text-sm text-gray-500 text-center">
          Giá chưa gồm VAT (nếu có). Chi tiết điều kiện thanh toán và hủy xem tại{" "}
          <Link href="/dieu-khoan" className="underline hover:text-primary">
            Điều khoản dịch vụ
          </Link>{" "}
          và{" "}
          <Link href="/chinh-sach-huy-dich-vu" className="underline hover:text-primary">
            Chính sách hủy dịch vụ
          </Link>
          .
        </p>
      </Section>

      <Section title="Gói tháng nào phù hợp với bạn?">
        <div className="grid md:grid-cols-3 gap-6 text-gray-700 leading-relaxed">
          <p>
            <strong className="text-gray-900">Mới mở cơ sở, cần có mặt trên Google:</strong> gói Khởi
            đầu. Xem ví dụ tại{" "}
            <Link href="/dich-vu/thiet-ke-landing-page" className="text-primary underline">
              dịch vụ landing page
            </Link>
            .
          </p>
          <p>
            <strong className="text-gray-900">Có nhiều dịch vụ, muốn khách tìm thấy từng dịch vụ:</strong>{" "}
            gói Tăng trưởng, ví dụ{" "}
            <Link href="/giai-phap/website-spa" className="text-primary underline">
              website spa
            </Link>
            .
          </p>
          <p>
            <strong className="text-gray-900">Nhiều chi nhánh hoặc bán sản phẩm:</strong> gói Chuyên
            nghiệp, ví dụ{" "}
            <Link href="/giai-phap/website-salon" className="text-primary underline">
              website salon
            </Link>
            .
          </p>
        </div>
      </Section>

      <ProjectPricingTabs
        title="Bảng giá dự án cho doanh nghiệp"
        desc="Website doanh nghiệp, bán hàng, thiết kế theo yêu cầu, Marketing & SEO và phần mềm — trả theo dự án"
      />

      <FaqSection faqs={PRICING_FAQS} />
      <CtaBanner secondaryHref="/mau-website" secondaryLabel="Xem mẫu website" />
    </>
  )
}
