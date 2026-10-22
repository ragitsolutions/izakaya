import { useState } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import { settingsService, type BlockedDate } from '@/services/settingsService'
import { fromISODate, formatDateLong, toISODate, addDays, startOfDay } from '@/lib/date'
import { Button } from '@/components/ui/Button'

export function BlockedDatesSettings() {
  const { t, locale } = useLanguage()
  const s = t.admin.settings
  const [blocked, setBlocked] = useState<BlockedDate[]>(() => settingsService.getBlockedDates())
  const [date, setDate] = useState(() => toISODate(addDays(startOfDay(new Date()), 1)))
  const [reason, setReason] = useState('')

  function add() {
    if (!date) return
    settingsService.addBlockedDate(date, reason.trim())
    setBlocked(settingsService.getBlockedDates())
    setReason('')
  }

  function remove(d: string) {
    settingsService.removeBlockedDate(d)
    setBlocked(settingsService.getBlockedDates())
  }

  return (
    <section className="border border-line bg-paper p-6">
      <h2 className="font-display text-lg text-ink">{s.blockedTitle}</h2>
      <p className="mt-1.5 text-sm text-ink-soft">{s.blockedIntro}</p>

      <div className="mt-5 flex flex-wrap items-end gap-3">
        <label className="text-sm">
          <span className="block text-ink-soft">{s.blockedDateLabel}</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1.5 border border-line bg-paper px-3 py-2 text-ink"
          />
        </label>
        <label className="flex-1 text-sm">
          <span className="block text-ink-soft">{s.blockedReasonLabel}</span>
          <input
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={s.blockedReasonPlaceholder}
            className="mt-1.5 w-full border border-line bg-paper px-3 py-2 text-ink"
          />
        </label>
        <Button className="px-4 py-2 text-xs" onClick={add}>
          {s.blockedAdd}
        </Button>
      </div>

      {blocked.length === 0 ? (
        <p className="mt-5 text-sm text-ink-soft">{s.blockedEmpty}</p>
      ) : (
        <ul className="mt-5 divide-y divide-line-soft border-t border-line-soft">
          {blocked.map((b) => (
            <li key={b.date} className="flex items-center justify-between gap-4 py-3 text-sm">
              <span>
                <span className="text-ink capitalize">{formatDateLong(fromISODate(b.date), locale)}</span>
                {b.reason && <span className="ml-2 text-ink-soft">— {b.reason}</span>}
              </span>
              <button
                type="button"
                onClick={() => remove(b.date)}
                className="text-xs tracking-widest text-accent uppercase hover:underline"
              >
                {s.remove}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
