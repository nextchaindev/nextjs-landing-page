import { notFound } from "next/navigation"

// Đường dẫn không tồn tại dưới tiền tố ngôn ngữ → trang 404 của ngôn ngữ đó (xem not-found.tsx cùng cấp),
// thay vì global-not-found tiếng Việt.
export default function CatchAll() {
  notFound()
}
