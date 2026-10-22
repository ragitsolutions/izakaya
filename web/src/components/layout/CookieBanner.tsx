import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '@/i18n/LanguageContext'
import { useCookieConsent } from '@/hooks/CookieConsentContext'
import { Button } from '@/components/ui/Button'

export function CookieBanner() {
  const { t } = useLanguage()
  const [consent, setConsent] = useCookieConsent()
  const [isConfiguring, setIsConfiguring] = useState(false)
  const [analyticsDraft, setAnalyticsDraft] = useState(false)

  if (consent) return null

  const decide = (analytics: boolean) => {
    setConsent({ necessary: true, analytics, decidedAt: new Date().toISOString() })
    setIsConfiguring(false)
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-line bg-paper/98 px-6 py-5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur sm:px-8"
      role="dialog"
      aria-live="polite"
      aria-label={t.cookieBanner.settingsTitle}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {!isConfiguring ? (
          <>
            <p className="max-w-2xl text-sm text-ink-soft">
              {t.cookieBanner.message}{' '}
              <Link to="/legal/cookies" className="underline hover:text-accent">
                {t.cookieBanner.readMore}
              </Link>
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="ghost" className="px-4 normal-case" onClick={() => setIsConfiguring(true)}>
                {t.cookieBanner.configure}
              </Button>
              <Button variant="outline" className="px-5" onClick={() => decide(false)}>
                {t.cookieBanner.rejectAll}
              </Button>
              <Button variant="primary" className="px-5" onClick={() => decide(true)}>
                {t.cookieBanner.acceptAll}
              </Button>
            </div>
          </>
        ) : (
          <div className="w-full">
            <h2 className="font-display text-lg text-ink">{t.cookieBanner.settingsTitle}</h2>
            <p className="mt-2 max-w-2xl text-sm text-ink-soft">{t.cookieBanner.settingsIntro}</p>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-6">
              <label className="flex items-start gap-3 rounded border border-line-soft p-4 text-sm">
                <input type="checkbox" checked disabled className="mt-0.5 accent-accent" />
                <span>
                  <span className="block font-medium text-ink">{t.cookieBanner.necessary}</span>
                  <span className="text-ink-soft">{t.cookieBanner.necessaryDesc}</span>
                </span>
              </label>
              <label className="flex items-start gap-3 rounded border border-line-soft p-4 text-sm">
                <input
                  type="checkbox"
                  checked={analyticsDraft}
                  onChange={(e) => setAnalyticsDraft(e.target.checked)}
                  className="mt-0.5 accent-accent"
                />
                <span>
                  <span className="block font-medium text-ink">{t.cookieBanner.analytics}</span>
                  <span className="text-ink-soft">{t.cookieBanner.analyticsDesc}</span>
                </span>
              </label>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Button variant="primary" className="px-5" onClick={() => decide(analyticsDraft)}>
                {t.cookieBanner.save}
              </Button>
              <Button variant="ghost" className="px-4 normal-case" onClick={() => setIsConfiguring(false)}>
                {'←'} {t.cookieBanner.configure}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
