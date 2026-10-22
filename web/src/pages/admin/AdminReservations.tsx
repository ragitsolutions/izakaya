import { useEffect, useState } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import { useDocumentHead } from '@/hooks/useDocumentHead'
import { reservationService } from '@/services/reservationService'
import { settingsService } from '@/services/settingsService'
import { startOfDay, toISODate } from '@/lib/date'
import type { Reservation, ReservationStatus } from '@/types/reservation'
import { DateNav } from '@/components/admin/DateNav'
import { ReservationsListView } from '@/components/admin/ReservationsListView'
import { ReservationsGridView } from '@/components/admin/ReservationsGridView'
import { ReservationDetailModal } from '@/components/admin/ReservationDetailModal'
import { NewReservationModal } from '@/components/admin/NewReservationModal'
import { ReminderSimulatorModal } from '@/components/admin/ReminderSimulatorModal'
import { Button } from '@/components/ui/Button'

type StatusFilter = 'all' | ReservationStatus

export default function AdminReservations() {
  const { t } = useLanguage()
  const r = t.admin.reservations
  useDocumentHead({ title: `${r.title} · Admin` })

  const [date, setDate] = useState(() => startOfDay(new Date()))
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Reservation | null>(null)
  const [showNewForm, setShowNewForm] = useState(false)
  const [showReminderSimulator, setShowReminderSimulator] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const tables = settingsService.getTables()

  useEffect(() => {
    reservationService.getReservationsByDate(toISODate(date)).then(setReservations)
  }, [date, refreshKey])

  function refresh() {
    setRefreshKey((k) => k + 1)
    setSelected(null)
  }

  const filtered = reservations
    .filter((res) => statusFilter === 'all' || res.status === statusFilter)
    .filter((res) => {
      if (!search.trim()) return true
      const q = search.trim().toLowerCase()
      return (
        res.customer.name.toLowerCase().includes(q) ||
        res.customer.email.toLowerCase().includes(q) ||
        res.customer.phone.toLowerCase().includes(q)
      )
    })
    .sort((a, b) => a.time.localeCompare(b.time))

  const statusOptions: { key: StatusFilter; label: string }[] = [
    { key: 'all', label: r.filterAll },
    { key: 'pending', label: r.statusPending },
    { key: 'confirmed', label: r.statusConfirmed },
    { key: 'cancelled', label: r.statusCancelled },
  ]

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl text-ink">{r.title}</h1>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="px-4 py-2 text-xs" onClick={() => setShowReminderSimulator(true)}>
            {t.admin.reminderSimulator.button}
          </Button>
          <Button className="px-4 py-2 text-xs" onClick={() => setShowNewForm(true)}>
            {r.newReservation}
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <DateNav date={date} onChange={setDate} />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => setStatusFilter(opt.key)}
              aria-pressed={statusFilter === opt.key}
              className={`border px-3 py-1.5 text-xs tracking-wide uppercase transition-colors ${
                statusFilter === opt.key
                  ? 'border-accent bg-accent text-paper'
                  : 'border-line text-ink-soft hover:border-accent'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={r.searchPlaceholder}
            className="border border-line bg-paper px-3 py-2 text-sm text-ink"
          />
          <div className="flex border border-line text-xs uppercase">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 ${viewMode === 'list' ? 'bg-accent text-paper' : 'text-ink-soft'}`}
            >
              {r.viewList}
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-accent text-paper' : 'text-ink-soft'}`}
            >
              {r.viewGrid}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 border border-line bg-paper p-4">
        {viewMode === 'list' ? (
          <ReservationsListView reservations={filtered} tables={tables} onSelect={setSelected} />
        ) : (
          <ReservationsGridView date={date} reservations={filtered} tables={tables} onSelect={setSelected} />
        )}
      </div>

      {selected && (
        <ReservationDetailModal
          reservation={selected}
          tables={tables}
          onClose={() => setSelected(null)}
          onChanged={refresh}
        />
      )}

      {showNewForm && (
        <NewReservationModal
          initialDate={date}
          onClose={() => setShowNewForm(false)}
          onCreated={() => {
            setShowNewForm(false)
            refresh()
          }}
        />
      )}

      {showReminderSimulator && <ReminderSimulatorModal onClose={() => setShowReminderSimulator(false)} />}
    </div>
  )
}
