import { Tabs } from '../components/Tabs.js'
import { FEATURES } from '../constants.js'

export class FeaturesController {
  #tabs

  constructor(root, options = {}) {
    const { activeTabClass, activePanelClass } = { ...FEATURES, ...options }

    this.#tabs = new Tabs(root, { activeTabClass, activePanelClass })
  }

  start() {
    this.#tabs.start()
  }
}
