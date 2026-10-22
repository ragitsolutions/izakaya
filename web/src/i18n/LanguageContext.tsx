import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { Bilingual, Locale } from '@/types/common'
import en from './translations/en'
import es from './translations/es'
import type { Dictionary } from './translations/types'

const dictionaries: Record<Locale, Dictionary> = { es, en }

const STORAGE_KEY = 'izakaya:lang'
const SUPPORTED: Locale[] = ['es', 'en']

function detectInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'es'
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored && SUPPORTED.includes(stored as Locale)) return stored as Locale
  } catch {
    // localStorage no disponible (modo privado, etc.) — seguimos con el idioma por defecto.
  }
  const browserLang = window.navigator.language?.slice(0, 2)
  if (browserLang === 'en') return 'en'
  return 'es'
}

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
  t: Dictionary
  /** Elige el texto en el idioma activo de un objeto bilingüe { es, en }. */
  pick: (value: Bilingual) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => detectInitialLocale())

  useEffect(() => {
    document.documentElement.lang = locale
    try {
      window.localStorage.setItem(STORAGE_KEY, locale)
    } catch {
      // Ignorado: preferencia de idioma no persistida si localStorage no está disponible.
    }
  }, [locale])

  const setLocale = useCallback((next: Locale) => setLocaleState(next), [])
  const toggleLocale = useCallback(
    () => setLocaleState((prev) => (prev === 'es' ? 'en' : 'es')),
    [],
  )

  const value = useMemo<LanguageContextValue>(() => {
    const t = dictionaries[locale]
    return {
      locale,
      setLocale,
      toggleLocale,
      t,
      pick: (value: Bilingual) => value[locale],
    }
  }, [locale, setLocale, toggleLocale])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage debe usarse dentro de <LanguageProvider>')
  return ctx
}
