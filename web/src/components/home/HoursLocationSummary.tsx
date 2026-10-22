import terraceImg from '@/assets/images/local/local-terraza-640.webp'
import { useLanguage } from '@/i18n/LanguageContext'
import { siteConfig } from '@/config/site.config'
import { groupWeeklySchedule, formatDayServices } from '@/lib/hours'
import { settingsService } from '@/services/settingsService'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'

export function HoursLocationSummary() {
  const { t, locale } = useLanguage()
  const scheduleGroups = groupWeeklySchedule(settingsService.getSchedule(), locale)

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal as="div" className="order-2 lg:order-1">
        <h2 className="text-3xl sm:text-4xl">{t.home.hoursAndLocationTitle}</h2>

        <dl className="mt-8 space-y-4 text-sm">
          {scheduleGroups.map((group) => (
            <div key={group.dayLabel} className="flex justify-between gap-4 border-b border-line-soft pb-3">
              <dt className="text-ink">{group.dayLabel}</dt>
              <dd className="text-right text-ink-soft">{formatDayServices(group.schedule, locale)}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 text-sm text-ink-soft">
          {siteConfig.address.street}, {siteConfig.address.postalCode} {siteConfig.address.city}
        </p>

        <Button to="/contacto" variant="outline" className="mt-6">
          {t.home.hoursAndLocationCta}
        </Button>
      </Reveal>

      <Reveal as="div" className="order-1 aspect-[4/5] overflow-hidden lg:order-2" delay={150}>
        <img src={terraceImg} alt="" loading="lazy" className="h-full w-full object-cover" />
      </Reveal>
    </div>
  )
}
