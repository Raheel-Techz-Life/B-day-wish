/*
 * Keeps the site working offline after her first visit.
 *  - The page itself: network first, so updates you push show up; cached copy if offline.
 *  - Built JS/CSS/fonts (hashed filenames): cache first, they never change.
 *  - Photos and posters: shown from cache instantly, refreshed in the background.
 *  - Voice notes, videos, music: left to the browser. Audio/video use range
 *    requests, and caching those breaks playback on iPhones.
 * Bump VERSION if you ever need to force everyone onto fresh files.
 */
const VERSION = 'v1'
const CACHE = `for-her-${VERSION}`
const CORE = ['./', './manifest.webmanifest', './heart.svg', './icons/icon-192.png']

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

const put = (req, res) => {
  if (res && res.ok && res.type === 'basic') {
    const copy = res.clone()
    caches.open(CACHE).then((c) => c.put(req, copy))
  }
  return res
}

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET' || req.headers.has('range')) return
  const url = new URL(req.url)
  if (url.origin !== self.location.origin) return
  if (/\/media\/(voice|videos|music)\//.test(url.pathname)) return

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => put('./', res))
        .catch(() => caches.match('./')),
    )
    return
  }

  if (url.pathname.includes('/assets/')) {
    event.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => put(req, res))))
    return
  }

  event.respondWith(
    caches.match(req).then((hit) => {
      const fresh = fetch(req)
        .then((res) => put(req, res))
        .catch(() => hit)
      return hit || fresh
    }),
  )
})
