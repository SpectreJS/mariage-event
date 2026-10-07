import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'

const UIContext = createContext(null)

export function UIProvider({ children }) {
  const lenisRef = useRef(null)
  const transitionRef = useRef(null) // imperative API exposed by <PageTransition />
  const [introDone, setIntroDone] = useState(false)
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [quotePreset, setQuotePreset] = useState('')
  const [activeProject, setActiveProject] = useState(null)

  // Smooth scroll, synced with GSAP's ticker so ScrollTrigger stays in step.
  useEffect(() => {
    if (prefersReducedMotion()) return
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const lockScroll = useCallback((locked) => {
    const lenis = lenisRef.current
    if (lenis) locked ? lenis.stop() : lenis.start()
    document.documentElement.style.overflow = locked ? 'hidden' : ''
  }, [])

  useEffect(() => {
    lockScroll(!introDone || quoteOpen || !!activeProject)
  }, [introDone, quoteOpen, activeProject, lockScroll])

  // Fonts change line heights: re-measure every trigger once the intro has lifted.
  useEffect(() => {
    if (introDone) document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [introDone])

  const jumpTo = useCallback((id) => {
    const el = id === 'accueil' ? 0 : document.getElementById(id)
    if (el === null) return
    const lenis = lenisRef.current
    if (lenis) lenis.scrollTo(el, { immediate: true, force: true })
    else window.scrollTo({ top: el === 0 ? 0 : el.getBoundingClientRect().top + window.scrollY })
  }, [])

  /** Navigate to a section through the curtain transition. */
  const navigateTo = useCallback(
    (id) => {
      const t = transitionRef.current
      if (!t || prefersReducedMotion()) return jumpTo(id)
      t.play(() => jumpTo(id))
    },
    [jumpTo],
  )

  const value = useMemo(
    () => ({
      introDone,
      setIntroDone,
      quoteOpen,
      quotePreset,
      openQuote: (preset) => {
        setQuotePreset(typeof preset === 'string' ? preset : '')
        setQuoteOpen(true)
      },
      closeQuote: () => setQuoteOpen(false),
      activeProject,
      openProject: (project, rect) => setActiveProject({ project, rect }),
      closeProject: () => setActiveProject(null),
      navigateTo,
      transitionRef,
    }),
    [introDone, quoteOpen, quotePreset, activeProject, navigateTo],
  )

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

export const useUI = () => useContext(UIContext)
