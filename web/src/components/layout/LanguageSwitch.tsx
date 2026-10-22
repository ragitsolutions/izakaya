import { useLanguage } from '@/i18n/LanguageContext'

export function LanguageSwitch({ className = '' }: { className?: string }) {
  const { locale, setLocale } = useLanguage()

  return (
    <div
      className={`inline-flex items-center gap-1 text-xs tracking-widest uppercase ${className}`}
      role="group"
      aria-label="Idioma / Language"
    >
      <button
        type="button"
        onClick={() => setLocale('es')}
        aria-pressed={locale === 'es'}
        className={`px-1.5 py-1 transition-colors ${locale === 'es' ? 'text-accent' : 'text-ink-soft hover:text-ink'}`}
      >
        ES
      </button>
      <span className="text-line" aria-hidden="true">
        /
      </span>
      <button
        type="button"
        onClick={() => setLocale('en')}
        aria-pressed={locale === 'en'}
        className={`px-1.5 py-1 transition-colors ${locale === 'en' ? 'text-accent' : 'text-ink-soft hover:text-ink'}`}
      >
        EN
      </button>
    </div>
  )
}
