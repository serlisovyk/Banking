import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import { caseItems } from './src/data/case-items.js'
import { featureGroups } from './src/data/feature-groups.js'
import { questionGroups } from './src/data/question-items.js'

const root = resolve(import.meta.dirname, 'src')

export default defineConfig({
  root,
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        index: resolve(root, 'index.html'),
        about: resolve(root, 'about.html'),
        careers: resolve(root, 'careers.html'),
        security: resolve(root, 'security.html'),
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(root, 'partials'),
      context(pagePath) {
        const page = pagePath.split('/').at(-1).replace('.html', '') || 'index'

        return {
          isHome: page === 'index',
          isAbout: page === 'about',
          isCareers: page === 'careers',
          isSecurity: page === 'security',
          caseItems,
          featureGroups,
          questionGroups,
        }
      },
    }),
  ],
})
