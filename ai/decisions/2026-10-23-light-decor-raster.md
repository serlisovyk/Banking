# Dotted decor and photos are WebP or AVIF rasters, never a vector per dot

Date: 2026-10-23 · Status: accepted

## Context

The dotted decor came from the design tool as SVG: one `<path>` per dot (1480 or 1672), each with
its own gradient. Four files were 570-690 kB each in `dist/` even after SVGO, about 2.4 MB a page,
and the Careers photo was a 365 kB `jpg`. That is a raster stored as a vector, and the optimizer
(`build-pipeline`) cannot fix it.

## Decision

- Decor and photos are `avif` or `webp`, chosen per file by size at no visible loss. Decor is
  never an SVG with a path per dot; `assets-performance.md` and `design-system.md` carry the rule.
- Decor is rendered at twice its CSS size, baked over the flat surface it sits on (`--grey-10` for
  the page, `--grey-11` for the panels) and saved opaque; an alpha plane made a file 5-10 times
  larger. A CSS rule sets `background-size` in CSS px. If one of those tokens changes, the decor
  is exported again.
- The dotted decor is AVIF (4:4:4, quality 60-70: lower blurs the faint dots), the photo WebP:
  the build re-encodes avif at 75, which only enlarges a smaller file (the plugin then keeps the
  original), while a webp is shrunk further.
- The files are made once, outside the build, from the SVG sources. A one-off script is not kept.

## Consequences

- The decor weighs about 51 kB in `dist/` instead of 2.4 MB; the pages look the same.
- A changed decor means re-exporting the raster, not editing a vector.
- Rejected: keeping SVG and trimming paths (still hundreds of kB); a pure-CSS `radial-gradient`
  grid under `mask-image` (the dot colour is a rotated radial gradient over the whole field, so it
  needs a pseudo-element, an approximate gradient and markup edits, for files of 6-16 kB); a
  transparent raster that follows any background (several times the size); a `<picture>` fallback
  for the photo (AVIF and WebP are supported by over 95% of browsers).
