import { Toggle } from '../components/Toggle.js'
import { PRODUCTS } from '../constants.js'

export class ProductsController {
  #root
  #options
  #toggle

  constructor(root, options = {}) {
    this.#root = root
    this.#options = { ...PRODUCTS, ...options }
    this.#toggle = new Toggle(root, {
      inactiveButtonClass: this.#options.inactiveButtonClass,
    })
  }

  start() {
    this.#toggle.start()
    if (this.#selectFromHash()) this.#scrollOnceLoaded()

    window.addEventListener('hashchange', () => this.#reveal())
    document.addEventListener('click', (event) => this.#handleClick(event))
  }

  #handleClick(event) {
    const link = event.target.closest(`a[href^='${this.#options.hashPrefix}']`)
    if (!link || link.hash !== location.hash) return

    this.#reveal()
  }

  #reveal() {
    if (this.#selectFromHash({ shouldFocus: true })) {
      this.#root.scrollIntoView()
    }
  }

  #selectFromHash({ shouldFocus = false } = {}) {
    const { hashPrefix } = this.#options
    if (!location.hash.startsWith(hashPrefix)) return false

    const key = location.hash.slice(hashPrefix.length)

    return this.#toggle.selectByKey(key, { shouldFocus })
  }

  #scrollOnceLoaded() {
    const scroll = () => this.#root.scrollIntoView({ behavior: 'instant' })

    if (document.readyState === 'complete') {
      scroll()
    } else {
      window.addEventListener('load', scroll, { once: true })
    }
  }
}
