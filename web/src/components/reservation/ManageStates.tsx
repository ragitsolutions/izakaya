import { useLanguage } from '@/i18n/LanguageContext'
import { Button } from '@/components/ui/Button'
import { Hanko } from '@/components/ui/Hanko'

export function ManageLoading() {
  const { t } = useLanguage()
  return <p className="text-center text-sm text-ink-soft">{t.manage.loading}</p>
}

export function ManageNotFound() {
  const { t } = useLanguage()
  return (
    <div className="mx-auto max-w-md text-center">
      <Hanko className="mx-auto h-9 w-9 text-accent" />
      <h1 className="mt-5 text-2xl">{t.manage.notFoundTitle}</h1>
      <p className="mt-3 text-ink-soft">{t.manage.notFoundText}</p>
      <Button to="/" variant="outline" className="mt-7">
        {t.manage.backHome}
      </Button>
    </div>
  )
}
