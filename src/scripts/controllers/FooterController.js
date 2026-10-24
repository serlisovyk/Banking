import { FOOTER } from '../constants.js'

export class FooterController {
  #options
  #year

  constructor(root, options = {}) {
    this.#options = { ...FOOTER, ...options }
    this.#year = root.querySelector('[data-footer-year]')
  }

  start() {
    this.#renderYear()
  }

  #renderYear() {
    const currentYear = new Date().getFullYear()

    this.#year.textContent = `${this.#options.yearSeparator}${currentYear}`
  }
}
