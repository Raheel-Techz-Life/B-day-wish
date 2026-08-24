import { songs, musicIntro, fill } from '../content'
import { spotifyEmbed } from '../lib/media'
import { useInView } from '../hooks/useReveal'
import Section, { SectionHeading } from './Section'
import Reveal from './Reveal'

/**
 * Spotify's official embed — nothing is copied or re-hosted, and the iframe
 * is only created once the card is near the viewport.
 */
function Song({ song, index }) {
  const [ref, near] = useInView({ rootMargin: '350px' })
  const src = spotifyEmbed(song.url)

  return (
    <Reveal variant="up" delay={index * 90} as="article" className="flex flex-col">
      <div ref={ref} className="order-2 mt-5 min-h-[152px]">
        {near && src ? (
          <iframe
            src={src}
            title={fill(song.title)}
            loading="lazy"
            allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            className="h-[152px] w-full rounded-xl border-0"
          />
        ) : (
          <div
            aria-hidden="true"
            className="h-[152px] w-full animate-pulse rounded-xl bg-petal/50"
          />
        )}
      </div>

      <header className="order-1">
        <h3 className="font-display text-[1.35rem] leading-snug text-ink">{fill(song.title)}</h3>
        {song.why && (
          <p className="mt-1.5 text-[0.95rem] leading-relaxed text-pretty text-ink-soft">
            {fill(song.why)}
          </p>
        )}
      </header>
    </Reveal>
  )
}

export default function Music() {
  if (!songs.length) return null

  return (
    <Section id="music" tone="cream">
      <SectionHeading {...musicIntro} />
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-10 md:gap-y-14">
        {songs.map((song, i) => (
          <Song key={song.url + i} song={song} index={i} />
        ))}
      </div>
    </Section>
  )
}
