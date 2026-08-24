import { useEffect, useRef } from 'react'
import { timeline, timelineIntro, fill } from '../content'
import { youTubeId } from '../lib/media'
import { useReducedMotion } from '../hooks/useMotion'
import Section, { SectionHeading } from './Section'
import Reveal from './Reveal'
import LazyYouTube from './LazyYouTube'

/**
 * The spine fills as she scrolls through our story. It writes a CSS variable
 * once per animation frame and never re-renders React — the cheapest way to
 * make scroll feel like playback.
 */
function useSpine() {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduced) {
      el.style.setProperty('--spine', '100%')
      return
    }

    let visible = false
    let frame = 0

    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const travelled = vh * 0.62 - rect.top
      const pct = Math.min(1, Math.max(0, travelled / rect.height))
      el.style.setProperty('--spine', `${(pct * 100).toFixed(1)}%`)
    }

    const onScroll = () => {
      if (visible && !frame) frame = requestAnimationFrame(update)
    }

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting
        if (visible) update()
      },
      { rootMargin: '150px' },
    )
    io.observe(el)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [reduced])

  return ref
}

function Milestone({ item, index }) {
  const left = index % 2 === 0
  const media = item.media

  return (
    <li className="relative pl-12 md:grid md:grid-cols-2 md:gap-14 md:pl-0">
      {/* the dot */}
      <Reveal
        variant="scale"
        className="absolute top-2 left-[13px] z-10 md:left-1/2 md:-translate-x-1/2"
      >
        <span className="block h-3 w-3 rounded-full bg-rosegold ring-4 ring-cream" />
      </Reveal>

      <Reveal
        variant={left ? 'right' : 'left'}
        delay={80}
        className={
          left
            ? 'md:col-start-1 md:pr-2 md:text-right'
            : 'md:col-start-2 md:row-start-1 md:pl-2'
        }
      >
        <p className="text-[0.7rem] tracking-[0.28em] text-rosegold uppercase">{fill(item.date)}</p>
        <h3 className="font-display mt-2 text-[clamp(1.4rem,5vw,2rem)] leading-tight font-light text-ink">
          {fill(item.title)}
        </h3>
        <p className="mt-3 text-[0.98rem] leading-relaxed text-pretty text-ink-soft">
          {fill(item.body)}
        </p>
      </Reveal>

      {media && (
        <Reveal
          variant="up"
          delay={140}
          className={`mt-6 md:mt-0 ${left ? 'md:col-start-2 md:row-start-1' : 'md:col-start-1 md:row-start-1'}`}
        >
          {media.type === 'youtube' ? (
            <LazyYouTube id={youTubeId(media.id || media.url)} title={fill(item.title)} />
          ) : (
            <img
              src={media.src}
              alt={media.alt || fill(item.title)}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full rounded-sm object-cover shadow-[var(--shadow-card)] ring-1 ring-petal/70"
            />
          )}
        </Reveal>
      )}
    </li>
  )
}

export default function Timeline() {
  const spine = useSpine()
  if (!timeline.length) return null

  return (
    <Section id="timeline" tone="blush">
      <SectionHeading {...timelineIntro} />

      <div ref={spine} className="relative">
        {/* track + fill */}
        <span
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-[18px] w-px bg-rose/45 md:left-1/2"
        />
        <span
          aria-hidden="true"
          className="absolute top-0 left-[18px] w-px bg-gradient-to-b from-rosegold to-wine md:left-1/2"
          style={{ height: 'var(--spine, 0%)' }}
        />

        <ol className="space-y-20 md:space-y-28">
          {timeline.map((item, i) => (
            <Milestone key={item.title + i} item={item} index={i} />
          ))}
        </ol>
      </div>
    </Section>
  )
}
