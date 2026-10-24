import { CAROUSEL } from '../constants.js'

export class Carousel {
  #options
  #track
  #slides
  #previousButton
  #nextButton

  constructor(root, options = {}) {
    this.#options = { ...CAROUSEL, ...options }
    this.#track = root.querySelector('[data-carousel-track]')
    this.#slides = [...root.querySelectorAll('[data-carousel-slide]')]
    this.#previousButton = root.querySelector('[data-carousel-previous]')
    this.#nextButton = root.querySelector('[data-carousel-next]')
  }

  start() {
    this.#previousButton.addEventListener('click', () => this.#scrollBy(-1))
    this.#nextButton.addEventListener('click', () => this.#scrollBy(1))
    this.#track.addEventListener('scroll', () => this.#renderButtons())
    new ResizeObserver(() => this.#renderButtons()).observe(this.#track)
  }

  #scrollBy(direction) {
    const [firstSlide, secondSlide] = this.#slides
    const slideStep = secondSlide.offsetLeft - firstSlide.offsetLeft

    this.#track.scrollBy({ left: direction * slideStep })
  }

  #renderButtons() {
    const { edgeTolerance } = this.#options
    const { scrollLeft, scrollWidth, clientWidth } = this.#track
    const isAtStart = scrollLeft <= edgeTolerance
    const isAtEnd = scrollLeft >= scrollWidth - clientWidth - edgeTolerance

    this.#renderButton(this.#previousButton, isAtStart, this.#nextButton)
    this.#renderButton(this.#nextButton, isAtEnd, this.#previousButton)
  }

  #renderButton(button, isDisabled, fallbackButton) {
    const shouldMoveFocus = isDisabled && button.matches(':focus')

    if (shouldMoveFocus) fallbackButton.focus()
    button.disabled = isDisabled
  }
}
