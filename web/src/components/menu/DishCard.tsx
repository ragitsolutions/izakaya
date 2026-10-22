import { useLanguage } from '@/i18n/LanguageContext'
import { allergenById } from '@/data/allergens.data'
import type { MenuDish } from '@/data/menu.data'
import { formatPrice } from '@/lib/format'
import { Reveal } from '@/components/ui/Reveal'
import { AllergenIcon } from './AllergenIcon'

export function DishCard({ dish, delay = 0 }: { dish: MenuDish; delay?: number }) {
  const { t, locale, pick } = useLanguage()

  return (
    <Reveal as="article" delay={delay} className="flex gap-4 sm:gap-6">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-paper-soft ring-1 ring-line-soft sm:h-28 sm:w-28 lg:h-32 lg:w-32">
        <img
          src={dish.image.thumb}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
        {dish.recommended && (
          <span className="absolute left-0 top-0 bg-accent px-2 py-1 text-[10px] uppercase tracking-wide text-paper">
            {t.menu.recommendedLabel}
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
          <h3 className="min-w-0 text-lg text-ink sm:text-xl">{pick(dish.name)}</h3>
          <span
            aria-hidden="true"
            className="mb-1.5 h-0 min-w-6 flex-1 border-b border-dotted border-line"
          />
          <span className="mb-0.5 shrink-0 font-display text-lg text-accent">
            {formatPrice(dish.price, locale)}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft italic">{pick(dish.description)}</p>

        {dish.allergens.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
            <span className="sr-only">{t.menu.allergensLabel}</span>
            {dish.allergens.map((id) => {
              const allergen = allergenById.get(id)
              if (!allergen) return null
              return (
                <span key={id} className="inline-flex items-center gap-1.5 text-xs text-ink-soft">
                  <AllergenIcon id={id} className="h-4 w-4 shrink-0" />
                  {pick(allergen.name)}
                </span>
              )
            })}
          </div>
        )}
      </div>
    </Reveal>
  )
}
