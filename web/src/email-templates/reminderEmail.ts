import { formatDateLong } from '@/lib/date'
import type { Locale } from '@/types/common'
import type { Reservation } from '@/types/reservation'
import { emailButton, renderEmailLayout } from './layout'

const copy = {
  es: {
    subject: '¿Nos vemos mañana? Confirma tu mesa en Izakaya',
    greeting: (name: string) => (name ? `Hola ${name},` : 'Hola,'),
    intro: (date: string, time: string) =>
      `Te esperamos mañana <strong>${date}</strong> a las <strong>${time}</strong>. ¿Nos confirmas que seguís en pie?`,
    confirm: 'Confirmar asistencia',
    cancel: 'Cancelar reserva',
    modifyIntro: '¿Necesitas cambiar la hora, el día o el número de comensales?',
    modifyLink: 'Modificar la reserva',
    note: 'Si no confirmas, no te preocupes: seguimos guardándote la mesa igualmente.',
  },
  en: {
    subject: 'See you tomorrow? Confirm your table at Izakaya',
    greeting: (name: string) => (name ? `Hi ${name},` : 'Hi,'),
    intro: (date: string, time: string) =>
      `We're expecting you tomorrow <strong>${date}</strong> at <strong>${time}</strong>. Can you confirm you're still coming?`,
    confirm: 'Confirm attendance',
    cancel: 'Cancel booking',
    modifyIntro: 'Need to change the time, day or number of guests?',
    modifyLink: 'Modify the booking',
    note: "If you don't confirm, no worries: we'll still hold your table.",
  },
} as const

export function renderReminderEmail(
  reservation: Reservation,
  locale: Locale,
  urls: { confirmUrl: string; cancelUrl: string; modifyUrl: string },
) {
  const c = copy[locale]
  const firstName = reservation.customer.name.split(' ')[0] ?? ''
  const dateLabel = formatDateLong(new Date(`${reservation.date}T00:00:00`), locale)

  const bodyHtml = `
    <p style="margin:0 0 16px 0; font-size:17px;">${c.greeting(firstName)}</p>
    <p style="margin:0 0 28px 0;">${c.intro(dateLabel, reservation.time)}</p>

    <div style="margin: 0 0 28px 0;">
      ${emailButton(c.confirm, urls.confirmUrl, 'primary')}
      ${emailButton(c.cancel, urls.cancelUrl, 'outline')}
    </div>

    <p style="margin:0 0 6px 0; font-size:13px; color:#6b6358;">${c.modifyIntro}</p>
    <p style="margin:0 0 24px 0; font-size:13px;"><a href="${urls.modifyUrl}" style="color:#bc3a2d;">${c.modifyLink}</a></p>

    <p style="margin:0; font-size:12px; color:#6b6358;">${c.note}</p>
  `

  return {
    subject: c.subject,
    to: reservation.customer.email,
    html: renderEmailLayout({ locale, title: c.subject, bodyHtml }),
  }
}
