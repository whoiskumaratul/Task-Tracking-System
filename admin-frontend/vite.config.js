import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allows connections from other devices
    port: 5174,
     strictPort: false, //strict mode if port is already in use
    open: true, // Automatically open the app in the browser
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8000', // The backend server URL
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
  },
})
