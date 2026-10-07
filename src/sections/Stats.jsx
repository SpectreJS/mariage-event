import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { stats } from '../data/content'
import './Stats.scss'

export default function Stats() {
  const ref = useRef(null)

  useGSAP(
    () => {
      const reduced = prefersReducedMotion()
      gsap.utils.toArray('.stat').forEach((stat, i) => {
        const num = stat.querySelector('.stat__value')
        const target = Number(num.dataset.value)
        if (reduced) {
          num.textContent = target
          return
        }
        const counter = { v: 0 }
        gsap
          .timeline({ scrollTrigger: { trigger: ref.current, start: 'top 70%', once: true }, delay: i * 0.12 })
          .from(stat, { y: 60, autoAlpha: 0, duration: 1.4 })
          .to(counter, {
            v: target,
            duration: 2.4,
            ease: 'power3.out',
            onUpdate: () => (num.textContent = Math.round(counter.v)),
          }, 0.1)
          .from(stat.querySelector('.stat__rule'), { scaleX: 0, duration: 1.6, ease: 'expo.inOut' }, 0.2)
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="stats section" aria-label="Chiffres clés">
      <div className="container">
        <p className="stats__label eyebrow">
          <span className="gold">(05)</span> En quelques chiffres
        </p>
        <div className="stats__grid">
          {stats.map((s) => (
            <div key={s.label} className="stat">
              <p className="stat__number">
                <span className="stat__value" data-value={s.value}>0</span>
                <span className="stat__suffix">{s.suffix}</span>
              </p>
              <span className="stat__rule" />
              <p className="stat__label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
