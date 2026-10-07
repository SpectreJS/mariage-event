import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { useUI } from '../context/UIContext'
import { brand, nav } from '../data/content'
import Logo from './Logo'
import MagneticButton from './MagneticButton'
import './Footer.scss'

export default function Footer() {
  const { navigateTo, openQuote } = useUI()
  const ref = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('.footer__giant span', {
        yPercent: 100,
        duration: 1.6,
        stagger: 0.04,
        scrollTrigger: { trigger: '.footer__giant', start: 'top 95%', once: true },
      })
      gsap.from('.footer__col', {
        y: 30,
        autoAlpha: 0,
        stagger: 0.08,
        scrollTrigger: { trigger: '.footer__cols', start: 'top 90%', once: true },
      })
    },
    { scope: ref },
  )

  const go = (id) => (e) => {
    e.preventDefault()
    navigateTo(id)
  }

  return (
    <footer ref={ref} id="contact" className="footer">
      <div className="container">
        <div className="footer__top">
          <p className="footer__pitch">
            Un mariage, une célébration, un lancement ? <em>Parlons-en autour d’un café.</em>
          </p>
          <MagneticButton variant="light" onClick={openQuote}>
            Demander un devis
          </MagneticButton>
        </div>

        <div className="footer__cols">
          <div className="footer__col footer__brand">
            <Logo />
            <p>{brand.tagline} haut de gamme.<br />{brand.area}</p>
          </div>

          <nav className="footer__col" aria-label="Navigation secondaire">
            <h3>Navigation</h3>
            {nav.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={go(item.id)}>{item.label}</a>
            ))}
          </nav>

          <div className="footer__col">
            <h3>Contact</h3>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <a href={brand.phoneHref}>{brand.phone}</a>
            <address>{brand.address[0]}<br />{brand.address[1]}</address>
          </div>

          <div className="footer__col">
            <h3>Suivre l’atelier</h3>
            {brand.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label} <span aria-hidden="true">↗</span></a>
            ))}
          </div>
        </div>
      </div>

      <p className="footer__giant" aria-hidden="true">
        {'Aurèle'.split('').map((c, i) => <span key={i}>{c}</span>)}
      </p>

      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} Maison Aurèle — Tous droits réservés</span>
        <span>Mentions légales · Confidentialité</span>
        <button onClick={() => navigateTo('accueil')}>Retour en haut ↑</button>
      </div>
    </footer>
  )
}
