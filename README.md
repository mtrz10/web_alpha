# Page-Building Rules — Anggara Treasures

This document contains the standard rules for turning design mockups in the
`design_website/` folder into HTML pages in the `web_alpha/` root, based on
the process and corrections that happened while building `index.html` (from
`design_website/1. home.png`). Follow these rules for every new page
(`design_website/2.png`, `3.png`, etc.) so results stay consistent and don't
need repeated revisions.

## 1. Mandatory workflow (step order)

1. **Read the reference image in full and section-by-section**, not just at
   a glance. Crop & zoom each part (using Python/PIL) when small details
   aren't clear from one full screenshot. Don't guess — measure.
2. **Measure, don't estimate**, for anything that affects visual accuracy:
   - Font size: check the cap-height of capital letters via pixel sampling,
     then convert to px (cap-height ≈ 0.7 × font-size). Do this for
     **both headings (h1/h2) AND body paragraphs** — don't measure only the
     heading and assume the paragraph is automatically proportional.
   - **Every new page = measure from scratch again.** Do NOT assume a font
     scale/Tailwind class from a previous page (e.g. `index.html`)
     automatically applies to a new page, even if it uses the same color
     tokens and font family. Canvas width, content density, and typographic
     scale can differ between mockups — about.png turned out to use body
     text that's ~34% proportionally larger than home.png. Measure per page,
     per element.
   - Spacing/gutters: measure the x/y position of elements from the image
     edge (in px), convert to a percentage of the reference image's total
     width/height.
   - Color: sample the actual pixel color (RGB) from text/elements, don't
     use an "approximately similar" color. Record the hex value. **Also
     check whether the same text (e.g. "ANGGARA TREASURES") changes color
     depending on its section's dark vs. light background** — don't assume
     one color applies everywhere just because the text is identical.
   - Image ratio: check the actual file dimensions before deciding the
     container's `aspect-ratio` (see section 4).
3. **Record heading line-breaks exactly as shown in the image.** Don't merge
   or split title lines based on preference — a 3-line title in the image
   must stay 3 lines in the HTML, including which words are italic/accent
   colored.
4. **Build the HTML section-by-section**, matching it against the image
   before moving to the next section.
5. **Always verify in the browser** (not just by reading the code) before
   saying "done". Open it via Claude in Chrome, scroll through every
   section, take screenshots, and compare them side-by-side against the
   matching crop of the reference image. Don't claim something matches
   without actually seeing it in the browser.
6. If the user says "it's still wrong," **don't just guess again** — reopen
   the original image, measure again, then fix it.
7. **On long pages (6+ sections), apply a measured size to every matching
   element, not just the first one you style.** Measuring one heading and
   one paragraph is not enough — `grep` the file afterward for every
   `<h1`/`<h2`/`<h3` and every paragraph class to confirm they all got the
   same responsive scale. It's easy to style section 2's heading correctly,
   then paste a bare `text-4xl` (no `sm:`/`md:` step) into section 5 by
   habit and never notice, because nothing errors — it just quietly renders
   too small. A page with 8+ headings needs an explicit pass at the end
   checking every one, not a mental note to "do them all the same."
8. **Keep measurements tied to the file you took them from.** When
   measuring several pages in one working session (e.g. comparing
   `workwithus.png` and `bazi_con.png` back to back), it's easy to misattribute
   a number from one mockup to the wrong page. Before applying a measured
   px value, re-confirm which reference image and which crop it came from.

## 2. Tech stack & file structure

- Plain HTML5 + **Tailwind CSS via CDN** (`<script src="https://cdn.tailwindcss.com">`),
  no build step.
- Fonts: Google Fonts **Playfair Display** (serif, for headings, has an
  italic variant) + **Jost** (sans, for body & labels).
- Vanilla JS only where needed (e.g. scroll-reveal via
  `IntersectionObserver`).
- **Site-wide navbar**: every page includes
  `<script src="js/navbar.js"></script>` right before `</body>`. This one
  shared script injects a fixed, transparent-background navbar (hamburger
  button on the left + `img/icon.png` logo) and a left-side slide-in menu
  linking to all pages, so the nav only needs to be maintained in one file
  (`js/navbar.js`). When adding a new page, add that same script tag and
  add the new page to the `NAV_LINKS` array inside `js/navbar.js`.
- One page = one HTML file (`pagename.html`) in the **root of `web_alpha/`**
  (alongside `index.html`), not inside `design_website/`.
  `design_website/` is exclusively for mockup files (`1. home.png`,
  `2.png`, etc.) and this rules document — it is not an output folder.
- Final real images (not mockups) are pulled from `img/home_img/` (or a
  similar per-page folder, e.g. `img/about_img/`), referenced from the HTML
  with the relative path `img/<folder-name>/file-name.png` since the HTML
  lives in the `web_alpha/` root.

## 3. Design system (reused across all pages)

### Colors (define in `tailwind.config` on every page)

| Token | Hex | Used for |
|---|---|---|
| `cream` | `#F5F1EA` | Light section backgrounds |
| `ink` | `#1A1612` | Dark overlay backgrounds, body text |
| `gold` | `#D9C6A3` | Small labels, button borders, dots, dividers — on DARK backgrounds |
| `header` | `#826B59` | Italic heading text (h1/h2) — used on both light AND dark backgrounds; safer contrast than `gold` on cream |
| `maroon` | `#7A1512` | Underline-style CTA links ("DISCOVER ...") |

⚠️ **Don't use `gold` for heading text on a cream background** — the
contrast is too low (nearly unreadable). For headings, always use `header`.
`gold` is still safe for small labels, divider lines, and dots since those
are small/decorative, not primary text that needs to stay legible.

### Typography

- Main hero heading (h1): `text-6xl sm:text-7xl md:text-8xl`,
  `leading-[1.05]`, 3 lines if the image actually shows 3 lines.
- Regular section heading (h2): `text-4xl sm:text-5xl md:text-6xl`.
- Dark slide heading (full-bleed feature slide): `text-5xl sm:text-6xl`.
- Body paragraph: `text-base font-light leading-relaxed text-ink/80` as a
  starting point — **but always re-measure per page** (see section 1); it
  may need to go up to `text-lg`/`text-xl` depending on the reference.
- Small capital label: class `.label` (letter-spacing: 0.25em), `text-xs`
  or `text-[10px]`.
- The accent word/line in a heading is always `italic text-header`.

### Recurring components

- **Divider line** under the logo: `<span class="mt-3 block h-px w-10 bg-white/40"></span>`
- **Label with a line** (used in dark slides & grid cards):
  `01 <span class="h-px w-6 bg-gold/70"></span> THE LEGACY`
- **SCROLL indicator**: vertical text (`writing-mode: vertical-rl`) + a thin
  vertical line + a small dot below it. NOT horizontal text + a ↓ arrow.
- **Underline CTA link**: `inline-flex w-fit items-center gap-2 self-start
  border-b border-maroon ...`. `w-fit self-start` is required when the
  parent is a flex-col, so the underline doesn't stretch to fill the
  column's width.
- Check each section's CTA button style in the image — don't assume they're
  all the same. Examples found in the reference images: some use a "circle
  icon + plain text label beside it" style, others use a "full pill
  containing text + arrow" style. Replicate exactly what each section's
  image shows.

## 4. Image rules (the most common source of mistakes — read carefully)

1. **Check the file's actual dimensions first**, before deciding the
   container size:
   ```python
   from PIL import Image
   im = Image.open('file.png'); print(im.size)
   ```
   **Do this for every image file used on the page, not just the first few.**
   On a page with 7+ images it's easy to carefully check images 1-4 and then
   eyeball the rest from habit (e.g. assuming a founder portrait is 4:3 when
   it's actually a 16:9 file) — that mismatch causes a silent crop that's
   easy to miss in a quick visual check. Run the dimension check on the
   whole batch of files at once before writing any `<img>` tags, and grep
   `<img` in the finished file afterward to confirm every single one has an
   `aspect-*` class that matches what you checked.
2. **Set the container's `aspect-ratio` to EXACTLY MATCH the image's native
   ratio** (using `aspect-square`, `aspect-[W/H]`, etc.). If the container
   ratio ≠ the image's native ratio, `object-cover` will crop the image and
   `object-contain` will leave empty space (letterbox/pillarbox) — both are
   problems if unintentional.
3. Default rule: **the frame follows the image, not the other way around.**
   Only use `object-cover` (with cropping tolerance) for:
   - Full-bleed backgrounds (hero & dark feature slides) that genuinely need
     to fill 100vh/100vw.
   - Cases the user explicitly says can be cropped/zoomed.
   Otherwise, match the `aspect-ratio` to the real image first, then use
   `object-cover` (which then crops nothing, since the ratios already
   match).
4. **Side-by-side image + text section** (not hero/full-bleed): don't wrap
   it in a `max-w-6xl mx-auto` container with large symmetric padding —
   that creates large empty space on wide screens. The correct pattern
   (measured from the reference images):
   - Image side: bleeds to the screen edge (gutter ±0–4%).
   - Text side: a small gutter (±6–8%) only on its outer edge, not both
     sides.
   - Section uses a full-width `grid grid-cols-2`, NOT a flex layout inside
     a centered container.
5. **Section with min-h-screen + grid**: give the grid `items-center`
   (instead of the default `stretch`), so the image column isn't forced to
   fill the section's entire height. If the image column + caption beneath
   it ends up crammed against the next section, add `py-*` to its wrapper
   div.
6. **No real image yet?** Use a plain gray placeholder (no diagonal stripe
   pattern), with a small label naming the slot so it's easy to swap later:
   ```html
   <div class="flex items-center justify-center border border-dashed
     border-black/20 bg-[#D9D9D9] text-black/40 text-xs">
     IMAGE PLACEHOLDER — slot-name
   </div>
   ```
   For a slot on a dark background, use the dark variant
   (`bg-[#8A8A8A]`, white text).
7. **Make sure the image folder is accessible to Apache.** If images don't
   show up even though the path is correct, check the folder permissions:
   ```bash
   chmod 755 image_folder && chmod 644 image_folder/*.png
   ```

## 5. Section layout rules

- **Hero/banner**: `h-screen`, full-bleed image, NO overlay gradient unless
  requested. The heading text is positioned with **absolute** positioning
  (not `flex justify-between`) at a position measured from the reference
  image (usually around 25–30% from the top, not stuck to the bottom).
- **Other (non-hero) sections**: `min-h-screen` so one section = one full
  screen, EXCEPT short text-only sections with no image (like
  "Living Heritage") — those should just use natural padding
  (`py-20 md:py-24`); don't force `min-h-screen` on them, since that leaves
  a huge empty gap above and below.
- **Dark feature slide** (logo on top + content in the middle + SCROLL
  indicator at the bottom): do NOT use `flex-col justify-between` for these
  three blocks — it makes the top/bottom gaps very wide when the content is
  short. The correct pattern: the logo is `absolute`-positioned at a fixed
  spot at the top, then the main content + SCROLL indicator are grouped
  together inside a `flex-col justify-center` with a fixed gap (`mt-16`)
  between them.
- **Card grid** (3 columns, etc.): thin gutters (±3–4%), small gaps between
  cards, do NOT wrap it in `max-w-6xl mx-auto`.

## 6. Checklist before telling the user "done"

- [ ] All text & line-breaks exactly match the reference image.
- [ ] All colors have been sampled from the real image, not guessed.
- [ ] Font sizes — headings AND paragraphs — have been measured
      (cap-height) from this page's own reference image, not inherited from
      another page.
- [ ] Ran `grep -n "text-4xl\|<h1\|<h2\|<h3"` (or similar) over the finished
      file and confirmed every heading has the full responsive scale
      (`sm:`/`md:` steps) — none left on a bare, un-upgraded size. Same check
      for repeated body-paragraph classes.
- [ ] Ran `grep -n "<img"` over the finished file and re-confirmed every
      single image's `aspect-*` class against its file's actual dimensions —
      not just the first few images checked while writing the section.
- [ ] After setting/changing font sizes, re-check that heading containers
      (`max-w-*`) are still wide enough that text doesn't overflow into an
      extra line that isn't in the reference.
- [ ] Each image's `aspect-ratio` has been matched to its file's actual
      dimensions.
- [ ] Left/right spacing/gutters have been checked — no large empty space
      that isn't present in the reference.
- [ ] It's been opened and scrolled through fully in the browser (Claude in
      Chrome), not just read from the code.
- [ ] Dark and light sections have had their text contrast checked (gold on
      cream = a problem, see the rule in section 3).
- [ ] CTA links/buttons have been checked so their underline/border width
      doesn't extend past the text (needs `w-fit self-start` when inside a
      flex-col).

## 7. Naming conventions

- Output HTML file: a short, descriptive name matching the page's content
  (e.g. `index.html` for home, `about.html`, `collection.html`, etc.) — not
  based on the raw image filename (`2.png` → determine the page name from
  its content, not "2.html").
- Final real images: store them in `img/<page-name>_img/` following the
  existing `img/home_img/` pattern, with `755`/`644` permissions.
