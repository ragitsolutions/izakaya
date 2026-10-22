import { useLanguage } from '@/i18n/LanguageContext'
import { zoneLabels } from '@/config/tables.config'
import { formatDateLong } from '@/lib/date'
import { formatGuestCount } from '@/lib/format'
import type { ReservationDetails } from '@/types/reservationForm'
import { Button } from '@/components/ui/Button'

export function SummaryStep({
  partySize,
  date,
  time,
  details,
  onEditStep,
  onSubmit,
  isSubmitting,
  errorMessage,
}: {
  partySize: number
  date: Date
  time: string
  details: ReservationDetails
  onEditStep: (step: number) => void
  onSubmit: () => void
  isSubmitting: boolean
  errorMessage: string | null
}) {
  const { t, locale, pick } = useLanguage()
  const s = t.reservation.summary

  const rows: { label: string; value: string; step: number; capitalize?: boolean }[] = [
    { label: s.partySizeLabel, value: formatGuestCount(partySize, t.reservation.partySize), step: 1 },
    { label: s.dateLabel, value: formatDateLong(date, locale), step: 2, capitalize: true },
    { label: s.timeLabel, value: time, step: 3 },
    { label: s.zoneLabel, value: pick(zoneLabels[details.zonePreference]), step: 4 },
    { label: s.nameLabel, value: details.name || '—', step: 4 },
    { label: s.emailLabel, value: details.email, step: 4 },
    { label: s.phoneLabel, value: details.phone || '—', step: 4 },
  ]

  if (details.notes) {
    rows.push({ label: s.notesLabel, value: details.notes, step: 4 })
  }

  return (
    <div>
      <h2 className="text-2xl">{s.question}</h2>

      <dl className="mt-8 divide-y divide-line-soft border-y border-line-soft">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start justify-between gap-4 py-3.5 text-sm">
            <dt className="text-ink-soft">{row.label}</dt>
            <div className="flex max-w-[60%] items-start gap-3 text-right">
              <dd className={`text-ink ${row.capitalize ? 'capitalize' : ''}`}>{row.value}</dd>
              <button
                type="button"
                onClick={() => onEditStep(row.step)}
                className="shrink-0 text-xs tracking-widest text-accent uppercase hover:underline"
              >
                {s.edit}
              </button>
            </div>
          </div>
        ))}
      </dl>

      {errorMessage && (
        <p className="mt-6 border border-accent bg-accent-soft/40 px-5 py-4 text-sm text-accent-dark">
          {errorMessage}
        </p>
      )}

      <Button
        type="button"
        onClick={onSubmit}
        disabled={isSubmitting}
        className="mt-8 w-full sm:w-auto"
      >
        {isSubmitting ? s.submitting : s.submit}
      </Button>
    </div>
  )
}
