import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { useUI } from '../context/UIContext'
import { img, srcSet } from '../lib/img'
import RevealText from '../components/RevealText'
import MagneticButton from '../components/MagneticButton'
import GoldDust from '../components/GoldDust'
import './FinalCta.scss'

export default function FinalCta() {
  const { openQuote } = useUI()
  const ref = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      // The frame opens up into a full-bleed scene as it enters the viewport.
      gsap.fromTo(
        '.fcta__frame',
        { clipPath: 'inset(12% 8% 12% 8% round 24px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', end: 'top 10%', scrub: true },
        },
      )
      gsap.fromTo('.fcta__frame img', { scale: 1.25, yPercent: -6 }, {
        scale: 1.05,
        yPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
      gsap.from('.fcta__sub, .fcta__action', {
        y: 30,
        autoAlpha: 0,
        stagger: 0.12,
        scrollTrigger: { trigger: '.fcta__content', start: 'top 70%', once: true },
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="fcta" aria-label="Demander un devis">
      <div className="fcta__frame">
        <img
          src={img('cta.png', 1920)}
          srcSet={srcSet('cta.png', [800, 1280, 1920, 2560])}
          sizes="100vw"
          alt="Réception dans une serre de verre, bougies suspendues et glycine blanche"
          loading="lazy"
        />
        <div className="fcta__veil" />
        <GoldDust className="fcta__dust" count={140} opacity={0.7} />

        <div className="fcta__content container">
          <p className="eyebrow fcta__eyebrow">(08) Votre projet</p>
          <RevealText as="h2" className="fcta__title" stagger={0.14} duration={1.6}>
            Imaginez votre événement. <em>Nous créons le décor.</em>
          </RevealText>
          <p className="fcta__sub">
            Partagez-nous votre date, votre lieu et vos envies : nous revenons vers vous sous 48 heures avec une
            première intention créative.
          </p>
          <div className="fcta__action">
            <MagneticButton variant="light" onClick={openQuote} strength={0.45}>
              Demander un devis <span aria-hidden="true">→</span>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  )
}
