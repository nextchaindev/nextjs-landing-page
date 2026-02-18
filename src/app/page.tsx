"use client"

import image_b1d2ddd0462d3f186ceed6ffb811a6df98b993cc from "@/assets/b1d2ddd0462d3f186ceed6ffb811a6df98b993cc.png"
import image_a35d01e0b11a4144ac661f7ce49365c79b988dbd from "@/assets/a35d01e0b11a4144ac661f7ce49365c79b988dbd.png"
import { Button } from "@/components/ui/button"
import { ImageWithFallback } from "@/components/figma/ImageWithFallback"
import {
  ArrowRight,
  Lightbulb,
  Code,
  Palette,
  LineChart,
  CheckCircle2,
  Users,
  Target,
  Rocket,
  ArrowUpRight,
  FileText,
  Globe,
  ShoppingCart,
  PenTool,
  Search,
  Camera,
  Megaphone,
  Clock,
  Crown,
  Zap,
  Heart,
  Boxes,
  X,
  Phone,
  Mail,
  User,
  Menu,
} from "lucide-react"
import Logo from "@/imports/Logo"
import FooterLogo from "@/imports/Logo-8-285"
import { IMAGES, IMAGE_ALT_TEXTS } from "@/constants/images"
import { useState, useRef, useEffect } from "react"
import { toast } from "sonner"
import { useActiveSection } from "@/hooks/useActiveSection"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { useCounterAnimation } from "@/hooks/useCounterAnimation"
import { CounterStat } from "@/components/CounterStat"
import { motion, AnimatePresence } from "motion/react"
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
} from "@/hooks/useScrollAnimation"

export default function Home() {
  const [selectedService, setSelectedService] = useState("landing")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  // Counter animation hook for hero stats
  const { ref: heroStatsRef, isVisible: heroStatsVisible } =
    useScrollAnimation(0.3)

  // Scroll animations for sections
  const { ref: servicesRef, isVisible: servicesVisible } =
    useScrollAnimation(0.1)
  const { ref: processRef, isVisible: processVisible } = useScrollAnimation(0.1)
  const { ref: projectsRef, isVisible: projectsVisible } =
    useScrollAnimation(0.1)
  const { ref: clientsRef, isVisible: clientsVisible } = useScrollAnimation(0.1)

  // Active section tracking for header highlight
  const sectionIds = useRef([
    "home",
    "services",
    "process",
    "projects",
    "clients",
  ])
  const activeSection = useActiveSection(sectionIds.current)

  // Ref for pricing carousel to auto-scroll to popular card
  const pricingCarouselRef = useRef<HTMLDivElement>(null)

  const openModalWithService = (
    serviceName: string,
    packageName: string,
    price: string,
  ) => {
    setFormData({
      ...formData,
      message: `Tôi quan tâm đến gói ${serviceName} - ${packageName} (${price}đ). `,
    })
    setIsModalOpen(true)
  }

  const openModalClean = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    })
    setIsModalOpen(true)
  }

  // Auto-scroll to popular card on mobile when service changes
  useEffect(() => {
    if (
      pricingCarouselRef.current &&
      typeof window !== "undefined" &&
      window.innerWidth < 768
    ) {
      // Popular card is always in the middle (index 1) after reordering
      const middleIndex = 1
      // All services have 3 packages
      const cardWidth = pricingCarouselRef.current.scrollWidth / 3
      const scrollPosition =
        cardWidth * middleIndex - (window.innerWidth - cardWidth) / 2

      // Wait for animation to complete (300ms) before scrolling
      const timer = setTimeout(() => {
        pricingCarouselRef.current?.scrollTo({
          left: Math.max(0, scrollPosition),
          behavior: "smooth",
        })
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [selectedService])

  const services = {
    landing: {
      name: "Landing Page",
      icon: FileText,
      color: "purple",
      packages: [
        {
          name: "Basic",
          price: "5.000.000",
          duration: "2-4 ngày",
          description: "Phù hợp cho chiến dịch ngắn hạn",
          features: [
            "1 trang landing page đơn giản",
            "Thiết kế responsive mobile",
            "Form liên hệ cơ bản",
            "Tối ưu tốc độ tải trang",
            "1 lần chỉnh sửa miễn phí",
          ],
        },
        {
          name: "Premium",
          price: "9.000.000",
          duration: "4-7 ngày",
          description: "Lựa chọn phổ biến nhất",
          popular: true,
          features: [
            "1 trang landing chuyên nghiệp",
            "Thiết kế UX/UI tùy chỉnh",
            "Form tích hợp Marketing tools",
            "Animation & hiệu ứng mượt mà",
            "SEO cơ bản",
            "2 lần chỉnh sửa miễn phí",
            "Hỗ trợ 30 ngày",
          ],
        },
        {
          name: "Professional",
          price: "15.000.000",
          duration: "7-14 ngày",
          description: "Giải pháp toàn diện",
          features: [
            "Landing page cao cấp với A/B testing",
            "Thiết kế UX/UI độc quyền",
            "Tích hợp đầy đủ Marketing automation",
            "Analytics & tracking chuyên sâu",
            "SEO nâng cao",
            "Live chat & chatbot",
            "3 lần chỉnh sửa miễn phí",
            "Hỗ trợ 90 ngày",
          ],
        },
      ],
    },
    corporate: {
      name: "Website Doanh nghiệp",
      icon: Globe,
      color: "blue",
      packages: [
        {
          name: "Basic",
          price: "12.000.000",
          duration: "7-10 ngày",
          description: "Website giới thiệu cơ bản",
          features: [
            "5-7 trang nội dung",
            "Thiết kế responsive",
            "Form liên hệ",
            "Google Maps tích hợp",
            "Quản trị nội dung đơn giản",
            "1 lần đào tạo sử dụng",
          ],
        },
        {
          name: "Premium",
          price: "25.000.000",
          duration: "14-21 ngày",
          description: "Lựa chọn phổ biến nhất",
          popular: true,
          features: [
            "10-15 trang nội dung đầy đủ",
            "Thiết kế chuyên nghiệp",
            "Trang tin tức/blog",
            "Tích hợp email marketing",
            "SEO cơ bản",
            "Đa ngôn ngữ (2 ngôn ngữ)",
            "2 lần đào tạo sử dụng",
            "Hỗ trợ 60 ngày",
          ],
        },
        {
          name: "Professional",
          price: "45.000.000",
          duration: "21-30 ngày",
          description: "Giải pháp doanh nghiệp lớn",
          features: [
            "Không giới hạn trang",
            "Thiết kế cao cấp theo thương hiệu",
            "Portal khách hàng/đối tác",
            "Tích hợp CRM",
            "SEO nâng cao toàn diện",
            "Đa ngôn ngữ (3+ ngôn ngữ)",
            "Bảo mật nâng cao",
            "3 lần đào tạo chuyên sâu",
            "Hỗ trợ 120 ngày",
          ],
        },
      ],
    },
    ecommerce: {
      name: "Website Bán hàng",
      icon: ShoppingCart,
      color: "teal",
      packages: [
        {
          name: "Basic",
          price: "18.000.000",
          duration: "10-14 ngày",
          description: "Bắt đầu bán hàng online",
          features: [
            "Tối đa 100 sản phẩm",
            "Giỏ hàng & thanh toán cơ bản",
            "Tích hợp 1 cổng thanh toán",
            "Quản lý đơn hàng đơn giản",
            "Responsive mobile",
            "SEO sản phẩm cơ bản",
          ],
        },
        {
          name: "Premium",
          price: "35.000.000",
          duration: "21-28 ngày",
          description: "Lựa chọn phổ biến nhất",
          popular: true,
          features: [
            "Không giới hạn sản phẩm",
            "Đa phương thức thanh toán",
            "Tích hợp vận chuyển",
            "Quản lý kho hàng",
            "Mã giảm giá & khuyến mãi",
            "SEO toàn diện",
            "Email marketing tự động",
            "Báo cáo doanh số chi tiết",
            "Hỗ trợ 90 ngày",
          ],
        },
        {
          name: "Professional",
          price: "65.000.000",
          duration: "30-45 ngày",
          description: "Nền tảng thương mại điện tử",
          features: [
            "Tất cả tính năng Premium",
            "Multi-vendor marketplace",
            "Tích hợp ERP/CRM",
            "AI recommendation engine",
            "Loyalty program",
            "Mobile app đồng bộ",
            "Bảo mật cao cấp",
            "API cho tích hợp mở rộng",
            "Đào tạo team chuyên sâu",
            "Hỗ trợ 180 ngày",
          ],
        },
      ],
    },
    custom: {
      name: "Thiết kế theo yêu cầu",
      icon: PenTool,
      color: "orange",
      packages: [
        {
          name: "Basic",
          price: "20.000.000",
          duration: "14-21 ngày",
          description: "Giải pháp tùy chỉnh cơ bản",
          features: [
            "Phân tích yêu cầu chi tiết",
            "Thiết kế UI/UX riêng biệt",
            "Tính năng cơ bản theo yêu cầu",
            "Responsive đa thiết bị",
            "Testing & debug",
            "Tài liệu kỹ thuật",
          ],
        },
        {
          name: "Premium",
          price: "45.000.000",
          duration: "30-45 ngày",
          description: "Lựa chọn phổ biến nhất",
          popular: true,
          features: [
            "Tư vấn giải pháp chuyên sâu",
            "Thiết kế UX/UI cao cấp",
            "Tính năng phức tạp tùy chỉnh",
            "Tích hợp hệ thống bên thứ 3",
            "Admin panel quản trị",
            "API development",
            "Testing toàn diện",
            "Đào tạo sử dụng",
            "Hỗ trợ 90 ngày",
          ],
        },
        {
          name: "Professional",
          price: "100.000.000+",
          duration: "60+ ngày",
          description: "Nền tảng enterprise",
          features: [
            "Tư vấn kiến trúc hệ thống",
            "Full-stack development",
            "Microservices architecture",
            "Cloud infrastructure",
            "Bảo mật cấp enterprise",
            "CI/CD pipeline",
            "Performance optimization",
            "Load balancing & scaling",
            "24/7 monitoring",
            "Hỗ trợ 365 ngày",
          ],
        },
      ],
    },
    marketing: {
      name: "Marketing & SEO",
      icon: Search,
      color: "indigo",
      packages: [
        {
          name: "Basic",
          price: "8.000.000",
          duration: "1 tháng",
          description: "Khởi động SEO cơ bản",
          features: [
            "Nghiên cứu từ khóa (20 từ)",
            "On-page SEO optimization",
            "Google My Business setup",
            "Tối ưu tốc độ website",
            "Báo cáo hàng tháng",
            "Google Analytics setup",
          ],
        },
        {
          name: "Premium",
          price: "18.000.000",
          duration: "3 tháng",
          description: "Lựa chọn phổ biến nhất",
          popular: true,
          features: [
            "Nghiên cứu từ khóa (50+ từ)",
            "On-page + Technical SEO",
            "Content marketing (4 bài/tháng)",
            "Link building chất lượng",
            "Google Ads setup & quản lý",
            "Social media marketing",
            "Báo cáo chi tiết 2 tuần/lần",
            "A/B testing campaigns",
          ],
        },
        {
          name: "Professional",
          price: "35.000.000",
          duration: "6 tháng",
          description: "Chiến lược marketing toàn diện",
          features: [
            "Nghiên cứu thị trường chuyên sâu",
            "SEO strategy toàn diện",
            "Content marketing (12 bài/tháng)",
            "Link building cao cấp",
            "Google Ads + Facebook Ads",
            "Email marketing automation",
            "Influencer marketing",
            "CRO (Conversion Rate Optimization)",
            "Dedicated account manager",
            "Báo cáo tuần",
          ],
        },
      ],
    },
    software: {
      name: "Phát triển phần mềm",
      icon: Boxes,
      color: "emerald",
      packages: [
        {
          name: "Basic",
          price: "Từ 20.000.000",
          duration: "7-14 ngày",
          description: "Giải pháp phần mềm đơn giản",
          features: [
            "Phân tích yêu cầu cơ bản",
            "Phát triển chức năng cốt lõi",
            "Ứng dụng web đơn giản",
            "Responsive trên các thiết bị",
            "1 lần chỉnh sửa miễn phí",
          ],
        },
        {
          name: "Premium",
          price: "Từ 40.000.000",
          duration: "14-30 ngày",
          description: "Phần mềm theo yêu cầu doanh nghiệp",
          popular: true,
          features: [
            "Phân tích nghiệp vụ chi tiết",
            "Phát triển hệ thống theo quy trình doanh nghiệp",
            "Ứng dụng Web / Mobile",
            "Tích hợp API, thanh toán, quản lý dữ liệu",
            "Bảo mật & phân quyền người dùng",
            "2 lần chỉnh sửa miễn phí",
            "Hỗ trợ 30 ngày sau bàn giao",
          ],
        },
        {
          name: "Professional",
          price: "Từ 70.000.000",
          duration: "30+ ngày",
          description: "Giải pháp phần mềm toàn diện",
          features: [
            "Thiết kế kiến trúc hệ thống chuyên sâu",
            "Phần mềm tùy chỉnh theo quy mô doanh nghiệp",
            "Tích hợp hệ thống nội bộ & bên thứ ba",
            "Hiệu năng cao, bảo mật nâng cao",
            "Analytics & báo cáo",
            "3 lần chỉnh sửa miễn phí",
            "Hỗ trợ & bảo trì 90 ngày",
          ],
        },
      ],
    },
  }

  const currentService = services[selectedService as keyof typeof services]

  // Reorder packages to put popular in the middle for better mobile carousel experience
  const reorderedPackages = (() => {
    const packages = [...currentService.packages]
    const popularIndex = packages.findIndex((pkg) => pkg.popular)
    if (popularIndex !== -1 && packages.length === 3) {
      if (popularIndex === 0) {
        return [packages[1], packages[0], packages[2]]
      } else if (popularIndex === 2) {
        return [packages[0], packages[2], packages[1]]
      }
    }
    return packages
  })()

  const colorClasses: Record<string, any> = {
    purple: {
      bg: "bg-purple-500",
      text: "text-purple-600",
      border: "border-purple-300",
      hover: "hover:bg-purple-600",
      badgeBg: "bg-purple-50",
      badgeText: "text-purple-600",
    },
    blue: {
      bg: "bg-blue-500",
      text: "text-blue-600",
      border: "border-blue-300",
      hover: "hover:bg-blue-600",
      badgeBg: "bg-blue-50",
      badgeText: "text-blue-600",
    },
    teal: {
      bg: "bg-teal-500",
      text: "text-teal-600",
      border: "border-teal-300",
      hover: "hover:bg-teal-600",
      badgeBg: "bg-teal-50",
      badgeText: "text-teal-600",
    },
    orange: {
      bg: "bg-orange-500",
      text: "text-orange-600",
      border: "border-orange-300",
      hover: "hover:bg-orange-600",
      badgeBg: "bg-orange-50",
      badgeText: "text-orange-600",
    },
    indigo: {
      bg: "bg-indigo-500",
      text: "text-indigo-600",
      border: "border-indigo-300",
      hover: "hover:bg-indigo-600",
      badgeBg: "bg-indigo-50",
      badgeText: "text-indigo-600",
    },
    emerald: {
      bg: "bg-emerald-500",
      text: "text-emerald-600",
      border: "border-emerald-300",
      hover: "hover:bg-emerald-600",
      badgeBg: "bg-emerald-50",
      badgeText: "text-emerald-600",
    },
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success("Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ sớm.")
        setIsModalOpen(false)
        setFormData({ name: "", email: "", phone: "", message: "" })
      } else {
        toast.error("Có lỗi xảy ra, vui lòng thử lại.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Có lỗi xảy ra, vui lòng thử lại.")
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-[70px] h-[37px] md:w-[91px] md:h-[48px]">
              <Logo />
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#services"
              className={`relative py-1 transition-colors font-medium group ${activeSection === "services"
                ? "text-orange-600"
                : "text-gray-600 hover:text-gray-900"
                }`}>
              Dịch vụ
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-600 transition-transform duration-300 origin-left ${activeSection === "services"
                  ? "scale-x-100"
                  : "scale-x-0 group-hover:scale-x-50"
                  }`}
              />
            </a>
            <a
              href="#process"
              className={`relative py-1 transition-colors font-medium group ${activeSection === "process"
                ? "text-orange-600"
                : "text-gray-600 hover:text-gray-900"
                }`}>
              Quy trình
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-600 transition-transform duration-300 origin-left ${activeSection === "process"
                  ? "scale-x-100"
                  : "scale-x-0 group-hover:scale-x-50"
                  }`}
              />
            </a>
            <a
              href="#projects"
              className={`relative py-1 transition-colors font-medium group ${activeSection === "projects"
                ? "text-orange-600"
                : "text-gray-600 hover:text-gray-900"
                }`}>
              Dự án
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-600 transition-transform duration-300 origin-left ${activeSection === "projects"
                  ? "scale-x-100"
                  : "scale-x-0 group-hover:scale-x-50"
                  }`}
              />
            </a>
            <a
              href="#clients"
              className={`relative py-1 transition-colors font-medium group ${activeSection === "clients"
                ? "text-orange-600"
                : "text-gray-600 hover:text-gray-900"
                }`}>
              Khách hàng
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-600 transition-transform duration-300 origin-left ${activeSection === "clients"
                  ? "scale-x-100"
                  : "scale-x-0 group-hover:scale-x-50"
                  }`}
              />
            </a>
            <a
              href="https://www.nextchain.kr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Về chúng tôi
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              onClick={openModalClean}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base px-3 md:px-4">
              Liên hệ
            </Button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Toggle menu">
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-gray-100 overflow-hidden">
              <div className="flex flex-col p-4 space-y-4">
                <a
                  href="#services"
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-lg font-medium transition-colors ${activeSection === "services"
                    ? "text-orange-600"
                    : "text-gray-700 hover:text-blue-600"
                    }`}>
                  Dịch vụ
                </a>
                <a
                  href="#process"
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-lg font-medium transition-colors ${activeSection === "process"
                    ? "text-orange-600"
                    : "text-gray-700 hover:text-blue-600"
                    }`}>
                  Quy trình
                </a>
                <a
                  href="#projects"
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-lg font-medium transition-colors ${activeSection === "projects"
                    ? "text-orange-600"
                    : "text-gray-700 hover:text-blue-600"
                    }`}>
                  Dự án
                </a>
                <a
                  href="#clients"
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-lg font-medium transition-colors ${activeSection === "clients"
                    ? "text-orange-600"
                    : "text-gray-700 hover:text-blue-600"
                    }`}>
                  Khách hàng
                </a>
                <a
                  href="https://www.nextchain.kr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors">
                  Về chúng tôi
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 bg-gradient-to-b from-orange-50/30 to-white">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-orange-100 text-orange-700 rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6">
              <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
              <span className="leading-tight">
                Giải pháp website cho cửa hàng & doanh nghiệp kinh doanh
              </span>
            </div>

            <h1 className="leading-tight text-gray-900 mb-4 md:mb-6 text-[32px] md:text-[44px]">
              Thiết kế website giúp bạn
              <br />
              <span className="text-orange-600 font-bold">
                {" "}
                BÁN ĐƯỢC NHIỀU HƠN
              </span>
            </h1>

            <p className="text-base md:text-xl text-gray-700 mb-6 md:mb-8 leading-relaxed">
              Thu hút khách hàng mới, tăng tỉ lệ chuyển đổi và tối ưu hoạt động
              kinh doanh mỗi ngày.
            </p>

            <div className="flex flex-wrap gap-3 md:gap-4 mb-8 md:mb-12">
              <Button
                size="lg"
                className="bg-[rgb(245,73,0)] hover:bg-gradient-to-r from-orange-600 to-orange-500 text-white gap-2 shadow-lg shadow-orange-600/30 transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm md:text-base">
                Nhận tư vấn miễn phí
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </div>

            <div
              ref={heroStatsRef}
              className="flex items-center gap-4 md:gap-8 pt-6 md:pt-8 border-t border-gray-200">
              <CounterStat
                target={50}
                suffix="+"
                label="Dự án hoàn thành"
                isVisible={heroStatsVisible}
              />
              <div className="w-px h-10 md:h-14 bg-gray-300"></div>
              <CounterStat
                target={30}
                suffix="+"
                label="Doanh nghiệp tin tưởng"
                isVisible={heroStatsVisible}
              />
              <div className="w-px h-10 md:h-14 bg-gray-300"></div>
              <CounterStat
                target={98}
                suffix="%"
                label="Khách hàng hài lòng"
                isVisible={heroStatsVisible}
              />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-orange-200 to-orange-100 rounded-3xl transform rotate-2 opacity-30"></div>

            <div className="relative bg-white rounded-2xl shadow-2xl p-2 md:p-4">
              <ImageWithFallback
                src={IMAGES.heroMockup}
                alt={IMAGE_ALT_TEXTS.heroMockup}
                className="rounded-lg w-full h-[300px] md:h-[450px] object-cover"
              />

              <div className="absolute -bottom-8 -left-8 rounded-xl p-2 w-40 hidden md:block">
                <ImageWithFallback
                  src={image_b1d2ddd0462d3f186ceed6ffb811a6df98b993cc}
                  alt="Mobile app mockup"
                  className="rounded-lg h-78 w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Services Section with Pricing */}
      <section id="services" className="py-20 px-6 bg-white" ref={servicesRef}>
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            animate={servicesVisible ? "visible" : "hidden"}
            variants={fadeInUp}>
            <h2 className="text-4xl text-gray-900 mb-4">
              Bảng giá dịch vụ chi tiết
            </h2>
            <p className="text-xl text-gray-600">
              Chọn gói phù hợp với nhu cầu và ngân sách của bạn
            </p>
          </motion.div>

          <div className="flex md:flex-wrap md:justify-center gap-2 mb-[72px] overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 -mx-4 md:mx-0 px-4 md:px-0 snap-x snap-mandatory md:snap-none scrollbar-hide">
            {Object.entries(services).map(([key, service]) => {
              const Icon = service.icon
              const colors = colorClasses[service.color]
              return (
                <button
                  key={key}
                  onClick={() => setSelectedService(key)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 flex-shrink-0 snap-start ${selectedService === key
                    ? `${colors.bg} text-white shadow-lg scale-105`
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}>
                  <Icon className="w-4 h-4" />
                  {service.name}
                </button>
              )
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedService}
              ref={pricingCarouselRef}
              className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 max-w-[1200px] mx-auto overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none scrollbar-hide pb-4 md:pb-0 px-[12.5vw] md:px-0 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}>
              {reorderedPackages.map((pkg, index) => {
                const colors = colorClasses[currentService.color]
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative bg-white rounded-2xl border-2 ${pkg.popular ? colors.border : "border-gray-200"
                      } p-5 md:p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${pkg.popular ? "md:scale-105" : ""
                      } flex-shrink-0 w-[75vw] md:w-auto snap-center`}>
                    {pkg.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                          Phổ biến nhất
                        </div>
                      </div>
                    )}

                    <div className="text-center mb-4 md:mb-6">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                        {pkg.name}
                      </h3>
                      <p className="text-gray-600 text-sm">{pkg.description}</p>
                    </div>

                    <div className="text-center mb-4 md:mb-6">
                      <div
                        className={`text-3xl md:text-4xl font-bold ${colors.text} mb-2`}>
                        {pkg.price}đ
                      </div>
                      <div className="flex items-center justify-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{pkg.duration}</span>
                      </div>
                    </div>

                    <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                      {pkg.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 md:gap-3">
                          <CheckCircle2
                            className={`w-4 h-4 md:w-5 md:h-5 ${colors.text} mt-0.5 flex-shrink-0`}
                          />
                          <span className="text-gray-700 text-xs md:text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() =>
                        openModalWithService(
                          currentService.name,
                          pkg.name,
                          pkg.price,
                        )
                      }
                      className={`w-full ${pkg.popular
                        ? `${colors.bg} ${colors.hover} text-white`
                        : `border-2 ${colors.border} ${colors.text}`
                        } py-2.5 md:py-3 px-4 md:px-6 rounded-xl text-sm md:text-base font-semibold transition-all hover:shadow-lg`}>
                      Tư vấn ngay
                    </button>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Các gói giá trên là mức tham khảo. Liên hệ với chúng tôi để được
              tư vấn chi tiết và báo giá chính xác cho dự án của bạn.
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 px-6" ref={processRef}>
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate={processVisible ? "visible" : "hidden"}
            variants={fadeInUp}>
            <h2 className="text-4xl text-gray-900 mb-4">Quy trình làm việc</h2>
            <p className="text-xl text-gray-600">
              Phương pháp chuyên nghiệp, minh bạch từng bước
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-4 gap-8 relative"
            initial="hidden"
            animate={processVisible ? "visible" : "hidden"}
            variants={staggerContainer}>
            <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-blue-200 via-orange-200 to-green-200"></div>

            {[
              {
                title: "Khảo sát & phân tích",
                desc: "Tìm hiểu sâu về doanh nghiệp và khách hàng",
                icon: Target,
                color: "blue",
                step: 1,
              },
              {
                title: "Thiết kế giải pháp",
                desc: "Đề xuất ý tưởng và thiết kế thương hiệu",
                icon: Lightbulb,
                color: "orange",
                step: 2,
              },
              {
                title: "Phát triển & triển khai",
                desc: "Xây dựng sản phẩm chất lượng cao",
                icon: Code,
                color: "purple",
                step: 3,
              },
              {
                title: "Bàn giao & đồng hành",
                desc: "Hỗ trợ vận hành sau khi ra mắt",
                icon: Rocket,
                step: 4,
                color: "green",
              },
            ].map((item, idx) => {
              const colorMap: Record<
                string,
                { bg: string; text: string; line: string }
              > = {
                blue: {
                  bg: "bg-gradient-to-r from-blue-400 to-blue-300",
                  text: "text-blue-600",
                  line: "from-blue-200",
                },
                orange: {
                  bg: "bg-gradient-to-r from-orange-400 to-orange-300",
                  text: "text-orange-600",
                  line: "via-orange-200",
                },
                purple: {
                  bg: "bg-gradient-to-r from-purple-400 to-purple-300",
                  text: "text-purple-600",
                  line: "via-purple-200",
                },
                green: {
                  bg: "bg-gradient-to-r from-green-400 to-green-300",
                  text: "text-green-600",
                  line: "to-green-200",
                },
              }
              const colors = colorMap[item.color as keyof typeof colorMap]

              return (
                <motion.div
                  key={idx}
                  className="relative group"
                  variants={staggerItem}>
                  <div className="flex flex-col items-center text-center gap-6">
                    <div className="flex flex-col items-center gap-4 relative z-10 w-full">
                      <div
                        className={`w-20 h-20 ${colors.bg} rounded-2xl flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110 duration-300`}>
                        <item.icon className="w-10 h-10 text-white" />
                      </div>
                      <div
                        className={`text-sm ${colors.text} font-bold tracking-wider uppercase`}>
                        BƯỚC {item.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed max-w-[250px] md:mx-auto">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-20 px-6 bg-gray-50"
        ref={projectsRef}>
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
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <motion.div
                key={num}
                className="group relative overflow-hidden rounded-xl cursor-pointer aspect-[16/9]"
                variants={staggerItem}>
                <ImageWithFallback
                  src={IMAGES[`project${num}` as keyof typeof IMAGES]}
                  alt={
                    IMAGE_ALT_TEXTS[
                    `project${num}` as keyof typeof IMAGE_ALT_TEXTS
                    ]
                  }
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-xl font-semibold mb-2">Dự án {num}</h3>
                    <p className="text-sm text-gray-200">
                      Mô tả ngắn về dự án {num}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" className="py-20 px-6" ref={clientsRef}>
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate={clientsVisible ? "visible" : "hidden"}
            variants={fadeInUp}>
            <h2 className="text-4xl text-gray-900 mb-4">
              Khách hàng & đối tác
            </h2>
            <p className="text-xl text-gray-600">
              Được tin tưởng bởi các doanh nghiệp hàng đầu
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 mb-16"
            initial="hidden"
            animate={clientsVisible ? "visible" : "hidden"}
            variants={staggerContainer}>
            {[
              {
                name: "Nguyễn Lan",
                role: "CEO, VietCommerce",
                text: "Nextchain đã giúp chúng tôi xây dựng nền tảng thương mại điện tử vượt cả mong đợi.",
              },
              {
                name: "Trần Minh",
                role: "Giám đốc, FintechVN",
                text: "Sản phẩm được thiết kế rất đẹp mắt và dễ sử dụng. Doanh số tăng 200% sau 3 tháng.",
              },
              {
                name: "Phạm Hương",
                role: "COO, SmartHR Solutions",
                text: "Đội ngũ Nextchain không chỉ giỏi kỹ thuật mà còn hiểu nhu cầu kinh doanh.",
              },
            ].map((client, idx) => (
              <motion.div
                key={idx}
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
                  "{client.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-white font-semibold">
                    {client.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {client.name}
                    </div>
                    <div className="text-sm text-gray-600">{client.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6 bg-gray-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-3xl"></div>

        <div className="max-w-[1000px] mx-auto relative z-10">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl text-gray-900 mb-6 leading-tight">
                Bắt đầu website giúp bạn
                <br />
                <span className="text-orange-600 font-semibold">
                  thu hút khách hàng
                </span>{" "}
                ngay hôm nay
              </h2>
              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <Button
                  size="lg"
                  className="bg-orange-600 text-white hover:bg-orange-500 transition-all px-10 py-6 text-lg font-semibold rounded-xl"
                  onClick={() => setIsModalOpen(true)}>
                  Nhận tư vấn miễn phí
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="w-[98px] h-[56px] mx-auto mb-6">
            <FooterLogo />
          </div>
          <p className="text-gray-400">
            © 2026 Nextchain Tech. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[95vh] overflow-y-auto p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Nhận tư vấn miễn phí</h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                placeholder="Họ và tên"
                required
                className="w-full p-3 border rounded-xl"
                onChange={handleInputChange}
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                className="w-full p-3 border rounded-xl"
                onChange={handleInputChange}
              />
              <input
                name="phone"
                placeholder="Số điện thoại"
                required
                className="w-full p-3 border rounded-xl"
                onChange={handleInputChange}
              />
              <textarea
                name="message"
                placeholder="Nội dung tư vấn"
                className="w-full p-3 border rounded-xl"
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="w-full py-3 bg-orange-600 text-white rounded-xl font-bold">
                Gửi yêu cầu
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
