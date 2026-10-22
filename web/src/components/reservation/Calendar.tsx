import { useState } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import { reservationConfig } from '@/config/reservation.config'
import { addDays, formatMonthYear, isSameDay, startOfDay } from '@/lib/date'
import { isDateBookable } from '@/services/reservationService'

const WEEKDAY_HEADER: Record<'es' | 'en', string[]> = {
  es: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
  en: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function addMonths(date: Date, n: number) {
  return new Date(date.getFullYear(), date.getMonth() + n, 1)
}

/** Lunes=0 ... Domingo=6, para pintar la semana empezando en lunes. */
function mondayIndex(date: Date) {
  return (date.getDay() + 6) % 7
}

export function Calendar({
  selected,
  onSelect,
}: {
  selected: Date | null
  onSelect: (date: Date) => void
}) {
  const { locale } = useLanguage()
  const today = startOfDay(new Date())
  const maxDate = addDays(today, reservationConfig.bookingWindowDays)
  const [viewMonth, setViewMonth] = useState(() => startOfMonth(selected ?? today))

  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate()
  const leadingBlanks = mondayIndex(viewMonth)
  const cells: (Date | null)[] = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(viewMonth.getFullYear(), viewMonth.getMonth(), i + 1)),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  const canGoPrev = startOfMonth(today) < viewMonth
  const canGoNext = startOfMonth(maxDate) > viewMonth

  return (
    <div className="max-w-sm">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setViewMonth((m) => addMonths(m, -1))}
          disabled={!canGoPrev}
          aria-label="Mes anterior"
          className="flex h-9 w-9 items-center justify-center text-ink disabled:opacity-25"
        >
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true">
            <path d="M7 1L1 7l6 6" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>
        <p className="text-sm tracking-wide text-ink capitalize">{formatMonthYear(viewMonth, locale)}</p>
        <button
          type="button"
          onClick={() => setViewMonth((m) => addMonths(m, 1))}
          disabled={!canGoNext}
          aria-label="Mes siguiente"
          className="flex h-9 w-9 items-center justify-center text-ink disabled:opacity-25"
        >
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true">
            <path d="M1 1l6 6-6 6" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs text-ink-soft">
        {WEEKDAY_HEADER[locale].map((d, i) => (
          <span key={`${d}-${i}`}>{d}</span>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <span key={`blank-${i}`} />
          const bookable = isDateBookable(date)
          const isSelected = selected && isSameDay(date, selected)

          return (
            <button
              key={date.toISOString()}
              type="button"
              disabled={!bookable}
              onClick={() => onSelect(date)}
              aria-pressed={Boolean(isSelected)}
              aria-current={isSameDay(date, today) ? 'date' : undefined}
              className={`aspect-square text-sm transition-colors ${
                isSelected
                  ? 'bg-accent text-paper'
                  : bookable
                    ? 'text-ink hover:bg-paper-soft'
                    : 'text-ink-soft/40 line-through'
              }`}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
