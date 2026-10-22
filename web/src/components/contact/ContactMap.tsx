import { useLanguage } from '@/i18n/LanguageContext'
import { siteConfig } from '@/config/site.config'

export function ContactMap() {
  const { t } = useLanguage()

  return (
    <div className="aspect-square w-full overflow-hidden border border-line lg:aspect-auto lg:h-full lg:min-h-[480px]">
      <iframe
        src={siteConfig.googleMapsEmbedSrc}
        title={t.contact.mapTitle}
        width="100%"
        height="100%"
        style={{ border: 0, filter: 'grayscale(0.2) contrast(1.05)' }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}
