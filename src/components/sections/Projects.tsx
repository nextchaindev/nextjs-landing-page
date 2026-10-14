"use client"

import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  useScrollAnimation,
} from "@/hooks/useScrollAnimation"
import image_1 from "@/assets/project-1.png"
import image_2 from "@/assets/project-2.png"
import image_3 from "@/assets/project-3.png"
import image_4 from "@/assets/project-4.png"
import image_5 from "@/assets/project-5.png"
import image_6 from "@/assets/project-6.png"

export default function Projects() {
  const { ref: projectsRef, isVisible: projectsVisible } = useScrollAnimation(0.1)
  const projects = [
    {
      title: "Website đặt bàn nhà hàng",
      description: "Bố cục thực đơn, thông tin bàn và nút liên hệ",
      image: image_1,
    },
    {
      title: "Website thương mại điện tử",
      description: "Danh mục sản phẩm, quy trình đặt mua ngắn",
      image: image_2,
    },
    {
      title: "Website tuyển sinh trung tâm đào tạo",
      description: "Thông tin khóa học rõ ràng, form đăng ký tư vấn",
      image: image_3,
    },
    {
      title: "Landing page dự án căn hộ",
      description: "Thông tin dự án, vị trí và form yêu cầu tư vấn",
      image: image_4,
    },
    {
      title: "Landing page đặt xe Limousine",
      description: "Mobile-first, nút gọi và đặt xe nổi bật",
      image: image_5,
    },
    {
      title: "SaaS Dashboard",
      description: "Bảng điều khiển dữ liệu và màn hình quản trị",
      image: image_6,
    },
  ]
  return (
    <section id="projects" className="py-20 px-6 bg-gray-50" ref={projectsRef}>
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={projectsVisible ? "visible" : "hidden"}
          variants={fadeInUp}>
              <h2 className="text-2xl md:text-4xl text-gray-900 mb-4">
                Tham khảo cách trình bày
              </h2>
              <p className="text-[16px] md:text-xl text-gray-600">
                Bố cục minh họa, không phải dự án khách hàng hay kết quả đã đo lường.
              </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate={projectsVisible ? "visible" : "hidden"}
          variants={staggerContainer}>
          {projects.map((project) => (
            <motion.div
              key={project.title}
              className="group relative overflow-hidden rounded-xl cursor-pointer aspect-video"
              variants={staggerItem}>
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <div className="text-white transform md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-200">{project.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <p className="mt-12 text-center">
          <Link href="/mau-website" className="font-semibold text-primary hover:underline">
            Xem mẫu website theo ngành →
          </Link>
        </p>
      </div>
    </section>
  )
}
