import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { img, srcSet } from '../lib/img'

/**
 * Image révélée par un rideau (clip-path) + parallaxe interne au scroll.
 */
export default function RevealImage({
  file,
  alt,
  className = '',
  sizes = '(max-width: 900px) 100vw, 50vw',
  parallax = 12,
  direction = 'up',
  priority = false,
}) {
  const ref = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const el = ref.current
      const image = el.querySelector('img')
      const from = {
        up: 'inset(100% 0% 0% 0%)',
        left: 'inset(0% 100% 0% 0%)',
        right: 'inset(0% 0% 0% 100%)',
      }[direction]

      gsap
        .timeline({ scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
        .fromTo(el, { clipPath: from }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut' })
        .fromTo(image, { scale: 1.35 }, { scale: 1.12, duration: 2, ease: 'expo.out' }, 0.2)

      if (parallax) {
        gsap.fromTo(
          image,
          { yPercent: -parallax / 2 },
          {
            yPercent: parallax / 2,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      }
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={`media ${className}`}>
      <img
        src={img(file, 1400)}
        srcSet={srcSet(file)}
        sizes={sizes}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  )
}
