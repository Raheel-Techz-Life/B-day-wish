import { memories, memoriesIntro, fill } from '../content'
import Section, { SectionHeading } from './Section'
import Reveal from './Reveal'
import { useParallax } from '../hooks/useMotion'

/**
 * Each memory is a moment, not a tile: a handwritten kicker, the photo,
 * then the caption. Desktop staggers them left/right down the page with a
 * little parallax so scrolling feels like drifting through them.
 */
function Memory({ item, index, onOpen }) {
  const parallax = useParallax(index % 2 === 0 ? 26 : -26)
  const isLeft = index % 2 === 0

  return (
    <Reveal
      variant={isLeft ? 'left' : 'right'}
      as="figure"
      className={`group relative md:col-span-7 ${
        isLeft ? 'md:col-start-1' : 'md:col-start-6 md:-mt-24 lg:-mt-32'
      }`}
    >
      <p
        className={`font-hand mb-3 text-[1.35rem] text-wine/70 ${isLeft ? '' : 'md:text-right'}`}
      >
        {fill(item.kicker)}
      </p>

      <button
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`Open memory: ${fill(item.caption)}`}
        className="memory-image-frame block w-full cursor-zoom-in overflow-hidden rounded-sm bg-petal/40 shadow-[var(--shadow-card)] ring-1 ring-petal/60 transition-shadow duration-500 hover:shadow-[var(--shadow-lift)]"
      >
        <span ref={parallax} className="block" style={{ transform: 'translate3d(0,var(--py,0px),0)' }}>
          <img
            src={item.src}
            srcSet={item.small ? `${item.small} 700w, ${item.src} 1400w` : undefined}
            sizes="(min-width: 768px) 58vw, min(88vw, 34rem)"
            alt={item.alt || fill(item.caption)}
            width={item.width}
            height={item.height}
            loading={index < 2 ? 'eager' : 'lazy'}
            decoding="async"
            className="h-full w-full scale-[1.06] object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.11]"
          />
        </span>
      </button>

      <figcaption className={`mt-4 ${isLeft ? '' : 'md:text-right'}`}>
        <p className="font-display max-w-[46ch] text-[1.1rem] leading-snug text-pretty text-ink md:inline-block">
          {fill(item.caption)}
        </p>
        {item.date && (
          <p className="mt-1 text-[0.68rem] tracking-[0.22em] text-ink-faint uppercase">
            {item.date}
          </p>
        )}
      </figcaption>
    </Reveal>
  )
}

export default function Gallery({ onOpen }) {
  if (!memories.length) return null

  return (
    <Section id="memories" tone="cream">
      <SectionHeading {...memoriesIntro} />
      <div className="grid grid-cols-1 gap-16 sm:gap-20 md:grid-cols-12 md:gap-x-6 md:gap-y-28">
        {memories.map((item, i) => (
          <Memory key={item.src + i} item={item} index={i} onOpen={onOpen} />
        ))}
      </div>
    </Section>
  )
}
