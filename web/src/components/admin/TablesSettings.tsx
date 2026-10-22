import { useState } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import { zoneLabels } from '@/config/tables.config'
import { settingsService } from '@/services/settingsService'
import type { RestaurantTable, Zone } from '@/types/reservation'
import { Button } from '@/components/ui/Button'

const ZONES: Zone[] = ['table', 'bar', 'terrace']

function newTableId() {
  return `table_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`
}

export function TablesSettings() {
  const { t, pick } = useLanguage()
  const s = t.admin.settings
  const [tables, setTables] = useState<RestaurantTable[]>(() => settingsService.getTables())
  const [saved, setSaved] = useState(false)

  function update(id: string, patch: Partial<RestaurantTable>) {
    setTables((prev) => prev.map((tbl) => (tbl.id === id ? { ...tbl, ...patch } : tbl)))
    setSaved(false)
  }

  function addTable() {
    setTables((prev) => [...prev, { id: newTableId(), zone: 'table', capacity: 2, label: s.tableLabel }])
    setSaved(false)
  }

  function removeTable(id: string) {
    setTables((prev) => prev.filter((tbl) => tbl.id !== id))
    setSaved(false)
  }

  function save() {
    settingsService.setTables(tables)
    setSaved(true)
  }

  return (
    <section className="border border-line bg-paper p-6">
      <h2 className="font-display text-lg text-ink">{s.tablesTitle}</h2>
      <p className="mt-1.5 text-sm text-ink-soft">{s.tablesIntro}</p>

      <div className="mt-5 space-y-3">
        {tables.map((table) => (
          <div key={table.id} className="flex flex-wrap items-center gap-3 border-b border-line-soft pb-3 text-sm">
            <input
              value={table.label}
              onChange={(e) => update(table.id, { label: e.target.value })}
              className="w-32 border border-line bg-paper px-2 py-1.5 text-ink"
            />
            <select
              value={table.zone}
              onChange={(e) => update(table.id, { zone: e.target.value as Zone })}
              className="border border-line bg-paper px-2 py-1.5 text-ink"
            >
              {ZONES.map((z) => (
                <option key={z} value={z}>
                  {pick(zoneLabels[z])}
                </option>
              ))}
            </select>
            <label className="flex items-center gap-1.5">
              <span className="text-xs text-ink-soft">{s.tableCapacity}</span>
              <input
                type="number"
                min={1}
                max={20}
                value={table.capacity}
                onChange={(e) => update(table.id, { capacity: Number(e.target.value) || 1 })}
                className="w-16 border border-line bg-paper px-2 py-1.5 text-ink"
              />
            </label>
            <button
              type="button"
              onClick={() => removeTable(table.id)}
              className="text-xs tracking-widest text-accent uppercase hover:underline"
            >
              {s.removeTable}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={addTable}
          className="text-xs tracking-widest text-accent uppercase hover:underline"
        >
          + {s.addTable}
        </button>
        <Button className="px-4 py-2 text-xs" onClick={save}>
          {s.save}
        </Button>
        {saved && <span className="text-sm text-ink-soft">{s.saved}</span>}
      </div>
    </section>
  )
}
