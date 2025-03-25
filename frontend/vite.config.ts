import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import svgr from 'vite-plugin-svgr'
 
// https://vite.dev/config/
export default defineConfig({
  define: {
    'process.env': {}
  },
  server:{
    proxy: {
      '/api': {
        target: 'http://localhost:8080', 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [react(), tailwindcss(), svgr({include:'**/*.svg'})],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})