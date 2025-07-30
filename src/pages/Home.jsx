import FadeInWhenVisible from '../components/FadeInWhenVisible'
import Lanyard from '../components/Lanyard'
import WorkCard from '../components/WorkCard'
import { notesItems } from '../data/notes' // 引入统一维护的notes数据
import CircularGallery from '../components/CircularGallery'
import { BlogSnippet } from '../components/BlogSnippet'
import { InteractiveHoverButton } from '../components/InteractiveHoverButton'
import { useEffect, useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { PlaceholdersAndVanishInput } from '../components/PlaceholdersAndVanishInput'
import { lazy, Suspense } from 'react'
const ProjectDetail = lazy(() => import('./ProjectDetail'))
import projects from '../data/projects'
import RotatingText from '../components/RotatingText'
import Particles from '../components/Particles'
import blogs from '../data/blogs'

function Home() {
  const lanyardRef = useRef(null)
  const [showLanyard, setShowLanyard] = useState(false)

  // 新增弹窗状态
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProjectSlug, setSelectedProjectSlug] = useState(null)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowLanyard(true)
          observer.disconnect()
        }
      },
      { threshold: 0 }
    )
    if (lanyardRef.current) {
      observer.observe(lanyardRef.current)
    }
    return () => observer.disconnect()
  }, [])

  // 打开弹窗函数
  const openModal = (slug) => {
    setSelectedProjectSlug(slug)
    setModalOpen(true)
  }

  // 关闭弹窗函数
  const closeModal = () => {
    setModalOpen(false)
    setSelectedProjectSlug(null)
  }

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white">
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-64px)] flex items-center px-4 text-left overflow-hidden relative">
        <div className="absolute inset-0 z-0">
          <Particles
            lightColors={['#C6D2FF', '#9999FF']}
            darkColors={['#ffffff', '#9999FF']}
            particleCount={1000}
            particleSpread={8}
            speed={0.2}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4">
          <FadeInWhenVisible delay={0} y={50} amount={0.1}>
            <h1 className="sm:text-8xl text-[68px] font-bold mb-8 text-left">
              Hi, I’m Jiang Yu
            </h1>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.1} y={50} amount={0.1}>
            <div className="flex items-center gap-4 text-left mb-4 flex-wrap">
              <span className="sm:text-7xl text-5xl font-bold">
                Make better
              </span>
              <RotatingText
                texts={['Products', 'Realities', 'Experiences']}
                mainClassName="inline-flex w-auto px-6 sm:text-7xl text-5xl font-bold bg-[#5227FF] text-white overflow-hidden py-1 justify-center rounded-lg"
                staggerFrom="last"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-120%' }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.2} y={50} amount={0.1}>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-xl">
              - Simplify complexity into clear and enjoyable design results
            </p>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Featured Works */}
      <section className="py-20 bg-white dark:bg-black text-black dark:text-white">
        <div className="max-w-[1280px] mx-auto px-4 space-y-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h2 className="text-4xl font-semibold">Portfolio</h2>
            <InteractiveHoverButton
              href="/Projects"
              className="hidden sm:inline-flex"
            >
              View All
            </InteractiveHoverButton>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-8 gap-5">
            {(() => {
              // 只显示这四个特定项目（请替换为实际slug）
              const featuredSlugs = [
                'networkRevision',
                'designSystem',
                'arcoDesign',
                'page-motion',
              ]
              // 保持原有布局：第1和第4卡片col-span-3，其余col-span-5
              const colSpans = [
                'col-span-1 sm:col-span-5',
                'col-span-1 sm:col-span-3',
                'col-span-1 sm:col-span-3',
                'col-span-1 sm:col-span-5',
              ]
              return featuredSlugs.map((slug, index) => {
                const project = projects.find((p) => p.slug === slug)
                if (!project) return null
                return (
                  <div className={colSpans[index]} key={slug}>
                    <FadeInWhenVisible delay={index * 0.1} y={50} amount={0.3}>
                      <WorkCard slug={slug} onClick={() => openModal(slug)} />
                    </FadeInWhenVisible>
                  </div>
                )
              })
            })()}
          </div>
          <div className="mt-6 flex justify-center sm:hidden">
            <InteractiveHoverButton href="/Projects">
              View All
            </InteractiveHoverButton>
          </div>
        </div>
      </section>

      {/* 弹窗 */}
      {modalOpen && selectedProjectSlug && (
        <Suspense fallback={<div>Loading...</div>}>
          <ProjectDetail
            slug={selectedProjectSlug}
            fullscreen={false}
            onClose={closeModal}
          />
        </Suspense>
      )}

      {/* Blog Summary */}
      <section className="py-20 bg-black text-white text-center">
        <div className="max-w-[1280px] mx-auto px-4 space-y-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h2 className="text-4xl font-semibold">Blog</h2>
            <InteractiveHoverButton
              href="/Projects"
              fixedTheme
              className="hidden sm:inline-flex"
            >
              View All
            </InteractiveHoverButton>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.slice(0, 3).map((blog, idx) => (
              <FadeInWhenVisible
                key={blog.slug}
                delay={0.2 + idx * 0.1}
                y={50}
                amount={0.2}
              >
                <BlogSnippet
                  slug={blog.slug}
                  layout="vertical"
                  size="large"
                  onClick={() => openModal(blog.slug)}
                />
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Handwritten notes */}
      <section className="py-20 bg-white dark:bg-black text-black dark:text-white">
        <div className="max-w-[1280px] mx-auto px-4 space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h2 className="text-4xl font-semibold">Record</h2>
            <InteractiveHoverButton
              href="/Notes"
              className="hidden sm:inline-flex"
            >
              View All
            </InteractiveHoverButton>
          </div>
          <div
            style={{ height: '550px', position: 'relative' }}
            className="mt-4"
          >
            <CircularGallery bend={0} borderRadius={0.04} items={notesItems} />
          </div>
        </div>
      </section>

      {/* Lanyard 3D Module with side-by-side layout */}
      <section className="relative w-full bg-black text-white overflow-hidden sm:h-[660px]">
        <div className="max-w-[1280px] mx-auto gap-2 px-4 flex flex-col  sm:flex-row h-full">
          {/* 左侧吊牌，占 3/5，高度移动端400，网页端撑满父容器 */}
          <div
            ref={lanyardRef}
            className="relative w-full sm:w-3/5 h-[500px] sm:h-full flex items-center justify-center"
          >
            <div className="absolute bottom-14 left-1/2 -translate-x-1/2 text-sm text-zinc-500 pointer-events-none select-none">
              👆 Drag me~
            </div>
            {showLanyard && (
              <Lanyard position={[0, 0, 24]} gravity={[0, -42, 0]} />
            )}
          </div>
          {/* 右侧文字，占 2/5，高度移动端自适应，网页端撑满父容器，内边距优化 */}
          <div className="w-full sm:w-2/5 min-h-[620px] sm:h-full flex flex-col sm:px-0 overflow-visible items-center justify-center">
            <FadeInWhenVisible delay={0.1} y={80} amount={0.6} triggerOnce>
              <p className="w-full text-6xl font-poppins leading-tight font-bold">
                <span className="text-zinc-500">Design,</span> is thinking made
                visual
              </p>
            </FadeInWhenVisible>

            <div className="space-y-16 pt-16 w-full">
              <FadeInWhenVisible delay={0.2} y={80} amount={0.6} triggerOnce>
                <section className="flex sm:flex-row gap-24 sm:gap-40">
                  {/* Follow me */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold">Follow</h4>
                    <ul className="space-y-2 text-zinc-400">
                      <li>
                        <a
                          href="https://www.figma.com/@wittyu"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 group"
                        >
                          Figma
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-[18px] h-[18px] transform transition-transform duration-0 group-hover:animate-spin-once"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.zcool.com.cn/u/20138657"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 group"
                        >
                          Zcool
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-[18px] h-[18px] transform transition-transform duration-0 group-hover:animate-spin-once"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Current */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold">Current</h4>
                    <ul className="space-y-2 text-zinc-400">
                      <li>Shenzhen, China</li>
                      <li>
                        <a
                          href="mailto:shijiangyua@gmail.com"
                          className="text-zinc-400 hover:underline"
                        >
                          shijiangyua@gmail.com
                        </a>
                      </li>
                    </ul>
                  </div>
                </section>
              </FadeInWhenVisible>

              <FadeInWhenVisible delay={0.3} y={80} amount={0.6} triggerOnce>
                <div className="space-y-3">
                  <p className="text-white text-lg font-medium">Contact me</p>
                  <PlaceholdersAndVanishInput
                    placeholders={[
                      'Please share your thoughts here …',
                      'Want a reply? Don’t forget to leave your contact info～',
                    ]}
                    onChange={(e) => console.log(e.target.value)}
                    onSubmit={(e) => {
                      e.preventDefault()
                      console.log('submitted')
                    }}
                    autoComplete="off"
                  />
                </div>
              </FadeInWhenVisible>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
