import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { expertise } from '../data/content'
import RevealImage from '../components/RevealImage'
import SectionHeading from '../components/SectionHeading'
import './Expertise.scss'

export default function Expertise() {
  const ref = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.utils.toArray('.craft').forEach((row) => {
        gsap
          .timeline({ scrollTrigger: { trigger: row, start: 'top 90%', once: true } })
          .from(row.querySelector('.craft__rule'), { scaleX: 0, duration: 1.4, ease: 'expo.inOut' })
          .from(row.querySelectorAll('.craft__num, .craft__title, .craft__text'), { y: 24, autoAlpha: 0, stagger: 0.06, duration: 1 }, 0.3)
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="savoir-faire" className="expertise section">
      <div className="container expertise__grid">
        <div className="expertise__visual">
          <RevealImage
            file="savoir-faire.png"
            alt="Mains d’une fleuriste composant un bouquet de roses ivoire dans l’atelier"
            className="expertise__image"
            sizes="(max-width: 900px) 100vw, 45vw"
            parallax={16}
          />
          <p className="expertise__caption">
            <span className="serif-italic">L’atelier</span> — rue de Charonne, Paris 11e
          </p>
        </div>

        <div className="expertise__content">
          <SectionHeading index="04" label="Savoir-faire" title={<>Sept métiers, <em>un seul</em> regard.</>} />
          <p className="expertise__lead">
            Nous réunissons sous un même toit tous les savoir-faire du décor. Une seule équipe, un seul
            interlocuteur, une cohérence parfaite du premier croquis au dernier invité.
          </p>

          <ol className="expertise__list">
            {expertise.map((item, i) => (
              <li key={item.title} className="craft">
                <span className="craft__rule" />
                <span className="craft__num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="craft__title">{item.title}</h3>
                <p className="craft__text">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
