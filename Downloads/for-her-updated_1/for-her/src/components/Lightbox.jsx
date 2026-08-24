import { useCallback, useEffect, useRef } from 'react'
import { fill } from '../content'

/**
 * Full-screen viewer for a photo memory.
 * Keyboard: ← → to move, Esc to close. Focus returns where it came from.
 */
export default function Lightbox({ items, index, onClose, onIndex }) {
  const panelRef = useRef(null)
  const returnTo = useRef(null)
  const open = index !== null && index >= 0

  const go = useCallback(
    (delta) => {
      if (!items.length) return
      onIndex((index + delta + items.length) % items.length)
    },
    [index, items.length, onIndex],
  )

  useEffect(() => {
    if (!open) return
    returnTo.current = document.activeElement

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'Tab') {
        // keep focus inside the dialog
        const focusables = panelRef.current?.querySelectorAll('button')
        if (!focusables?.length) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector('button')?.focus()

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
      returnTo.current?.focus?.()
    }
  }, [open, onClose, go])

  // simple swipe on touch
  const touch = useRef(0)

  if (!open) return null
  const item = items[index]
  if (!item) return null

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto overscroll-contain bg-[rgba(63,50,47,0.9)] px-3 py-4 backdrop-blur-md sm:px-8"
      role="dialog"
      aria-modal="true"
      aria-label={fill(item.caption) || 'Memory'}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touch.current = e.changedTouches[0].clientX)}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touch.current
        if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1)
      }}
    >
      <div ref={panelRef} className="my-auto flex w-full max-w-4xl flex-col items-center gap-3 sm:gap-4">
        <div className="flex w-full items-center justify-between text-cream/70">
          <span className="text-[0.68rem] tracking-[0.24em] uppercase">
            {index + 1} / {items.length}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-xl leading-none text-cream transition hover:bg-cream/20"
          >
            ×
          </button>
        </div>

        <img
          key={item.src}
          src={item.src}
          alt={item.alt || fill(item.caption) || 'A memory'}
          width={item.width}
          height={item.height}
          className="anim-fade-up max-h-[46svh] w-auto max-w-full rounded-sm object-contain shadow-2xl sm:max-h-[64svh]"
        />

        <figcaption className="w-full max-w-xl px-1 text-center">
          {item.kicker && (
            <p className="font-hand text-lg text-rose">{fill(item.kicker)}</p>
          )}
          <p className="font-display mt-1 text-[1.15rem] leading-snug text-pretty text-cream">
            {fill(item.caption)}
          </p>
          {item.note && (
            <p className="mt-2 text-sm leading-relaxed text-cream/65">{fill(item.note)}</p>
          )}
          {item.date && (
            <p className="mt-2 text-[0.68rem] tracking-[0.2em] text-cream/45 uppercase">
              {item.date}
            </p>
          )}
        </figcaption>

        <div className="flex items-center gap-3 pb-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous memory"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-cream/10 text-cream transition hover:bg-cream/20"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next memory"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-cream/10 text-cream transition hover:bg-cream/20"
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}
