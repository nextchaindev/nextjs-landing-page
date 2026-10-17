"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { Locale } from "./config"
import type { Dictionary } from "./dictionaries"

interface LocaleContextValue {
  locale: Locale
  dictionary: Dictionary
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined)

export function LocaleProvider({
  locale,
  dictionary,
  children,
}: LocaleContextValue & { children: ReactNode }) {
  return <LocaleContext.Provider value={{ locale, dictionary }}>{children}</LocaleContext.Provider>
}

function useLocaleContext() {
  const context = useContext(LocaleContext)
  if (context === undefined) {
    throw new Error("useLocale/useDictionary must be used within a LocaleProvider")
  }
  return context
}

export function useLocale() {
  return useLocaleContext().locale
}

export function useDictionary() {
  return useLocaleContext().dictionary
}
