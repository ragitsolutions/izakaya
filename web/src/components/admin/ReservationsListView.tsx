import { useLanguage } from '@/i18n/LanguageContext'
import { zoneLabels } from '@/config/tables.config'
import type { RestaurantTable, Reservation } from '@/types/reservation'
import { StatusBadge } from './StatusBadge'

export function ReservationsListView({
  reservations,
  tables,
  onSelect,
}: {
  reservations: Reservation[]
  tables: RestaurantTable[]
  onSelect: (reservation: Reservation) => void
}) {
  const { t, pick } = useLanguage()
  const r = t.admin.reservations
  const tableLabel = (id: string) => tables.find((tbl) => tbl.id === id)?.label ?? id

  if (reservations.length === 0) {
    return <p className="py-10 text-center text-sm text-ink-soft">{r.noResults}</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-line text-xs tracking-widest text-ink-soft uppercase">
            <th className="py-3 pr-4 font-normal">{r.colTime}</th>
            <th className="py-3 pr-4 font-normal">{r.colGuests}</th>
            <th className="py-3 pr-4 font-normal">{r.colZone}</th>
            <th className="py-3 pr-4 font-normal">{r.colTable}</th>
            <th className="py-3 pr-4 font-normal">{r.colCustomer}</th>
            <th className="py-3 pr-4 font-normal">{r.colStatus}</th>
            <th className="py-3 font-normal">{r.colActions}</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res) => (
            <tr key={res.id} className="border-b border-line-soft">
              <td className="py-3 pr-4 text-ink">{res.time}</td>
              <td className="py-3 pr-4 text-ink-soft">{res.partySize}</td>
              <td className="py-3 pr-4 text-ink-soft">{pick(zoneLabels[res.zonePreference])}</td>
              <td className="py-3 pr-4 text-ink-soft">{tableLabel(res.tableId)}</td>
              <td className="py-3 pr-4 text-ink">
                {res.customer.name || '—'}
                <span className="block text-xs text-ink-soft">{res.customer.email}</span>
              </td>
              <td className="py-3 pr-4">
                <StatusBadge status={res.status} />
              </td>
              <td className="py-3">
                <button
                  type="button"
                  onClick={() => onSelect(res)}
                  className="text-xs tracking-widest text-accent uppercase hover:underline"
                >
                  {r.viewDetail}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
