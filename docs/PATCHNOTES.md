# Patch Notes - Azqato's Tools

All changes are logged here in reverse chronological order (newest first).
Format: semantic versioning (`MAJOR.MINOR.PATCH`), date `YYYY-MM-DD`, sections: Added / Changed / Fixed / Removed.

---

## v0.1.8 - 2026-08-25

Full documentation audit. The codebase was scanned in its entirety before any document
was opened, every document in `/docs` was read in full, and each was compared against
the code. Findings were merged into the existing text rather than overwriting it: where
the code contradicted a document, the original wording was kept and the observed
reality recorded beside it as a discrepancy for the author to resolve.

### Added
- Added a Conventions section to `docs/PRD.md` covering naming, formatting,
  organization, comment style, error handling, and commit and branching patterns, all
  derived from the code and the git history rather than from any external style guide
- Added a Writing Style section to `docs/PRD.md` prohibiting em dashes in all three
  forms (Unicode character, `&mdash;` entity, double dash as punctuation), listing the
  permitted replacements, and recording the tone rule. No writing style existed before
- Added a Browser Testing section to `docs/PRD.md` adopting Microsoft Edge as the
  browser any automated or ad hoc headless test drives, never Chrome, with the resolved
  Windows binary path verified present on the maintenance machine, plus the macOS and
  Linux equivalents
- Added a Deprecation and Removal section to `docs/PRD.md`. The project's own existing
  precedent, that a live URL is never changed even when the tool behind it is renamed,
  established when the Markdown Editor was renamed in v0.1.1 without renaming
  `markdown-preview.html`, was documented and kept in preference to the default policy.
  The section lists the public surface item by item, states that GitHub Pages offers no
  server-side redirect so a meta refresh is the only available shim, and records five
  retired items with what replaced them
- Added a Documentation Versus Reality section to `docs/PRD.md` recording seventeen
  findings, which source to trust for each, and how each was resolved
- Added a Risks and Open Questions section to `docs/PRD.md` covering what the audit did
  not verify, eight fragile areas, five things dangerous to change without context, the
  state of work in progress, and ten numbered open questions for the author
- Added a Working Practice section to `docs/PRD.md` with a table mapping each kind of
  change to the document to open first, ten never-do rules with the reason attached, the
  new-tool checklist, and an exact manual verification procedure standing in for the
  test suite the project cannot have
- Added the two unlabelled inputs, the silent clipboard failure path, the unguarded
  `localStorage` writes, the two dead Link Cleaner rules, the unwhitelisted image `src`,
  the duplicated page chrome, and the inline styles in `index.html` to the Known
  Technical Debt table in `docs/PRD.md`
- Added measured file sizes for all eight served files to the Metrics section, replacing
  the previous approximate figures
- Added `.empty`, both footer variants, `.lc-out`, `.stat-line`, and the page scaffold
  skeleton to the component patterns in `docs/DESIGN.md`, which the v0.1.2 entry had
  claimed covered every UI element
- Added a non-color token table and a favicon data URI note to `docs/DESIGN.md`,
  recording that `#5b5bf0` is duplicated as a literal in four HTML files and must be
  changed by hand if `--accent` changes
- Added eight numbered accessibility gaps to `docs/DESIGN.md`, up from three

### Changed
- Rewrote `README.md` for a general reader. It previously carried install steps, a tech
  stack table, prerequisites, ports, deploy commands, and a folder tree. All of that
  content is preserved in the `docs/PRD.md` Runbook and Technical Requirements sections
  in more detail than the README carried. The README now describes what each tool does
  in plain language, who the site is for, its status, and where to find the rest
- Expanded `docs/PRD.md` from 676 lines to roughly 1,500, adding the sections listed
  above and deepening the existing ones. Every tenet now names the tradeoff it resolves,
  every assumption now states what breaks if it is wrong, and every metric now names its
  measurement method, with the section stating plainly that nothing is currently measured
- Rewrote the API design subsection of `docs/PRD.md` from the source rather than from the
  previous description. The exact parameter list is now recorded as 48 entries as
  written, with a note that two of them (`" trk"` with a leading space and `trkCampaign`
  with capitals) can never match a key that is lowercased but not trimmed
- Corrected the deploy branch throughout `docs/PRD.md` from `main` to `master`, which is
  the repository's actual branch
- Corrected the local server instructions to use Python, and recorded that Node is not
  installed on the maintenance machine so the previously documented `npx serve` option
  would fail there. Python 3.14.3 was verified present
- Rewrote the breakpoint notes in `docs/DESIGN.md`, which described `.hide-sm` as hiding
  an "All tools" link that no longer exists, and recorded the consequence that below
  760px there is no mobile navigation on a tool page
- Reworded the design philosophy in `docs/DESIGN.md` to lift the phrase "no gradients on
  content" out of the running sentence and into a marked discrepancy, since two gradients
  exist in the code
- Rewrote the press release and the FAQ in `docs/PRD.md`. The FAQ grew from a mixed list
  to twenty-four external questions plus six internal ones, and now states the Favicon
  Downloader's data exception, the unencrypted draft storage, and the risk that a generic
  tracking rule strips a parameter a site legitimately uses
- Reformatted every version heading in `docs/PATCHNOTES.md` to use a hyphen in place of
  the em dash

### Fixed
- Removed all 119 em dashes found across the project. 102 were in the four documentation
  files (`docs/PRD.md` 52, `docs/PATCHNOTES.md` 22, `docs/DESIGN.md` 21, `README.md` 7)
  and 17 were in six source files: `index.html` 6, `link-cleaner.html` 4,
  `markdown-preview.html` 3, `favicon-downloader.html` 2, `css/style.css` 1,
  `js/linkcleaner.js` 1. Source replacements covered four page titles, the hero and about
  copy on the landing page, the Nasdaq 100 Screener and Protein Tracker card
  descriptions, four toast strings, two tool page descriptions, the Markdown sample
  document, the stylesheet header comment, and the `js/linkcleaner.js` header comment. No
  rendered behaviour changed. Every replacement was a comma, a colon, parentheses, or a
  hyphen chosen for context
- Searched for the `&mdash;` HTML entity and for the double dash used as punctuation
  independently of the Unicode character, since a search for one does not find the other.
  Neither was present anywhere in the project. CSS custom properties and HTML comments
  were correctly excluded from the double-dash search
- Corrected the claim in `docs/DESIGN.md` that "form inputs have associated `<label>`
  elements". Reading the pages, one of four does: `#lc-input` in `link-cleaner.html`.
  `#fav-input` and `#md-input` have placeholders and no label, and the "Cleaned URL"
  label has no `for` target and labels a `<div>`. The documented rule was kept and the
  three failures recorded as gaps, rather than the rule being relaxed to match the code
- Corrected the description of the Markdown code-span sentinel. It is a literal NUL byte
  embedded in `js/markdown.js`, verified by dumping the bytes, and the consequence is now
  recorded: the NUL makes `grep` report the file as binary

### Removed
- Removed nothing from the codebase and no file from `/docs`. The four required documents
  already existed in the required locations, so no consolidation, creation, or move was
  necessary. `README.md` is at the repository root and `PRD.md`, `DESIGN.md`, and
  `PATCHNOTES.md` are in `/docs`, which is the enforced structure
- Removed no historical patch note content. Entries describing renamed or deleted items
  were left exactly as written, because they record what happened at the time rather than
  the current state

### Not changed, and why
- The initial commit message contains an em dash. Git history is a historical record and
  rewriting `master` to correct punctuation would mean force-pushing the deploy branch.
  The writing style rule applies to new commits only
- `initialconcept.txt` is documented as part of the project but is untracked in git. It
  was left untracked, since committing a source file is outside the scope of a
  documentation audit. Raised as open question 1
- The two dead Link Cleaner rules, the unwhitelisted image `src`, and every other item in
  the technical debt table were documented, not fixed. This was a documentation audit,
  not a code change

---

## v0.1.7 - 2026-07-05

### Added
- Protein Tracker external tool card on the landing page, linking to `https://azqato.github.io/protein/`

---

## v0.1.6 - 2026-06-27

### Changed
- Centered the "Why these tools?" box on the landing page (`margin: 0 auto` on the card)
- Equalized vertical spacing around the about section: top and bottom padding both set to `60px`
- Footer navigation updated to mirror the topbar: Azqato, Projects, Tools, Support (with matching href destinations)
- Removed "Built with Claude Code" credit from the footer

---

## v0.1.5 - 2026-06-27

### Changed
- Replaced topbar navigation on all four pages (`index.html`, `markdown-preview.html`, `favicon-downloader.html`, `link-cleaner.html`) with four site-wide links: Azqato, Projects, Tools, Support
- Fixed stale `../index.html#tools` path in tool-page nav links left over from the `/tools/` directory move
- Updated `docs/DESIGN.md` topbar section to document the new nav structure and link destinations

---

## v0.1.4 - 2026-06-27

### Changed
- Site deployed to production: https://azqato.github.io/tools/
- Updated `README.md` live site link from TBD to production URL
- Updated `docs/PRD.md`: press release call-to-action URL, v1.0.0 roadmap milestone marked Complete, v0.2.0 deployment note marked complete, referral traffic metric set to Ongoing

---

## v0.1.3 - 2026-06-27

### Changed
- Moved `markdown-preview.html`, `favicon-downloader.html`, and `link-cleaner.html` from `/tools/` subdirectory to project root
- Removed the now-empty `/tools/` directory
- Updated all internal asset paths in the three tool pages (`../css/` → `css/`, `../js/` → `js/`, `../index.html` → `index.html`)
- Updated tool card `href` links in `index.html` to point to root-level files
- Updated folder structure references in `README.md`, `docs/PRD.md`, and `docs/PATCHNOTES.md`

---

## v0.1.2 - 2026-06-27

### Added
- Created `/docs` folder and full documentation suite: `PRD.md`, `DESIGN.md`, `PATCHNOTES.md`
- Created `README.md` at project root with developer-focused setup instructions, tech stack, folder structure, and links to `/docs`
- `PRD.md` covers: problem statement, target users, goals, non-goals, user stories, feature list (MVP + Future), constraints, assumptions, success criteria, tenets, roadmap, metrics, runbook, technical requirements, security, press release, and FAQ
- `DESIGN.md` covers: design philosophy, full color token table for both light and dark themes, typography scale, spacing system, all responsive breakpoints, component patterns for every UI element, accessibility standards, animation rules, and AI contributor guidance
- `PATCHNOTES.md` created as the versioned changelog starting from v0.1.0

### Changed
- Nothing in the site source changed in this version, documentation only

---

## v0.1.1 - 2026-06-27

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

## v0.1.0 - 2026-06-27

### Added
- Project initialized from scratch, no prior codebase
- `index.html` - landing page with sticky topbar, hero section (eyebrow, gradient heading, badge row), tool grid, about section, footer
- `css/style.css` - full shared design system: CSS custom properties for light and dark themes, reset, layout primitives (`.wrap`, `.topbar`, `.page`, `.page-head`), button variants (`.btn`, `.btn.primary`, `.btn.ghost`, `.btn.sm`), card surfaces (`.card`, `.tool-card`, `.fav-item`), form fields (`.field`, `label.lbl`), toast notification, section label, Markdown editor layout (`.md-split`, `.md-pane`, `.md-toolbar`, `.md-body`), Favicon Downloader grid (`.fav-grid`, `.fav-item`), Link Cleaner result (`.lc-result`, `.lc-out`, `.chip`), footer, responsive breakpoints at 760px and 560px
- `js/common.js` - theme toggle (reads/writes `localStorage` key `azqato-theme`, respects `prefers-color-scheme` on first visit), global `toast()` function, global `copyText()` with Clipboard API + `execCommand` fallback
- `js/markdown.js` - self-contained Markdown → HTML parser with zero dependencies. Supports: ATX headings H1–H6, bold/italic/bold+italic (`*`/`_`/`***`), strikethrough (`~~`), inline code (`` ` `` with null-char sentinel), fenced code blocks (` ``` ` with optional language class), links, images, blockquotes (recursive), unordered lists, ordered lists, task lists (`[ ]`/`[x]`), horizontal rules, GFM tables (with column alignment), paragraphs. HTML-escapes all input; whitelists link protocols to `https?:`, `mailto:`, `#`, `/`, `.`
- `js/linkcleaner.js` - URL tracking-parameter stripper. Removes ~40+ params by exact name and 11 prefix patterns. Returns `{ valid, clean, removed, kept }` via `window.cleanUrl()`
- `markdown-preview.html` - Markdown Editor tool page: split-pane layout, formatting toolbar (Bold, Italic, Code, Heading, List, Quote, Link), Load Sample / Clear / Copy HTML / Download .md actions, character count, `localStorage` draft autosave, sample document
- `favicon-downloader.html` - Favicon Downloader tool page: domain input form, fetches favicons at 16/32/48/64/128/256px via Google gstatic service, download PNG (CORS fetch + Blob URL, falls back to new tab), copy direct link
- `link-cleaner.html` - Link Cleaner tool page: URL textarea input, Clean / Paste from clipboard / Try an example actions, cleaned URL display, copy + open buttons, removed-param chips (red), kept-param chips (neutral), stat line showing count of removed vs. kept params, Ctrl+Enter keyboard shortcut
- Three hosted tool cards on landing page: Markdown Editor, Favicon Downloader, Link Cleaner
- SVG inline favicons (data URI) on all pages, no external favicon file needed
- Dynamic copyright year via `new Date().getFullYear()` in all footers
- `initialconcept.txt` - original project brief (reference document, not part of the site)
