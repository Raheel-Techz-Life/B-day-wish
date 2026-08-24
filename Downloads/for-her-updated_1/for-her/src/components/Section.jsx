import Reveal from './Reveal'

/** A hairline flourish used between sections. */
export function Ornament({ className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center gap-3 text-rosegold/60 ${className}`}
    >
      <span className="h-px w-10 bg-gradient-to-r from-transparent to-rosegold/40 sm:w-16" />
      <svg width="9" height="9" viewBox="0 0 10 10" fill="none" className="shrink-0">
        <path d="M5 0 6.2 3.8 10 5 6.2 6.2 5 10 3.8 6.2 0 5l3.8-1.2z" fill="currentColor" />
      </svg>
      <span className="h-px w-10 bg-gradient-to-l from-transparent to-rosegold/40 sm:w-16" />
    </span>
  )
}

/** The small caps label above every section heading. */
export function Eyebrow({ children, className = '' }) {
  return (
    <span
      className={`block text-[0.68rem] font-medium tracking-[0.32em] text-rosegold uppercase ${className}`}
    >
      {children}
    </span>
  )
}

export function SectionHeading({ label, heading, blurb, align = 'center' }) {
  const alignment = align === 'left' ? 'text-left items-start' : 'text-center items-center'
  return (
    <header className={`flex flex-col ${alignment} mb-10 sm:mb-16`}>
      {label && (
        <Reveal variant="fade">
          <Eyebrow>{label}</Eyebrow>
        </Reveal>
      )}
      {heading && (
        <Reveal variant="up" delay={80}>
          <h2 className="font-display mt-4 text-[clamp(2rem,7vw,3.6rem)] leading-[1.08] font-light text-balance text-ink">
            {heading}
          </h2>
        </Reveal>
      )}
      {blurb && (
        <Reveal variant="up" delay={160}>
          <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-pretty text-ink-soft">
            {blurb}
          </p>
        </Reveal>
      )}
      {align === 'center' && (
        <Reveal variant="fade" delay={220} className="mt-7">
          <Ornament />
        </Reveal>
      )}
    </header>
  )
}

/**
 * Page section shell. `tone` picks the background so the page breathes
 * between cream and blush as she scrolls.
 */
export default function Section({
  id,
  tone = 'cream',
  className = '',
  innerClassName = '',
  children,
  ...rest
}) {
  const tones = {
    cream: 'bg-cream',
    blush: 'bg-blush',
    deep: 'bg-gradient-to-b from-blush via-petal/70 to-blush',
    none: '',
  }

  return (
    <section
      id={id}
      className={`relative scroll-mt-4 px-5 py-20 sm:px-8 sm:py-28 lg:py-36 ${tones[tone]} ${className}`}
      {...rest}
    >
      <div className={`mx-auto w-full max-w-6xl ${innerClassName}`}>{children}</div>
    </section>
  )
}
