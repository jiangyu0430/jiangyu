//空状态页面
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { InteractiveHoverButton } from './InteractiveHoverButton'
import FuzzyText from './FuzzyText'

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div className="text-center text-zinc-800 dark:text-white/80 p-6">
      <h1 className="text-6xl font-bold mb-6">
        <FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover={true}>
          404
        </FuzzyText>
      </h1>
      <p className="mb-10 text-m">您寻找的内容暂时隐身了，请尝试返回首页</p>
      <div
        style={{
          display: 'inline-flex',
          maxWidth: 'fit-content',
          margin: '0 auto',
        }}
      >
        <InteractiveHoverButton href="/">返回首页</InteractiveHoverButton>
      </div>
    </div>
  )
}

export default NotFoundPage
