import { UIProvider } from './context/UIContext'
import Preloader from './components/Preloader'
import PageTransition from './components/PageTransition'
import Cursor from './components/Cursor'
import Header from './components/Header'
import Footer from './components/Footer'
import ProjectModal from './components/ProjectModal'
import QuoteModal from './components/QuoteModal'
import Hero from './sections/Hero'
import Intro from './sections/Intro'
import Services from './sections/Services'
import Realisations from './sections/Realisations'
import Expertise from './sections/Expertise'
import Stats from './sections/Stats'
import Testimonials from './sections/Testimonials'
import Process from './sections/Process'
import FinalCta from './sections/FinalCta'

export default function App() {
  return (
    <UIProvider>
      <Preloader />
      <PageTransition />
      <Cursor />
      <div className="grain" aria-hidden="true" />

      <Header />
      <main>
        <Hero />
        <Intro />
        <Services />
        <Realisations />
        <Expertise />
        <Stats />
        <Testimonials />
        <Process />
        <FinalCta />
      </main>
      <Footer />

      <ProjectModal />
      <QuoteModal />
    </UIProvider>
  )
}
