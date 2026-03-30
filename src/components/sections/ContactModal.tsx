"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle2, Loader2, Mail, Phone, User, X } from "lucide-react"
import { useModal } from "@/context/ModalContext"
import ReCAPTCHA from "react-google-recaptcha"

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


  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)

  // Only manage body scroll lock — the effect's sole external-system concern.
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isModalOpen])

  // Handles close: reset widget + clear token state (event handler, not effect).
  // grecaptcha.reset() does NOT fire onChange(null) per the Google reCAPTCHA API
  // docs (https://developers.google.com/recaptcha/docs/display#js_api), so we
  // must clear the token manually here alongside the visual widget reset.
  const handleCloseModal = () => {
    recaptchaRef.current?.reset()
    setRecaptchaToken(null)
    closeModal()
  }

  const onFormSubmit = (e: React.FormEvent) => {
    handleSubmit(e, recaptchaToken)
  }

  if (!isModalOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-y-auto animate-in zoom-in-95 duration-300">
        {/* Modal Header */}
        <div className="relative bg-gradient-to-br from-blue-600 to-blue-400 p-6 md:p-8 rounded-t-2xl">
          <button
            onClick={handleCloseModal}
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
        <form
          onSubmit={onFormSubmit}
          className="pl-4 pr-2 md:pl-8 md:pr-8 py-8 ">
          <div className="w-full max-h-[350px] md:max-h-[calc(100dvh-350px)] space-y-4 md:space-y-6 overflow-y-auto">
            <div className="space-y-4 md:space-y-6 pr-2">
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
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Tư vấn miễn phí 100%</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Bảo mật thông tin tuyệt đối</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Phản hồi trong 24h</span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            {/* reCAPTCHA v2 Checkbox */}
              <div className="flex justify-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                  onChange={(token) => setRecaptchaToken(token)}
                  onExpired={() => setRecaptchaToken(null)}
                  hl="vi"
                />
              </div>

            <button
              type="submit"
              disabled={loadingSubmit}
              className="flex-1 flex flex-row items-center gap-1 justify-center px-6 py-2.5 md:py-3 bg-linear-to-r from-orange-600 to-orange-400 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100">
              <span>Gửi yêu cầu</span>
              {loadingSubmit && <Loader2 className="w-4 h-4 animate-spin" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
