import { Link } from 'react-router-dom'
import { useLanguage } from '@/i18n/LanguageContext'
import { siteConfig } from '@/config/site.config'
import { Hanko } from './Hanko'

/**
 * Logotipo tipográfico del restaurante. No existe un logo definitivo del
 * cliente: este componente centraliza el nombre y es el único sitio a tocar
 * si en el futuro se sustituye por una marca gráfica.
 */
export function Logo({ withTagline = true, className = '' }: { withTagline?: boolean; className?: string }) {
  const { pick } = useLanguage()

  return (
    <Link to="/" className={`group inline-flex items-center gap-3 ${className}`}>
      <Hanko className="h-8 w-8 shrink-0 text-accent transition-transform duration-300 group-hover:scale-105" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-2xl tracking-wide text-ink">{siteConfig.name}</span>
        {withTagline && (
          <span className="mt-1 text-[0.65rem] tracking-[0.25em] text-ink-soft uppercase">
            {pick(siteConfig.tagline)}
          </span>
        )}
      </span>
    </Link>
  )
}
