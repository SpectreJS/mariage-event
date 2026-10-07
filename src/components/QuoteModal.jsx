import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { useUI } from '../context/UIContext'
import { brand, eventTypes } from '../data/content'
import MagneticButton from './MagneticButton'
import './QuoteModal.scss'

const FORM_NAME = 'devis'

/** Panneau latéral « Demander un devis », soumis à Netlify Forms en AJAX. */
export default function QuoteModal() {
  const { quoteOpen, closeQuote, quotePreset } = useUI()
  const ref = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [type, setType] = useState('')

  useEffect(() => {
    if (quoteOpen) {
      setStatus('idle')
      setType(quotePreset || '')
    }
  }, [quoteOpen, quotePreset])

  useGSAP(
    () => {
      if (!quoteOpen) return
      gsap
        .timeline()
        .fromTo('.qmodal__backdrop', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 })
        .fromTo('.qmodal__panel', { xPercent: 100 }, { xPercent: 0, duration: 1.1, ease: 'expo.out' }, 0)
        .from('.qmodal__panel > *', { y: 30, autoAlpha: 0, stagger: 0.06, duration: 1 }, 0.3)
    },
    { dependencies: [quoteOpen], scope: ref },
  )

  const close = () => {
    gsap
      .timeline({ onComplete: closeQuote })
      .to('.qmodal__panel', { xPercent: 100, duration: 0.8, ease: 'expo.in' })
      .to('.qmodal__backdrop', { autoAlpha: 0, duration: 0.5 }, '-=0.4')
  }

  useEffect(() => {
    if (!quoteOpen) return
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(e.currentTarget)).toString(),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (!quoteOpen) return null

  return (
    <div ref={ref} className="qmodal" role="dialog" aria-modal="true" aria-labelledby="qmodal-title">
      <div className="qmodal__backdrop" onClick={close} />
      <div className="qmodal__panel" data-lenis-prevent>
        <div className="qmodal__head">
          <p className="eyebrow">Demande de devis</p>
          <button className="qmodal__close" onClick={close} aria-label="Fermer">✕</button>
        </div>

        {status === 'success' ? (
          <div className="qmodal__success">
            <span className="qmodal__seal">✦</span>
            <h2 id="qmodal-title" className="qmodal__title">Merci, <em>votre histoire</em> nous est parvenue.</h2>
            <p>Nous revenons vers vous sous 48 heures avec une première intention créative.</p>
            <MagneticButton variant="dark" onClick={close}>Retour au site</MagneticButton>
          </div>
        ) : (
          <>
            <h2 id="qmodal-title" className="qmodal__title">
              Racontez-nous <em>votre événement.</em>
            </h2>
            <form
              name={FORM_NAME}
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              className="qform"
              onSubmit={onSubmit}
            >
              <input type="hidden" name="form-name" value={FORM_NAME} />
              <p hidden>
                <label>Ne pas remplir : <input name="bot-field" /></label>
              </p>

              <fieldset className="qform__types">
                <legend>Type d’événement</legend>
                {eventTypes.map((t) => (
                  <label key={t} className={`qform__chip ${type === t ? 'is-active' : ''}`}>
                    <input type="radio" name="type" value={t} checked={type === t} onChange={() => setType(t)} required />
                    {t}
                  </label>
                ))}
              </fieldset>

              <div className="qform__row">
                <Field label="Nom & prénom" name="nom" required autoComplete="name" />
                <Field label="Email" name="email" type="email" required autoComplete="email" />
              </div>
              <div className="qform__row">
                <Field label="Téléphone" name="telephone" type="tel" autoComplete="tel" />
                <Field label="Date envisagée" name="date" type="date" />
              </div>
              <div className="qform__row">
                <Field label="Nombre d’invités" name="invites" type="number" min="1" />
                <Field label="Lieu / ville" name="lieu" />
              </div>
              <Field label="Vos envies, votre univers…" name="message" textarea required />

              {status === 'error' && (
                <p className="qform__error" role="alert">
                  L’envoi n’a pas abouti. Réessayez, ou écrivez-nous directement à{' '}
                  <a href={`mailto:${brand.email}`}>{brand.email}</a>.
                </p>
              )}

              <div className="qform__submit">
                <MagneticButton variant="dark" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Envoi en cours…' : 'Envoyer ma demande'}
                </MagneticButton>
                <small>Réponse sous 48 h · Sans engagement</small>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

function Field({ label, name, textarea, ...props }) {
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <label className="qform__field">
      <Tag name={name} placeholder=" " rows={textarea ? 4 : undefined} {...props} />
      <span>{label}{props.required && ' *'}</span>
    </label>
  )
}
