import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDocumentHead } from '@/hooks/useDocumentHead'
import { useLanguage } from '@/i18n/LanguageContext'
import { useReservationByToken } from '@/hooks/useReservationByToken'
import { reservationService, ReservationError } from '@/services/reservationService'
import { fromISODate, toISODate } from '@/lib/date'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { ManageLoading, ManageNotFound } from '@/components/reservation/ManageStates'
import { ReservationCard } from '@/components/reservation/ReservationCard'
import { PartySizeStep } from '@/components/reservation/PartySizeStep'
import { DateStep } from '@/components/reservation/DateStep'
import { TimeStep } from '@/components/reservation/TimeStep'

export default function ModifyReservationPage() {
  const { token } = useParams<{ token: string }>()
  const { t } = useLanguage()
  const c = t.manage.modify
  useDocumentHead({ title: c.title })

  const { reservation, isLoading, notFound, reload } = useReservationByToken(token)

  const [partySize, setPartySize] = useState<number | null>(null)
  const [date, setDate] = useState<Date | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [justSaved, setJustSaved] = useState(false)

  useEffect(() => {
    if (!reservation) return
    setPartySize(reservation.partySize)
    setDate(fromISODate(reservation.date))
    setTime(reservation.time)
  }, [reservation])

  async function handleSave() {
    if (!token || !date || !time || !partySize) return
    setIsSubmitting(true)
    setErrorMessage(null)
    try {
      await reservationService.rescheduleReservation(token, {
        date: toISODate(date),
        time,
        partySize,
      })
      setJustSaved(true)
      reload()
    } catch (err) {
      setErrorMessage(err instanceof ReservationError ? err.message : c.errorGeneric)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Section className="min-h-[60vh]">
      {isLoading ? (
        <ManageLoading />
      ) : notFound || !reservation ? (
        <ManageNotFound />
      ) : reservation.status === 'cancelled' ? (
        <div className="mx-auto max-w-lg text-center">
          <SectionHeading kicker={c.kicker} title={c.title} align="center" />
          <p className="mt-6 border border-line-soft bg-paper-soft px-5 py-4 text-sm text-ink-soft">
            {c.blockedCancelled}
          </p>
          <Button to="/reservas" className="mt-8">
            {t.nav.reservations}
          </Button>
        </div>
      ) : justSaved ? (
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-3xl">{c.successTitle}</h1>
          <p className="mt-3 text-ink-soft">{c.successText}</p>
          <div className="mt-8">
            <ReservationCard reservation={reservation} />
          </div>
          <Button to="/" variant="outline" className="mt-8">
            {t.manage.backHome}
          </Button>
        </div>
      ) : (
        <div className="mx-auto max-w-2xl">
          <SectionHeading kicker={c.kicker} title={c.title} description={c.text} />

          <div className="mt-10 space-y-12">
            <PartySizeStep value={partySize} onSelect={setPartySize} />
            <DateStep
              selected={date}
              onSelect={(d) => {
                setDate(d)
                setTime(null)
              }}
            />
            {date && partySize && (
              <TimeStep date={date} partySize={partySize} selected={time} onSelect={setTime} />
            )}
          </div>

          {errorMessage && (
            <p className="mt-6 border border-accent bg-accent-soft/40 px-5 py-4 text-sm text-accent-dark">
              {errorMessage}
            </p>
          )}

          <Button
            className="mt-10"
            onClick={handleSave}
            disabled={isSubmitting || !date || !time || !partySize}
          >
            {isSubmitting ? c.submitting : c.submit}
          </Button>
        </div>
      )}
    </Section>
  )
}
