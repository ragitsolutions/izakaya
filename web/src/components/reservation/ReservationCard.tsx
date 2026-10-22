import { useLanguage } from '@/i18n/LanguageContext'
import { zoneLabels } from '@/config/tables.config'
import { formatDateLong, fromISODate } from '@/lib/date'
import { formatGuestCount } from '@/lib/format'
import type { Reservation } from '@/types/reservation'

const statusKey = {
  pending: 'statusPending',
  confirmed: 'statusConfirmed',
  cancelled: 'statusCancelled',
} as const

export function ReservationCard({ reservation }: { reservation: Reservation }) {
  const { t, locale, pick } = useLanguage()
  const c = t.reservation.confirmation

  return (
    <div className="border border-line-soft p-6 text-left text-sm">
      <div className="flex items-center justify-between border-b border-line-soft pb-4">
        <span className="text-ink-soft">{c.code}</span>
        <span className="font-display text-lg tracking-widest text-ink uppercase">
          {reservation.token.slice(0, 8)}
        </span>
      </div>
      <div className="flex items-center justify-between pt-4">
        <span className="text-ink-soft">{c.status}</span>
        <span className="border border-accent px-2.5 py-1 text-xs tracking-wide text-accent uppercase">
          {c[statusKey[reservation.status]]}
        </span>
      </div>

      <dl className="mt-4 space-y-2.5 border-t border-line-soft pt-4">
        <Row label={t.reservation.summary.dateLabel} value={formatDateLong(fromISODate(reservation.date), locale)} />
        <Row label={t.reservation.summary.timeLabel} value={reservation.time} />
        <Row
          label={t.reservation.summary.partySizeLabel}
          value={formatGuestCount(reservation.partySize, t.reservation.partySize)}
        />
        <Row label={t.reservation.summary.zoneLabel} value={pick(zoneLabels[reservation.zonePreference])} />
      </dl>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-ink-soft">{label}</dt>
      <dd className="text-right text-ink capitalize">{value}</dd>
    </div>
  )
}
