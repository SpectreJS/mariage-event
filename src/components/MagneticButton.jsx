import { useRef } from 'react'
import { gsap, useGSAP, isTouch } from '../lib/gsap'
import './MagneticButton.scss'

/**
 * Bouton magnétique : suit légèrement le curseur, avec un remplissage
 * qui monte au survol. Rend un <a> si `href` est fourni.
 */
export default function MagneticButton({
  children,
  variant = 'dark',
  href,
  strength = 0.35,
  className = '',
  ...rest
}) {
  const root = useRef(null)
  const inner = useRef(null)

  useGSAP(
    () => {
      if (isTouch()) return
      const el = root.current
      const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })
      const ixTo = gsap.quickTo(inner.current, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })
      const iyTo = gsap.quickTo(inner.current, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })

      const move = (e) => {
        const r = el.getBoundingClientRect()
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height / 2)
        xTo(dx * strength)
        yTo(dy * strength)
        ixTo(dx * strength * 0.4)
        iyTo(dy * strength * 0.4)
      }
      const leave = () => { xTo(0); yTo(0); ixTo(0); iyTo(0) }

      el.addEventListener('mousemove', move)
      el.addEventListener('mouseleave', leave)
      return () => {
        el.removeEventListener('mousemove', move)
        el.removeEventListener('mouseleave', leave)
      }
    },
    { scope: root },
  )

  const Tag = href ? 'a' : 'button'
  return (
    <Tag
      ref={root}
      href={href}
      className={`mbtn mbtn--${variant} ${className}`}
      {...(!href && { type: rest.type || 'button' })}
      {...rest}
    >
      <span className="mbtn__fill" aria-hidden="true" />
      <span ref={inner} className="mbtn__label">
        {children}
      </span>
    </Tag>
  )
}
