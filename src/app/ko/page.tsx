import type { Metadata } from "next"

// Placeholder: chưa công khai cho tới khi các trang tiếng Hàn hoàn thiện (xem issue #20).
export const metadata: Metadata = {
  title: "준비 중",
  robots: { index: false, follow: false },
}

export default function KoHomePage() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 pt-28 pb-20">
      <div className="max-w-[640px] text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">한국어 페이지 준비 중입니다</h1>
        <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed break-keep">
          넥스트체인 한국어 사이트를 준비하고 있습니다. 곧 찾아뵙겠습니다.
        </p>
      </div>
    </section>
  )
}
