import { useEffect, useRef, useCallback } from 'react'
import Lenis from 'lenis' // 新版 lenis 包名
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useLocation, Routes, Route, useNavigate } from 'react-router-dom'
import ProjectDetail from './pages/ProjectDetail'
import NotFoundPage from './components/NotFoundPage'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Notes from './pages/Notes'
import About from './pages/About'
import ScrollToTop from './components/ScrollToTop'

function App() {
  const lenisRef = useRef(null)
  const location = useLocation()
  const state = location.state
  const backgroundLocation = state?.backgroundLocation
  const navigate = useNavigate()

  useEffect(() => {
    // 初始化 Lenis 实例，参数可根据需求调整
    const lenis = new Lenis({
      duration: 1,
      //easing: (t) => 1 - Math.pow(2, -10 * t),
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smooth: true,
      // 你可以额外加 autoResize: true，但默认即是 true
      autoResize: true,
    })

    // 挂载全局，方便调试
    window.lenis = lenis
    lenisRef.current = lenis

    // 手动 requestAnimationFrame 轮询
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // 组件卸载时销毁实例
    return () => {
      lenis.destroy()
      lenisRef.current = null
      delete window.lenis
    }
  }, [])

  // 路由切换后，重置滚动位置，调用 resize
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true })
        lenisRef.current.resize()
      }
    }, 100) // 延迟调用，保证页面 DOM 完成渲染

    return () => clearTimeout(timeout)
  }, [location.pathname])

  // 弹窗关闭逻辑保持不变
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
      className="relative flex min-h-screen flex-col overflow-x-hidden bg-white text-gray-900 dark:bg-black dark:text-white font-sans"
    >
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
          <Routes location={backgroundLocation || location}>
            <Route path="/" element={<Home key="home" />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/project/:slug"
              element={<ProjectDetail onClose={handleCloseModal} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
