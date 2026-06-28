# Design System — Azqato's Tools

## Design philosophy

The visual direction is minimal, functional, and typographically tight. Every UI decision defers to clarity: tools should feel invisible so users focus on their task, not the chrome around it. The aesthetic is modern but not trendy — no gradients on content, no decorative animations, no visual noise. Dark mode is a first-class feature, not an afterthought.

---

## Color palette

All colors are declared as CSS custom properties on `:root` (light) and `[data-theme="dark"]`. Never use raw hex values in component CSS — always reference the token.

### Light theme (default)

| Token | Hex | Use |
|-------|-----|-----|
| `--bg` | `#f6f7f9` | Page background |
| `--bg-elev` | `#ffffff` | Elevated surfaces: cards, inputs, topbar |
| `--bg-inset` | `#eef0f3` | Inset surfaces: toolbar groups, code blocks, table headers |
| `--border` | `#e2e5ea` | Default border on cards and containers |
| `--border-strong` | `#cfd4dc` | Hover borders, focused input borders |
| `--text` | `#161a20` | Primary text, headings |
| `--text-soft` | `#4a5260` | Secondary text, descriptions, labels |
| `--text-faint` | `#8a93a2` | Placeholder, metadata, disabled states |
| `--accent` | `#5b5bf0` | Interactive: links, primary buttons, focus rings |
| `--accent-hover` | `#4a4ad6` | Hovered primary buttons |
| `--accent-soft` | `#ecedff` | Tool icon backgrounds, focus ring fill, eyebrow pills |
| `--success` | `#1f9d57` | Checkmarks, success badges |
| `--danger` | `#d83a52` | Removed tracking-param chips, error states |
| `--shadow` | `0 1px 2px rgba(16,22,32,.06), 0 8px 24px rgba(16,22,32,.06)` | Elevated cards on hover |
| `--shadow-sm` | `0 1px 2px rgba(16,22,32,.08)` | Default card resting shadow |

### Dark theme (`[data-theme="dark"]`)

| Token | Hex | Use |
|-------|-----|-----|
| `--bg` | `#0e1014` | Page background |
| `--bg-elev` | `#171a21` | Elevated surfaces |
| `--bg-inset` | `#1f242d` | Inset surfaces |
| `--border` | `#262b34` | Default border |
| `--border-strong` | `#353c47` | Hover/focus borders |
| `--text` | `#eef1f5` | Primary text |
| `--text-soft` | `#aab2bf` | Secondary text |
| `--text-faint` | `#6c7686` | Metadata, placeholders |
| `--accent` | `#7c7cff` | Interactive elements (lighter for dark bg contrast) |
| `--accent-hover` | `#9090ff` | Hovered accent (even lighter) |
| `--accent-soft` | `#20223a` | Soft accent backgrounds |
| `--success` | `#3ec77c` | Success states |
| `--danger` | `#ff6b80` | Danger/removed states |
| `--shadow` | `0 1px 2px rgba(0,0,0,.4), 0 12px 32px rgba(0,0,0,.35)` | Elevated cards |
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,.4)` | Resting card shadow |

### Special colors (not tokenized)

| Value | Context |
|-------|---------|
| `linear-gradient(135deg, var(--accent), #a05bff)` | Brand logo mark |
| `linear-gradient(120deg, var(--accent), #b15bff 70%)` | Hero `<h1>` gradient text |
| `color-mix(in srgb, var(--bg) 82%, transparent)` | Topbar frosted glass background |
| `color-mix(in srgb, var(--danger) 14%, transparent)` | Removed-param chip background |
| `color-mix(in srgb, var(--danger) 30%, transparent)` | Removed-param chip border |

---

## Typography

### Font stacks

**UI font (`--font`):**
```
-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
sans-serif, "Apple Color Emoji", "Segoe UI Emoji"
```
System font stack — no web fonts loaded, no flash of unstyled text, no external requests.

**Monospace font (`--mono`):**
```
"SF Mono", "JetBrains Mono", "Cascadia Code", ui-monospace, Menlo, Consolas, monospace
```
Used for code editors, inline code, monospaced output (cleaned URLs), and the Markdown editor input pane.

### Type scale

| Role | Element | Size | Weight | Line height | Letter spacing | Notes |
|------|---------|------|--------|-------------|----------------|-------|
| Hero H1 | `.hero h1` | `clamp(2.1rem, 5vw, 3.3rem)` | 700 | 1.08 | `-.035em` | Fluid, caps at 3.3rem |
| Page H1 | `.page-head h1` | `1.9rem` | 700 | default | `-.025em` | Tool page titles |
| Card H3 | `.tool-card h3` | `1.12rem` | 700 | default | `-.02em` | Tool grid cards |
| Body | `body` | `1rem` (16px) | 400 | 1.6 | 0 | Base |
| Body large | `.hero p` | `1.12rem` | 400 | 1.6 | 0 | Hero subtext |
| Body soft | `.page-head p` | `1rem` | 400 | 1.6 | 0 | Color: `--text-soft` |
| Label | `label.lbl` | `0.82rem` | 600 | default | `.01em` | Form labels above inputs |
| Caption / section label | `.section-label` | `0.82rem` | 700 | default | `.06em` | All caps, `--text-faint` |
| Nav link | `.nav-link` | `0.92rem` | 500 | default | 0 | Topbar links |
| Button | `.btn` | `0.92rem` | 600 | default | 0 | |
| Button small | `.btn.sm` | `0.85rem` | 600 | default | 0 | |
| Breadcrumb | `.page-head .crumb` | `0.85rem` | 400 | default | 0 | Color: `--text-faint` |
| Toast | `.toast` | `0.9rem` | 600 | default | 0 | |
| Footer | `.footer` | `0.87rem` | 400 | default | 0 | |
| Code (inline) | `.md-body code` | `0.88em` (relative) | 400 | default | 0 | Monospace |
| Code (block) | `.md-body pre code` | `0.85em` (relative) | 400 | default | 0 | Monospace |
| Markdown input | `#md-input` | `0.9rem` | 400 | 1.6 | 0 | Monospace |
| Ext tag | `.ext-tag` | `0.62rem` | 700 | default | `.06em` | All caps pill badge |

### Markdown rendered typography

Inside `.md-body`, heading sizes are relative (`em`) to allow embedding at any scale:

| Level | Size | Notes |
|-------|------|-------|
| H1 | `1.8em` | Bottom border |
| H2 | `1.45em` | Bottom border |
| H3 | `1.2em` | No border |
| H4–H6 | Default | No border |

---

## Spacing system

Base unit: **2px** (all values are multiples of 2 or common multiples of 4/8).

No formal scale object exists in code — spacing is written inline as specific values. The practical scale in use:

| Value | Usage example |
|-------|---------------|
| 4px | Chip padding vertical, small gaps |
| 6px | Button icon gap, small margin |
| 7px | Table cell padding vertical, small button padding |
| 8px | Button icon gap, grid gap (small) |
| 9px | Pane header padding, border-radius-sm |
| 10px | Brand logo gap, hero badge gap |
| 11px | Toast padding vertical, field padding vertical |
| 12px | Favicon thumb margin, ext-tag margin |
| 14px | Field padding horizontal, topbar nav gap, breadcrumb margin |
| 16px | Topbar nav gap, tool card icon margin, md-split gap |
| 18px | Button padding horizontal, hero badge margin, field font-size |
| 22px | `.wrap` horizontal padding, hero badge margin-top |
| 24px | Tool card padding, topbar height component |
| 26px | Page-head margin-bottom, hero badge section margin |
| 30px | Footer padding, about card padding |
| 34px | Page top padding |
| 62px | Topbar height |
| 64px | Hero top padding |

**Max content width:** `--maxw: 1100px` (applied via `.wrap`).

**Border radii:**
- `--radius: 14px` — cards, tool cards, panes, fav-items, hero eyebrow
- `--radius-sm: 9px` — buttons, inputs, code blocks
- `8px` — logo mark
- `10px` — icon-btn, md-toolbar groups, toast
- `12px` — tool icon containers
- `999px` — pills, chips, ext-tag (fully rounded)

---

## Breakpoints

There are two responsive breakpoints, both written as `max-width` media queries.

### ≤ 760px (mobile / narrow tablet)

```css
@media (max-width: 760px) { ... }
```

Changes:
- `.md-split` switches from two columns (`1fr 1fr`) to single column
- `.md-split` removes `min-height: 540px`
- `#md-input` gains `min-height: 280px` to stay usable
- `.md-preview` gains `min-height: 280px`
- `.nav-link.hide-sm` is hidden (removes "All tools" / nav text links from topbar)

The tool grid (`.tools-grid`) is always `repeat(auto-fill, minmax(290px, 1fr))` — it reflows naturally without a breakpoint.

### ≤ 560px (small mobile)

```css
@media (max-width: 560px) { ... }
```

Changes:
- `.input-row` (Favicon Downloader form) switches from flex row to flex column, stacking the input and button vertically.

---

## Component patterns

### Topbar

- Sticky, `z-index: 50`
- Frosted glass: `backdrop-filter: blur(12px) saturate(160%)` + `color-mix` semi-transparent background
- Height: `62px`
- Contains: brand (logo + name), spacer, optional nav links, theme toggle icon button
- Nav links carry `.hide-sm` to collapse on mobile
- Theme toggle uses `data-theme-toggle` attribute (no class needed) — `common.js` handles the click event

### Brand / Logo

- 30×30px rounded square (`border-radius: 8px`)
- Linear gradient: `135deg, var(--accent), #a05bff`
- Letter "A" in white, `font-weight: 800`
- Brand text: `font-weight: 700`, `letter-spacing: -.02em`

### Buttons

Three variants, all share `.btn` base:

| Class | Background | Border | Text | Use |
|-------|-----------|--------|------|-----|
| `.btn` | `--bg-elev` | `--border` | `--text` | Default secondary |
| `.btn.primary` | `--accent` | `--accent` | `#fff` | Primary action |
| `.btn.ghost` | `transparent` | `--border` | `--text` | Tertiary / subtle |
| `.btn.sm` | (same) | (same) | (same) | Compact toolbar buttons |

- Active state: `translateY(1px)` — subtle press feedback
- Disabled: `opacity: 0.5`, `cursor: not-allowed`
- Hover on default: border advances to `--border-strong`
- Hover on primary: background advances to `--accent-hover`
- All transitions: `0.15s ease`

### Cards

`.card` is the generic surface (used in "About" section). Key properties:
- `background: --bg-elev`
- `border: 1px solid --border`
- `border-radius: --radius` (14px)
- `box-shadow: --shadow-sm`

Tool cards (`.tool-card`) extend this pattern and add:
- Full-width flex column layout
- `transition: 0.18s ease` on hover: `translateY(-3px)`, border advances to `--border-strong`, shadow advances to `--shadow`
- Icon container (`.ticon`): 46×46px, `border-radius: 12px`, `background: --accent-soft`, `color: --accent`
- "Go" arrow at the bottom, gap animates from 6px → 10px on card hover
- External tools use a diagonal arrow (↗) instead of the right arrow (→)
- External tools carry an `.ext-tag` pill badge: all-caps, `--text-faint`, `--bg-inset` background

### Form fields

`.field` applies to both `<input>` and `<textarea>`:
- Full width, `--bg-elev` background, `--border-strong` border
- Focus: border becomes `--accent`, focus ring: `0 0 0 3px --accent-soft`
- No default browser outline (`outline: none` on focus)
- `textarea.field`: `resize: vertical` only

`label.lbl`: always displayed as a block above the field, never inline.

### Toast notifications

Global singleton, created lazily by `common.js`. Appears at bottom-center:
- Slides up from `translateY(20px)` to `translateY(0)`, fades in
- `background: --text`, `color: --bg` (inverted)
- Auto-dismisses after 1.9 seconds
- Retriggering resets the timer and re-animates

### Markdown editor panes

`.md-split` is a two-column 50/50 grid. Each `.md-pane` is a flex column:
- Header bar (`.pane-head`): inset background, uppercase label, faint text
- Editor pane: raw `<textarea>` with monospace font, no border
- Preview pane: scrollable `<div>` with `.md-body` rendered HTML

Toolbar (`.md-toolbar`): flex row with a grouped button cluster (`.grp`) on left, spacer, action buttons on right.

### Favicon result grid

`.fav-grid`: `repeat(auto-fill, minmax(150px, 1fr))`. Each `.fav-item` is a centered card with:
- Fixed-height (84px) image container
- Size label (`font-weight: 700`)
- Download and Copy link buttons stacked vertically

### Chip tags

`.chip` (red, for removed params): `color-mix` danger tint background, danger color text.
`.chip.kept` (neutral, for kept params): `--bg-inset` background, `--text-soft` color.

---

## Accessibility standards

**Target:** WCAG 2.1 AA

**Contrast:**
- `--text` on `--bg`: `#161a20` on `#f6f7f9` — exceeds AA for normal text
- `--accent` on `--bg-elev`: `#5b5bf0` on `#ffffff` — verify at each use; at small sizes may need reinforcement
- `--text-soft` on `--bg`: checked to meet AA for body text
- Dark mode tokens are calibrated to maintain equivalent contrast ratios

**Focus management:**
- All interactive elements are keyboard-reachable in DOM order
- Native `<button>`, `<a>`, `<input>`, `<textarea>` are used throughout — no div-based interactive elements
- Focus ring: `0 0 0 3px var(--accent-soft)` on inputs; browsers provide default focus rings on buttons and links (not suppressed globally)
- Theme toggle has `aria-label="Toggle theme"`

**Semantic HTML:**
- `<header>`, `<main>`, `<footer>`, `<section>` used correctly
- `<h1>` is unique per page
- Form inputs have associated `<label>` elements (either `label.lbl` with `for` attribute, or implicit wrapping)
- Images in the Markdown preview require alt text in the source Markdown
- Favicon `<img>` elements include `alt` attributes

**Known gaps:**
- No `<skip to main content>` link
- No ARIA live region on the Markdown preview pane (screen readers won't announce live updates)
- Favicon images loaded from an external service — alt text is generated but cannot reflect actual icon content

---

## Animation and motion

**Principle:** Motion is functional, not decorative. Every transition communicates state change.

| Element | Property | Duration | Easing | Purpose |
|---------|----------|----------|--------|---------|
| `.btn` | border-color, background, transform | 150ms | ease | Hover and press feedback |
| `.tool-card` | transform, border-color, box-shadow | 180ms | ease | Hover lift |
| `.tool-card .go` | gap | 180ms (inherited) | ease | Arrow nudge on card hover |
| `.tool-card .go svg` | (gap-driven) | 150ms | ease | |
| `.icon-btn` | color, border-color | 150ms | ease | Hover feedback |
| `.nav-link` | color | (none, instant) | — | Simple color change |
| `.toast` | opacity, transform | 250ms | ease | Slide-up enter, fade-out exit |
| `.field` | border-color, box-shadow | 150ms | ease | Focus ring appearance |

**Rules:**
- No animations trigger on page load or without user interaction
- No looping or ambient animations
- All durations are ≤ 250ms — nothing feels slow
- `prefers-reduced-motion` is not currently handled in CSS; this is a known gap to address in a future release

---

## Additional notes for AI contributors

- **Never introduce a CSS framework.** All styles live in `css/style.css` using the token system above.
- **Never add a JS library or npm dependency.** All logic must be vanilla JS compatible with ES5+ (modern APIs like `URL`, `Blob`, `fetch` are acceptable as they are browser-native).
- **Extend the token system rather than hardcoding values.** If a new color is needed, add it to both `:root` and `[data-theme="dark"]`.
- **All new tools follow the same page scaffold:** topbar → `.page.wrap` → `.page-head` (breadcrumb + h1 + description) → tool content → footer. Load `../js/common.js` last.
- **Tool naming convention:** names must be generic and searchable (e.g. "Markdown Editor", "Favicon Downloader"). Never use another product's brand name as a tool name, even if it describes what the tool does. See `PRD.md` for the full tenet.
- **External tools** (hosted on separate repos/domains) are linked from the landing page with `target="_blank" rel="noopener"`, a diagonal arrow icon, and an `.ext-tag` pill. They do not get their own page in this repo.
- **Dark mode** is toggled via `data-theme="dark"` on `<html>`. `common.js` reads/writes `localStorage` key `azqato-theme` and respects `prefers-color-scheme` on first visit.
- **Theme is set before first paint:** `common.js` reads `localStorage` synchronously at the top of the IIFE, so there is no flash of wrong theme as long as `common.js` is loaded in the `<body>` before visible content (or in `<head>` — current placement is end of `<body>`, acceptable given the `data-theme="light"` default on `<html>`).
