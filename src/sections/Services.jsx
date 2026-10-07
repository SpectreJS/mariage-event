import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { useUI } from '../context/UIContext'
import { services, eventTypes } from '../data/content'
import { img, srcSet } from '../lib/img'
import SectionHeading from '../components/SectionHeading'
import './Services.scss'

// Map each service to the matching option of the quote form.
const presetFor = (i) => eventTypes[i] ?? ''

export default function Services() {
  const { openQuote } = useUI()
  const ref = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.utils.toArray('.service').forEach((card, i) => {
        const media = card.querySelector('.service__media')
        gsap
          .timeline({ scrollTrigger: { trigger: card, start: 'top 85%', once: true } })
          .fromTo(media, { clipPath: 'inset(18% 12% 18% 12%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.8, ease: 'expo.inOut' })
          .fromTo(media.querySelector('img'), { scale: 1.4 }, { scale: 1, duration: 2.2 }, 0)
          .from(card.querySelectorAll('.service__meta > *'), { y: 30, autoAlpha: 0, stagger: 0.08, duration: 1.2 }, 0.6)

        // Offset columns drift at different speeds for an editorial rhythm.
        gsap.to(card, {
          y: i % 2 ? -60 : 30,
          ease: 'none',
          scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="prestations" className="services section">
      <div className="container">
        <div className="services__head">
          <SectionHeading
            index="02"
            label="Prestations"
            title={<>Des décors <em>pensés</em> pour chaque histoire.</>}
          />
          <p className="services__intro">
            Quatre univers, une même exigence. Chaque prestation est entièrement personnalisée, de la première
            esquisse au dernier pétale.
          </p>
        </div>

        <div className="services__grid">
          {services.map((s, i) => (
            <article key={s.id} className="service" data-cursor="Devis">
              <button className="service__hit" onClick={() => openQuote(presetFor(i))} aria-label={`${s.title} — demander un devis`} />
              <div className="service__media">
                <img
                  src={img(s.image, 1000)}
                  srcSet={srcSet(s.image, [600, 900, 1300])}
                  sizes="(max-width: 900px) 100vw, 45vw"
                  alt=""
                  loading="lazy"
                />
                <div className="service__shade" />
                <div className="service__overlay">
                  <span className="service__index">{s.index}</span>
                  <div className="service__copy">
                    <h3 className="service__title">{s.title}</h3>
                    <p className="service__text">{s.text}</p>
                    <span className="service__more">
                      Demander un devis <i aria-hidden="true">→</i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="service__meta">
                <span>{s.index} / 04</span>
                <span>{s.title}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
