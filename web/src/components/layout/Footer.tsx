import { Link } from 'react-router-dom'
import { useLanguage } from '@/i18n/LanguageContext'
import { siteConfig } from '@/config/site.config'
import { groupWeeklySchedule, formatDayServices } from '@/lib/hours'
import { settingsService } from '@/services/settingsService'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.8" cy="6.2" r="1.1" fill="currentColor" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M13.8 8.2h1.4V5.7h-1.8c-1.9 0-3 1.1-3 3.1v1.5H8.8v2.5h1.6V18h2.6v-5.2h1.8l.3-2.5h-2.1V9c0-.5.2-.8.8-.8Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function Footer() {
  const { t, locale, pick } = useLanguage()
  const year = new Date().getFullYear()
  const scheduleGroups = groupWeeklySchedule(settingsService.getSchedule(), locale)

  return (
    <footer className="border-t border-line bg-paper-soft">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">{t.footer.description}</p>
          <div className="mt-6 flex items-center gap-4 text-ink-soft">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Instagram"
              className="transition-colors hover:text-accent"
            >
              <InstagramIcon />
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Facebook"
              className="transition-colors hover:text-accent"
            >
              <FacebookIcon />
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-display text-sm tracking-widest text-ink uppercase">
            {t.footer.hoursTitle}
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-ink-soft">
            {scheduleGroups.map((group) => (
              <li key={group.dayLabel} className="flex flex-col">
                <span className="text-ink">{group.dayLabel}</span>
                <span>{formatDayServices(group.schedule, locale)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm tracking-widest text-ink uppercase">
            {t.footer.contactTitle}
          </h2>
          <address className="mt-4 space-y-2 text-sm text-ink-soft not-italic">
            <p>
              {siteConfig.address.street}
              <br />
              {siteConfig.address.postalCode} {siteConfig.address.city}
            </p>
            <p>
              <a href={`tel:${siteConfig.phone.e164}`} className="transition-colors hover:text-accent">
                {siteConfig.phone.display}
              </a>
            </p>
            <p>
              <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-accent">
                {siteConfig.email}
              </a>
            </p>
          </address>
        </div>

        <div>
          <h2 className="font-display text-sm tracking-widest text-ink uppercase">Izakaya</h2>
          <ul className="mt-4 space-y-2 text-sm text-ink-soft">
            <li>
              <Link to="/legal/aviso-legal" className="transition-colors hover:text-accent">
                {t.footer.legalLinks.legalNotice}
              </Link>
            </li>
            <li>
              <Link to="/legal/privacidad" className="transition-colors hover:text-accent">
                {t.footer.legalLinks.privacy}
              </Link>
            </li>
            <li>
              <Link to="/legal/cookies" className="transition-colors hover:text-accent">
                {t.footer.legalLinks.cookies}
              </Link>
            </li>
            <li>
              <Link to="/demo" className="transition-colors hover:text-accent">
                {t.demo.viewDemoPage}
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-line py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-ink-soft sm:flex-row">
          <p>
            © {year} {siteConfig.name}. {t.footer.rightsReserved}
          </p>
          <p className="text-ink-soft/70">
            {pick({ es: 'Mockup de demostración', en: 'Demonstration mockup' })}
          </p>
        </Container>
      </div>
    </footer>
  )
}
