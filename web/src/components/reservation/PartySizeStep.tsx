import { useState } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import { siteConfig } from '@/config/site.config'
import { reservationConfig } from '@/config/reservation.config'

export function PartySizeStep({
  value,
  onSelect,
}: {
  value: number | null
  onSelect: (size: number) => void
}) {
  const { t } = useLanguage()
  const [showCallMessage, setShowCallMessage] = useState(false)
  const options = Array.from({ length: reservationConfig.maxPartySizeOnline }, (_, i) => i + 1)

  return (
    <div>
      <h2 className="text-2xl">{t.reservation.partySize.question}</h2>

      <div className="mt-8 grid grid-cols-4 gap-3 sm:grid-cols-7">
        {options.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => {
              setShowCallMessage(false)
              onSelect(size)
            }}
            aria-pressed={value === size}
            className={`flex aspect-square flex-col items-center justify-center border text-lg transition-colors ${
              value === size
                ? 'border-accent bg-accent text-paper'
                : 'border-line text-ink hover:border-accent hover:text-accent'
            }`}
          >
            {size}
          </button>
        ))}

        <button
          type="button"
          onClick={() => setShowCallMessage(true)}
          aria-pressed={showCallMessage}
          className={`col-span-2 flex aspect-square flex-col items-center justify-center border text-sm transition-colors sm:col-span-1 ${
            showCallMessage
              ? 'border-accent bg-accent text-paper'
              : 'border-line text-ink hover:border-accent hover:text-accent'
          }`}
        >
          {t.reservation.partySize.moreThan}
        </button>
      </div>

      {showCallMessage && (
        <p className="mt-6 border border-accent-soft bg-accent-soft/40 px-5 py-4 text-sm text-ink">
          {t.reservation.partySize.moreThanMessage}{' '}
          <a href={`tel:${siteConfig.phone.e164}`} className="font-medium text-accent hover:underline">
            {siteConfig.phone.display}
          </a>
        </p>
      )}
    </div>
  )
}
