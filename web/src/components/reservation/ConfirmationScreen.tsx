import { useState } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import { renderClientConfirmationEmail } from '@/email-templates/confirmationClientEmail'
import { renderRestaurantNotificationEmail } from '@/email-templates/restaurantNotificationEmail'
import { emailService } from '@/services/emailService'
import type { Reservation } from '@/types/reservation'
import { Button } from '@/components/ui/Button'
import { Hanko } from '@/components/ui/Hanko'
import { EmailPreview } from './EmailPreview'
import { ReservationCard } from './ReservationCard'

type TabKey = 'client' | 'restaurant' | 'reminder'

export function ConfirmationScreen({ reservation }: { reservation: Reservation }) {
  const { t, locale } = useLanguage()
  const c = t.reservation.confirmation
  const [activeTab, setActiveTab] = useState<TabKey>('client')

  const emails: Record<TabKey, { subject: string; html: string }> = {
    client: renderClientConfirmationEmail(reservation, locale),
    restaurant: renderRestaurantNotificationEmail(reservation),
    reminder: emailService.previewReminder(reservation, locale),
  }

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'client', label: c.tabClient },
    { key: 'restaurant', label: c.tabRestaurant },
    { key: 'reminder', label: c.tabReminder },
  ]

  return (
    <div className="mx-auto max-w-xl text-center">
      <Hanko className="mx-auto h-9 w-9 text-accent" />
      <h2 className="mt-5 text-3xl">{c.pendingTitle}</h2>
      <p className="mt-3 text-ink-soft">{c.pendingText}</p>

      <div className="mt-8">
        <ReservationCard reservation={reservation} />
        {reservation.reassignedZone && (
          <p className="mt-3 text-xs text-ink-soft">{t.reservation.summary.reassignedNotice}</p>
        )}
      </div>

      <div className="mt-12 text-left">
        <h3 className="text-center text-lg text-ink">{c.emailsTitle}</h3>
        <p className="mt-1.5 text-center text-sm text-ink-soft">{c.emailsIntro}</p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              aria-pressed={activeTab === tab.key}
              className={`border px-4 py-2 text-xs tracking-widest uppercase transition-colors ${
                activeTab === tab.key
                  ? 'border-accent bg-accent text-paper'
                  : 'border-line text-ink-soft hover:text-ink'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <EmailPreview html={emails[activeTab].html} title={emails[activeTab].subject} />
        </div>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button to="/" variant="primary">
          {c.backHome}
        </Button>
        <Button to="/carta" variant="outline">
          {c.viewMenu}
        </Button>
      </div>
    </div>
  )
}
