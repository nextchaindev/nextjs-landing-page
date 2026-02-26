"use client"

import { useModal } from "@/context/ModalContext"
import FooterLogo from "@/imports/Logo-8-285"
import { Globe, Mail, Phone } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  const { setKeyService } = useModal()
  return (
    <footer className="bg-[#111827] text-white pt-20 pb-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="w-[120px] mb-6">
              <FooterLogo />
            </div>
            <p className="text-[#99A1AF] leading-relaxed mb-6">
              Đối tác thiết kế & công nghệ tin cậy cho doanh nghiệp Việt Nam
            </p>
            {/* <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Phone className="w-5 h-5" />
              </a>
            </div> */}
          </div>

          <div>
            <h4 className="text-lg font-medium mb-6">Dịch vụ</h4>
            <ul className="space-y-4 text-[#99A1AF]">
              <li onClick={() => setKeyService("landing")}>
                <Link
                  href="/#services"
                  className="hover:text-primary transition-colors">
                  Landing Page
                </Link>
              </li>
              <li onClick={() => setKeyService("corporate")}>
                <Link
                  href="/#services"
                  className="hover:text-primary transition-colors">
                  Website Doanh nghiệp
                </Link>
              </li>
              <li onClick={() => setKeyService("ecommerce")}>
                <Link
                  href="/#services"
                  className="hover:text-primary transition-colors">
                  Website Bán hàng
                </Link>
              </li>
              <li onClick={() => setKeyService("custom")}>
                <Link
                  href="/#services"
                  className="hover:text-primary transition-colors">
                  Thiết kế theo yêu cầu
                </Link>
              </li>
              <li onClick={() => setKeyService("marketing")}>
                <Link
                  href="/#services"
                  className="hover:text-primary transition-colors">
                  Marketing & SEO
                </Link>
              </li>
              <li onClick={() => setKeyService("software")}>
                <Link
                  href="/#services"
                  className="hover:text-primary transition-colors">
                  Phát triển phần mềm
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-6">Liên hệ</h4>
            <ul className="space-y-4 text-[#99A1AF]">
              <li>
                <span>Email: contact@nextchain.kr</span>
              </li>
              <li>
                <span>Điện thoại: +84-909-807-687</span>
              </li>
              <li>
                <span>Địa chỉ: Hồ Chí Minh, Việt Nam</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1E2939] flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#6A7282] text-sm">
            © {new Date().getFullYear()} Nextchain Tech. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a
              href="#"
              className="text-[#99A1AF] text-sm hover:text-white transition-colors">
              Chính sách bảo mật
            </a>
            <a
              href="#"
              className="text-[#99A1AF] text-sm hover:text-white transition-colors">
              Điều khoản sử dụng
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
