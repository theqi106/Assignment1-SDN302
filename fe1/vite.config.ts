import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  preview: {
    port: 10000,
  },
  plugins: [react()],
  base: '/'
}

)
