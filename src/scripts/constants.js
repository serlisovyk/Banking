export const MOBILE_MEDIA_QUERY = '(width < 768px)'
export const TABLET_MEDIA_QUERY = '(width < 1024px)'

export const KEYS = Object.freeze({
  escape: 'Escape',
  home: 'Home',
  end: 'End',
  arrowUp: 'ArrowUp',
  arrowDown: 'ArrowDown',
  arrowLeft: 'ArrowLeft',
  arrowRight: 'ArrowRight',
})

export const MENU = Object.freeze({
  openClass: 'is-open',
  labels: Object.freeze({ whenOpen: 'Close menu', whenClosed: 'Open menu' }),
})

export const PRODUCTS = Object.freeze({
  inactiveButtonClass: 'button--empty',
})

export const FEATURES = Object.freeze({
  activeTabClass: 'features__button--active',
  activePanelClass: 'features__items--active',
})

export const FAQ = Object.freeze({
  expandedClass: 'questions__more--expanded',
  heightProperty: '--questions-expanded-height',
  labels: Object.freeze({ whenOpen: 'Show Less', whenClosed: 'Load All FAQ’s' }),
})
