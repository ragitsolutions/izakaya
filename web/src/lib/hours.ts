import { weekdayShortLabels, type DaySchedule } from '@/config/hours.config'
import { WEEKDAYS, type Locale, type Weekday } from '@/types/common'

function sameSchedule(a: DaySchedule, b: DaySchedule) {
  if (a.closed !== b.closed) return false
  if (a.services.length !== b.services.length) return false
  return a.services.every((s, i) => s.start === b.services[i].start && s.end === b.services[i].end)
}

export interface ScheduleGroup {
  dayLabel: string
  schedule: DaySchedule
}

/** Agrupa días consecutivos con el mismo horario (p. ej. "Martes – Domingo"). */
export function groupWeeklySchedule(
  schedule: Record<Weekday, DaySchedule>,
  locale: Locale,
): ScheduleGroup[] {
  const groups: ScheduleGroup[] = []
  let i = 0

  while (i < WEEKDAYS.length) {
    const day = WEEKDAYS[i]
    const daySchedule = schedule[day]
    let j = i
    while (j + 1 < WEEKDAYS.length && sameSchedule(schedule[WEEKDAYS[j + 1]], daySchedule)) {
      j++
    }
    const startLabel = weekdayShortLabels[day][locale]
    const endLabel = weekdayShortLabels[WEEKDAYS[j]][locale]
    const dayLabel = i === j ? startLabel : `${startLabel}–${endLabel}`
    groups.push({ dayLabel, schedule: daySchedule })
    i = j + 1
  }

  return groups
}

export function formatServicePeriod(
  service: { label: { es: string; en: string }; start: string; end: string },
  locale: Locale,
) {
  return `${service.label[locale]} ${service.start}–${service.end}`
}

const closedLabel: Record<Locale, string> = { es: 'Cerrado', en: 'Closed' }

export function formatDayServices(schedule: DaySchedule, locale: Locale) {
  if (schedule.closed) return closedLabel[locale]
  return schedule.services.map((s) => formatServicePeriod(s, locale)).join(' · ')
}
