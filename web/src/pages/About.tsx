import { useDocumentHead } from '@/hooks/useDocumentHead'
import { useLanguage } from '@/i18n/LanguageContext'
import { aboutContent } from '@/data/about.data'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { HistoryBlock } from '@/components/about/HistoryBlock'
import { PhilosophyBlock } from '@/components/about/PhilosophyBlock'
import { CuisineBlock } from '@/components/about/CuisineBlock'

export default function About() {
  const { t, pick } = useLanguage()
  useDocumentHead({ title: t.about.title, description: pick(aboutContent.intro) })

  return (
    <>
      <Section className="pb-0 sm:pb-0">
        <SectionHeading
          kicker={t.about.kicker}
          title={t.about.title}
          description={pick(aboutContent.intro)}
        />
      </Section>

      <Section>
        <HistoryBlock />
      </Section>

      <Section tone="soft">
        <PhilosophyBlock />
      </Section>

      <Section>
        <CuisineBlock />
      </Section>
    </>
  )
}
