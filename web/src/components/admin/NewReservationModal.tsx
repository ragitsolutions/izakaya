import { useState } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import { zoneLabels } from '@/config/tables.config'
import { toISODate } from '@/lib/date'
import { reservationService, ReservationError } from '@/services/reservationService'
import { emailService } from '@/services/emailService'
import type { Zone } from '@/types/reservation'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { PartySizeStep } from '@/components/reservation/PartySizeStep'
import { DateStep } from '@/components/reservation/DateStep'
import { TimeStep } from '@/components/reservation/TimeStep'

const ZONES: Zone[] = ['table', 'bar', 'terrace']

export function NewReservationModal({
  initialDate,
  onClose,
  onCreated,
}: {
  initialDate: Date
  onClose: () => void
  onCreated: () => void
}) {
  const { t, locale, pick } = useLanguage()
  const f = t.admin.newReservation

  const [partySize, setPartySize] = useState<number | null>(2)
  const [date, setDate] = useState<Date | null>(initialDate)
  const [time, setTime] = useState<string | null>(null)
  const [zone, setZone] = useState<Zone>('table')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit() {
    if (!partySize || !date || !time || !name || !phone) return
    setIsSubmitting(true)
    setError(null)
    try {
      const reservation = await reservationService.createReservation({
        date: toISODate(date),
        time,
        partySize,
        zonePreference: zone,
        customer: { name, phone, email, notes },
        createdByAdmin: true,
      })
      if (email) void emailService.sendClientConfirmation(reservation, locale)
      onCreated()
    } catch (err) {
      setError(err instanceof ReservationError ? err.message : 'Error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal title={f.title} onClose={onClose} wide>
      <p className="text-sm text-ink-soft">{f.subtitle}</p>

      <div className="mt-6 space-y-8">
        <PartySizeStep value={partySize} onSelect={setPartySize} />
        <DateStep
          selected={date}
          onSelect={(d) => {
            setDate(d)
            setTime(null)
          }}
        />
        {date && partySize && <TimeStep date={date} partySize={partySize} selected={time} onSelect={setTime} />}

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="text-ink-soft">{t.reservation.details.name}</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5 w-full border border-line bg-paper px-3 py-2.5 text-ink"
            />
          </label>
          <label className="block text-sm">
            <span className="text-ink-soft">{t.reservation.details.phone}</span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1.5 w-full border border-line bg-paper px-3 py-2.5 text-ink"
            />
          </label>
          <label className="block text-sm">
            <span className="text-ink-soft">{t.reservation.details.email}</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full border border-line bg-paper px-3 py-2.5 text-ink"
            />
          </label>
          <fieldset className="text-sm">
            <legend className="text-ink-soft">{t.reservation.details.zone}</legend>
            <div className="mt-1.5 flex gap-2">
              {ZONES.map((z) => (
                <button
                  key={z}
                  type="button"
                  onClick={() => setZone(z)}
                  aria-pressed={zone === z}
                  className={`flex-1 border px-3 py-2.5 text-sm transition-colors ${
                    zone === z ? 'border-accent bg-accent text-paper' : 'border-line text-ink hover:border-accent'
                  }`}
                >
                  {pick(zoneLabels[z])}
                </button>
              ))}
            </div>
          </fieldset>
          <label className="block text-sm sm:col-span-2">
            <span className="text-ink-soft">{t.reservation.details.notes}</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="mt-1.5 w-full border border-line bg-paper px-3 py-2.5 text-ink"
            />
          </label>
        </div>

        {error && <p className="border border-accent bg-accent-soft/40 px-4 py-3 text-sm text-accent-dark">{error}</p>}

        <div className="flex gap-3">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !partySize || !date || !time || !name || !phone}
          >
            {f.submit}
          </Button>
          <Button variant="ghost" className="normal-case" onClick={onClose}>
            {f.cancel}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
