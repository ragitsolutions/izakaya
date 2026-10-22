import { useState } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import { weekdayLabels, type DaySchedule } from '@/config/hours.config'
import { settingsService } from '@/services/settingsService'
import { WEEKDAYS, type Weekday } from '@/types/common'
import { Button } from '@/components/ui/Button'

export function HoursSettings() {
  const { t, pick } = useLanguage()
  const s = t.admin.settings
  const [schedule, setSchedule] = useState(() => settingsService.getSchedule())
  const [saved, setSaved] = useState(false)

  function updateDay(day: Weekday, patch: Partial<DaySchedule>) {
    setSchedule((prev) => ({ ...prev, [day]: { ...prev[day], ...patch } }))
    setSaved(false)
  }

  function updateService(day: Weekday, index: number, field: 'start' | 'end', value: string) {
    const services = schedule[day].services.map((svc, i) => (i === index ? { ...svc, [field]: value } : svc))
    updateDay(day, { services })
  }

  function addService(day: Weekday) {
    const services = [
      ...schedule[day].services,
      { label: { es: 'Servicio', en: 'Service' }, start: '12:00', end: '15:00' },
    ]
    updateDay(day, { services })
  }

  function removeService(day: Weekday, index: number) {
    updateDay(day, { services: schedule[day].services.filter((_, i) => i !== index) })
  }

  function save() {
    settingsService.setSchedule(schedule)
    setSaved(true)
  }

  return (
    <section className="border border-line bg-paper p-6">
      <h2 className="font-display text-lg text-ink">{s.hoursTitle}</h2>
      <p className="mt-1.5 text-sm text-ink-soft">{s.hoursIntro}</p>

      <div className="mt-5 space-y-5">
        {WEEKDAYS.map((day) => (
          <div key={day} className="border-t border-line-soft pt-4 first:border-t-0 first:pt-0">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="w-28 text-sm text-ink">{pick(weekdayLabels[day])}</span>
              <label className="flex items-center gap-2 text-xs text-ink-soft uppercase">
                <input
                  type="checkbox"
                  checked={schedule[day].closed}
                  onChange={(e) => updateDay(day, { closed: e.target.checked })}
                  className="accent-accent"
                />
                {s.closedToggle}
              </label>
            </div>

            {!schedule[day].closed && (
              <div className="mt-3 space-y-2">
                {schedule[day].services.map((service, i) => (
                  <div key={i} className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="w-20 text-ink-soft">{pick(service.label)}</span>
                    <label className="flex items-center gap-1.5">
                      <span className="text-xs text-ink-soft">{s.serviceStart}</span>
                      <input
                        type="time"
                        value={service.start}
                        onChange={(e) => updateService(day, i, 'start', e.target.value)}
                        className="border border-line bg-paper px-2 py-1.5 text-ink"
                      />
                    </label>
                    <label className="flex items-center gap-1.5">
                      <span className="text-xs text-ink-soft">{s.serviceEnd}</span>
                      <input
                        type="time"
                        value={service.end}
                        onChange={(e) => updateService(day, i, 'end', e.target.value)}
                        className="border border-line bg-paper px-2 py-1.5 text-ink"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => removeService(day, i)}
                      className="text-xs tracking-widest text-accent uppercase hover:underline"
                    >
                      {s.removeService}
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addService(day)}
                  className="text-xs tracking-widest text-accent uppercase hover:underline"
                >
                  + {s.addService}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <Button className="px-4 py-2 text-xs" onClick={save}>
          {s.save}
        </Button>
        {saved && <span className="text-sm text-ink-soft">{s.saved}</span>}
      </div>
    </section>
  )
}
