import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDocumentHead } from '@/hooks/useDocumentHead'
import { useLanguage } from '@/i18n/LanguageContext'
import { useReservationByToken } from '@/hooks/useReservationByToken'
import { reservationService } from '@/services/reservationService'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { Hanko } from '@/components/ui/Hanko'
import { ManageLoading, ManageNotFound } from '@/components/reservation/ManageStates'
import { ReservationCard } from '@/components/reservation/ReservationCard'

export default function CancelReservationPage() {
  const { token } = useParams<{ token: string }>()
  const { t } = useLanguage()
  const c = t.manage.cancel
  useDocumentHead({ title: c.title })

  const { reservation, isLoading, notFound, reload } = useReservationByToken(token)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [justCancelled, setJustCancelled] = useState(false)

  async function handleCancel() {
    if (!token) return
    setIsSubmitting(true)
    try {
      await reservationService.updateStatus(token, 'cancelled')
      setJustCancelled(true)
      reload()
    } finally {
      setIsSubmitting(false)
    }
  }

  const wasAlreadyCancelled = reservation?.status === 'cancelled' && !justCancelled

  return (
    <Section className="min-h-[60vh]">
      {isLoading ? (
        <ManageLoading />
      ) : notFound || !reservation ? (
        <ManageNotFound />
      ) : (
        <div className="mx-auto max-w-lg text-center">
          <Hanko className="mx-auto h-9 w-9 text-accent" />

          {wasAlreadyCancelled ? (
            <>
              <h1 className="mt-5 text-3xl">{c.alreadyTitle}</h1>
              <p className="mt-3 text-ink-soft">{c.alreadyText}</p>
            </>
          ) : justCancelled ? (
            <>
              <h1 className="mt-5 text-3xl">{c.successTitle}</h1>
              <p className="mt-3 text-ink-soft">{c.successText}</p>
            </>
          ) : (
            <>
              <SectionHeading kicker={c.kicker} title={c.title} align="center" />
              <p className="mt-3 text-ink-soft">{c.text}</p>
            </>
          )}

          <div className="mt-8">
            <ReservationCard reservation={reservation} />
          </div>

          {reservation.status !== 'cancelled' && !justCancelled && (
            <Button className="mt-8" variant="outline" onClick={handleCancel} disabled={isSubmitting}>
              {c.button}
            </Button>
          )}

          <div className="mt-8">
            <Button to="/" variant="primary">
              {t.manage.backHome}
            </Button>
          </div>
        </div>
      )}
    </Section>
  )
}
