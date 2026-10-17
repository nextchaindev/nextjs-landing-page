// Kiểm tra SEO kỹ thuật trên một bản đang chạy (local hoặc production).
//   npm run build && npm run start   (cửa sổ khác)
//   npm run seo:check                         → http://localhost:3000
//   SEO_BASE_URL=https://www.nextchain.site npm run seo:check
// Thoát mã 1 nếu có lỗi P0 → dùng làm điều kiện chặn release.

const BASE = (process.env.SEO_BASE_URL || "http://localhost:3000").replace(/\/$/, "")
const errors = []
const warnings = []
const fail = (msg) => errors.push(msg)
const warn = (msg) => warnings.push(msg)

const decode = (s) =>
  s?.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">")

async function get(path, init) {
  return fetch(BASE + path, { redirect: "manual", ...init })
}

const robots = await (await get("/robots.txt")).text()
if (!/Sitemap:\s*https:\/\/www\.nextchain\.site\/sitemap\.xml/.test(robots)) fail("robots.txt thiếu dòng Sitemap")
if (/Disallow:\s*\/\s*$/m.test(robots)) fail("robots.txt đang chặn toàn bộ site")

const sitemapRes = await get("/sitemap.xml")
if (sitemapRes.status !== 200) {
  fail(`/sitemap.xml trả về ${sitemapRes.status}`)
}
const urls = [...(await sitemapRes.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
if (urls.length === 0) fail("sitemap rỗng")

const seenTitles = new Map()
const seenDescs = new Map()
const internalLinks = new Set()
const alternatesByUrl = new Map() // url -> { hreflang: href }

for (const url of urls) {
  const path = url.replace(/^https?:\/\/[^/]+/, "") || "/"
  const res = await get(path)
  if (res.status !== 200) {
    fail(`${path}: HTTP ${res.status} (URL trong sitemap phải trả 200)`)
    continue
  }
  const html = await res.text()
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1])
  const desc = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1])
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1]
  const robotsMeta = html.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? ""
  const xRobots = res.headers.get("x-robots-tag") ?? ""
  const h1 = (html.match(/<h1[\s>]/g) || []).length
  const imgNoAlt = (html.match(/<img(?![^>]*\balt=)[^>]*>/g) || []).length

  // <html lang> phải khớp ngôn ngữ của đường dẫn (/ko/... → ko, /en/... → en, còn lại → vi).
  const htmlLang = html.match(/<html[^>]*\blang="([^"]*)"/)?.[1]
  const expectedLang = ["ko", "en"].find((code) => path === `/${code}` || path.startsWith(`/${code}/`)) ?? "vi"
  if (htmlLang !== expectedLang) fail(`${path}: <html lang="${htmlLang}"> khác ngôn ngữ mong đợi "${expectedLang}"`)

  const alternates = {}
  for (const tag of html.match(/<link[^>]*\brel="alternate"[^>]*>/gi) ?? []) {
    const hreflang = tag.match(/\bhreflang="([^"]+)"/i)?.[1]
    const href = tag.match(/\bhref="([^"]+)"/i)?.[1]
    if (hreflang && href) alternates[hreflang] = decode(href)
  }
  if (Object.keys(alternates).length > 0) alternatesByUrl.set(url, alternates)

  if (/noindex/.test(robotsMeta + xRobots)) fail(`${path}: bị noindex nhưng nằm trong sitemap`)
  if (canonical !== url) fail(`${path}: canonical "${canonical}" khác URL sitemap`)
  if (!title) fail(`${path}: thiếu <title>`)
  else if (title.length > 60) warn(`${path}: title ${title.length} ký tự (>60)`)
  if (!desc) fail(`${path}: thiếu meta description`)
  else if (desc.length > 160 || desc.length < 70) warn(`${path}: description ${desc.length} ký tự (nên 70–160)`)
  if (h1 !== 1) fail(`${path}: có ${h1} thẻ H1`)
  if (imgNoAlt) fail(`${path}: ${imgNoAlt} ảnh thiếu alt`)
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1])
    } catch {
      fail(`${path}: JSON-LD không hợp lệ`)
    }
  }
  for (const m of html.matchAll(/<a[^>]+href="(\/[^"#?]*)/g)) internalLinks.add(m[1] || "/")
  seenTitles.set(title, [...(seenTitles.get(title) ?? []), path])
  seenDescs.set(desc, [...(seenDescs.get(desc) ?? []), path])
}

// hreflang: trang phải tự tham chiếu, có x-default, và các bản dịch phải trỏ ngược lại nhau.
for (const [url, alternates] of alternatesByUrl) {
  const path = url.replace(/^https?:\/\/[^/]+/, "") || "/"
  if (!Object.values(alternates).includes(url)) fail(`${path}: hreflang không tự tham chiếu chính nó`)
  if (!alternates["x-default"]) fail(`${path}: hreflang thiếu x-default`)
  for (const [lang, href] of Object.entries(alternates)) {
    if (lang === "x-default" || href === url) continue
    const back = alternatesByUrl.get(href)
    if (!back) fail(`${path}: hreflang ${lang} → ${href} không nằm trong sitemap hoặc không có hreflang`)
    else if (!Object.values(back).includes(url)) fail(`${path}: hreflang ${lang} → ${href} nhưng trang đó không trỏ ngược lại`)
  }
}

for (const [title, paths] of seenTitles) if (paths.length > 1) fail(`Trùng title "${title}": ${paths.join(", ")}`)
for (const [, paths] of seenDescs) if (paths.length > 1) fail(`Trùng description: ${paths.join(", ")}`)

// Link nội bộ gãy (bỏ qua file tĩnh, API, admin).
for (const link of internalLinks) {
  if (/^\/(api|admin|auth|_next|cdn-cgi)\b|\.\w+$/.test(link)) continue
  const res = await get(link)
  if (res.status >= 400) fail(`Link nội bộ gãy: ${link} → ${res.status}`)
  else if (res.status >= 300) warn(`Link nội bộ đi qua redirect: ${link} → ${res.headers.get("location")}`)
}

// Trang không tồn tại phải trả 404 thật (không phải soft 404).
const missing = await get("/khong-ton-tai-seo-check")
if (missing.status !== 404) fail(`URL không tồn tại trả ${missing.status}, cần 404`)

// Trang cảm ơn không được index.
const success = await (await get("/success")).text()
if (!/<meta name="robots" content="[^"]*noindex/.test(success)) fail("/success thiếu noindex")

console.log(`${alternatesByUrl.size} trang có hreflang`)
console.log(`Đã kiểm tra ${urls.length} URL trong sitemap, ${internalLinks.size} link nội bộ — ${BASE}`)
for (const w of warnings) console.log(`  ⚠ ${w}`)
for (const e of errors) console.log(`  ✗ ${e}`)
if (errors.length) {
  console.log(`\n${errors.length} lỗi P0 — chưa nên release.`)
  process.exit(1)
}
console.log(warnings.length ? "\nKhông có lỗi P0 (còn cảnh báo)." : "\nĐạt toàn bộ.")
