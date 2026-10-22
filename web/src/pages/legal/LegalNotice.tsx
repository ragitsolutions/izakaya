import { useLanguage } from '@/i18n/LanguageContext'
import { legalNoticeSections } from '@/data/legal.data'
import { LegalPageLayout } from '@/components/legal/LegalPageLayout'

export default function LegalNotice() {
  const { t } = useLanguage()
  return <LegalPageLayout title={t.footer.legalLinks.legalNotice} sections={legalNoticeSections} />
}
