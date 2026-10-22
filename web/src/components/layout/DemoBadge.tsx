import { Link } from 'react-router-dom'
import { useLanguage } from '@/i18n/LanguageContext'

/** Indicador discreto de que la web es un mockup de demostración. */
export function DemoBadge() {
  const { t } = useLanguage()

  return (
    <Link
      to="/demo"
      className="fixed top-24 right-4 z-40 flex items-center gap-1.5 rounded-full border border-line bg-paper/90 px-3 py-1.5 text-[0.65rem] tracking-widest text-ink-soft uppercase shadow-sm backdrop-blur transition-colors hover:border-accent hover:text-accent sm:top-28 sm:right-6"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
      {t.demo.badge}
    </Link>
  )
}
