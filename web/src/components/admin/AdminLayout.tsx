import { NavLink, Outlet } from 'react-router-dom'
import { useLanguage } from '@/i18n/LanguageContext'
import { Hanko } from '@/components/ui/Hanko'
import { LanguageSwitch } from '@/components/layout/LanguageSwitch'

export function AdminLayout() {
  const { t } = useLanguage()
  const n = t.admin.nav

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm tracking-wide transition-colors hover:text-accent ${isActive ? 'text-accent' : 'text-ink-soft'}`

  return (
    <div className="min-h-svh bg-paper-soft">
      <header className="border-b border-line bg-paper">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Hanko className="h-6 w-6 text-accent" />
            <span className="font-display text-lg text-ink">Izakaya · Admin</span>
          </div>

          <nav className="hidden items-center gap-6 sm:flex" aria-label="Admin">
            <NavLink to="/admin/reservas" className={linkClasses}>
              {n.reservations}
            </NavLink>
            <NavLink to="/admin/configuracion" className={linkClasses}>
              {n.settings}
            </NavLink>
          </nav>

          <div className="flex items-center gap-4">
            <LanguageSwitch />
            <a href="/" className="text-xs tracking-widest text-ink-soft uppercase hover:text-accent">
              {n.backToSite}
            </a>
          </div>
        </div>

        <nav className="flex items-center gap-6 border-t border-line-soft px-6 py-3 sm:hidden" aria-label="Admin">
          <NavLink to="/admin/reservas" className={linkClasses}>
            {n.reservations}
          </NavLink>
          <NavLink to="/admin/configuracion" className={linkClasses}>
            {n.settings}
          </NavLink>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  )
}
