import { Hero } from '@/components/home/Hero'
import { IntroLinks } from '@/components/home/IntroLinks'
import { HoursLocationSummary } from '@/components/home/HoursLocationSummary'
import { Section } from '@/components/ui/Section'
import { useDocumentHead } from '@/hooks/useDocumentHead'
import { useLanguage } from '@/i18n/LanguageContext'
import { siteConfig } from '@/config/site.config'

export default function Home() {
  const { pick } = useLanguage()
  useDocumentHead({
    title: pick({ es: 'Inicio', en: 'Home' }),
    description: pick(siteConfig.shortDescription),
  })

  return (
    <>
      <Hero />
      <Section>
        <IntroLinks />
      </Section>
      <Section tone="soft">
        <HoursLocationSummary />
      </Section>
    </>
  )
}
