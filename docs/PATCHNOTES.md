# Patch Notes - Azqato's Tools

All changes are logged here in reverse chronological order (newest first).
Format: semantic versioning (`MAJOR.MINOR.PATCH`), date `YYYY-MM-DD`, sections: Added / Changed / Fixed / Removed.

---

## v1.4.1 - 2026-09-01

No new tools. Six backlog items, five of them rows in the technical debt table, which is
now shorter than it was for the first time in the project's history.

### Fixed
- **Fixed the theme flash**, a known gap since v0.1.0. `<html>` ships with
  `data-theme="light"` hardcoded and `common.js` loads at the end of `<body>`, so a
  dark-theme user saw a white flash on every navigation. The `localStorage` read moved
  into an inline `<script>` in `<head>` on all eleven pages, which is the only place
  early enough to run before the first paint
- **Fixed the silent clipboard failure.** `copyText`'s `execCommand` fallback swallowed
  its exception and showed nothing, so a failed copy looked exactly like a successful one
  and the user pasted stale content. It now reports failure and says what to do instead.
  **Catching the exception alone would not have been enough:** `execCommand` returns
  `false` rather than throwing on some engines, so both outcomes are handled
- **Fixed the three unguarded `localStorage` writes.** All five keys are now wrapped
- **Fixed the Markdown image `src` gap.** Links had been protocol-whitelisted since
  v0.1.0 and images had not
- **Fixed the landing page hero overstating the offline claim.** The "Works offline"
  badge was flat while the Favicon Downloader needs a connection. It is now marked and
  the exception is stated plainly in the about card

### Changed
- Changed `index.html`'s about section from inline `style` attributes to `.about`,
  `.about-card`, and `.about-note`. An inline style cannot respond to a breakpoint or a
  theme, and it is invisible to anyone reading the stylesheet to find out how the page
  is built
- Changed the landing page copy, whose revisit trigger in `PRD.md` was "once the grid
  exceeds eight cards". It was at fourteen. The hero no longer says "a growing
  collection", which was written when there were five tools, and the tools section now
  states how many are hosted here versus linked

### Decisions recorded
- **`<head>` gets exactly one script, and this is it.** The "all JS at the end of
  `<body>`" rule and a flash-free theme cannot both hold, because a script at the end of
  `<body>` runs after the browser has already painted. The rule in `PRD.md` now names its
  exception and the four constraints that keep it narrow: inline so it costs no request,
  a few lines because it blocks the parser, touching nothing but `data-theme`, and
  wrapped in `try/catch` because reading `localStorage` throws outright in some privacy
  configurations, where an uncaught exception would stop the parser before the stylesheet
  loads. That failure would be far worse than the flash it was added to fix
- **Open question 7 answered yes, with one deliberate difference.** Image sources get a
  whitelist but not the identical one links get. `mailto:` and `#` are meaningless for an
  image and are excluded; `data:image/` is included, because an inline image is
  legitimate and `<img>` is a scriptless context, so an SVG loaded through it cannot run
  script even if it contains a `<script>` element. Alt text survives either way, so a
  blocked image still says what it was
- **A latched warning, not a toast per keystroke.** The two draft autosaves fire on every
  keypress. A bare `try/catch` with a toast would have turned a full quota into a toast
  storm, which is a worse experience than the silent failure it replaced. The warning is
  said once and re-arms only after a save succeeds, so a user who frees up space is
  warned again if it fills a second time
- **The theme still changes when it cannot be saved.** The toast says the change did not
  persist rather than implying nothing happened, because the visible thing the user asked
  for did in fact work

### Documentation
- **Corrected an error introduced in v1.4.0.** The technical debt table said only the
  Bookmark Manager's `localStorage` write was wrapped and the other four were not. The
  Wash Sale Tracker's had been wrapped since v1.2.0, so the real count was three
  unguarded, not four. That row was itself written while correcting a stale count, which
  is a good argument for reading the code rather than the previous row
- Added a "Cleared in v1.4.1" table listing the five rows that left the debt table,
  rather than deleting them without trace. A debt table that only ever grows says nothing
  about whether the debt is being paid
- Added a "Theme application" section to `DESIGN.md` with the three rules for anyone
  touching the inline script
- Updated the Security attack surface entry for image sources from a recorded gap to the
  implemented whitelist

### Added
- Added three audit checks: every page must carry the inline theme script, no page may
  have it in `<body>` where it would be too late, and `index.html` may not carry inline
  style attributes inside `<main>`

### Removed
- Removed nothing from the public surface

### Verification
- **74 assertions** against the six changes. The theme script present in `<head>` and
  absent from `<body>` on all eleven pages, a stored theme applied before paint, the
  toggle round trip, and a dark theme surviving navigation to a fresh page. Clipboard
  failure by return value and by exception, and success still reporting success. Storage
  quota failure on both drafts and on the theme write, including the latch holding across
  20 further keystrokes and re-arming after a success. Twelve image and link whitelist
  cases including `JaVaScRiPt:`, a non-image `data:` URI, and `vbscript:`, plus alt text
  surviving a blocked image
- **143 assertions** across all eleven pages for runtime state, and the structural audit
  clean on all eleven
- **Two harness bugs, both mine, both worth recording.** The theme test asserted a light
  starting state, but headless Edge reports `prefers-color-scheme: dark`, so it was
  testing the harness's environment rather than the code; it now pins a known value
  first. The clipboard test assigned `navigator.clipboard = undefined` to force the
  fallback, but that is a read-only accessor on the prototype, so the assignment silently
  did nothing and the async path ran while the assertions checked synchronously.
  `Object.defineProperty` shadows it properly, and the test now asserts the fallback path
  was actually forced before relying on it
- **The regression risk in this release was `js/markdown.js`**, which contains a raw NUL
  byte as its code-span sentinel. The edit script asserts the sentinel is present before
  writing and still present afterwards, and there is a test that a code span still
  suppresses inline formatting
- No em dashes in any modified file, in any of the three prohibited forms
- All three harnesses deleted before committing

---

## v1.4.0 - 2026-08-31

Four tools from the Future list in one release, taking the site from six hosted tools to
ten and the landing grid from ten cards to fourteen. Grouped into one milestone because
each is small, none introduces a new storage key, and all four share one shape: a pure
module that transforms an input, plus a page that wires it to the DOM.

### Added
- Added the **Base64 Encoder** at `base64-encoder.html`, with `js/base64encoder.js`
  exporting `window.base64Encoder`. Encode and decode with full Unicode support, the
  URL-safe alphabet on output and accepted on input either way, byte and character
  counts, and a button that feeds the result back in as input
- Added the **JSON Formatter** at `json-formatter.html`, with `js/jsonformatter.js`
  exporting `window.jsonFormatter`. Format, minify, deep key sort, selectable indent,
  document statistics, and parse errors located to a line and column with a caret under
  the offending character
- Added the **Password Generator** at `password-generator.html`, with
  `js/passwordgenerator.js` exporting `window.passwordGenerator`. Four character sets, a
  look-alike filter, length 4 to 128, and a live entropy and strength meter
- Added the **Timestamp Converter** at `timestamp-converter.html`, with
  `js/timestampconverter.js` exporting `window.timestampConverter`. Seconds,
  milliseconds and microseconds with magnitude-based unit detection and a manual
  override, local and UTC output side by side, relative phrasing, and per-row copy
- Added four `.tool-card` entries and four CSS sections, plus a shared `.b64-opt`
  option-row class used by three of the tools
- Added the footer year setter to `js/common.js`
- Added four audit and harness checks: a `label[for]` may not also wrap the control it
  names, and a render pass now asserts that every page's scripts actually ran

### Decisions recorded
- **The JSON error locator scans the text rather than reading the engine's error
  message.** This was the release's one real reversal. The first implementation matched
  three regexes against `SyntaxError.message` to recover a character offset, and all
  three missed. V8's current wording for the most common failure is
  `Unexpected token '}', ..."b": }..." is not valid JSON`, which carries a context
  snippet and **no offset at all**, and `Unexpected end of JSON input` has never carried
  one in any version. Error strings are not an API. A recursive descent scanner over RFC
  8259 is about a hundred lines, is correct on every engine and every version, and
  locates the cases the engine never located. The engine's wording is still shown,
  because it is better prose than a reimplementation: **wording from the engine, position
  from the scanner**
- **Inline error banners are the project's second feedback channel, and the rule that
  said there would only ever be one is amended rather than ignored.** Toast reports
  events, things that happened and are then over. A parse error is a state the user is
  editing against: it must stay on screen, sit next to the input it refers to, and be
  re-readable. `DESIGN.md` now states the division and the bar for a fourth channel
- **"Any timezone" was dropped from the Timestamp Converter**, and file encoding was
  dropped from the Base64 Encoder. Both are recorded in the Future list with the reason
  rather than quietly narrowed. A timezone picker needs the IANA database; 400 zones is a
  different tool from the one being built
- **`entropy` measures the generator, not the string.** It is the right number for a
  password this tool produced and the wrong number for one a human chose, and the page
  says so
- **Password randomness uses rejection sampling, not `value % max`.** The modulo is
  biased toward low indices whenever `max` does not divide 256, and for a password
  generator that bias is a real reduction in strength

### Changed
- Changed the module names to match their pages. `base64.js`, `jsontool.js`,
  `password.js`, and `timestamp.js` became `base64encoder.js`, `jsonformatter.js`,
  `passwordgenerator.js`, and `timestampconverter.js`, with their globals renamed to
  match. `jsontool.js` was the one that forced the question: "tool" is filler and the
  name matched no tool. Renamed before the first commit, so no public URL moved
- Changed the footer year from eight inline copies to one implementation in
  `js/common.js`. Both `.year` and `#year` are honoured, so no page's markup had to
  change
- Changed the landing grid from ten cards to fourteen, and the README from six hosted
  tools to ten
- Changed four Future list entries to struck-through, each recording what shipped and
  what did not
- Changed the performance file inventory, which was two releases stale

### Fixed
- **Fixed a blank footer year on all four new pages.** They copied the footer markup
  without the inline script that filled it, because that script was duplicated per page
  rather than shared. Caught by a render harness written after the structural audit
  passed clean, which is the point: the audit parses markup and cannot see a value that
  is only ever filled in at runtime. The fix moved the behaviour into `common.js` and
  removed all eight copies
- Fixed the JSON Formatter's indent `<label>`, which both pointed at the `<select>` and
  wrapped it. That absorbs the control's own text into its accessible name, so the select
  announced as "Indent 2 spaces 4 spaces None". The audit only checked for a *missing*
  name and could not see a bad one; it now checks for this too
- Fixed the `<output>` element's `for` attribute on the Password Generator, which named
  only the length slider when five other controls also feed the value

### Removed
- Removed nothing from the public surface

### Documentation
- Backfilled `js/washsale.js` and `js/bookmarks.js` into the PRD's API design section.
  Both shipped in v1.2.0 and v1.3.0 without it, against the project's own "How to add a
  new tool" step 7. Documenting four more modules on top of that gap would have
  compounded it
- Recorded an **unresolved discrepancy** between the CSS organisation rule and the file.
  The rule says the shared responsive block comes last; it has been at line 662 with six
  tool sections after it since v1.2.0. The rule is left as written and both resolutions
  are set out for the author to choose between. The related instruction in "How to add a
  new tool" step 5 is unfollowable as written for the same reason
- Refreshed "all five pages" to "all eleven pages" throughout `PRD.md` and `DESIGN.md`,
  leaving the quoted historical records of past releases with the number that was true
  when they were written
- Flagged `css/style.css` as **the number to watch**: it has doubled since the last
  measurement, from 16,594 to 32,931 bytes, and is now more than half the weight of a
  cold page load. The previous measurement predicted exactly this. Roughly four more
  tools would reach the 100KB page target on shared CSS alone
- Corrected the technical debt row that said three `localStorage` writes are unguarded.
  There are five keys and only one is guarded, and the count had been stale for two
  releases
- Reframed the "No tests of any kind" debt row. It is now "No committed tests", because
  the harness technique has found four real bugs across three releases and deleting the
  harnesses each time means rewriting them each time. Flagged as worth reopening

### Verification
- **88 assertions** against the four modules. Base64: ASCII, empty, accented, emoji, CJK,
  the URL-safe alphabet in both directions, tolerated whitespace, missing padding, bad
  characters, bad length, non-UTF-8 bytes reported rather than silently replaced, and a
  60,000 character round trip. Password: length clamps at both ends, pool composition,
  the look-alike filter, entropy, strength bands, non-repeatability, and full pool
  coverage. Timestamp: unit detection at each boundary, the epoch, negative pre-epoch
  values, separators, the representable range, relative phrasing, and local input
- **20 of those 88 target the JSON error locator specifically**, because it is the part
  that was rewritten: line, column, and caret placement, plus the cases the engine gives
  no offset for at all. Unterminated input, trailing comma, unquoted key, single quotes,
  a bad escape, a short `\u` escape, `[01]`, a lone minus, trailing junk, an unterminated
  string, and the 512 level depth cap that stops hostile input escaping as a `RangeError`
- **75 assertions** against the four pages through their real DOM in an iframe: mode
  switching and label swapping, the disabled URL-safe control while decoding, error
  display and recovery, every button, indent selection, caret alignment, slider and
  checkbox wiring, the no-character-set state, unit override, and the date field writing
  back to the number field
- **132 assertions** across all eleven pages for things only visible at runtime: the
  footer year filled in, both shared helpers present, the theme attribute applied, and
  the mobile navigation opening and closing with its `aria-expanded` following
- The structural accessibility audit passes clean on all eleven pages
- **The clean first run of the page harness was not trusted.** 75 out of 75 on a first
  run is more likely to mean the harness is not reporting than that the code is perfect,
  so a deliberately failing assertion was injected to confirm failures surface. It did,
  and was removed
- No em dashes in any new or modified file, in any of the three prohibited forms. The one
  `--` match in `js/jsonformatter.js` is the `depth--` decrement operator
- All four harnesses deleted before committing, as the rule in `PRD.md` requires

---

## v1.3.0 - 2026-08-31

The **Bookmark Manager**, the sixth hosted tool and the largest thing built for this
project so far. It is the first tool that reads a file, the first that writes one, and
the first with a format parser other than the Markdown one.

### Added
- Added the Bookmark Manager at `bookmark-manager.html`. Import the bookmarks file your
  browser exports, edit names and addresses in place, add and delete bookmarks and
  folders, search across the whole collection, and export the same format back
- Added `js/bookmarks.js`, exporting `window.bookmarks` with `parse`, `serialize`,
  `count`, `flatten`, `remove`, `merge`, `isSafe`, and `nextId`. Like the other tool
  modules it never touches the live document
- Added the `azqato-bm-tree` `localStorage` key, the project's fifth, stored as
  `{ v: 1, tree: [...] }`. It is the most costly of the five to get wrong: it can hold a
  user's entire bookmark collection, which may exist nowhere else if they imported it and
  then cleared their browser
- Added a native `<dialog>` for the import choice, and an "Edit in place" and a "Dialogs"
  section to `docs/DESIGN.md` recording when each is appropriate
- Added two audit checks: every `<dialog>` must have an accessible name, and its
  `aria-labelledby` must point at an element that exists

### Decisions recorded
- **Folders are preserved through the round trip.** This was the decision that set the
  size of the tool. Flattening would have been a fraction of the work and would have
  reorganised the user's collection for them
- **Parsing goes through `DOMParser` rather than a hand-written tokeniser.** The Netscape
  bookmark format is barely valid HTML: `<DT>` is never closed, `<p>` is used as an
  opening tag with no closing tag, and a folder's `<DL>` sits **inside** the `<DT>` that
  names it in Chrome's output but **after** it as a sibling in Firefox's. The browser's
  own error recovery is what defines the real shape of these files, so using it is more
  robust than reimplementing it. `parseDL` handles both nestings, and there is a test for
  each
- **A `javascript:` URL in an imported file is kept as data but never becomes a live
  href.** Dropping it would make import lossy; honouring it would be an XSS hole in a
  file the user did not write. Unsafe entries are stored, shown in `--danger`, and lose
  the open button entirely rather than rendering as a link that does nothing
- **Favicons are not shown, and that is settled rather than deferred.** It would mean
  sending every bookmarked domain to Google. That is a worse tenet 1 violation than the
  Favicon Downloader's, where the user types the one domain they are asking about; here
  it would be their whole collection, sent without them asking for anything
- **Merge matches on URL within a folder, not globally.** The same link filed in two
  folders is two bookmarks to a user, and collapsing them would silently reorganise their
  collection. Folders merge by name
- **A collapsed folder does not render its children at all.** Edit in place means one
  real `<input>` per visible row, so not rendering collapsed subtrees is what bounds the
  DOM on a large collection

### Changed
- Changed the landing grid from nine cards to ten, and the README from five hosted tools
  to six
- Changed the Bookmark Manager milestone in `docs/PRD.md` from four open design questions
  to four answered ones. Two are answered "no" with reasons rather than being quietly
  dropped: favicons will not be added, and the storage ceiling is not solved
- Changed the public surface list from four `localStorage` keys to five

### Fixed
- Fixed the import file input, which was `.sr-only` and therefore still in the
  accessibility tree, so a screen reader user met an unlabelled file control sitting next
  to the button that already triggers it. It is now `hidden`, which removes it from the
  tree entirely, leaving exactly one control. **Found by the audit harness, not by
  reading.** `.sr-only` hides from the screen and `hidden` hides from everything; using
  the first where the second was meant is an easy and invisible mistake
- Fixed pluralisation across the Bookmark Manager, which produced "1 bookmarks in 0
  folders" in the import dialog. A single `plural()` helper now covers the dialog, the
  stats line, the folder counts, the search results, and the import toast

### Removed
- Nothing

### Verification
- 57 assertions against `js/bookmarks.js`. Both real-world nestings, Chrome's `<DL>`
  inside the `<DT>` and Firefox's as a sibling. Entity decoding in names and URLs, nested
  folders at depth two, counting, flattening with folder paths, a full serialize and
  reparse round trip preserving structure and escaping, the protocol whitelist against
  nine cases including `JaVaScRiPt:` and a leading-space `javascript:`, an XSS payload
  surviving as inert data, removal of a link and of a whole folder, merge folding folders
  by name and skipping duplicate URLs, and four malformed or empty inputs
- 35 assertions against the page through its real DOM in an iframe: empty state, tree
  render, folder expansion and its `aria-expanded`, edit in place writing through to
  storage, an unsafe URL losing its open affordance and regaining it, search by name and
  by address with the folder path shown, add, delete, the import dialog, merge skipping
  duplicates, replace wiping, export round trip, and corrupt storage recovery
- 15 assertions against the real import path, driving an actual `File` through the file
  input and `FileReader` rather than calling the handler directly: import into an empty
  collection skipping the dialog, a second import raising it, cancel leaving the tree
  untouched, merge, replace, and a file with no bookmarks in it being rejected without
  touching the collection
- **One test bug worth recording.** The import suite first appeared to fail, reporting
  that a second import did not raise the dialog. It did. `--virtual-time-budget`
  fast-forwards `setTimeout` but does not wait on real file I/O, so a 250ms sleep elapsed
  instantly while `FileReader` had not finished. The suite now polls for the condition
  instead of sleeping. **Any future harness touching `FileReader`, `fetch`, or anything
  else genuinely asynchronous must poll rather than sleep**
- The structural accessibility audit passes clean on all seven pages
- No em dashes in any new or modified file. All three harnesses deleted before committing

---

## v1.2.0 - 2026-08-31

The **Wash Sale Tracker**, the fifth hosted tool and the first in the finance domain,
where every Azqato finance tool until now has been an external card on the landing page.
It is also the first tool that owns a collection of the user's records rather than
transforming a single input.

### Added
- Added the Wash Sale Tracker at `wash-sale-tracker.html`. Enter a ticker and the date
  traded, and the tool counts the 30 day window forward. Active Wash Sales lists windows
  still running with the trade date, the expiry date, and the days remaining; Expired
  Wash Sales holds the same rows once their date has passed
- Added `js/washsale.js`, exporting `window.washSale`. Like the other three tool modules
  it is a single IIFE that never touches the DOM, so every function is pure. It exports
  `isValidDate`, `addDays`, `daysBetween`, `today`, `expiryOf`, `normalizeTicker`,
  `classify`, and the `WINDOW_DAYS` constant
- Added the `azqato-ws-records` `localStorage` key, the project's fourth and the first
  holding a collection rather than a single value. It is the first to carry a schema
  version, stored as `{ v: 1, records: [...] }`. Changing the record shape means bumping
  `v` and reading the old shape before writing the new one
- Added a days-remaining pill that is neutral by default, amber under a week, and
  `--danger` in the last two days, reading "last day" on the final day rather than
  "0 days left"
- Added a remove button to every row, with an accessible name naming the ticker and the
  trade date rather than a bare "Remove", so the buttons are distinguishable when read
  out of context
- Added a "Clear expired" action that appears only when there is something to clear,
  names the count in its confirm, and never touches active windows
- Added a `.ws-table` component and a Data tables section to `docs/DESIGN.md`, with two
  rules for the next table: row borders rather than row backgrounds, and at most one
  coloured thing per row
- Added two checks to the audit harness, since this is the project's first table: every
  table must have a `<th>`, and every `<th>` must carry `scope`

### Changed
- Changed the landing grid from eight cards to nine, and the README from four hosted
  tools to five
- Changed the Wash Sale Tracker milestone in `docs/PRD.md` from five open design
  questions to five answered ones, each recorded with its reasoning rather than deleted
- Changed the public surface list in `docs/PRD.md` from three `localStorage` keys to
  four, with a note that the new one cannot be treated like the others: it holds a
  collection and a schema version, so a change to its record shape is a migration rather
  than a rename

### Decisions recorded
- **The expiry date is the trade date plus 30 days, and the backward half of the rule is
  deliberately not modelled.** The US wash sale rule runs 30 days either side of a sale,
  a 61 day window. By the time a user logs a trade, the backward half is already history,
  so modelling it would add a column that can never change. The page says which half it
  covers in plain words, because a tool that silently covers half a rule is worse than
  one that says which half
- **A window that expires today is still active.** Day 30 is the last day the rule bites
  and it is clear from day 31, so `classify` treats `daysLeft >= 0` as active. This is
  the boundary most likely to be got wrong by a later edit and it has two assertions
  guarding it from either side
- **Active versus expired is computed at render time and never stored,** as the v1.0.1
  note required. A stored flag would go stale the moment a tab was left open overnight
- **Every date is a plain `YYYY-MM-DD` string and no `Date` object ever escapes the two
  helpers in `washsale.js`.** `new Date("2026-08-31")` parses as UTC midnight while
  `new Date(2026, 7, 31)` parses as local midnight, so mixing them shows the wrong day to
  anyone west of Greenwich for part of every day. All arithmetic runs through `Date.UTC`,
  which additionally has no daylight saving, so no day is ever 23 or 25 hours long. The
  one place local getters are correct is `today()`, because the user's today is a local
  question, and that is commented in the source as the exception it is
- **Corrupt storage costs the user their history, not the page.** `load()` returns an
  empty list on a parse failure or a schema mismatch instead of throwing, so a truncated
  or hand-edited value leaves a working tool with an empty table rather than a blank page

### Fixed
- Nothing. No existing behaviour changed

### Removed
- Nothing

### Verification
- 45 assertions against `js/washsale.js` in headless Edge, all passing. Date validation
  including 30 February, 29 February in a leap and a non-leap year, month 13, and a
  non-ISO shape. Arithmetic across month ends, year ends, both leap year boundaries, and
  both 2026 US daylight saving transitions, in each direction. Ticker normalisation
  including case, dots, hyphens, punctuation stripping, truncation, and a non-string
  argument. Classification against a **fixed reference date**, so the suite can never
  pass or fail depending on the day it is run, covering the expiry-day boundary from both
  sides, invalid records being dropped, sort order in both tables, and empty and `null`
  input
- 29 assertions against the page itself, loaded in an iframe and driven through its real
  DOM rather than a reimplementation: the date defaulting to today, both empty states,
  adding a record, uppercasing on entry, the counts, the pill text at 30 days and on the
  last day, the day 30 and day 31 boundary landing in different tables, rejection of an
  empty ticker and an empty date, the stored schema version and shape, removing a row and
  its persistence, clearing expired leaving active untouched, and a deliberately corrupted
  storage value still producing a working page
- The structural accessibility audit passes clean on all six pages
- No em dashes in any new or modified file, in any of the three prohibited forms
- Both harnesses were deleted before committing

---

## v1.1.0 - 2026-08-31

Platform work, no new tools. Two items that had each been deferred behind a stated
trigger, and both triggers had fired.

### Added
- Added a **mobile navigation** menu, closing the last open accessibility gap. Below
  760px the four topbar links are hidden by `.hide-sm`, which left tool pages with no
  route to Projects or Support on a phone. A `.nav-toggle` button now appears at exactly
  that breakpoint, opening a `.nav-menu` panel holding the same four links. The show and
  hide rules are deliberately adjacent in the stylesheet: the links leave at the width
  the button arrives, so exactly one route to the navigation exists at any size
- Added mobile navigation behaviour to `js/common.js` rather than to five inline
  scripts, so the topbar behaves identically on every page and a sixth page inherits it
  by copying markup alone. It closes on a second click, a click outside, Escape, and any
  link inside it. The Escape handler returns focus to the button, because leaving focus
  on an element that has just become `display: none` drops the user to the top of the
  document. The whole block is guarded on the elements existing, so a page without the
  markup is unaffected
- Added **tool search** to the landing grid. This was deferred by an explicit rule until
  eight or more tools existed, a condition met in v0.2.0 and now acted on. It filters on
  each card's full text content, cached once on load, rather than on its heading, so a
  description word like "tracking" finds the Link Cleaner even though the name does not
  contain it
- Added `.tool-count` as a `role="status"` live region reporting how many tools match.
  This is the opposite call from the Markdown preview, which was deliberately denied a
  live region in v1.0.0, and the two together set the rule now recorded in `DESIGN.md`:
  the distinction is the size and purpose of the content, not how often it updates. A
  short sentence that changes per keystroke is useful to hear; a whole rendered document
  on the same schedule is unbearable
- Added `.tools-empty`, the no-match state, spanning the grid with `grid-column: 1 / -1`
  and naming the total so the user knows what clearing the box would restore
- Added `.tool-card[hidden]` and the explicit `.nav-menu[hidden]` and
  `.nav-menu:not([hidden])` rules. **These are load-bearing, not verbosity.** The
  browser's own `[hidden] { display: none }` is outranked by any author rule that sets
  `display`, and both elements set one. Without them the search would hide nothing and
  the menu would never close
- Added two checks to the accessibility audit harness, since v1.1.0 introduced the
  project's first disclosure widget: every `aria-controls` must resolve to an element
  that exists, and anything carrying `aria-controls` must also declare `aria-expanded`

### Changed
- Changed the milestone numbering. The Wash Sale Tracker moved from v1.2.0 to stay at
  v1.2.0 and the Bookmark Manager moved from v1.1.0 to v1.3.0, so milestones now run in
  the order they will ship. The v1.0.1 note predicted this: it recorded that the Wash
  Sale Tracker was plausibly the smaller of the two and should move up if the two were
  ever reordered by effort
- Changed accessibility gap 8 in `docs/DESIGN.md` from open to closed. **Every gap on
  that list is now closed**
- Changed the roadmap direction answer in the `PRD.md` FAQ again, since the two platform
  items it named as pending have now shipped

### Fixed
- Nothing. No existing behaviour changed, and no bug was found to fix

### Removed
- Removed the mobile navigation row from the technical debt table, replacing it with an
  honest successor: page chrome now spans two files rather than one. The topbar markup is
  still copy-pasted into five HTML files, and v1.1.0 widened it with a button and a
  `<nav>`, so a navigation change is now five HTML edits plus a JavaScript edit that has
  to stay in step. Putting all behaviour in `common.js` was the mitigation available
  without a build step, which tenet 3 forbids

### Verification
- 23 assertions run in headless Edge against a real `index.html` loaded in an iframe,
  driving the actual DOM rather than a reimplementation. Search: eight cards present, all
  visible initially, a name match, a description-only match, a case-insensitive match, a
  no-match showing the empty state and a zero count, and clearing restoring all eight.
  Navigation: starts hidden with `aria-expanded="false"`, opens on click, closes on a
  second click, on an outside click, on Escape, and on a link click, and holds four links
- The structural accessibility audit passes clean on all five pages, including the two
  new disclosure checks
- The harnesses were deleted before committing, as the rule in `PRD.md` requires

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
