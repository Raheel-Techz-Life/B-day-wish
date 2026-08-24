import { hero, people, fill } from '../content'
import { useParallax } from '../hooks/useMotion'
import { scrollToId } from '../lib/bus'

export default function Hero({ started }) {
  const glow = useParallax(60)

  // Everything animates in only once the loading curtain has lifted.
  const step = (i) => ({
    animationDelay: `${140 * i + 120}ms`,
    animationPlayState: started ? 'running' : 'paused',
  })

  return (
    <header
      id="top"
      className="grain relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 py-24 text-center"
    >
      {/* layered light — cheaper and calmer than any background video */}
      <div ref={glow} aria-hidden="true" className="absolute inset-0" style={{ transform: 'translate3d(0, var(--py, 0px), 0)' }}>
        <div className="anim-drift absolute -top-[18%] left-1/2 h-[95vmin] w-[95vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95),rgba(247,223,216,0)_68%)]" />
        <div className="anim-drift absolute -right-[22%] bottom-[6%] h-[62vmin] w-[62vmin] rounded-full bg-[radial-gradient(circle,rgba(238,201,196,0.6),rgba(238,201,196,0)_70%)] [animation-delay:-8s]" />
        <div className="anim-drift absolute -left-[18%] bottom-[24%] h-[48vmin] w-[48vmin] rounded-full bg-[radial-gradient(circle,rgba(196,128,138,0.22),rgba(196,128,138,0)_70%)] [animation-delay:-14s]" />
      </div>

      <div className="relative flex flex-col items-center">
        <p
          className="anim-fade-up text-[0.7rem] font-medium tracking-[0.42em] text-rosegold uppercase"
          style={step(0)}
        >
          {hero.eyebrow}
        </p>

        <h1
          className="anim-fade-up font-display mt-6 text-[clamp(3.2rem,17vw,10rem)] leading-[0.92] font-light tracking-[-0.02em] text-ink"
          style={step(1)}
        >
          {fill(hero.title)}
        </h1>

        <p
          className="anim-fade-up mt-7 max-w-[22ch] text-[clamp(1rem,3.6vw,1.35rem)] leading-relaxed text-balance text-ink-soft sm:max-w-[34ch]"
          style={step(2)}
        >
          {fill(hero.subtitle)}
        </p>

        <p className="anim-fade-up font-hand mt-9 text-lg text-wine/60" style={step(3)}>
          {fill(hero.note)}
        </p>

        <p className="anim-fade-up mt-10 text-[0.7rem] tracking-[0.3em] text-ink-faint uppercase" style={step(4)}>
          {people.me} <span className="text-rosegold">❤︎</span> {people.her}
        </p>
      </div>

      <button
        type="button"
        onClick={() => scrollToId('letter')}
        style={step(5)}
        className="anim-fade-up group absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 rounded-full px-6 py-3 text-[0.65rem] tracking-[0.3em] text-ink-faint uppercase transition-colors hover:text-rosegold focus-visible:text-rosegold"
      >
        {hero.scrollHint}
        <span
          aria-hidden="true"
          className="block h-9 w-px origin-top bg-gradient-to-b from-rosegold/70 to-transparent transition-transform duration-500 group-hover:scale-y-125"
        />
      </button>
    </header>
  )
}
