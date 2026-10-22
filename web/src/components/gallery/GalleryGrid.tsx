import { useState } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import { galleryImages } from '@/data/gallery.data'
import { Reveal } from '@/components/ui/Reveal'
import { Lightbox } from './Lightbox'

export function GalleryGrid() {
  const { pick } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {galleryImages.map((image, i) => (
          <Reveal key={image.id} delay={(i % 8) * 60} className="aspect-square overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="group block h-full w-full"
              aria-label={pick(image.alt)}
            >
              <img
                src={image.thumb}
                alt={pick(image.alt)}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </button>
          </Reveal>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          images={galleryImages}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </>
  )
}
