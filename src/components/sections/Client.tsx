import {
  useScrollAnimation,
  fadeInUp,
  staggerContainer,
  staggerItem,
} from "@/hooks/useScrollAnimation"
import { CheckCircle2, Crown, Heart, Target, Zap } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

interface ClientProps {
  clientsRef: React.RefObject<HTMLDivElement | null>
  clientsVisible: boolean
}

export default function Client({ clientsRef, clientsVisible }: ClientProps) {
  return (
    <section id="customers" className="py-20 px-6" ref={clientsRef}>
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={clientsVisible ? "visible" : "hidden"}
          variants={fadeInUp}>
          <h2 className="text-2xl md:text-4xl text-gray-900 mb-4">
            Khách hàng & đối tác
          </h2>
          <p className="text-[16px] md:text-xl text-gray-600">
            Được tin tưởng bởi các doanh nghiệp hàng đầu
          </p>
        </motion.div>

        {/* Client Testimonials */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          animate={clientsVisible ? "visible" : "hidden"}
          variants={staggerContainer}>
          <motion.div
            className="bg-white border border-gray-200 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            variants={staggerItem}>
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              "Nextchain đã giúp chúng tôi xây dựng nền tảng thương mại điện tử
              vượt cả mong đợi. Đội ngũ rất chuyên nghiệp và nhiệt tình."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-white font-semibold">
                NL
              </div>
              <div>
                <div className="font-semibold text-gray-900">Nguyễn Lan</div>
                <div className="text-sm text-gray-600">CEO, VietCommerce</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white border border-gray-200 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            variants={staggerItem}>
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              "Sản phẩm được thiết kế rất đẹp mắt và dễ sử dụng. Doanh số của
              chúng tôi tăng 200% chỉ sau 3 tháng ra mắt."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-white font-semibold">
                TM
              </div>
              <div>
                <div className="font-semibold text-gray-900">Trần Minh</div>
                <div className="text-sm text-gray-600">Giám đốc, FintechVN</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white border border-gray-200 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            variants={staggerItem}>
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              "Đội ngũ Nextchain không chỉ giỏi về kỹ thuật mà còn hiểu rõ nhu
              cầu kinh doanh. Rất đáng để hợp tác lâu dài."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-white font-semibold">
                PH
              </div>
              <div>
                <div className="font-semibold text-gray-900">Phạm Hương</div>
                <div className="text-sm text-gray-600">
                  COO, SmartHR Solutions
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
