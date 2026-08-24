import { useCallback, useEffect, useRef, useState } from 'react'
import { openWhen, openWhenIntro, paragraphs, people } from '../content'
import { on } from '../lib/bus'
import Section, { SectionHeading } from './Section'
import Reveal from './Reveal'

function Envelope({ card, opened, onOpen, index }) {
  return (
    <Reveal variant="up" delay={(index % 3) * 90}>
      <button
        type="button"
        onClick={onOpen}
        className="group relative flex h-full w-full flex-col items-start gap-3 overflow-hidden rounded-sm bg-cream px-6 py-8 text-left shadow-[var(--shadow-card)] ring-1 ring-petal/70 transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] sm:px-7 sm:py-9"
      >
        {/* the flap */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,rgba(247,223,216,0.75),rgba(247,223,216,0))] transition-all duration-500 group-hover:h-20"
        />
        <span
          aria-hidden="true"
          className="relative flex h-8 w-8 items-center justify-center rounded-full bg-petal/80 text-[0.7rem] text-wine transition-colors duration-500 group-hover:bg-rosegold group-hover:text-cream"
        >
          {opened ? '✓' : '❤︎'}
        </span>

        <span className="font-display relative text-[1.2rem] leading-snug text-balance text-ink">
          {card.title}
        </span>

        <span className="relative mt-auto pt-2 text-[0.68rem] tracking-[0.24em] text-ink-faint uppercase transition-colors group-hover:text-rosegold">
          {opened ? 'Read it again' : 'Open'}
        </span>
      </button>
    </Reveal>
  )
}

function LetterDialog({ card, onClose }) {
  const panelRef = useRef(null)
  const returnTo = useRef(null)

  useEffect(() => {
    returnTo.current = document.activeElement
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector('button')?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
      returnTo.current?.focus?.()
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center overflow-y-auto bg-[rgba(63,50,47,0.6)] px-4 py-10 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={card.title}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <article
        ref={panelRef}
        className="paper anim-fade-up relative my-auto w-full max-w-xl rounded-[2px] px-6 py-10 shadow-[var(--shadow-lift)] sm:px-12 sm:py-14"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close letter"
          className="absolute top-3 right-3 flex h-11 w-11 items-center justify-center rounded-full text-xl text-ink-faint transition hover:bg-petal/60 hover:text-wine"
        >
          ×
        </button>

        <p className="text-[0.68rem] tracking-[0.26em] text-rosegold uppercase">{card.title}</p>

        <div className="font-display mt-6 space-y-5 text-[clamp(1.05rem,3.8vw,1.28rem)] leading-[1.75] text-pretty text-ink/90">
          {paragraphs(card.body).map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        <p className="font-hand mt-9 text-right text-[2rem] leading-none text-wine">{people.me}</p>
      </article>
    </div>
  )
}

export default function OpenWhen() {
  const [activeKey, setActiveKey] = useState(null)
  const [opened, setOpened] = useState(() => new Set())

  const open = useCallback((key) => {
    setActiveKey(key)
    setOpened((prev) => new Set(prev).add(key))
  }, [])

  // The Comfort section can open a specific letter.
  useEffect(() => on('open-when', (e) => open(e.detail?.key)), [open])

  if (!openWhen.length) return null
  const active = openWhen.find((c) => c.key === activeKey)

  return (
    <Section id="open-when" tone="cream">
      <SectionHeading {...openWhenIntro} />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {openWhen.map((card, i) => (
          <Envelope
            key={card.key}
            card={card}
            index={i}
            opened={opened.has(card.key)}
            onOpen={() => open(card.key)}
          />
        ))}
      </div>

      {active && <LetterDialog card={active} onClose={() => setActiveKey(null)} />}
    </Section>
  )
}
