import { useDocumentHead } from '@/hooks/useDocumentHead'
import { Section } from './Section'
import { SectionHeading } from './SectionHeading'

/**
 * Placeholder temporal para páginas que se desarrollarán en una fase posterior
 * del proyecto (ver fases en README). No es contenido final.
 */
export function ComingSoon({ title, note }: { title: string; note: string }) {
  useDocumentHead({ title })

  return (
    <Section className="min-h-[50vh]">
      <SectionHeading kicker="Izakaya" title={title} description={note} align="center" />
    </Section>
  )
}
