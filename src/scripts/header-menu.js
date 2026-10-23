const menuButton = document.querySelector('#header-menu-toggle')
const menu = document.querySelector('#header-navigation')

if (menuButton && menu) {
  const mobileMenu = window.matchMedia('(width < 768px)')

  const setMenuOpen = (open) => {
    menu.classList.toggle('is-open', open)
    menu.inert = mobileMenu.matches && !open
    menuButton.setAttribute('aria-expanded', String(open))
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
  }

  setMenuOpen(false)

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

  mobileMenu.addEventListener('change', () => setMenuOpen(false))
}
