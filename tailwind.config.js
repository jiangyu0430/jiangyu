export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        //primary: '#7e5bef', // 紫色主题
        'color-1': 'hsl(var(--color-1))',
        'color-2': 'hsl(var(--color-2))',
        'color-3': 'hsl(var(--color-3))',
        'color-4': 'hsl(var(--color-4))',
        'color-5': 'hsl(var(--color-5))',
      },
      fontFamily: {
        sans: [
          'Poppins',
          'system-ui',
          'PingFang SC',
          'Microsoft YaHei',
          'Instrument Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
        poppins: ['Poppins', 'sans-serif'],
      },
      zIndex: {
        modal: '99999',
        tooltip: '999999',
      },
      // 为 Follow me 区块的图标悬停旋转动画服务
      animation: {
        'spin-once': 'spin 0.25s linear 1',
        rainbow: 'rainbow var(--speed, 2s) infinite linear',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        rainbow: {
          '0%': { 'background-position': '0%' },
          '100%': { 'background-position': '200%' },
        },
      },
    },
    animation: {
      ripple: 'ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite',
    },
    keyframes: {
      ripple: {
        '0%, 100%': {
          transform: 'translate(-50%, -50%) scale(1)',
        },
        '50%': {
          transform: 'translate(-50%, -50%) scale(0.9)',
        },
      },
    },
    //Marquee
    animation: {
      marquee: 'marquee var(--duration) linear infinite',
      'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
    },
    keyframes: {
      marquee: {
        from: { transform: 'translateX(0)' },
        to: { transform: 'translateX(calc(-100% - var(--gap)))' },
      },
      'marquee-vertical': {
        from: { transform: 'translateY(0)' },
        to: { transform: 'translateY(calc(-100% - var(--gap)))' },
      },
    },
  },
  darkMode: 'class',
  plugins: [require('@tailwindcss/line-clamp')],
}
