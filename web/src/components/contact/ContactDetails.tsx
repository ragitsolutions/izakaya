import { useLanguage } from '@/i18n/LanguageContext'
import { siteConfig } from '@/config/site.config'
import { groupWeeklySchedule, formatDayServices } from '@/lib/hours'
import { settingsService } from '@/services/settingsService'
import { Button } from '@/components/ui/Button'

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.8" cy="6.2" r="1.1" fill="currentColor" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M13.8 8.2h1.4V5.7h-1.8c-1.9 0-3 1.1-3 3.1v1.5H8.8v2.5h1.6V18h2.6v-5.2h1.8l.3-2.5h-2.1V9c0-.5.2-.8.8-.8Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function ContactDetails() {
  const { t, locale } = useLanguage()
  const scheduleGroups = groupWeeklySchedule(settingsService.getSchedule(), locale)

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-xs tracking-[0.3em] text-accent uppercase">{t.contact.addressTitle}</h2>
        <address className="mt-3 text-lg leading-relaxed text-ink not-italic">
          {siteConfig.address.street}
          <br />
          {siteConfig.address.postalCode} {siteConfig.address.city}
        </address>
        <Button href={siteConfig.googleMapsDirectionsUrl} target="_blank" rel="noreferrer noopener" variant="outline" className="mt-4">
          {t.contact.directionsCta}
        </Button>
      </div>

      <div>
        <h2 className="text-xs tracking-[0.3em] text-accent uppercase">{t.contact.phoneTitle}</h2>
        <a
          href={`tel:${siteConfig.phone.e164}`}
          className="mt-3 block text-lg text-ink transition-colors hover:text-accent"
        >
          {siteConfig.phone.display}
        </a>
      </div>

      <div>
        <h2 className="text-xs tracking-[0.3em] text-accent uppercase">{t.contact.emailTitle}</h2>
        <a
          href={`mailto:${siteConfig.email}`}
          className="mt-3 block text-lg text-ink transition-colors hover:text-accent"
        >
          {siteConfig.email}
        </a>
      </div>

      <div>
        <h2 className="text-xs tracking-[0.3em] text-accent uppercase">{t.contact.hoursTitle}</h2>
        <dl className="mt-3 space-y-2">
          {scheduleGroups.map((group) => (
            <div key={group.dayLabel} className="flex justify-between gap-4 text-sm">
              <dt className="text-ink">{group.dayLabel}</dt>
              <dd className="text-right text-ink-soft">{formatDayServices(group.schedule, locale)}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div>
        <h2 className="text-xs tracking-[0.3em] text-accent uppercase">{t.contact.socialTitle}</h2>
        <div className="mt-3 flex items-center gap-4 text-ink">
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
    </div>
  )
}
