import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import viteCompression from 'vite-plugin-compression'
const isGithub = process.env.VITE_DEPLOY_TARGET === 'github'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    viteCompression({
      verbose: true,
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
  assetsInclude: ['**/*.glb', '**/*.md'], // ✅ 添加对 .md 的支持
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      Animations: path.resolve(__dirname, 'src/components'),
    },
  },
  build: {
    target: 'esnext',
    reportCompressedSize: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor-react'
            return 'vendor'
          }
        },
      },
    },
  },
})
