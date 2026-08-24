import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // './' keeps the build portable: it works on Netlify, Vercel, GitHub Pages
  // and even when opened from a sub-folder.
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    // Small inline limit so we never bloat the HTML/JS with base64 media.
    assetsInlineLimit: 2048,
  },
})
