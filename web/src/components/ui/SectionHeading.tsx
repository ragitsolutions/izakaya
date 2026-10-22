import type { ReactNode } from 'react'
import { Hanko } from './Hanko'

export function SectionHeading({
  kicker,
  title,
  description,
  align = 'left',
}: {
  kicker?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {kicker && (
        <div
          className={`mb-4 flex items-center gap-2 text-xs tracking-[0.3em] text-accent uppercase ${
            align === 'center' ? 'justify-center' : ''
          }`}
        >
          <Hanko className="h-4 w-4" />
          <span>{kicker}</span>
        </div>
      )}
      <h2 className="text-3xl leading-tight sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-ink-soft leading-relaxed">{description}</p>}
    </div>
  )
}
