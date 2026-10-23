# Plan: light decor and photo (MY-181)

Goal: the four dotted-decor files (about 570-690 kB each in `dist/` after the optimizer) and the
Careers photo become raster images of a few dozen kB, with no visible difference at 1920, 1440
and 390 px. Target: the decor weighs under 150 kB in total. No spec: layout and behavior do not
change.

## Source of truth

The design is not reachable in this task, so the SVGs already in `assets/images/decor/` are the
source. Each is a dot field drawn as one `<path>` per dot with its own gradient (1480 or 1672
dots), i.e. a raster saved as a vector. An SVG used as an `<img>` or a CSS background is an
isolated image, so its `mix-blend-mode` blends with nothing and the file is a plain
semi-transparent picture: rendering it with sharp (librsvg) matches Chrome's rendering of the
same file to a mean error under 0.2 of 255 on the four files.

## Per file

| File                  | Shown at (CSS px)                  | Replaced by                       |
| --------------------- | ---------------------------------- | --------------------------------- |
| `dots.svg`            | 600 wide, body, on `--grey-10`     | `dots.avif`, 1200 px wide         |
| `dot-wave-left.svg`   | 200 x 211, on `--grey-11`          | `dot-wave-left.avif`, 400 px      |
| `dot-wave-right.svg`  | 200 x 211, on `--grey-11`          | `dot-wave-right.avif`, 400 px     |
| `dots-grid.svg`       | 480 wide (330 at 390), `--grey-11` | `dots-grid.avif`, 960 px          |
| `hero-bg.svg`         | unused, a byte copy of `dots.svg`  | deleted                           |
| `careers-hero-bg.jpg` | 968 x 716 `<img>`                  | `careers-hero-bg.webp`, same size |

- Two px per CSS px (sharp renders the SVG at 2x). A raster has an intrinsic size, so each CSS
  rule gets a `background-size` in CSS px; `dots` already has one.
- The decor is baked over the flat surface it sits on (`--grey-10` for `dots`, `--grey-11` for the
  rest) and saved opaque: an alpha plane costs 5-10 times the file. The edges of the picture are
  the surface colour (checked to within 1 level), so they do not show.
- Format by measurement, per file: AVIF is the smaller one at the same error on the four decor
  files, and quality 60-70 4:4:4 is the lowest without halos around the faint dots (40 and below
  blurs them). The photo goes to WebP: the build's optimizer re-encodes avif at 75 and webp at 80,
  which shrinks a webp further and inflates an avif, so WebP is the smaller after the build.
- The pure-CSS option (`radial-gradient` dots under `mask-image`) was weighed for the grids and
  the waves: the dot colour is a rotated radial gradient across the whole field, which one
  element's backgrounds cannot mask. It needs a pseudo-element, an approximate gradient and an
  edit of the markup of three blocks. The raster is 6-16 kB per file, so it is not worth it. `dots`
  is a perspective wave, not a grid.
- A one-off script (sharp, run once, not committed, not a build step) renders and encodes the
  files. The result is committed as the source; the build only trims it.

## CSS and markup

Only the `url()` and `background-size` lines of `body`, `.case-item__icons` (and its inverted
variant) and `.careers-hero__inner`, and the `src` of the photo (`width` and `height` stay).

## Docs

- `ai/rules/assets-performance.md`: a photo is `webp` or `avif`; decor is a raster baked over its
  surface, never a vector with a path per dot.
- `ai/design-system.md`, "Dotted decor": the file names, the format, the surface it is baked on.
- `ai/map.md` only if a file name shown there changed.
- A decision record: why decor is raster and not a per-dot vector or CSS, the formats chosen, the
  baked surface; its line in `ai/decisions/README.md`.

## Verify

- `npm run build`: the size of each decor file in `dist/` before and after (a table in the report).
- `npm run build` of `main` and of the branch, each served by `npm run preview` on its own port:
  the four pages at 1920, 1440 and 390 px in headless Chrome, side by side; the menu and the
  toggles still work.
- `npm run format:check` stays red for MY-182 (CRLF, the header attribute): reported, not fixed.
