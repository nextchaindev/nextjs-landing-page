import type { Locale } from "../config"
import { vi, type Dictionary } from "./vi"
import { ko } from "./ko"

const DICTIONARIES: Record<Locale, Dictionary> = { vi, ko }

/** Dùng trong Server Component. Client Component dùng `useDictionary()`. */
export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale]
}

export type { Dictionary }
