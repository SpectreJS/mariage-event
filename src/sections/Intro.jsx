import { useRef } from 'react'
import { gsap, SplitText, useGSAP, fontsReady, prefersReducedMotion } from '../lib/gsap'
import RevealText from '../components/RevealText'
import RevealImage from '../components/RevealImage'
import './Intro.scss'

export default function Intro() {
  const ref = useRef(null)

  useGSAP(
    (_, contextSafe) => {
      if (prefersReducedMotion()) return

      // Manifesto lights up word by word as it scrolls through.
      fontsReady().then(
        contextSafe(() => {
          const split = SplitText.create('.intro__manifesto', { type: 'words' })
          gsap.fromTo(
            split.words,
            { opacity: 0.14 },
            {
              opacity: 1,
              stagger: 0.1,
              ease: 'none',
              scrollTrigger: { trigger: '.intro__manifesto', start: 'top 80%', end: 'bottom 45%', scrub: true },
            },
          )
        }),
      )

      // Rotating seal reacts to scroll.
      gsap.to('.intro__seal svg', {
        rotate: 360,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
      })

      gsap.from('.intro__body > *', {
        y: 40,
        autoAlpha: 0,
        stagger: 0.12,
        scrollTrigger: { trigger: '.intro__body', start: 'top 85%', once: true },
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="a-propos" className="intro section">
      <div className="container intro__grid">
        <p className="intro__label eyebrow">
          <span className="gold">(01)</span> L’agence
        </p>

        <RevealText as="h2" className="intro__title">
          Chaque détail <em>raconte</em> une histoire.
        </RevealText>

        <div className="intro__visual">
          <RevealImage
            file="intro.png"
            alt="Détail d’une table : carton calligraphié, serviette en lin nouée de soie et rose de jardin"
            className="intro__image"
            sizes="(max-width: 900px) 80vw, 32vw"
          />
          <div className="intro__seal" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <defs>
                <path id="seal-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
              </defs>
              <text>
                <textPath href="#seal-circle">Maison Aurèle · Depuis 2016 · Paris · </textPath>
              </text>
            </svg>
            <span>✦</span>
          </div>
        </div>

        <div className="intro__body">
          <p className="intro__lead">
            Fondée à Paris par une scénographe et un fleuriste, Maison Aurèle est un atelier de décoration
            événementielle où chaque projet commence par une écoute.
          </p>
          <p>
            Nous composons des décors comme on écrit un récit : un fil conducteur, des matières choisies, une
            lumière juste. Du mariage intime au gala de marque, notre approche reste la même — artisanale,
            exigeante et profondément sensible.
          </p>
          <p className="intro__signature">
            <span className="serif-italic">Aurélie &amp; Gabriel</span>
            <small>Fondateurs</small>
          </p>
        </div>

        <p className="intro__manifesto">
          Nous croyons qu’un décor réussi ne se regarde pas seulement : il se ressent, il accueille, il fait
          naître des souvenirs que l’on garde longtemps après que les bougies se sont éteintes.
        </p>
      </div>
    </section>
  )
}
