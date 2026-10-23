# Assets and Performance Rules

What holds for images, the font, the files in `assets/`, the page metadata and the weight of
the build. Where the files are: `ai/map.md`. Why the site is static and vanilla:
decision `vanilla-js-vite-handlebars`.

## Font

- Lexend is self-hosted: a `woff2` in `assets/fonts/`, declared in `styles/general/fonts.css`
  with `font-display: swap`. No font CDN.
- A new weight, style or face is a decision for the author, not a drive-by edit; a variable
  file already covers the weights in use.
- A changed font file gets a new name: the URL is not hashed.

## Images

- Every `<img>` has `width` and `height` (no layout shift), and `alt`: a decorative image has
  `alt=""` and `aria-hidden="true"`, an informative one says what it shows.
- An image below the first screen has `loading="lazy"`; the first screen's own image does not.
- Icons and illustrations are SVG. An export from a design tool is cleaned before it is
  committed (no editor metadata, no embedded raster, no needless paths); a file that stays
  heavy after that (over about 200 kB) is questioned first: a simpler shape, a CSS gradient,
  or a smaller export.
- A photo is a compressed `jpg` or `webp` at the size it is shown (twice that for a sharp
  screen), never the original export.
- Files in `assets/` are served from the root (`/images/…`, `/fonts/…`) as they are and
  copied to `dist/`; they are named in lowercase with hyphens, by what they show
  (`growth-arrows.svg`), not by their place in the design.
- An asset the code no longer uses is deleted in the same change.

## Page metadata

- Every page has a unique `<title>` and meta `description`, the viewport meta, and `lang`
  equal to the language of its content.
- The head holds only what the page needs: the stylesheet, the one script entry, the
  metadata.

## Bundle and third parties

- No third-party runtime scripts, no analytics, no font or icon CDN: the only script is
  `scripts/main.js`.
- No sitemap and no web app manifest unless the author asks.
- No source maps in the production build: `vite.config.js` sets no `build.sourcemap`.
- A dependency is added only with the author's yes; the runtime has none today.
- There is no size budget yet. A change that makes `npm run build` visibly heavier is
  questioned first: a lighter way, a smaller image.
