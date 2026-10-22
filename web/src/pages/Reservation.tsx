import { useState } from 'react'
import { useDocumentHead } from '@/hooks/useDocumentHead'
import { useLanguage } from '@/i18n/LanguageContext'
import { reservationService, ReservationError } from '@/services/reservationService'
import { emailService } from '@/services/emailService'
import { toISODate } from '@/lib/date'
import { isValidEmail, isValidPhone } from '@/lib/validation'
import type { Reservation } from '@/types/reservation'
import { emptyReservationDetails, type ReservationDetails } from '@/types/reservationForm'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { StepIndicator } from '@/components/reservation/StepIndicator'
import { PartySizeStep } from '@/components/reservation/PartySizeStep'
import { DateStep } from '@/components/reservation/DateStep'
import { TimeStep } from '@/components/reservation/TimeStep'
import { DetailsStep } from '@/components/reservation/DetailsStep'
import { SummaryStep } from '@/components/reservation/SummaryStep'
import { ConfirmationScreen } from '@/components/reservation/ConfirmationScreen'

export default function Reservation() {
  const { t, locale } = useLanguage()
  useDocumentHead({ title: t.reservation.title, description: t.reservation.description })

  const [step, setStep] = useState(1)
  const [partySize, setPartySize] = useState<number | null>(null)
  const [date, setDate] = useState<Date | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [details, setDetails] = useState<ReservationDetails>(emptyReservationDetails)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null)

  const canContinue: Record<number, boolean> = {
    1: partySize !== null,
    2: date !== null,
    3: time !== null,
    4:
      details.email.trim() !== '' &&
      isValidEmail(details.email) &&
      (details.phone.trim() === '' || isValidPhone(details.phone)) &&
      details.privacyAccepted,
  }

  function goTo(nextStep: number) {
    setStep(nextStep)
    window.scrollTo({ top: window.scrollY, behavior: 'instant' as ScrollBehavior })
  }

  async function handleSubmit() {
    if (!partySize || !date || !time) return
    setIsSubmitting(true)
    setErrorMessage(null)
    try {
      const reservation = await reservationService.createReservation({
        date: toISODate(date),
        time,
        partySize,
        zonePreference: details.zonePreference,
        customer: {
          name: details.name,
          email: details.email,
          phone: details.phone,
          notes: details.notes,
        },
      })
      void emailService.sendClientConfirmation(reservation, locale)
      void emailService.sendRestaurantNotification(reservation)
      setConfirmedReservation(reservation)
    } catch (err) {
      setErrorMessage(
        err instanceof ReservationError ? err.message : t.reservation.summary.errorGeneric,
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (confirmedReservation) {
    return (
      <Section>
        <ConfirmationScreen reservation={confirmedReservation} />
      </Section>
    )
  }

  return (
    <Section>
      <SectionHeading
        kicker={t.reservation.kicker}
        title={t.reservation.title}
        description={t.reservation.description}
      />

      <div className="mt-10 max-w-sm">
        <StepIndicator step={step} />
      </div>

      <div className="mt-12 max-w-2xl">
        {step === 1 && (
          <PartySizeStep
            value={partySize}
            onSelect={(size) => {
              setPartySize(size)
              setTime(null)
            }}
          />
        )}

        {step === 2 && (
          <DateStep
            selected={date}
            onSelect={(d) => {
              setDate(d)
              setTime(null)
            }}
          />
        )}

        {step === 3 && date && partySize && (
          <TimeStep date={date} partySize={partySize} selected={time} onSelect={setTime} />
        )}

        {step === 4 && (
          <DetailsStep value={details} onChange={(patch) => setDetails((d) => ({ ...d, ...patch }))} />
        )}

        {step === 5 && date && time && partySize && (
          <SummaryStep
            partySize={partySize}
            date={date}
            time={time}
            details={details}
            onEditStep={goTo}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            errorMessage={errorMessage}
          />
        )}

        {step < 5 && (
          <div className="mt-10 flex items-center justify-between">
            <Button
              type="button"
              variant="ghost"
              className="px-0 normal-case"
              disabled={step === 1}
              onClick={() => goTo(step - 1)}
            >
              {'←'} {t.reservation.back}
            </Button>
            <Button
              type="button"
              variant="primary"
              disabled={!canContinue[step]}
              onClick={() => goTo(step + 1)}
            >
              {t.reservation.continue}
            </Button>
          </div>
        )}

        {step === 5 && (
          <button
            type="button"
            onClick={() => goTo(4)}
            className="mt-6 text-sm text-ink-soft hover:text-ink"
          >
            {'←'} {t.reservation.back}
          </button>
        )}
      </div>
    </Section>
  )
}
