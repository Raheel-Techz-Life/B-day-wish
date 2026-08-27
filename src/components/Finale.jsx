import { finale, people, paragraphs, fill } from '../content'
import { scrollToId } from '../lib/bus'
import { useParallax } from '../hooks/useMotion'
import Reveal from './Reveal'
import { Ornament } from './Section'
import Celebration from './Celebration'

export default function Finale() {
  const glow = useParallax(40)

  return (
    <footer
      id="finale"
      className="grain relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-cream px-5 py-24 text-center"
    >
      <Celebration location="end" />

      <div
        ref={glow}
        aria-hidden="true"
        className="absolute inset-0"
        style={{ transform: 'translate3d(0,var(--py,0px),0)' }}
      >
        <div className="anim-drift absolute bottom-[-24%] left-1/2 h-[85vmin] w-[85vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(247,223,216,0.9),rgba(247,223,216,0)_70%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl">
        <div className="space-y-6">
          {paragraphs(finale.message).map((line, i) => (
            <Reveal
              key={i}
              as="p"
              variant="up"
              delay={Math.min(i, 5) * 110}
              className="font-display text-[clamp(1.15rem,4.4vw,1.5rem)] leading-[1.75] text-pretty text-ink/90"
            >
              {line}
            </Reveal>
          ))}
        </div>

        <Reveal variant="fade" delay={200} className="mt-14">
          <Ornament />
        </Reveal>

        <Reveal variant="blur" delay={260}>
          <p className="font-display mt-12 text-[clamp(1.6rem,7vw,2.6rem)] leading-tight font-light text-ink">
            {people.me} <span className="text-rosegold">❤︎</span> {people.her}
          </p>
        </Reveal>

        <Reveal variant="fade" delay={340}>
          <p className="font-hand mx-auto mt-8 max-w-[26ch] text-[clamp(1.25rem,5vw,1.6rem)] leading-snug text-balance text-wine/75">
            {fill(finale.closing)}
          </p>
        </Reveal>

        <Reveal variant="fade" delay={420}>
          <button
            type="button"
            onClick={() => scrollToId('top')}
            className="mt-16 min-h-11 rounded-full px-6 py-3 text-[0.68rem] tracking-[0.26em] text-ink-faint uppercase ring-1 ring-petal transition-colors duration-300 hover:bg-blush hover:text-wine"
          >
            {finale.restart}
          </button>
        </Reveal>
      </div>
    </footer>
  )
}
