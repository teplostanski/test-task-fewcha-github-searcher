import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.')
  
  return {
    plugins: [react()],
    base: env.VITE_BASE_URL,
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            'heroui': ['@heroui/react'],
            'redux': ['@reduxjs/toolkit', 'react-redux']
          }
        }
      }
    }
  }
})