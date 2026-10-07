import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { useMediaQuery } from '../hooks/useMediaQuery'
import './Cursor.scss'

/** Curseur discret (desktop uniquement). Les éléments [data-cursor="Label"] l'agrandissent. */
export default function Cursor() {
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)')
  const ref = useRef(null)
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (!fine) return
    const el = ref.current
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })

    const move = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
      const target = e.target.closest?.('[data-cursor]')
      const next = target ? target.dataset.cursor : ''
      setLabel((prev) => (prev === next ? prev : next))
    }
    const hide = () => gsap.to(el, { autoAlpha: 0, duration: 0.3 })
    const show = () => gsap.to(el, { autoAlpha: 1, duration: 0.3 })

    window.addEventListener('pointermove', move)
    document.addEventListener('mouseleave', hide)
    document.addEventListener('mouseenter', show)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('mouseleave', hide)
      document.removeEventListener('mouseenter', show)
    }
  }, [fine])

  if (!fine) return null
  return (
    <div ref={ref} className={`cursor ${label ? 'is-active' : ''}`} aria-hidden="true">
      <span className="cursor__dot">
        <span className="cursor__label">{label}</span>
      </span>
    </div>
  )
}
