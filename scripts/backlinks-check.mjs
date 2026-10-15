// Kiểm tra từng backlink đã "Live" trong growth/backlinks.csv:
// trang nguồn còn sống, còn link về nextchain.site, thuộc tính rel, có bị noindex không.
//   npm run backlinks:check
import { readFileSync } from "node:fs"

const rows = readFileSync(new URL("../growth/backlinks.csv", import.meta.url), "utf8").trim().split(/\r?\n/)
const header = rows.shift().split(",")
const parse = (line) => {
  const cells = []
  let cur = ""
  let quoted = false
  for (const ch of line) {
    if (ch === '"') quoted = !quoted
    else if (ch === "," && !quoted) {
      cells.push(cur)
      cur = ""
    } else cur += ch
  }
  cells.push(cur)
  return Object.fromEntries(header.map((h, i) => [h, cells[i] ?? ""]))
}

const live = rows.map(parse).filter((row) => row.live_url)
if (live.length === 0) console.log("Chưa có backlink nào có live_url.")

for (const row of live) {
  try {
    const res = await fetch(row.live_url, { signal: AbortSignal.timeout(20000), headers: { "User-Agent": "Mozilla/5.0 backlink-check" } })
    const html = await res.text()
    const anchors = [...html.matchAll(/<a\b[^>]*href="([^"]*nextchain\.site[^"]*)"[^>]*>/gi)].map((m) => ({
      href: m[1],
      rel: m[0].match(/rel="([^"]*)"/i)?.[1] ?? "(follow)",
    }))
    const noindex = /<meta[^>]+name="robots"[^>]+noindex/i.test(html) || /noindex/i.test(res.headers.get("x-robots-tag") ?? "")
    const status = res.status !== 200 ? `HTTP ${res.status}` : anchors.length === 0 ? "MẤT LINK" : "OK"
    console.log(`${status.padEnd(9)} ${row.source}`)
    for (const a of anchors) console.log(`          → ${a.href} [${a.rel}]`)
    if (noindex) console.log("          ⚠ trang nguồn đang noindex")
  } catch (error) {
    console.log(`LỖI      ${row.source}: ${error.message}`)
  }
}
