import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export interface CookieConsent {
  necessary: true
  analytics: boolean
  decidedAt: string
}

const STORAGE_KEY = 'izakaya:cookie-consent'

function readStoredConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as CookieConsent) : null
  } catch {
    return null
  }
}

type ConsentContextValue = [CookieConsent | null, (value: CookieConsent | null) => void]

const CookieConsentContext = createContext<ConsentContextValue | null>(null)

/**
 * Estado del consentimiento de cookies compartido entre el banner (en el
 * layout raíz) y cualquier otro punto de la web que necesite leerlo o
 * reabrirlo (p. ej. el botón "Configurar" de la página de cookies).
 */
export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<CookieConsent | null>(() => readStoredConsent())

  useEffect(() => {
    try {
      if (consent) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
      } else {
        window.localStorage.removeItem(STORAGE_KEY)
      }
    } catch {
      // Ignorado: almacenamiento no disponible.
    }
  }, [consent])

  return (
    <CookieConsentContext.Provider value={[consent, setConsentState]}>
      {children}
    </CookieConsentContext.Provider>
  )
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext)
  if (!ctx) throw new Error('useCookieConsent debe usarse dentro de <CookieConsentProvider>')
  return ctx
}
