"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle2, Loader2, Mail, Phone, User, X } from "lucide-react"
import { useModal } from "@/context/ModalContext"
import ReCAPTCHA from "react-google-recaptcha"
import { LEAD_INDUSTRIES, LEAD_WEBSITE_TYPES } from "@/content/leadOptions"
import { useDictionary } from "@/i18n/LocaleProvider"

/** Tên miền thường gõ sai → gợi ý sửa ngay tại chỗ thay vì mất lead. */
const EMAIL_DOMAIN_TYPOS: Record<string, string> = {
  "gmial.com": "gmail.com",
  "gmai.com": "gmail.com",
  "gmail.co": "gmail.com",
  "gmail.cm": "gmail.com",
  "gmali.com": "gmail.com",
  "hotmial.com": "hotmail.com",
  "hotmai.com": "hotmail.com",
  "hotmail.co": "hotmail.com",
  "yhoo.com": "yahoo.com",
  "yaho.com": "yahoo.com",
  "yahoo.co": "yahoo.com",
  "outlok.com": "outlook.com",
  "icoud.com": "icloud.com",
  "iclod.com": "icloud.com",
}

export default function ContactModal() {
  const {
    isModalOpen,
    closeModal,
    formData,
    setFormData,
    handleInputChange,
    handleSubmit,
    notifyFormStart,
    loadingSubmit,
    errors,
  } = useModal()
  const { form } = useDictionary()

  const emailPart = formData.email.trim().split("@")
  const typoDomain = emailPart.length === 2 ? EMAIL_DOMAIN_TYPOS[emailPart[1].toLowerCase()] : undefined


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

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const trap = new FormData(e.currentTarget).get("verify_sum")
    handleSubmit(e, recaptchaToken, typeof trap === "string" ? trap : "")
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
            aria-label={form.closeAria}>
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {form.title}
          </h3>
          <p className="text-sm md:text-base text-blue-100">
            {form.subtitle}
          </p>
        </div>

        {/* Modal Body */}
        <form
          onSubmit={onFormSubmit}
          onFocusCapture={notifyFormStart}
          className="pl-4 pr-2 md:pl-8 md:pr-8 py-8 ">
          {/* Honeypot: phép tính ẩn khỏi người dùng; bot đọc HTML sẽ điền → lead bị loại.
              Tên/nhãn không giống trường autofill (tên, email, công ty, địa chỉ). */}
          <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="verify_sum">3 + 4 = ?</label>
            <input id="verify_sum" name="verify_sum" type="text" inputMode="numeric" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="w-full max-h-[350px] md:max-h-[calc(100dvh-350px)] space-y-4 md:space-y-6 overflow-y-auto">
            <div className="space-y-4 md:space-y-6 pr-2">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-2">
                  {form.name} <span className="text-red-500">*</span>
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
                    placeholder={form.namePlaceholder}
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
                  {form.email} <span className="font-normal text-gray-500">{form.optional}</span>
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
                    placeholder={form.emailPlaceholder}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500 font-medium">
                    {errors.email}
                  </p>
                )}
                {typoDomain && !errors.email && (
                  <p className="mt-1 text-xs text-gray-600">
                    {form.emailSuggestPrefix}{" "}
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          email: `${emailPart[0]}@${typoDomain}`,
                        }))
                      }
                      className="font-semibold text-blue-600 underline underline-offset-2">
                      {emailPart[0]}@{typoDomain}
                    </button>
                    {form.emailSuggestSuffix}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-700 mb-2">
                  {form.phone} <span className="text-red-500">*</span>
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
                    placeholder={form.phonePlaceholder}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {form.phoneNote}
                </p>
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500 font-medium">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { id: "industry", label: form.industry, options: LEAD_INDUSTRIES, labels: form.industries },
                  { id: "websiteType", label: form.websiteType, options: LEAD_WEBSITE_TYPES, labels: form.websiteTypes },
                ].map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="block text-sm font-semibold text-gray-700 mb-2">
                      {field.label}
                    </label>
                    <select
                      id={field.id}
                      name={field.id}
                      value={formData[field.id as "industry" | "websiteType"]}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 md:py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all">
                      <option value="">{form.selectPlaceholder}</option>
                      {field.options.map((option, idx) => (
                        <option key={option} value={option}>
                          {field.labels[idx] ?? option}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              {form.contactMethods.length > 0 && (
                <div>
                  <label htmlFor="preferredContact" className="block text-sm font-semibold text-gray-700 mb-2">
                    {form.contactMethod}
                  </label>
                  <select
                    id="preferredContact"
                    name="preferredContact"
                    value={formData.preferredContact}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 md:py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all">
                    <option value="">{form.selectPlaceholder}</option>
                    {form.contactMethods.map((method) => (
                      <option key={method.value} value={method.value}>
                        {method.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 mb-2">
                  {form.message}
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 md:py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                    placeholder={form.messagePlaceholder}
                  />
                </div>
              </div>

              {/* Trust Elements */}
              <div className="bg-blue-50 rounded-xl p-3 md:p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{form.trust[0]}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{form.trust[1]}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{form.trust[2]}</span>
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
                  hl={form.recaptchaLang}
                />
              </div>

            <button
              type="submit"
              disabled={loadingSubmit}
              className="flex-1 flex flex-row items-center gap-1 justify-center px-6 py-2.5 md:py-3 bg-linear-to-r from-orange-600 to-orange-400 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100">
              <span>{form.submit}</span>
              {loadingSubmit && <Loader2 className="w-4 h-4 animate-spin" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
