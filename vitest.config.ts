/// <reference types="vitest" />
import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*'],
      exclude: [
        'src/**/*.d.ts',
        'src/setupTests.ts',
        'src/main.tsx',
        'src/vite-env.d.ts'
      ]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}); 