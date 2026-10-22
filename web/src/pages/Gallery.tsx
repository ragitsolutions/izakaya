import { useDocumentHead } from '@/hooks/useDocumentHead'
import { useLanguage } from '@/i18n/LanguageContext'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GalleryGrid } from '@/components/gallery/GalleryGrid'

export default function Gallery() {
  const { t } = useLanguage()
  useDocumentHead({ title: t.gallery.title, description: t.gallery.description })

  return (
    <Section>
      <SectionHeading kicker={t.gallery.kicker} title={t.gallery.title} description={t.gallery.description} />
      <div className="mt-12">
        <GalleryGrid />
      </div>
    </Section>
  )
}
