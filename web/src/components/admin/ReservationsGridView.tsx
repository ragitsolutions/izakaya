import { useLanguage } from '@/i18n/LanguageContext'
import { reservationConfig } from '@/config/reservation.config'
import { settingsService } from '@/services/settingsService'
import { getWeekday, minutesToTime, timeToMinutes } from '@/lib/date'
import type { RestaurantTable, Reservation } from '@/types/reservation'
import { StatusBadge } from './StatusBadge'

interface Tick {
  time: string
  serviceIndex: number
}

function buildTicks(date: Date): Tick[] {
  const schedule = settingsService.getSchedule()[getWeekday(date)]
  if (schedule.closed) return []
  const ticks: Tick[] = []

  schedule.services.forEach((service, serviceIndex) => {
    const start = timeToMinutes(service.start)
    const end = timeToMinutes(service.end)
    for (let t = start; t < end; t += reservationConfig.slotIntervalMinutes) {
      ticks.push({ time: minutesToTime(t), serviceIndex })
    }
  })

  return ticks
}

export function ReservationsGridView({
  date,
  reservations,
  tables,
  onSelect,
}: {
  date: Date
  reservations: Reservation[]
  tables: RestaurantTable[]
  onSelect: (reservation: Reservation) => void
}) {
  const { t } = useLanguage()
  const r = t.admin.reservations
  const ticks = buildTicks(date)
  const slotsPerBooking = Math.max(
    1,
    Math.round(reservationConfig.reservationDurationMinutes / reservationConfig.slotIntervalMinutes),
  )
  const active = reservations.filter((res) => res.status !== 'cancelled')

  if (ticks.length === 0) {
    return <p className="py-10 text-center text-sm text-ink-soft">{r.noResults}</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="border-collapse text-left text-xs">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 bg-paper-soft py-2 pr-4 text-ink-soft">{r.colTable}</th>
            {ticks.map((tick, i) => (
              <th
                key={tick.time + i}
                className={`min-w-[64px] border-b border-line py-2 text-center font-normal text-ink-soft ${
                  i > 0 && ticks[i - 1].serviceIndex !== tick.serviceIndex ? 'border-l-2 border-l-line' : ''
                }`}
              >
                {tick.time}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tables.map((table) => {
            const occupied = new Array<Reservation | 'continuation' | null>(ticks.length).fill(null)

            for (const res of active.filter((item) => item.tableId === table.id)) {
              const startIndex = ticks.findIndex((tick) => tick.time === res.time)
              if (startIndex === -1) continue
              occupied[startIndex] = res
              for (let i = 1; i < slotsPerBooking && startIndex + i < ticks.length; i++) {
                occupied[startIndex + i] = 'continuation'
              }
            }

            return (
              <tr key={table.id}>
                <td className="sticky left-0 z-10 whitespace-nowrap border-b border-line-soft bg-paper-soft py-2 pr-4 text-ink">
                  {table.label}
                </td>
                {ticks.map((tick, i) => {
                  const cell = occupied[i]
                  if (cell === 'continuation') return null

                  if (cell) {
                    return (
                      <td
                        key={tick.time + i}
                        colSpan={Math.min(slotsPerBooking, ticks.length - i)}
                        className="border-b border-line-soft p-1"
                      >
                        <button
                          type="button"
                          onClick={() => onSelect(cell)}
                          className="w-full border border-accent bg-accent-soft/50 px-2 py-1.5 text-left hover:bg-accent-soft"
                        >
                          <span className="block truncate text-ink">{cell.customer.name || cell.customer.email}</span>
                          <span className="mt-0.5 flex items-center justify-between gap-1">
                            <span className="text-ink-soft">{cell.partySize}p</span>
                            <StatusBadge status={cell.status} />
                          </span>
                        </button>
                      </td>
                    )
                  }

                  return (
                    <td
                      key={tick.time + i}
                      className={`border-b border-line-soft p-1 text-center text-ink-soft/50 ${
                        i > 0 && ticks[i - 1].serviceIndex !== tick.serviceIndex ? 'border-l-2 border-l-line' : ''
                      }`}
                    >
                      ·
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
