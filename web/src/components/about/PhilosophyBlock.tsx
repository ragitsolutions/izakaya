import { useLanguage } from '@/i18n/LanguageContext'
import { aboutContent } from '@/data/about.data'
import { Reveal } from '@/components/ui/Reveal'
import { Hanko } from '@/components/ui/Hanko'

export function PhilosophyBlock() {
  const { t, pick } = useLanguage()

  return (
    <Reveal as="div" className="mx-auto max-w-2xl text-center">
      <Hanko className="mx-auto h-7 w-7 text-accent" />
      <span className="mt-5 block text-xs tracking-[0.3em] text-accent uppercase">
        {t.about.philosophyLabel}
      </span>
      <div className="mt-6 space-y-6 font-display text-xl leading-relaxed text-ink sm:text-2xl">
        {aboutContent.philosophy.paragraphs.map((p) => (
          <p key={p.es}>{pick(p)}</p>
        ))}
      </div>
    </Reveal>
  )
}
