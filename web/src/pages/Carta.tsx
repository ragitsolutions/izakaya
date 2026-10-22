import { useState } from 'react'
import { useDocumentHead } from '@/hooks/useDocumentHead'
import { useLanguage } from '@/i18n/LanguageContext'
import { menuCategories, menuDishes, type MenuDish } from '@/data/menu.data'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CategoryNav } from '@/components/menu/CategoryNav'
import { AllergenLegend } from '@/components/menu/AllergenLegend'
import { AllergenFilter } from '@/components/menu/AllergenFilter'
import { DishCard } from '@/components/menu/DishCard'

export default function Carta() {
  const { t, pick } = useLanguage()
  useDocumentHead({ title: t.menu.title, description: t.menu.description })
  const [hiddenAllergen, setHiddenAllergen] = useState<string | null>(null)

  return (
    <>
      <Section className="pb-0 sm:pb-0">
        <SectionHeading kicker={t.menu.kicker} title={t.menu.title} description={t.menu.description} />

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <AllergenLegend />
          <AllergenFilter value={hiddenAllergen} onChange={setHiddenAllergen} />
        </div>
      </Section>

      <div className="mt-10">
        <CategoryNav />
      </div>

      <Section className="pt-12">
        <div className="space-y-24">
          {menuCategories.map((category) => {
            const dishes = menuDishes.filter((d) => d.categoryId === category.id)
            const visibleDishes = hiddenAllergen
              ? dishes.filter((d) => !d.allergens.includes(hiddenAllergen))
              : dishes

            return (
              <section key={category.id} id={category.id} className="scroll-mt-36">
                <span aria-hidden="true" className="block h-px w-10 bg-accent" />
                <h2 className="mt-3 text-3xl">{pick(category.name)}</h2>
                <p className="mt-2 max-w-xl text-sm text-ink-soft italic">{pick(category.description)}</p>

                {visibleDishes.length === 0 ? (
                  <p className="mt-6 text-sm text-ink-soft">{t.menu.emptyCategory}</p>
                ) : (
                  <div className="mt-10 grid gap-x-10 gap-y-12 lg:grid-cols-2">
                    {visibleDishes.map((dish: MenuDish, i: number) => (
                      <DishCard key={dish.id} dish={dish} delay={(i % 4) * 80} />
                    ))}
                  </div>
                )}
              </section>
            )
          })}
        </div>
      </Section>
    </>
  )
}
