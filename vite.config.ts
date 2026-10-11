import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Relative base keeps the build portable: root domains, GitHub Pages project
// sites and plain file:// previews all resolve assets correctly.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
