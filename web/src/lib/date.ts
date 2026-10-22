import type { Locale, Weekday } from '@/types/common'

const WEEKDAY_BY_JS_DAY: Weekday[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

/** "YYYY-MM-DD" en hora local (evita el desfase de toISOString, que usa UTC). */
export function toISODate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** Construye una fecha local a medianoche a partir de "YYYY-MM-DD". */
export function fromISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export function startOfDay(date: Date): Date {
  const result = new Date(date)
  result.setHours(0, 0, 0, 0)
  return result
}

export function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export function getWeekday(date: Date): Weekday {
  return WEEKDAY_BY_JS_DAY[date.getDay()]
}

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, '0')
  const m = (minutes % 60).toString().padStart(2, '0')
  return `${h}:${m}`
}

const dateFormatters: Record<Locale, Intl.DateTimeFormat> = {
  es: new Intl.DateTimeFormat('es-ES', { weekday: 'short', day: 'numeric', month: 'short' }),
  en: new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }),
}

const longDateFormatters: Record<Locale, Intl.DateTimeFormat> = {
  es: new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
  en: new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
}

const monthFormatters: Record<Locale, Intl.DateTimeFormat> = {
  es: new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }),
  en: new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' }),
}

export function formatDateShort(date: Date, locale: Locale) {
  return dateFormatters[locale].format(date)
}

export function formatDateLong(date: Date, locale: Locale) {
  return longDateFormatters[locale].format(date)
}

export function formatMonthYear(date: Date, locale: Locale) {
  return monthFormatters[locale].format(date)
}
