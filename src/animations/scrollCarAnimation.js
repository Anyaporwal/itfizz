import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STAT_SCROLL_STEPS = [
  { start: 'top+=400 top', end: 'top+=600 top' },
  { start: 'top+=600 top', end: 'top+=800 top' },
  { start: 'top+=800 top', end: 'top+=1000 top' },
  { start: 'top+=1000 top', end: 'top+=1200 top' },
]

/**
 * @param {object} elements
 * @param {HTMLElement} elements.section
 * @param {HTMLElement} elements.track
 * @param {HTMLElement} elements.car
 * @param {HTMLElement} elements.trail
 * @param {HTMLElement[]} elements.letters
 * @param {HTMLElement} elements.valueAdd
 * @param {HTMLElement[]} elements.statBoxes
 * @param {boolean} reducedMotion
 */
export function initScrollCarAnimation(elements, reducedMotion = false) {
  const { section, track, car, trail, letters, valueAdd, statBoxes } = elements

  if (!section || !track || !car || !trail) {
    return { revert: () => {}, refresh: () => {} }
  }

  let letterMetrics = null

  const getCarWidth = () => car.offsetWidth || 150

  const updateLetterMetrics = () => {
    if (!valueAdd || !letters.length) return
    const valueRect = valueAdd.getBoundingClientRect()
    letterMetrics = {
      left: valueRect.left,
      offsets: letters.map((letter) => letter.offsetLeft),
    }
  }

  const syncTrailAndLetters = () => {
    const carX = gsap.getProperty(car, 'x')
    const carCenter = carX + getCarWidth() / 2
    gsap.set(trail, { width: carCenter })

    if (!letterMetrics) updateLetterMetrics()
    if (!letterMetrics) return

    letters.forEach((letter, index) => {
      const letterX = letterMetrics.left + letterMetrics.offsets[index]
      letter.style.opacity = carCenter >= letterX ? '1' : '0'
    })
  }

  const applyReducedMotionState = () => {
    const endX = window.innerWidth - getCarWidth()
    gsap.set(car, { x: endX })
    gsap.set(trail, { width: endX })
    letters.forEach((letter) => {
      letter.style.opacity = '1'
    })
    statBoxes.forEach((box) => {
      gsap.set(box, { opacity: 1 })
    })
  }

  const ctx = gsap.context(() => {
    if (reducedMotion) {
      applyReducedMotionState()
      return
    }

    updateLetterMetrics()

    gsap.to(car, {
x: () => {
  const rect = car.getBoundingClientRect()
  return window.innerWidth - rect.left - rect.width / 2
},      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        pin: track,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: syncTrailAndLetters,
      },
    })

    statBoxes.forEach((box, index) => {
      const step = STAT_SCROLL_STEPS[index]
      if (!box || !step) return

      gsap.to(box, {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: step.start,
          end: step.end,
          scrub: true,
        },
      })
    })

    ScrollTrigger.addEventListener('refreshInit', updateLetterMetrics)
  }, section)

  return {
    refresh: () => ScrollTrigger.refresh(),
    revert: () => {
      ScrollTrigger.removeEventListener('refreshInit', updateLetterMetrics)
      ctx.revert()
    },
  }
}
