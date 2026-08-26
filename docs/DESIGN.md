# Design System - Azqato's Tools

**Last verified against the code:** 2026-08-25 (`css/style.css`, 565 lines, ~14.9KB)

Every value in this document was read out of `css/style.css` or the four HTML pages
rather than inferred. Where the code and an earlier version of this document
disagreed, both readings are kept and the conflict is marked as a discrepancy for the
author to resolve rather than silently corrected.

---

## Design philosophy

The visual direction is minimal, functional, and typographically tight. Every UI
decision defers to clarity: tools should feel invisible so users focus on their task,
not the chrome around it. The aesthetic is modern but not trendy, no decorative
animations and no visual noise. Dark mode is a first-class feature, not an
afterthought.

> **Discrepancy (open).** The philosophy paragraph as originally written said "no
> gradients on content". Two gradients exist in the code: the brand logo mark
> (`linear-gradient(135deg, var(--accent), #a05bff)`) and the hero `<h1>` clipped text
> gradient (`linear-gradient(120deg, var(--accent), #b15bff 70%)`). Both are brand
> furniture rather than tool content, so the rule may have been intended as "no
> gradients inside a tool's working area", which the code does honour. The phrase has
> been lifted out of the running sentence and recorded here instead of being deleted.
> The author should decide whether the rule is "no gradients at all" (in which case the
> two above are violations) or "no gradients inside tool content" (in which case the
> wording should be tightened).

---

## Color palette

All colors are declared as CSS custom properties on `:root` (light) and
`[data-theme="dark"]`. Never use raw hex values in component CSS, always reference the
token. Theme is switched by setting `data-theme` on the `<html>` element; there is no
`prefers-color-scheme` media query in the CSS, that preference is read in JavaScript
instead (see `js/common.js`).

### Light theme (default)

| Token | Hex | Use |
|-------|-----|-----|
| `--bg` | `#f6f7f9` | Page background |
| `--bg-elev` | `#ffffff` | Elevated surfaces: cards, inputs, topbar |
| `--bg-inset` | `#eef0f3` | Inset surfaces: toolbar groups, code blocks, table headers |
| `--border` | `#e2e5ea` | Default border on cards and containers |
| `--border-strong` | `#cfd4dc` | Hover borders, resting input borders |
| `--text` | `#161a20` | Primary text, headings |
| `--text-soft` | `#4a5260` | Secondary text, descriptions, labels |
| `--text-faint` | `#8a93a2` | Placeholder, metadata, disabled states |
| `--accent` | `#5b5bf0` | Interactive: links, primary buttons, focus rings |
| `--accent-hover` | `#4a4ad6` | Hovered primary buttons |
| `--accent-soft` | `#ecedff` | Tool icon backgrounds, focus ring fill, eyebrow pill |
| `--success` | `#1f9d57` | Hero badge checkmarks |
| `--danger` | `#d83a52` | Removed tracking-param chips, error states |
| `--shadow` | `0 1px 2px rgba(16,22,32,.06), 0 8px 24px rgba(16,22,32,.06)` | Elevated cards on hover |
| `--shadow-sm` | `0 1px 2px rgba(16,22,32,.08)` | Default card resting shadow |

Note: `--border-strong` is the resting border on `.field`, not only a hover state. The
focus state moves it to `--accent`.

### Dark theme (`[data-theme="dark"]`)

| Token | Hex | Use |
|-------|-----|-----|
| `--bg` | `#0e1014` | Page background |
| `--bg-elev` | `#171a21` | Elevated surfaces |
| `--bg-inset` | `#1f242d` | Inset surfaces |
| `--border` | `#262b34` | Default border |
| `--border-strong` | `#353c47` | Hover and resting input borders |
| `--text` | `#eef1f5` | Primary text |
| `--text-soft` | `#aab2bf` | Secondary text |
| `--text-faint` | `#6c7686` | Metadata, placeholders |
| `--accent` | `#7c7cff` | Interactive elements (lighter for dark background contrast) |
| `--accent-hover` | `#9090ff` | Hovered accent (lighter still) |
| `--accent-soft` | `#20223a` | Soft accent backgrounds |
| `--success` | `#3ec77c` | Success states |
| `--danger` | `#ff6b80` | Danger and removed states |
| `--shadow` | `0 1px 2px rgba(0,0,0,.4), 0 12px 32px rgba(0,0,0,.35)` | Elevated cards |
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,.4)` | Resting card shadow |

The dark block overrides only colors and shadows. Radii, max width, and font stacks are
declared once on `:root` and shared by both themes.

### Non-color tokens

| Token | Value | Use |
|-------|-------|-----|
| `--radius` | `14px` | Cards, tool cards, editor panes, favicon result tiles |
| `--radius-sm` | `9px` | Buttons, form fields, cleaned-URL output box |
| `--maxw` | `1100px` | Content column width, applied through `.wrap` |
| `--font` | System sans stack (see Typography) | All UI text |
| `--mono` | System mono stack (see Typography) | Code, editor input, URL output |

### Colors not tokenized

| Value | Context |
|-------|---------|
| `linear-gradient(135deg, var(--accent), #a05bff)` | Brand logo mark |
| `linear-gradient(120deg, var(--accent), #b15bff 70%)` | Hero `<h1>` clipped gradient text |
| `color-mix(in srgb, var(--bg) 82%, transparent)` | Topbar frosted glass background |
| `color-mix(in srgb, var(--danger) 14%, transparent)` | Removed-param chip background |
| `color-mix(in srgb, var(--danger) 30%, transparent)` | Removed-param chip border |
| `#fff` | Text on `.btn.primary` and on the logo mark, in both themes |
| `#5b5bf0` | Favicon data URI background on all four pages, hardcoded in the `<link rel="icon">` SVG, equal to the light-theme `--accent` |

The favicon hex is the one place a token value is duplicated as a literal. It cannot
reference a custom property because it lives inside a data URI in `<head>`. If
`--accent` changes, the favicon in all four HTML files must be changed by hand.

---

## Typography

### Font stacks

**UI font (`--font`):**

```
-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
sans-serif, "Apple Color Emoji", "Segoe UI Emoji"
```

System font stack. No web fonts are loaded, so there is no flash of unstyled text and
no external request.

**Monospace font (`--mono`):**

```
"SF Mono", "JetBrains Mono", "Cascadia Code", ui-monospace, Menlo, Consolas, monospace
```

Used for code in the Markdown preview, the Markdown editor input pane, the cleaned URL
output box, the parameter chips, and the inline-code toolbar button glyph.

### Type scale

| Role | Element | Size | Weight | Line height | Letter spacing | Notes |
|------|---------|------|--------|-------------|----------------|-------|
| Hero H1 | `.hero h1` | `clamp(2.1rem, 5vw, 3.3rem)` | 700 (browser default) | 1.08 | `-.035em` | Fluid, capped at 3.3rem, `max-width: 16ch` |
| Page H1 | `.page-head h1` | `1.9rem` | 700 (default) | inherited 1.6 | `-.025em` | Tool page titles |
| Card H3 | `.tool-card h3` | `1.12rem` | 700 (default) | inherited | `-.02em` | Tool grid cards |
| Body | `body` | `1rem` (16px) | 400 | 1.6 | 0 | Base for the whole document |
| Body large | `.hero p` | `1.12rem` | 400 | 1.6 | 0 | Hero subtext, `max-width: 56ch` |
| Body soft | `.page-head p` | `1rem` | 400 | 1.6 | 0 | Color `--text-soft`, `max-width: 65ch` |
| Card body | `.tool-card p` | `0.92rem` | 400 | 1.6 | 0 | Color `--text-soft` |
| Label | `label.lbl` | `0.82rem` | 600 | default | `.01em` | Block-level, above the field |
| Section label | `.section-label` | `0.82rem` | 700 | default | `.06em` | Uppercase, `--text-faint` |
| Pane header | `.md-pane .pane-head` | `0.78rem` | 700 | default | `.05em` | Uppercase, `--text-faint` |
| Nav link | `.nav-link` | `0.92rem` | 500 | default | 0 | Topbar links |
| Button | `.btn` | `0.92rem` | 600 | default | 0 | |
| Button small | `.btn.sm` | `0.85rem` | 600 | default | 0 | |
| Toolbar button | `.md-tool` | `0.85rem` | 600 | default | 0 | Borderless, transparent |
| Breadcrumb | `.page-head .crumb` | `0.85rem` | 400 | default | 0 | Color `--text-faint` |
| Hero eyebrow | `.hero .eyebrow` | `0.8rem` | 600 | default | `.04em` | Uppercase pill |
| Hero badges | `.hero-badges` | `0.9rem` | 500 | default | 0 | Color `--text-soft` |
| Brand | `.brand` | `1.05rem` | 700 | default | `-.02em` | Logo glyph is 800 at `0.95rem` |
| Toast | `.toast` | `0.9rem` | 600 | default | 0 | |
| Footer | `.footer` | `0.87rem` | 400 | default | 0 | |
| Field | `.field` | `0.95rem` | 400 | 1.55 on textarea | 0 | |
| Cleaned URL | `.lc-out` | `0.92rem` | 400 | default | 0 | Monospace, `word-break: break-all` |
| Chip | `.chip` | `0.8rem` | 400 | default | 0 | Monospace |
| Stat line | `.stat-line` | `0.88rem` | 400 | default | 0 | `<b>` inside promotes to `--text` |
| Favicon size label | `.fav-item .sz` | `0.95rem` | 700 | default | 0 | |
| Favicon format label | `.fav-item .src` | `0.76rem` | 400 | default | 0 | `--text-faint` |
| Code (inline) | `.md-body code` | `0.88em` (relative) | 400 | default | 0 | Monospace |
| Code (block) | `.md-body pre code` | `0.85em` (relative) | 400 | default | 0 | Monospace |
| Markdown input | `#md-input` | `0.9rem` | 400 | 1.6 | 0 | Monospace |
| Ext tag | `.ext-tag` | `0.62rem` | 700 | default | `.06em` | Uppercase pill badge |

Weights marked "default" are not set in the project's CSS; they come from the browser
stylesheet for that element. Heading weights are therefore 700 in every mainstream
browser but are not pinned by this project.

### Markdown rendered typography

Inside `.md-body`, heading sizes are relative (`em`) so the rendered document can be
embedded at any scale:

| Level | Size | Notes |
|-------|------|-------|
| H1 | `1.8em` | Bottom border, `padding-bottom: .3em` |
| H2 | `1.45em` | Bottom border, `padding-bottom: .3em` |
| H3 | `1.2em` | No border |
| H4 to H6 | Inherited default | No border |

All headings share `margin: 1.5em 0 .6em`, `line-height: 1.25`, and
`letter-spacing: -.02em`. The first child of `.md-body` has its top margin removed so
the preview pane does not open with dead space. Links inside `.md-body` are underlined,
unlike links elsewhere on the site, which underline only on hover.

---

## Spacing system

**There is no formal spacing scale in the code.** Values are written inline at each
call site. The convention that emerges is a 2px base with a strong preference for
multiples of 4 and 8; the odd values (7px, 9px, 11px) are optical adjustments and are
not part of a system.

| Value | Usage example |
|-------|---------------|
| 4px | Chip vertical padding, toolbar group padding |
| 6px | Button icon gap, markdown checkbox margin, favicon thumb radius |
| 7px | Table cell vertical padding, `.md-tool` radius, label bottom margin |
| 8px | Grid gaps, logo radius, toolbar gap, chip gap |
| 9px | Pane header vertical padding, `--radius-sm` |
| 10px | Brand logo gap, hero badge row gap, `.icon-btn` radius, toast radius |
| 11px | Toast vertical padding, field vertical padding |
| 12px | Favicon thumb margin, tool icon radius, result button spacing |
| 14px | Field horizontal padding, footer gap, toolbar margin, `--radius` |
| 16px | Topbar element gap, tool card icon margin, editor split gap, favicon grid gap |
| 18px | Button horizontal padding, editor input padding, hero eyebrow margin |
| 22px | `.wrap` horizontal padding, editor preview vertical padding |
| 24px | Tool card padding, editor preview horizontal padding, toast bottom offset |
| 26px | Page-head bottom margin, hero badge top margin, favicon grid top margin |
| 30px | Footer vertical padding |
| 34px | Page top padding |
| 62px | Topbar height |
| 64px | Hero top padding |

Inline `style` attributes in `index.html` add a further set of one-off values: the
about section uses `padding: 60px 0` on the `<section>` and `padding: 30px 32px` on the
card, with `max-width: 760px; margin: 0 auto`. These are load-bearing layout and are
documented here for that reason, but new work should prefer a class in `style.css` over
an inline style.

**Max content width:** `--maxw: 1100px`, applied through `.wrap`, which also supplies
`padding: 0 22px`.

**Border radii in use:**

| Radius | Applied to |
|--------|-----------|
| `--radius` (14px) | `.card`, `.tool-card`, `.md-pane`, `.fav-item` |
| `--radius-sm` (9px) | `.btn`, `.field`, `.lc-out` |
| 5px | Inline code in the Markdown preview |
| 6px | Favicon thumbnails |
| 7px | `.md-tool` |
| 8px | Brand logo mark, Markdown preview images |
| 10px | `.icon-btn`, `.md-toolbar .grp`, `.toast`, `.md-body pre` |
| 12px | `.tool-card .ticon` |
| 999px | `.hero .eyebrow`, `.chip`, `.ext-tag` (fully rounded) |

---

## Breakpoints

There are exactly two responsive breakpoints, both written as `max-width` media
queries. Neither is declared as a variable; both are literal pixel values in
`css/style.css`.

### 760px and below (mobile and narrow tablet)

```css
@media (max-width: 760px) { ... }
```

Changes:

- `.md-split` switches from two columns (`1fr 1fr`) to a single column
- `.md-split` drops `min-height: 540px` to `min-height: 0`
- `#md-input` gains `min-height: 280px` so the editor stays usable when stacked
- `.md-preview` gains `min-height: 280px`
- `.nav-link.hide-sm` is set to `display: none`, removing all four topbar text links
  (Azqato, Projects, Tools, Support). The brand link and the theme toggle remain.

The tool grid (`.tools-grid`) is always `repeat(auto-fill, minmax(290px, 1fr))` and
reflows on its own without a breakpoint. The same is true of `.fav-grid`
(`minmax(150px, 1fr)`).

> **Known gap.** Because all four nav links carry `.hide-sm`, there is no mobile
> navigation of any kind. On a tool page below 760px a visitor can reach only the
> landing page, through the brand link or the footer Home link. Projects and Support
> are unreachable. This appears to be a deliberate simplification rather than an
> oversight, but it should be a conscious decision rather than an inherited one.

### 560px and below (small mobile)

```css
@media (max-width: 560px) { ... }
```

Changes:

- `.input-row`, used only by the Favicon Downloader form, switches from a flex row to a
  flex column, stacking the domain input above the submit button.

This query is written next to the Favicon Downloader section of the stylesheet rather
than grouped with the 760px block at the bottom of the file. That placement is
intentional: the stylesheet is organised by component, and this query belongs to the
component it modifies.

---

## Component patterns

### Page scaffold

Every page follows the same skeleton. New tools must match it exactly:

```html
<html lang="en" data-theme="light">
  <head>  charset, viewport, title, description, inline SVG favicon, style.css  </head>
  <body>
    <header class="topbar"><div class="wrap"> brand, spacer, nav links, theme toggle </div></header>
    <main class="page wrap">
      <div class="page-head"> crumb, h1, description </div>
      ... tool content ...
    </main>
    <footer class="footer"><div class="wrap"> ... </div></footer>
    <script src="js/common.js"></script>
    ... tool script(s) ...
  </body>
</html>
```

`index.html` differs in one respect: its `<main>` has no `.page` class and instead
contains several `<section class="wrap">` blocks (hero, tools, about).

### Topbar

- Sticky, `z-index: 50`, `62px` tall
- Frosted glass: `backdrop-filter: saturate(160%) blur(12px)` with a `-webkit-`
  duplicate, over a `color-mix` semi-transparent background
- Bottom border in `--border`
- Contents in order: brand (logo mark plus wordmark), `.spacer`, four nav links, theme
  toggle icon button
- Nav links, identical on all four pages: Azqato (`https://azqato.com/`), Projects
  (`https://azqato.com/projects`), Tools (`https://azqato.github.io/tools/`), Support
  (`https://azqato.github.io/support.html`)
- The Tools link points at the deployed site rather than at the relative `index.html`,
  so opened from a local file it leaves the local origin. That is intentional: the four
  links are one shared site-wide navigation block reused across Azqato properties, and
  changing one of them to a relative path here would break that symmetry.
- All four carry `.hide-sm` and disappear below 760px
- The theme toggle is selected by the `data-theme-toggle` attribute, not by class.
  `common.js` binds one delegated click listener on `document`, so the button works on
  any page that loads `common.js` with no further wiring.

### Brand and logo

- 30x30px rounded square, `border-radius: 8px`
- `linear-gradient(135deg, var(--accent), #a05bff)`
- Letter "A" in white at `font-weight: 800`, `font-size: .95rem`
- Wordmark: `font-weight: 700`, `letter-spacing: -.02em`, `font-size: 1.05rem`, colored
  `--text` rather than `--accent`
- Written as `Azqato's&nbsp;Tools` so the name never wraps mid-phrase

### Buttons

Four classes, composed rather than exclusive:

| Class | Background | Border | Text | Use |
|-------|-----------|--------|------|-----|
| `.btn` | `--bg-elev` | `--border` | `--text` | Default secondary action |
| `.btn.primary` | `--accent` | `--accent` | `#fff` | The one main action on a page |
| `.btn.ghost` | `transparent` | `--border` | `--text` | Tertiary, lowest emphasis |
| `.btn.sm` | inherited | inherited | inherited | Size modifier, combines with the above |

- Base padding `10px 18px`; `.sm` reduces to `7px 12px`
- Active state: `transform: translateY(1px)`, a subtle press
- Disabled: `opacity: .5`, `cursor: not-allowed`
- Hover on default and ghost: border advances to `--border-strong`
- Hover on primary: background and border advance to `--accent-hover`
- `text-decoration: none` is forced on hover so a `.btn` on an `<a>` does not underline
- `white-space: nowrap`, so button labels never wrap
- Icons inside a button are sized 16px square by the `.btn svg` rule

`.md-tool` is a separate, borderless button used only in the Markdown toolbar:
transparent background, `--text-soft` text, 7px radius, hovering to `--bg-elev` and
`--text`.

### Cards

`.card` is the generic surface, used once (the about box on `index.html`): `--bg-elev`
background, 1px `--border`, `--radius`, `--shadow-sm`.

`.tool-card` extends the same idea for the landing grid and adds:

- `display: flex; flex-direction: column`, with `.tool-card p` set to `flex: 1` so the
  "Open tool" row is bottom-aligned regardless of description length
- `padding: 24px`
- Hover: `translateY(-3px)`, border to `--border-strong`, shadow to `--shadow`, over
  `0.18s ease`
- `.ticon`: 46x46px, `border-radius: 12px`, `--accent-soft` background, `--accent` icon
  at 24px square
- `.go`: the bottom action row, `--accent`, weight 600, gap animating 6px to 10px on
  card hover
- Internal tools use a right-arrow glyph (`M5 12h14M13 6l6 6-6 6`); external tools use a
  diagonal arrow (`M7 17 17 7M7 7h10v10`) and open with `target="_blank" rel="noopener"`
- `.ext-tag`: uppercase pill inside the `<h3>`, `0.62rem`, `--text-faint` on
  `--bg-inset` with a `--border` outline

Every tool card is an `<a>` wrapping the whole card, not a `<div>` with a nested link.
The entire card is therefore one focusable, clickable target.

### Form fields

`.field` styles both `<input>` and `<textarea>`:

- Full width, `--bg-elev` background, 1px `--border-strong` border, `--radius-sm`
- Padding `11px 14px`, `font-size: .95rem`, inherits `--font`
- Focus: border to `--accent` plus a 3px `--accent-soft` ring via `box-shadow`, with the
  native `outline` removed
- `textarea.field` restricts resizing to `vertical` and sets `line-height: 1.55`

`label.lbl` is a block-level label placed above the field: `0.82rem`, weight 600,
`--text-soft`, `margin-bottom: 7px`.

> **Discrepancy (open).** An earlier version of this document stated that "form inputs
> have associated `<label>` elements". Reading the pages, that is true for one field and
> false for three:
>
> - `link-cleaner.html` `#lc-input` has `<label class="lbl" for="lc-input">`. Correct.
> - `link-cleaner.html` has a second `<label class="lbl">Cleaned URL</label>` with no
>   `for` and no wrapped control. It labels a `<div>`, so it is decorative markup that
>   happens to use a label element.
> - `favicon-downloader.html` `#fav-input` has a `placeholder` and no label at all.
> - `markdown-preview.html` `#md-input` has a `placeholder` and no label at all.
>
> The code is the truth about what is; the document was stating the intent. The rule to
> follow going forward is the documented one (every field gets a label). The three
> unlabelled fields are recorded as accessibility gaps below rather than the rule being
> relaxed to match them.

### Toast notifications

A global singleton created lazily by `common.js` on first use, appended to `<body>` and
reused thereafter. Bottom-center, 24px from the bottom edge:

- Enters by animating `opacity` 0 to 1 and `translateY(20px)` to `0`
- Inverted colors: `background: var(--text)`, `color: var(--bg)`
- `z-index: 100`, above the topbar's 50
- `pointer-events: none`, so it can never intercept a click
- Auto-dismisses after 1900ms. Re-triggering clears the timer, forces a reflow
  (`void toastEl.offsetWidth`) and re-animates from the start

Toast is the only feedback channel in the project. There is no inline error text, no
modal, and no banner component. Validation failures, clipboard failures, and success
confirmations all speak through it. A new tool should not invent a second feedback
pattern without a reason recorded in `PATCHNOTES.md`.

> **Known gap.** The toast is not an ARIA live region, so screen readers do not announce
> it. Since it is the only feedback mechanism, a screen reader user gets no confirmation
> that a copy or a download succeeded. Adding `role="status"` where the element is
> created in `common.js` would fix this in one line.

### Empty state

`.empty` is the placeholder shown in the Favicon Downloader results area before a
search: centered, `60px 20px` padding, `--text-faint` text, a 46px icon at 50% opacity
above one line of instruction. It is replaced wholesale by `results.innerHTML = ""` on
the first successful search and never returns for the rest of the session.

### Markdown editor panes

`.md-split` is a 50/50 two-column grid with a 16px gap and a 540px minimum height. Each
`.md-pane` is a flex column with `overflow: hidden` so the children clip to the rounded
corner:

- `.pane-head`: `--bg-inset` strip, uppercase `0.78rem` label, bottom border. The left
  pane header also carries a live character count on the right.
- Editor: a bare `<textarea>` with `border: none`, `resize: none`, transparent
  background, monospace, and no focus outline. The pane border is the frame.
- Preview: a scrollable `<div class="md-preview">` wrapping `<div class="md-body">`

`.md-toolbar` is a flex row: a grouped cluster (`.grp`, inset background, 10px radius)
holding the seven formatting buttons, then a `.spacer`, then four action buttons (Load
sample, Clear, Copy HTML, Download .md, the last being `.primary`).

### Favicon result grid

`.fav-grid`: `repeat(auto-fill, minmax(150px, 1fr))` with a 16px gap. Each `.fav-item`
is a centered `--bg-elev` card at `--radius` with:

- A fixed 84px-tall `.thumb` box using `display: grid; place-items: center` so icons of
  every size sit on a common baseline
- `image-rendering: -webkit-optimize-contrast` on the image, which sharpens upscaled
  small icons in Chromium and Safari and is ignored elsewhere
- `.sz` (dimensions, weight 700) and `.src` (format, faint) labels
- A full-width `.btn.sm.primary` Download and a full-width `.btn.sm.ghost` Copy link,
  stacked with a 6px gap
- On image load failure the thumb is replaced with faint "n/a" text rather than a broken
  image icon

### Chips

`.chip` marks a removed tracking parameter: monospace `0.8rem`, fully rounded, a 14%
danger tint background with a 30% danger border, in `--danger` text. Each carries a
`title` attribute containing `key = value`, so the removed value is inspectable on
hover.

`.chip.kept` marks a preserved parameter: `--bg-inset` background, `--text-soft` text,
`--border` outline. The " (kept)" suffix is added by the JavaScript, not by CSS.

### Cleaned URL output

`.lc-out` is the monospace result box: `--bg-inset` background, 1px `--border`,
`--radius-sm`, `14px 16px` padding, `word-break: break-all` so long URLs wrap instead of
overflowing. Its container `.lc-result` is `display: none` until the JavaScript adds
`.show`, which flips it to `display: block`. There is no enter animation.

`.stat-line` beneath it summarises counts, with `<b>` elements promoted from
`--text-soft` to `--text` to make the numbers stand out without a color change.

### Footers

There are two footer variants and they are not interchangeable.

**Landing page footer** (`index.html`): copyright with a JS-injected year, spacer, then
four links mirroring the topbar (Azqato, Projects, Tools, Support).

**Tool page footer** (all three tool pages): copyright with a JS-injected year, spacer,
a "Home" link back to `index.html`, and a faint one-line reassurance specific to the
tool:

- Markdown Editor: "Runs 100% in your browser"
- Favicon Downloader: "Icons via Google's public favicon service"
- Link Cleaner: "Your links never leave your device"

The reassurance line is a deliberate pattern: each tool states in its own footer where
its data goes. The Favicon Downloader is the only one that names an external service,
because it is the only tool that contacts one. A new tool must carry a line of this
kind, and it must be true.

The year element differs between the two variants: `index.html` uses `id="year"` with a
one-line inline script, while the tool pages use `class="year"` with a
`querySelectorAll` loop at the end of their page script. Both produce the same result.
New tool pages should follow the `class="year"` form, which is dominant three files to
one.

---

## Accessibility standards

**Target:** WCAG 2.1 AA.

### Contrast

| Pair | Values | Assessment |
|------|--------|-----------|
| `--text` on `--bg` (light) | `#161a20` on `#f6f7f9` | Passes AA and AAA comfortably |
| `--text-soft` on `--bg` (light) | `#4a5260` on `#f6f7f9` | Passes AA for body text |
| `--text-faint` on `--bg` (light) | `#8a93a2` on `#f6f7f9` | Marginal. Used only for metadata, breadcrumbs, and labels, never for content a user must read to finish a task. Not measured. |
| `--accent` on `--bg-elev` (light) | `#5b5bf0` on `#ffffff` | Passes AA for normal text |
| `#fff` on `--accent` (light) | `#ffffff` on `#5b5bf0` | Passes AA for the primary button |
| Dark theme equivalents | see palette above | Calibrated by eye against the light-theme relationships, not measured |

> **Uncertain.** No contrast audit has been run against these values with a tool. The
> assessments above are the document's stated intent plus arithmetic on the obvious
> pairs, not measured results. `--text-faint` in dark mode (`#6c7686` on `#0e1014`) and
> the `.ext-tag` label are the two most likely to fall below 4.5:1 and should be
> measured before any public claim of AA compliance is made.

### Keyboard and focus

- Every interactive element is a native `<button>`, `<a>`, `<input>`, or `<textarea>`.
  There are no div-based controls anywhere in the project, so tab order and activation
  behaviour come free from the browser.
- Tab order follows DOM order on all four pages, which matches visual order.
- `.field:focus` removes the native outline and substitutes a 3px `--accent-soft` ring.
  A color-only ring is a weaker indicator than the outline it replaces.
- Buttons and links do **not** suppress the native focus ring. Only `.field` and
  `#md-input` do, and `#md-input:focus { outline: none }` supplies no replacement at
  all, relying on the caret and the pane border.
- The theme toggle carries `aria-label="Toggle theme"`. It is the only ARIA attribute in
  the project.
- The Link Cleaner supports Ctrl+Enter (or Cmd+Enter) in its textarea as a shortcut for
  the Clean button. It is the only keyboard shortcut in the project and it is not
  announced anywhere in the UI.

### Semantics

- `<header>`, `<main>`, `<footer>`, and `<section>` are used correctly on every page
- Exactly one `<h1>` per page
- The Favicon Downloader search is a real `<form>` with a `submit` handler, so Enter
  works without extra wiring
- Favicon `<img>` elements get a generated `alt` of the form "example.com favicon 32px"
- Rendered Markdown images carry whatever alt text the author wrote; the parser escapes
  and passes it through
- Task list checkboxes in the preview are rendered `disabled`, which is correct: they
  represent source text rather than state a user can change

### Known gaps

Recorded here rather than in a backlog so that anyone reading this file sees them before
adding to the pile:

1. No skip-to-main-content link on any page.
2. No ARIA live region on the Markdown preview pane, so screen readers do not announce
   the rendered output as it updates.
3. No `role="status"` on the toast, so no feedback message is announced.
4. `#fav-input` and `#md-input` have no `<label>`, only a `placeholder`.
5. The "Cleaned URL" label in `link-cleaner.html` is a `<label>` with no `for` target.
6. `#md-input:focus` removes the outline without providing a replacement indicator.
7. `prefers-reduced-motion` is not handled anywhere in the CSS, and
   `html { scroll-behavior: smooth }` is applied unconditionally.
8. Below 760px there is no navigation on tool pages except the brand link and the footer
   Home link.

---

## Animation and motion

**Principle:** motion is functional, not decorative. Every transition communicates a
state change, and nothing moves without user input.

| Element | Property | Duration | Easing | Purpose |
|---------|----------|----------|--------|---------|
| `.btn` | all (`transition: .15s ease`) | 150ms | ease | Hover and press feedback |
| `.icon-btn` | all | 150ms | ease | Hover feedback |
| `.field` | all | 150ms | ease | Focus ring appearance |
| `.tool-card` | all | 180ms | ease | Hover lift, border, shadow |
| `.tool-card .go svg` | all | 150ms | ease | Arrow nudge on card hover |
| `.md-tool` | all | 120ms | ease | Toolbar hover, the fastest in the system |
| `.toast` | all | 250ms | ease | Slide-up enter, fade-out exit |
| `.nav-link` | none | instant | n/a | Color change only, no transition declared |
| `html` | `scroll-behavior: smooth` | browser default | n/a | In-page anchor scrolling |

Every transition in the stylesheet is declared with the `all` shorthand rather than by
naming properties. That is the dominant form, seven of seven, and new work should match
it, though naming the properties would be marginally cheaper to composite.

**Rules:**

- No animation fires on page load or without a user gesture.
- Nothing loops. There are no ambient or attention-seeking animations.
- Every duration is 250ms or less.
- The only `transform` values in the system are the `.tool-card` hover lift, the 1px
  button press, and the toast's slide. Nothing else moves in space.

> **Known gap (repeated from Accessibility).** `prefers-reduced-motion: reduce` is not
> honoured. The correct fix is one block that zeroes `transition-duration`,
> `animation-duration`, and `scroll-behavior` under that query. It is on the v0.3.0
> roadmap in `PRD.md`.

---

## Notes for anyone, human or model, adding to this system

- **Never introduce a CSS framework.** All styles live in `css/style.css` using the
  token system above. The file is organised by banner comment into: tokens, reset and
  base, topbar, buttons, generic surfaces, page scaffold, toast, footer, landing page,
  then one section per tool, then the shared 760px media query last. Add new tool styles
  as a new banner-commented section before that final media query.
- **Never add a JS library or npm dependency.** All logic is vanilla ES5-style
  JavaScript. Modern browser APIs (`URL`, `Blob`, `fetch`, `navigator.clipboard`,
  `localStorage`, `matchMedia`) are fine because they ship with the browser.
- **Extend the token system rather than hardcoding a value.** A new color must be added
  to both `:root` and `[data-theme="dark"]` in the same change, or dark mode silently
  inherits the light value.
- **Follow the page scaffold exactly.** Topbar, `.page.wrap`, `.page-head` (breadcrumb,
  h1, description), tool content, footer, then `js/common.js`, then tool scripts.
- **Tool naming convention:** names must be generic and searchable ("Markdown Editor",
  "Favicon Downloader"). Never use another product's brand name as a tool name, even
  when it reads as a generic description. See the tenet in `PRD.md`. This rule exists
  because the Markdown Editor originally shipped under a competing product's brand name
  and had to be renamed in v0.1.1.
- **External tools** are linked from the landing page only. They get
  `target="_blank" rel="noopener"`, the diagonal arrow icon, and an `.ext-tag` pill.
  They never get a page in this repo.
- **Dark mode** is `data-theme="dark"` on `<html>`. `common.js` owns the `azqato-theme`
  localStorage key and reads `prefers-color-scheme` only when that key is absent.
- **Theme is applied before first paint in practice but not by construction.**
  `common.js` reads localStorage synchronously, but it is loaded at the end of `<body>`,
  after the markup has parsed. Every page hardcodes `data-theme="light"` on `<html>`, so
  a dark-mode user can see a light flash on a slow load. Moving the theme read into an
  inline `<script>` in `<head>` is the correct fix and is recorded as technical debt in
  `PRD.md`.
- **Prose in this file and in UI copy follows the project writing style** recorded in
  `PRD.md`: no em dashes in any form, plain declarative sentences, no marketing
  language.
