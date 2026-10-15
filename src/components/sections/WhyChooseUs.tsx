"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { CheckCircle2, Crown, Target, Zap, Heart } from "lucide-react"
import { fadeInUp } from "@/hooks/useScrollAnimation"

export default function WhyChooseUs() {
  const features = [
    {
      title: "Bạn duyệt mọi nội dung",
      desc: "Đội ngũ Nextchain chuẩn bị thiết kế và nội dung; không nội dung nào được xuất bản khi chưa có bạn xác nhận.",
      stat: "Duyệt trước khi đăng",
      icon: Crown,
      iconBg: "bg-[#FFEDD4]",
      iconColor: "text-[#F54900]",
      statBg: "bg-[#FFF7ED]",
      statColor: "text-[#F54900]",
    },
    {
      title: "Phạm vi rõ ràng",
      desc: "Mỗi gói ghi rõ bao gồm gì, không bao gồm gì. Việc phát sinh được báo giá trước khi làm.",
      stat: "Không phí ẩn",
      icon: Target,
      iconBg: "bg-[#DCFCE7]",
      iconColor: "text-[#008236]",
      statBg: "bg-[#F0FDF4]",
      statColor: "text-[#00A63E]",
    },
    {
      title: "Nền tảng kỹ thuật rõ ràng",
      desc: "Trang có tiêu đề, mô tả và sơ đồ website; các hạng mục SEO và kiểm tra tốc độ tùy phạm vi gói.",
      stat: "SEO kỹ thuật",
      icon: Zap,
      iconBg: "bg-[#DBEAFE]",
      iconColor: "text-[#155DFC]",
      statBg: "bg-[#EFF6FF]",
      statColor: "text-[#155DFC]",
    },
    {
      title: "Đồng hành sau khi xuất bản",
      desc: "Không làm xong rồi bỏ. Nextchain cập nhật nội dung, bảo trì và hỗ trợ theo gói tháng.",
      stat: "Quản lý hằng tháng",
      icon: Heart,
      iconBg: "bg-[#FCE7F3]",
      iconColor: "text-[#E60076]",
      statBg: "bg-[#FDF2F8]",
      statColor: "text-[#E60076]",
    },
  ]

  return (
    <section className="py-20 px-4 md:px-6 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F0FDF4] text-[#008236] rounded-full text-sm font-medium mb-6">
              <CheckCircle2 className="w-4 h-4" />
              Cam kết của Nextchain
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#101828] mb-6 leading-tight">
              Minh bạch, có thể kiểm chứng
            </h2>
            <p className="text-sm md:text-base text-[#4A5565] leading-relaxed max-w-2xl mx-auto">
              Phạm vi công việc và chi phí rõ ràng. Không hứa thứ hạng Google hay doanh số không thể kiểm chứng.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1024px] mx-auto">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="flex gap-4 md:gap-6 items-start">
                <div
                  className={`w-14 h-14 ${item.iconBg} ${item.iconColor} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <h3 className="text-base md:text-lg font-bold text-[#101828]">
                      {item.title}
                    </h3>
                    <div
                      className={`inline-block px-3 py-1 ${item.statBg} ${item.statColor} text-xs font-bold rounded-full`}>
                      {item.stat}
                    </div>
                  </div>
                  <p className="text-sm text-[#4A5565] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="mt-12 text-center text-gray-700">
          <Link href="/ve-chung-toi" className="font-semibold text-primary hover:underline">
            Về đơn vị vận hành
          </Link>
          {" · "}
          <Link href="/chinh-sach-huy-dich-vu" className="font-semibold text-primary hover:underline">
            Chính sách hủy dịch vụ
          </Link>
        </p>
      </div>
    </section>
  )
}
