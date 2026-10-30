# Page-Building Rules — Anggara Treasures

This document contains the standard rules for turning design mockups in the
`design_website/` folder into HTML pages in the `web_alpha/` root, based on
the process and corrections that happened while building the home page
(`index.html`, from `design_website/1. home.png`). Follow these rules for every new page
(`design_website/2.png`, `3.png`, etc.) so results stay consistent and don't
need repeated revisions.

## 1. Mandatory workflow (step order)

1. **Read the reference image in full and section-by-section**, not just at
   a glance. Crop & zoom each part (using Python/PIL) when small details
   aren't clear from one full screenshot. Don't guess — measure.
2. **Measure, don't estimate**, for anything that affects visual accuracy:
   - Font size: the cap-height-via-pixel-sampling method
     (cap-height ≈ 0.7 × font-size) is only a **first guess**, not a final
     answer. Against a busy/photographic background it is unreliable —
     automated brightness-threshold scans pick up stray highlights (sun
     glints, bright jade, gold trim) alongside the actual letter strokes,
     and silently return a wrong bounding box. It has produced sizes that
     were both too small (`index.html`'s first hero pass) and too big
     (`about.html`'s first hero pass) for the *same* formula on different
     mockups — don't trust it alone.
     **Always confirm with a direct visual comparison**, which is the
     reliable method, before calling a size final:
     1. Screenshot the built page in the browser at a known width (e.g.
        1440px).
     2. Scale the mockup image to that same width:
        `mockup.resize((int(mockup.width * scale), int(mockup.height * scale)))`
        where `scale = screenshot_width / mockup.width`.
     3. Crop the same region from both (e.g. the hero heading block) and
        stack them into one image, mockup on top, rendered screenshot below.
     4. Look at the stacked image yourself — does the text start/end at
        matching x-positions, relative to the frame edges? This "distance
        from text to frame" comparison is more robust than reading a cap-
        height number, because it isn't fooled by a busy background the
        way a brightness-threshold scan is.
     Do this for **both headings (h1/h2) AND body paragraphs** — don't
     measure only the heading and assume the paragraph is automatically
     proportional.
   - **Not every heading on a page is the same "tier," even at the same
     HTML level.** A `<h2>` that sits beside an image in a 2-column grid
     section and a `<h2>` that stands alone as a full-width centered
     statement (no image, often on a bold/solid color background) can
     differ enormously in size — on `about.html`, the grid-section
     headings measured ~36px while the standalone statement headings
     ("More Than a Gem", "Discover Your Jadeite Legacy") measured close to
     **hero size** (~96px). Don't assume a shared `h2` class is correct
     for every heading just because they're nominally the same heading
     level — measure each one's cap-height/frame-distance on its own, and
     look at its *role* in the layout (does it have an image competing for
     space, or does it own the full width?).
     **This turned out to be a page-wide pattern, not a one-off** — on the
     first pass, *every* category of "doesn't look like a hero, so it must
     be small" heading was undersized:
     - A full-width text-only section with no image at all (`about.html`'s
       "A Legacy / Shaped by Hand", `index.html`'s "The Wisdom of Empires")
       — same statement-size tier as the colored statement sections above,
       not the small grid tier, even though it sits on a plain white
       background with no special color cue.
     - A heading overlaid on an inset/framed photo (`index.html`'s "An
       Imperial Legacy Beyond Time", `about.html`'s "Born of Nature") — also
       needed roughly double the size first used (small grid h2 → a size
       closer to, though usually still under, the hero).
     - Card-grid titles (`<h3>` on the 3-card grid) — also undersized at a
       plain `text-2xl`/`text-3xl`; needed a noticeably larger scale to
       match the mockup.
     **The lesson: treat "is this heading small?" as a question to measure
     for every single heading on the page, not just the ones that visually
     announce themselves as a big statement.** When a user reports text
     "too small" in one place, don't fix only that spot — re-check every
     heading category on the page before calling it done, since the same
     mis-sizing habit (defaulting to the small grid-h2 class whenever a
     heading isn't an `<h1>`) tends to repeat across every section that
     isn't an obvious hero.
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
  shared script injects a fixed navbar (hamburger + "MENU" label, centered
  logo, diamond + search icons) and a left-side slide-in menu linking to all
  pages, so the nav only needs to be maintained in one file (`js/navbar.js`).
  When adding a new page, add that same script tag and add the new page to
  the `NAV_LINKS` array inside `js/navbar.js`.
  - **Adaptive nav color (mandatory on every section):** the nav switches
    between light (white) and dark (ink) icon/text color depending on
    whether a light or dark section currently sits behind it. This only
    works if **every** `<section>`/`<footer>` on the page has a
    `data-nav-theme="light"` (over a dark/photo background) or
    `data-nav-theme="dark"` (over a white/light background) attribute. If a
    section is missing this attribute, the nav keeps the previous section's
    color and can become unreadable (e.g. white text on a white background)
    — treat this as a correctness bug, not a cosmetic detail, and grep for
    `<section` / `<footer` at the end to confirm none were skipped.
- **Site-wide footer**: every page includes `<script src="js/footer.js"></script>`
  right before `</body>`, **placed before** the `<script src="js/navbar.js"></script>`
  tag (and before the page's own `IntersectionObserver` script). This one
  shared script injects the dark footer (logo, site nav links, copyright),
  so — like the navbar — it only needs to be maintained in one file
  (`js/footer.js`) instead of being pasted into every page. Do not write a
  `<footer>...</footer>` block directly into a page's HTML.
  - **Why the script order matters**: `footer.js` inserts the footer at its
    own `<script>` tag's position using `document.currentScript`, which
    runs synchronously as soon as the browser reaches that tag — before
    `navbar.js` runs its adaptive-color scan. If `footer.js` is placed
    *after* `navbar.js`, the footer won't exist in the DOM yet when the nav
    looks for `[data-nav-theme]` sections, and the nav's color will stop
    updating once the user scrolls into the footer.
  - When adding a new page, add the same two script tags (`footer.js` then
    `navbar.js`) and add the new page to the `NAV_LINKS` array in **both**
    `js/navbar.js` (the slide-in menu) and `js/footer.js` (the footer's
    site nav) — they are two independent lists kept in sync by hand, not
    one shared source, so a new page must be added to both.
- One page = one HTML file (`pagename.html`) in the **root of `web_alpha/`**
  (alongside `index.html`, the site's home page — see the naming-convention
  note in section 7 on why it's `index.html` and not `home.html`), not
  inside `design_website/`.
  `design_website/` is exclusively for mockup files (`1. home.png`,
  `2.png`, etc.) and this rules document — it is not an output folder.
- Final real images (not mockups) are pulled from `img/home_img/` (or a
  similar per-page folder, e.g. `img/about_img/`), referenced from the HTML
  with the relative path `img/<folder-name>/file-name.png` since the HTML
  lives in the `web_alpha/` root.

## 3. Design system (reused across all pages *of the current redesign*)

⚠️ **These tokens belong to the redesign iteration that produced the home
page (`index.html`) from `design_website/1. home.png`.** They are NOT permanently
fixed — if a future batch of mockups (a new redesign pass) uses a different
palette, re-sample it per the Section 1 color rule and update this table
rather than assuming it still applies. This already happened once: the
table below replaced an earlier palette (`cream #F5F1EA`, `header #826B59`,
`gold #D9C6A3`, `maroon #7A1512`) that belonged to the pre-redesign site.

### Colors (define in `tailwind.config` on every page)

| Token | Hex | Used for |
|---|---|---|
| `ink` | `#1A1612` | Dark/photo section backgrounds, footer background, primary body text on white sections |
| `gold` | `#B98E58` | Italic accent heading text on DARK/photo backgrounds, card button borders & labels |
| `maroon` | `#9C0512` | Italic accent heading text on WHITE/light backgrounds |
| `parchment` | `#F0E5D4` | Heading/body text and filled buttons on DARK/photo backgrounds |

Light section backgrounds are plain white (`#FFFFFF` / Tailwind `bg-white`)
in this iteration, not a cream tint — confirm this is still true before
reusing it on a new mockup.

⚠️ **The italic accent color depends on what's behind it, not on being a
fixed token**: `gold` on dark/photo backgrounds, `maroon` on white
backgrounds. Sample both from the actual mockup — don't assume one color
works everywhere just because the role (italic accent word) is the same.

### Typography

- Main hero heading (h1): `text-4xl sm:text-5xl md:text-6xl lg:text-7xl
  xl:text-8xl`, `leading-[1.05]` — but **always re-measure per page** (see
  section 1); the previous iteration measured larger (`text-6xl …
  md:text-8xl`) on a different mockup set.
- Regular section heading (h2), *grid section with an image*: `text-2xl
  sm:text-3xl lg:text-4xl` in this iteration — re-measure per page, don't
  assume this scale.
- **Standalone statement heading (h2), full-width/centered, no image**
  (e.g. a solid-color pull-quote section like `about.html`'s "More Than a
  Gem"): sized close to the **hero h1**, not the grid h2 — in this
  iteration `text-4xl sm:text-5xl md:text-6xl lg:text-8xl`. See the
  heading-tier note in Section 1: measure this separately, it is not the
  same size as a grid-section h2 just because both are `<h2>` tags.
- Body paragraph: `text-base font-light leading-relaxed text-ink/80` as a
  starting point — **but always re-measure per page** (see section 1); it
  may need to go up to `text-lg`/`text-xl` depending on the reference.
- Small capital label: class `.label` (letter-spacing: 0.25em), `text-xs`
  or `text-[10px]`.
- The accent word/line in a heading is `italic text-gold` on dark/photo
  backgrounds, `italic text-maroon` on white backgrounds (see color note
  above).

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
- **Multi-image slot (carousel) dots + prev/next arrows**: when a slot has
  more than one real photo for the same spot (see the `N-slot-variant.jpg`
  naming note in Section 4), pair it with small dot indicators and
  circular prev/next arrow buttons. Use a frosted-glass style for the
  arrow buttons — `rounded-full border border-white/50 bg-white/30
  backdrop-blur-md text-ink` with a thin chevron (`stroke-width="1.5"`) —
  not a solid opaque fill, so the button stays legible over any of the
  slot's photos regardless of how bright or dark each one is. Wire the
  dots and arrows to the same `goToSlide(index)` function so they always
  stay in sync.
- **Section divider (thin black shadow between sections)**: add a
  `.section-divider` class to every top-level `<section>` and `<footer>`
  (defined once in the page's `<style>` block):
  ```css
  .section-divider {
    box-shadow: inset 0 -6px 8px -6px rgba(0, 0, 0, 0.35);
  }
  ```
  Use **`inset`**, not a regular drop-shadow — adjacent sections sit flush
  against each other with no gap, so in normal DOM/paint order the next
  section's own background immediately overlaps (and hides) anything a
  plain `box-shadow` casts outside the previous section's box. An `inset`
  shadow is painted *inside* the section's own box, so it always stays
  visible regardless of sibling paint order, with no `z-index` tricks
  needed. Apply it on every section/footer, including full-bleed photo
  heroes, so the thin line reads consistently as a page-wide divider.

## 4. Image rules (the most common source of mistakes — read carefully)

1. **Check whether real photos already exist before building any
   placeholder.** This project's photography sometimes arrives in
   `img/<page>_img/` *before* the HTML is built — don't assume the folder
   only has old/unrelated photos. List the folder, open each file, and
   visually compare it against the matching crop of the mockup before
   deciding a slot needs a gray placeholder. Getting this wrong (building
   placeholders for a page that already had real photos sitting in its
   folder) is exactly the kind of mistake this section exists to prevent.
   - **Naming pattern observed in this project**: `<page#>-<slot#>.jpg`
     per image slot (e.g. `1-3.jpg` = page 1's third photo slot), and
     `<page#>-<slot#>-<variant#>.jpg` (e.g. `1-5-1.jpg`, `1-5-2.jpg`,
     `1-5-3.jpg`) when one slot has multiple photos — almost always a
     carousel (see the Recurring Components note in Section 3). Check for
     this `-variant` suffix pattern before assuming a slot is single-image.
   - **If a file looks mismatched or off-brand** (wrong subject, wrong
     style, doesn't fit the page's theme) **flag it to the user and ask**
     instead of silently dropping it or silently including it — it may be
     intentional, or it may be a stray/misplaced asset.
2. **Check the file's actual dimensions first**, before deciding the
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
3. **Set the container's `aspect-ratio` to EXACTLY MATCH the image's native
   ratio** (using `aspect-square`, `aspect-[W/H]`, etc.). If the container
   ratio ≠ the image's native ratio, `object-cover` will crop the image and
   `object-contain` will leave empty space (letterbox/pillarbox) — both are
   problems if unintentional.
4. Default rule: **the frame follows the image, not the other way around.**
   Only use `object-cover` (with cropping tolerance) for:
   - Full-bleed backgrounds (hero & dark feature slides) that genuinely need
     to fill 100vh/100vw.
   - Cases the user explicitly says can be cropped/zoomed.
   Otherwise, match the `aspect-ratio` to the real image first, then use
   `object-cover` (which then crops nothing, since the ratios already
   match).
5. **Side-by-side image + text section** (not hero/full-bleed): **measure
   whether the image bleeds to the screen edge or sits in a padded/gutter
   container — don't assume either pattern carries over from a previous
   page.** Both have shown up across this project's mockups:
   - *Edge-bleed pattern* (seen on the pre-redesign site): image side
     bleeds to the screen edge (gutter ±0–4%), text side has a small
     gutter (±6–8%) only on its outer edge, not both sides.
   - *Contained/padded pattern* (seen on `index.html`'s redesign mockup):
     both the image and text columns sit inside one shared padded
     container (e.g. `px-6 md:px-14 lg:px-20`) with a visible gutter on
     both outer edges and a generous gap between columns — the image does
     **not** touch the screen edge.
   Either way, avoid a narrow `max-w-6xl mx-auto` with large symmetric
   padding (that creates oversized empty space on wide screens), and use a
   full-width `grid grid-cols-1 md:grid-cols-2`, NOT a flex layout inside a
   centered container.
6. **Section with min-h-screen + grid**: give the grid `items-center`
   (instead of the default `stretch`), so the image column isn't forced to
   fill the section's entire height. If the image column + caption beneath
   it ends up crammed against the next section, add `py-*` to its wrapper
   div.
7. **No real image yet?** Use a plain gray placeholder (no diagonal stripe
   pattern), with a small label naming the slot so it's easy to swap later:
   ```html
   <div class="flex items-center justify-center border border-dashed
     border-black/20 bg-[#D9D9D9] text-black/40 text-xs">
     IMAGE PLACEHOLDER — slot-name
   </div>
   ```
   For a slot on a dark background, use the dark variant
   (`bg-[#8A8A8A]`, white text).
8. **Make sure the image folder is accessible to Apache.** If images don't
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
      another page, **and confirmed with the scaled-overlay visual
      comparison** from Section 1 (not the cap-height formula alone).
- [ ] Every heading has been checked against its actual role in the layout
      (grid heading beside an image vs. standalone full-width statement
      heading) rather than assumed to share a size with other headings at
      the same HTML level — see the heading-tier note in Section 1/3.
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
- [ ] Dark and light sections have had their text contrast checked — the
      italic accent color matches what's behind it (`gold` on dark/photo,
      `maroon` on white), see the rule in section 3.
- [ ] Every `<section>`/`<footer>` has a `data-nav-theme="light"` or
      `"dark"` attribute (see section 2) so the fixed nav never goes
      unreadable against the background behind it.
- [ ] Every `<section>`/`<footer>` has the `.section-divider` class (see
      section 3) so the thin black shadow divider is consistent page-wide.
- [ ] The page has no hand-written `<footer>...</footer>` block — it loads
      `js/footer.js` instead, with that script tag placed *before*
      `js/navbar.js` (see section 2), and the new page has been added to
      the `NAV_LINKS` array in both `js/footer.js` and `js/navbar.js`.
- [ ] `img/<page>_img/` was checked for existing real photos (including any
      `-variant` filenames for multi-image/carousel slots) before any
      placeholder was built, and any mismatched/off-brand file was flagged
      to the user instead of silently kept or dropped.
- [ ] CTA links/buttons have been checked so their underline/border width
      doesn't extend past the text (needs `w-fit self-start` when inside a
      flex-col).

## 7. Naming conventions

- Output HTML file: a short, descriptive name matching the page's content
  (e.g. `about.html`, `collection.html`, etc.) — not based on the raw image
  filename (`2.png` → determine the page name from its content, not
  "2.html"). The one exception is the home page: it is named `index.html`
  (not `home.html`) so Apache serves it automatically at the site root
  (`https://www.anggaratreasures.com/`), matching the canonical URL already
  used in every page's `<link rel="canonical">`, `sitemap.xml`, and
  `llms.txt`. This was originally built as `home.html` and renamed once the
  mismatch with those root-URL references was noticed — keep
  `js/navbar.js`'s and `js/footer.js`'s `NAV_LINKS` and every "Home" link
  pointed at `index.html`, not `home.html`.
- Final real images: store them in `img/<page-name>_img/` following the
  existing `img/home_img/` pattern, with `755`/`644` permissions.
