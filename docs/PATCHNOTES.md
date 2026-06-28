# Patch Notes — Azqato's Tools

All changes are logged here in reverse chronological order (newest first).
Format: semantic versioning (`MAJOR.MINOR.PATCH`), date `YYYY-MM-DD`, sections: Added / Changed / Fixed / Removed.

---

## v0.1.5 — 2026-06-27

### Changed
- Replaced topbar navigation on all four pages (`index.html`, `markdown-preview.html`, `favicon-downloader.html`, `link-cleaner.html`) with four site-wide links: Azqato, Projects, Tools, Support
- Fixed stale `../index.html#tools` path in tool-page nav links left over from the `/tools/` directory move
- Updated `docs/DESIGN.md` topbar section to document the new nav structure and link destinations

---

## v0.1.4 — 2026-06-27

### Changed
- Site deployed to production: https://azqato.github.io/tools/
- Updated `README.md` live site link from TBD to production URL
- Updated `docs/PRD.md`: press release call-to-action URL, v1.0.0 roadmap milestone marked Complete, v0.2.0 deployment note marked complete, referral traffic metric set to Ongoing

---

## v0.1.3 — 2026-06-27

### Changed
- Moved `markdown-preview.html`, `favicon-downloader.html`, and `link-cleaner.html` from `/tools/` subdirectory to project root
- Removed the now-empty `/tools/` directory
- Updated all internal asset paths in the three tool pages (`../css/` → `css/`, `../js/` → `js/`, `../index.html` → `index.html`)
- Updated tool card `href` links in `index.html` to point to root-level files
- Updated folder structure references in `README.md`, `docs/PRD.md`, and `docs/PATCHNOTES.md`

---

## v0.1.2 — 2026-06-27

### Added
- Created `/docs` folder and full documentation suite: `PRD.md`, `DESIGN.md`, `PATCHNOTES.md`
- Created `README.md` at project root with developer-focused setup instructions, tech stack, folder structure, and links to `/docs`
- `PRD.md` covers: problem statement, target users, goals, non-goals, user stories, feature list (MVP + Future), constraints, assumptions, success criteria, tenets, roadmap, metrics, runbook, technical requirements, security, press release, and FAQ
- `DESIGN.md` covers: design philosophy, full color token table for both light and dark themes, typography scale, spacing system, all responsive breakpoints, component patterns for every UI element, accessibility standards, animation rules, and AI contributor guidance
- `PATCHNOTES.md` created as the versioned changelog starting from v0.1.0

### Changed
- Nothing in the site source changed in this version — documentation only

---

## v0.1.1 — 2026-06-27

### Added
- Three external tool cards added to the landing page tool grid: Nasdaq 100 Screener, Net Worth Tracker, VIX Strategy
- `.ext-tag` CSS component: small all-caps pill badge (`external`) displayed inside the `<h3>` of external tool cards
- External tool cards use a diagonal arrow icon (↗) instead of the right arrow (→) to indicate they open in a new tab

### Changed
- Markdown Editor renamed from "Markdown Live Preview" (which was the brand name of a competing tool at markdownlivepreview.com) to "Markdown Editor" (generic, searchable)
- All references to "Markdown Live Preview" updated across `index.html`, `markdown-preview.html`, `css/style.css`
- Brand name updated from "Azqato Tools" to "Azqato's Tools" across all files (index.html, all three tool pages, style.css)
- Markdown Editor: sample document updated to reflect new name ("Welcome to the Markdown Editor")
- External tool cards open in `target="_blank"` with `rel="noopener"`

---

## v0.1.0 — 2026-06-27

### Added
- Project initialized from scratch — no prior codebase
- `index.html` — landing page with sticky topbar, hero section (eyebrow, gradient heading, badge row), tool grid, about section, footer
- `css/style.css` — full shared design system: CSS custom properties for light and dark themes, reset, layout primitives (`.wrap`, `.topbar`, `.page`, `.page-head`), button variants (`.btn`, `.btn.primary`, `.btn.ghost`, `.btn.sm`), card surfaces (`.card`, `.tool-card`, `.fav-item`), form fields (`.field`, `label.lbl`), toast notification, section label, Markdown editor layout (`.md-split`, `.md-pane`, `.md-toolbar`, `.md-body`), Favicon Downloader grid (`.fav-grid`, `.fav-item`), Link Cleaner result (`.lc-result`, `.lc-out`, `.chip`), footer, responsive breakpoints at 760px and 560px
- `js/common.js` — theme toggle (reads/writes `localStorage` key `azqato-theme`, respects `prefers-color-scheme` on first visit), global `toast()` function, global `copyText()` with Clipboard API + `execCommand` fallback
- `js/markdown.js` — self-contained Markdown → HTML parser with zero dependencies. Supports: ATX headings H1–H6, bold/italic/bold+italic (`*`/`_`/`***`), strikethrough (`~~`), inline code (`` ` `` with null-char sentinel), fenced code blocks (` ``` ` with optional language class), links, images, blockquotes (recursive), unordered lists, ordered lists, task lists (`[ ]`/`[x]`), horizontal rules, GFM tables (with column alignment), paragraphs. HTML-escapes all input; whitelists link protocols to `https?:`, `mailto:`, `#`, `/`, `.`
- `js/linkcleaner.js` — URL tracking-parameter stripper. Removes ~40+ params by exact name and 11 prefix patterns. Returns `{ valid, clean, removed, kept }` via `window.cleanUrl()`
- `markdown-preview.html` — Markdown Editor tool page: split-pane layout, formatting toolbar (Bold, Italic, Code, Heading, List, Quote, Link), Load Sample / Clear / Copy HTML / Download .md actions, character count, `localStorage` draft autosave, sample document
- `favicon-downloader.html` — Favicon Downloader tool page: domain input form, fetches favicons at 16/32/48/64/128/256px via Google gstatic service, download PNG (CORS fetch + Blob URL, falls back to new tab), copy direct link
- `link-cleaner.html` — Link Cleaner tool page: URL textarea input, Clean / Paste from clipboard / Try an example actions, cleaned URL display, copy + open buttons, removed-param chips (red), kept-param chips (neutral), stat line showing count of removed vs. kept params, Ctrl+Enter keyboard shortcut
- Three hosted tool cards on landing page: Markdown Editor, Favicon Downloader, Link Cleaner
- SVG inline favicons (data URI) on all pages — no external favicon file needed
- Dynamic copyright year via `new Date().getFullYear()` in all footers
- `initialconcept.txt` — original project brief (reference document, not part of the site)
