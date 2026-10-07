import { useEffect, useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { useUI } from '../context/UIContext'
import { projects } from '../data/content'
import { img, srcSet } from '../lib/img'
import MagneticButton from './MagneticButton'
import './ProjectModal.scss'

/** Ouverture immersive : la vignette cliquée s'étend jusqu'au plein écran. */
export default function ProjectModal() {
  const { activeProject, closeProject, openProject, openQuote } = useUI()
  const ref = useRef(null)
  const closing = useRef(false)
  const project = activeProject?.project
  const rect = activeProject?.rect

  useGSAP(
    () => {
      if (!project) return
      closing.current = false
      const el = ref.current
      el.scrollTop = 0
      const vw = window.innerWidth
      const vh = window.innerHeight
      const from = rect
        ? `inset(${rect.top}px ${vw - rect.right}px ${vh - rect.bottom}px ${rect.left}px)`
        : 'inset(100% 0% 0% 0%)'

      gsap
        .timeline()
        .fromTo(el, { clipPath: from }, { clipPath: 'inset(0px 0px 0px 0px)', duration: 1.3, ease: 'expo.inOut' })
        .fromTo('.pmodal__hero img', { scale: 1.25 }, { scale: 1, duration: 2 }, 0.1)
        .from('.pmodal__titlewrap > *', { yPercent: 110, duration: 1.3, stagger: 0.08 }, 0.7)
        .from('.pmodal__top > *, .pmodal__body > *', { y: 30, autoAlpha: 0, duration: 1.1, stagger: 0.06 }, 0.9)
    },
    { dependencies: [project], scope: ref },
  )

  const close = () => {
    if (closing.current) return
    closing.current = true
    gsap.to(ref.current, {
      clipPath: 'inset(0% 0% 100% 0%)',
      duration: 1,
      ease: 'expo.inOut',
      onComplete: closeProject,
    })
  }

  useEffect(() => {
    if (!project) return
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (!project) return null

  const i = projects.findIndex((p) => p.id === project.id)
  const next = projects[(i + 1) % projects.length]

  return (
    <div ref={ref} className="pmodal" role="dialog" aria-modal="true" aria-label={project.title} data-lenis-prevent>
      <div className="pmodal__top">
        <span className="eyebrow">{project.category} · {project.year}</span>
        <button className="pmodal__close" onClick={close} autoFocus>
          Fermer <span aria-hidden="true">✕</span>
        </button>
      </div>

      <div className="pmodal__hero">
        <img src={img(project.image, 2000)} srcSet={srcSet(project.image, [800, 1400, 2000, 2600])} sizes="100vw" alt={`${project.title} — ${project.subtitle}`} />
        <div className="pmodal__shade" />
        <div className="pmodal__heading">
          <div className="pmodal__titlewrap"><p className="pmodal__sub">{project.subtitle}</p></div>
          <div className="pmodal__titlewrap"><h2 className="pmodal__title">{project.title}</h2></div>
        </div>
      </div>

      <div className="pmodal__body">
        <dl className="pmodal__facts">
          <div><dt>Lieu</dt><dd>{project.place}</dd></div>
          <div><dt>Année</dt><dd>{project.year}</dd></div>
          <div><dt>Format</dt><dd>{project.guests}</dd></div>
        </dl>

        <div className="pmodal__story">
          <p className="pmodal__text">{project.text}</p>
          <ul className="pmodal__details">
            {project.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <MagneticButton
            variant="dark"
            onClick={() => {
              closeProject()
              openQuote(project.category === 'Mariage' ? 'Mariage' : '')
            }}
          >
            Imaginer un projet similaire
          </MagneticButton>
        </div>
      </div>

      <button className="pmodal__next" onClick={() => openProject(next, null)} data-cursor="Suivant">
        <span className="eyebrow">Réalisation suivante</span>
        <span className="pmodal__next-title">{next.title} <i aria-hidden="true">→</i></span>
        <img src={img(next.image, 600)} alt="" loading="lazy" />
      </button>
    </div>
  )
}
