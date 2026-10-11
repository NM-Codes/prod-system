import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages hosts this repository under /prod-system/.
  base: process.env.GITHUB_ACTIONS ? '/prod-system/' : '/',
  plugins: [
    react()
  ],
  test: {
    globals: true, // Gör att vi slipper importera 'describe' och 'it' i varje fil
    environment: 'jsdom', // Simulerar en webbläsare i terminalen
  },
})
