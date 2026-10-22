import { useState } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import { zoneLabels } from '@/config/tables.config'
import { formatDateLong, fromISODate } from '@/lib/date'
import { formatGuestCount } from '@/lib/format'
import { reservationService } from '@/services/reservationService'
import { emailService } from '@/services/emailService'
import type { Reservation, RestaurantTable, ReservationStatus } from '@/types/reservation'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { StatusBadge } from './StatusBadge'

export function ReservationDetailModal({
  reservation,
  tables,
  onClose,
  onChanged,
}: {
  reservation: Reservation
  tables: RestaurantTable[]
  onClose: () => void
  onChanged: () => void
}) {
  const { t, locale, pick } = useLanguage()
  const d = t.admin.detail
  const [isSaving, setIsSaving] = useState(false)
  const [moveTableId, setMoveTableId] = useState(reservation.tableId)
  const [reminderSent, setReminderSent] = useState(false)

  async function setStatus(status: ReservationStatus) {
    setIsSaving(true)
    try {
      await reservationService.updateStatus(reservation.token, status)
      onChanged()
    } finally {
      setIsSaving(false)
    }
  }

  async function saveTable() {
    if (moveTableId === reservation.tableId) return
    setIsSaving(true)
    try {
      await reservationService.moveTable(reservation.id, moveTableId)
      onChanged()
    } finally {
      setIsSaving(false)
    }
  }

  async function sendReminder() {
    await emailService.sendReminder(reservation, locale)
    setReminderSent(true)
  }

  return (
    <Modal title={d.title} onClose={onClose}>
      <div className="flex items-center justify-between">
        <span className="font-display text-lg tracking-widest text-ink uppercase">
          {reservation.token.slice(0, 8)}
        </span>
        <StatusBadge status={reservation.status} />
      </div>

      <dl className="mt-5 space-y-2 border-y border-line-soft py-4 text-sm">
        <Row label={t.reservation.summary.dateLabel} value={formatDateLong(fromISODate(reservation.date), locale)} />
        <Row label={t.reservation.summary.timeLabel} value={reservation.time} />
        <Row label={t.reservation.summary.partySizeLabel} value={formatGuestCount(reservation.partySize, t.reservation.partySize)} />
        <Row label={t.reservation.summary.zoneLabel} value={pick(zoneLabels[reservation.zonePreference])} />
        <Row label={d.origin} value={reservation.createdByAdmin ? d.originAdmin : d.originOnline} />
        <Row label={d.createdAt} value={new Date(reservation.createdAt).toLocaleString(locale)} />
      </dl>

      <div className="border-b border-line-soft py-4">
        <h3 className="text-xs tracking-widest text-ink-soft uppercase">{d.customer}</h3>
        <p className="mt-2 text-sm text-ink">{reservation.customer.name || '—'}</p>
        <p className="text-sm text-ink-soft">{reservation.customer.email}</p>
        {reservation.customer.phone && (
          <a href={`tel:${reservation.customer.phone}`} className="text-sm text-ink-soft hover:text-accent">
            {reservation.customer.phone}
          </a>
        )}
      </div>

      <div className="border-b border-line-soft py-4">
        <h3 className="text-xs tracking-widest text-ink-soft uppercase">{d.notes}</h3>
        <p className="mt-2 text-sm text-ink-soft">{reservation.customer.notes || d.noNotes}</p>
      </div>

      <div className="border-b border-line-soft py-4">
        <h3 className="text-xs tracking-widest text-ink-soft uppercase">{d.moveTable}</h3>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <select
            value={moveTableId}
            onChange={(e) => setMoveTableId(e.target.value)}
            className="border border-line bg-paper px-3 py-2 text-sm text-ink"
          >
            {tables.map((table) => (
              <option key={table.id} value={table.id}>
                {table.label} · {pick(zoneLabels[table.zone])} · {table.capacity}p
              </option>
            ))}
          </select>
          <Button
            variant="outline"
            className="px-4 py-2 text-xs"
            onClick={saveTable}
            disabled={isSaving || moveTableId === reservation.tableId}
          >
            {d.moveTableSave}
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 py-4">
        {reservation.status !== 'pending' && (
          <Button variant="outline" className="px-4 py-2 text-xs" onClick={() => setStatus('pending')} disabled={isSaving}>
            {d.markPending}
          </Button>
        )}
        {reservation.status !== 'confirmed' && (
          <Button variant="outline" className="px-4 py-2 text-xs" onClick={() => setStatus('confirmed')} disabled={isSaving}>
            {d.markConfirmed}
          </Button>
        )}
        {reservation.status !== 'cancelled' && (
          <Button variant="primary" className="px-4 py-2 text-xs" onClick={() => setStatus('cancelled')} disabled={isSaving}>
            {d.markCancelled}
          </Button>
        )}
      </div>

      <div className="border-t border-line-soft pt-4">
        <Button variant="ghost" className="px-0 normal-case" onClick={sendReminder} disabled={reminderSent}>
          {reminderSent ? d.reminderSent : d.sendReminderNow}
        </Button>
      </div>
    </Modal>
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
