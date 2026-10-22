import { useLanguage } from '@/i18n/LanguageContext'
import { addDays, formatDateLong, startOfDay, toISODate } from '@/lib/date'

export function DateNav({ date, onChange }: { date: Date; onChange: (date: Date) => void }) {
  const { t, locale } = useLanguage()

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(addDays(date, -1))}
        aria-label="Día anterior"
        className="flex h-9 w-9 items-center justify-center border border-line text-ink hover:border-accent hover:text-accent"
      >
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true">
          <path d="M7 1L1 7l6 6" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </button>

      <input
        type="date"
        value={toISODate(date)}
        onChange={(e) => e.target.value && onChange(new Date(`${e.target.value}T00:00:00`))}
        className="border border-line bg-paper px-3 py-2 text-sm text-ink"
      />

      <button
        type="button"
        onClick={() => onChange(addDays(date, 1))}
        aria-label="Día siguiente"
        className="flex h-9 w-9 items-center justify-center border border-line text-ink hover:border-accent hover:text-accent"
      >
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true">
          <path d="M1 1l6 6-6 6" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => onChange(startOfDay(new Date()))}
        className="border border-line px-3 py-2 text-xs tracking-widest text-ink-soft uppercase hover:border-accent hover:text-accent"
      >
        {t.admin.reservations.today}
      </button>

      <span className="text-sm text-ink-soft capitalize">{formatDateLong(date, locale)}</span>
    </div>
  )
}
