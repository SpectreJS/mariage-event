import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { steps } from '../data/content'
import SectionHeading from '../components/SectionHeading'
import './Process.scss'

export default function Process() {
  const ref = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const mm = gsap.matchMedia()

      // The thread draws itself as the section scrolls by; each step lights up in turn.
      mm.add({ desktop: '(min-width: 900px)', mobile: '(max-width: 899px)' }, ({ conditions }) => {
        const prop = conditions.desktop ? 'scaleX' : 'scaleY'
        gsap.fromTo('.process__thread span', { [prop]: 0 }, {
          [prop]: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.process__steps', start: 'top 75%', end: 'bottom 55%', scrub: true },
        })
        gsap.utils.toArray('.step').forEach((step) => {
          gsap.from(step, {
            y: 40,
            autoAlpha: 0,
            duration: 1.2,
            scrollTrigger: { trigger: step, start: conditions.desktop ? 'top 80%' : 'top 88%', once: true },
          })
        })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="process section" aria-label="Processus">
      <div className="container">
        <SectionHeading index="07" label="Notre méthode" title={<>De l’idée à <em>l’instant</em>.</>} />

        <ol className="process__steps">
          <span className="process__thread" aria-hidden="true"><span /></span>
          {steps.map((s, i) => (
            <li key={s.index} className="step">
              <span className="step__dot" />
              <span className="step__index">{s.index}</span>
              <h3 className="step__title">
                {s.title}
                {i < steps.length - 1 && <i className="step__arrow" aria-hidden="true">→</i>}
              </h3>
              <p className="step__text">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
