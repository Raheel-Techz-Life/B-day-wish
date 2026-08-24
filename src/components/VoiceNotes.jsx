import { useCallback, useEffect, useRef, useState } from 'react'
import { voiceNotes, voiceIntro, fill } from '../content'
import { formatTime } from '../lib/media'
import { useInView } from '../hooks/useReveal'
import { on } from '../lib/bus'
import Section, { SectionHeading } from './Section'
import Reveal from './Reveal'

/** Deterministic bar heights so every note looks like its own waveform. */
function bars(seed, count = 46) {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Array.from({ length: count }, (_, i) => {
    h = Math.imul(h ^ (i + 7), 2246822519)
    const v = ((h >>> 8) % 100) / 100
    // taper the ends so it reads as speech, not noise
    const taper = Math.sin((Math.PI * (i + 1)) / (count + 1)) ** 0.6
    return 0.22 + v * 0.78 * taper
  })
}

function VoicePlayer({ note, index }) {
  const [ref, near] = useInView({ rootMargin: '400px' })
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const wave = useRef(bars(note.src + note.title)).current

  const toggle = useCallback(() => {
    const el = audioRef.current
    if (!el) return
    if (el.paused) {
      // never two things talking at once
      document.querySelectorAll('audio, video').forEach((m) => m !== el && m.pause())
      el.play().catch(() => {})
    } else {
      el.pause()
    }
  }, [])

  // The Comfort section can ask for the first voice note.
  useEffect(() => {
    if (index !== 0) return
    return on('play-voice', () => {
      const el = audioRef.current
      if (!el) return
      document.querySelectorAll('audio, video').forEach((m) => m !== el && m.pause())
      el.play().catch(() => {})
    })
  }, [index])

  const progress = duration ? time / duration : 0

  return (
    <Reveal
      variant="up"
      delay={index * 90}
      className="rounded-sm bg-cream/80 p-5 shadow-[var(--shadow-card)] ring-1 ring-petal/70 backdrop-blur-[2px] sm:p-7"
    >
      <div ref={ref}>
        <p className="font-hand text-[1.3rem] leading-none text-wine/70">{fill(note.hint)}</p>
        <h3 className="font-display mt-2 text-[1.25rem] leading-snug text-ink">
          {fill(note.title)}
        </h3>

        <div className="mt-5 flex items-center gap-4">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? `Pause ${fill(note.title)}` : `Play ${fill(note.title)}`}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-rosegold text-cream shadow-[var(--shadow-card)] transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            {playing ? (
              <svg width="14" height="16" viewBox="0 0 14 16" className="fill-current">
                <rect width="4.5" height="16" rx="1" />
                <rect x="9.5" width="4.5" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="15" height="17" viewBox="0 0 15 17" className="ml-1 fill-current">
                <path d="M0 0v17l15-8.5z" />
              </svg>
            )}
          </button>

          <div className="min-w-0 flex-1">
            {/* waveform (decorative) with the real slider on top of it */}
            <div className="relative h-11">
              <div aria-hidden="true" className="flex h-full items-center gap-[2px]">
                {wave.map((v, i) => (
                  <span
                    key={i}
                    style={{ height: `${v * 100}%` }}
                    className={`w-full flex-1 rounded-full transition-colors duration-200 ${
                      i / wave.length <= progress ? 'bg-rosegold' : 'bg-rose/55'
                    }`}
                  />
                ))}
              </div>
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={time}
                onChange={(e) => {
                  const v = Number(e.target.value)
                  setTime(v)
                  if (audioRef.current) audioRef.current.currentTime = v
                }}
                aria-label={`Seek within ${fill(note.title)}`}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </div>

            <div className="mt-1 flex justify-between text-[0.7rem] tabular-nums text-ink-faint">
              <span>{formatTime(time)}</span>
              <span>{duration ? formatTime(duration) : '—:—'}</span>
            </div>
          </div>
        </div>

        <audio
          ref={audioRef}
          src={near ? note.src : undefined}
          preload={near ? 'metadata' : 'none'}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => {
            setPlaying(false)
            setTime(0)
          }}
          className="sr-only-focusable"
        />
      </div>
    </Reveal>
  )
}

export default function VoiceNotes() {
  if (!voiceNotes.length) return null

  return (
    <Section id="voice" tone="deep">
      <SectionHeading {...voiceIntro} />
      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6">
        {voiceNotes.map((note, i) => (
          <VoicePlayer key={note.src + i} note={note} index={i} />
        ))}
      </div>
    </Section>
  )
}
