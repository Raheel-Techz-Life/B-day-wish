import { useRef } from 'react'
import { videos, videosIntro, fill } from '../content'
import { youTubeId } from '../lib/media'
import { useInView } from '../hooks/useReveal'
import Section, { SectionHeading } from './Section'
import Reveal from './Reveal'
import LazyYouTube from './LazyYouTube'

/**
 * Local video. `preload="none"` plus a poster means the file itself is never
 * downloaded until she presses play — the whole section stays weightless.
 */
function FileVideo({ item }) {
  const [ref, near] = useInView({ rootMargin: '300px' })
  const videoRef = useRef(null)

  // Only one video should ever be playing.
  const pauseOthers = () => {
    document.querySelectorAll('video').forEach((v) => {
      if (v !== videoRef.current) v.pause()
    })
    document.querySelectorAll('audio').forEach((a) => a.pause())
  }

  return (
    <div ref={ref} className="overflow-hidden rounded-sm bg-petal/40 ring-1 ring-petal/70">
      <video
        ref={videoRef}
        // src is only attached once we're close, so a phone never even
        // opens a connection for videos further down the page.
        src={near ? item.src : undefined}
        poster={item.poster}
        controls
        preload="none"
        playsInline
        onPlay={pauseOthers}
        className="aspect-video h-full w-full bg-ink object-cover"
      >
        Your browser can’t play this video.
      </video>
    </div>
  )
}

function VideoCard({ item, index }) {
  const id = item.type === 'youtube' ? youTubeId(item.id || item.url) : null

  return (
    <Reveal variant="up" delay={(index % 2) * 100} as="figure" className="flex flex-col">
      {item.type === 'youtube' ? (
        <LazyYouTube id={id} title={fill(item.title)} />
      ) : (
        <FileVideo item={item} />
      )}

      <figcaption className="mt-5">
        <h3 className="font-display text-[1.35rem] leading-snug font-normal text-ink">
          {fill(item.title)}
        </h3>
        {item.caption && (
          <p className="mt-1.5 text-[0.95rem] leading-relaxed text-pretty text-ink-soft">
            {fill(item.caption)}
          </p>
        )}
        {item.date && (
          <p className="mt-2 text-[0.68rem] tracking-[0.22em] text-ink-faint uppercase">
            {item.date}
          </p>
        )}
      </figcaption>
    </Reveal>
  )
}

export default function Videos() {
  if (!videos.length) return null

  return (
    <Section id="videos" tone="blush">
      <SectionHeading {...videosIntro} />
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10">
        {videos.map((item, i) => (
          <VideoCard key={(item.src || item.id || i) + String(i)} item={item} index={i} />
        ))}
      </div>
    </Section>
  )
}
