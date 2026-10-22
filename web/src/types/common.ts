/** Texto disponible en los dos idiomas soportados por la web. */
export interface Bilingual {
  es: string
  en: string
}

export type Weekday = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

export const WEEKDAYS: Weekday[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

export type Locale = 'es' | 'en'
