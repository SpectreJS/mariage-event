import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { testimonials } from '../data/content'
import './Testimonials.scss'

const DURATION = 8 // seconds per testimonial

export default function Testimonials() {
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const progress = useRef(null)

  const go = useCallback((i) => setActive((i + testimonials.length) % testimonials.length), [])

  // Crossfade between quotes, with a soft blur and lift.
  useGSAP(
    () => {
      const items = gsap.utils.toArray('.tquote')
      items.forEach((el, i) => {
        if (i === active) {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 30, filter: 'blur(8px)' },
            { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: prefersReducedMotion() ? 0 : 1.4, delay: 0.25 },
          )
        } else {
          gsap.to(el, { autoAlpha: 0, y: -20, filter: 'blur(6px)', duration: 0.6, ease: 'power2.in' })
        }
      })
    },
    { dependencies: [active], scope: ref },
  )

  // Autoplay with a visible progress line.
  useEffect(() => {
    if (prefersReducedMotion()) return
    const tween = gsap.fromTo(
      progress.current,
      { scaleX: 0 },
      { scaleX: 1, duration: DURATION, ease: 'none', onComplete: () => go(active + 1) },
    )
    if (paused) tween.pause()
    return () => tween.kill()
  }, [active, paused, go])

  return (
    <section
      ref={ref}
      className="testimonials section"
      aria-label="Témoignages"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container testimonials__inner">
        <p className="eyebrow">
          <span className="gold">(06)</span> Ils nous ont confié leur histoire
        </p>

        <span className="testimonials__mark" aria-hidden="true">“</span>

        <div className="testimonials__stage" aria-live="polite">
          {testimonials.map((t, i) => (
            <figure key={t.name} className="tquote" aria-hidden={i !== active}>
              <blockquote className="tquote__text">{t.quote}</blockquote>
              <figcaption className="tquote__author">
                <span className="serif-italic">{t.name}</span>
                <small>{t.context}</small>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="testimonials__controls">
          <div className="testimonials__dots">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                className={`testimonials__dot ${i === active ? 'is-active' : ''}`}
                onClick={() => go(i)}
                aria-label={`Témoignage ${i + 1}`}
              >
                0{i + 1}
              </button>
            ))}
          </div>
          <span className="testimonials__progress"><span ref={progress} /></span>
          <div className="testimonials__arrows">
            <button onClick={() => go(active - 1)} aria-label="Témoignage précédent">←</button>
            <button onClick={() => go(active + 1)} aria-label="Témoignage suivant">→</button>
          </div>
        </div>
      </div>
    </section>
  )
}
