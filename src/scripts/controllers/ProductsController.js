import { Toggle } from '../components/Toggle.js'
import { PRODUCTS } from '../constants.js'

export class ProductsController {
  #toggle

  constructor(root, options = {}) {
    const { inactiveButtonClass } = { ...PRODUCTS, ...options }

    this.#toggle = new Toggle(root, { inactiveButtonClass })
  }

  start() {
    this.#toggle.start()
  }
}
