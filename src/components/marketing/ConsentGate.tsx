"use client"

import { useEffect, useState, type ReactNode } from "react"
import Link from "next/link"
import { Cookie } from "lucide-react"

type ConsentChoice = "granted" | "denied"

const STORAGE_KEY = "nextchain-consent"
const EXPIRY_MS = 365 * 24 * 60 * 60 * 1000

function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { value?: ConsentChoice; expiresAt?: number }
    if (parsed.value !== "granted" && parsed.value !== "denied") return null
    if (!parsed.expiresAt || parsed.expiresAt < Date.now()) {
      window.localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return parsed.value
  } catch {
    return null
  }
}

/**
 * Chỉ nạp GA/GTM/Clarity sau khi người dùng chọn trên banner cookie
 * (opt-in). Chưa chọn = không tải script phân tích nào.
 */
export default function ConsentGate({ children }: { children: ReactNode }) {
  const [choice, setChoice] = useState<ConsentChoice | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setChoice(readConsent())
    setReady(true)
  }, [])

  const decide = (value: ConsentChoice) => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ value, expiresAt: Date.now() + EXPIRY_MS }),
      )
    } catch {
      // Lưu không được (privacy mode) — chỉ áp dụng cho phiên này.
    }
    setChoice(value)
  }

  return (
    <>
      {ready && choice === "granted" ? children : null}
      {ready && choice === null && (
        <div
          role="dialog"
          aria-label="Cookie phân tích"
          className="fixed inset-x-3 bottom-3 z-40 mx-auto flex max-w-3xl flex-col items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl sm:flex-row sm:items-center">
          <Cookie className="hidden w-6 h-6 shrink-0 text-primary sm:block" />
          <p className="text-sm leading-relaxed text-gray-700">
            Chúng tôi dùng cookie phân tích (Google Analytics, Microsoft Clarity)
            để đo lường và cải thiện website. Chi tiết tại{" "}
            <Link href="/chinh-sach-bao-mat" className="text-primary underline">
              chính sách bảo mật
            </Link>
            .
          </p>
          <div className="flex w-full shrink-0 gap-2 sm:w-auto">
            <button
              onClick={() => decide("denied")}
              className="flex-1 rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-gray-400 sm:flex-none">
              Từ chối
            </button>
            <button
              onClick={() => decide("granted")}
              className="flex-1 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 sm:flex-none">
              Chấp nhận
            </button>
          </div>
        </div>
      )}
    </>
  )
}
