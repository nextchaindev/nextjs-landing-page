import Link from "next/link"
import PageHeader from "@/components/marketing/PageHeader"
import Section from "@/components/marketing/Section"
import BlogCard from "@/components/marketing/BlogCard"
import CtaBanner from "@/components/marketing/CtaBanner"
import { pageMetadata } from "@/lib/seo"
import { BLOG_POSTS, sortedPosts } from "@/content/blog"

const PATH = "/blog"

export const metadata = pageMetadata({
  title: "Blog & hướng dẫn làm website cho doanh nghiệp",
  description:
    "Kinh nghiệm làm website cho doanh nghiệp và cơ sở dịch vụ: chi phí landing page, so sánh landing page và website, website spa cần gì, gói tháng hay trả một lần.",
  path: PATH,
  noindex: BLOG_POSTS.length === 0,
})

export default function BlogIndexPage() {
  const posts = sortedPosts()

  return (
    <>
      <PageHeader
        crumbs={[{ name: "Blog", path: PATH }]}
        eyebrow="Blog & Hướng dẫn"
        title="Kinh nghiệm làm website cho doanh nghiệp"
        intro="Bài viết thực tế về chi phí, tính năng và cách chọn loại website phù hợp — trả lời thẳng vào câu hỏi, có bảng so sánh và checklist."
      />
      <Section>
        {posts.length === 0 ? (
          <p className="text-center text-gray-600">
            Bài viết đầu tiên đang được biên soạn. Trong lúc chờ, xem{" "}
            <Link href="/dich-vu" className="text-primary underline">
              các dịch vụ
            </Link>
            .
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, idx) => (
              <BlogCard key={post.slug} post={post} index={idx} />
            ))}
          </div>
        )}
      </Section>
      <CtaBanner />
    </>
  )
}
