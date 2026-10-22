import { useLanguage } from '@/i18n/LanguageContext'
import { allergens } from '@/data/allergens.data'
import { AllergenIcon } from './AllergenIcon'

export function AllergenLegend() {
  const { t, pick } = useLanguage()

  return (
    <details className="group border border-line-soft">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm tracking-wide text-ink">
        <span className="flex items-center gap-2">
          <span className="uppercase">{t.menu.legendTitle}</span>
        </span>
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          aria-hidden="true"
          className="shrink-0 text-ink-soft transition-transform duration-200 group-open:rotate-180"
        >
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </summary>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line-soft px-5 py-5 text-sm text-ink-soft sm:grid-cols-3 lg:grid-cols-4">
        {allergens.map((a) => (
          <li key={a.id} className="flex items-center gap-2.5">
            <AllergenIcon id={a.id} className="h-5 w-5 shrink-0 text-ink-soft" />
            <span>{pick(a.name)}</span>
          </li>
        ))}
      </ul>
    </details>
  )
}
