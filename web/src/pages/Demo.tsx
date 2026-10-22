import { useEffect, useState, type ReactNode } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import { useDocumentHead } from '@/hooks/useDocumentHead'
import { reservationService } from '@/services/reservationService'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'

export default function Demo() {
  const { t } = useLanguage()
  const d = t.demo
  useDocumentHead({ title: d.title })

  const [sampleToken, setSampleToken] = useState<string | null | undefined>(undefined)
  const [isResetting, setIsResetting] = useState(false)
  const [justReset, setJustReset] = useState(false)

  function loadSample() {
    reservationService.listReservations().then((all) => {
      const pending = all.find((r) => r.status === 'pending')
      setSampleToken((pending ?? all[0])?.token ?? null)
    })
  }

  useEffect(() => {
    loadSample()
  }, [])

  async function handleReset() {
    setIsResetting(true)
    setJustReset(false)
    try {
      await reservationService.resetDemoData()
      setSampleToken(undefined)
      loadSample()
      setJustReset(true)
    } finally {
      setIsResetting(false)
    }
  }

  return (
    <Section>
      <SectionHeading kicker={d.badge} title={d.title} description={d.intro} />

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <DemoCard title={d.bookingTitle} text={d.bookingText}>
          <Button to="/reservas">{d.bookingCta}</Button>
        </DemoCard>

        <DemoCard title={d.menuTitle} text={d.menuText}>
          <Button to="/carta" variant="outline">
            {d.menuCta}
          </Button>
        </DemoCard>

        <DemoCard title={d.sampleTitle} text={d.sampleText}>
          {sampleToken === undefined ? null : sampleToken === null ? (
            <p className="text-sm text-ink-soft">{d.sampleNone}</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              <Button to={`/reserva/${sampleToken}/confirmar`} variant="outline" className="text-xs">
                {d.sampleConfirm}
              </Button>
              <Button to={`/reserva/${sampleToken}/cancelar`} variant="outline" className="text-xs">
                {d.sampleCancel}
              </Button>
              <Button to={`/reserva/${sampleToken}/modificar`} variant="outline" className="text-xs">
                {d.sampleModify}
              </Button>
            </div>
          )}
        </DemoCard>

        <DemoCard title={d.adminTitle} text={d.adminText}>
          <Button to="/admin" variant="outline">
            {d.adminCta}
          </Button>
        </DemoCard>
      </div>

      <div className="mt-10 border border-line-soft bg-paper-soft p-6">
        <h2 className="text-lg text-ink">{d.resetTitle}</h2>
        <p className="mt-1.5 text-sm text-ink-soft">{d.resetText}</p>
        <div className="mt-4 flex items-center gap-4">
          <Button type="button" variant="outline" onClick={handleReset} disabled={isResetting}>
            {d.resetCta}
          </Button>
          {justReset && <span className="text-sm text-ink-soft">{d.resetDone}</span>}
        </div>
      </div>
    </Section>
  )
}

function DemoCard({ title, text, children }: { title: string; text: string; children: ReactNode }) {
  return (
    <div className="border border-line-soft p-6">
      <h2 className="text-lg text-ink">{title}</h2>
      <p className="mt-1.5 mb-4 text-sm text-ink-soft">{text}</p>
      {children}
    </div>
  )
}
