import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import Lenis from '@studio-freight/lenis'
import ReactMarkdown from 'react-markdown'
import projects from '../data/projects'
import blogs from '../data/blogs'
import { ScrollProgress } from '../components/ScrollProgress'

const markdownFiles = import.meta.glob('../data/content/*.md', { as: 'raw' })

const ProjectDetail = ({
  fullscreen = false,
  slug: propSlug,
  onClose,
  type,
}) => {
  const params = useParams()
  const slug = propSlug || params.slug
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const project =
    projects.find((p) => p.slug === slug) || blogs.find((b) => b.slug === slug)
  const modalScrollRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!fullscreen) {
      document.body.style.overflow = 'hidden'
      if (window.lenis) {
        window.lenis.stop()
      }
      return () => {
        document.body.style.overflow = ''
        if (window.lenis) {
          window.lenis.start()
        }
      }
    }
  }, [fullscreen])

  useEffect(() => {
    if (!fullscreen && modalScrollRef.current) {
      const modalLenis = new Lenis({
        wrapper: modalScrollRef.current,
        content: modalScrollRef.current,
        duration: 1.2,
        smooth: true,
      })

      const raf = (time) => {
        modalLenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)

      return () => {
        modalLenis.destroy()
      }
    }
  }, [fullscreen])

  useEffect(() => {
    if (!fullscreen && onClose) {
      const handleEsc = (e) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }
      window.addEventListener('keydown', handleEsc)
      return () => window.removeEventListener('keydown', handleEsc)
    }
  }, [fullscreen, onClose])

  useEffect(() => {
    const interval = setInterval(() => {
      const el = modalScrollRef.current
      if (!fullscreen && el) {
        const handleContextMenu = (e) => {
          e.preventDefault()
          e.stopPropagation()
        }

        el.addEventListener('contextmenu', handleContextMenu, {
          passive: false,
        })
        clearInterval(interval)

        // 清理函数在组件卸载或依赖变化时执行
        return () => {
          el.removeEventListener('contextmenu', handleContextMenu)
        }
      }
    }, 100)

    return () => clearInterval(interval)
  }, [fullscreen])

  // 提取 loadContent 到 useEffect 之外
  const loadContent = async () => {
    if (!project) return
    const filePath = `../data/content/${project.contentFile}`
    const importer = markdownFiles[filePath]
    if (!importer) {
      navigate('/404', { replace: true })
      return
    }
    const res = await importer()
    setContent(res)
    setLoading(false)
  }

  useEffect(() => {
    loadContent()
  }, [project, navigate])

  if (!fullscreen && !project && !loading) {
    return null
  }

  return ReactDOM.createPortal(
    <div
      className={
        fullscreen
          ? 'min-h-screen bg-white dark:bg-neutral-900 overflow-auto'
          : 'fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex justify-center items-center'
      }
    >
      {loading && !fullscreen ? (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="loader mb-4"></div>
          <div className="text-white text-lg">Loading...</div>
        </div>
      ) : (
        !fullscreen && (
          <div
            className="relative mx-auto bg-black text-gray-100 px-4 max-w-[1440px] w-full h-screen flex flex-col"
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
          >
            {/* 标题区 */}
            <div className="sticky top-0 z-50  flex items-center justify-between py-4">
              <div>
                <h1 className="text-2xl font-bold">{project.title}</h1>
                <div className="text-sm text-gray-400 flex space-x-3 mt-1">
                  {project.type && (
                    <span className="text-indigo-400">{project.type}</span>
                  )}
                  {project.type && project.date && (
                    <span className="text-gray-400">|</span>
                  )}
                  <span className="text-gray-400">{project.date}</span>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  className="p-2 bg-black bg-white/20 hover:bg-white/30 text-white rounded mr-2"
                  onClick={() => {
                    setLoading(true)
                    loadContent()
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M5.46257 4.43262C7.21556 2.91688 9.5007 2 12 2C17.5228 2 22 6.47715 22 12C22 14.1361 21.3302 16.1158 20.1892 17.7406L17 12H20C20 7.58172 16.4183 4 12 4C9.84982 4 7.89777 4.84827 6.46023 6.22842L5.46257 4.43262ZM18.5374 19.5674C16.7844 21.0831 14.4993 22 12 22C6.47715 22 2 17.5228 2 12C2 9.86386 2.66979 7.88416 3.8108 6.25944L7 12H4C4 16.4183 7.58172 20 12 20C14.1502 20 16.1022 19.1517 17.5398 17.7716L18.5374 19.5674Z" />
                  </svg>
                </button>
                <button
                  className="p-2 bg-black bg-white/20 hover:bg-white/30 text-white rounded"
                  onClick={() => {
                    if (onClose) onClose()
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-current text-white"
                  >
                    <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z" />
                  </svg>
                </button>
              </div>
            </div>

            <ScrollProgress
              target={modalScrollRef}
              className="mt-22 z-[9999] h-[2px]"
            />

            {/* 内容区，滚动区域 */}
            <div
              ref={modalScrollRef}
              className="overflow-y-auto flex-1 scrollbar-hide"
            >
              <article className="prose dark:prose-invert max-w-none">
                <ReactMarkdown>{content}</ReactMarkdown>
              </article>

              {/* 其他作品推荐模块 */}
              <div className="my-12">
                <h2 className="text-2xl font-semibold mb-4 text-white">
                  other works
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects
                    .filter((p) => p.slug !== slug)
                    .slice(0, 3)
                    .map((item) => (
                      <div
                        key={item.slug}
                        className="relative group cursor-pointer overflow-hidden rounded"
                        onClick={() => {
                          navigate(`/project/${item.slug}`)
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-all duration-300">
                          <h3 className="text-white text-lg font-semibold">
                            {item.title}
                          </h3>
                          <p className="text-gray-300 text-sm mt-1 line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>,
    document.body
  )
}

export default ProjectDetail
