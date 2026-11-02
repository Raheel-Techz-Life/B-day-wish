import { useEffect, useState } from 'react'

/**
 * "Breathe out slower than you breathe in. Four times, properly."
 * A circle that grows for 4s and shrinks for 6s, four rounds, then rests.
 */

const IN_MS = 4000
const OUT_MS = 6000
const ROUNDS = 4

export default function Breathe() {
  const [phase, setPhase] = useState(null) // null | 'in' | 'out' | 'done'
  const [round, setRound] = useState(0)

  useEffect(() => {
    if (phase !== 'in' && phase !== 'out') return
    const id = setTimeout(
      () => {
        if (phase === 'in') return setPhase('out')
        if (round + 1 >= ROUNDS) return setPhase('done')
        setRound((r) => r + 1)
        setPhase('in')
      },
      phase === 'in' ? IN_MS : OUT_MS,
    )
    return () => clearTimeout(id)
  }, [phase, round])

  const start = () => {
    setRound(0)
    setPhase('in')
  }

  if (!phase) {
    return (
      <button
        type="button"
        onClick={start}
        className="min-h-11 rounded-full bg-wine px-6 py-3 text-[0.85rem] font-medium text-cream shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] active:translate-y-0"
      >
        Breathe with me
      </button>
    )
  }

  const label =
    phase === 'in' ? 'Breathe in…' : phase === 'out' ? 'And out, slowly…' : 'There you go.'

  return (
    <div className="flex flex-col items-center gap-6" role="status" aria-live="polite">
      <div className="relative flex h-44 w-44 items-center justify-center">
        <span
          aria-hidden="true"
          className={`breathe-circle ${phase === 'in' ? 'is-in' : ''} ${phase === 'done' ? 'is-done' : ''}`}
        />
        <span className="font-display relative text-[1.15rem] text-ink italic">{label}</span>
      </div>

      {phase === 'done' ? (
        <button
          type="button"
          onClick={start}
          className="text-[0.72rem] tracking-[0.24em] text-ink-faint uppercase transition-colors hover:text-rosegold"
        >
          Once more
        </button>
      ) : (
        <p className="text-[0.72rem] tracking-[0.24em] text-ink-faint uppercase">
          {round + 1} of {ROUNDS}
        </p>
      )}
    </div>
  )
}
