import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const isGithub = process.env.VITE_DEPLOY_TARGET === 'github'

export default defineConfig({
  base: isGithub ? '/jiangyu/' : '/', // ← 自动切换
  plugins: [react()],
  assetsInclude: ['**/*.glb', '**/*.md'], // ✅ 添加对 .md 的支持
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      Animations: path.resolve(__dirname, 'src/components'),
    },
  },
})
