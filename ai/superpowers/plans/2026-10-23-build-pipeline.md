# Plan: production build pipeline (MY-180)

Goal: `dist/` has optimized images and minified HTML, and the CSS is minified and lowered for
Vite's default target, while the pages look 1:1 and the sources stay unchanged. No spec: no
interaction or layout changes. The decorative SVGs stay heavy here; replacing them is MY-181,
which measures against this optimizer.

## Dependencies

Added to `devDependencies` with the issue as the author's yes (`ai/rules/assets-performance.md`):
`vite-plugin-image-optimizer` and its peers `sharp` and `svgo`, and `html-minifier-terser`. The
runtime still has none.

## Images

- `vite-plugin-image-optimizer` runs on the images Vite emits, in `build` only; the markup and the
  source files are not touched.
- SVGO keeps `viewBox` (`removeViewBox: false`) and the `width`/`height` the markup relies on;
  jpg and webp are written at quality 80, avif at 75, set in the plugin options.
- The decor SVGs (about 900 kB, one gradient per path) are expected to shrink little. They are
  checked to render the same (`dots`, `dot-wave-*`, `growth-arrows`) and the build time is noted;
  if a SVGO plugin changes their look it is disabled for all files, not special-cased.

## CSS

No configuration. Vite 8 already minifies CSS with lightningcss and lowers native nesting for its
default `baseline-widely-available` target, so the built CSS has no `&` and no nested rules. No
`browserslist`, no `css.transformer`, no `build.cssMinify`, no PostCSS or autoprefixer. A different
support target is a new decision, not an edit of the config.

## HTML

Choose between a ready plugin and a `transformIndexHtml` hook around `html-minifier-terser`:

- Chosen: a small plugin in `vite.config.js` with `apply: 'build'` and `transformIndexHtml` at
  `order: 'post'`, calling `html-minifier-terser`. It runs after Handlebars (`order: 'pre'`) and after
  Vite has injected the hashed asset URLs, so it sees the final HTML. Options: collapse whitespace
  (not the conservative mode: inline elements keep their single space), remove comments, collapse
  boolean attributes. No attribute-quote, optional-tag or inline-CSS/JS rewriting: the saving is
  small and the risk is not.
- Rejected: `vite-plugin-html` (last release in 2024) and `vite-plugin-minify` (a one-person
  wrapper around another fork of the same minifier): one more dependency in the path for ten lines
  of config.

## Config boundaries

`vite.config.js`: only the plugins change. The `rollupOptions.input` block is left alone (MY-184
adds `404.html` to it in parallel). `assetsInlineLimit: 0` and the asset scheme stay.

## Docs

- `ai/map.md`: a line on the build plugins.
- A decision record: the build relies on Vite's CSS defaults, the HTML minifier choice, the image
  optimizer settings; its line in `ai/decisions/README.md`.
- `ai/rules/assets-performance.md`: the build optimizes images, so the rule on exports and
  photos says what stays the author's job.

## Verification

- `npm run build`: the CSS is byte-identical to a build of `main`, HTML on one line, the
  Handlebars output intact (`aria-current`, the partials).
- A size table of `dist/` before and after, by type (html, css, js, svg, jpg, font) and the build
  time.
- `npm run preview -- --port 4180`: `/`, `/about.html`, `/careers.html`, `/security.html` at 1920,
  1440 and 390 px against a build of `main`; the burger, the products switch, the feature tabs and
  the FAQ work; no console errors.
- `npm run format:check` is red on `main` for reasons that are MY-182's; reported, not fixed.
