import { useEffect, useRef, useState } from 'react'
import LazyImage from './LazyImage'
import { Link, useLocation, useMatch } from 'react-router-dom'
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion'
import '@theme-toggles/react/css/Around.css'
import { Around } from '@theme-toggles/react'
import { RainbowButton } from '../components/RainbowButton'
import HamburgerMenu from './HamburgerMenu'

export default function Navbar() {
  const location = useLocation()
  const navRef = useRef(null)
  const { scrollY } = useScroll({ target: navRef })
  const [visible, setVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(() => {
    const storedTheme = localStorage.getItem('theme')
    return storedTheme !== 'light' // 默认为 dark
  })
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setVisible(latest > 100)
  })

  // Add match hooks for each route
  const matchProjects = useMatch('/projects')
  const matchNotes = useMatch('/notes')
  const matchAbout = useMatch('/about')

  // navItems now contains isActive field
  const navItems = [
    { to: '/projects', label: 'Portfolio', isActive: !!matchProjects },
    { to: '/notes', label: 'Record', isActive: !!matchNotes },
    { to: '/about', label: 'About', isActive: !!matchAbout },
  ]

  return (
    <>
      <motion.header
        ref={navRef}
        className="fixed top-0 z-50 w-full"
        initial={false}
        style={{
          // 移除 backdropFilter/WebkitBackdropFilter，避免新的层叠上下文
          backgroundColor: visible
            ? isDark
              ? 'rgba(3, 7, 18, 0.7)'
              : 'rgba(255, 255, 255, 0.8)'
            : isDark
            ? 'rgba(3, 7, 18, 1)'
            : 'rgba(255, 255, 255, 1)',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
      >
        <div className="relative">
          {/* 半透明模糊层 */}
          {visible && (
            <div className="absolute inset-0  backdrop-blur-lg pointer-events-none" />
          )}
          {/* 导航内容 */}
          <div className="mx-auto max-w-7xl flex justify-between px-4 items-center py-3 dark:bg-transparent dark:text-white relative">
            <div className="flex items-center space-x-2 lg:space-x-0">
              {/* 移动端菜单按钮 */}
              <div className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                <HamburgerMenu isOpen={menuOpen} />
              </div>

              {/* 左侧 Logo */}
              <Link
                to="/"
                className="flex items-center space-x-2 text-lg font-semibold text-black dark:text-white"
              >
                <svg
                  className="w-8 h-8 text-black dark:text-white"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M75.552 22.9172C82.7623 29.872 87.2522 39.638 87.2522 50.4504C87.252 71.575 70.1267 88.7002 49.0022 88.7004C31.4757 88.7004 16.7064 76.9135 12.1799 60.8381L12.1848 60.8362L12.1702 60.8215L22.4524 50.4075V50.4055H22.4553L23.2161 49.635L23.7444 49.0999H37.7512V50.9006L37.7659 51.4563C38.0269 56.6006 41.8877 60.7933 46.8792 61.5696C47.3746 60.3602 47.6516 59.0374 47.6516 57.6497V24.3499H47.6614L47.6575 24.3459C48.1079 23.8955 56.2901 15.7161 60.3538 11.803L60.8762 11.3H75.552V22.9172ZM75.552 50.4504C75.5518 65.1132 63.665 77 49.0022 77.0002C35.9413 77.0002 25.0881 67.5354 22.8674 55.1116L16.2551 61.8079C20.9573 75.3674 33.8457 85.1008 49.0022 85.1008C68.1385 85.1006 83.6514 69.5867 83.6516 50.4504C83.6516 41.9736 80.6075 34.2102 75.552 28.1877V50.4504ZM62.9514 50.9006C62.9511 58.8532 56.5037 65.3 48.551 65.3C41.2079 65.2997 35.1494 59.8028 34.2639 52.6995H26.1653C27.3164 64.3056 37.1053 73.4006 49.0022 73.4006C61.6768 73.4004 71.9522 63.125 71.9524 50.4504V14.8997H62.9514V50.9006ZM48.5129 61.6995C48.5256 61.6995 48.5383 61.7004 48.551 61.7004C48.5644 61.7004 48.5777 61.6995 48.5911 61.6995H48.5129ZM59.3518 17.8137C56.345 20.7711 52.9416 24.1602 51.2522 25.845V57.6497C51.2522 58.9792 51.0626 60.2646 50.7151 61.4827C55.6426 60.4803 59.3515 56.1238 59.3518 50.9006V17.8137Z"
                  />
                </svg>
                <span className="text-black dark:text-white">Jiangyu</span>
              </Link>
            </div>

            {/* 中间导航链接 */}
            <nav className="hidden lg:flex items-center space-x-6 text-sm absolute left-1/2 transform -translate-x-1/2">
              {navItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.to}
                  className={`relative px-4 py-2 transition rounded-lg ${
                    item.isActive
                      ? 'bg-gray-100 dark:bg-zinc-700/80 text-black dark:text-white font-medium'
                      : 'text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* 右侧按钮 */}
            <div className="text-lg flex items-center space-x-4 lg:ml-auto">
              <Around
                className="transition select-none"
                duration={750}
                toggled={isDark}
                onToggle={() => {
                  const newTheme = !isDark
                  setIsDark(newTheme)
                  localStorage.setItem('theme', newTheme ? 'dark' : 'light')
                }}
              />
              <div
                className="relative"
                onMouseEnter={() => setIsPopoverOpen(true)}
                onMouseLeave={() => setIsPopoverOpen(false)}
              >
                <RainbowButton>🔥 Contact me</RainbowButton>
                <AnimatePresence>
                  {isPopoverOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-2 right-0 w-[200px] bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-400 shadow-lg rounded-md overflow-hidden z-50"
                    >
                      <img
                        src="QRCode.svg"
                        alt="popover"
                        className="w-full h-auto"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.header>
      <div className="h-12 lg:h-16" aria-hidden="true" />

      <AnimatePresence>
        {menuOpen && (
          <>
            {/* 点击菜单外区域关闭 */}
            <motion.div
              className="fixed inset-0 z-40"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            {/* 菜单内容本体 */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="lg:hidden fixed top-12 left-0 w-full z-40 px-4 py-6 space-y-2 bg-white dark:bg-neutral-950 shadow-md"
            >
              {navItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.to}
                  className={`block px-4 py-2 rounded-md font-medium ${
                    item.isActive
                      ? 'bg-gray-100 dark:bg-neutral-800 text-black dark:text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
