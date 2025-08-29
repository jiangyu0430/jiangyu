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
import blogs from '../data/blogs'
import SectionTitle from '../components/SectionTitle'
import ScrollRevealTitle from '../components/ScrollRevealTitle'
import Galaxy from '../components/Galaxy'
import { RainbowButton } from '../components/RainbowButton'

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
    <div className="bg-black text-black dark:text-white">
      {/* Hero Section */}
      <section className="h-screen w-full flex items-center px-4 text-left overflow-hidden relative">
        <div
          className="absolute inset-0 z-0"
          style={{ willChange: 'transform' }}
        >
          <div
            style={{
              opacity: 1,
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
            }}
          >
            <img
              src="https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/a3ee27229291501.6881ff8db1812.png"
              alt="Hero"
              style={{
                cursor: 'auto',
                width: '100%',
                height: '100%',
                borderRadius: '0px',
                display: 'block',
                objectFit: 'cover',
                objectPosition: '50% 50%',
                backgroundColor: 'transparent',
                transform: 'translate3d(0, 0, 0)',
              }}
            />
            <div className="absolute inset-0 z-10"></div>
          </div>
        </div>
      </section>
      <section className="h-[1000px] bg-zinc-50 py-20 rounded-3xl"></section>

      {/* Featured Works */}
      <section className="pt-20 lg:pt-40 pb-20 bg-white rounded-3xl overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-4 space-y-20">
          <ScrollRevealTitle>
            <SectionTitle
              title="Projects"
              description="This is the story behind the story. "
            />
          </ScrollRevealTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 lg:gap-y-8 gap-y-4">
            {(() => {
              // 只显示这四个特定项目（请替换为实际slug）
              const featuredSlugs = [
                'networkRevision',
                'designSystem',
                'visualRedesign',
                'arcoDesign',
              ]
              return featuredSlugs.map((slug, index) => {
                const project = projects.find((p) => p.slug === slug)
                if (!project) return null
                return (
                  <div key={slug}>
                    <FadeInWhenVisible delay={index * 0.15} y={50} amount={0.3}>
                      <WorkCard slug={slug} onClick={() => openModal(slug)} />
                    </FadeInWhenVisible>
                  </div>
                )
              })
            })()}
          </div>
          <div className="hidden sm:flex items-center gap-10">
            {/* 左侧文本 */}
            <span className="text-2xl text-zinc-400">⊹</span>

            {/* 中间自适应分割线 */}
            <div className="flex-1 h-[1px] bg-zinc-200"></div>

            {/* 右侧按钮 */}
            <InteractiveHoverButton href="/Projects" lightTheme>
              查看全部
            </InteractiveHoverButton>
          </div>
          <div className="flex sm:hidden justify-center mt-4">
            <InteractiveHoverButton href="/Projects" lightTheme>
              查看全部
            </InteractiveHoverButton>
          </div>
        </div>
      </section>

      {/* 弹窗 */}
      {modalOpen && selectedProjectSlug && (
        <Suspense fallback={<div>加载中...</div>}>
          <ProjectDetail
            slug={selectedProjectSlug}
            fullscreen={false}
            onClose={closeModal}
          />
        </Suspense>
      )}

      {/* Handwritten notes */}
      <section className="py-20 lg:py-40 bg-black rounded-3xl overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-4 space-y-20">
          <ScrollRevealTitle>
            <SectionTitle
              theme="dark"
              title="Projects"
              description="This is the story behind the story. "
            />
          </ScrollRevealTitle>
          <div
            style={{ height: '550px', position: 'relative' }}
            className="mt-4"
          >
            <CircularGallery bend={0} borderRadius={0.04} items={notesItems} />
          </div>
        </div>
      </section>

      {/* Blog Summary */}
      <section className="pt-20 lg:pt-40 pb-20 bg-zinc-50 rounded-3xl text-white overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-4 space-y-20">
          <ScrollRevealTitle>
            <SectionTitle
              title="Blogs"
              description="Fresh reads, sharp takes. Stories, ideas, and updates from our world."
            />
          </ScrollRevealTitle>
          {(() => {
            // Manual featured blog selection by slug
            const featuredBlogSlugs = [
              'design-system1',
              'my-first-personal-website',
              'figma-component-library',
            ]
            const featuredBlogs = featuredBlogSlugs
              .map((slug) => blogs.find((b) => b.slug === slug))
              .filter(Boolean)
            return (
              <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:gap-4">
                <div className="w-full lg:w-1/2">
                  <FadeInWhenVisible
                    key={featuredBlogs[0].slug}
                    delay={0.2}
                    y={50}
                    amount={0.2}
                  >
                    <BlogSnippet
                      slug={featuredBlogs[0].slug}
                      layout="vertical"
                      size="large"
                      imgHeight="h-[240px] sm:h-[320px] lg:h-[480px]"
                      onClick={() => openModal(featuredBlogs[0].slug)}
                    />
                  </FadeInWhenVisible>
                </div>
                <div className="w-full lg:w-1/2 flex flex-col lg:flex-row gap-4">
                  {featuredBlogs.slice(1).map((blog, idx) => (
                    <div className="w-full lg:w-1/2" key={blog.slug}>
                      <FadeInWhenVisible
                        delay={0.3 + idx * 0.1}
                        y={50}
                        amount={0.2}
                      >
                        <BlogSnippet
                          slug={blog.slug}
                          layout="vertical"
                          size="large"
                          imgHeight="h-[240px] sm:h-[320px] lg:h-[320px]"
                          onClick={() => openModal(blog.slug)}
                        />
                      </FadeInWhenVisible>
                    </div>
                  ))}
                </div>
              </div>
            )
          })()}
          <div className="hidden sm:flex items-center gap-10">
            {/* 左侧文本 */}
            <span className="text-2xl text-zinc-400">⊹</span>

            {/* 中间自适应分割线 */}
            <div className="flex-1 h-[1px] bg-zinc-200"></div>

            {/* 右侧按钮 */}
            <InteractiveHoverButton href="/Projects" lightTheme>
              查看全部
            </InteractiveHoverButton>
          </div>
          <div className="flex sm:hidden justify-center mt-4">
            <InteractiveHoverButton href="/Projects" lightTheme>
              查看全部
            </InteractiveHoverButton>
          </div>
        </div>
      </section>

      {/* 联系我 */}
      <section className="relative w-full bg-white text-white sm:h-[580px]">
        <div className="absolute bg-black rounded-b-3xl overflow-hidden inset-0 z-0 ">
          <Galaxy
            mouseRepulsion={false}
            mouseInteraction={true}
            density={1.5}
            glowIntensity={0.2}
            twinkleIntensity={1}
            rotationSpeed={0.1}
            saturation={0}
            hueShift={140}
          />
        </div>
        <div className="max-w-screen-2xl mx-auto gap-2 px-4 flex flex-col  sm:flex-row h-full relative z-10">
          {/* 左侧吊牌，占 3/5，高度移动端400，网页端撑满父容器 */}
          <div
            ref={lanyardRef}
            className="relative w-full sm:w-3/5 overflow-hidden sm:h-full flex items-center justify-center"
          >
            <div className="absolute hidden sm:flex bottom-14 left-1/2 -translate-x-1/2 text-sm text-zinc-500 pointer-events-none select-none">
              👆 拖拽我～
            </div>
            {showLanyard && (
              <div style={{ transform: 'translateY(-50px)', width: '100%' }}>
                <Lanyard position={[0, 0, 24]} gravity={[0, -42, 0]} />
              </div>
            )}
          </div>
          {/* 右侧文字，占 2/5，高度移动端自适应，网页端撑满父容器，内边距优化 */}
          <div className="w-full sm:w-2/5 min-h-[620px] sm:h-full flex flex-col  items-start py-20 space-y-10">
            <FadeInWhenVisible delay={0.1} y={80} amount={0.6} triggerOnce>
              <p className="w-full mb-8 text-6xl font-poppins leading-tight font-bold">
                <span className="text-zinc-500">Design,</span> is thinking made
                visual
              </p>
              <PlaceholdersAndVanishInput
                placeholders={[
                  '请在这里写下你的留言 …',
                  '想收到回复？记得留下联系方式～',
                ]}
                onChange={(e) => console.log(e.target.value)}
                onSubmit={(e) => {
                  e.preventDefault()
                  console.log('submitted')
                }}
                autoComplete="off"
              />
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.3} y={80} amount={0.6} triggerOnce>
              <div className="space-y-3 w-full">
                <p className="text-white/60 text-base ">
                  有其他想法？也可以添加我的微信
                </p>
                <RainbowButton
                  //popoverDirection="up"
                  popoverText="记得注明来意～"
                  popoverContent={<img src="/QRCode.svg" alt="QR code" />}
                >
                  👉 获取联系方式 👈
                </RainbowButton>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
