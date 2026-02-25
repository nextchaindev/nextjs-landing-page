"use client"

import { motion } from "motion/react"
import { CheckCircle2, Crown, Target, Zap, Heart } from "lucide-react"
import { fadeInUp } from "@/hooks/useScrollAnimation"

export default function WhyChooseUs() {
  const features = [
    {
      title: "Chất lượng cao cấp",
      desc: "Mỗi dự án đều được trải qua kiểm định và kiểm tra đầu ra trước khi đến tay người dùng.",
      stat: "99.9% Độ mượt",
      icon: Crown,
      iconBg: "bg-[#FFEDD4]",
      iconColor: "text-[#F54900]",
      statBg: "bg-[#FFF7ED]",
      statColor: "text-[#F54900]",
    },
    {
      title: "Kết quả đảm bảo",
      desc: "Cam kết hoạt động tốt trên nhiều thiết bị như nhiều trình duyệt hiện nay",
      stat: "100% Tương thích",
      icon: Target,
      iconBg: "bg-[#DCFCE7]",
      iconColor: "text-[#008236]",
      statBg: "bg-[#F0FDF4]",
      statColor: "text-[#00A63E]",
    },
    {
      title: "Tốc độ vượt trội",
      desc: "Thời gian tải Website nhanh nhằm giữ chân phục vụ khách hàng trải nghiệm",
      stat: "99% Tải nhanh",
      icon: Zap,
      iconBg: "bg-[#DBEAFE]",
      iconColor: "text-[#155DFC]",
      statBg: "bg-[#EFF6FF]",
      statColor: "text-[#155DFC]",
    },
    {
      title: "Đồng hành cùng nhau",
      desc: "Không chỉ xây dựng rồi bỏ. Chúng tôi luôn đồng hành cùng bạn và trực tiếp quản trị.",
      stat: "100% Hỗ trợ",
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
              Tại sao chọn chúng tôi
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#101828] mb-6 leading-tight">
              Đối tác đáng tin cậy
            </h2>
            <p className="text-lg md:text-xl text-[#4A5565] leading-relaxed max-w-2xl mx-auto">
              Trải qua rất nhiều dự án thành công, chúng tôi hiểu rõ then chốt
              của doanh nghiệp và biết cách giải quyết hiệu quả
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
                    <h3 className="text-lg md:text-xl font-bold text-[#101828]">
                      {item.title}
                    </h3>
                    <div
                      className={`inline-block px-3 py-1 ${item.statBg} ${item.statColor} text-[10px] md:text-xs font-bold rounded-full`}>
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
      </div>
    </section>
  )
}
