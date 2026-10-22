import heroImg640 from '@/assets/images/local/local-comedor-640.webp'
import heroImg960 from '@/assets/images/local/local-comedor-960.webp'
import { useLanguage } from '@/i18n/LanguageContext'
import { Button } from '@/components/ui/Button'

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative flex h-[90svh] min-h-[560px] items-end overflow-hidden bg-ink">
      <img
        src={heroImg960}
        srcSet={`${heroImg640} 640w, ${heroImg960} 960w`}
        sizes="100vw"
        alt=""
        role="presentation"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/10"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 sm:px-8 sm:pb-24 lg:px-10">
        <p className="animate-fade-in text-xs tracking-[0.35em] text-paper/80 uppercase">
          {t.home.heroKicker}
        </p>
        <h1 className="mt-5 max-w-2xl text-4xl text-paper sm:text-5xl lg:text-6xl">
          {t.home.heroTitle}
        </h1>
        <p className="mt-5 max-w-lg text-base text-paper/85 sm:text-lg">{t.home.heroSubtitle}</p>

        <div className="mt-9 flex flex-wrap gap-4">
          <Button to="/reservas" variant="primary">
            {t.cta.reserve}
          </Button>
          <Button
            to="/carta"
            variant="outline"
            className="border-paper/70 text-paper hover:bg-paper hover:text-ink"
          >
            {t.cta.viewMenu}
          </Button>
        </div>
      </div>
    </section>
  )
}
