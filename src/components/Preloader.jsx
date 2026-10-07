import { useRef, useState } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { useUI } from '../context/UIContext'
import { img } from '../lib/img'
import './Preloader.scss'

const loadImage = (src) =>
  new Promise((resolve) => {
    const i = new Image()
    i.onload = i.onerror = resolve
    i.src = src
    setTimeout(resolve, 3500) // never block the intro for long
  })

/** Rideau d'ouverture : compteur, monogramme puis levée du rideau. */
export default function Preloader() {
  const { setIntroDone } = useUI()
  const ref = useRef(null)
  const [gone, setGone] = useState(false)

  useGSAP(
    () => {
      document.body.classList.add('is-loading')
      const finish = () => {
        document.body.classList.remove('is-loading')
        setIntroDone(true)
      }

      if (prefersReducedMotion()) {
        finish()
        setGone(true)
        return
      }

      const counter = { v: 0 }
      const num = ref.current.querySelector('.preloader__count')
      const heroReady = loadImage(img('hero.png', window.innerWidth < 900 ? 1000 : 1920))

      const tl = gsap.timeline()
      tl.from('.preloader__word span', { yPercent: 120, duration: 1.4, stagger: 0.05, ease: 'expo.out' })
        .from('.preloader__rule', { scaleX: 0, duration: 1.4, ease: 'expo.inOut' }, 0.1)
        .to(counter, {
          v: 100,
          duration: 1.8,
          ease: 'power2.inOut',
          onUpdate: () => (num.textContent = String(Math.round(counter.v)).padStart(3, '0')),
        }, 0)
        .add(() => {
          tl.pause()
          heroReady.then(() => tl.resume())
        })
        .to('.preloader__word span', { yPercent: -120, duration: 0.9, stagger: 0.03, ease: 'expo.in' })
        .to('.preloader__meta', { autoAlpha: 0, duration: 0.5 }, '<')
        .to(ref.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.3, ease: 'expo.inOut' }, '-=0.2')
        .add(finish, '-=0.9')
        .add(() => setGone(true))
    },
    { scope: ref },
  )

  if (gone) return null
  return (
    <div ref={ref} className="preloader" aria-hidden="true">
      <div className="preloader__center">
        <p className="preloader__word">
          {'Maison Aurèle'.split('').map((c, i) => (
            <span key={i}>{c === ' ' ? ' ' : c}</span>
          ))}
        </p>
        <span className="preloader__rule" />
      </div>
      <div className="preloader__meta">
        <span>Décoration événementielle</span>
        <span className="preloader__count">000</span>
      </div>
    </div>
  )
}
