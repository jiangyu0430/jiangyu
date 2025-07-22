import React, { useState } from 'react'
import { useEffect, useRef } from 'react'
import Lanyard from '../components/Lanyard'
import FadeInWhenVisible from '../components/FadeInWhenVisible'
import Stack from '../components/Stack.jsx'
import { PlaceholdersAndVanishInput } from '../components/PlaceholdersAndVanishInput'
import LazyImage from '../components/LazyImage'

export default function About() {
  const tagClass =
    'px-3 py-1 rounded-[4px] dark:bg-zinc-700 bg-gray-100 text-zinc-800 dark:text-zinc-100 text-sm whitespace-nowrap'
  const [showAllTestimonials, setShowAllTestimonials] = useState(false)
  const lanyardRef = useRef(null)
  const [showLanyard, setShowLanyard] = useState(false)

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

  return (
    <div className="w-full pt-12">
      {/* 简介区 */}
      <section className="max-w-[1280px] mx-auto px-4 flex flex-col md:flex-row gap-10 mb-20">
        <div className="w-full md:w-[60%]">
          <FadeInWhenVisible delay={0.1} y={50} amount={0.2} triggerOnce>
            <h2 className="text-5xl font-bold mb-10 text-center md:text-left">
              我是谁
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.2} y={50} amount={0.2} triggerOnce>
            <p className="text-zinc-800 dark:text-zinc-300 mb-2 text-justify leading-relaxed">
              1997
              年出生于山东青岛，从小就热衷于发现问题、奇思妙想，并一直以成为设计师的梦想努力。
              2020 年毕业参加工作，具有 5 年工作经验 —— 对 B
              端设计具备一定深度的认知和思考，有责任感和自驱力。
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.3} y={50} amount={0.2} triggerOnce>
            <p className="text-zinc-800 dark:text-zinc-300 mb-4 text-justify leading-relaxed">
              I believe that great design goes beyond aesthetics—it solves
              problems, simplifies complexity, and delivers meaningful
              experiences. From concept to final execution, I ensure every
              project is strategically crafted to leave a lasting impact
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.3} y={50} amount={0.2} triggerOnce>
            <ul className="inline-flex flex-row gap-2">
              <li className={tagClass}>To B</li>
              <li className={tagClass}>用户体验</li>
              <li className={tagClass}>设计系统</li>
              <li className={tagClass}>三维建模</li>
              <li className={tagClass}>动效设计</li>
              <li className={tagClass}>前端开发</li>
            </ul>
          </FadeInWhenVisible>
        </div>
        <FadeInWhenVisible delay={0.3} y={50} amount={0.2} triggerOnce>
          <div className="w-full md:w-[40%] flex md:justify-center justify-start px-4">
            <Stack
              randomRotation={true}
              sensitivity={150}
              sendToBackOnClick={false}
              cardDimensions={{ width: 320, height: 400 }}
              cardsData={[
                {
                  id: 1,
                  img: 'https://cdn.dribbble.com/userupload/27290109/file/original-f2c45f1467ded4a74df77d1fd1517b56.png?resize=1504x1128&vertical=center',
                },
                {
                  id: 2,
                  img: 'https://cdn.dribbble.com/userupload/29003045/file/original-581c6dc105c7571a1e27275965ad4db4.png?resize=1504x1128&vertical=center',
                },
                {
                  id: 3,
                  img: 'https://cdn.dribbble.com/userupload/36758401/file/original-2eedcc597d8bb01c297d59ea64de203a.png?resize=1504x1128&vertical=center',
                },
                {
                  id: 4,
                  img: 'https://cdn.dribbble.com/users/1044993/profile/masthead_image/cat-sleeping_dribbble.png',
                },
              ]}
            />
          </div>
        </FadeInWhenVisible>
      </section>

      {/* 工作经历区 */}
      <section className="w-full bg-white dark:bg-black text-black dark:text-white">
        <div className="max-w-[1280px] mx-auto px-4 py-20 space-y-12">
          <div>
            <FadeInWhenVisible delay={0.4} y={50} amount={0.2} triggerOnce>
              <h2 className="text-4xl font-semibold text-center md:text-left">
                做过的事
              </h2>
            </FadeInWhenVisible>
          </div>

          <FadeInWhenVisible delay={0.6} y={50} amount={0.2} triggerOnce>
            <div
              className="space-y-4 mt-8"
              style={{
                maxWidth: '1248px',
                width: '100%',
              }}
            >
              <div className="grid grid-cols-3 gap-2 bg-gray-100 dark:bg-zinc-800 px-8 py-4 rounded-lg">
                <p className="font-medium">Present</p>
                <p>Product designer</p>
                <p className="text-right">2025-03 – now</p>
              </div>
              <div className="grid grid-cols-3 gap-2 bg-zinc-50 dark:bg-zinc-900 px-8 py-4 rounded-lg">
                <p className="font-medium">123</p>
                <p>Product designer</p>
                <p className="text-right">2023-04 – 2024-12</p>
              </div>
              <div className="grid grid-cols-3 gap-2 bg-zinc-50 dark:bg-zinc-900 px-8 py-4 rounded-lg">
                <p className="font-medium">Present</p>
                <p>UI Designer</p>
                <p className="text-right">2020-03 – 2023-03</p>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* 他人评价区 */}
      <section className="w-full bg-white dark:bg-black text-black dark:text-white py-20">
        <div className="max-w-[1280px] mx-auto px-4 space-y-12">
          <div>
            <FadeInWhenVisible delay={0.1} y={50} amount={0.2} triggerOnce>
              <h2 className="text-4xl font-semibold text-center md:text-left">
                伙伴印象
              </h2>
            </FadeInWhenVisible>
          </div>

          <FadeInWhenVisible delay={0.2} y={50} amount={0.2} triggerOnce>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 items-start">
              <div className="flex flex-col justify-center gap-5 self-center">
                <div className="space-y-4 rounded-lg p-6 bg-zinc-100 dark:bg-zinc-800">
                  <div className="flex items-center gap-4">
                    <LazyImage
                      src="https://i.pravatar.cc/100?img=2"
                      alt="avatar"
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="text-lg font-medium">Ava Lee</p>
                      <p className="text-sm text-zinc-500">Product Manager</p>
                    </div>
                  </div>
                  <p className="text-[15px] text-justify mt-4 text-zinc-900 dark:text-zinc-200">
                    项目卡住时，Jiangyu
                    总能用快速原型帮我们理清思路。那些看似简单的低保真原型，其实藏着他对信息架构的用心。正因如此，我们会议效率提升了一半以上。
                  </p>
                </div>
                <div
                  className={`${
                    !showAllTestimonials ? 'hidden' : 'block'
                  } md:block space-y-4 rounded-lg p-6 bg-zinc-100 dark:bg-zinc-800`}
                >
                  <div className="flex items-center gap-4">
                    <LazyImage
                      src="https://i.pravatar.cc/100?img=3"
                      alt="avatar"
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="text-lg font-medium">Jerome Blake</p>
                      <p className="text-sm text-zinc-500">Tech Lead</p>
                    </div>
                  </div>
                  <p className="text-[15px] text-justify mt-4 text-zinc-900 dark:text-zinc-200">
                    Jiangyu
                    领导的设计系统彻底改变了我们的工作流程。他不仅搭建了完整的组件库和文档，还针对团队痛点做了两件关键事：为每个组件补充‘使用场景’和‘常见错误’示例，并定期收集开发反馈优化规范。如今设计稿一致性超过
                    90%，连产品经理都能快速用基础组件搭原型。这种提升团队效率的能力，远比单兵作战更有价值。
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div className="space-y-4 rounded-lg p-6 bg-zinc-100 dark:bg-zinc-800">
                  <div className="flex items-center gap-4">
                    <LazyImage
                      src="https://i.pravatar.cc/100?img=4"
                      alt="avatar"
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="text-lg font-medium">Nina Park</p>
                      <p className="text-sm text-zinc-500">UI Designer</p>
                    </div>
                  </div>
                  <p className="text-[15px] text-justify mt-4 text-zinc-900 dark:text-zinc-200">
                    Jiangyu
                    的设计文档条理清晰，标注细致，甚至能提前预判开发会遇到的问题。看似基本功，但这份细致在协作中帮我们节省了大量沟通时间。
                  </p>
                </div>
                <div
                  className={`${
                    !showAllTestimonials ? 'hidden' : 'block'
                  } md:block space-y-4 rounded-lg p-6 bg-zinc-100 dark:bg-zinc-800`}
                >
                  <div className="flex items-center gap-4">
                    <LazyImage
                      src="https://i.pravatar.cc/100?img=5"
                      alt="avatar"
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="text-lg font-medium">Mark Chen</p>
                      <p className="text-sm text-zinc-500">
                        Interaction Designer
                      </p>
                    </div>
                  </div>
                  <p className="text-[15px] text-justify mt-4 text-zinc-900 dark:text-zinc-200">
                    Jiangyu
                    的设计风格简洁克制，从不为了创新而创新。他关注的是让用户顺畅完成任务，而非追求花哨视觉。这种以解决问题为核心的思路，让产品体验更稳健可靠。
                  </p>
                </div>
                <div
                  className={`${
                    !showAllTestimonials ? 'hidden' : 'block'
                  } md:block space-y-4 rounded-lg p-6 bg-zinc-100 dark:bg-zinc-800`}
                >
                  <div className="flex items-center gap-4">
                    <LazyImage
                      src="https://i.pravatar.cc/100?img=6"
                      alt="avatar"
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="text-lg font-medium">Irene Zhao</p>
                      <p className="text-sm text-zinc-500">Researcher</p>
                    </div>
                  </div>
                  <p className="text-[15px] text-justify mt-4 text-zinc-900 dark:text-zinc-200">
                    Jiangyu
                    不爱高调发声，但他的扎实功底和认真负责让每位合作伙伴都乐于再次推荐他。靠谱，或许就是对设计师最好的评价。
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-5 self-center">
                <div className="space-y-4 rounded-lg p-6 bg-zinc-100 dark:bg-zinc-800">
                  <div className="flex items-center gap-4">
                    <LazyImage
                      src="https://i.pravatar.cc/100?img=7"
                      alt="avatar"
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="text-lg font-medium">Daria Smith</p>
                      <p className="text-sm text-zinc-500">Brand Designer</p>
                    </div>
                  </div>
                  <p className="text-[15px] text-justify mt-4 text-zinc-900 dark:text-zinc-200">
                    和 Jiangyu
                    合作，最让我印象深刻的是他的倾听力。他不急着反驳，而是先理解背后的想法，再调整设计。正是这份开放，让团队协作高效顺畅。
                  </p>
                </div>
                <div
                  className={`${
                    !showAllTestimonials ? 'hidden' : 'block'
                  } md:block space-y-4 rounded-lg p-6 bg-zinc-100 dark:bg-zinc-800`}
                >
                  <div className="flex items-center gap-4">
                    <LazyImage
                      src="https://i.pravatar.cc/100?img=8"
                      alt="avatar"
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="text-lg font-medium">Leo Yamamoto</p>
                      <p className="text-sm text-zinc-500">
                        Fullstack Developer
                      </p>
                    </div>
                  </div>
                  <p className="text-[15px] text-justify mt-4 text-zinc-900 dark:text-zinc-200">
                    和 Jiangyu
                    合作总有惊喜——他对用户痛点洞察精准，设计方案兼顾商业目标和用户体验。跨团队合作时，他的沟通专业且高效，是少数能赢得开发团队认可的设计师。
                  </p>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
          <div className="text-center md:hidden">
            <button
              onClick={() => {
                setShowAllTestimonials((prev) => {
                  const next = !prev
                  setTimeout(() => {
                    window?.lenis?.resize?.()
                  }, 0)
                  return next
                })
              }}
              className="bg-zinc-100 text-black dark:bg-zinc-800 dark:text-white w-[120px] py-3 rounded-lg"
            >
              {showAllTestimonials ? '收起' : '查看更多'}
            </button>
          </div>
        </div>
      </section>

      {/* 表单联系区 */}
      <section className="relative w-full bg-black text-white overflow-hidden sm:h-[660px]">
        <div className="max-w-[1280px] mx-auto gap-2 px-4 flex flex-col sm:flex-row h-full">
          {/* 左侧吊牌，占 3/5，高度移动端400，网页端撑满父容器 */}
          <div
            ref={lanyardRef}
            className="relative w-full sm:w-3/5 h-[500px] sm:h-full flex items-center justify-center"
          >
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-sm text-zinc-500 pointer-events-none select-none">
              👆 拖拽我～
            </div>
            {showLanyard && (
              <Lanyard position={[0, 0, 24]} gravity={[0, -42, 0]} />
            )}
          </div>
          {/* 右侧文字，占 2/5，高度移动端自适应，网页端撑满父容器，内边距优化 */}
          <div className="w-full sm:w-2/5 min-h-[620px] sm:h-full flex flex-col sm:px-0 overflow-visible items-center justify-center">
            <FadeInWhenVisible delay={0.1} y={80} amount={0.6} triggerOnce>
              <p className="w-full text-6xl leading-tight font-bold">
                <span className="text-zinc-500">Design,</span> is thinking made
                visual
              </p>
            </FadeInWhenVisible>

            <div className="space-y-16 pt-16 w-full">
              <FadeInWhenVisible delay={0.2} y={80} amount={0.6} triggerOnce>
                <section className="flex sm:flex-row gap-24 sm:gap-40">
                  {/* Follow me */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold">跟随</h4>
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
                    <h4 className="text-lg font-semibold">位置</h4>
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
                  <p className="text-white text-lg font-medium">联系我</p>
                  <PlaceholdersAndVanishInput
                    placeholders={[
                      '请在这里写下你的想法 …',
                      '想收到回复？记得留下联系方式～',
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
