import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

gsap.defaults({ ease: 'expo.out', duration: 1.2 })

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const isTouch = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches

/** Fonts must be ready before splitting text into lines. */
export const fontsReady = () =>
  typeof document !== 'undefined' && document.fonts ? document.fonts.ready : Promise.resolve()

export { gsap, ScrollTrigger, SplitText, useGSAP }
