import { useLanguage } from '@/i18n/LanguageContext'
import { privacyPolicySections } from '@/data/legal.data'
import { LegalPageLayout } from '@/components/legal/LegalPageLayout'

export default function Privacy() {
  const { t } = useLanguage()
  return <LegalPageLayout title={t.footer.legalLinks.privacy} sections={privacyPolicySections} />
}
