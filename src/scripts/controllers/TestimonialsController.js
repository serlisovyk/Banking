import { Carousel } from '../components/Carousel.js'
import { Toggle } from '../components/Toggle.js'
import { TESTIMONIALS } from '../constants.js'

export class TestimonialsController {
  #toggle
  #carousels

  constructor(root, options = {}) {
    const { inactiveButtonClass } = { ...TESTIMONIALS, ...options }

    this.#toggle = new Toggle(root, { inactiveButtonClass })
    this.#carousels = [...root.querySelectorAll('[data-carousel]')].map(
      (carouselRoot) => new Carousel(carouselRoot),
    )
  }

  start() {
    this.#toggle.start()

    for (const carousel of this.#carousels) {
      carousel.start()
    }
  }
}
