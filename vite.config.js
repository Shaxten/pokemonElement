import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/pokemonElement/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      "/src": {
        target: "https://github.com/Shaxten/pokemonElement/tree/master/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/src/, ""),
      },
    },
  },
})
