import { useRef } from 'react'
import { gsap, SplitText, useGSAP, fontsReady, prefersReducedMotion } from '../lib/gsap'

/**
 * Révèle un texte ligne par ligne (masques SplitText).
 * - mode "scroll" (défaut) : déclenché à l'entrée dans le viewport
 * - mode "manual" : déclenché quand `play` passe à true
 */
export default function RevealText({
  as: Tag = 'p',
  children,
  className = '',
  mode = 'scroll',
  play = true,
  delay = 0,
  stagger = 0.09,
  duration = 1.3,
  start = 'top 86%',
  ...rest
}) {
  const ref = useRef(null)

  useGSAP(
    (_, contextSafe) => {
      const el = ref.current
      if (prefersReducedMotion()) {
        gsap.set(el, { autoAlpha: 1 })
        return
      }
      if (mode === 'manual' && !play) return

      fontsReady().then(
        contextSafe(() => {
          const split = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'line' })
          gsap.set(el, { autoAlpha: 1 })
          gsap.from(split.lines, {
            yPercent: 115,
            rotate: 2,
            duration,
            delay,
            stagger,
            ease: 'expo.out',
            // Restore natural text flow afterwards so resizes never break lines.
            onComplete: () => split.revert(),
            scrollTrigger: mode === 'scroll' ? { trigger: el, start, once: true } : undefined,
          })
        }),
      )
    },
    { dependencies: [play, mode], scope: ref },
  )

  return (
    <Tag ref={ref} className={className} style={{ visibility: 'hidden' }} {...rest}>
      {children}
    </Tag>
  )
}
