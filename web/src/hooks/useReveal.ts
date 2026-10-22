import { useEffect, useRef, useState } from 'react'

/**
 * Detecta cuándo un elemento entra en el viewport para disparar una animación
 * de aparición suave (una sola vez). Usa IntersectionObserver; si el navegador
 * no lo soporta, el contenido se muestra directamente sin animar.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}
