# Spec: buttons that do something (MY-195)

## Behavior

- **Open Account** in the hero and in the CTA is a link to **Our Products** (`#products`). The page scrolls to
  the section; Careers' CTA opens Home at the same place. There is no sign-up page.
- **Learn More** on the For Individuals / For Business cards of Use Cases is a link to Our Products with the
  matching tab selected: For Individuals or For Businesses. It works every time it is pressed, also when that
  tab is already selected or the page is already at that address.
- The address says which tab it is: `/#products-individuals` and `/#products-businesses`. Opening such an
  address (a new tab, a shared link, a reload) selects the tab and scrolls to the section; the browser's Back
  and Forward buttons between such addresses select the tab and scroll again. Any other address is ignored.
- The jump is smooth; with `prefers-reduced-motion: reduce` it is instant.
- Every other button of Home already acts (menu, tabs, expander, arrows, Exchange); a link looks like a button
  only where it goes to a place, never where it acts on the page.

## Keyboard and assistive technology

- The links are in the normal Tab order; `Enter` follows them. A screen reader announces a link, not a button.
- After Learn More (and after Back or Forward between tab addresses) focus moves to the selected tab button of
  Our Products, so the next `Tab` continues inside the section; the page does not scroll a second time. After
  Open Account the browser itself moves the next `Tab` to the section. Opening an address with a tab hash does
  not move focus.

## Layout

- A link with the button look is the same size and look as the button was; no visual change.

## Not changed

- The toggle itself, the products, the CTA texts, Exchange.
