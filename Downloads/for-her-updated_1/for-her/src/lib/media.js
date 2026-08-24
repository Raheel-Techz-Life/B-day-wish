/** Turns whatever you paste in content.js into something embeddable. */

/**
 * Accepts a YouTube URL in any of its shapes, or a bare 11-character ID.
 *   https://youtu.be/ID · /watch?v=ID · /embed/ID · /shorts/ID · /live/ID
 */
export function youTubeId(input = '') {
  const s = String(input).trim()
  if (/^[\w-]{11}$/.test(s)) return s
  const m = s.match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/)
  return m ? m[1] : ''
}

export const youTubeEmbed = (id, { autoplay = true } = {}) =>
  `https://www.youtube-nocookie.com/embed/${id}?${autoplay ? 'autoplay=1&' : ''}rel=0&modestbranding=1&playsinline=1`

/** mqdefault is 320px and always exists; maxres often 404s. */
export const youTubeThumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`

/**
 * Accepts any Spotify share link (track, album, playlist, episode) or a
 * `spotify:track:ID` URI, and returns the official embed URL.
 */
export function spotifyEmbed(input = '', { compact = false } = {}) {
  const s = String(input).trim()
  let kind = 'track'
  let id = ''

  const uri = s.match(/^spotify:(track|album|playlist|episode|show):([A-Za-z0-9]+)/)
  const url = s.match(/open\.spotify\.com\/(?:intl-[a-z]{2}\/)?(track|album|playlist|episode|show)\/([A-Za-z0-9]+)/)

  if (uri) [, kind, id] = uri
  else if (url) [, kind, id] = url
  else if (/^[A-Za-z0-9]{22}$/.test(s)) id = s

  if (!id) return ''
  return `https://open.spotify.com/embed/${kind}/${id}?utm_source=generator&theme=0${compact ? '&t=0' : ''}`
}

/** 0:00 style timestamps for the voice-note player. */
export function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}
