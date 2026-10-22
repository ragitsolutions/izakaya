import { useCallback, useEffect, useRef } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import type { GalleryImage } from '@/data/gallery.data'

interface LightboxProps {
  images: GalleryImage[]
  index: number
  onClose: () => void
  onNavigate: (nextIndex: number) => void
}

export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const { t, pick } = useLanguage()
  const closeRef = useRef<HTMLButtonElement>(null)
  const image = images[index]

  const goPrev = useCallback(
    () => onNavigate((index - 1 + images.length) % images.length),
    [index, images.length, onNavigate],
  )
  const goNext = useCallback(
    () => onNavigate((index + 1) % images.length),
    [index, images.length, onNavigate],
  )

  useEffect(() => {
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [index, images.length, onClose, onNavigate, goPrev, goNext])

  return (
    <div
      className="fixed inset-0 z-[80] flex flex-col bg-ink/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={pick(image.alt)}
    >
      <div className="flex items-center justify-between px-5 py-4 sm:px-8">
        <p className="text-xs tracking-widest text-paper/70 uppercase">
          {t.gallery.imageCounter
            .replace('{current}', String(index + 1))
            .replace('{total}', String(images.length))}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t.gallery.close}
          className="flex h-10 w-10 items-center justify-center text-paper transition-colors hover:text-accent"
        >
          <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 pb-6 sm:px-16">
        <button
          type="button"
          onClick={goPrev}
          aria-label={t.gallery.previous}
          className="absolute left-2 flex h-11 w-11 items-center justify-center text-paper/80 transition-colors hover:text-accent sm:left-6"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>

        <img
          key={image.id}
          src={image.full}
          alt={pick(image.alt)}
          className="max-h-full max-w-full animate-fade-in object-contain"
        />

        <button
          type="button"
          onClick={goNext}
          aria-label={t.gallery.next}
          className="absolute right-2 flex h-11 w-11 items-center justify-center text-paper/80 transition-colors hover:text-accent sm:right-6"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>

      <p className="pb-6 text-center text-sm text-paper/70">{pick(image.alt)}</p>
    </div>
  )
}
