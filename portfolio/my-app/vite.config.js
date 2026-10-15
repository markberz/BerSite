import { defineConfig, loadEnv } from 'vite'
import { cwd } from 'process'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, cwd(), '')
  return {
    plugins: [react()],
    base: env.VITE_APP_BASE_PATH || '/',
  }
})