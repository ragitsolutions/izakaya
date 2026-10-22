import { useLanguage } from '@/i18n/LanguageContext'
import { allergens } from '@/data/allergens.data'

export function AllergenFilter({
  value,
  onChange,
}: {
  value: string | null
  onChange: (id: string | null) => void
}) {
  const { t, pick } = useLanguage()

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      <label htmlFor="allergen-filter" className="text-ink-soft">
        {t.menu.filterLabel}
      </label>
      <select
        id="allergen-filter"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value || null)}
        className="border border-line bg-paper px-3 py-2 text-ink"
      >
        <option value="">{t.menu.filterAll}</option>
        {allergens.map((a) => (
          <option key={a.id} value={a.id}>
            {pick(a.name)}
          </option>
        ))}
      </select>
      {value && (
        <button
          type="button"
          onClick={() => onChange(null)}
          className="text-xs tracking-widest text-accent uppercase hover:underline"
        >
          {t.menu.filterAll}
        </button>
      )}
    </div>
  )
}
