/**
 * Tiny localStorage wrapper. Private windows, blocked storage or Safari quirks
 * can make storage throw — when that happens we just forget, nothing breaks.
 */

const PREFIX = 'for-her:'

export function load(key, fallback = null) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key)
    return raw == null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function save(key, value) {
  try {
    if (value == null) window.localStorage.removeItem(PREFIX + key)
    else window.localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    /* storage unavailable — fine */
  }
}
