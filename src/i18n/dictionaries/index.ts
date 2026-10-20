import type { Locale } from "../config"
import { vi, type Dictionary } from "./vi"
import { ko } from "./ko"
import { en } from "./en"

const DICTIONARIES: Record<Locale, Dictionary> = { vi, ko, en }

/** Dùng trong Server Component. Client Component dùng `useDictionary()`. */
export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale]
}

export type { Dictionary }
