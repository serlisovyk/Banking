import { FaqController } from './controllers/FaqController.js'
import { FeaturesController } from './controllers/FeaturesController.js'
import { HeaderMenuController } from './controllers/HeaderMenuController.js'
import { ProductsController } from './controllers/ProductsController.js'

const SECTIONS = [
  { selector: '[data-header]', Controller: HeaderMenuController },
  { selector: '[data-products]', Controller: ProductsController },
  { selector: '[data-features]', Controller: FeaturesController },
  { selector: '[data-questions]', Controller: FaqController },
]

for (const { selector, Controller } of SECTIONS) {
  for (const root of document.querySelectorAll(selector)) {
    new Controller(root).start()
  }
}
