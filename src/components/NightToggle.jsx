import { useEffect, useState } from 'react'
import { load, save } from '../lib/store'

/**
 * 2am mode. Between 10pm and 6am the site dims itself automatically.
 * She can flip it either way; her choice holds for 8 hours, then the clock
 * takes over again.
 */

const NIGHT_FROM = 22
const NIGHT_UNTIL = 6
const OVERRIDE_MS = 8 * 60 * 60 * 1000

const isNightHour = () => {
  const h = new Date().getHours()
  return h >= NIGHT_FROM || h < NIGHT_UNTIL
}

function resolve() {
  const o = load('theme')
  if (o && Date.now() - o.at < OVERRIDE_MS) return o.mode === 'night'
  return isNightHour()
}

function apply(night) {
  const root = document.documentElement
  if (night) root.dataset.night = ''
  else delete root.dataset.night
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', night ? '#1d1719' : '#FAEAE3')
}

export default function NightToggle() {
  const [night, setNight] = useState(resolve)

  useEffect(() => apply(night), [night])

  // Let the clock change it while the page is open (e.g. she's reading at 9:59pm).
  useEffect(() => {
    const id = setInterval(() => setNight(resolve()), 60 * 1000)
    return () => clearInterval(id)
  }, [])

  const toggle = () => {
    const next = !night
    save('theme', { mode: next ? 'night' : 'day', at: Date.now() })
    setNight(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={night ? 'Switch to day mode' : 'Switch to night mode'}
      aria-pressed={night}
      className="fixed bottom-4 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-cream/85 text-wine shadow-[var(--shadow-card)] ring-1 ring-petal backdrop-blur-md transition-transform duration-300 hover:scale-105 active:scale-95 sm:bottom-6 sm:left-6"
    >
      {night ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
        </svg>
      ) : (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
        </svg>
      )}
    </button>
  )
}
