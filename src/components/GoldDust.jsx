import { useEffect, useRef } from 'react'
import { useIsMobile, useReducedMotion } from '../hooks/useMediaQuery'

/**
 * Canvas Three.js de particules dorées. Three est chargé à la demande,
 * le rendu est suspendu hors écran et allégé sur mobile.
 */
export default function GoldDust({ count = 220, opacity = 0.85, className = '' }) {
  const ref = useRef(null)
  const isMobile = useIsMobile()
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    let scene
    let io
    let cancelled = false
    const canvas = ref.current
    const onMove = (e) => scene?.setMouse((e.clientX / window.innerWidth - 0.5) * 2, -(e.clientY / window.innerHeight - 0.5) * 2)

    import('../three/createGoldDust').then(({ createGoldDust }) => {
      if (cancelled) return
      scene = createGoldDust(canvas, {
        count: isMobile ? Math.round(count * 0.3) : count,
        opacity,
        size: isMobile ? 55 : 70,
      })
      io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? scene.resume() : scene.pause()))
      io.observe(canvas)
      if (!isMobile) window.addEventListener('pointermove', onMove)
    })

    return () => {
      cancelled = true
      io?.disconnect()
      window.removeEventListener('pointermove', onMove)
      scene?.dispose()
    }
  }, [count, opacity, isMobile, reduced])

  if (reduced) return null
  return <canvas ref={ref} className={`gold-dust ${className}`} aria-hidden="true" />
}
