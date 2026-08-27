import { useEffect, useRef, useState } from 'react'

const FLOWERS = ['✿', '❀', '✾', '❁']
const MAX_SETTLED = 18

function makeFlower(id, x, y = -8, burst = false) {
  return {
    id,
    x,
    y,
    symbol: FLOWERS[Math.floor(Math.random() * FLOWERS.length)],
    size: 0.8 + Math.random() * 0.65,
    duration: burst ? 1.1 + Math.random() * 0.7 : 5.5 + Math.random() * 3.5,
    delay: burst ? 0 : Math.random() * 1.8,
    drift: -14 + Math.random() * 28,
    rotation: -35 + Math.random() * 70,
    burst,
  }
}

export default function FlowerRain() {
  const nextId = useRef(0)
  const [falling, setFalling] = useState([])
  const [settled, setSettled] = useState([])

  useEffect(() => {
    const spawn = (x = 8 + Math.random() * 84, y = -8) => {
      const flower = makeFlower(nextId.current++, x, y)
      setFalling((current) => [...current.slice(-15), flower])
    }

    for (let index = 0; index < 12; index += 1) spawn(8 + Math.random() * 84, -8 - index * 4)
    const timer = window.setInterval(() => spawn(), 850)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const emitFromTouch = (event) => {
      const flowerCount = event.pointerType === 'touch' ? 5 : 3
      const x = (event.clientX / window.innerWidth) * 100
      const y = (event.clientY / window.innerHeight) * 100
      const burst = Array.from({ length: flowerCount }, () => makeFlower(nextId.current++, x, y, true))
      setFalling((current) => [...current.slice(-12), ...burst])
    }

    window.addEventListener('pointerdown', emitFromTouch, { passive: true })
    return () => window.removeEventListener('pointerdown', emitFromTouch)
  }, [])

  const settle = (flower) => {
    setFalling((current) => current.filter((item) => item.id !== flower.id))
    if (flower.burst) return
    setSettled((current) => [...current, flower].slice(-MAX_SETTLED))
  }

  return (
    <div className="flower-rain" aria-hidden="true">
      <div className="flower-rain-settled">
        {settled.map((flower) => (
          <span
            key={flower.id}
            className="flower flower-settled flower-emitter"
            style={{ '--flower-x': `${flower.x}%`, '--flower-size': `${flower.size}rem`, '--flower-rotate': `${flower.rotation}deg` }}
          >
            {flower.symbol}
          </span>
        ))}
      </div>
      {falling.map((flower) => (
        <span
          key={flower.id}
          className={`flower flower-falling${flower.burst ? ' flower-burst' : ''}`}
          onAnimationEnd={() => settle(flower)}
          style={{
            '--flower-x': `${flower.x}%`,
            '--flower-y': `${flower.y}%`,
            '--flower-size': `${flower.size}rem`,
            '--flower-duration': `${flower.duration}s`,
            '--flower-delay': `${flower.delay}s`,
            '--flower-drift': `${flower.drift}vw`,
            '--flower-rotate': `${flower.rotation}deg`,
          }}
        >
          {flower.symbol}
        </span>
      ))}
    </div>
  )
}