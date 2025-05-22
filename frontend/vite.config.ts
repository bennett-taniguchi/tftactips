import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import svgr from 'vite-plugin-svgr'
import { cloudflare } from '@cloudflare/vite-plugin'
// https://vite.dev/config/
export default defineConfig({
  define: {
    'process.env': {}
  },
  plugins: [cloudflare({
      configPath: './workers/wrangler.toml', // Tell it where to find the config
    }),react(), tailwindcss(), svgr({include:'**/*.svg'})],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
