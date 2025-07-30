import React, { useState } from 'react'
import { useEffect, useRef } from 'react'
import Lanyard from '../components/Lanyard'
import FadeInWhenVisible from '../components/FadeInWhenVisible'
import Stack from '../components/Stack.jsx'
import { PlaceholdersAndVanishInput } from '../components/PlaceholdersAndVanishInput'
import LazyImage from '../components/LazyImage'

export default function About() {
  const tagClass =
    'px-3 py-1 rounded-[4px] dark:bg-zinc-800 bg-gray-100 text-zinc-800 dark:text-zinc-200 text-sm whitespace-nowrap'
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
              About me
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.2} y={50} amount={0.2} triggerOnce>
            <p className="text-zinc-800 dark:text-zinc-300 mb-2 text-justify leading-relaxed">
              Born in 1997 in a small coastal town, I grew up obsessed with
              solving puzzles and building things. That passion eventually led
              me to design. After graduating in 2020, I’ve spent the past five
              years exploring the intersection of design, code, and human
              behavior—especially within complex B2B products. Design is not
              just about how things look—it’s about how things work, how they
              feel, and how seamlessly they solve the user's needs.
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
              <li className={tagClass}>B2B</li>
              <li className={tagClass}>UX Strategy</li>
              <li className={tagClass}>Design Systems</li>
              <li className={tagClass}>3D Modeling</li>
              <li className={tagClass}>Motion Design</li>
              <li className={tagClass}>Frontend</li>
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
                Experience
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
              <div className="grid grid-cols-3 gap-2 bg-zinc-100 dark:bg-zinc-800 px-8 py-4 rounded-lg">
                <p className="font-medium">Nimbus Labs</p>
                <p>Lead Product Designer</p>
                <p className="text-right">2025-03 – now</p>
              </div>
              <div className="grid grid-cols-3 gap-2 bg-zinc-50 dark:bg-zinc-900 px-8 py-4 rounded-lg">
                <p className="font-medium">Orbit Corp</p>
                <p>Product designer</p>
                <p className="text-right">2023-04 – 2024-12</p>
              </div>
              <div className="grid grid-cols-3 gap-2 bg-zinc-50 dark:bg-zinc-900 px-8 py-4 rounded-lg">
                <p className="font-medium">PixelWorks Studio</p>
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
                Partner impression
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
                  <p className="text-[15px] mt-4 text-zinc-900 dark:text-zinc-200">
                    "Working with Emily was a game changer. She always brought
                    structure to chaos and made tough problems feel solvable."
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
                  <p className="text-[15px]  mt-4 text-zinc-900 dark:text-zinc-200">
                    "James brings clarity and momentum into every project. His
                    ability to turn abstract requirements into concrete outcomes
                    is unmatched."
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
                  <p className="text-[15px] mt-4 text-zinc-900 dark:text-zinc-200">
                    "Sophia is the kind of collaborator everyone wants. Sharp,
                    empathetic, and always focused on the user."
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
                  <p className="text-[15px] mt-4 text-zinc-900 dark:text-zinc-200">
                    "Working with Liam made the development process smoother.
                    His detailed specs saved us hours of back-and-forth."
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
                  <p className="text-[15px] mt-4 text-zinc-900 dark:text-zinc-200">
                    "Isla’s way of integrating brand thinking into product
                    design elevated our whole experience."
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
                  <p className="text-[15px] mt-4 text-zinc-900 dark:text-zinc-200">
                    "Daniel communicates clearly across teams and anticipates
                    edge cases before they become blockers. A true partner in
                    product-building."
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
                  <p className="text-[15px] mt-4 text-zinc-900 dark:text-zinc-200">
                    Jerome brings clarity and momentum into every project. His
                    ability to turn abstract requirements into concrete outcomes
                    is unmatched.
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
