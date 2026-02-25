"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

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
  handleSubmit: (e: React.FormEvent) => Promise<void>
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
  const router = useRouter()

  const openModal = (data?: Partial<FormData>) => {
    if (data) {
      setFormData((prev) => ({ ...prev, ...data }))
    }
    setIsModalOpen(true)
  }

  const openModalClean = () => {
    setFormData(initialFormData)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoadingSubmit(true)
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        // Send GA Event
        if (typeof window !== "undefined" && (window as any).gtag) {
          ;(window as any).gtag("event", "generate_lead", {
            event_category: "form",
            event_label: "consultation_request",
          })
        }

        toast.success("Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ sớm.")
        setIsModalOpen(false)
        setFormData(initialFormData)
        router.push("/success")
      } else {
        toast.error("Có lỗi xảy ra, vui lòng thử lại.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Có lỗi xảy ra, vui lòng thử lại.")
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
