import { useEffect, useState } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import { addDays, startOfDay, toISODate } from '@/lib/date'
import { reservationService } from '@/services/reservationService'
import { emailService, type SentEmail } from '@/services/emailService'
import { Modal } from '@/components/ui/Modal'
import { EmailPreview } from '@/components/reservation/EmailPreview'

export function ReminderSimulatorModal({ onClose }: { onClose: () => void }) {
  const { t, locale } = useLanguage()
  const r = t.admin.reminderSimulator
  const [results, setResults] = useState<SentEmail[] | null>(null)
  const [openPreviewId, setOpenPreviewId] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function run() {
      const tomorrow = toISODate(addDays(startOfDay(new Date()), 1))
      const reservations = await reservationService.getReservationsByDate(tomorrow)
      const active = reservations.filter((res) => res.status !== 'cancelled')

      const sent: SentEmail[] = []
      for (const reservation of active) {
        // eslint-disable-next-line no-await-in-loop
        const email = await emailService.sendReminder(reservation, locale)
        sent.push(email)
      }
      if (!cancelled) setResults(sent)
    }
    run()
    return () => {
      cancelled = true
    }
  }, [locale])

  return (
    <Modal title={r.title} onClose={onClose} wide>
      {results === null ? (
        <p className="text-sm text-ink-soft">{r.running}</p>
      ) : results.length === 0 ? (
        <p className="text-sm text-ink-soft">{r.none}</p>
      ) : (
        <>
          <p className="text-sm text-ink-soft">{r.summary.replace('{count}', String(results.length))}</p>
          <ul className="mt-4 divide-y divide-line-soft border-y border-line-soft">
            {results.map((email) => (
              <li key={email.id} className="py-3">
                <button
                  type="button"
                  onClick={() => setOpenPreviewId(openPreviewId === email.id ? null : email.id)}
                  className="flex w-full items-center justify-between gap-4 text-left text-sm"
                >
                  <span>
                    <span className="block text-ink">{email.to}</span>
                    <span className="block text-xs text-ink-soft">{email.subject}</span>
                  </span>
                  <span className="shrink-0 text-xs tracking-widest text-accent uppercase">
                    {openPreviewId === email.id ? r.close : '↓'}
                  </span>
                </button>
                {openPreviewId === email.id && (
                  <div className="mt-3">
                    <EmailPreview html={email.html} title={email.subject} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </Modal>
  )
}
