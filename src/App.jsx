import { useCallback, useEffect, useState } from 'react'
import { memories, people } from './content'
import { on } from './lib/bus'
import { useScrollProgress } from './hooks/useMotion'

import Loader from './components/Loader'
import Hero from './components/Hero'
import Letter from './components/Letter'
import Gallery from './components/Gallery'
import Lightbox from './components/Lightbox'
import Videos from './components/Videos'
import VoiceNotes from './components/VoiceNotes'
import Music from './components/Music'
import Timeline from './components/Timeline'
import Comfort from './components/Comfort'
import OpenWhen from './components/OpenWhen'
import Finale from './components/Finale'
import AmbientPlayer from './components/AmbientPlayer'
import FlowerRain from './components/FlowerRain'
import NightToggle from './components/NightToggle'
import Resume from './components/Resume'

/** A hairline of progress along the top — the only permanent UI on the page. */
function ScrollLine() {
  const progress = useScrollProgress()
  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-rose via-rosegold to-wine transition-transform duration-150 ease-out"
      style={{ transform: `scaleX(${progress})` }}
    />
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const finishLoading = useCallback(() => setLoading(false), [])

  // "Open a random memory" from the Comfort section.
  useEffect(
    () =>
      on('open-random-memory', () => {
        if (!memories.length) return
        setLightboxIndex((prev) => {
          if (memories.length === 1) return 0
          let next = prev
          while (next === prev) next = Math.floor(Math.random() * memories.length)
          return next
        })
      }),
    [],
  )

  useEffect(() => {
    document.title = `Happy birthday, ${people.her} ❤️`
  }, [])

  return (
    <>
      {loading && <Loader onDone={finishLoading} />}

      <a
        href="#letter"
        className="sr-only-focusable fixed top-3 left-3 z-[60] rounded-full bg-cream px-5 py-3 text-sm text-wine shadow-[var(--shadow-card)] ring-1 ring-petal"
      >
        Skip to the letter
      </a>

      <ScrollLine />
      <FlowerRain />

      <main>
        <Hero started={!loading} />
        <Letter />
        <Gallery onOpen={setLightboxIndex} />
        <Videos />
        <VoiceNotes />
        <Music />
        <Timeline />
        <Comfort />
        <OpenWhen />
      </main>

      <Finale />
      <AmbientPlayer />
      <NightToggle />
      <Resume ready={!loading} />

      <Lightbox
        items={memories}
        index={lightboxIndex}
        onIndex={setLightboxIndex}
        onClose={() => setLightboxIndex(null)}
      />
    </>
  )
}
