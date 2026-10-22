import type { Bilingual, Weekday } from '@/types/common'

export interface ServicePeriod {
  label: Bilingual
  /** Hora de inicio en formato 24h "HH:mm" */
  start: string
  /** Hora de fin en formato 24h "HH:mm" */
  end: string
}

export interface DaySchedule {
  closed: boolean
  services: ServicePeriod[]
}

const LUNCH: ServicePeriod = {
  label: { es: 'Comidas', en: 'Lunch' },
  start: '13:00',
  end: '16:00',
}

const DINNER: ServicePeriod = {
  label: { es: 'Cenas', en: 'Dinner' },
  start: '20:00',
  end: '23:00',
}

export const weeklySchedule: Record<Weekday, DaySchedule> = {
  mon: { closed: true, services: [] },
  tue: { closed: true, services: [] },
  wed: { closed: false, services: [DINNER] },
  thu: { closed: false, services: [DINNER] },
  fri: { closed: false, services: [DINNER] },
  sat: { closed: false, services: [LUNCH, DINNER] },
  sun: { closed: false, services: [LUNCH] },
}

export const weekdayLabels: Record<Weekday, Bilingual> = {
  mon: { es: 'Lunes', en: 'Monday' },
  tue: { es: 'Martes', en: 'Tuesday' },
  wed: { es: 'Miércoles', en: 'Wednesday' },
  thu: { es: 'Jueves', en: 'Thursday' },
  fri: { es: 'Viernes', en: 'Friday' },
  sat: { es: 'Sábado', en: 'Saturday' },
  sun: { es: 'Domingo', en: 'Sunday' },
}

export const weekdayShortLabels: Record<Weekday, Bilingual> = {
  mon: { es: 'Lun', en: 'Mon' },
  tue: { es: 'Mar', en: 'Tue' },
  wed: { es: 'Mié', en: 'Wed' },
  thu: { es: 'Jue', en: 'Thu' },
  fri: { es: 'Vie', en: 'Fri' },
  sat: { es: 'Sáb', en: 'Sat' },
  sun: { es: 'Dom', en: 'Sun' },
}
