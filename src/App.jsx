import { useEffect, useRef, useCallback, lazy, Suspense } from 'react'
import { ScrollProgress } from './components/ScrollProgress'
import Lenis from '@studio-freight/lenis'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useLocation, Routes, Route, useNavigate } from 'react-router-dom'
const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))
const Notes = lazy(() => import('./pages/Notes'))
const About = lazy(() => import('./pages/About'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const NotFoundPage = lazy(() => import('./components/NotFoundPage'))
import ScrollToTop from './components/ScrollToTop'

function App() {
  const lenisRef = useRef(null)
  const location = useLocation()
  const state = location.state
  const backgroundLocation = state?.backgroundLocation
  const navigate = useNavigate()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smooth: true,
    })

    window.lenis = lenis
    lenisRef.current = lenis

    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true })
        lenisRef.current.resize()
      }
    }, 50)

    return () => clearTimeout(timeout)
  }, [location.pathname])

  const handleCloseModal = useCallback(() => {
    if (window.history.length > 2) {
      navigate(-1)
    } else {
      navigate('/', { replace: true })
    }
  }, [navigate])

  return (
    <div
      data-lenis
      className="relative flex min-h-screen flex-col overflow-x-hidden bg-white text-gray-900 dark:bg-gray-950 dark:text-white font-sans"
    >
      <ScrollProgress className="top-16 z-60" />
      <Navbar />
      <div className="relative z-20 flex flex-1 flex-col">
        <ScrollToTop />
        <main
          className={`flex-grow ${
            location.pathname === '/'
              ? 'flex flex-col'
              : 'flex items-center justify-center'
          }`}
        >
          <Suspense
            fallback={
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-black backdrop-blur">
                <div className="loader" />
              </div>
            }
          >
            <Routes location={backgroundLocation || location}>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/project/:slug"
                element={<ProjectDetail onClose={handleCloseModal} />}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
