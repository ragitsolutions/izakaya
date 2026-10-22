import type { ReactNode } from 'react'

const common = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.3,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const paths: Record<string, ReactNode> = {
  gluten: (
    <>
      <path d="M11 2v18" />
      <path d="M11 5.5l-3-2M11 5.5l3-2" />
      <path d="M11 9.5l-3-2M11 9.5l3-2" />
      <path d="M11 13.5l-3-2M11 13.5l3-2" />
      <path d="M11 17.5l-3-2M11 17.5l3-2" />
    </>
  ),
  crustaceans: (
    <>
      <path d="M5 16c0-6 3-11 9-12 2 0 3 1 3 3 0 2-2 3-2 6 0 2 1 3 3 4" />
      <path d="M7 13.5l-2 .7M7.5 16.5l-2 .3M9 18.5l-1.5 1" />
    </>
  ),
  eggs: <ellipse cx="11" cy="12" rx="5.5" ry="7.5" />,
  fish: (
    <>
      <path d="M3 12c3.3-4.3 8-6 12.5-4 0 2.7 0 5.3 0 8-4.5 2-9.2.3-12.5-4Z" />
      <path d="M15.5 10l3.5-2.5M15.5 14l3.5 2.5" />
      <circle cx="6.5" cy="10.6" r="0.7" fill="currentColor" stroke="none" />
    </>
  ),
  peanuts: (
    <>
      <circle cx="8.5" cy="8" r="4" />
      <circle cx="13" cy="14.5" r="4.7" />
    </>
  ),
  soy: (
    <>
      <path d="M8 3.5c-2 2-2 13 0 16" />
      <path d="M14 3.5c2 2 2 13 0 16" />
      <circle cx="11" cy="8" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="11" cy="12" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="11" cy="16" r="1.3" fill="currentColor" stroke="none" />
    </>
  ),
  milk: (
    <path d="M9 2h4v3.2c1.2 1.1 2 2.4 2 4.1V18a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9.3c0-1.7.8-3 2-4.1V2Z" />
  ),
  nuts: (
    <>
      <circle cx="11" cy="12" r="7" />
      <path d="M11 5v14M8 8.3c1 1 1 2 0 3M14 8.3c-1 1-1 2 0 3M8 13.7c1 1 1 2 0 3M14 13.7c-1 1-1 2 0 3" />
    </>
  ),
  celery: (
    <>
      <path d="M11 20V8" />
      <path d="M8 20c0-5 1-9 3-12M14 20c0-5-1-9-3-12" />
      <path d="M11 3.5c-1.2-1.4-3.2-1.2-3.2.3 1.6 1.3 3.2.9 3.2.9s.1-.1.2-.2c.6-.5.9-1 0-1Z" fill="currentColor" stroke="none" />
    </>
  ),
  mustard: (
    <>
      <path d="M8 9.5h6V18a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V9.5Z" />
      <path d="M9.2 9.5V6.5h3.6v3" />
      <circle cx="9.3" cy="4" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="11" cy="3" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="12.7" cy="4" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  sesame: (
    <>
      <ellipse cx="7.2" cy="9" rx="1.6" ry="1" transform="rotate(-25 7.2 9)" fill="currentColor" stroke="none" />
      <ellipse cx="12.5" cy="6.5" rx="1.6" ry="1" transform="rotate(10 12.5 6.5)" fill="currentColor" stroke="none" />
      <ellipse cx="15.5" cy="11.5" rx="1.6" ry="1" transform="rotate(-15 15.5 11.5)" fill="currentColor" stroke="none" />
      <ellipse cx="8.5" cy="14.5" rx="1.6" ry="1" transform="rotate(25 8.5 14.5)" fill="currentColor" stroke="none" />
      <ellipse cx="13.5" cy="16.5" rx="1.6" ry="1" transform="rotate(-5 13.5 16.5)" fill="currentColor" stroke="none" />
    </>
  ),
  sulphites: (
    <>
      <path d="M7 3h8l-1 6.2a4 4 0 0 1-6 0L7 3Z" />
      <path d="M11 13v6M8 19h6" />
    </>
  ),
  lupin: (
    <>
      <path d="M11 20v-9" />
      <circle cx="11" cy="8.3" r="1.3" />
      <circle cx="8.8" cy="10.2" r="1.3" />
      <circle cx="13.2" cy="10.2" r="1.3" />
      <circle cx="11" cy="12.3" r="1.3" />
    </>
  ),
  molluscs: (
    <>
      <path d="M11 17.5c-4.5 0-6.3-3.6-4.6-7.2C7.4 7.6 10 6.6 12 8.3c1.8 1.6 1 4.3-1 5.1-1.4.6-2.6-.4-2.3-1.8.2-.9 1-1.3 1.7-1" />
      <path d="M4.5 17.5h13" />
    </>
  ),
}

export function AllergenIcon({ id, className = '' }: { id: string; className?: string }) {
  const content = paths[id]
  if (!content) return null

  return (
    <svg viewBox="0 0 22 22" className={className} aria-hidden="true" {...common}>
      {content}
    </svg>
  )
}
