import BlurStripe from './BlurStripe'
import { useEffect, useState, useRef } from 'react'

const Footer = () => {
  // 初始偏移量，footer 初始位置为 -1200px
  const initialOffset = -1300
  // 视差滚动状态，控制 footer 的 translateY
  const [offsetY, setOffsetY] = useState(initialOffset)
  // 用于获取 footer DOM 元素
  const footerRef = useRef(null)

  useEffect(() => {
    // 视差滚动处理函数
    const handleScroll = () => {
      if (!footerRef.current) return
      // 获取 footer 元素相对于视口顶部的位置
      const rect = footerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      // 当 footer 顶部进入视口时（rect.top < windowHeight），开始视差过渡
      if (rect.top < windowHeight) {
        // 计算 footer 进入视口的比例
        // 比例 progress: 0=刚进入，1=完全进入
        // footer 可见高度 = windowHeight - rect.top, 限制最大为 footer 高度
        const footerHeight = rect.height || 1
        const visible = windowHeight - rect.top
        // 可见比例 progress
        const progress = Math.max(0, Math.min(visible / footerHeight, 1))
        // offsetY 从 initialOffset 平滑过渡到 0
        const speed = 1
        const newOffsetY = initialOffset * (1 - progress) * speed
        setOffsetY(newOffsetY)
      } else {
        // footer 还未进入视口时，保持初始偏移
        setOffsetY(initialOffset)
      }
    }

    // 监听滚动和窗口尺寸变化事件
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)
    // 初始化位置
    handleScroll()

    // 组件卸载时移除监听
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  // 平滑滚动到顶部
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    // 视差原理说明：
    // 1. 使用 useRef 获取 footer 元素，监听滚动事件。
    // 2. 当 footer 顶部进入视口时，计算其可见比例 progress。
    // 3. offsetY 从 initialOffset 平滑过渡到 0，实现进入视口时才开始视差滚动。
    <footer
      ref={footerRef}
      className="bg-black flex flex-col items-center"
      style={{
        // 固定底部效果：minHeight 填满视口剩余空间
        minHeight: '400px',
        width: '100%',
        zIndex: -1, // 保证高于主体内容但不悬浮覆盖
        // 通过 transform 实现视差移动
        transform: `translateY(${offsetY}px)`,
        transition: 'transform 0.1s ease-out',
        // 保证 footer 不会被主体内容覆盖
        boxSizing: 'border-box',
        // 兼容 tailwind 的 relative
      }}
    >
      <div className="w-full h-[520px] z-20 bg-white relative">
        <div className="flex justify-start relative z-10">
          <button
            onClick={scrollToTop}
            className="text-sm text-black hover:text-gray-300 transition flex items-center gap-1"
          >
            返回顶部
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M13.0001 7.82843V20H11.0001V7.82843L5.63614 13.1924L4.22192 11.7782L12.0001 4L19.7783 11.7782L18.3641 13.1924L13.0001 7.82843Z"></path>
            </svg>
          </button>
        </div>
        <div className="flex items-center justify-center absolute bottom-[-8px] h-[16px] left-0 w-full overflow-hidden bg-[#CED6DB]">
          <div
            style={{
              backgroundImage: "url('/scissors_bg.png')",
              backgroundRepeat: 'repeat-x',
              backgroundSize: '8px 16px',
              width: '100%',
              height: '16px',
              display: 'block',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              animation: 'move-video-x 36s linear infinite',
              pointerEvents: 'none',
              mixBlendMode: 'multiply',
            }}
          >
            <video
              src="/scissors.mp4"
              loop
              preload="auto"
              muted
              playsInline
              autoPlay
              style={{
                cursor: 'auto',
                width: '28px',
                borderRadius: '0px',
                display: 'block',
                objectFit: 'cover',
                backgroundColor: 'rgba(0,0,0,0)',
                objectPosition: '50% 50%',
                height: '15px',
              }}
            />
          </div>
          {/* Keyframes for video movement */}
          <style>
            {`
              @keyframes move-video-x {
                0% { left: -28px; }
                100% { left: 100%; }
              }
            `}
          </style>
        </div>
      </div>

      <div className="w-full h-auto">
        <div className="bg-indigo-100 h-3"></div>
        <div className="bg-indigo-300 h-3"></div>
        <div className="bg-indigo-500 h-3"></div>
        <div className="bg-indigo-700 h-3"></div>
      </div>

      {/* 主体版权与备案信息 */}
      <div className="w-full px-8 h-16 flex items-center justify-between text-white relative overflow-hidden">
        {/* 左侧版权信息 */}
        <div className="text-sm text-white/60">
          © {new Date().getFullYear()} Jiangyu. All rights reserved.
        </div>
        {/* 右侧备案信息 */}
        <div className="flex items-center gap-1 text-sm text-white/60">
          <div className="flex items-center gap-2 hover:text-white">
            <img src="/Record.png" alt="备案" className="h-4" />
            <a
              href="https://beian.mps.gov.cn/#/query/webSearch?code=37028302000916"
              target="_blank"
              rel="noreferrer"
            >
              鲁公网安备37028302000916号
            </a>
          </div>
          ｜
          <div className="hover:text-white">
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noreferrer"
            >
              鲁ICP备2025178340号-1
            </a>
          </div>
        </div>
      </div>

      {/* 动态等宽文本，使用 SVG text 实现 */}
      <div className="w-full relative px-8" style={{ position: 'relative' }}>
        <img
          src="/JIANGYU.svg"
          alt="JIANGYU"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        />
      </div>

      {/* 模糊层 */}
      <div className="absolute bottom-0 left-0 w-full z-40 pointer-events-none">
        <BlurStripe height={200} />
      </div>
    </footer>
  )
}

export default Footer
