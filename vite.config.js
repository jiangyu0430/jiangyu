import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: '/jiangyu/',
  plugins: [react()],
  assetsInclude: ['**/*.glb', '**/*.md'], // ✅ 添加对 .md 的支持
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      Animations: path.resolve(__dirname, 'src/components'),
    },
  },
})
