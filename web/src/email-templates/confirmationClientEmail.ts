import { siteConfig } from '@/config/site.config'
import { zoneLabels } from '@/config/tables.config'
import { formatDateLong } from '@/lib/date'
import type { Locale } from '@/types/common'
import type { Reservation } from '@/types/reservation'
import { renderEmailLayout } from './layout'

const copy = {
  es: {
    subject: (name: string) => `Hemos recibido tu reserva, ${name}`,
    greeting: (name: string) => (name ? `Hola ${name},` : 'Hola,'),
    intro:
      'Gracias por reservar en Izakaya. Esta es la confirmación de tu solicitud; en breve recibirás otro email cuando quede confirmada por el restaurante.',
    detailsTitle: 'Detalles de la reserva',
    date: 'Fecha',
    time: 'Hora',
    guests: 'Comensales',
    zone: 'Zona',
    code: 'Localizador',
    notes: 'Notas',
    reassigned:
      'No había mesa libre en la zona que preferías; te hemos asignado la más parecida.',
    closing:
      'Si necesitas cambiar algo, podrás hacerlo desde el email de recordatorio que te enviaremos el día anterior, o llamándonos directamente.',
    seeYou: '¡Nos vemos pronto!',
  },
  en: {
    subject: (name: string) => `We've received your booking, ${name}`,
    greeting: (name: string) => (name ? `Hi ${name},` : 'Hi,'),
    intro:
      "Thanks for booking a table at Izakaya. This confirms your request; you'll get another email once the restaurant confirms it.",
    detailsTitle: 'Booking details',
    date: 'Date',
    time: 'Time',
    guests: 'Guests',
    zone: 'Seating',
    code: 'Booking code',
    notes: 'Notes',
    reassigned: 'Your preferred seating was full, so we assigned the closest match.',
    closing:
      "If you need to change anything, you'll be able to from the reminder email we send the day before, or by calling us directly.",
    seeYou: 'See you soon!',
  },
} as const

export function renderClientConfirmationEmail(reservation: Reservation, locale: Locale) {
  const c = copy[locale]
  const firstName = reservation.customer.name.split(' ')[0] ?? ''

  const rows: { label: string; value: string }[] = [
    { label: c.date, value: formatDateLong(new Date(`${reservation.date}T00:00:00`), locale) },
    { label: c.time, value: reservation.time },
    { label: c.guests, value: String(reservation.partySize) },
    { label: c.zone, value: zoneLabels[reservation.zonePreference][locale] },
    { label: c.code, value: reservation.token.slice(0, 8).toUpperCase() },
  ]
  if (reservation.customer.notes) rows.push({ label: c.notes, value: reservation.customer.notes })

  const rowsHtml = rows
    .map(
      (row) => `<tr>
        <td style="padding:8px 0; color:#6b6358; width:40%;">${row.label}</td>
        <td style="padding:8px 0; color:#1a1613; text-align:right;">${row.value}</td>
      </tr>`,
    )
    .join('')

  const bodyHtml = `
    <p style="margin:0 0 16px 0; font-size:17px;">${c.greeting(firstName)}</p>
    <p style="margin:0 0 24px 0;">${c.intro}</p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e6e0d8; border-bottom:1px solid #e6e0d8; margin: 0 0 24px 0;">
      ${rowsHtml}
    </table>

    ${
      reservation.reassignedZone
        ? `<p style="margin:0 0 24px 0; font-size:13px; color:#6b6358;">${c.reassigned}</p>`
        : ''
    }

    <p style="margin:0 0 20px 0;">${c.closing}</p>
    <p style="margin:0;">${c.seeYou}</p>
  `

  return {
    subject: c.subject(firstName),
    to: reservation.customer.email,
    from: siteConfig.email,
    html: renderEmailLayout({ locale, title: c.subject(firstName), bodyHtml }),
  }
}
