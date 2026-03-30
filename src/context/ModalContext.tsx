"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import { toast } from "sonner"

interface FormData {
  name: string
  email: string
  phone: string
  message: string
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  handleSubmit: (e: React.FormEvent, recaptchaToken: string | null) => Promise<void>
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
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [keyService, setKeyService] = useState<string>("landing")
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  )


  const openModal = (data?: Partial<FormData>) => {
    if (data) {
      setFormData((prev) => ({ ...prev, ...data }))
    }
    setIsModalOpen(true)
  }

  const openModalClean = () => {
    setFormData(initialFormData)
    setErrors({})
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
        if (!value.trim()) return "Vui lòng nhập email"
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Email không hợp lệ"
        return ""
      case "phone":
        if (!value.trim()) return "Vui lòng nhập số điện thoại"
        if (!/^(0|\+84)[3|5|7|8|9][0-9]{8}$/.test(value.replace(/\s/g, "")))
          return "Số điện thoại không hợp lệ"
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
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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

  const handleSubmit = async (e: React.FormEvent, recaptchaToken: string | null) => {
    e.preventDefault()
    if (!validate()) return

    if (!recaptchaToken) {
      toast.error("Vui lòng xác nhận bạn không phải robot.")
      return
    }

    try {
      setLoadingSubmit(true)

      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      })

      if (response.ok) {
        // Send GA Event
        if (typeof window !== "undefined" && "gtag" in window) {
          ;(window as Window & typeof globalThis & { gtag: (...args: unknown[]) => void }).gtag("event", "generate_lead", {
            event_category: "form",
            event_label: "consultation_request",
          })
        }
        // router.push("/success")
        window.location.href = "/success"
        // setIsModalOpen(false)
        setFormData(initialFormData)
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
