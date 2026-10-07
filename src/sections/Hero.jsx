import { useRef } from 'react'
import { gsap, useGSAP, isTouch, prefersReducedMotion } from '../lib/gsap'
import { useUI } from '../context/UIContext'
import { img, srcSet } from '../lib/img'
import RevealText from '../components/RevealText'
import MagneticButton from '../components/MagneticButton'
import GoldDust from '../components/GoldDust'
import './Hero.scss'

export default function Hero() {
  const { introDone, navigateTo, openQuote } = useUI()
  const ref = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      // Scroll: image sinks, content lifts and fades.
      const st = { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true }
      gsap.to('.hero__layer', { yPercent: 18, ease: 'none', scrollTrigger: st })
      gsap.to('.hero__content', { yPercent: -25, autoAlpha: 0, ease: 'none', scrollTrigger: { ...st, end: '80% top' } })

      // Pointer: subtle 3D tilt of the photograph.
      if (!isTouch()) {
        const layer = ref.current.querySelector('.hero__tilt')
        const rx = gsap.quickTo(layer, 'rotationX', { duration: 1.6, ease: 'power3.out' })
        const ry = gsap.quickTo(layer, 'rotationY', { duration: 1.6, ease: 'power3.out' })
        const tx = gsap.quickTo(layer, 'x', { duration: 1.6, ease: 'power3.out' })
        const move = (e) => {
          const nx = e.clientX / window.innerWidth - 0.5
          const ny = e.clientY / window.innerHeight - 0.5
          ry(nx * 3)
          rx(-ny * 2)
          tx(nx * -24)
        }
        window.addEventListener('pointermove', move)
        return () => window.removeEventListener('pointermove', move)
      }
    },
    { scope: ref },
  )

  // Cinematic entrance once the preloader lifts.
  useGSAP(
    () => {
      if (!introDone || prefersReducedMotion()) return
      gsap
        .timeline()
        .fromTo('.hero__tilt', { scale: 1.3 }, { scale: 1.06, duration: 2.6, ease: 'expo.out' }, 0)
        .from('.hero__veil', { autoAlpha: 0, duration: 1.6 }, 0.2)
        .from('.hero__eyebrow', { y: 20, autoAlpha: 0, duration: 1.2 }, 0.5)
        .from('.hero__text, .hero__actions > *', { y: 30, autoAlpha: 0, duration: 1.4, stagger: 0.1 }, 1.0)
        .from('.hero__aside > *', { autoAlpha: 0, x: 20, duration: 1.2, stagger: 0.1 }, 1.2)
        .from('.hero__scroll', { autoAlpha: 0, y: 20, duration: 1.2 }, 1.4)
    },
    { dependencies: [introDone], scope: ref },
  )

  return (
    <section ref={ref} id="accueil" className="hero">
      <div className="hero__layer">
        <div className="hero__tilt">
          <img
            src={img('hero.png', 1920)}
            srcSet={srcSet('hero.png', [800, 1280, 1920, 2560])}
            sizes="100vw"
            alt="Longue table de réception dressée dans un salon doré, bougies et compositions de roses ivoire"
            fetchPriority="high"
          />
        </div>
        <div className="hero__veil" />
      </div>

      <GoldDust className="hero__dust" count={200} />

      <div className="hero__content container">
        <p className="hero__eyebrow eyebrow">Maison de décoration événementielle — Paris</p>

        <RevealText as="h1" className="hero__title" mode="manual" play={introDone} delay={0.35} stagger={0.12} duration={1.6}>
          Nous transformons vos événements en <em>expériences</em> inoubliables.
        </RevealText>

        <div className="hero__bottom">
          <p className="hero__text">
            Scénographies florales, arts de la table et lumière : nous imaginons des décors sensibles, pensés
            dans les moindres détails, pour les instants qui ne se répètent pas.
          </p>
          <div className="hero__actions">
            <MagneticButton variant="light" onClick={() => navigateTo('realisations')}>
              Découvrir nos réalisations
            </MagneticButton>
            <MagneticButton variant="outline" onClick={openQuote}>
              Demander un devis
            </MagneticButton>
          </div>
        </div>
      </div>

      <div className="hero__aside" aria-hidden="true">
        <span>Saison 2026</span>
        <span className="hero__aside-rule" />
        <span>Mariages · Galas · Célébrations</span>
      </div>

      <button className="hero__scroll" onClick={() => navigateTo('a-propos')} aria-label="Défiler vers la suite">
        <span className="hero__scroll-label">Défiler</span>
        <span className="hero__scroll-line" />
      </button>
    </section>
  )
}
