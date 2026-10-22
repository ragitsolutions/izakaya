import { useLanguage } from '@/i18n/LanguageContext'
import { Calendar } from './Calendar'

export function DateStep({
  selected,
  onSelect,
}: {
  selected: Date | null
  onSelect: (date: Date) => void
}) {
  const { t } = useLanguage()

  return (
    <div>
      <h2 className="text-2xl">{t.reservation.date.question}</h2>
      <div className="mt-8">
        <Calendar selected={selected} onSelect={onSelect} />
      </div>
    </div>
  )
}
