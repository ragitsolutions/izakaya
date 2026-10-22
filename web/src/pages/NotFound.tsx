import { useDocumentHead } from '@/hooks/useDocumentHead'
import { useLanguage } from '@/i18n/LanguageContext'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Hanko } from '@/components/ui/Hanko'

export default function NotFound() {
  const { t } = useLanguage()
  useDocumentHead({ title: t.notFound.title })

  return (
    <Section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <Hanko className="h-10 w-10 text-accent" />
      <p className="mt-6 font-display text-6xl text-ink-soft">404</p>
      <h1 className="mt-3 text-3xl">{t.notFound.title}</h1>
      <p className="mt-3 max-w-md text-ink-soft">{t.notFound.text}</p>
      <Button to="/" variant="outline" className="mt-8">
        {t.cta.backHome}
      </Button>
    </Section>
  )
}
