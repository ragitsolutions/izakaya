import historyImg from '@/assets/images/local/local-detalle-ukiyo-e-640.webp'
import { useLanguage } from '@/i18n/LanguageContext'
import { aboutContent } from '@/data/about.data'
import { Reveal } from '@/components/ui/Reveal'

export function HistoryBlock() {
  const { t, pick } = useLanguage()

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal as="div" className="aspect-[4/5] overflow-hidden">
        <img
          src={historyImg}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </Reveal>
      <Reveal as="div" delay={120}>
        <span className="text-xs tracking-[0.3em] text-accent uppercase">{t.about.historyLabel}</span>
        <div className="mt-4 space-y-5 text-ink-soft leading-relaxed">
          {aboutContent.history.paragraphs.map((p) => (
            <p key={p.es}>{pick(p)}</p>
          ))}
        </div>
      </Reveal>
    </div>
  )
}
