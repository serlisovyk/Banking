import { KEYS, MENU, MOBILE_MEDIA_QUERY } from '../constants.js'

export class HeaderMenuController {
  #options
  #button
  #menu
  #mobileQuery
  #isOpen = false

  constructor(root, options = {}) {
    this.#options = { ...MENU, ...options }
    this.#button = root.querySelector('[data-header-menu-toggle]')
    this.#menu = root.querySelector('[data-header-nav]')
    this.#mobileQuery = window.matchMedia(MOBILE_MEDIA_QUERY)
  }

  start() {
    this.#renderOpen()

    this.#button.addEventListener('click', () => this.toggle())
    this.#menu.addEventListener('click', (event) => this.#handleMenuClick(event))
    document.addEventListener('keydown', (event) => this.#handleKeydown(event))
    this.#mobileQuery.addEventListener('change', () => this.close())
  }

  open() {
    this.#isOpen = true
    this.#renderOpen()
  }

  close() {
    this.#isOpen = false
    this.#renderOpen()
  }

  toggle() {
    if (this.#isOpen) {
      this.close()
      return
    }

    this.open()
  }

  #handleMenuClick(event) {
    if (event.target.closest('a')) this.close()
  }

  #handleKeydown(event) {
    if (event.key !== KEYS.escape || !this.#isOpen) return

    this.close()
    this.#button.focus()
  }

  #renderOpen() {
    const { openClass, labels } = this.#options
    const isHiddenOnMobile = this.#mobileQuery.matches && !this.#isOpen
    const label = this.#isOpen ? labels.whenOpen : labels.whenClosed

    this.#menu.classList.toggle(openClass, this.#isOpen)
    this.#menu.inert = isHiddenOnMobile
    this.#button.setAttribute('aria-expanded', String(this.#isOpen))
    this.#button.setAttribute('aria-label', label)
  }
}
