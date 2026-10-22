import { useLanguage } from '@/i18n/LanguageContext'
import { cookiePolicySections, cookieTable } from '@/data/legal.data'
import { useCookieConsent } from '@/hooks/CookieConsentContext'
import { LegalPageLayout } from '@/components/legal/LegalPageLayout'
import { Button } from '@/components/ui/Button'

export default function Cookies() {
  const { t, pick } = useLanguage()
  const [, setConsent] = useCookieConsent()
  const ct = t.legal.cookieTable

  return (
    <LegalPageLayout title={t.footer.legalLinks.cookies} sections={cookiePolicySections}>
      <div className="mt-10">
        <Button type="button" variant="outline" onClick={() => setConsent(null)}>
          {t.cookieBanner.configure}
        </Button>
      </div>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs tracking-widest text-ink-soft uppercase">
              <th className="py-3 pr-4 font-normal">{ct.name}</th>
              <th className="py-3 pr-4 font-normal">{ct.provider}</th>
              <th className="py-3 pr-4 font-normal">{ct.purpose}</th>
              <th className="py-3 pr-4 font-normal">{ct.duration}</th>
              <th className="py-3 font-normal">{ct.type}</th>
            </tr>
          </thead>
          <tbody>
            {cookieTable.map((row) => (
              <tr key={row.name} className="border-b border-line-soft align-top">
                <td className="py-3 pr-4 font-mono text-xs text-ink">{row.name}</td>
                <td className="py-3 pr-4 text-ink-soft">{row.provider}</td>
                <td className="py-3 pr-4 text-ink-soft">{pick(row.purpose)}</td>
                <td className="py-3 pr-4 text-ink-soft">{pick(row.duration)}</td>
                <td className="py-3 text-ink-soft">{row.type === 'necessary' ? ct.necessary : ct.analytics}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </LegalPageLayout>
  )
}
