import { useEffect, useRef, useState } from 'react'

/** True when the visitor has asked their device to reduce motion. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (!window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/**
 * Very light parallax. Writes a CSS variable instead of re-rendering React,
 * and only runs while the element is on screen. Disabled entirely for
 * reduced-motion users and on coarse pointers below 640px, where it costs
 * more than it gives.
 */
export function useParallax(strength = 40) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    if (window.matchMedia('(max-width: 639px)').matches) return

    let visible = false
    let frame = 0

    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      // -1 (just below the fold) → 1 (just above it)
      const progress = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2)
      el.style.setProperty('--py', `${(progress * strength).toFixed(2)}px`)
    }

    const onScroll = () => {
      if (!visible || frame) return
      frame = requestAnimationFrame(update)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) update()
      },
      { rootMargin: '100px' },
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
  }, [strength, reduced])

  return ref
}

/** 0 → 1 progress of the whole page, throttled to one write per frame. */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return progress
}
