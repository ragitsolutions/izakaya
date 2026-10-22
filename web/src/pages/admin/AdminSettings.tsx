import { useLanguage } from '@/i18n/LanguageContext'
import { useDocumentHead } from '@/hooks/useDocumentHead'
import { BlockedDatesSettings } from '@/components/admin/BlockedDatesSettings'
import { HoursSettings } from '@/components/admin/HoursSettings'
import { TablesSettings } from '@/components/admin/TablesSettings'

export default function AdminSettings() {
  const { t } = useLanguage()
  useDocumentHead({ title: `${t.admin.settings.title} · Admin` })

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">{t.admin.settings.title}</h1>

      <div className="mt-6 space-y-8">
        <BlockedDatesSettings />
        <HoursSettings />
        <TablesSettings />
      </div>
    </div>
  )
}
