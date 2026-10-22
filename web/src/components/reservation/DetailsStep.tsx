import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '@/i18n/LanguageContext'
import { zoneLabels } from '@/config/tables.config'
import { isValidEmail, isValidPhone } from '@/lib/validation'
import type { Zone } from '@/types/reservation'
import type { ReservationDetails } from '@/types/reservationForm'

const ZONES: Zone[] = ['table', 'bar', 'terrace']

export function DetailsStep({
  value,
  onChange,
}: {
  value: ReservationDetails
  onChange: (patch: Partial<ReservationDetails>) => void
}) {
  const { t, pick } = useLanguage()
  const [touched, setTouched] = useState({ email: false, phone: false })

  const emailHasError = touched.email && value.email.trim() !== '' && !isValidEmail(value.email)
  const phoneHasError = touched.phone && value.phone.trim() !== '' && !isValidPhone(value.phone)

  return (
    <div>
      <h2 className="text-2xl">{t.reservation.details.question}</h2>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-ink-soft">{t.reservation.details.name}</span>
          <input
            type="text"
            value={value.name}
            onChange={(e) => onChange({ name: e.target.value })}
            autoComplete="name"
            className="mt-1.5 w-full border border-line bg-paper px-3 py-2.5 text-ink"
          />
        </label>

        <label className="block text-sm">
          <span className="text-ink-soft">
            {t.reservation.details.email} <span aria-hidden="true">*</span>
          </span>
          <input
            type="email"
            required
            value={value.email}
            onChange={(e) => onChange({ email: e.target.value })}
            onBlur={() => setTouched((s) => ({ ...s, email: true }))}
            autoComplete="email"
            aria-invalid={emailHasError}
            className={`mt-1.5 w-full border bg-paper px-3 py-2.5 text-ink ${
              emailHasError ? 'border-accent' : 'border-line'
            }`}
          />
          {emailHasError && (
            <span className="mt-1.5 block text-xs text-accent">{t.reservation.details.emailError}</span>
          )}
        </label>

        <label className="block text-sm">
          <span className="text-ink-soft">{t.reservation.details.phone}</span>
          <input
            type="tel"
            value={value.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            onBlur={() => setTouched((s) => ({ ...s, phone: true }))}
            autoComplete="tel"
            aria-invalid={phoneHasError}
            className={`mt-1.5 w-full border bg-paper px-3 py-2.5 text-ink ${
              phoneHasError ? 'border-accent' : 'border-line'
            }`}
          />
          {phoneHasError && (
            <span className="mt-1.5 block text-xs text-accent">{t.reservation.details.phoneError}</span>
          )}
        </label>

        <fieldset className="text-sm">
          <legend className="text-ink-soft">{t.reservation.details.zone}</legend>
          <div className="mt-1.5 flex gap-2">
            {ZONES.map((zone) => (
              <button
                key={zone}
                type="button"
                onClick={() => onChange({ zonePreference: zone })}
                aria-pressed={value.zonePreference === zone}
                className={`flex-1 border px-3 py-2.5 text-sm transition-colors ${
                  value.zonePreference === zone
                    ? 'border-accent bg-accent text-paper'
                    : 'border-line text-ink hover:border-accent'
                }`}
              >
                {pick(zoneLabels[zone])}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="block text-sm sm:col-span-2">
          <span className="text-ink-soft">{t.reservation.details.notes}</span>
          <textarea
            value={value.notes}
            onChange={(e) => onChange({ notes: e.target.value })}
            placeholder={t.reservation.details.notesPlaceholder}
            rows={3}
            className="mt-1.5 w-full border border-line bg-paper px-3 py-2.5 text-ink"
          />
        </label>
      </div>

      <label className="mt-6 flex items-start gap-3 text-sm text-ink-soft">
        <input
          type="checkbox"
          required
          checked={value.privacyAccepted}
          onChange={(e) => onChange({ privacyAccepted: e.target.checked })}
          className="mt-0.5 accent-accent"
        />
        <span>
          {t.reservation.details.privacyLabel}{' '}
          <Link to="/legal/privacidad" target="_blank" className="text-accent underline">
            {t.reservation.details.privacyLink}
          </Link>
          <span aria-hidden="true"> *</span>
        </span>
      </label>
    </div>
  )
}
