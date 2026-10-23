# Production build: Vite's CSS defaults, minified HTML, optimized images

Date: 2026-10-23 · Status: accepted

## Context

`dist/` needs a normal production bundle: minified CSS and HTML, optimized images. The sources keep
native CSS nesting (`ai/rules/css.md`). Vite 8 already minifies CSS with lightningcss and lowers
nesting for its default build target, `baseline-widely-available`, so the built CSS is flat without
any setup.

## Decision

- CSS: no configuration. No `browserslist`, no `css.transformer`, no `build.cssMinify`, no PostCSS,
  no autoprefixer; the build relies on Vite's defaults (lightningcss minify, the
  `baseline-widely-available` target). Supporting other browsers is a new dated record that names
  the target, not a quiet config edit.
- Images: `vite-plugin-image-optimizer` (sharp, SVGO) in `build` only; SVGO keeps `viewBox`, jpg
  and webp are written at quality 80, avif at 75. The markup and the sources are not touched.
- HTML: a small plugin in `vite.config.js` (`apply: 'build'`, `transformIndexHtml` at
  `order: 'post'`) runs `html-minifier-terser`, so it sees the final page after Handlebars and
  Vite's asset URLs. It collapses whitespace, boolean attributes and comments, and nothing riskier.

## Consequences

- `sharp`, `svgo` and `html-minifier-terser` are dev dependencies; the runtime still has none.
- The optimizer trims, it does not replace cleaning an export or sizing a photo
  (`ai/rules/assets-performance.md`); a heavy file is still questioned.
- Rejected: a `browserslist` with lightningcss targets or PostCSS with autoprefixer (extra config
  and packages for output the defaults already give, and the CSS needs no prefixes today); a ready
  HTML plugin such as `vite-plugin-html` or `vite-plugin-minify` (one more package between the
  build and the minifier for ten lines of config); minifying inline CSS or JS and removing
  attribute quotes or optional tags (a small saving for a real risk to the Handlebars output).
