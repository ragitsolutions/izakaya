import { weeklySchedule as defaultSchedule, type DaySchedule } from '@/config/hours.config'
import { tables as defaultTables } from '@/config/tables.config'
import type { RestaurantTable } from '@/types/reservation'
import type { Weekday } from '@/types/common'
import { readJSON, writeJSON, removeKey } from './storage'

/**
 * Ajustes operativos editables desde el panel de admin (horarios, mesas, días
 * bloqueados). Los archivos en `src/config/` son los valores por defecto de la
 * demo; este servicio guarda los cambios en localStorage y es la fuente que
 * usan tanto el panel como el propio formulario público de reservas.
 */

const SCHEDULE_KEY = 'settings-schedule'
const TABLES_KEY = 'settings-tables'
const BLOCKED_DATES_KEY = 'settings-blocked-dates'

export interface BlockedDate {
  date: string // "YYYY-MM-DD"
  reason: string
}

export const settingsService = {
  getSchedule(): Record<Weekday, DaySchedule> {
    return readJSON(SCHEDULE_KEY, defaultSchedule)
  },
  setSchedule(schedule: Record<Weekday, DaySchedule>) {
    writeJSON(SCHEDULE_KEY, schedule)
  },

  getTables(): RestaurantTable[] {
    return readJSON(TABLES_KEY, defaultTables)
  },
  setTables(tables: RestaurantTable[]) {
    writeJSON(TABLES_KEY, tables)
  },

  getBlockedDates(): BlockedDate[] {
    return readJSON<BlockedDate[]>(BLOCKED_DATES_KEY, [])
  },
  setBlockedDates(blocked: BlockedDate[]) {
    writeJSON(BLOCKED_DATES_KEY, blocked)
  },
  addBlockedDate(date: string, reason: string) {
    const current = settingsService.getBlockedDates()
    if (current.some((b) => b.date === date)) return
    settingsService.setBlockedDates([...current, { date, reason }].sort((a, b) => a.date.localeCompare(b.date)))
  },
  removeBlockedDate(date: string) {
    settingsService.setBlockedDates(settingsService.getBlockedDates().filter((b) => b.date !== date))
  },
  isBlocked(date: string): boolean {
    return settingsService.getBlockedDates().some((b) => b.date === date)
  },

  resetAll() {
    removeKey(SCHEDULE_KEY)
    removeKey(TABLES_KEY)
    removeKey(BLOCKED_DATES_KEY)
  },
}
