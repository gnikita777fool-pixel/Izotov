import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  base: '/hello-pages/',
  test: { environment: 'jsdom', globals: true, setupFiles: './src/setupTests.ts' },
})
