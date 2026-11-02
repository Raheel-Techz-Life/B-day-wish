import { useEffect, useState } from 'react'
import { load, save } from '../lib/store'
import { scrollToId } from '../lib/bus'

/**
 * Remembers which section she was last reading. When she comes back, a small
 * pill offers to take her there. It never jumps on its own.
 */

const PLACES = {
  memories: 'the photos',
  videos: 'the videos',
  voice: 'my voice notes',
  music: 'our songs',
  timeline: 'our story',
  comfort: 'the quiet part',
  'open-when': 'the sealed letters',
  finale: 'the ending',
}

export default function Resume({ ready }) {
  const [offer] = useState(() => {
    const id = load('last-section')
    return PLACES[id] ? id : null
  })
  const [visible, setVisible] = useState(false)

  // Show the offer once the loader is gone, hide it after a while.
  useEffect(() => {
    if (!ready || !offer) return
    const show = setTimeout(() => setVisible(true), 900)
    const hide = setTimeout(() => setVisible(false), 14000)
    return () => {
      clearTimeout(show)
      clearTimeout(hide)
    }
  }, [ready, offer])

  // Track where she is.
  useEffect(() => {
    if (!ready) return
    const ids = ['top', 'letter', ...Object.keys(PLACES)]
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          // Reaching a section on her own counts as "she's moved on" — drop the offer.
          if (e.target.id !== 'top') setVisible(false)
          save('last-section', PLACES[e.target.id] ? e.target.id : null)
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ready])

  if (!offer) return null

  return (
    <div
      className={`fixed inset-x-0 bottom-20 z-50 flex justify-center px-4 transition-all duration-500 sm:bottom-8 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
      aria-hidden={!visible}
    >
      <div className="flex items-center gap-1 rounded-full bg-cream/90 py-1 pr-1 pl-5 text-[0.85rem] text-wine shadow-[var(--shadow-lift)] ring-1 ring-petal backdrop-blur-md">
        <button
          type="button"
          tabIndex={visible ? 0 : -1}
          onClick={() => {
            setVisible(false)
            scrollToId(offer)
          }}
          className="py-2 font-medium"
        >
          Continue from {PLACES[offer]} →
        </button>
        <button
          type="button"
          tabIndex={visible ? 0 : -1}
          onClick={() => setVisible(false)}
          aria-label="Start from the beginning instead"
          className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-ink-faint transition hover:bg-petal/60"
        >
          ×
        </button>
      </div>
    </div>
  )
}
