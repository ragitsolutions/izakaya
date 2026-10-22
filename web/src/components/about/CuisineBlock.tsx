import sashimiImg from '@/assets/images/dishes/sashimi-salmon-480.webp'
import porkbellyImg from '@/assets/images/dishes/porkbelly-480.webp'
import { useLanguage } from '@/i18n/LanguageContext'
import { aboutContent } from '@/data/about.data'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'

export function CuisineBlock() {
  const { t, pick } = useLanguage()

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal as="div" className="order-2 lg:order-1">
        <span className="text-xs tracking-[0.3em] text-accent uppercase">{t.about.cuisineLabel}</span>
        <div className="mt-4 space-y-5 text-ink-soft leading-relaxed">
          {aboutContent.cuisine.paragraphs.map((p) => (
            <p key={p.es}>{pick(p)}</p>
          ))}
        </div>
        <Button to="/carta" variant="outline" className="mt-7">
          {t.about.ctaMenu}
        </Button>
      </Reveal>

      <Reveal as="div" className="order-1 grid grid-cols-2 gap-4 lg:order-2" delay={120}>
        <img
          src={sashimiImg}
          alt=""
          loading="lazy"
          className="aspect-[3/4] w-full translate-y-6 object-cover"
        />
        <img
          src={porkbellyImg}
          alt=""
          loading="lazy"
          className="aspect-[3/4] w-full -translate-y-6 object-cover"
        />
      </Reveal>
    </div>
  )
}
