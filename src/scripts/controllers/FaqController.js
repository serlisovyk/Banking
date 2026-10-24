import { Disclosure } from '../components/Disclosure.js'
import { FAQ } from '../constants.js'

export class FaqController {
  #disclosure

  constructor(root, options = {}) {
    const { expandedClass, heightProperty, labels } = { ...FAQ, ...options }

    this.#disclosure = new Disclosure(root, {
      expandedClass,
      heightProperty,
      labels,
    })
  }

  start() {
    this.#disclosure.start()
  }
}
