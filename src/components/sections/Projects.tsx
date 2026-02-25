"use client"

import { motion } from "motion/react"
import { ImageWithFallback } from "@/components/figma/ImageWithFallback"
import { IMAGES, IMAGE_ALT_TEXTS } from "@/constants/images"
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
} from "@/hooks/useScrollAnimation"
import image_1 from "@/assets/project-1.png"
import image_2 from "@/assets/project-2.png"
import image_3 from "@/assets/project-3.png"
import image_4 from "@/assets/project-4.png"
import image_5 from "@/assets/project-5.png"
import image_6 from "@/assets/project-6.png"

interface ProjectsProps {
  projectsRef: React.RefObject<HTMLDivElement | null>
  projectsVisible: boolean
}

export default function Projects({
  projectsRef,
  projectsVisible,
}: ProjectsProps) {
  const projects = [
    {
      title: "Website đặt bàn nhà hàng",
      description: "Tăng trải nghiệm người dùng, tối ưu booking",
      image: image_1,
    },
    {
      title: "Website thương mại điện tử",
      description: "Giao diện hiện đại, tăng tỷ lệ chuyển đổi",
      image: image_2,
    },
    {
      title: "Website tuyển sinh trung tâm đào tạo",
      description: "Tăng 40% đăng ký tư vấn",
      image: image_3,
    },
    {
      title: "Landing page dự án căn hộ",
      description: "Tối ưu form nhận thông tin, thu hút khách hàng",
      image: image_4,
    },
    {
      title: "Landing page đặt xe Limousine",
      description: "Mobile-first, tăng mạnh cuộc gọi",
      image: image_5,
    },
    {
      title: "SaaS Dashboard",
      description: "Quản lý dữ liệu trực quan, hiệu quả",
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
          <h2 className="text-4xl text-gray-900 mb-4">Dự án tiêu biểu</h2>
          <p className="text-xl text-gray-600">
            Năng lực thiết kế được thể hiện qua từng sản phẩm
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
              <ImageWithFallback
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-200">{project.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
