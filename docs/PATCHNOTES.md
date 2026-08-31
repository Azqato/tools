# Patch Notes - Azqato's Tools

All changes are logged here in reverse chronological order (newest first).
Format: semantic versioning (`MAJOR.MINOR.PATCH`), date `YYYY-MM-DD`, sections: Added / Changed / Fixed / Removed.

---

## v0.2.0 - 2026-08-31

First tool of the v0.2.0 batch. Minor version bump rather than a patch, per the rule in
`PRD.md`: a new tool or a visible feature moves the minor number.

### Added
- Added the **Character Counter** tool at `character-counter.html`, the fourth hosted
  tool. Live counts for characters with spaces, characters without spaces, words,
  sentences, paragraphs, and lines, updating on every keystroke
- Added reading and speaking time estimates to the Character Counter, at 238 and 130
  words per minute respectively. 238 is the pooled mean for adult silent reading of
  English prose from Brysbaert's 2019 meta-analysis; 130 is a typical prepared-talk pace
- Added six platform limit bars to the Character Counter: X post (280), single SMS (160),
  meta description (160), title tag (60), Instagram caption (2200), and LinkedIn post
  (3000). Each shows characters remaining or the overage, with the bar and the count
  turning `--danger` once the limit is passed
- Added an astral-character note to the Character Counter. When the text contains
  characters that occupy two UTF-16 units, such as emoji, the page states both the
  reader-facing code point count and the platform-facing unit count instead of silently
  picking one
- Added Paste from clipboard, Try an example, Clear, and Copy stats actions to the
  Character Counter
- Added draft autosave to the Character Counter under the `localStorage` key
  `azqato-cc-draft`, matching the Markdown Editor's behaviour. This is the third
  `localStorage` key in the project and is now on the public surface list in `PRD.md`,
  so it can never be renamed without a migration read
- Added `js/charactercounter.js`, exporting `window.countText` and
  `window.formatDuration`. Like `markdown.js` and `linkcleaner.js` it is a single IIFE
  that never touches the DOM, so both functions are pure functions over their arguments
- Added a Character Counter card to the landing page grid, placed after Link Cleaner and
  before the external tools
- Added a Character Counter section to `css/style.css`, before the final 760px media
  query as the organisation rule requires. New classes: `.cc-actions`, `.cc-grid`,
  `.cc-stat` (with a `.time` variant), `.cc-note`, `.cc-limits`, `.cc-limit` (with an
  `.over` state), `.cc-limit-head`, `.cc-bar`, `.cc-fill`
- Added a "Stat grid and limit bars" component pattern to `docs/DESIGN.md`, documenting
  both new patterns, the `auto-fit` versus `auto-fill` distinction against the existing
  grids, and the rule that a second progress bar should reuse `.cc-bar` and `.cc-fill`
  rather than inventing a variant
- Added a "Bookmark Manager" entry to the Future tool list in `docs/PRD.md` and a
  dedicated v0.3.0 roadmap milestone for it, covering scope (import and export the
  Netscape bookmark format Chrome reads and writes, edit URL and display name, add and
  delete, store the collection in the browser), four open design questions to resolve
  before building (folder tree preservation, storage limit and whether `localStorage` is
  large enough, whether favicons are worth the privacy cost, and whether import replaces
  or merges), and the constraints it must respect
- Added a "note on testing" subsection to the Working Practice section of `docs/PRD.md`,
  recording the throwaway-harness technique used to verify the new module by assertion
  under headless Edge, and the rule that the harness is deleted rather than committed
- Added Character Counter steps to the manual verification checklist in `docs/PRD.md`,
  with the exact figures the sample text should produce
- Added two Character Counter rows to the Common Errors table and five Character Counter
  questions to the external FAQ in `docs/PRD.md`, covering what it counts, why its
  character count can differ from another tool's, that the sentence count is an estimate
  and why, where the reading and speaking constants come from, and that the draft is
  stored unencrypted on the user's own device

### Changed
- Renumbered the accessibility pass milestone from v0.3.0 to v0.4.0 in `docs/PRD.md`, to
  make room for the Bookmark Manager milestone. The v0.2.0 milestone moved from Planned
  to In Progress
- Removed "Word and character counter" from the Future tool list in `docs/PRD.md`, since
  it has now shipped as the Character Counter
- Updated `README.md` from three hosted tools to four, and added a plain-language
  description of the Character Counter
- Updated every page and tool count across `docs/PRD.md` and `docs/DESIGN.md` from four
  pages to five and from three hosted tools to four, in the folder tree, the architecture
  diagram, the public surface list, the performance table, the technical debt table, the
  conventions table, and the Working Practice lookup table. Historical entries were left
  alone: the v0.1.3 note about three tool pages moving and the press release's launch-day
  description both record what was true at the time
- Updated the measured file sizes in `docs/PRD.md` to 2026-08-31 values, and noted that
  `css/style.css` is the figure to watch as the grid fills out, since it is shared and
  grows with every tool
- Updated the duplicated-page-chrome entries in the technical debt and fragile areas
  tables of `docs/PRD.md` from four files to five, and recorded that this cost grows by
  one file with every tool shipped, making it the strongest argument the project has
  against its own zero-build-step tenet
- Updated the unguarded `localStorage` write notes in `docs/PRD.md` from two writes to
  three, and recorded that the reason a failed write does not break the visible output is
  statement ordering rather than design, so a future tool that writes before rendering
  would fail visibly
- Updated the "last verified" line in `docs/DESIGN.md` to note the v0.2.0 update and the
  new stylesheet size, 645 lines and 16.6KB, up from 565 lines and 14.9KB
- Updated the tool page footer list in `docs/DESIGN.md` to four variants, adding the
  Character Counter's data-location line, "Your text never leaves your device"

### Fixed
- Nothing. No existing behaviour changed in this version

### Removed
- Nothing from the site. The temporary test harnesses `_test.html` and `_test2.html` were
  created during development, used to verify the new module and page, and deleted before
  committing. They were never part of the repository

### Verification
- 31 assertions against `js/charactercounter.js` run in headless Edge: empty input, basic
  counts, multi-sentence text, text with no terminator, multi-paragraph text,
  whitespace-only input, emoji (code units versus code points), `null` input, the 238
  words per minute boundary, and all four `formatDuration` branches. All passed
- All five pages rendered in headless Edge with their scripts running to completion,
  confirmed by the injected copyright year being present on each
- The Character Counter's sample text was verified end to end by driving the button and
  reading the rendered DOM: 379 characters, 303 without spaces, 75 words, 6 sentences, 3
  paragraphs, 8 lines, 19 sec reading, 35 sec speaking, four bars over limit and two
  under, with over-limit fills clamped to 100% width
- No em dashes in any of the new or modified files, in any of the three prohibited forms

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
