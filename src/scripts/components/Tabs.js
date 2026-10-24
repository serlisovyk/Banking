import { KEYS, TABLET_MEDIA_QUERY } from '../constants.js'

export class Tabs {
  #options
  #tabList
  #tabs
  #panels
  #horizontalQuery

  constructor(root, options = {}) {
    this.#options = {
      horizontalQuery: TABLET_MEDIA_QUERY,
      activeTabClass: null,
      activePanelClass: null,
      ...options,
    }
    this.#tabList = root.querySelector('[role="tablist"]')
    this.#tabs = [...root.querySelectorAll('[data-tab]')]
    this.#panels = [...root.querySelectorAll('[data-tab-panel]')]
    this.#horizontalQuery = window.matchMedia(this.#options.horizontalQuery)
  }

  start() {
    const selectedTab = this.#tabs.find(
      (tab) => tab.getAttribute('aria-selected') === 'true',
    )

    this.#renderOrientation()
    this.select(selectedTab ?? this.#tabs[0])

    this.#horizontalQuery.addEventListener('change', () => this.#renderOrientation())
    this.#tabList.addEventListener('click', (event) => this.#handleClick(event))
    this.#tabList.addEventListener('keydown', (event) => this.#handleKeydown(event))
  }

  select(selectedTab, shouldFocus = false) {
    this.#renderTabs(selectedTab)
    this.#renderPanels(selectedTab.dataset.tab)

    if (shouldFocus) selectedTab.focus()
  }

  #handleClick(event) {
    const selectedTab = event.target.closest('[data-tab]')
    if (!selectedTab) return

    this.select(selectedTab)
  }

  #handleKeydown(event) {
    const currentTab = event.target.closest('[data-tab]')
    if (!currentTab) return

    const nextTab = this.#findTabForKey(event.key, currentTab)
    if (!nextTab) return

    event.preventDefault()
    this.select(nextTab, true)
  }

  #findTabForKey(key, currentTab) {
    const tabCount = this.#tabs.length
    const currentIndex = this.#tabs.indexOf(currentTab)
    const isHorizontal = this.#horizontalQuery.matches
    const nextKey = isHorizontal ? KEYS.arrowRight : KEYS.arrowDown
    const previousKey = isHorizontal ? KEYS.arrowLeft : KEYS.arrowUp
    const nextIndex = (currentIndex + 1) % tabCount
    const previousIndex = (currentIndex - 1 + tabCount) % tabCount

    if (key === KEYS.home) return this.#tabs[0]
    if (key === KEYS.end) return this.#tabs[tabCount - 1]
    if (key === nextKey) return this.#tabs[nextIndex]
    if (key === previousKey) return this.#tabs[previousIndex]

    return null
  }

  #renderOrientation() {
    const isHorizontal = this.#horizontalQuery.matches
    const orientation = isHorizontal ? 'horizontal' : 'vertical'

    this.#tabList.setAttribute('aria-orientation', orientation)
  }

  #renderTabs(selectedTab) {
    const { activeTabClass } = this.#options

    for (const tab of this.#tabs) {
      const isSelected = tab === selectedTab

      tab.setAttribute('aria-selected', String(isSelected))
      tab.tabIndex = isSelected ? 0 : -1
      if (activeTabClass) tab.classList.toggle(activeTabClass, isSelected)
    }
  }

  #renderPanels(selectedKey) {
    const { activePanelClass } = this.#options
    if (!activePanelClass) return

    for (const panel of this.#panels) {
      const isActive = panel.dataset.tabPanel === selectedKey

      panel.classList.toggle(activePanelClass, isActive)
    }
  }
}
