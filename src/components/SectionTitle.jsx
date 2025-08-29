import React from 'react'

/**
 * SectionTitle 组件
 * @param {string} title - 模块大标题文本
 * @param {string} description - 模块描述文本
 * @param {boolean} leftAlign - 是否左对齐，默认居中
 * @param {string} theme - 主题，"light" 或 "dark"，默认 "light"
 */
const SectionTitle = ({
  title,
  description,
  leftAlign = false,
  theme = 'light',
}) => {
  return (
    <div
      className={`flex flex-col justify-center ${
        leftAlign ? 'items-start text-left' : 'items-center text-center'
      }`}
    >
      <h2
        className={`text-8xl font-medium m-0 leading-[1] ${
          theme === 'light' ? 'text-zinc-950' : 'text-white'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`w-[420px] text-xl mt-6 leading-[1.5] ${
            theme === 'light' ? 'text-zinc-800' : 'text-white/80'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionTitle
