import type { ReactNode } from 'react'
import { Container } from './Container'

export function Section({
  children,
  className = '',
  containerClassName = '',
  tone = 'default',
}: {
  children: ReactNode
  className?: string
  containerClassName?: string
  tone?: 'default' | 'soft'
}) {
  return (
    <section className={`py-20 sm:py-28 ${tone === 'soft' ? 'bg-paper-soft' : ''} ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}
