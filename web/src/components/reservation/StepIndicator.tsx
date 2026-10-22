import { useLanguage } from '@/i18n/LanguageContext'

export function StepIndicator({ step }: { step: number }) {
  const { t } = useLanguage()
  const labels = [
    t.reservation.steps.partySize,
    t.reservation.steps.date,
    t.reservation.steps.time,
    t.reservation.steps.details,
    t.reservation.steps.summary,
  ]

  return (
    <ol className="flex items-center justify-between gap-1 sm:gap-2">
      {labels.map((label, i) => {
        const index = i + 1
        const isActive = index === step
        const isDone = index < step

        return (
          <li key={label} className="flex flex-1 items-center gap-1 sm:gap-2">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs ${
                  isActive
                    ? 'border-accent bg-accent text-paper'
                    : isDone
                      ? 'border-accent text-accent'
                      : 'border-line text-ink-soft'
                }`}
              >
                {index}
              </span>
              <span
                className={`hidden text-xs tracking-wide uppercase sm:inline ${
                  isActive ? 'text-ink' : 'text-ink-soft'
                }`}
              >
                {label}
              </span>
            </div>
            {index < labels.length && (
              <span className={`h-px flex-1 ${isDone ? 'bg-accent' : 'bg-line'}`} aria-hidden="true" />
            )}
          </li>
        )
      })}
    </ol>
  )
}
