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
import { pageMetadata } from "@/lib/seo"
import { GENERAL_FAQS } from "@/content/faqs"
import { sortedPosts } from "@/content/blog"

export const metadata = pageMetadata({
  title: "Nextchain.site | Thiết Kế Landing Page Trọn Gói Theo Tháng",
  description:
    "Dịch vụ làm landing page và website cho spa, salon, homestay và doanh nghiệp nhỏ. Chọn mẫu, duyệt nội dung — Nextchain thiết kế, xuất bản và quản lý theo gói tháng.",
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
        eyebrow="Chọn ngành kinh doanh"
        title="Website thiết kế riêng cho từng ngành"
        desc="Spa, salon, homestay và các doanh nghiệp dịch vụ địa phương — mỗi ngành có bố cục và nội dung riêng.">
        <IndustryCards />
      </Section>

      <Section
        muted
        id="dich-vu"
        eyebrow="Dịch vụ"
        title="Dịch vụ của Nextchain"
        desc="Landing page trọn gói theo tháng cho kinh doanh nhỏ; website doanh nghiệp, bán hàng, phần mềm và Marketing & SEO theo dự án.">
        <ServiceCards />
        <p className="mt-10 text-center">
          <Link href="/dich-vu" className="font-semibold text-primary hover:underline">
            Xem tất cả dịch vụ →
          </Link>
        </p>
      </Section>

      <Section
        eyebrow="Mẫu website tham khảo"
        title="Tham khảo mẫu theo ngành"
        desc="Một số bố cục tham khảo — website của bạn được thiết kế riêng theo thương hiệu, không giới hạn trong các mẫu này.">
        <TemplateGallery limit={6} />
        <p className="mt-10 text-center">
          <Link href="/mau-website" className="font-semibold text-primary hover:underline">
            Xem tất cả mẫu tham khảo →
          </Link>
        </p>
      </Section>

      <Projects />

      <Process />

      <Section
        muted
        eyebrow="Blog · Trang dịch vụ · Trang sản phẩm"
        title="Website phát triển cùng doanh nghiệp"
        desc="Cập nhật dịch vụ, danh mục sản phẩm, blog, ảnh và thông tin liên hệ theo phạm vi gói.">
        <div className="grid md:grid-cols-3 gap-6">
          {GROWTH_FEATURES.map(({ icon: Icon, title, desc, iconBg }, idx) => (
            <Reveal
              key={title}
              delay={idx * 0.1}
              className="group bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300">
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

      <Section
        id="bang-gia"
        eyebrow="Bảng giá"
        title="Gói website theo tháng"
        desc="Dành cho landing page và kinh doanh nhỏ. Không phí khởi tạo, quyền lợi và giới hạn công bố rõ.">
        <PricingCards />
        <p className="mt-10 text-center">
          <Link href="/bang-gia" className="font-semibold text-primary hover:underline">
            Xem bảng giá chi tiết và câu hỏi thường gặp →
          </Link>
        </p>
      </Section>

      <ProjectPricingTabs />

      <WhyChooseUs />

      {latestPosts.length > 0 && (
        <Section
          muted
          eyebrow="Blog & Hướng dẫn"
          title="Kinh nghiệm làm website cho doanh nghiệp nhỏ"
          desc="Chi phí, tính năng cần có và cách chọn loại website phù hợp.">
          <div className="grid md:grid-cols-3 gap-6">
            {latestPosts.map((post, idx) => (
              <BlogCard key={post.slug} post={post} index={idx} />
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
