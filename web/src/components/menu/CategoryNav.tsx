import { useLanguage } from '@/i18n/LanguageContext'
import { menuCategories } from '@/data/menu.data'
import { useScrollSpy } from '@/hooks/useScrollSpy'

function scrollToCategory(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - 96
  window.scrollTo({ top: y, behavior: 'smooth' })
}

export function CategoryNav() {
  const { pick } = useLanguage()
  const ids = menuCategories.map((c) => c.id)
  const activeId = useScrollSpy(ids)

  return (
    <nav
      aria-label="Categorías de la carta"
      className="sticky top-20 z-30 -mx-6 border-b border-line bg-paper/95 px-6 backdrop-blur sm:-mx-8 sm:px-8 lg:mx-0 lg:border-none lg:bg-transparent lg:px-0 lg:backdrop-blur-none"
    >
      <ul className="flex gap-6 overflow-x-auto py-4 text-sm tracking-wide whitespace-nowrap sm:gap-8 lg:justify-center lg:gap-10">
        {menuCategories.map((cat) => (
          <li key={cat.id}>
            <button
              type="button"
              onClick={() => scrollToCategory(cat.id)}
              aria-current={activeId === cat.id ? 'true' : undefined}
              className={`relative pb-1 uppercase transition-colors ${
                activeId === cat.id ? 'text-accent' : 'text-ink-soft hover:text-ink'
              }`}
            >
              {pick(cat.name)}
              {activeId === cat.id && (
                <span className="absolute -bottom-[1px] left-0 h-px w-full bg-accent" aria-hidden="true" />
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
