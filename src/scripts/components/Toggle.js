export class Toggle {
  #root
  #options
  #buttons
  #panels

  constructor(root, options = {}) {
    this.#root = root
    this.#options = { inactiveButtonClass: null, ...options }
    this.#buttons = [...root.querySelectorAll('[data-toggle-button]')]
    this.#panels = [...root.querySelectorAll('[data-toggle-panel]')]
  }

  start() {
    const pressedButton = this.#buttons.find(
      (button) => button.getAttribute('aria-pressed') === 'true',
    )

    this.select(pressedButton ?? this.#buttons[0])
    this.#root.addEventListener('click', (event) => this.#handleClick(event))
  }

  select(selectedButton) {
    this.#renderButtons(selectedButton)
    this.#renderPanels(selectedButton.dataset.toggleButton)
  }

  #handleClick(event) {
    const selectedButton = event.target.closest('[data-toggle-button]')
    if (!selectedButton) return

    this.select(selectedButton)
  }

  #renderButtons(selectedButton) {
    const { inactiveButtonClass } = this.#options

    for (const button of this.#buttons) {
      const isSelected = button === selectedButton

      button.setAttribute('aria-pressed', String(isSelected))
      if (inactiveButtonClass) {
        button.classList.toggle(inactiveButtonClass, !isSelected)
      }
    }
  }

  #renderPanels(selectedKey) {
    for (const panel of this.#panels) {
      panel.hidden = panel.dataset.togglePanel !== selectedKey
    }
  }
}
