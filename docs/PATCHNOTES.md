# Patch Notes - Azqato's Tools

All changes are logged here in reverse chronological order (newest first).
Format: semantic versioning (`MAJOR.MINOR.PATCH`), date `YYYY-MM-DD`, sections: Added / Changed / Fixed / Removed.

---

## v1.0.1 - 2026-08-31

Documentation only. No code changed, nothing on the live site behaves differently.

### Added
- Added the **Wash Sale Tracker** to the Future tool list and gave it a v1.2.0 milestone
  in `docs/PRD.md`. Requested scope: a ticker and trade date entry form with the date
  enterable by typing or from a calendar, an Active Wash Sales table showing the trade
  date and the window's expiry date, an Expired Wash Sales table with the same columns
  for windows that have passed, and every record held in browser storage on the user's
  own device
- Added four design notes to that milestone that follow from the existing codebase
  rather than from the request, so they are settled before anyone starts building.
  Active versus expired is derived at render time and never stored, because a stored
  boolean goes stale the moment a tab is left open overnight. `<input type="date">`
  satisfies both halves of the calendar-or-typed requirement with no dependency. Date
  arithmetic goes in a pure `js/washsale.js` so the test harness can reach it, which
  matters more here than in any tool so far because an off-by-one in a date boundary is
  invisible by eye and wrong for exactly one day. And dates are stored as plain
  `YYYY-MM-DD` strings, never as `Date` objects, because `new Date("2026-08-31")` parses
  as UTC midnight while `new Date(2026, 7, 31)` parses as local midnight, which shows
  the wrong day to any user west of Greenwich for part of every day
- Added five open design questions to the same milestone, the first of which is load
  bearing: the requirement says "the expiration date of the wash sale", which most
  likely means the trade date plus 30 days, but the US wash sale rule runs 30 days
  either side of the sale, a 61 day window. A tracker keyed on one date covers only the
  forward half, and answering this decides whether the table has one date column or two
- Added the constraint that the tool must state plainly that it is a record-keeping aid
  and not tax advice, and that it does not determine whether a wash sale occurred but
  tracks dates the user enters. Ticker input cannot be validated, since that needs a
  network call and tenet 1 forbids one, so it is free text that is normalised rather
  than checked
- Added a note that this is the first hosted tool in the finance domain, where every
  Azqato finance tool until now has been an external card on the landing page, and that
  its `localStorage` key would be the first holding a collection rather than a single
  value, so it needs a stored schema version from day one that none of the existing
  three keys has

### Changed
- Changed the roadmap direction answer in the `PRD.md` FAQ, which still said the plan
  was "more tools, then an accessibility pass". That pass shipped as v1.0.0. It now
  names the two tool milestones and the two remaining platform items

### Not changed, and why
- The Wash Sale Tracker sits at v1.2.0 because the Bookmark Manager was requested first,
  not because it is larger. It is plausibly the smaller of the two: no file format
  parser, no import or export, no folder tree, and a record of two fields against a tree
  of many. This is recorded as a note on the milestone rather than acted on, because
  reordering milestones by effort is a decision for the author and was not asked for

---

## v1.0.0 - 2026-08-31

First stable release. The major bump is not a marketing gesture: it settles a version
number that had been contradicting itself since v0.1.4, and it lands the accessibility
pass that was the last thing standing between the site and a version it could defend.

Every open question that was gating work in `PRD.md` was answered by the author in this
release. Four of them are recorded below as decisions with their reasoning, so the
reasoning survives even after the questions are folded away.

### Added
- Added a skip-to-content link to all five pages. `.skip-link` is the first element
  inside `<body>` and the first thing the keyboard reaches, sitting off-screen at
  `top: -60px` until focused and transitioning to `top: 12px`. Every `<main>` gained
  `id="main"` to receive it. Both halves are required: the anchor alone goes nowhere and
  the id alone is unreachable
- Added a `prefers-reduced-motion: reduce` block as the last rule in `css/style.css`.
  Two details are load-bearing. It is last in the file because it has to win over every
  transition above it, and it sets durations to 1ms rather than 0 so that
  `transitionend` still fires. A handler waiting on that event would never run under a
  true zero, which would turn a user's accessibility preference into a broken feature
- Added `role="status"` to the toast, set in `js/common.js` where the element is
  created rather than in markup, so all five pages inherit it from a single line. The
  role implies `aria-live="polite"` and `aria-atomic="true"`, which is the right pairing:
  polite because a toast never interrupts, atomic because the message only means
  anything read whole. The toast is the only feedback channel in the project, so until
  now every copy and every download succeeded silently for screen reader users
- Added an `.sr-only` visually-hidden utility class, using the clip-plus-1px-box
  technique rather than `display: none` or `visibility: hidden`, both of which remove an
  element from the accessibility tree along with the screen
- Added `<label class="sr-only" for="fav-input">Website address</label>` and
  `<label class="sr-only" for="md-input">Markdown source</label>`, closing the last two
  unlabelled inputs. `DESIGN.md` has claimed since v0.1.0 that every form input has an
  associated label; as of this release that claim is true
- Added `role="region"` and `aria-label="Rendered preview"` to `.md-preview`
- Added a replacement focus indicator to `#md-input`, which previously set
  `outline: none` with nothing in its place. It is an inset ring,
  `box-shadow: inset 0 0 0 2px var(--accent-soft)`, inset because the textarea runs edge
  to edge inside its pane and a normal outline would sit half outside it
- Added annotated git tags for every release from v0.1.3 to v0.2.0, each carrying the
  committer date of the commit it points at rather than the date the tag was created.
  v0.1.0, v0.1.1, and v0.1.2 have no tag and never will: they predate the repository,
  whose first commit is already labelled v0.1.3, so there is no commit to point at
- Added a "Skip link" component section to `docs/DESIGN.md`, including why it is
  positioned rather than clipped and must not be merged with `.sr-only`

### Changed
- Changed the version line to v1.0.0. Since v0.1.4 the roadmap had carried a milestone
  reading "v1.0.0 - Public deployment to GitHub Pages, Complete" while `PATCHNOTES.md`
  was still at v0.1.x and had never recorded a v1.0.0 entry. The two records could not
  both be right. The launch was real and happened on 2026-06-27, but it is recorded here
  as v0.1.4, so the milestone row has been relabelled v0.1.4 and the number v1.0.0
  reassigned to the release that earned it. Nothing about the launch was deleted; only
  the label moved
- Changed the section captions "The tools" and "Why these tools?" on `index.html`, "The
  numbers" and "Against common limits" on `character-counter.html`, and the dynamic
  results caption in `favicon-downloader.html` from `<p class="section-label">` to real
  `<h2>` elements. The landing page previously jumped straight from the hero `<h1>` to
  the tool cards' `<h3>`, breaking the outline a screen reader builds from headings.
  These captions looked and read like headings without being headings. No CSS change was
  needed, because `.section-label` already sets its own `font-size` and `margin` and so
  overrides the browser's `h2` defaults completely
- Changed the type-scale selector from `label.lbl` to `.lbl`, and its
  `margin-bottom: 7px` to the `margin: 0 0 7px` shorthand. A `<label>` is only correct
  when it names a form control, and a `<p>` carries a default top margin that a
  `<label>` does not
- Changed the Link Cleaner's "Cleaned URL" caption from a `<label>` with no `for` target
  to a `<p class="lbl">`. It captions a `<div>`, so calling it a label told screen
  readers there was a form field there when there was not
- Changed `docs/PRD.md` from four open discrepancies to one. Rows 5, 6, and 7 of the
  Documentation versus reality table are now resolved, and open questions 1, 2, 5, and
  10 are answered in place with their answers rather than deleted
- Changed the git tag convention in `docs/PRD.md` from "none exist" to a standing rule:
  annotated, one per release, named `vMAJOR.MINOR.PATCH`, created as part of shipping
  rather than later
- Changed the versioning rule in `docs/PRD.md` to define a major bump, which had no
  definition while the project was pre-1.0. A major bump is now reserved for a change
  that breaks a public surface as defined in Deprecation and removal
- Changed "Search or filter on the landing page" from Explicitly deferred to the Future
  feature list. Its stated trigger, eight or more tools, is now met at four hosted and
  four external cards. It is the next platform item due
- Changed the mobile navigation gap from an unranked known gap to the single remaining
  open accessibility item, in both `docs/PRD.md` and `docs/DESIGN.md`. It is the one
  thing this pass did not close, because it needs a design decision about what mobile
  navigation should be rather than an attribute on an existing element

### Fixed
- Fixed two Link Cleaner tracking rules that could never match. `" trk"` carried a
  leading space and `trkCampaign` carried capitals, while `shouldRemove` lowercases the
  incoming key but does not trim it, so both had been dead since v0.1.0. `" trk"` was
  deleted rather than trimmed, because `"trk"` was already present on the same line and
  the obvious fix would have produced a duplicate in a `Set`; `trkCampaign` became
  `trkcampaign`. **This is a visible behaviour change:** a URL carrying `trkCampaign` in
  any casing is now stripped where it previously passed through untouched. The exact
  list is 47 entries and all 47 work, down from 48 of which 46 did
- Fixed the accessibility claim in `docs/DESIGN.md` that "form inputs have associated
  `<label>` elements", not by softening the document but by making the code match it.
  The v0.1.8 audit kept the rule and recorded the gap rather than relaxing the rule to
  fit the code, which is the reason it was still there to close

### Removed
- Removed `initialconcept.txt`. It was the original one-paragraph brief, present in the
  working tree, referenced by the documentation, and never once committed to git. The
  file was read before deletion and its content confirmed to be already captured in the
  Problem statement of `docs/PRD.md`: the three inspiration URLs
  (markdownlivepreview.com, folge.me's favicon downloader, linkcleaner.app) and both
  original constraints, that every tool runs natively in the browser with no server-side
  process and that the stack is plain HTML, CSS, and JavaScript. That paragraph is now
  the record of the brief. Every reference to the file across `docs/PRD.md` was rewritten
  to describe it in the past tense
- Removed the dead `" trk"` entry from the Link Cleaner exact-name set, as described
  under Fixed
- Removed five closed items from the technical debt table in `docs/PRD.md`: the dead
  Link Cleaner rules, `prefers-reduced-motion`, the skip link, the toast role, and the
  unlabelled inputs. The mobile navigation gap replaced them as a single row

### Decisions recorded
- **The Markdown preview deliberately did not get `aria-live`, and the roadmap item
  asking for it was wrong.** The pane re-renders on every keystroke. An `aria-live`
  region announces its content each time it changes, so a screen reader user typing a
  paragraph would hear the entire document read back after every character, which is
  worse than the silence it was meant to fix. It got `role="region"` and an
  `aria-label` instead, making it a named landmark that can be jumped to and read on
  demand. If this is ever revisited, the correct pattern is a debounced
  `aria-live="polite"` region carrying a short summary such as "preview updated, 12
  paragraphs", never the rendered document. The general rule now recorded in
  `DESIGN.md`: a live region is for content that changes on the system's schedule, not
  on the user's
- **A standing rule came out of the dead tracking rules:** every entry in the Link
  Cleaner's `EXACT` set must be lowercase with no surrounding whitespace. `shouldRemove`
  lowercases but does not trim, so the set is the only place that invariant can be
  enforced, and it is enforced by eye. A violating entry does not throw and does not
  warn, it silently does nothing, which is precisely how two of them survived four
  months and eight releases unnoticed
- **A standing rule came out of the focus fix:** never remove a focus outline without
  putting something visible in its place in the same rule
- **A standing rule came out of the heading fix:** `.section-label` is a heading style,
  so the element wearing it must be a real heading at the correct level

### Verification
- A structural accessibility audit was written for this release and run against all five
  pages under headless Edge. It fetches each page, parses it with `DOMParser`, and
  asserts on `lang`, landmark elements, exactly one `h1`, heading-level order, duplicate
  ids, `img` `alt`, form-control labelling, accessible names on every button and link,
  orphan labels, and the presence of a skip link. Before the changes it reported nine
  findings across the five pages. After them, all five pages report clean
- **The Lighthouse target on the accessibility milestone was not met and is not claimed.**
  Lighthouse requires Node, and Node is not installed on the maintenance machine. The
  structural audit above is a real result and it is not a Lighthouse score: Lighthouse
  also measures colour contrast, tap-target size, and viewport behaviour, none of which
  the harness checks. The honest position is that every structural gap this project had
  written down is now closed and the numeric target stays open. That item should not be
  marked met until a real score exists
- Six assertions against `js/linkcleaner.js` covering the repaired entries: mixed-case
  `trkCampaign`, upper-case `TRKCAMPAIGN`, and bare `trk` are all stripped from one URL
  while a legitimate parameter survives; the prefix path and an unrelated exact match
  still work. A seventh assertion failed and was withdrawn rather than chased, because it
  asserted the wrong thing about pre-existing behaviour: `cleanUrl` prepends `https://`
  to input without a scheme, so a string of words parses as a URL rather than returning
  `valid: false`. That is unchanged by this release
- All five pages rendered under headless Edge with their scripts running to completion,
  confirmed by the injected copyright year and the skip link being present on each
- No em dashes in any modified file, in any of the three prohibited forms. The remaining
  matches for `&mdash;` and ` -- ` in `docs/PRD.md` are the rule text naming the
  character it prohibits and two shell commands where `--` is argument syntax, both of
  which the writing style rule explicitly exempts
- The audit harness was deleted before committing, as the rule in `PRD.md` requires. It
  was never part of the repository

### Not changed, and why
- The initial commit message still contains an em dash. Unchanged for the same reason as
  in v0.1.8: git history is a historical record and rewriting `master` to correct
  punctuation would mean force-pushing the deploy branch
- The Markdown image `src` protocol whitelist (open question 7), the generic parameter
  names `amp`, `spm`, `scm`, and `trk` (open question 6), analytics (open question 8),
  and external link checking (open question 9) remain open. None of them was in scope for
  this release and none is blocked

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
