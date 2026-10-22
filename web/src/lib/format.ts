import type { Locale } from '@/types/common'

const currencyFormatters: Record<Locale, Intl.NumberFormat> = {
  es: new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }),
  en: new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }),
}

export function formatPrice(amount: number, locale: Locale) {
  return currencyFormatters[locale].format(amount)
}

export function formatGuestCount(
  count: number,
  labels: { guestsLabel: string; guestSingular: string },
) {
  return `${count} ${count === 1 ? labels.guestSingular : labels.guestsLabel}`
}
