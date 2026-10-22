import type { ReactNode } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import { useDocumentHead } from '@/hooks/useDocumentHead'
import { siteConfig } from '@/config/site.config'
import type { LegalSection } from '@/data/legal.data'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

const LAST_UPDATED = '2026-10-22'

export function LegalPageLayout({
  title,
  sections,
  children,
}: {
  title: string
  sections: LegalSection[]
  children?: ReactNode
}) {
  const { t, locale, pick } = useLanguage()
  useDocumentHead({ title })

  const formattedDate = new Intl.DateTimeFormat(locale === 'es' ? 'es-ES' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(LAST_UPDATED))

  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <SectionHeading kicker={siteConfig.name} title={title} />
        <p className="mt-4 text-xs tracking-wide text-ink-soft uppercase">
          {t.legal.lastUpdated}: {formattedDate}
        </p>

        <div className="mt-10 space-y-10">
          {sections.map((section) => (
            <div key={section.heading.es}>
              <h2 className="text-xl text-ink">{pick(section.heading)}</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink-soft">
                {section.paragraphs.map((p) => (
                  <p key={p.es}>{pick(p)}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {children}
      </div>
    </Section>
  )
}
