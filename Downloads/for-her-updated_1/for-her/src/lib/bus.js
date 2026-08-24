/**
 * A four-line message bus so the Comfort buttons can reach across the page
 * ("play my voice", "open a random memory") without threading callbacks
 * through every component.
 */

const target = new EventTarget()

export const emit = (name, detail) => target.dispatchEvent(new CustomEvent(name, { detail }))

export const on = (name, handler) => {
  target.addEventListener(name, handler)
  return () => target.removeEventListener(name, handler)
}

/** Scrolls to a section by id, respecting reduced-motion preferences. */
export function scrollToId(id, { focus = false } = {}) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  if (focus) {
    el.setAttribute('tabindex', '-1')
    setTimeout(() => el.focus({ preventScroll: true }), reduce ? 0 : 600)
  }
}
