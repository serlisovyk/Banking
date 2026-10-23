const products = document.querySelector('.products')

if (products) {
  const buttons = products.querySelectorAll('[data-products-button]')
  const panels = products.querySelectorAll('[data-products-panel]')

  products.addEventListener('click', (event) => {
    const selectedButton = event.target.closest('[data-products-button]')
    if (!selectedButton) return

    const selectedAudience = selectedButton.dataset.productsButton

    for (const button of buttons) {
      button.classList.toggle('button--empty', button !== selectedButton)
      button.setAttribute('aria-pressed', String(button === selectedButton))
    }

    for (const panel of panels) {
      panel.hidden = panel.dataset.productsPanel !== selectedAudience
    }
  })
}
