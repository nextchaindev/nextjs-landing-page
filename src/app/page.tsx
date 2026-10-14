import Link from "next/link"
import { FileText, LayoutGrid, ShoppingBag } from "lucide-react"
import Hero from "@/components/sections/Hero"
import Process from "@/components/sections/Process"
import Projects from "@/components/sections/Projects"
import WhyChooseUs from "@/components/sections/WhyChooseUs"
import CTA from "@/components/sections/CTA"
import Section from "@/components/marketing/Section"
import Reveal from "@/components/marketing/Reveal"
import IndustryCards from "@/components/marketing/IndustryCards"
import ProjectPricingTabs from "@/components/sections/ProjectPricingTabs"
import ServiceCards from "@/components/marketing/ServiceCards"
import TemplateGallery from "@/components/marketing/TemplateGallery"
import PricingCards from "@/components/marketing/PricingCards"
import BlogCard from "@/components/marketing/BlogCard"
import FaqSection from "@/components/marketing/FaqSection"
import IntroVideo from "@/components/marketing/IntroVideo"
import { MOBILE_CAROUSEL, MOBILE_CAROUSEL_ITEM } from "@/components/marketing/carousel"
import { pageMetadata } from "@/lib/seo"
import { GENERAL_FAQS } from "@/content/faqs"
import { sortedPosts } from "@/content/blog"

export const metadata = pageMetadata({
  title: "Nextchain.site | Landing page & website làm trọn gói",
  description:
    "Bạn tập trung bán hàng, Nextchain viết nội dung, thiết kế, xuất bản và vận hành website. Landing page theo tháng cho cơ sở nhỏ; website và phần mềm theo dự án cho doanh nghiệp.",
  path: "/",
  absoluteTitle: true,
})

const GROWTH_FEATURES = [
  {
    icon: LayoutGrid,
    title: "Trang riêng cho từng dịch vụ",
    desc: "Ví dụ spa có trang chăm sóc da, gội đầu dưỡng sinh, massage thư giãn — mỗi trang có mô tả, hình ảnh, giá đã duyệt và nút yêu cầu hẹn.",
    iconBg: "bg-[#FFEDD4] text-[#F54900]",
  },
  {
    icon: FileText,
    title: "Blog được cập nhật khi cần",
    desc: "Spa đăng hướng dẫn chăm sóc da, homestay giới thiệu trải nghiệm du lịch. Nextchain soạn nháp, kiểm tra và đăng theo số bài trong gói.",
    iconBg: "bg-[#DBEAFE] text-[#155DFC]",
  },
  {
    icon: ShoppingBag,
    title: "Danh mục sản phẩm rõ ràng",
    desc: "Salon bán sản phẩm chăm sóc tóc, spa bán mỹ phẩm: ảnh, mô tả, thuộc tính, giá và nút liên hệ đặt mua.",
    iconBg: "bg-[#DCFCE7] text-[#008236]",
  },
]

export default function HomePage() {
  const latestPosts = sortedPosts().slice(0, 3)

  return (
    <div className="min-h-screen bg-white">
      <Hero />

      <Section
        muted
        title="Xem Nextchain làm website cho bạn"
        desc="Gửi thông tin, chọn mẫu theo ngành, website lên mạng với tên miền miễn phí hoặc tên miền riêng.">
        <IntroVideo title="Video giới thiệu: Nextchain làm website trọn gói cho spa, salon, homestay từ 249.000đ/tháng" />
      </Section>

      <Section
        eyebrow="Chọn ngành kinh doanh"
        title="Website thiết kế riêng cho từng ngành"
        desc="Spa, salon, homestay và các cơ sở dịch vụ địa phương. Mỗi ngành có bố cục và nội dung riêng.">
        <IndustryCards />
      </Section>

      <Section
        muted
        id="bang-gia"
        eyebrow="Bảng giá"
        title="Trả theo tháng, không phí khởi tạo"
        desc="Dành cho landing page và kinh doanh nhỏ. Quyền lợi, giới hạn và điều kiện hủy công bố rõ.">
        <PricingCards />
        <p className="mt-10 text-center">
          <Link href="/bang-gia" className="font-semibold text-primary hover:underline">
            Xem bảng giá chi tiết và câu hỏi thường gặp →
          </Link>
        </p>
      </Section>

      <Section
        title="Tham khảo mẫu theo ngành"
        desc="Một số bố cục tham khảo. Website của bạn được thiết kế riêng theo thương hiệu, không giới hạn trong các mẫu này.">
        <TemplateGallery limit={6} carousel />
        <p className="mt-10 text-center">
          <Link href="/mau-website" className="font-semibold text-primary hover:underline">
            Xem tất cả mẫu tham khảo →
          </Link>
        </p>
      </Section>

      <Projects />

      <Section
        muted
        title="Tự làm hay thuê trọn gói?"
        desc="So sánh thời gian, chi phí và việc bạn cần tự làm trước khi quyết định.">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/so-sanh/tu-lam-hay-thue-tron-goi" className="rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90">
            So sánh hai cách làm
          </Link>
          <Link href="/quy-trinh" className="font-semibold text-primary underline underline-offset-4">Quy trình Nextchain thực hiện</Link>
        </div>
      </Section>

      <Section
        id="dich-vu"
        title="Doanh nghiệp cần giải pháp riêng?"
        desc="Website doanh nghiệp, bán hàng, marketing và phần mềm được khảo sát, báo giá theo dự án.">
        <ServiceCards only="project" />
        <p className="mt-10 text-center">
          <Link href="/dich-vu" className="font-semibold text-primary hover:underline">
            Xem tất cả dịch vụ →
          </Link>
        </p>
      </Section>

      <ProjectPricingTabs />

      <Process />

      <Section
        muted
        title="Website phát triển cùng doanh nghiệp"
        desc="Cập nhật dịch vụ, danh mục sản phẩm, blog, ảnh và thông tin liên hệ theo phạm vi gói.">
        <div className={`${MOBILE_CAROUSEL} md:grid-cols-3`}>
          {GROWTH_FEATURES.map(({ icon: Icon, title, desc, iconBg }, idx) => (
            <Reveal
              key={title}
              delay={idx * 0.1}
              className={`${MOBILE_CAROUSEL_ITEM} group bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300`}>
              <span className={`w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${iconBg}`}>
                <Icon className="w-7 h-7" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-[#101828]">{title}</h3>
              <p className="mt-2 text-sm md:text-base text-[#4A5565] leading-relaxed">{desc}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 text-center">
          <Link href="/dich-vu/quan-tri-website-theo-thang" className="font-semibold text-primary hover:underline">
            Quản trị website theo tháng gồm những gì? →
          </Link>
        </p>
      </Section>

      <WhyChooseUs />

      {latestPosts.length > 0 && (
        <Section
          muted
          title="Kinh nghiệm làm website cho doanh nghiệp nhỏ"
          desc="Chi phí, tính năng cần có và cách chọn loại website phù hợp.">
          <div className={`${MOBILE_CAROUSEL} md:grid-cols-3`}>
            {latestPosts.map((post) => (
              <div key={post.slug} className={MOBILE_CAROUSEL_ITEM}>
                <BlogCard post={post} />
              </div>
            ))}
          </div>
          <p className="mt-10 text-center">
            <Link href="/blog" className="font-semibold text-primary hover:underline">
              Xem tất cả bài viết →
            </Link>
          </p>
        </Section>
      )}

      <FaqSection faqs={GENERAL_FAQS} />
      <CTA />
    </div>
  )
}
