import { useImperativeHandle, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useUI } from '../context/UIContext'
import './PageTransition.scss'

/** Rideau de transition entre sections, piloté via `transitionRef.play(cb)`. */
export default function PageTransition() {
  const { transitionRef } = useUI()
  const ref = useRef(null)
  const busy = useRef(false)

  useImperativeHandle(transitionRef, () => ({
    play(onCovered) {
      if (busy.current) return
      busy.current = true
      const el = ref.current
      gsap
        .timeline({ onComplete: () => (busy.current = false) })
        .set(el, { visibility: 'visible', clipPath: 'inset(100% 0% 0% 0%)' })
        .to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'expo.inOut' })
        .fromTo('.ptrans__mark', { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.6 }, '-=0.35')
        .add(() => onCovered?.())
        .to('.ptrans__mark', { yPercent: -100, autoAlpha: 0, duration: 0.5, ease: 'expo.in' }, '+=0.1')
        .to(el, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.9, ease: 'expo.inOut' }, '-=0.2')
        .set(el, { visibility: 'hidden' })
    },
  }))

  return (
    <div ref={ref} className="ptrans" aria-hidden="true">
      <span className="ptrans__mark">Maison Aurèle</span>
    </div>
  )
}
