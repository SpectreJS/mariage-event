import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '../lib/gsap'
import { useUI } from '../context/UIContext'
import { nav } from '../data/content'
import Logo from './Logo'
import MagneticButton from './MagneticButton'
import './Header.scss'

export default function Header() {
  const { introDone, navigateTo, openQuote } = useUI()
  const ref = useRef(null)
  const menuRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Transparent → solid, and hide while scrolling down.
  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const y = self.scroll()
        setScrolled(y > 60)
        setHidden(self.direction === 1 && y > window.innerHeight * 0.8)
      },
    })
    return () => st.kill()
  }, [])

  useGSAP(
    () => {
      if (!introDone) return
      gsap.from('.header__inner > *', { y: -30, autoAlpha: 0, duration: 1.4, stagger: 0.08, delay: 0.6 })
    },
    { dependencies: [introDone], scope: ref },
  )

  useGSAP(
    () => {
      if (!menuOpen) return
      gsap.from('.mmenu__link', { yPercent: 110, duration: 1, stagger: 0.06, delay: 0.25 })
      gsap.from('.mmenu__foot', { autoAlpha: 0, y: 20, duration: 1, delay: 0.6 })
    },
    { dependencies: [menuOpen], scope: menuRef },
  )

  const go = (id) => (e) => {
    e.preventDefault()
    setMenuOpen(false)
    navigateTo(id)
  }

  return (
    <>
      <header
        ref={ref}
        className={`header ${scrolled ? 'is-scrolled' : ''} ${hidden && !menuOpen ? 'is-hidden' : ''} ${menuOpen ? 'is-menu' : ''}`}
      >
        <div className="header__inner">
          <a href="#accueil" className="header__logo" onClick={go('accueil')} aria-label="Maison Aurèle — accueil">
            <Logo />
          </a>

          <nav className="header__nav" aria-label="Navigation principale">
            {nav.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={go(item.id)} className="header__link">
                <span data-text={item.label}>{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="header__actions">
            <MagneticButton
              variant={scrolled ? 'dark' : 'light'}
              className="header__cta"
              onClick={openQuote}
              strength={0.25}
            >
              Demander un devis
            </MagneticButton>
            <button
              className="header__burger"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div ref={menuRef} className={`mmenu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        {menuOpen && (
          <>
            <nav className="mmenu__nav">
              {nav.map((item, i) => (
                <div key={item.id} className="mmenu__row">
                  <a href={`#${item.id}`} onClick={go(item.id)} className="mmenu__link">
                    <sup>0{i + 1}</sup>
                    {item.label}
                  </a>
                </div>
              ))}
            </nav>
            <div className="mmenu__foot">
              <MagneticButton
                variant="dark"
                onClick={() => {
                  setMenuOpen(false)
                  openQuote()
                }}
              >
                Demander un devis
              </MagneticButton>
            </div>
          </>
        )}
      </div>
    </>
  )
}
