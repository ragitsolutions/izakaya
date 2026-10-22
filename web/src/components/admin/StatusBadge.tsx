import { useLanguage } from '@/i18n/LanguageContext'
import type { ReservationStatus } from '@/types/reservation'

const styles: Record<ReservationStatus, string> = {
  pending: 'border-accent text-accent',
  confirmed: 'border-ink text-ink',
  cancelled: 'border-line-soft text-ink-soft line-through',
}

export function StatusBadge({ status }: { status: ReservationStatus }) {
  const { t } = useLanguage()
  const labels: Record<ReservationStatus, string> = {
    pending: t.admin.reservations.statusPending,
    confirmed: t.admin.reservations.statusConfirmed,
    cancelled: t.admin.reservations.statusCancelled,
  }

  return (
    <span className={`inline-block border px-2 py-0.5 text-xs tracking-wide uppercase ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}
