import { comfort, paragraphs, people } from '../content'
import { emit, scrollToId } from '../lib/bus'
import Section, { Eyebrow, Ornament } from './Section'
import Reveal from './Reveal'
import Breathe from './Breathe'

/** Give the smooth scroll a moment to land before we act on the target. */
const afterScroll = (fn) => setTimeout(fn, 620)

const run = (action) => {
  switch (action.kind) {
    case 'voice':
      scrollToId('voice')
      afterScroll(() => emit('play-voice'))
      break
    case 'randomMemory':
      emit('open-random-memory')
      break
    case 'openWhen':
      scrollToId('open-when')
      afterScroll(() => emit('open-when', { key: action.key }))
      break
    case 'music':
      scrollToId('music')
      break
    case 'letter':
      scrollToId('letter')
      afterScroll(() => emit('open-letter'))
      break
    default:
      if (action.href) window.open(action.href, '_blank', 'noopener')
  }
}

export default function Comfort() {
  return (
    <Section id="comfort" tone="deep" className="grain overflow-hidden">
      <div className="relative mx-auto max-w-2xl text-center">
        <Reveal variant="fade">
          <Eyebrow>{comfort.label}</Eyebrow>
        </Reveal>

        <Reveal variant="blur" delay={80}>
          <h2 className="font-display mt-5 text-[clamp(2rem,7.5vw,3.6rem)] leading-[1.08] font-light text-balance text-ink italic">
            {comfort.heading}
          </h2>
        </Reveal>

        <Reveal variant="fade" delay={140} className="mt-8">
          <Ornament />
        </Reveal>

        <div className="mt-10 space-y-6 text-left">
          {paragraphs(comfort.message).map((line, i) => (
            <Reveal
              key={i}
              as="p"
              variant="up"
              delay={Math.min(i, 5) * 90}
              className="font-display text-[clamp(1.08rem,4vw,1.35rem)] leading-[1.8] text-pretty text-ink/90"
            >
              {line}
            </Reveal>
          ))}
        </div>

        <Reveal variant="up" delay={160} className="mt-12 flex justify-center">
          <Breathe />
        </Reveal>

        {comfort.actions?.length > 0 && (
          <Reveal variant="up" delay={180} className="mt-12 flex flex-wrap justify-center gap-3">
            {comfort.actions.map((action) => (
              <button
                key={action.label}
                type="button"
                onClick={() => run(action)}
                className="min-h-11 rounded-full bg-cream/85 px-5 py-3 text-[0.82rem] font-medium text-wine shadow-[var(--shadow-card)] ring-1 ring-petal transition-all duration-300 hover:-translate-y-0.5 hover:bg-cream hover:shadow-[var(--shadow-lift)] active:translate-y-0"
              >
                {action.label}
              </button>
            ))}
          </Reveal>
        )}

        <Reveal variant="fade" delay={240}>
          <p className="font-hand mt-12 text-[1.5rem] text-wine/70">— {people.me}</p>
        </Reveal>
      </div>
    </Section>
  )
}
