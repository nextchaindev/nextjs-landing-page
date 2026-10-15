"use client"

import React, { createContext, useContext, useEffect, useState, useRef, ReactNode } from "react"
import { toast } from "sonner"
import { trackEvent } from "@/lib/analytics"
import { captureAttribution, readAttribution } from "@/lib/attribution"

interface FormData {
  name: string
  email: string
  phone: string
  message: string
  industry: string
  websiteType: string
}

interface ModalContextType {
  isModalOpen: boolean
  setIsModalOpen: (isOpen: boolean) => void
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
  loadingSubmit: boolean
  openModal: (data?: Partial<FormData>) => void
  openModalClean: () => void
  closeModal: () => void
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void
  handleSubmit: (e: React.FormEvent, recaptchaToken: string | null, honeypot: string) => Promise<void>
  /** Bắn event form_start một lần mỗi phiên khi người dùng focus vào form. */
  notifyFormStart: () => void
  keyService: string
  setKeyService: React.Dispatch<React.SetStateAction<string>>
  errors: Partial<Record<keyof FormData, string>>
  clearErrors: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
  industry: "",
  websiteType: "",
}

/** client_id của GA4 lấy từ cookie _ga (GA1.1.<id>.<ts>) để gửi trạng thái lead về GA4 sau này. */
function readGaClientId() {
  const match = document.cookie.match(/(?:^|; )_ga=GA\d\.\d\.(\d+\.\d+)/)
  return match?.[1]
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [keyService, setKeyService] = useState<string>("corporate")
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  )
  const formStartFired = useRef(false)

  const notifyFormStart = () => {
    if (formStartFired.current) return
    formStartFired.current = true
    trackEvent("form_start", { form_id: "consultation_modal" })
  }


  useEffect(() => {
    captureAttribution()
  }, [])

  const openModal = (data?: Partial<FormData>) => {
    if (data) {
      setFormData((prev) => ({ ...prev, ...data }))
    }
    trackEvent("contact_modal_open", { page_path: window.location.pathname })
    setIsModalOpen(true)
  }

  const openModalClean = () => {
    setFormData(initialFormData)
    setErrors({})
    trackEvent("contact_modal_open", { page_path: window.location.pathname })
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setErrors({})
  }

  const clearErrors = () => setErrors({})

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "name":
        return !value.trim() ? "Vui lòng nhập họ và tên" : ""
      case "email":
        if (value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
          return "Email không hợp lệ"
        return ""
      case "phone":
        if (!value.trim()) return "Vui lòng nhập số điện thoại"
        if (!/^(0|\+84)[35789][0-9]{8}$/.test(value.replace(/\s/g, "")))
          return "Số điện thoại chưa đúng, ví dụ: 0901234567"
        return ""
      default:
        return ""
    }
  }

  const validate = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    const nameError = validateField("name", formData.name)
    if (nameError) newErrors.name = nameError

    const emailError = validateField("email", formData.email)
    if (emailError) newErrors.email = emailError

    const phoneError = validateField("phone", formData.phone)
    if (phoneError) newErrors.phone = phoneError

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) {
      trackEvent("form_error", { fields: Object.keys(newErrors).join(",") })
    }
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Real-time validation
    const error = validateField(name, value)
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }))
  }

  const handleSubmit = async (e: React.FormEvent, recaptchaToken: string | null, honeypot: string) => {
    e.preventDefault()
    if (!validate()) return

    if (!recaptchaToken) {
      toast.error("Vui lòng xác nhận bạn không phải robot.")
      return
    }

    trackEvent("form_submit", { form_id: "consultation_modal" })

    try {
      setLoadingSubmit(true)

      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          verify_sum: honeypot,
          recaptchaToken,
          attribution: { ...readAttribution(), ga_client_id: readGaClientId() },
        }),
      })

      // Chỉ server biết lead thật hay honeypot. `verified: false` (bot đi qua
      // UI) vẫn báo thành công để giữ ẩn bộ lọc, nhưng không tính conversion —
      // số liệu Ads/GA4 lấy chuẩn từ lead đã lưu vào Supabase.
      const result = (await response.json().catch(() => null)) as
        | { success?: boolean; verified?: boolean }
        | null

      if (response.ok && result?.success) {
        if (result.verified) {
          trackEvent("generate_lead", {
            form_id: "consultation_modal",
            currency: "VND",
            ...(formData.industry && { lead_industry: formData.industry }),
            ...(formData.websiteType && { lead_website_type: formData.websiteType }),
          })
          // Google Ads conversion — bật bằng NEXT_PUBLIC_GAW_ID và
          // NEXT_PUBLIC_GAW_LABEL (định dạng AW-XXXXXXXXX/nhãn-conversion).
          const gawId = process.env.NEXT_PUBLIC_GAW_ID
          const gawLabel = process.env.NEXT_PUBLIC_GAW_LABEL
          if (gawId && gawLabel) {
            // Enhanced Conversions for leads: gtag tự băm SHA-256 trước khi gửi.
            const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag
            const phone = formData.phone.replace(/\s/g, "").replace(/^0/, "+84")
            gtag?.("set", "user_data", {
              phone_number: phone,
              ...(formData.email.trim() && { email: formData.email.trim().toLowerCase() }),
            })
            // Không gửi value/currency: tài khoản Ads dùng KRW, giá trị lấy từ cài đặt conversion.
            trackEvent("conversion", { send_to: `${gawId}/${gawLabel}` })
          }
        }
        // router.push("/success")
        window.location.href = "/success"
        // setIsModalOpen(false)
        setFormData(initialFormData)
      } else if (response.status === 429) {
        toast.error("Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau 10 phút.")
      } else {
        toast.error("Có lỗi xảy ra, vui lòng thử lại.")
      }
    } catch {
      toast.error("Có lỗi xảy ra, vui lòng kết nối mạng và thử lại.")
    } finally {
      setLoadingSubmit(false)
    }
  }

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        formData,
        setFormData,
        loadingSubmit,
        openModal,
        openModalClean,
        closeModal,
        handleInputChange,
        handleSubmit,
        notifyFormStart,
        keyService,
        setKeyService,
        errors,
        clearErrors,
      }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider")
  }
  return context
}
