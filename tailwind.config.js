const plugin = require('tailwindcss/plugin')
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,md,mdx}'],
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
      typography: {
        DEFAULT: {
          css: {
            blockquote: {
              fontStyle: 'normal',
              fontWeight: 'normal',
              borderLeftWidth: '2px',
              //borderLeftColor: '#ddd',
              //color: '#374151',
              paddingLeft: '1rem',
              marginBlock: '1rem',
            },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after': { content: 'none' },
          },
        },
      },
      maxWidth: {
        'screen-2xl': '1440px',
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
  },
  darkMode: 'class',
  plugins: [
    //require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    plugin(({ addComponents }) => {
      addComponents({
        '.prose-dark': {
          '@apply prose prose-invert': {},
        },
      })
    }),
  ],
}
