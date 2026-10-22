import { useDocumentHead } from '@/hooks/useDocumentHead'
import { useLanguage } from '@/i18n/LanguageContext'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ContactDetails } from '@/components/contact/ContactDetails'
import { ContactMap } from '@/components/contact/ContactMap'

export default function Contact() {
  const { t } = useLanguage()
  useDocumentHead({ title: t.contact.title, description: t.contact.description })

  return (
    <Section>
      <SectionHeading kicker={t.contact.kicker} title={t.contact.title} description={t.contact.description} />

      <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <ContactDetails />
        <ContactMap />
      </div>
    </Section>
  )
}
