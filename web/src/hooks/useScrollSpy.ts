import { useEffect, useState } from 'react'

/**
 * Devuelve el id de la sección actualmente más visible, para resaltar la
 * categoría activa en la navegación fija de la carta.
 */
export function useScrollSpy(ids: string[], offset = 140) {
  const [activeId, setActiveId] = useState(ids[0] ?? '')

  useEffect(() => {
    function onScroll() {
      let current = ids[0] ?? ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top - offset <= 0) {
          current = id
        }
      }
      setActiveId(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids, offset])

  return activeId
}
