import { PROJECT_IMAGE_MAP } from '../data/content/projectImages'
const loadedSlugCache = new Set()
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import Lenis from 'lenis'
import ReactMarkdown from 'react-markdown'
import projects from '../data/projects'
import blogs from '../data/blogs'
import { ScrollProgress } from '../components/ScrollProgress'
import LazyImage from '../components/LazyImage'

const markdownFiles = import.meta.glob('../data/content/*.md', {
  as: 'raw',
})

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
  const [isFullScreenWidth, setIsFullScreenWidth] = useState(false)
  const [minimumDelayPassed, setMinimumDelayPassed] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const project =
    projects.find((p) => p.slug === slug) || blogs.find((b) => b.slug === slug)
  const modalScrollRef = useRef(null)
  const navigate = useNavigate()

  const isBlog = blogs.some((b) => b.slug === slug)

  const lazyImageStyle = {
    maxWidth: '100%',
    height: 'auto',
    display: 'block',
    margin: '0rem auto',
    transform: 'translateZ(0)',
    willChange: 'transform',
    backfaceVisibility: 'hidden',
  }

  const smartSizes = isFullScreenWidth
    ? '100vw'
    : '(max-width: 768px) 100vw, (max-width: 1440px) 90vw, 1440px'

  useEffect(() => {
    const html = document.documentElement
    const checkDark = () => {
      return html.classList.contains('dark')
    }

    setIsDarkMode(checkDark())

    const observer = new MutationObserver(() => {
      setIsDarkMode(checkDark())
    })

    observer.observe(html, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

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

    // 如果是图集项目，不加载 .md 文件
    if (PROJECT_IMAGE_MAP[slug]) {
      setLoading(false)
      loadedSlugCache.add(slug)
      return
    }

    const filePath = `../data/content/${project.contentFile}`
    const importer = markdownFiles[filePath]
    if (!importer) {
      navigate('/404', { replace: true })
      return
    }
    const res = await importer()
    setContent(res)
    setLoading(false)
    loadedSlugCache.add(slug)
  }

  useEffect(() => {
    loadContent()
  }, [project, navigate])

  useEffect(() => {
    if (loadedSlugCache.has(slug)) {
      setMinimumDelayPassed(true)
    } else {
      const timer = setTimeout(() => {
        setMinimumDelayPassed(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [slug])

  if (!fullscreen && !project && !loading) {
    return null
  }

  // 计数器闭包，确保每次渲染时索引自增
  let imgIndex = 0

  const ImageWithId = (props) => {
    const currentIndex = imgIndex++
    return (
      <section id={`img-${currentIndex}`} style={{ contain: 'layout' }}>
        <LazyImage
          {...props}
          style={lazyImageStyle}
          loading={currentIndex < 2 ? 'eager' : 'lazy'}
        />
      </section>
    )
  }

  return ReactDOM.createPortal(
    <div
      className={
        fullscreen
          ? 'min-h-screen bg-white dark:bg-neutral-900 overflow-auto'
          : `fixed inset-0 z-[9999] overflow-y-auto ${
              isDarkMode ? 'bg-black text-zinc-100' : 'bg-white text-zinc-900'
            }`
      }
    >
      {(loading || (!isBlog && !minimumDelayPassed)) && !fullscreen ? (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="loader mb-4"></div>
          <div className="text-zinc-900 dark:text-white text-lg">
            Loading...
          </div>
        </div>
      ) : (
        !fullscreen && (
          <div
            className={`relative mx-auto w-full h-screen flex flex-col px-4 transition-[max-width] duration-300 ease-in-out ${
              isDarkMode ? 'bg-black text-zinc-100' : 'bg-white text-zinc-900'
            }`}
            style={{
              maxWidth: isFullScreenWidth ? '100vw' : '1440px',
              transition: 'all 0.3s ease',
            }}
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
          >
            {/* 标题区 */}
            <div className="sticky top-0 z-50 flex items-center justify-between py-4 ">
              {/* 左侧标题 */}
              <div>
                <h1 className="text-2xl font-bold">{project.title}</h1>
                <div className="text-sm text-zinc-400 flex space-x-2 mt-1 items-center">
                  {project.type && (
                    <span className="text-indigo-500 dark:text-indigo-400">
                      {project.type.split('/').map((part, i, arr) => (
                        <span key={i}>
                          {part}
                          {i !== arr.length - 1 && (
                            <span
                              style={{
                                fontFamily: 'Arial',
                                margin: '0 0.2em',
                                color: 'inherit',
                              }}
                            >
                              /
                            </span>
                          )}
                        </span>
                      ))}
                    </span>
                  )}
                  {project.type && project.date && (
                    <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-zinc-500 mx-1" />
                  )}
                  <span className="text-zinc-400">{project.date}</span>
                </div>
              </div>

              {/* 右侧按钮组 */}
              <div className="flex items-center space-x-2">
                {/* 全屏切换按钮，仅 project 显示 */}
                {(() => {
                  const isBlog = blogs.some((b) => b.slug === slug)
                  return !isBlog ? (
                    <button
                      className={`p-2 rounded ${
                        isDarkMode
                          ? 'bg-white/20 hover:bg-white/30 text-white'
                          : 'bg-zinc-200 hover:bg-zinc-300 text-zinc-600 hover:text-zinc-800'
                      }`}
                      onClick={() => setIsFullScreenWidth((v) => !v)}
                      title={isFullScreenWidth ? '恢复原始宽度' : '全屏'}
                    >
                      {isFullScreenWidth ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path d="M18 7H22V9H16V3H18V7ZM8 9H2V7H6V3H8V9ZM18 17V21H16V15H22V17H18ZM8 15V21H6V17H2V15H8Z"></path>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path d="M8 3V5H4V9H2V3H8ZM2 21V15H4V19H8V21H2ZM22 21H16V19H20V15H22V21ZM22 9H20V5H16V3H22V9Z"></path>
                        </svg>
                      )}
                    </button>
                  ) : null
                })()}

                {/* 刷新按钮 */}
                <button
                  className={`p-2 rounded ${
                    isDarkMode
                      ? 'bg-white/20 hover:bg-white/30 text-white'
                      : 'bg-zinc-200 hover:bg-zinc-300 text-zinc-600 hover:text-zinc-800'
                  }`}
                  onClick={() => {
                    if (!isBlog) {
                      // project 类型刷新
                      setContent('')
                      setLoading(true)
                      loadContent()
                      if (modalScrollRef.current) {
                        modalScrollRef.current.scrollTop = 0
                      }
                    } else {
                      // blog 类型刷新，保持原逻辑
                      setLoading(true)
                      loadContent()
                    }
                  }}
                  title="刷新"
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

                {/* 关闭按钮 */}
                <button
                  className={`p-2 rounded ${
                    isDarkMode
                      ? 'bg-white/20 hover:bg-white/30 text-white'
                      : 'bg-zinc-200 hover:bg-zinc-300 text-zinc-600 hover:text-zinc-800'
                  }`}
                  onClick={() => {
                    if (onClose) onClose()
                  }}
                  title="关闭"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.7712 12L4 5.2288L5.2288 4L12 10.7711L18.7712 4L20 5.2288L13.2288 12L20 18.7711L18.7712 20L12 13.2288L5.2288 20L4 18.7711L10.7712 12Z" />
                  </svg>
                </button>
              </div>
            </div>

            <ScrollProgress
              target={modalScrollRef}
              className="fixed top-[88px] left-0 right-0 z-[9999] "
            />

            {/* 内容区，滚动区域 */}
            <div
              ref={modalScrollRef}
              className="overflow-y-auto flex-1 scrollbar-hide"
            >
              {(() => {
                const isBlog = blogs.some((b) => b.slug === slug)
                return (
                  <article
                    className={`prose prose-p:my-4 prose-h2:mt-10 prose-h2:mb-6 prose-h3:mt-6 prose-h3:mb-2 prose-h4:mt-6 prose-h4:mb-0 prose-ul:my-2 prose-ol:my-2 mx-auto text-justify ${
                      isBlog
                        ? 'max-w-[800px] prose-img:mx-0 prose-img:w-full'
                        : 'max-w-none'
                    } ${isDarkMode ? 'prose-invert' : ''}`}
                  >
                    {PROJECT_IMAGE_MAP[slug] ? (
                      PROJECT_IMAGE_MAP[slug].images.map((img, i) => {
                        const isObject = typeof img === 'object'
                        const ext = isObject
                          ? null
                          : img.split('.').pop().toLowerCase()
                        const isGif = ext === 'gif'
                        const isVideo = ext === 'mp4'
                        const fullUrl = isObject ? img.src : img
                        return (
                          <section
                            key={i}
                            id={`img-${i}`}
                            style={{ contain: 'layout' }}
                            className={PROJECT_IMAGE_MAP[slug].spacing || ''}
                          >
                            {isObject && img.type === 'iframe' ? (
                              <div
                                style={{
                                  position: 'relative',
                                  paddingTop: '50%', // 16:9 比例
                                  width: '100%',
                                }}
                              >
                                <iframe
                                  src={img.src}
                                  allowFullScreen
                                  style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    border: '1px solid rgba(0, 0, 0, 0.1)',
                                  }}
                                />
                              </div>
                            ) : isGif ? (
                              <img
                                src={fullUrl}
                                alt={`image-${i + 1}`}
                                className="w-full h-auto"
                                loading={i < 2 ? 'eager' : 'lazy'}
                                style={lazyImageStyle}
                              />
                            ) : isVideo ? (
                              <video
                                src={fullUrl}
                                className="w-full h-auto"
                                autoPlay
                                muted
                                loop
                                playsInline
                                style={lazyImageStyle}
                              />
                            ) : (
                              <LazyImage
                                src={fullUrl}
                                sizes={smartSizes}
                                alt={`image-${i + 1}`}
                                style={lazyImageStyle}
                                loading={i < 2 ? 'eager' : 'lazy'}
                              />
                            )}
                          </section>
                        )
                      })
                    ) : (
                      <ReactMarkdown
                        components={{
                          img: (props) =>
                            isBlog ? (
                              <LazyImage
                                {...props}
                                style={{
                                  ...lazyImageStyle,
                                  borderRadius: '0.4rem',
                                }} // 添加圆角
                              />
                            ) : (
                              <ImageWithId {...props} />
                            ),
                          p: ({ node, children }) => {
                            // 博客类型下，如果<p>只包含单个<img>，则去掉<p>包裹
                            const isOnlyImage =
                              node.children &&
                              node.children.length === 1 &&
                              node.children[0].type === 'element' &&
                              node.children[0].tagName === 'img'
                            if (isBlog && isOnlyImage) {
                              return <>{children}</>
                            }
                            return <p>{children}</p>
                          },
                        }}
                      >
                        {content}
                      </ReactMarkdown>
                    )}
                  </article>
                )
              })()}

              {/* 其他作品推荐模块 */}
              <div className="my-20">
                <h2
                  className={`text-2xl font-semibold mb-4 ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  Other Works
                </h2>
                <div
                  className={`grid gap-4 sm:gap-4 lg:gap-6 mx-auto ${
                    isFullScreenWidth
                      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-full'
                      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-[1440px]'
                  }`}
                >
                  {(isBlog ? blogs : projects)
                    .filter((p) => p.slug !== slug)
                    .slice(0, isFullScreenWidth ? 4 : 3)
                    .map((item) => {
                      const resolvedImage =
                        typeof item.image === 'string'
                          ? item.image
                          : isDarkMode
                          ? item.image.dark ?? item.image.light
                          : item.image.light ?? item.image.dark
                      return (
                        <div
                          key={item.slug}
                          className="relative group cursor-pointer overflow-hidden rounded-xl"
                          onClick={() => {
                            navigate(`/project/${item.slug}`)
                          }}
                        >
                          <img
                            src={resolvedImage}
                            alt={item.title}
                            className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-all duration-300">
                            <h3 className="text-white text-lg font-semibold">
                              {item.title}
                            </h3>
                            <p className="text-zinc-100 text-sm mt-1 line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      )
                    })}
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
