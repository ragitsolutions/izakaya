import { Link } from 'react-router-dom'
import aboutImg from '@/assets/images/local/local-jardin-buda-640.webp'
import menuImg from '@/assets/images/dishes/tataki-res-480.webp'
import galleryImg from '@/assets/images/local/local-lampara-cristal-640.webp'
import { useLanguage } from '@/i18n/LanguageContext'
import { Reveal } from '@/components/ui/Reveal'

export function IntroLinks() {
  const { t } = useLanguage()

  const cards = [
    { to: '/nosotros', image: aboutImg, title: t.home.aboutTitle, text: t.home.aboutText },
    { to: '/carta', image: menuImg, title: t.home.menuTitle, text: t.home.menuText },
    { to: '/galeria', image: galleryImg, title: t.home.galleryTitle, text: t.home.galleryText },
  ]

  return (
    <div className="grid gap-10 sm:grid-cols-3">
      {cards.map((card, i) => (
        <Reveal key={card.to} as="article" delay={i * 120}>
          <Link to={card.to} className="group block">
            <div className="aspect-[4/5] overflow-hidden bg-paper-soft">
              <img
                src={card.image}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <h3 className="mt-5 text-xl">{card.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{card.text}</p>
            <span className="mt-3 inline-block text-xs tracking-widest text-accent uppercase">
              {t.cta.seeMore} &rarr;
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  )
}
