import { useEffect, useState } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import { formatDateLong } from '@/lib/date'
import { getSlotsByService, reservationService } from '@/services/reservationService'

export function TimeStep({
  date,
  partySize,
  selected,
  onSelect,
}: {
  date: Date
  partySize: number
  selected: string | null
  onSelect: (time: string) => void
}) {
  const { t, locale, pick } = useLanguage()
  const [availableSlots, setAvailableSlots] = useState<string[] | null>(null)

  useEffect(() => {
    let cancelled = false
    setAvailableSlots(null)
    reservationService.getAvailableSlotsForDate(date, partySize).then((slots) => {
      if (!cancelled) setAvailableSlots(slots)
    })
    return () => {
      cancelled = true
    }
  }, [date, partySize])

  const groups = getSlotsByService(date)
  const isLoading = availableSlots === null
  const hasAnyAvailable = availableSlots !== null && availableSlots.length > 0

  return (
    <div>
      <h2 className="text-2xl">{t.reservation.time.question}</h2>
      <p className="mt-1 text-sm text-ink-soft capitalize">{formatDateLong(date, locale)}</p>

      {isLoading ? (
        <p className="mt-8 text-sm text-ink-soft">{t.reservation.time.loading}</p>
      ) : !hasAnyAvailable ? (
        <p className="mt-8 border border-line-soft bg-paper-soft px-5 py-4 text-sm text-ink-soft">
          {t.reservation.time.noSlots}
        </p>
      ) : (
        <div className="mt-8 space-y-8">
          {groups.map((group) => (
            <div key={pick(group.label)}>
              <p className="text-xs tracking-[0.25em] text-accent uppercase">{pick(group.label)}</p>
              <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
                {group.slots.map((time) => {
                  const isAvailable = availableSlots?.includes(time)
                  return (
                    <button
                      key={time}
                      type="button"
                      disabled={!isAvailable}
                      onClick={() => onSelect(time)}
                      aria-pressed={selected === time}
                      className={`border py-2 text-sm transition-colors ${
                        selected === time
                          ? 'border-accent bg-accent text-paper'
                          : isAvailable
                            ? 'border-line text-ink hover:border-accent hover:text-accent'
                            : 'border-line-soft text-ink-soft/40 line-through'
                      }`}
                    >
                      {time}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="mt-6 text-xs text-ink-soft">{t.reservation.time.duration}</p>
    </div>
  )
}
