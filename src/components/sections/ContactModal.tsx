"use client"

import { CheckCircle2, Loader2, Mail, Phone, User, X } from "lucide-react"
import { useModal } from "@/context/ModalContext"

export default function ContactModal() {
  const {
    isModalOpen,
    closeModal,
    formData,
    handleInputChange,
    handleSubmit,
    loadingSubmit,
    errors,
  } = useModal()

  if (!isModalOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-y-auto animate-in zoom-in-95 duration-300">
        {/* Modal Header */}
        <div className="relative bg-gradient-to-br from-blue-600 to-blue-400 p-6 md:p-8 rounded-t-2xl">
          <button
            onClick={closeModal}
            className="absolute top-3 right-3 md:top-4 md:right-4 text-white/80 hover:text-white transition-colors"
            aria-label="Đóng">
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Nhận tư vấn miễn phí
          </h3>
          <p className="text-sm md:text-base text-blue-100">
            Hãy để lại thông tin, chúng tôi sẽ liên hệ bạn trong 24h.
          </p>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 ">
          <div className="w-full max-h-[350px]  md:max-h-[610px] space-y-4 md:space-y-6 overflow-y-auto [direction:rtl]">
            <div className="space-y-4 md:space-y-6 [direction:ltr] pl-2">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-2">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User
                    className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.name ? "text-red-400" : "text-gray-400"}`}
                  />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full pl-11 pr-4 py-2.5 md:py-3 border-2 rounded-xl outline-none transition-all ${
                      errors.name
                        ? "border-red-200 focus:border-red-500 focus:ring-red-50"
                        : "border-gray-200 focus:border-blue-600 focus:ring-blue-100"
                    }`}
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500 font-medium">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail
                    className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.email ? "text-red-400" : "text-gray-400"}`}
                  />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-11 pr-4 py-2.5 md:py-3 border-2 rounded-xl outline-none transition-all ${
                      errors.email
                        ? "border-red-200 focus:border-red-500 focus:ring-red-50"
                        : "border-gray-200 focus:border-blue-600 focus:ring-blue-100"
                    }`}
                    placeholder="email@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500 font-medium">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-700 mb-2">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone
                    className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.phone ? "text-red-400" : "text-gray-400"}`}
                  />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full pl-11 pr-4 py-2.5 md:py-3 border-2 rounded-xl outline-none transition-all ${
                      errors.phone
                        ? "border-red-200 focus:border-red-500 focus:ring-red-50"
                        : "border-gray-200 focus:border-blue-600 focus:ring-blue-100"
                    }`}
                    placeholder="0901 234 567"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500 font-medium">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 mb-2">
                  Nội dung cần tư vấn
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 md:py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                    placeholder="Mô tả ngắn gọn về dự án của bạn..."
                  />
                </div>
              </div>

              {/* Trust Elements */}
              <div className="bg-blue-50 rounded-xl p-3 md:p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Tư vấn miễn phí 100%</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Bảo mật thông tin tuyệt đối</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Phản hồi trong 24h</span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 flex flex-row items-center gap-1 justify-center px-6 py-2.5 md:py-3 bg-gradient-to-r from-orange-600 to-orange-400 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
              <span>Gửi yêu cầu</span>
              {loadingSubmit && <Loader2 className="w-4 h-4 animate-spin" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
