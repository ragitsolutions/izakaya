import { useEffect } from 'react'

/** Inserta (o actualiza) un bloque JSON-LD único en <head> con datos structured de schema.org. */
export function useStructuredData(data: Record<string, unknown>) {
  const json = JSON.stringify(data)

  useEffect(() => {
    let el = document.head.querySelector<HTMLScriptElement>('script[data-structured-data]')
    if (!el) {
      el = document.createElement('script')
      el.type = 'application/ld+json'
      el.setAttribute('data-structured-data', 'true')
      document.head.appendChild(el)
    }
    el.textContent = json
  }, [json])
}
