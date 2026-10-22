import { useState, type FormEvent } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import { adminConfig } from '@/config/admin.config'
import { Hanko } from '@/components/ui/Hanko'
import { Button } from '@/components/ui/Button'

export function AdminLogin({ onLogin }: { onLogin: (username: string, password: string) => boolean }) {
  const { t } = useLanguage()
  const l = t.admin.login
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const ok = onLogin(username, password)
    setError(!ok)
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-paper-soft px-6">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <Hanko className="mx-auto h-10 w-10 text-accent" />
          <h1 className="mt-4 font-display text-2xl text-ink">{l.title}</h1>
          <p className="mt-2 text-sm text-ink-soft">{l.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4 border border-line bg-paper p-6">
          <label className="block text-sm">
            <span className="text-ink-soft">{l.username}</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              className="mt-1.5 w-full border border-line bg-paper px-3 py-2.5 text-ink"
            />
          </label>

          <label className="block text-sm">
            <span className="text-ink-soft">{l.password}</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="mt-1.5 w-full border border-line bg-paper px-3 py-2.5 text-ink"
            />
          </label>

          {error && <p className="text-sm text-accent">{l.error}</p>}

          <Button type="submit" className="w-full">
            {l.submit}
          </Button>

          <p className="text-center text-xs text-ink-soft">
            {l.hint} ({adminConfig.demoUsername} / {adminConfig.demoPassword})
          </p>
        </form>
      </div>
    </div>
  )
}
