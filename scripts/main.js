const menuButton = document.querySelector('#header-menu-toggle')
const menu = document.querySelector('#header-navigation')

if (menuButton && menu) {
  const setMenuOpen = (open) => {
    menu.classList.toggle('is-open', open)
    menuButton.setAttribute('aria-expanded', String(open))
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
  }

  menuButton.addEventListener('click', () => {
    setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true')
  })

  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenuOpen(false)
  })

  document.addEventListener('keydown', (event) => {
    if (
      event.key === 'Escape' &&
      menuButton.getAttribute('aria-expanded') === 'true'
    ) {
      setMenuOpen(false)
      menuButton.focus()
    }
  })

  window.matchMedia('(width <= 768px)').addEventListener('change', (event) => {
    if (!event.matches) setMenuOpen(false)
  })
}
