import { useEffect, useRef, useState } from 'react'

/**
 * Adds `.is-in` to an element the first time it scrolls into view.
 * One shared IntersectionObserver for the whole page — cheap on mobile.
 */

let observer = null
const callbacks = new WeakMap()

function getObserver() {
  if (observer || typeof IntersectionObserver === 'undefined') return observer
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const cb = callbacks.get(entry.target)
        if (cb) cb()
        observer.unobserve(entry.target)
        callbacks.delete(entry.target)
      }
    },
    // Fire slightly before the element is fully on screen so the motion has
    // already started by the time she looks at it.
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
  )
  return observer
}

export function useReveal() {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || shown) return
    const io = getObserver()
    if (!io) {
      setShown(true) // very old browser: just show it
      return
    }
    callbacks.set(el, () => setShown(true))
    io.observe(el)
    return () => {
      io.unobserve(el)
      callbacks.delete(el)
    }
  }, [shown])

  return [ref, shown]
}

/**
 * Generic "is this element on screen right now" — used to defer heavy media
 * (videos, iframes) until they actually matter.
 */
export function useInView({ rootMargin = '250px', once = true } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin, once])

  return [ref, inView]
}
