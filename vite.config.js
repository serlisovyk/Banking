import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'

export default defineConfig({
  publicDir: 'images',
  plugins: [
    handlebars({
      partialDirectory: resolve(import.meta.dirname, 'components'),
      context(pagePath) {
        const page = pagePath.split('/').at(-1).replace('.html', '') || 'index'

        return {
          isHome: page === 'index',
          isAbout: page === 'about',
          isCareers: page === 'careers',
          isSecurity: page === 'security',
        }
      },
    }),
  ],
  input: {
    index: resolve(import.meta.dirname, 'index.html'),
    about: resolve(import.meta.dirname, 'pages/about.html'),
    careers: resolve(import.meta.dirname, 'pages/careers.html'),
    security: resolve(import.meta.dirname, 'pages/security.html'),
  },
})
