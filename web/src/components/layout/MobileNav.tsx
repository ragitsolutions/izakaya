import { NavLink } from 'react-router-dom'
import { useLanguage } from '@/i18n/LanguageContext'
import { Button } from '@/components/ui/Button'
import { LanguageSwitch } from './LanguageSwitch'

interface NavLinkItem {
  to: string
  label: string
  end?: boolean
}

export function MobileNav({
  isOpen,
  onClose,
  links,
}: {
  isOpen: boolean
  onClose: () => void
  links: NavLinkItem[]
}) {
  const { t } = useLanguage()

  return (
    <div
      className={`fixed inset-0 z-[60] lg:hidden ${isOpen ? '' : 'pointer-events-none'}`}
      aria-hidden={!isOpen}
    >
      <div
        className={`absolute inset-0 bg-ink/40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      <div
        className={`absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-paper px-8 py-6 shadow-xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú"
            className="flex h-10 w-10 items-center justify-center text-ink"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        <nav className="mt-6 flex flex-col gap-1" aria-label="Principal">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={onClose}
              className={({ isActive }) =>
                `border-b border-line-soft py-4 font-display text-xl ${
                  isActive ? 'text-accent' : 'text-ink'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-8 flex flex-col gap-3">
          <Button to="/reservas" onClick={onClose} className="w-full">
            {t.cta.reserve}
          </Button>
          <Button to="/admin" variant="outline" onClick={onClose} className="w-full">
            {t.nav.admin}
          </Button>
          <LanguageSwitch className="mt-2 justify-center" />
        </div>
      </div>
    </div>
  )
}
