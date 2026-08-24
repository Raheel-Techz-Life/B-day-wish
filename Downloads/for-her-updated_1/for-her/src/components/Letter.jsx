import { useEffect, useRef, useState } from 'react'
import { letter, paragraphs, fill } from '../content'
import { on } from '../lib/bus'
import Section, { Eyebrow, Ornament } from './Section'
import Reveal from './Reveal'

export default function Letter() {
  const lines = paragraphs(letter.body)
  const [open, setOpen] = useState(false)
  const sheetRef = useRef(null)
  const sealRef = useRef(null)

  // "Read the letter again" from the Comfort section opens it too.
  useEffect(() => on('open-letter', () => setOpen(true)), [])

  // Move focus into the letter when it opens, back to the seal when it closes.
  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    const el = open ? sheetRef.current : sealRef.current
    el?.focus?.({ preventScroll: true })
  }, [open])

  return (
    <Section id="letter" tone="blush" innerClassName="max-w-3xl">
      <Reveal variant="fade" className="mb-8 text-center">
        <Eyebrow>{letter.label}</Eyebrow>
      </Reveal>

      <Reveal variant="up" delay={60}>
        <h2 className="font-display mx-auto mb-12 max-w-[18ch] text-center text-[clamp(1.9rem,6.5vw,3.2rem)] leading-[1.1] font-light text-balance text-ink italic sm:mb-16">
          {fill(letter.heading)}
        </h2>
      </Reveal>

      {/* ── SEALED ENVELOPE ─────────────────────────────────────────────── */}
      {!open && (
        <Reveal variant="scale" delay={120}>
          <button
            ref={sealRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded="false"
            className="group relative mx-auto block w-full max-w-md cursor-pointer rounded-[3px] px-6 py-12 text-center transition-transform duration-500 ease-[var(--ease-soft)] hover:-translate-y-1 sm:py-16"
          >
            {/* envelope body */}
            <span
              aria-hidden="true"
              className="paper absolute inset-0 rounded-[3px] shadow-[var(--shadow-card)] ring-1 ring-petal/70 transition-shadow duration-500 group-hover:shadow-[var(--shadow-lift)]"
            />
            {/* the flap */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-24 origin-top overflow-hidden rounded-t-[3px]"
            >
              <span className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(160deg,rgba(245,217,208,0.9),rgba(235,196,188,0.75))] [clip-path:polygon(0_0,100%_0,50%_100%)] transition-transform duration-700 ease-[var(--ease-soft)] group-hover:-translate-y-1" />
            </span>

            <span className="relative block pt-10">
              {/* wax seal */}
              <span
                aria-hidden="true"
                className="anim-breathe mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#d69aa0,#8f5560)] text-lg text-cream shadow-[0_6px_16px_-6px_rgba(143,85,96,0.7)]"
              >
                ❤︎
              </span>

              <span className="font-display block text-[clamp(1.3rem,5vw,1.75rem)] leading-snug font-light text-ink italic">
                {fill(letter.sealTitle)}
              </span>
              <span className="font-hand mt-3 block text-lg text-rosegold transition-colors group-hover:text-wine">
                {fill(letter.sealHint)}
              </span>
            </span>
          </button>
        </Reveal>
      )}

      {/* ── THE OPENED LETTER ───────────────────────────────────────────── */}
      {open && (
        <div className="letter-stage">
          <span aria-hidden="true" className="letter-side letter-side-left">
            <span className="letter-charm letter-charm-heart">♥</span>
            <span className="letter-charm letter-charm-spark">✦</span>
            <span className="letter-charm letter-charm-dot" />
          </span>
          <span aria-hidden="true" className="letter-side letter-side-right">
            <span className="letter-charm letter-charm-heart">♥</span>
            <span className="letter-charm letter-charm-spark">✦</span>
            <span className="letter-charm letter-charm-dot" />
          </span>
          <span aria-hidden="true" className="letter-doodle letter-doodle-left">
            <span className="doodle-head doodle-head-small" />
            <span className="doodle-body doodle-body-small" />
            <span className="doodle-arm doodle-arm-left" />
            <span className="doodle-heart">♥</span>
          </span>
          <span aria-hidden="true" className="letter-doodle letter-doodle-right">
            <span className="doodle-head doodle-head-tall" />
            <span className="doodle-body doodle-body-tall" />
            <span className="doodle-arm doodle-arm-right" />
            <span className="doodle-heart">♥</span>
          </span>

          <article
            ref={sheetRef}
            tabIndex={-1}
            className="anim-letter-open letter-vintage paper relative px-6 py-12 shadow-[var(--shadow-lift)] ring-1 ring-petal/70 outline-none sm:px-14 sm:py-20"
          >
            <span aria-hidden="true" className="absolute inset-y-8 left-5 w-px bg-rose/35 sm:left-9" />

          {letter.dateline && (
            <p className="mb-8 text-right text-[0.72rem] tracking-[0.18em] text-ink-faint uppercase">
              {fill(letter.dateline)}
            </p>
          )}

          <figure className="letter-photo-wrap" aria-label={letter.illustration.caption}>
            <img
              src={letter.illustration.src}
              alt={letter.illustration.alt}
              className="letter-photo"
            />
            <figcaption className="font-hand">{letter.illustration.caption}</figcaption>
          </figure>

          <div className="letter-copy font-display space-y-6 text-[clamp(1.08rem,4vw,1.4rem)] leading-[1.75] text-pretty text-ink/90">
            {lines.map((line, i) => (
              <p
                key={i}
                className="anim-fade-up"
                style={{ animationDelay: `${Math.min(i, 14) * 70}ms` }}
              >
                {line}
              </p>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-end gap-1">
            <span className="text-[0.7rem] tracking-[0.24em] text-ink-faint uppercase">Always,</span>
            <span className="font-hand text-[clamp(2rem,8vw,3rem)] leading-none text-wine">
              {letter.signature}
            </span>
          </div>

          {letter.ps && (
            <p className="font-hand mt-10 max-w-md text-lg leading-snug text-wine/70">
              {fill(letter.ps)}
            </p>
          )}

          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="cursor-pointer rounded-full px-5 py-2.5 text-[0.7rem] tracking-[0.22em] text-ink-faint uppercase transition-colors hover:text-wine"
            >
              {fill(letter.closeLabel)}
            </button>
          </div>

            <span
              aria-hidden="true"
              className="absolute right-0 bottom-0 h-14 w-14 bg-[linear-gradient(135deg,transparent_50%,rgba(238,201,196,0.55)_50%)]"
            />
          </article>
        </div>
      )}

      <Reveal variant="fade" delay={160} className="mt-14 text-center">
        <Ornament />
      </Reveal>
    </Section>
  )
}
