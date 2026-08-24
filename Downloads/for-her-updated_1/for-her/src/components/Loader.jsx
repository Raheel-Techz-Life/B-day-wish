import { useEffect, useRef, useState } from 'react'
import { loader } from '../content'

/* ────────────────────────────────────────────────────────────────
   PALETTES — pinks and creams, layered light-to-dark so the petals
   read as depth rather than one flat shape.
   ──────────────────────────────────────────────────────────────── */

const PALETTES = [
  { o: '#f2bcc0', m: '#e9a5ac', i: '#dd8d98', c: '#cb7784', l: '#b0606f' }, // pink rose
  { o: '#fbf1e6', m: '#f7e5d5', i: '#f0d6c3', c: '#e6c3ad', l: '#cfa48e' }, // cream lily
  { o: '#f8d2d4', m: '#f1bfc4', i: '#e7a8b0', c: '#d9909d', l: '#bf7689' }, // soft blush
  { o: '#e59ca4', m: '#d98790', i: '#cb717f', c: '#b95e6f', l: '#9e4c61' }, // deep rose
  { o: '#fdf6ee', m: '#f9ebdd', i: '#f3dccb', c: '#ead0bb', l: '#d5b09b' }, // pale cream
]

/* ────────────────────────────────────────────────────────────────
   THE FLOWERS — each drawn on a 200×200 grid, centred on (100,100).
   ──────────────────────────────────────────────────────────────── */

const ring = (n, cy, rx, ry, fill, offset = 0, k = '', op = 1) =>
  Array.from({ length: n }, (_, i) => (
    <ellipse
      key={`${k}${i}`}
      cx="100"
      cy={cy}
      rx={rx}
      ry={ry}
      fill={fill}
      opacity={op}
      transform={`rotate(${offset + (360 / n) * i} 100 100)`}
    />
  ))

/** Rose — dense cupped petals spiralling into a tight heart. */
function Rose({ c }) {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      {ring(9, 52, 27, 46, c.o, 0, 'a')}
      {ring(8, 62, 24, 38, c.m, 22, 'b')}
      {ring(7, 72, 20, 30, c.i, 12, 'c')}
      {ring(6, 81, 16, 22, c.c, 30, 'd')}
      {ring(5, 89, 12, 15, c.l, 18, 'e', 0.9)}
      {/* the furled heart of the bloom — a few tucked petals, not a swirl */}
      {ring(4, 94, 8, 10, c.c, 0, 'f', 0.95)}
      {ring(3, 97, 6, 7, c.i, 40, 'g', 0.9)}
      <circle cx="100" cy="100" r="5" fill={c.l} opacity="0.65" />
    </svg>
  )
}

/** Lily — six long pointed petals with stamens standing out of the middle. */
function Lily({ c }) {
  const petal = 'M100 100C82 74 78 40 100 6c22 34 18 68 0 94Z'
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <g key={a} transform={`rotate(${a} 100 100)`}>
          <path d={petal} fill={c.o} />
          <path d={petal} fill={c.m} opacity="0.55" transform="scale(0.82) translate(22 22)" />
          <path
            d="M100 96V16"
            stroke={c.i}
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.55"
          />
        </g>
      ))}
      {/* stamens */}
      {[10, 70, 130, 190, 250, 310].map((a) => (
        <g key={`s${a}`} transform={`rotate(${a} 100 100)`}>
          <path d="M100 100V58" stroke={c.c} strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="100" cy="54" rx="5" ry="8" fill={c.l} />
        </g>
      ))}
      <circle cx="100" cy="100" r="9" fill={c.c} />
    </svg>
  )
}

/** Peony / dahlia — many narrow petals packed in tight rings. */
function Peony({ c }) {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      {ring(18, 38, 12, 50, c.o, 0, 'a')}
      {ring(16, 50, 11, 42, c.m, 11, 'b')}
      {ring(14, 62, 10, 34, c.i, 0, 'c')}
      {ring(12, 74, 8, 25, c.c, 15, 'd')}
      {ring(10, 85, 6, 16, c.l, 0, 'e')}
      <circle cx="100" cy="100" r="8" fill={c.l} />
    </svg>
  )
}

const KINDS = [Rose, Lily, Peony, Rose, Peony, Lily]

/* ────────────────────────────────────────────────────────────────
   THE BED
   A packed grid with fixed offsets — never Math.random(), so nothing
   shifts when the component re-renders. Sized in vmax so the density
   holds on a phone and on a desktop alike.
   ──────────────────────────────────────────────────────────────── */

const J = [0.31, 0.78, 0.12, 0.64, 0.95, 0.42, 0.07, 0.55, 0.88, 0.23, 0.7, 0.36, 0.91, 0.18, 0.6, 0.05, 0.47, 0.82, 0.27, 0.73, 0.16, 0.58]

const COLS = 3
const ROWS = 7

/** Builds one dense panel of flowers. `seed` shifts the pattern so the two
 *  halves of the screen don't look like mirror images of each other. */
const bed = (seed) =>
  Array.from({ length: COLS * ROWS }, (_, i) => {
    const col = i % COLS
    const row = Math.floor(i / COLS)
    const j = (n) => J[(i * n + seed * 5 + n) % J.length]
    return {
      x: ((col + 0.5) / COLS) * 100 + (j(3) - 0.5) * 30,
      y: ((row + 0.5) / ROWS) * 100 + (j(7) - 0.5) * 20,
      size: 17 + j(11) * 15, // vmax
      Kind: KINDS[(i + seed) % KINDS.length],
      pal: PALETTES[(i * 2 + seed) % PALETTES.length],
      spin: 16 + (i % 6) * 5,
      delay: -(j(13) * 20),
      reverse: (i + seed) % 2 === 0,
    }
  })

const LEFT = bed(0)
const RIGHT = bed(3)

function Panel({ flowers, side, parted }) {
  return (
    <div
      className="absolute inset-y-0 w-[54%] transition-transform duration-[2400ms] ease-[cubic-bezier(0.62,0.02,0.3,1)] will-change-transform"
      style={{
        [side]: 0,
        transform: parted ? `translateX(${side === 'left' ? '-' : ''}106%)` : 'translateX(0)',
      }}
    >
      {flowers.map((f, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: `${f.size}vmax`,
            height: `${f.size}vmax`,
            marginLeft: `${-f.size / 2}vmax`,
            marginTop: `${-f.size / 2}vmax`,
          }}
        >
          <div
            className="h-full w-full will-change-transform"
            style={{
              animation: `slowSpin ${f.spin}s linear ${f.delay}s infinite`,
              animationDirection: f.reverse ? 'reverse' : 'normal',
            }}
          >
            <f.Kind c={f.pal} />
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * The first few seconds. It waits for the page to finish loading OR for
 * `maxDurationMs`, whichever comes first, so it never becomes a wall.
 */
export default function Loader({ onDone }) {
  const [phase, setPhase] = useState(0) // 0 covered · 1 parting · 2 leaving
  const done = useRef(false)

  useEffect(() => {
    const start = performance.now()
    const timers = []

    timers.push(setTimeout(() => setPhase(1), Math.max(600, loader.minDurationMs * 0.42)))

    const finish = () => {
      if (done.current) return
      done.current = true
      const waited = performance.now() - start
      const remaining = Math.max(0, loader.minDurationMs - waited)
      timers.push(
        setTimeout(() => {
          setPhase(2)
          timers.push(setTimeout(onDone, 700)) // let the fade play out
        }, remaining),
      )
    }

    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish, { once: true })
    timers.push(setTimeout(finish, loader.maxDurationMs))

    // No scrolling underneath while the curtain is up.
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener('load', finish)
      document.body.style.overflow = prev
    }
  }, [onDone])

  const parted = phase >= 1

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-blush transition-all duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
        phase === 2 ? 'pointer-events-none scale-[1.03] opacity-0' : 'opacity-100'
      }`}
      role="status"
      aria-live="polite"
      aria-label="Opening"
    >
      {/* The floral bed — two packed halves that draw apart to open the site */}
      <div aria-hidden="true" className="bloom-bed pointer-events-none absolute inset-0 overflow-hidden">
        <Panel flowers={LEFT} side="left" parted={parted} />
        <Panel flowers={RIGHT} side="right" parted={parted} />
      </div>

      {/* soft halo so the words stay readable against the flowers */}
      <div
        aria-hidden="true"
        className={`anim-breathe absolute h-[58vmin] w-[58vmin] rounded-full bg-[radial-gradient(circle,rgba(255,251,249,0.9)_25%,rgba(253,246,242,0.5)_55%,rgba(247,223,216,0)_78%)] transition-opacity duration-1000 ${
          parted ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="relative z-10 px-6 text-center">
        <p
          className={`font-hand text-[clamp(1.15rem,4.5vw,1.7rem)] text-wine drop-shadow-[0_1px_10px_rgba(255,250,248,0.95)] transition-all duration-[900ms] ${
            phase === 0 ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
          }`}
        >
          {loader.whisper}
        </p>

        <div
          className={`absolute inset-x-0 top-0 transition-all duration-[1100ms] delay-500 ${
            phase === 1 ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-2 opacity-0 blur-sm'
          }`}
        >
          <h1 className="font-display text-[clamp(2.4rem,11vw,4.5rem)] leading-none font-light tracking-tight text-ink">
            {loader.name}
          </h1>
          <span aria-hidden="true" className="mt-3 block text-lg text-rosegold">
            ❤︎
          </span>
        </div>
      </div>
    </div>
  )
}
