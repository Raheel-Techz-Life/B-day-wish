import { useState } from 'react'
import { youTubeEmbed, youTubeThumb } from '../lib/media'

/**
 * A YouTube embed that costs nothing until it's wanted: we show the poster
 * image and only insert the iframe (≈1MB of YouTube's player) on click.
 */
export default function LazyYouTube({ id, title = 'Video', className = '' }) {
  const [active, setActive] = useState(false)
  const [thumbFailed, setThumbFailed] = useState(false)

  if (!id) return null

  return (
    <div
      className={`relative aspect-video w-full overflow-hidden rounded-sm bg-petal/50 ring-1 ring-petal/70 ${className}`}
    >
      {active ? (
        <iframe
          src={youTubeEmbed(id)}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`Play ${title}`}
          className="group absolute inset-0 flex h-full w-full items-center justify-center"
        >
          {!thumbFailed && (
            <img
              src={youTubeThumb(id)}
              alt=""
              loading="lazy"
              decoding="async"
              onError={() => setThumbFailed(true)}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
            />
          )}
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-wine/45 via-transparent to-transparent"
          />
          <span
            aria-hidden="true"
            className="relative flex h-16 w-16 items-center justify-center rounded-full bg-cream/85 shadow-[var(--shadow-card)] backdrop-blur-sm transition-transform duration-500 group-hover:scale-110"
          >
            <svg width="18" height="20" viewBox="0 0 18 20" className="ml-1 fill-wine">
              <path d="M0 0v20l18-10z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  )
}
