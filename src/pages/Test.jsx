// src/pages/Test.jsx
import Ribbons from '../components/Ribbons.jsx'

const Test = () => {
  return (
    <div
      style={{
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#111', // 可移除，仅用于验证动画效果
      }}
    >
      <Ribbons
        baseThickness={30}
        colors={['#ffffff']}
        speedMultiplier={0.5}
        maxAge={500}
        enableFade={false}
        enableShaderEffect={true}
      />
    </div>
  )
}

export default Test
