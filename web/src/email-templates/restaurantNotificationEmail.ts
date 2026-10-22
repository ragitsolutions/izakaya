import { siteConfig } from '@/config/site.config'
import { zoneLabels } from '@/config/tables.config'
import { tables } from '@/config/tables.config'
import { formatDateLong } from '@/lib/date'
import type { Reservation } from '@/types/reservation'
import { renderEmailLayout } from './layout'

/** Aviso interno al restaurante. Siempre en español: lo lee el equipo de sala. */
export function renderRestaurantNotificationEmail(reservation: Reservation) {
  const table = tables.find((t) => t.id === reservation.tableId)
  const origin = reservation.createdByAdmin ? 'Creada manualmente desde el panel' : 'Reserva online'

  const rows = [
    { label: 'Fecha', value: formatDateLong(new Date(`${reservation.date}T00:00:00`), 'es') },
    { label: 'Hora', value: reservation.time },
    { label: 'Comensales', value: String(reservation.partySize) },
    { label: 'Zona', value: zoneLabels[reservation.zonePreference].es },
    { label: 'Mesa asignada', value: table?.label ?? reservation.tableId },
    { label: 'Cliente', value: reservation.customer.name || '—' },
    { label: 'Email', value: reservation.customer.email },
    { label: 'Teléfono', value: reservation.customer.phone || '—' },
    { label: 'Alergias / notas', value: reservation.customer.notes || '—' },
    { label: 'Origen', value: origin },
  ]

  const rowsHtml = rows
    .map(
      (row) => `<tr>
        <td style="padding:8px 0; color:#6b6358; width:35%;">${row.label}</td>
        <td style="padding:8px 0; color:#1a1613; text-align:right;">${row.value}</td>
      </tr>`,
    )
    .join('')

  const bodyHtml = `
    <p style="margin:0 0 20px 0; font-size:17px;">Nueva reserva ${
      reservation.reassignedZone ? '<span style="color:#bc3a2d;">(zona reasignada)</span>' : ''
    }</p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e6e0d8; border-bottom:1px solid #e6e0d8;">
      ${rowsHtml}
    </table>
  `

  return {
    subject: `Nueva reserva: ${reservation.customer.name || reservation.customer.email} · ${reservation.date} ${reservation.time}`,
    to: siteConfig.email,
    from: siteConfig.email,
    html: renderEmailLayout({ locale: 'es', title: 'Nueva reserva', bodyHtml }),
  }
}
