import { useEffect } from 'react'
import HulyIcon from '../assets/Huly Icon.svg'
import LazyImage from './LazyImage'

const Footer = () => {
  // 平滑滚动到顶部
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-black border-t border-neutral-700">
      <div className="max-w-[1280px] h-[72px] px-4 mx-auto grid grid-cols-3 items-center text-white">
        {/* 左侧版权信息 */}
        <span className="text-sm text-white/50">
          © {new Date().getFullYear()} Jiangyu. All rights reserved.
        </span>

        {/* 中间图标 */}
        <div className="flex justify-center">
          <LazyImage
            src={HulyIcon}
            alt="Huly Icon"
            className="w-20 h-20 object-contain"
          />
        </div>

        {/* 右侧返回顶部 */}
        <div className="flex justify-end">
          <button
            onClick={scrollToTop}
            className="text-sm text-white hover:text-gray-300 transition flex items-center gap-1"
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
      </div>
    </footer>
  )
}

export default Footer
