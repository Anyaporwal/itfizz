import { useEffect, useRef, useState } from 'react'
import { initScrollCarAnimation } from '../animations/scrollCarAnimation'
import StatCard from './StatCard'
import './ScrollCarSection.css'

const WELCOME_TEXT = 'WELCOME ITZFIZ'.split('')

const STATS = [
  {
    id: 'box1',
    value: '58%',
    description: 'Increase in pick up point use',
    variant: 'lime',
    position: { top: '5%', right: '35%' },
  },
  {
    id: 'box2',
    value: '23%',
    description: 'Decreased in customer phone calls',
    variant: 'sky',
    position: { bottom: '1%', right: '40%' },
  },
  {
    id: 'box3',
    value: '27%',
    description: 'Increase in pick up point use',
    variant: 'dark',
    position: { top: '5%', right: '10%' },
  },
  {
    id: 'box4',
    value: '40%',
    description: 'Decreased in customer phone calls',
    variant: 'orange',
    position: { bottom: '1%', right: '12.5%' },
  },
]

function ScrollCarSection() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const carRef = useRef(null)
  const trailRef = useRef(null)
  const valueAddRef = useRef(null)
  const letterRefs = useRef([])
  const statRefs = useRef([])
  const animationRef = useRef(null)

  const [carLoaded, setCarLoaded] = useState(false)

  useEffect(() => {
    letterRefs.current = letterRefs.current.slice(0, WELCOME_TEXT.length)
  }, [])

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (!carLoaded && !reducedMotion) return undefined

    animationRef.current?.revert()

    animationRef.current = initScrollCarAnimation(
      {
        section: sectionRef.current,
        track: trackRef.current,
        car: carRef.current,
        trail: trailRef.current,
        letters: letterRefs.current.filter(Boolean),
        valueAdd: valueAddRef.current,
        statBoxes: statRefs.current.filter(Boolean),
      },
      reducedMotion,
    )

    const handleResize = () => {
      animationRef.current?.refresh()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      animationRef.current?.revert()
      animationRef.current = null
    }
  }, [carLoaded])

  const handleCarLoad = () => {
    setCarLoaded(true)
    requestAnimationFrame(() => animationRef.current?.refresh())
  }

  return (
    <section
      ref={sectionRef}
      className="scroll-section"
      aria-label="Scroll-driven car animation showcase"
    >
      <div ref={trackRef} className="scroll-track">
        <div className="road" id="road">
          
    <img
      ref={carRef}
      src={`${import.meta.env.BASE_URL}mclaren-top-view.png`}
      alt=""
      className="car"
      id="car"
      decoding="async"
      onLoad={handleCarLoad}
      onError={(e) => console.error('Car image failed to load:', e.currentTarget.src)}
    />

           

          <div
            ref={trailRef}
            className="trail"
            id="trail"
            aria-hidden="true"
          />

          <div
            ref={valueAddRef}
            className="value-add"
            id="valueText"
            aria-label="Welcome Itzfizz"
          >
            {WELCOME_TEXT.map((char, index) => (
              <span
                key={`${char}-${index}`}
                ref={(el) => {
                  letterRefs.current[index] = el
                }}
                className="value-letter"
                aria-hidden="true"
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
        </div>

        {STATS.map((stat, index) => (
          <StatCard
            key={stat.id}
            {...stat}
            boxRef={(el) => {
              statRefs.current[index] = el
            }}
          />
        ))}
      </div>
    </section>
  )
}

export default ScrollCarSection
