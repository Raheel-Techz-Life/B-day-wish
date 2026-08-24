import { useEffect, useRef, useState } from 'react'
import { ambient } from '../content'

/**
 * A small, quiet music toggle. It never autoplays — browsers would block it
 * anyway, and being ambushed by sound is the opposite of the point. The file
 * isn't fetched at all until she taps it.
 */
export default function AmbientPlayer() {
  const audioRef = useRef(null)
  const [on, setOn] = useState(false)
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = ambient.volume ?? 0.35
  }, [touched])

  if (!ambient.enabled || !ambient.src) return null

  const toggle = () => {
    setTouched(true)
    const el = audioRef.current
    if (!el) return
    if (el.paused) {
      el.volume = ambient.volume ?? 0.35
      el.play().then(
        () => setOn(true),
        () => setOn(false),
      )
    } else {
      el.pause()
      setOn(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-pressed={on}
        aria-label={on ? 'Turn the music off' : ambient.label}
        title={on ? 'Turn the music off' : ambient.label}
        className="fixed right-4 bottom-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-cream/85 text-wine shadow-[var(--shadow-card)] ring-1 ring-petal backdrop-blur-md transition-transform duration-300 hover:scale-105 active:scale-95 sm:right-6 sm:bottom-6"
      >
        {on ? (
          <span aria-hidden="true" className="flex items-end gap-[3px]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="anim-breathe w-[3px] rounded-full bg-rosegold"
                style={{ height: `${[10, 16, 12][i]}px`, animationDelay: `${i * 0.25}s` }}
              />
            ))}
          </span>
        ) : (
          <svg width="17" height="17" viewBox="0 0 20 20" className="fill-current" aria-hidden="true">
            <path d="M17 1.5v11.2a3 3 0 1 1-2-2.83V5.2L8 6.6v8.4a3 3 0 1 1-2-2.83V4l11-2.5z" />
          </svg>
        )}
      </button>

      {/* preload="none" means the file is not fetched until play() is called */}
      <audio ref={audioRef} src={ambient.src} loop preload="none" className="hidden" />
    </>
  )
}
