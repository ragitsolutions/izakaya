import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useLanguage } from '@/i18n/LanguageContext'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { LanguageSwitch } from './LanguageSwitch'
import { MobileNav } from './MobileNav'

export function Header() {
  const { t } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileOpen])

  const navLinks = [
    { to: '/', label: t.nav.home, end: true },
    { to: '/nosotros', label: t.nav.about },
    { to: '/carta', label: t.nav.menu },
    { to: '/galeria', label: t.nav.gallery },
    { to: '/contacto', label: t.nav.contact },
  ]

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `relative py-1 text-sm tracking-wide transition-colors hover:text-accent ${
      isActive ? 'text-accent' : 'text-ink'
    }`

  return (
    <>
      <a
        href="#contenido"
        className="sr-only-focusable fixed top-2 left-2 z-[60] bg-ink px-4 py-2 text-sm text-paper"
      >
        Saltar al contenido
      </a>
      <header
        className={`sticky top-0 z-50 border-b bg-paper/95 backdrop-blur transition-shadow ${
          isScrolled ? 'border-line shadow-[0_1px_0_0_rgba(0,0,0,0.02)]' : 'border-transparent'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 sm:px-8 lg:px-10">
          <Logo />

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end} className={linkClasses}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <LanguageSwitch />
            <Button to="/reservas" variant="primary" className="text-xs">
              {t.cta.reserve}
            </Button>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-ink lg:hidden"
            onClick={() => setIsMobileOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={isMobileOpen}
          >
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
              <path d="M0 1h22M0 8h22M0 15h22" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </header>

      <MobileNav
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        links={navLinks}
      />
    </>
  )
}
