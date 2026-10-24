export class Disclosure {
  #options
  #trigger
  #region
  #label
  #isOpen

  constructor(root, options = {}) {
    this.#options = {
      expandedClass: null,
      heightProperty: '--disclosure-expanded-height',
      labels: null,
      ...options,
    }
    this.#trigger = root.querySelector('[data-disclosure-trigger]')
    this.#region = root.querySelector('[data-disclosure-region]')
    this.#label = root.querySelector('[data-disclosure-label]')
    this.#isOpen = this.#trigger.getAttribute('aria-expanded') === 'true'
  }

  start() {
    this.#renderExpanded()

    this.#trigger.addEventListener('click', () => this.toggle())
    window.addEventListener('resize', () => this.#renderHeight())
  }

  open() {
    this.#renderHeight()
    this.#isOpen = true
    this.#renderExpanded()
  }

  close() {
    this.#renderHeight()
    this.#isOpen = false
    this.#renderExpanded()
  }

  toggle() {
    if (this.#isOpen) {
      this.close()
      return
    }

    this.open()
  }

  #renderHeight() {
    const height = `${this.#region.scrollHeight}px`

    this.#region.style.setProperty(this.#options.heightProperty, height)
  }

  #renderExpanded() {
    const { expandedClass } = this.#options

    this.#trigger.setAttribute('aria-expanded', String(this.#isOpen))
    this.#region.inert = !this.#isOpen
    if (expandedClass) {
      this.#region.classList.toggle(expandedClass, this.#isOpen)
    }

    this.#renderLabel()
  }

  #renderLabel() {
    const { labels } = this.#options
    if (!labels || !this.#label) return

    this.#label.textContent = this.#isOpen ? labels.whenOpen : labels.whenClosed
  }
}
