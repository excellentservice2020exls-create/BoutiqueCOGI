import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@store': path.resolve(__dirname, './src/store'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@api': path.resolve(__dirname, './src/api'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@app': path.resolve(__dirname, './src/app'),
      '@prisma': path.resolve(__dirname, './src/prisma')
    },
  },
  server: {
    port: 3000,
  },
})
