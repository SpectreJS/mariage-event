import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { useUI } from '../context/UIContext'
import { projects } from '../data/content'
import { img, srcSet } from '../lib/img'
import SectionHeading from '../components/SectionHeading'
import './Realisations.scss'

export default function Realisations() {
  const { openProject } = useUI()
  const ref = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.utils.toArray('.work').forEach((work, i) => {
        const media = work.querySelector('.work__media')
        const image = media.querySelector('img')
        const dir = i % 2 ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)'
        gsap
          .timeline({ scrollTrigger: { trigger: work, start: 'top 88%', once: true } })
          .fromTo(media, { clipPath: dir }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.7, ease: 'expo.inOut' })
          .from(work.querySelectorAll('.work__caption > *'), { y: 24, autoAlpha: 0, stagger: 0.07, duration: 1.1 }, 0.7)

        gsap.fromTo(
          image,
          { yPercent: -8, scale: 1.18 },
          { yPercent: 8, scale: 1.18, ease: 'none', scrollTrigger: { trigger: work, start: 'top bottom', end: 'bottom top', scrub: true } },
        )
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="realisations" className="works section">
      <div className="container">
        <div className="works__head">
          <SectionHeading index="03" label="Réalisations" title={<>Instants <em>signés</em>.</>} />
          <p className="works__count">
            <span className="serif-italic">{String(projects.length).padStart(2, '0')}</span> projets choisis
            <br />parmi plus de cent récits
          </p>
        </div>

        <div className="works__grid">
          {projects.map((p, i) => (
            <article key={p.id} className={`work work--${i + 1}`}>
              <button
                className="work__hit"
                data-cursor="Voir"
                aria-label={`Ouvrir la réalisation ${p.title}`}
                onClick={(e) => openProject(p, e.currentTarget.parentElement.querySelector('.work__media').getBoundingClientRect())}
              />
              <div className="work__media">
                <img src={img(p.image, 1200)} srcSet={srcSet(p.image, [600, 1000, 1500])} sizes="(max-width: 900px) 100vw, 60vw" alt={`${p.title} — ${p.subtitle}`} loading="lazy" />
              </div>
              <div className="work__caption">
                <span className="work__num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="work__title">{p.title}</h3>
                  <p className="work__sub">{p.subtitle} — {p.place}</p>
                </div>
                <span className="work__tag">{p.category} · {p.year}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
