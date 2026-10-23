const features = document.querySelector('.features')

if (features) {
  const tabList = features.querySelector('[role="tablist"]')
  const tabs = [...features.querySelectorAll('[data-features-tab]')]
  const panels = [...features.querySelectorAll('[data-features-panel]')]
  const horizontalTabs = window.matchMedia('(width < 1024px)')

  const updateOrientation = () => {
    tabList.setAttribute(
      'aria-orientation',
      horizontalTabs.matches ? 'horizontal' : 'vertical',
    )
  }

  const selectTab = (selectedTab, focus = false) => {
    for (const tab of tabs) {
      const active = tab === selectedTab
      tab.classList.toggle('features__button--active', active)
      tab.setAttribute('aria-selected', String(active))
      tab.tabIndex = active ? 0 : -1
    }

    for (const panel of panels) {
      panel.classList.toggle(
        'features__items--active',
        panel.dataset.featuresPanel === selectedTab.dataset.featuresTab,
      )
    }

    if (focus) selectedTab.focus()
  }

  updateOrientation()
  horizontalTabs.addEventListener('change', updateOrientation)

  tabList.addEventListener('click', (event) => {
    const tab = event.target.closest('[data-features-tab]')
    if (tab) selectTab(tab)
  })

  tabList.addEventListener('keydown', (event) => {
    const currentTab = event.target.closest('[data-features-tab]')
    if (!currentTab) return

    const currentIndex = tabs.indexOf(currentTab)
    let nextIndex

    if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = tabs.length - 1
    else if (event.key === (horizontalTabs.matches ? 'ArrowRight' : 'ArrowDown')) {
      nextIndex = (currentIndex + 1) % tabs.length
    } else if (event.key === (horizontalTabs.matches ? 'ArrowLeft' : 'ArrowUp')) {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
    } else return

    event.preventDefault()
    selectTab(tabs[nextIndex], true)
  })
}
