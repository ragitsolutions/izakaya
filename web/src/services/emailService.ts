import { renderClientConfirmationEmail } from '@/email-templates/confirmationClientEmail'
import { renderReminderEmail } from '@/email-templates/reminderEmail'
import { renderRestaurantNotificationEmail } from '@/email-templates/restaurantNotificationEmail'
import type { Locale } from '@/types/common'
import type { Reservation } from '@/types/reservation'
import { readJSON, removeKey, writeJSON } from './storage'

/**
 * Envío de emails simulado: en vez de llamar a un proveedor real, guarda cada
 * mensaje en un "buzón de salida" en localStorage, que el panel de admin y
 * este mismo flujo usan para mostrar las vistas previas.
 *
 * TODO (paso a producción): sustituir el cuerpo de `dispatch()` por la llamada
 * real a un proveedor transaccional (p. ej. la API de Resend) manteniendo la
 * misma firma de las funciones exportadas, para no tocar quien las usa.
 */

const OUTBOX_KEY = 'email-outbox'
const FAKE_LATENCY_MS = 250

export type EmailType = 'client-confirmation' | 'restaurant-notification' | 'reminder'

export interface SentEmail {
  id: string
  type: EmailType
  reservationId: string
  to: string
  subject: string
  html: string
  locale: Locale
  sentAt: string
}

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), FAKE_LATENCY_MS))
}

function loadOutbox(): SentEmail[] {
  return readJSON<SentEmail[]>(OUTBOX_KEY, [])
}

function dispatch(entry: Omit<SentEmail, 'id' | 'sentAt'>): SentEmail {
  const sent: SentEmail = { ...entry, id: `mail_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`, sentAt: new Date().toISOString() }
  const outbox = loadOutbox()
  writeJSON(OUTBOX_KEY, [sent, ...outbox].slice(0, 200))
  return sent
}

function reservationUrls(token: string) {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  return {
    confirmUrl: `${origin}/reserva/${token}/confirmar`,
    cancelUrl: `${origin}/reserva/${token}/cancelar`,
    modifyUrl: `${origin}/reserva/${token}/modificar`,
  }
}

export const emailService = {
  async sendClientConfirmation(reservation: Reservation, locale: Locale): Promise<SentEmail> {
    const email = renderClientConfirmationEmail(reservation, locale)
    const sent = dispatch({
      type: 'client-confirmation',
      reservationId: reservation.id,
      to: email.to,
      subject: email.subject,
      html: email.html,
      locale,
    })
    return delay(sent)
  },

  async sendRestaurantNotification(reservation: Reservation): Promise<SentEmail> {
    const email = renderRestaurantNotificationEmail(reservation)
    const sent = dispatch({
      type: 'restaurant-notification',
      reservationId: reservation.id,
      to: email.to,
      subject: email.subject,
      html: email.html,
      locale: 'es',
    })
    return delay(sent)
  },

  async sendReminder(reservation: Reservation, locale: Locale): Promise<SentEmail> {
    const email = renderReminderEmail(reservation, locale, reservationUrls(reservation.token))
    const sent = dispatch({
      type: 'reminder',
      reservationId: reservation.id,
      to: reservation.customer.email,
      subject: email.subject,
      html: email.html,
      locale,
    })
    return delay(sent)
  },

  /** Devuelve el HTML del recordatorio sin "enviarlo" (usado por el panel para previsualizar antes de simular el envío). */
  previewReminder(reservation: Reservation, locale: Locale) {
    return renderReminderEmail(reservation, locale, reservationUrls(reservation.token))
  },

  async getOutbox(): Promise<SentEmail[]> {
    return delay(loadOutbox())
  },

  async getEmailsForReservation(reservationId: string): Promise<SentEmail[]> {
    return delay(loadOutbox().filter((e) => e.reservationId === reservationId))
  },

  async clearOutbox(): Promise<void> {
    removeKey(OUTBOX_KEY)
    await delay(null)
  },
}
