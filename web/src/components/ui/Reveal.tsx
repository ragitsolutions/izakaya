import type { ReactNode, Ref } from 'react'
import { useReveal } from '@/hooks/useReveal'

type RevealTag = 'div' | 'section' | 'article' | 'li' | 'figure' | 'span'

interface RevealProps {
  children: ReactNode
  as?: RevealTag
  className?: string
  /** Retraso en milisegundos, útil para escalonar varios elementos. */
  delay?: number
}

export function Reveal({ children, as: Tag = 'div', className = '', delay = 0 }: RevealProps) {
  const { ref, isVisible } = useReveal<HTMLElement>()
  // El tipo polimórfico de `Tag` hace que TS infiera una intersección imposible
  // para `ref` entre los distintos elementos HTML posibles; se fija a 'div'
  // sólo a efectos de tipado (el tag real en tiempo de ejecución es el pasado en `as`).
  const Component = Tag as 'div'

  return (
    <Component
      ref={ref as Ref<HTMLDivElement>}
      className={`reveal ${isVisible ? 'is-visible' : ''} ${className}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Component>
  )
}
