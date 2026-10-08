import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import { caseItems } from './data/case-items.js'

export default defineConfig({
  publicDir: 'assets',
  plugins: [
    handlebars({
      partialDirectory: [
        resolve(import.meta.dirname, 'sections'),
        resolve(import.meta.dirname, 'components'),
      ],
      context(pagePath) {
        const page = pagePath.split('/').at(-1).replace('.html', '') || 'index'

        return {
          isHome: page === 'index',
          isAbout: page === 'about',
          isCareers: page === 'careers',
          isSecurity: page === 'security',
          caseItems,
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
