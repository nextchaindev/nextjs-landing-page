#!/usr/bin/env node
/**
 * Kiểm tra bản build: trang của ngôn ngữ không phải tiếng Việt (hiện là /ko) không được còn
 * chữ tiếng Việt hay giá VND hiển thị. Chạy sau `next build`:
 *
 *   npm run build && npm run i18n:check
 *
 * Chỉ quét phần hiển thị (title, meta description, text trong body); bỏ qua <script>/<style>.
 */
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs"
import { join } from "node:path"

const BUILD_DIR = join(process.cwd(), ".next/server/app")
const LOCALES = ["ko", "en"]

// Ký tự chỉ có trong tiếng Việt (chữ cái riêng + nguyên âm có dấu thanh).
const VIETNAMESE = /[ăâđêôơưĂÂĐÊÔƠƯàáạảãằắặẳẵầấậẩẫèéẹẻẽềếệểễìíịỉĩòóọỏõồốộổỗờớợởỡùúụủũừứựửữỳýỵỷỹ]/
// Số tiền VND: 249.000đ, 12.000.000 đ, 1.100.000₫
const VND_PRICE = /\d[\d.,]*\s?(?:đ|₫|VND)\b/i

function* htmlFiles(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) yield* htmlFiles(path)
    else if (entry.endsWith(".html")) yield path
  }
}

function visibleText(html) {
  const meta = [...html.matchAll(/<(?:title|meta)[^>]*?(?:content="([^"]*)")?[^>]*>([^<]*)/g)]
    .map((match) => `${match[1] ?? ""} ${match[2] ?? ""}`)
    .join(" ")
  const body = html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
  return `${meta} ${body}`.replace(/&amp;/g, "&").replace(/\s+/g, " ")
}

const files = []
for (const locale of LOCALES) {
  const index = join(BUILD_DIR, `${locale}.html`)
  if (existsSync(index)) files.push(index)
  const dir = join(BUILD_DIR, locale)
  if (existsSync(dir)) files.push(...htmlFiles(dir))
}

if (files.length === 0) {
  console.error("Không tìm thấy trang build của ngôn ngữ nào. Chạy `npm run build` trước.")
  process.exit(2)
}

let failures = 0
for (const file of files) {
  const text = visibleText(readFileSync(file, "utf8"))
  const problems = []
  const vn = text.match(new RegExp(`.{0,30}${VIETNAMESE.source}.{0,30}`, "g"))
  if (vn) problems.push(...vn.slice(0, 5).map((snippet) => `tiếng Việt: …${snippet}…`))
  const vnd = text.match(new RegExp(`.{0,20}${VND_PRICE.source}`, "gi"))
  if (vnd) problems.push(...vnd.slice(0, 5).map((snippet) => `giá VND: …${snippet}…`))

  const label = file.replace(`${BUILD_DIR}/`, "")
  if (problems.length > 0) {
    failures++
    console.error(`✗ ${label}`)
    for (const problem of problems) console.error(`    ${problem}`)
  } else {
    console.log(`✓ ${label}`)
  }
}

if (failures > 0) {
  console.error(`\n${failures}/${files.length} trang còn nội dung tiếng Việt.`)
  process.exit(1)
}
console.log(`\nOK: ${files.length} trang sạch.`)
