# Product Requirements Document - Azqato's Tools

**Last updated:** 2026-08-25
**Status:** Live and in active development, v0.1.x
**Live site:** https://azqato.github.io/tools/
**Repository:** https://github.com/Azqato/tools (default branch `master`)

This document is the complete record of the project. It is written so that a
contributor or a model arriving with no prior context can understand what the product
is, who it serves, how it is built, how to run and deploy it, what conventions it
follows, and which decisions were made deliberately, without reading a line of source
code. Where a statement is uncertain it is marked as uncertain. Where the code and the
documentation disagree, both readings are recorded in the Documentation Versus Reality
section rather than one silently overwriting the other.

---

## Problem statement

Most freely available web utilities require the user to upload their data to a
third-party server, create an account, accept cookies, or endure advertising. Even
"simple" tools like Markdown editors and link cleaners transmit user content to a
remote service the user cannot inspect or trust. Privacy-conscious users, developers,
and people working with sensitive text or URLs have no reliable, branded home for
fast, clean, no-compromise tooling.

This product solves that by providing a curated set of utilities that run entirely in
the browser: zero server contact for any user data, zero sign-up, zero cost.

The problem is not that good browser-side tools do not exist. Several of the tools
here were directly inspired by existing services. The original one-paragraph brief
named three by URL: markdownlivepreview.com, folge.me's favicon downloader, and
linkcleaner.app. It also set the two constraints the project still runs on, that every
tool works natively in the browser with no server-side process, and that the stack is
plain HTML, CSS, and JavaScript. That brief lived in an untracked file,
`initialconcept.txt`, which was deleted in v1.0.0 once its content had been absorbed
here. This paragraph is now the record of it. The problem is that a user has to find, evaluate,
and trust each one separately, and that most of them process data on a server when
they do not have to. Collecting them under one roof, with one privacy model that is
the same for every tool, removes that per-tool evaluation cost.

---

## Target users

### Primary: the privacy-aware power user

A developer, writer, or researcher who uses the web constantly and is increasingly
frustrated by tools that treat their data as the product. They want the tool to do one
thing well and then get out of the way. They likely run an adblocker and are already
familiar with Markdown, UTM parameters, and favicons. They will read the footer line
that says where their data goes, and they will believe it only if the rest of the page
is consistent with it. This user is why every tool page carries a data-location
statement in its own footer.

### Secondary: the casual content creator or marketer

Someone who shares links on social media, writes blog posts, or manages a newsletter.
They paste URLs with tracking junk into the Link Cleaner and write posts in the
Markdown Editor. They do not care about the technology. They care that it works
instantly without asking them to log in, and that they can see what was removed from
their link before they send it to a client. This user is why the Link Cleaner shows
removed and kept parameters as separate visible chips rather than just returning a
cleaned string.

### Tertiary: the Azqato audience and investor researcher

A user who follows Azqato's content on stocks and personal finance. They arrive via
the landing page, use the external tools (Nasdaq 100 Screener, Net Worth Tracker, VIX
Strategy, Protein Tracker) and discover the browser utilities as a bonus. Trust in the
Azqato brand is already established, so this user needs less convincing about the
privacy model and more help finding the tool they came for. This user is why the
external tools sit in the same grid as the hosted ones, with an "external" badge
rather than a separate section.

### Non-user: the enterprise or team buyer

Explicitly not served. There is no team account, no shared workspace, no audit log,
and no support contract. A request that would only make sense for a team is out of
scope by definition.

---

## Goals

1. Every hosted tool works completely offline after first load, with the single
   documented exception of the Favicon Downloader, which needs the network to fetch
   icons.
2. No user data ever reaches any server Azqato owns or controls. There is no such
   server.
3. The site loads in under one second on a standard broadband connection.
4. Adding a new tool takes under two hours from concept to shipped HTML file.
5. The site is discoverable through search for generic, commonly-searched tool names.
6. The brand feels coherent and trustworthy rather than like a side project.
7. The documentation is complete enough that a fresh session, human or model, can make
   a correct change without reading source code first.

---

## Non-goals

- This is not a SaaS product. There will be no user accounts, no database, and no
  backend.
- This is not a tool aggregator or link directory. Every tool linked from the grid must
  be built or directly owned by Azqato.
- This is not a monetized product in v1. No ads, no affiliate links, no freemium gates.
- This is not a framework showcase. No React, Vue, Next.js, or build tooling will be
  introduced.
- This is not a feature-complete alternative to professional tools. These are quick-use
  utilities, not replacements for a real editor or a real analytics suite.
- Mobile-first is not the priority. Tools are usable on mobile but are optimized for
  desktop.
- This is not an offline-installable app. There is no service worker and no PWA
  manifest; "works offline" means the browser cache keeps a previously loaded page
  working, not that the site installs.

---

## User stories

- As a developer, I want to write and preview Markdown in my browser so that I can
  check formatting without installing a local tool or uploading to a service.
- As a developer, I want to copy the rendered HTML out of the Markdown Editor so that I
  can paste it into a CMS that does not accept Markdown.
- As a writer, I want my Markdown draft to survive an accidental tab close so that I do
  not lose work I have not saved anywhere else.
- As a content creator, I want to paste a URL and get a clean version without tracking
  parameters so that I can share links that do not expose my referral source to
  recipients.
- As a marketer, I want to see exactly which parameters were removed and which were
  kept so that I can confirm the tool did not strip a parameter my link actually needs.
- As a designer or developer, I want to download a website's favicon at multiple
  resolutions so that I can use it in mockups or documentation without screenshotting a
  browser tab.
- As a returning Azqato reader, I want to find all of Azqato's tools in one place so
  that I do not need to remember multiple URLs.
- As a privacy-conscious user, I want to confirm that my input never leaves my browser
  so that I can use these tools with sensitive content.
- As a user on a phone, I want the Markdown Editor to remain usable when the panes
  stack so that I can check a document away from my desk.
- As a new contributor or model, I want to read the documentation and understand the
  entire project without reading the source code so that I can add a new tool correctly
  on the first attempt.

---

## Feature list

### MVP, shipped

| Feature | Shipped in | Where it lives |
|---------|-----------|----------------|
| Landing page: sticky topbar, hero, tool grid, about box, footer | v0.1.0 | `index.html` |
| Light and dark theme toggle with localStorage persistence and `prefers-color-scheme` detection on first visit | v0.1.0 | `js/common.js` |
| Shared design system, CSS custom properties, no framework | v0.1.0 | `css/style.css` |
| Global toast notification helper | v0.1.0 | `js/common.js` |
| Global clipboard copy helper with `execCommand` fallback | v0.1.0 | `js/common.js` |
| Markdown Editor: split-pane live preview, seven-button formatting toolbar, draft autosave, copy as HTML, download as `.md`, character count, sample document | v0.1.0 | `markdown-preview.html`, `js/markdown.js` |
| Favicon Downloader: six sizes, preview grid, PNG download, copy direct link, graceful failure per icon | v0.1.0 | `favicon-downloader.html` |
| Link Cleaner: 47 exact-name and 11 prefix tracking rules, removed and kept chips, copy, open, paste from clipboard, Ctrl+Enter shortcut | v0.1.0 | `link-cleaner.html`, `js/linkcleaner.js` |
| External tool cards with `external` badge and diagonal arrow | v0.1.1 | `index.html` |
| Responsive layout, two breakpoints | v0.1.0 | `css/style.css` |
| Site-wide navigation shared with other Azqato properties | v0.1.5 | all five pages |
| Protein Tracker external card | v0.1.7 | `index.html` |
| Character Counter: live character, word, sentence, paragraph and line counts, reading and speaking time estimates, six platform limit bars, draft autosave, copy stats | v0.2.0 | `character-counter.html`, `js/charactercounter.js` |

### Future, post-launch, unordered

Tool candidates, all of which must be buildable with zero dependencies:

- **Color picker and converter**: pick a color, convert between hex, rgb, hsl, oklch
- **Base64 encoder and decoder**: encode text or files, decode base64 strings
- **JSON formatter**: paste minified JSON, get pretty-printed output with a tree view
- **Password generator**: configurable length, character sets, entropy display
- **Image compressor**: client-side compression through the Canvas API, no upload
- **Diff tool**: paste two text blocks, see a line-by-line diff
- **QR code generator**: URL or text to QR, download as PNG or SVG
- **Timestamp converter**: Unix epoch to human-readable, any timezone
- **Bookmark manager**: an editor for a bookmark collection that is advanced in what it
  lets you do but simple to use. It imports the HTML bookmarks file that Chrome exports
  (the Netscape bookmark format, which Firefox, Safari, and Edge all read and write
  too), lets the user edit each bookmark's URL and display name, and exports the same
  format back so the result can be imported into Chrome again. The collection is held in
  browser storage on the user's own device, so the tool never sees a server. Scope,
  constraints, and the open questions on it are set out in the milestone breakdown below

Platform work:

- Search or filter on the landing page tool grid. The trigger condition set for this,
  eight or more tools, has now been met: the grid holds four hosted cards and four
  external ones. It is the next platform item due
- A visible mobile navigation. Below 760px all four topbar links are hidden and tool
  page footers link only Home, so Projects and Support are unreachable from a tool page
  on a phone. This is open question 4 and is the largest remaining accessibility gap
  that the v1.0.0 pass did not close, because it is a design problem rather than an
  attribute
- Custom parameter rules in the Link Cleaner, so a user can add their own removals
- A `/favicon.ico` fallback in the Favicon Downloader for when the Google service fails

---

## Constraints

- **No Node and no build step.** Every tool must be a static HTML file plus the shared
  CSS and JS. A contributor must be able to add a tool without installing anything.
  Node is not installed on the maintenance machine at all, so any workflow that assumes
  `npm` or `npx` will fail there. Python 3.14 is available and is the local server of
  choice.
- **No external JavaScript libraries.** No CDN-loaded jQuery, Lodash, or any
  third-party script that could inject code or fail when the CDN does.
- **Hosting is static only.** The deployment target is GitHub Pages. No server-side
  execution is available, so anything requiring a secret, a proxy, or a scheduled job
  is out of reach.
- **Single developer.** There is no team and no reviewer. Documentation and conventions
  must be explicit enough that a model can contribute without a human in the loop.
- **No budget.** Every third-party service used must have a free tier that requires no
  credit card. The Google gstatic favicon service qualifies; a paid favicon API would
  not.
- **The repository is public.** Nothing in it can be secret, which is convenient
  because nothing in it needs to be.

---

## Assumptions

These are accepted as true without full information. Each one, if wrong, changes
something.

1. Users have a modern browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+). No
   IE11 support is required. *If wrong:* `color-mix`, `clamp`, and
   `navigator.clipboard` all fail, which would break the topbar, the hero, and every
   copy button.
2. The Google gstatic favicon service (`t3.gstatic.com/faviconV2`) remains publicly
   accessible without authentication. *If wrong:* the Favicon Downloader breaks
   entirely and has no fallback. This is the single largest external dependency risk in
   the project.
3. Azqato's external tools stay at their current GitHub Pages URLs. *If wrong:* the
   external cards on the landing page point at 404s and must be updated by hand. There
   is no link checker.
4. Users who find the site through search are looking for the generic term ("link
   cleaner", "markdown editor"), not for the Azqato brand. This assumption is the
   entire basis of the naming tenet.
5. No analytics are needed in v1. *Consequence:* every metric in the Metrics section
   below is currently unmeasured. They are targets, not readings.
6. `localStorage` is available and not disabled. *If wrong:* the theme toggle stops
   persisting and the Markdown draft stops saving. Neither is wrapped in a `try/catch`,
   so in a browser that throws on `localStorage` access (Safari private mode
   historically did) the scripts would throw. This has not been tested.

---

## Success criteria

- All four hosted tools function correctly on Chrome, Firefox, Edge, and Safari with
  no network request carrying user input.
- A new tool can be added by following the documented pattern, modifying only
  `index.html` plus the new tool's own files.
- The landing page scores 90 or above on Lighthouse for Performance, Accessibility, and
  Best Practices.
- The site loads in under one second on a 4G connection, measured by Lighthouse.
- The documentation is complete enough that a model with no prior context can correctly
  implement a new tool on the first attempt.

> **Uncertain.** None of the Lighthouse criteria above have been measured. They are the
> stated bar, not a recorded result. Given the known accessibility gaps listed in
> `DESIGN.md`, the Accessibility score in particular is unlikely to be at 90 today.

---

## Tenets

Ordered by priority. When two tenets conflict, the higher one wins.

### 1. Privacy is the floor, not a feature

Every tool must work without transmitting user input to any server. This is not a
selling point, it is a precondition. A tool that uploads data to process it, even
temporarily, is not eligible for this site regardless of how useful it might be. When
building a new tool the first question is whether it can run entirely in the browser.
If the answer is no, the tool belongs on a different site. This tenet outranks
usefulness, and it has already cost the project features: syntax highlighting in
Markdown code blocks is absent because every good implementation is a library.

### 2. Generic names over clever names

Every tool is named using the simplest, most searchable descriptor of what it does.
"Markdown Editor" not "Inkdown". "Link Cleaner" not "URLSanitizer Pro". The name should
be what a user would type into a search engine to find exactly this kind of tool. Never
reuse another product's brand name, even when that name reads as a generic term. This
tenet exists because it was violated: the Markdown Editor shipped as "Markdown Live
Preview", which is the brand of markdownlivepreview.com, and had to be renamed in
v0.1.1.

### 3. Zero dependencies, zero build step

No npm, no bundler, no CDN-loaded libraries. A contributor opens a text editor, writes
HTML, CSS, and JavaScript, and it works. The moment a build step is introduced the
barrier to contribution rises and long-term maintainability drops, because a build step
rots and plain files do not. Vanilla browser APIs are sufficient for every tool class
on the roadmap. The cost of this tenet is real and is accepted: the Markdown parser is
homegrown and imperfect, and there is no test runner.

### 4. One file per tool

Each tool lives in its own HTML file at the repository root. Shared logic lives in
`js/common.js`. Tool-specific logic lives either inline in the tool's HTML or in a
dedicated file in `/js/`. A tool must never depend on another tool's files. This makes
tools individually shareable, debuggable, and removable, and it means deleting a tool
is a delete rather than an unpicking.

### 5. Say where the data goes, on the page

Each tool states in its own footer where its data goes, in one plain line. This is not
marketing copy, it is a factual claim the code has to keep. The Favicon Downloader's
line names Google because that tool really does contact Google; the other two say the
data never leaves the device because it does not. A new tool that cannot write a true
line of this kind is a tool with a privacy problem it has not noticed yet.

### 6. Ship fast, document thoroughly

Tools should be simple enough to ship in one session. Documentation should be thorough
enough that any subsequent session, human or model, can pick up where the last one
left off without re-reading source code. When in doubt, add to the docs rather than to
the tool.

---

## Roadmap

### Current phase: Stable, v1.0.x

The site is deployed and working. Four hosted tools, four external links, a complete
design system, shared JavaScript, and a full documentation suite are all in place. The
focus now is adding tools and closing the accessibility gaps recorded in `DESIGN.md`.

### Milestone table

| Milestone | Target | Status |
|-----------|--------|--------|
| v0.1.0 - Initial build | 2026-06-27 | Complete |
| v0.1.4 - Public deployment to GitHub Pages | 2026-06-27 | Complete |
| v0.1.8 - Documentation audit and em dash sweep | 2026-08-25 | Complete |
| v0.2.0 - Second tool batch, first tool shipped | 2026-08-31 | Complete |
| v1.0.0 - Accessibility pass and first stable release | 2026-08-31 | Complete |
| v1.1.0 - Bookmark Manager | TBD | Planned |

> **Resolved in v1.0.0.** This table used to carry a row reading "v1.0.0 - Public
> deployment to GitHub Pages, Complete" while the changelog was still at v0.1.x, so the
> two records contradicted each other. The launch it described was real and happened on
> 2026-06-27; the version number attached to it was wrong, because that work is recorded
> in `PATCHNOTES.md` as v0.1.4. The row has been relabelled v0.1.4 and the number v1.0.0
> reassigned to the release that earned it, the accessibility pass of 2026-08-31.
> Nothing about the launch was deleted; only the label moved.

### v0.1.0 feature breakdown, complete

- Landing page and design system
- Markdown Editor
- Favicon Downloader
- Link Cleaner
- External tool cards (Screener, Net Worth Tracker, VIX Strategy)
- Documentation suite (README, PRD, DESIGN, PATCHNOTES)

### v0.2.0, complete

- **Character Counter, shipped 2026-08-31.** Live counts for characters with and without
  spaces, words, sentences, paragraphs, and lines, plus reading and speaking time
  estimates and six platform limit bars
- One or two further tools from the Future list, exact tools not yet chosen
- Landing page copy revisit once the grid exceeds eight cards

### v1.1.0 planned: Bookmark Manager

A larger tool than anything shipped so far, and the first one that owns a user's data
rather than transforming a single input, so it is given its own milestone rather than
being folded into a tool batch.

**Scope:**

- Import the HTML bookmarks file Chrome exports, the Netscape bookmark format, which is
  a nested `<DL>` list of `<DT><A HREF="..." ADD_DATE="...">Name</A>` entries. Firefox,
  Safari, and Edge read and write the same format, so an importer written once serves
  every browser
- Edit each bookmark's URL and display name, which are the two fields the requirement
  names and the two that matter for a re-import
- Add and delete bookmarks, since an editor that cannot remove a dead link is not an
  editor
- Export the same format back, so the result imports cleanly into Chrome
- Hold the collection in the browser on the user's own device, under a documented
  `localStorage` key, so the tool works offline and contacts nothing
- "Advanced but simple": the power comes from bulk operations (search and filter across
  the whole collection, edit in place without a modal, multi-select delete) rather than
  from a dense interface. The default view should be a plain list a person can scan

**Open design questions to resolve before building, not now:**

- Folder structure. Chrome's export is a tree, and preserving folders on a round trip is
  most of the parsing difficulty. Flattening the tree is far simpler and loses the user's
  organisation. This decision sets the size of the whole tool
- Storage limit. `localStorage` gives roughly 5MB per origin. A large bookmark
  collection with favicons could approach that, and the project currently has no guard on
  any storage write. IndexedDB has no practical limit but is a new API surface for this
  codebase. Measure a real export before choosing
- Whether to show favicons. It would make the list far easier to scan, and the Favicon
  Downloader already has the fetching code, but it would mean sending every bookmarked
  domain to Google. That is a direct tension with tenet 1 and must be opt-in and off by
  default if it happens at all
- Whether import replaces or merges with an existing collection. Replacing silently
  destroys work; merging needs a duplicate rule

**Constraints it must respect:** no dependencies, so the Netscape format parser is
hand-written like the Markdown parser; no server, so import and export are both local
file operations through `FileReader` and a Blob download; and the collection is the
user's data, so the storage key goes on the public surface list and can never be renamed
without a migration read.

### v1.0.0 accessibility pass, complete 2026-08-31

Every item on this milestone shipped, and the milestone is the reason the project is at
v1.0.0 rather than v0.2.1.

- `prefers-reduced-motion` CSS block. Done. It is the last block in `css/style.css` so
  that it wins over every transition declared above it, with durations set to 1ms rather
  than 0 so `transitionend` still fires and nothing waiting on it is left hanging
- Skip-to-content link on all pages. Done. `.skip-link` is the first focusable element
  on all five pages, positioned off-screen until focused, targeting `#main`
- `role="status"` on the toast. Done, in `js/common.js` at the point the element is
  created, so every page gets it without repeating the attribute in five files
- Labels for the unlabelled inputs. Done. `#fav-input` and `#md-input` now carry
  `<label class="sr-only">` elements, using a new visually-hidden utility class
- ARIA live region on the Markdown preview. **Deliberately not done.** See below
- Lighthouse accessibility score of 95 or above, measured rather than assumed.
  **Partially met, and this item was written wrong.** See below

> **The Markdown preview does not get `aria-live`, and that is a decision rather than an
> omission.** The pane re-renders on every keystroke. An `aria-live` region announces its
> new content every time it changes, so a screen reader user typing a paragraph would
> hear the entire document read back after every character. That is worse than silence.
> The pane instead got `role="region"` and `aria-label="Rendered preview"`, which makes
> it a named landmark the user can jump to and read at a moment they choose. If this is
> ever revisited, the correct pattern is a debounced `aria-live="polite"` region carrying
> a short summary such as "preview updated, 12 paragraphs", never the rendered document.

> **On the Lighthouse target.** This item cannot be met as written on the current
> machine, and the audit that wrote it should have caught that. Lighthouse needs Node,
> and Node is not installed; see Technical requirements. What was run instead is a
> structural accessibility audit written for the purpose: a throwaway harness that
> fetched all five pages, parsed each with `DOMParser`, and asserted on `lang`, landmark
> elements, exactly one `h1`, heading-level order, duplicate ids, `img` `alt`,
> form-control labelling, accessible names on every button and link, orphan labels, and
> the presence of a skip link. All five pages pass all of it. That is a real result and
> it is not a Lighthouse score. Lighthouse also measures colour contrast, tap-target
> size, and viewport behaviour, none of which that harness checks. The honest status is
> that every structural gap this project had written down is now closed, and the numeric
> target stays open until a machine with Node is available. Do not mark this item met
> until a real score exists.

### Explicitly deferred

| Feature | Reason deferred |
|---------|----------------|
| Search or filter on the landing page | Was deferred until eight or more tools exist. **That condition is now met**, at four hosted and four external cards, so this is no longer deferred: it has moved to the Future feature list as the next platform item |
| Analytics | Privacy first. Revisit only with a privacy-respecting option such as Plausible |
| Dark mode on the external tools | Those live in separate repositories and are out of scope here |
| PWA and service worker | Adds a caching layer and an update-invalidation problem in exchange for something the browser cache already mostly does |
| Syntax highlighting in Markdown code blocks | Every good implementation is a library, which breaks tenet 3 |
| Nested list support in the Markdown parser | The parser flattens continuation lines into the parent item. Fixing it means a real block-level recursion pass, which is a rewrite rather than a patch |
| A test suite | No runtime is installed on the maintenance machine. Verification is manual and documented in Working Practice below |
| Custom removal rules in the Link Cleaner | Needs a rules UI and a storage format. Real feature, not a quick one |

---

## Metrics

Every number in this section is a target. None is currently measured, because no
analytics are installed (assumption 5). The measurement column says what would capture
it, not what is capturing it today.

### North star

**Weekly active sessions**: the number of unique browser sessions per week that
interact with at least one tool. It is the north star because it measures practical
value delivered rather than curiosity. A visit that opens the landing page and leaves
is not the outcome the project exists for.

### Acquisition

| Metric | Target | Timeframe | Measurement method |
|--------|--------|-----------|--------------------|
| Organic search impressions | 500 per month | 3 months post-launch | Google Search Console |
| Click-through rate from search | 3% or above | 3 months post-launch | Google Search Console |
| Referral traffic from other Azqato properties | No target set | Ongoing | Privacy-respecting analytics, not yet installed |

### Engagement

| Metric | Target | Timeframe | Measurement method |
|--------|--------|-----------|--------------------|
| Average tools used per session | 1.5 or above | 3 months post-launch | Analytics events, not yet installed |
| Markdown drafts persisted to localStorage | Proxy for repeat use | Ongoing | Not externally measurable by design |
| Successful Link Cleaner operations | No target set | Ongoing | Analytics event on a successful clean |

### Retention

| Metric | Target | Timeframe | Measurement method |
|--------|--------|-----------|--------------------|
| Returning visitors | 20% or above | 6 months post-launch | Privacy-respecting analytics |
| Bookmark rate | Not directly measurable | n/a | Proxy: share of direct traffic |

### Performance

| Metric | Target | Measurement method |
|--------|--------|--------------------|
| Lighthouse Performance | 90 or above | Lighthouse in Edge DevTools |
| First Contentful Paint | Under 1.0s | Lighthouse |
| Total Blocking Time | Under 50ms | Lighthouse |
| Page weight, `index.html` plus CSS plus JS | Under 100KB uncompressed | Manual byte count |
| JavaScript errors on load | Zero | Browser console |
| Uptime | Whatever GitHub Pages provides | GitHub status page. No independent monitor exists |

Measured page weights as of 2026-08-31:

| File | Bytes |
|------|-------|
| `index.html` | 11,035 |
| `css/style.css` | 16,594 |
| `js/common.js` | 2,020 |
| `js/markdown.js` | 6,984 |
| `js/linkcleaner.js` | 2,246 |
| `js/charactercounter.js` | 2,319 |
| `markdown-preview.html` | 7,311 |
| `favicon-downloader.html` | 6,784 |
| `link-cleaner.html` | 6,264 |
| `character-counter.html` | 9,168 |

Landing page total (`index.html` plus `style.css` plus `common.js`): 29,649 bytes.
Heaviest single page (Markdown Editor: HTML plus CSS plus `common.js` plus
`markdown.js`): 32,909 bytes. The Character Counter is 30,101 bytes. All are
comfortably inside the 100KB target, though note that `style.css` is shared and grows
with every tool, so it is the figure to watch as the grid fills out.

### Reporting cadence

Performance metrics are checked whenever a tool is added or the CSS changes. Analytics
metrics have no cadence because there are no analytics. If analytics are ever added,
the cadence is monthly.

---

## Runbook

This section carries everything needed to run the project. The README deliberately
does not. Assume the reader has just cloned the repository and has nothing else.

### Prerequisites

| Requirement | Version needed | Notes |
|-------------|---------------|-------|
| Git | Any recent version | Only for cloning and deploying |
| A modern browser | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ | For using and testing the site |
| Python | 3.x, any version. The maintenance machine has 3.14.3 | Optional, only for a local HTTP server |
| Node.js | Not required and not installed | Any instruction assuming `npm` or `npx` will fail on the maintenance machine |
| Package manager | None | There is no manifest to install from |

There is no `package.json`, no lockfile, no `.env`, no config file of any kind.

### Local setup, from a fresh machine

1. Install Git if it is not present (https://git-scm.com).
2. Clone and enter the repository:
   ```bash
   git clone https://github.com/Azqato/tools.git
   cd tools
   ```
3. Open `index.html` in a browser. That is the whole setup.

Optional local HTTP server, which avoids the `file://` limitations described under
Environment configs:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`. Port 8080 is a convention in this project's docs,
not a value stored anywhere in the code. Nothing breaks if a different port is used.

### Build

There is no build. The source is the output. Nothing is compiled, minified, bundled, or
generated. What is in the repository is byte-for-byte what is served.

### Deploy

**Production (GitHub Pages), the only environment that exists:**

1. Commit the change on `master`.
2. `git push origin master`.
3. GitHub Pages rebuilds automatically from `master` at the repository root and serves
   `index.html` at https://azqato.github.io/tools/.
4. Wait roughly one minute, then hard-reload the live URL and confirm the change is
   present. There is no build log to watch beyond the Actions tab in the GitHub UI.

The Pages source setting is `master` branch, `/ (root)`. It is configured once in the
repository settings and has not changed since launch.

**There is no staging environment.** A local HTTP server on port 8080 is the closest
equivalent, and it is where every change should be checked before pushing. This is a
deliberate consequence of having no build step: local and production serve identical
bytes, so the only difference between them is the URL.

**Other static hosts (Netlify, Vercel, Cloudflare Pages)**, if ever needed: connect
the repository, set the publish directory to `/`, and leave the build command empty.
None is currently in use.

### Rollback

There is no artifact to roll back, so rollback is a git operation followed by a push:

```bash
git revert <sha>          # creates a new commit undoing that change
git push origin master    # Pages redeploys within about a minute
```

To restore a specific file to an earlier state:

```bash
git checkout <sha> -- path/to/file
git commit -m "revert: restore path/to/file to <sha>"
git push origin master
```

Never force-push to `master`. Pages serves whatever `master` points at, so a rewritten
history is a live rewrite with no undo.

### Environment configs

| Environment | How it is reached | What differs |
|-------------|------------------|--------------|
| Local, `file://` | Open `index.html` from disk | `navigator.clipboard.readText` is blocked, so the Link Cleaner's "Paste from clipboard" button fails and falls back to a toast. `fetch` to gstatic may be blocked by the browser's file-origin CORS rules, so favicon downloads fall back to opening a new tab. |
| Local, HTTP server | `python -m http.server 8080` | Everything works as in production. This is the correct way to test. |
| Production | https://azqato.github.io/tools/ | Served over HTTPS from GitHub Pages. All browser APIs available. Favicon Downloader requires an internet connection. |

There are no environment-specific config files and no environment-specific code paths.
The same files are served in every environment.

### Environment variable reference

**There are none.** No key names, no required variables, no optional variables. The
project reads no environment at runtime, has no secrets, and has nothing that could be
accidentally committed. If a future tool needs a secret, that tool cannot live here,
because there is no server to hold the secret and a static site cannot keep one.

### Common errors

| Error or symptom | Likely cause | Fix |
|------------------|-------------|-----|
| Page flashes light before switching to dark | `common.js` runs at the end of `<body>`, after the markup with `data-theme="light"` has parsed | Move the theme read into an inline `<script>` in `<head>`. Recorded as technical debt below |
| Favicon images all show "n/a" | An ad blocker is blocking `t3.gstatic.com`, or the service is down | Allowlist the domain in the blocker. There is no client-side workaround |
| Favicon download opens a new tab instead of saving | The gstatic response failed the CORS check, so `fetch` threw and the code fell back to `window.open` | Expected behaviour. Right-click and save. A proxy would fix it and would violate tenet 1 |
| "Paste from clipboard" does nothing but toast | Page is on `file://`, or the browser denied clipboard read permission | Serve over HTTP, or paste manually with Ctrl+V |
| Markdown table renders as a paragraph | The row is missing its leading or trailing `\|`, or the separator row does not match `\|[\s:\|-]+\|` | Reformat the table. This is a parser limitation, not a bug to fix in the page |
| Nested list renders flat | The parser does not support nesting. Indented continuation lines are folded into the parent item | Known limitation, deferred. See the deferred table above |
| A `\|` inside a table cell splits the cell | Cells are split on a naive `String.split("\|")`. Pipe escaping is not implemented | Avoid pipes in table cells, or use inline code around them (which does not help, since the split happens first) |
| Link Cleaner strips a parameter that was needed | The parameter name matches a rule, most likely `amp`, `spm`, `scm`, or `trk`, which are generic enough to collide with legitimate use | Copy the original URL and re-add the parameter by hand. Custom rules are on the Future list |
| Character Counter sentence count looks too high | The text contains abbreviations such as "e.g." or "Mr. Smith", which the terminator regex reads as sentence ends | Expected limitation. Fixing it needs an abbreviation dictionary, which is a dependency. The count is documented as an estimate |
| Character Counter character count differs from another tool's | This tool counts UTF-16 code units, matching `maxlength` and platform limits. A tool counting code points reports fewer for emoji | Not a bug. The page shows a note whenever the two differ, and reports both numbers |
| Live site does not show a pushed change | Pages has not finished rebuilding, or the browser cached the old file | Wait a minute and hard-reload. Check the Actions tab for a failed deploy |

### Monitoring

There is no monitoring infrastructure and none is planned for v1. The available checks
are:

- **Errors:** open the browser console on each page and confirm it is empty on load.
- **Uptime:** GitHub Pages status at https://www.githubstatus.com. There is no
  independent uptime monitor and no alerting. If the site goes down, nobody is paged.
- **Performance:** run Lighthouse manually from Edge DevTools.
- **Logs:** there are none. There is no server, so there is no access log, no error
  log, and no way to know a user hit a problem.

This is an accepted consequence of the architecture rather than an oversight. A static
site with no backend has nothing to monitor except whether the host is up.

---

## Technical requirements

### System architecture

Fully static and client-side only. There is no server component of any kind, no
serverless function, and no API owned by this project.

```
User's browser
  └── loads static files from GitHub Pages (or the local filesystem)
        ├── css/style.css        design system, loaded by all five pages
        ├── js/common.js         theme, toast, clipboard. Loaded by all five pages
        ├── js/markdown.js       Markdown parser. Markdown Editor only
        ├── js/linkcleaner.js    URL param stripper. Link Cleaner only
        ├── js/charactercounter.js  Text statistics. Character Counter only
        └── inline <script>      per-page glue code, at the end of each tool page
```

Network requests the browser makes:

- `GET` for the HTML, CSS, and JS files. Normal page load.
- `GET https://t3.gstatic.com/faviconV2?...`, one per size per lookup, six per search.
  Favicon Downloader only.

No request carries user data other than the domain typed into the Favicon Downloader.

### Tech stack

| Technology | Version or spec | Role |
|-----------|----------------|------|
| HTML | HTML5 | Page structure, semantic markup |
| CSS | Level 3 and later: custom properties, grid, flexbox, `color-mix`, `clamp`, `backdrop-filter` | Design system, layout, theming |
| JavaScript | ES5 syntax with modern browser APIs. No transpilation | All interactive logic |
| `localStorage` | Web Storage API | Theme preference, Markdown draft |
| `URL` and `URLSearchParams` | WHATWG URL | Link Cleaner parsing and rewriting |
| `Blob` and `URL.createObjectURL` | File API | `.md` download, favicon PNG download |
| `fetch` | Fetch API | Favicon image retrieval |
| `navigator.clipboard` | Async Clipboard API | Copy and paste, with an `execCommand` fallback |
| `window.matchMedia` | CSSOM View | First-visit dark mode detection |
| Google gstatic favicon service | Unversioned, undocumented | Favicon image source |
| GitHub Pages | n/a | Hosting |
| Git | n/a | Version control and deploy mechanism |

**No frameworks, no libraries, no build tools, no package manager, no test runner.**

The JavaScript deliberately uses ES5 syntax (`var`, `function`, no arrow functions, no
template literals outside string data, no `const`/`let`) even though every target
browser supports newer syntax. This is a house style, not a compatibility requirement.
See Conventions.

### Folder structure

```
/
├── README.md                   Public front door, written for a general reader
├── index.html                  Landing page: hero, tool grid, about box
├── markdown-preview.html       Markdown Editor tool page
├── favicon-downloader.html     Favicon Downloader tool page
├── link-cleaner.html           Link Cleaner tool page
├── character-counter.html      Character Counter tool page
├── css/
│   └── style.css               The entire design system. Every page loads this
├── js/
│   ├── common.js               Theme toggle, toast, copyText. Loaded by every page
│   ├── markdown.js             Self-contained Markdown to HTML parser
│   ├── linkcleaner.js          Tracking-parameter detection and removal
│   └── charactercounter.js     Text statistics and duration formatting
└── docs/
    ├── PRD.md                  This file
    ├── DESIGN.md               Visual system, component rules, accessibility
    └── PATCHNOTES.md           Versioned changelog
```

There are no other directories, no build output directory, no `node_modules`, and no
CI configuration files.

> **Resolved in v1.0.0.** This tree previously listed `initialconcept.txt`, the original
> brief, which was never committed to git. The author's decision was to delete it rather
> than commit it, on the grounds that its content is now fully captured in the Problem
> statement above. The file is gone from the working tree and from this tree. Nothing
> was lost: the three inspiration URLs and both original constraints are recorded in
> prose at the top of this document.

### Data models

There is no server-side data. The only persisted state is in the browser's
`localStorage`, and there are exactly three keys.

| Key | Type | Value | Written by | Read by | Lifetime |
|-----|------|-------|-----------|---------|----------|
| `azqato-theme` | string | `"light"` or `"dark"` | `js/common.js`, on every toggle click | `js/common.js`, at load, before anything else | Until the user clears site data |
| `azqato-md-draft` | string | The full raw Markdown in the editor | `markdown-preview.html`, on every `input` event and on every programmatic render | `markdown-preview.html`, at load | Until the user clears site data |
| `azqato-cc-draft` | string | The full raw text in the Character Counter | `character-counter.html`, on every `input` event and on every programmatic render | `character-counter.html`, at load | Until the user clears site data |

No key is namespaced beyond the `azqato-` prefix, and none is versioned. If a draft
format ever changes (both drafts are plain strings today, so it is hard to see how)
there is no migration path. The two draft keys are independent: the Markdown Editor and
the Character Counter never see each other's text.

No cookies. No IndexedDB. No `sessionStorage`. No service worker cache.

**Absence of write guards.** None of the three `localStorage.setItem` calls is wrapped
in a `try/catch`. In a browser where storage is disabled or the quota is exhausted, the
write throws and the surrounding handler dies. For the theme toggle that means the theme
changes visually but does not persist. For the Markdown Editor and the Character
Counter the write is the last statement in `render()`, so the visible output is already
updated by the time it throws, and the only loss is persistence. None of this has been
observed in practice, and the ordering that limits the damage is luck rather than
design: a new tool that writes before rendering would break visibly.

**In-memory state, not persisted:**

| Tool | Name | Type | Purpose |
|------|------|------|---------|
| Link Cleaner | `current` | string | The most recently cleaned URL, read by the Copy and Open buttons |
| Link Cleaner | `EXAMPLE` | string | The demo URL loaded by "Try an example" |
| Favicon Downloader | `SIZES` | number array | `[16, 32, 48, 64, 128, 256]` |
| Markdown Editor | `SAMPLE` | string | The document shown on a first visit |
| Character Counter | `current` | object | The most recent `CountResult`, read by the Copy stats button |
| Character Counter | `LIMITS` | array | Platform name and character maximum for the six limit bars |
| Character Counter | `STATS` | array | Which `CountResult` keys to show as cells, and their labels |
| Character Counter | `SAMPLE` | string | The text loaded by "Try an example" |
| `common.js` | `toastEl`, `timer` | element, timeout id | The toast singleton and its dismiss timer |

### API design, internal data flow

There is no HTTP API. The equivalent contract is the set of functions attached to
`window` by the shared scripts, plus the one outbound URL the Favicon Downloader
builds.

**`js/common.js`** attaches two globals and self-executes the theme logic:

| Function | Parameters | Returns | Behaviour | Error states |
|----------|-----------|---------|-----------|-------------|
| `window.toast(msg)` | `msg: string` | `undefined` | Creates the toast element on first call, sets its text, forces a reflow, shows it, and hides it after 1900ms. Re-entrant: a second call resets the timer | None. Cannot fail |
| `window.copyText(text, okMsg)` | `text: string`, `okMsg?: string` | `undefined` | Writes to the clipboard through `navigator.clipboard.writeText`, then toasts `okMsg` or the default "Copied to clipboard". Falls back to a hidden `<textarea>` plus `document.execCommand("copy")` when the async API is missing or rejects | If the fallback `execCommand` throws it is swallowed silently and **no toast appears**. The user gets no signal that the copy failed |

The theme block runs immediately on load: it reads `azqato-theme`, applies it if
present, otherwise applies `"dark"` when `matchMedia("(prefers-color-scheme: dark)")`
matches, otherwise leaves the `data-theme="light"` already on `<html>`. A single
delegated `click` listener on `document` handles any `[data-theme-toggle]` element.

**`js/markdown.js`** attaches one global:

| Function | Parameters | Returns | Behaviour |
|----------|-----------|---------|-----------|
| `window.mdToHtml(src)` | `src: string` | `string` of HTML | Line-based block parser. Normalises CRLF, splits on newline, walks the lines once, and emits block HTML joined by newlines. Recurses into itself for blockquote contents |

Block constructs recognised, in the order the parser tests them: fenced code block,
horizontal rule, ATX heading, blockquote, table, list, blank line, paragraph.

Inline handling runs on already-escaped text inside `withCodeSpans()`, which first
lifts inline code spans out behind a sentinel, applies the inline rules, then puts the
code spans back. Inline rules, in order: images, links, bold-italic, bold, italic
(asterisk), bold-italic (underscore), bold (underscore), italic (underscore),
strikethrough, hard line break on two trailing spaces.

Supported: ATX headings H1 to H6 (with optional trailing hashes stripped), bold
(`**`, `__`), italic (`*`, `_`), bold-italic (`***`, `___`), strikethrough (`~~`),
inline code, fenced code blocks with an optional language class, links, images (both
with an optional `"title"`), unordered lists (`-`, `*`, `+`), ordered lists (`1.`),
task lists (`[ ]`, `[x]`), blockquotes (recursive, so a quote can contain any block),
horizontal rules (`---`, `***`, `___`), GFM tables with per-column alignment, hard line
breaks.

Not supported, deliberately: nested lists, footnotes, definition lists, setext
headings, reference-style links, autolinks, and raw HTML passthrough. The last is a
security decision, not an omission: everything is escaped before parsing, so a
`<script>` in the source renders as visible text.

Escaping and safety:

- `escapeHtml()` replaces `&`, `<`, `>` before any parsing. It does **not** escape
  quotes; `escapeAttr()` adds `"` on top of it and is used for every attribute value.
- Link hrefs pass a protocol whitelist, `^(https?:|mailto:|#|\/|\.)`. Anything else,
  including `javascript:` and `data:`, is replaced with `#`.
- Image `src` values are escaped as attributes but are **not** protocol-whitelisted. A
  `data:` or `javascript:` image source survives. `javascript:` in an `src` does not
  execute in any modern browser, and a `data:` image is inert, so the practical risk is
  low, but the asymmetry with links is unintentional. Recorded as technical debt.
- Every emitted `<a>` carries `rel="noopener noreferrer"`.

**`js/linkcleaner.js`** attaches one global:

| Function | Parameters | Returns |
|----------|-----------|---------|
| `window.cleanUrl(raw)` | `raw: string` | `CleanResult` |

```js
CleanResult = {
  valid: boolean,   // false when input is empty or unparseable
  clean: string,    // the cleaned URL, present only when valid
  removed: [{ key: string, value: string }],  // one entry per removed value
  kept: [string],   // preserved parameter keys, de-duplicated, order preserved
  input: string     // present only on the parse-failure path
}
```

Behaviour: trims the input, prepends `https://` when there is no scheme, parses with
`new URL()` inside a `try/catch`, collects the parameter keys in order and
de-duplicates them, then for each key either deletes every value (recording each in
`removed`) or records the key in `kept`. Finally it strips a trailing `?` left behind
when every parameter was removed.

Removal rules. A key matches if its lowercase form is in the exact set, or if it starts
with one of the prefixes.

*Exact names (47 entries, all live):* `fbclid`, `gclid`, `gclsrc`, `dclid`, `wbraid`,
`gbraid`, `msclkid`, `yclid`, `twclid`, `igshid`, `igsh`, `mc_eid`, `mc_cid`, `_hsenc`,
`_hsmi`, `vero_id`, `vero_conv`, `oly_anon_id`, `oly_enc_id`, `rb_clickid`, `s_cid`,
`ml_subscriber`, `ml_subscriber_hash`, `spm`, `scm`, `ref_src`, `ref_url`,
`fb_action_ids`, `fb_action_types`, `fb_ref`, `fb_source`, `action_object_map`,
`action_type_map`, `action_ref_map`, `gs_l`, `amp`, `_ga`, `_gl`, `trk`, `trkcampaign`,
`sc_channel`, `sc_campaign`, `sc_geo`, `sc_country`, `sc_outcome`, `ttclid`,
`li_fat_id`.

*Prefixes (11):* `utm_`, `pk_`, `mtm_`, `matomo_`, `hsa_`, `vgo_`, `oly_`, `_branch_`,
`__hs`, `ck_`, `mkt_tok`.

One note on that list, and one standing rule that came out of it.

**Fixed in v1.0.0.** Until v1.0.0 this list had 48 entries, two of which could never
match. `" trk"` carried a leading space, and `trkCampaign` carried capitals, while
`shouldRemove` lowercases the key before the set lookup but does not trim it. Both were
repaired: `" trk"` was deleted outright rather than trimmed, because `"trk"` was already
present on the same line and doing the obvious fix would have produced a duplicate in a
`Set`; `trkCampaign` became `trkcampaign`. The visible consequence is that a URL
carrying `trkCampaign` in any casing is now stripped where before it passed through
untouched. `trk` behaved correctly the whole time and is unchanged.

**The standing rule this produced: every entry in `EXACT` must be lowercase and must
have no surrounding whitespace.** `shouldRemove` lowercases the incoming key but does
not trim it, so the set is the only place that invariant can be enforced, and it is
enforced by eye. An entry that violates it does not throw and does not warn. It silently
does nothing, which is exactly why the two dead entries survived from v0.1.0 to v1.0.0
without anyone noticing. When adding a rule, type it in lowercase and check it against
the live list for a duplicate before committing.

**`js/charactercounter.js`** attaches two globals. Like the other two tool modules it
never touches the DOM, so every function is a pure function over its arguments:

| Function | Parameters | Returns | Behaviour |
|----------|-----------|---------|-----------|
| `window.countText(src)` | `src: string` | `CountResult` | Computes every statistic in one pass over the string. Never throws: `null`, `undefined`, and non-strings are coerced with `String()`, and an empty string returns all zeros |
| `window.formatDuration(total)` | `total: number` of seconds | `string` | Formats as `"0 sec"`, `"42 sec"`, `"2 min"`, or `"1 min 35 sec"`. Whole minutes omit the seconds part |

```js
CountResult = {
  characters: number,          // UTF-16 code units, what maxlength counts
  charactersNoSpaces: number,  // characters with all whitespace removed
  codePoints: number,          // Unicode code points, what a reader sees
  words: number,
  sentences: number,
  paragraphs: number,
  lines: number,
  readingSeconds: number,      // words / 238 wpm, rounded
  speakingSeconds: number      // words / 130 wpm, rounded
}
```

Counting rules, stated exactly because they are judgement calls rather than facts:

- **characters** is `src.length`, UTF-16 code units. An emoji or other astral character
  counts as 2. This is deliberate: it matches what `maxlength` and what every platform
  limit in the tool actually enforce, which is the tool's main use. **codePoints** is
  the count a human would give, and the page shows a note explaining the gap whenever
  the two differ, rather than quietly picking one.
- **words** splits the trimmed string on `/\s+/`. Hyphenated and apostrophised forms
  count as one word. Whitespace-only input is zero, not one.
- **sentences** counts runs of `.`, `!`, `?`, or `…` followed by whitespace or the end
  of the string, and falls back to 1 when the text has content but no terminator. **This
  is an estimate and will overcount abbreviations** such as "e.g." or "Mr. Smith". A
  correct implementation needs an abbreviation dictionary, which is a dependency.
- **paragraphs** splits on a blank line (`/\n\s*\n/`) and counts the non-empty pieces.
- **lines** counts newline-separated pieces, handling CRLF, LF, and lone CR. An empty
  string is 0 lines rather than 1.
- **readingSeconds** uses 238 words per minute, the pooled mean for adult silent reading
  of English prose from Brysbaert's 2019 meta-analysis. **speakingSeconds** uses 130,
  the middle of the usual range for a prepared talk. Both constants are at the top of
  the module and are the only numbers worth arguing about in it.

**Character Counter page glue**, inline in `character-counter.html`: holds the `LIMITS`
array (name and maximum for X, SMS, meta description, title tag, Instagram, LinkedIn),
the `STATS` display list, and the `SAMPLE` text. Limit bars are measured against
`characters` and their fill width is clamped to 100%, so an over-limit bar reads as full
rather than overflowing its track.

**Favicon Downloader**, inline in `favicon-downloader.html`:

| Function | Parameters | Returns | Behaviour and error states |
|----------|-----------|---------|---------------------------|
| `normalizeDomain(raw)` | `raw: string` | lowercase host or `null` | Trims, strips any `scheme://`, strips everything from the first `/`, strips a leading `www.`, then validates against `^[a-z0-9.-]+\.[a-z]{2,}$`. Returns `null` on failure, which the submit handler turns into a toast |
| `faviconUrl(domain, size)` | `domain: string`, `size: number` | URL string | Builds `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=<size>&url=<encoded https://domain>` |
| `download(url, name)` | `url: string`, `name: string` | `undefined` | `fetch` with `mode: "cors"`, converts to a Blob, triggers an anchor download, revokes the object URL, toasts success. On any failure opens the URL in a new tab and toasts the right-click instruction |
| `render(domain)` | `domain: string` | `undefined` | Clears the results area and builds six `.fav-item` tiles. Each image gets an `onerror` handler replacing the thumb with "n/a" |

The domain regex rejects internationalised domains in their Unicode form (it allows
only `a-z0-9.-`), single-label hosts, `localhost`, raw IP addresses, and any TLD of one
character. Punycode (`xn--`) forms pass, so an IDN works if the user pastes the encoded
form.

### State management

State is entirely local to a page. There is no shared runtime state, no store, no event
bus, and no cross-page messaging. Each page declares its own top-level `var`s in the
inline script at the bottom of the file and mutates them directly.

The only state that crosses a page boundary is the three `localStorage` keys. Theme is
read by every page; each draft key is read by exactly one page.

The only state that crosses a *component* boundary within a page is the toast
singleton in `common.js`, which is module-private inside its IIFE and reachable only
through `window.toast`.

### Third-party integrations

| Service | Endpoint | What it does | Authentication | Data it receives |
|---------|----------|-------------|----------------|------------------|
| Google gstatic favicon service | `https://t3.gstatic.com/faviconV2` | Returns a favicon image for a given domain at a requested size | None. Public and unauthenticated | The domain the user typed, plus the requesting IP and standard request headers |

This is the only third-party service the site contacts. It is undocumented and
unversioned, which is the largest single technical risk in the project (see Risks).

The four external tools linked from the landing page are not integrations. They are
outbound links; no data is passed to them and no code is loaded from them.

### Performance requirements

| Requirement | Target | Status |
|-------------|--------|--------|
| Total page weight, any page | Under 100KB uncompressed | Met. Heaviest page is 31KB |
| Lighthouse Performance | 90 or above | Not measured |
| First Contentful Paint | Under 1.0s | Not measured |
| Render-blocking resources | CSS in `<head>`, all JS at the end of `<body>` | Met on all five pages |
| External font requests | Zero | Met. System font stacks only |
| Third-party scripts | Zero | Met |
| Images shipped with the site | Zero | Met. Every icon is inline SVG or a data URI |
| HTTP requests for a cold landing page load | Three (HTML, CSS, JS) | Met |
| HTTP requests for a cold tool page load | Four at most (HTML, CSS, `common.js`, tool module) | Met |

### Known technical debt

| Item | Shortcut taken | Correct solution |
|------|---------------|-----------------|
| Markdown code-span sentinel | `js/markdown.js` uses a literal NUL character (`"\0"`, embedded as a raw byte in the source) as the placeholder that protects inline code from the inline formatting rules | Use a long random string that cannot appear in user text. The NUL byte makes the file report as binary to some tools, which is why `grep` treats `markdown.js` as a binary file |
| Image `src` not protocol-checked | Markdown links are whitelisted to safe protocols; image sources are only attribute-escaped | Apply the same whitelist to `src` |
| No mobile navigation | Below 760px `.hide-sm` hides all four topbar links and tool page footers link only Home, so Projects and Support are unreachable from a tool page on a phone | A real answer, most likely a disclosure menu behind the existing icon button row. This is the one accessibility item the v1.0.0 pass did not close, because it needs a design decision rather than an attribute. See open question 4 |
| Theme flash | `common.js` loads at the end of `<body>` while `<html>` hardcodes `data-theme="light"` | Move the localStorage read to an inline `<script>` in `<head>` |
| Silent clipboard failure | `copyText`'s `execCommand` fallback swallows its exception and shows no toast | Toast a failure message in the `catch` |
| Unguarded `localStorage` writes | None of the three writes is wrapped in `try/catch` | Wrap all three; degrade to non-persistent behaviour instead of throwing. The cost of this grows with every tool that autosaves |
| Favicon download CORS fallback | When `fetch` fails, falls back to `window.open` and asks the user to right-click | No better fix exists without a proxy server, which tenet 1 forbids. This one is accepted permanently rather than owed |
| Duplicated page chrome | The topbar, footer, and favicon data URI are copy-pasted into five HTML files. A nav change means five edits, one more with every tool added | A build step or a runtime template would fix it and would break tenet 3. Accepted. The mitigation is the checklist in Working Practice |
| Inline styles in `index.html` | The about section's layout lives in `style` attributes rather than a class | Move to a named class in `style.css` |
| No tests of any kind | There is no runner and no runtime to run one | The manual checklist in Working Practice is the substitute. A real fix needs Node, which the constraints forbid |

---

## Conventions

Derived by reading the code and the git history, not from any external style guide. The
project contains no linter config, no formatter config, and no editorconfig, so
everything below is convention held by hand.

### Naming

| Thing | Convention | Examples |
|-------|-----------|----------|
| HTML files | lowercase, hyphen-separated, named for the tool | `link-cleaner.html`, `favicon-downloader.html` |
| JS files | lowercase, **no separator** | `linkcleaner.js`, `markdown.js`, `common.js` |
| Directories | lowercase, single word | `css`, `js`, `docs` |
| Documentation files | SCREAMING CASE with `.md` | `PRD.md`, `DESIGN.md`, `PATCHNOTES.md`, `README.md` |
| CSS classes | lowercase, hyphenated, often abbreviated | `.tool-card`, `.md-split`, `.lc-out`, `.fav-item`, `.ticon` |
| CSS custom properties | `--` plus lowercase hyphenated | `--bg-elev`, `--text-faint`, `--radius-sm` |
| DOM ids | lowercase, hyphenated, prefixed by tool | `#md-input`, `#lc-clean`, `#fav-results`, `#btn-copy-html` |
| JS functions | camelCase | `cleanUrl`, `normalizeDomain`, `withCodeSpans`, `copyText` |
| JS variables | camelCase, aggressively short in local scope | `s`, `e`, `val`, `sel`, `qbuf`, `pbuf`, `trows` |
| JS module constants | SCREAMING_SNAKE | `EXACT`, `PREFIXES`, `SENT`, `SIZES`, `SAMPLE`, `STORE`, `KEY`, `EXAMPLE` |
| localStorage keys | `azqato-` prefix, lowercase, hyphenated | `azqato-theme`, `azqato-md-draft` |

**Inconsistency, dominant form named.** HTML files hyphenate (`link-cleaner.html`)
while their JavaScript counterparts do not (`linkcleaner.js`). Both forms are the
dominant one within their own file type, so there is no deviation to fix; a new tool
should hyphenate its HTML and run its JS name together, matching what is there. There
is one further mismatch worth knowing: the Markdown Editor's page is
`markdown-preview.html`, named after the tool's original title, while the tool is now
called "Markdown Editor". The filename was deliberately left alone when the tool was
renamed in v0.1.1, because the URL is public and search-visible. See the Deprecation
and Removal section.

### Formatting

| Aspect | Convention | Notes |
|--------|-----------|-------|
| Indentation | 2 spaces, everywhere, in every file type | No tabs anywhere |
| Quotes in JavaScript | Double quotes | Consistent across all three JS files |
| Quotes in HTML attributes | Double quotes | Consistent |
| Semicolons in JavaScript | Always | No ASI reliance |
| Line length | Roughly 100 characters, not enforced | Long regex literals and long string arrays exceed it |
| Trailing commas | Not used | |
| Statement style | ES5 only: `var`, `function` expressions, no arrow functions, no `const`/`let`, no template literals except inside string data | Deliberate house style, not a compatibility need |
| Module pattern | Every JS file is a single IIFE, `(function () { ... })();` | Nothing leaks except explicit `window.x` assignments |
| Exports | Assigned to `window` by name at the point of definition | `window.toast = function ...`, `window.cleanUrl = function ...` |
| CSS declaration order | No enforced order. Layout, then box, then type, then color, loosely | |
| CSS shorthand | Preferred. `transition: .15s ease` rather than named properties | |
| CSS leading zeros | Omitted. `.15s`, `.92rem`, `.06em` | Consistent throughout |
| CSS section markers | Banner comments in a `/* === */` box for major sections, single-line `/* ---- name ---- */` for minor ones | |
| HTML attribute order | `class`, then `id`, then `href`/`src`, then everything else | Loosely held |
| Inline SVG | Written inline in HTML with `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`, and a stroke width of 2 (2.5 or 3 for small emphasis icons) | Consistent across all five pages |

### Organization

- **File size norm:** the largest file is `css/style.css` at 565 lines. No JavaScript
  file exceeds 190 lines. A file approaching 600 lines should be split, but nothing is
  close enough for that to be a live rule.
- **When logic is split out:** logic goes into `/js/` when it is a self-contained
  algorithm worth reading on its own (the Markdown parser, the URL cleaner) or when it
  is shared. Glue code that only wires DOM elements to that logic stays inline at the
  bottom of the tool's HTML file. Both tool-specific JS files follow this split
  precisely: neither touches the DOM, and both are pure functions over strings.
- **Script order:** `js/common.js` first, then any tool library, then the inline glue
  script. Always at the end of `<body>`, never in `<head>`, never `defer` or `async`.
- **CSS organisation:** one file, ordered tokens, then base, then shared components,
  then one section per tool in the order the tools appear on the landing page, then the
  shared responsive block last.

### Comments

Comment density is low and purposeful. The pattern is:

- A file-header block comment on every JS file saying what the file is and, where
  relevant, what it supports. Three of three JS files have one.
- Section dividers inside a file, written as `// --- Name ---` padded with dashes to a
  consistent column in `common.js`, and as banner boxes in CSS.
- A one-line comment above a piece of logic whose *reason* is not obvious from reading
  it: `// force reflow so re-triggering animates`, `// de-dupe key list while
  preserving order`, `// protect inline code spans (with a sentinel) before other
  inline rules run`.
- Inline comments naming a non-obvious branch, for example each block type inside the
  Markdown parser's main loop.

What earns a comment here is a *why*, never a *what*. There is no commented-out code
anywhere in the project, and there are no TODO, FIXME, or HACK markers in any file.

### Error handling, logging, and validation

- **Validation happens at the input boundary and returns a sentinel, never throws.**
  `normalizeDomain` returns `null`. `cleanUrl` returns `{ valid: false }`. The caller
  checks the sentinel and toasts.
- **The only `try/catch` blocks in the project** are around `new URL()` in
  `linkcleaner.js` and around `document.execCommand("copy")` in `common.js`. Both
  swallow the exception; the first converts it to a sentinel, the second to nothing.
- **All user-facing errors are toasts.** There is no inline error text, no error class,
  no modal, and no console output.
- **There is no logging.** No `console.log`, `console.warn`, or `console.error` appears
  in any file. This is deliberate: a static privacy tool that logs to the console
  invites the question of what else it records.
- **Network failure is handled by falling back, not by reporting.** A failed favicon
  fetch opens a tab; a failed favicon image shows "n/a" in place of the thumbnail.
- **User input is escaped, never trusted.** The Markdown parser escapes before parsing
  rather than sanitising after.

### Commit messages and branching

Read from the five commits in the history rather than from any contributing guide,
which does not exist.

- **Format:** `type: lowercase imperative summary`. Observed types: `feat`, `ui`,
  `nav`, `docs`. The initial commit is the exception, written as
  `Initial commit - Azqato's Tools v0.1.3`.
- **Length:** one line, roughly 40 to 60 characters. No commit in the history has a
  body.
- **Scope:** one logical change per commit. The four post-initial commits map one to
  one onto patch note entries v0.1.4 through v0.1.7.
- **Branching:** trunk-based on `master`. There are no other branches, local or remote,
  and no merge commits. Every commit is a direct commit to `master`, which is also the
  deploy branch.
- **Tags:** annotated, one per release, named `vMAJOR.MINOR.PATCH`. Every release from
  v0.1.3 onward has one. Tag the release commit as part of shipping it, not later.
  Three versions have no tag and never will: v0.1.0 through v0.1.2 predate the
  repository, whose first commit is already v0.1.3. `PATCHNOTES.md` remains the
  authoritative record of what changed; the tags exist so that a version number resolves
  to a commit without reading dates and guessing.
- **Type vocabulary is loose.** `ui` and `nav` are both used where `feat` or `style`
  would also fit. The dominant pattern is "a short lowercase word describing the area
  touched", not a fixed Conventional Commits set. Match that.

---

## Writing style

No writing style was recorded anywhere in the project before this audit. The following
is adopted as the project rule and applies to documentation, UI copy, code comments,
and commit messages.

- **Em dashes are prohibited in all three forms:** the literal Unicode character, the
  `&mdash;` HTML entity, and the double dash used as punctuation. The Unicode character
  and the entity must be searched independently, because a search for one will not find
  the other. CSS custom properties (`--color-bg` and the like) are valid syntax, not
  punctuation, and are never touched. Neither is a `<!-- HTML comment -->`.
- **Replace each instance** with whichever alternative fits: a comma (most natural in
  most cases), a colon (introducing a list or an elaboration after a complete clause), a
  semicolon (joining two closely related independent clauses), parentheses (asides and
  supplementary detail), a period (splitting one sentence into two), or a single hyphen.
- **The single hyphen is permitted and encouraged** where context justifies it. Prefer
  it in document titles, section headings, and version lines (for example
  `## v0.1.8 - 2026-08-25`) where a comma or colon reads awkwardly. In running prose the
  other replacements are usually better.
- **Leave any instance the text needs in order to mean anything,** such as a rule, a
  table, or an example naming the character it prohibits. Replacing those destroys the
  line.
- **Tone:** direct and functional. Plain declarative sentences. No marketing language in
  documentation. No filler openings. UI copy may be warmer than documentation copy (the
  hero says "Free tools that just work") but must never make a claim the code does not
  keep.

**Enforcement check.** To find every violation before committing:

```bash
grep -rn $'\u2014' --include='*.md' --include='*.html' --include='*.css' --include='*.js' .
grep -rn -- '&mdash;' .
```

The second search must be run separately. The first will not find the entity, and vice
versa.

---

## Browser testing

No browser testing rule existed in the project before this audit. The following is
adopted as the project rule.

- **Use Microsoft Edge, never Chrome.** There is no JavaScript runtime installed on the
  maintenance machine, so end-to-end checking is done by driving a headless browser
  directly, and Chrome is the owner's day-to-day browser. Driving it would disturb a
  live session. Edge runs the same engine and is free to use.
- **This applies to every browser a test drives,** not only one named in a config file.
  An ad hoc headless invocation from a script or a shell command is testing and falls
  under the same rule.
- **Resolved Edge binary path on the maintenance machine (Windows 11):**
  `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`
  Verified present on 2026-08-25. On a different platform this path changes and is the
  first thing to fix on a new machine. macOS:
  `/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge`. Linux:
  `/usr/bin/microsoft-edge`.
- **A second engine is worth using for manual spot checks.** The site targets Chrome,
  Firefox, Safari, and Edge (see Assumptions), and two features are engine-sensitive:
  `backdrop-filter` on the topbar, which needs the `-webkit-` prefix that the CSS
  already supplies, and `image-rendering: -webkit-optimize-contrast` in the favicon
  grid, which is a no-op outside Chromium and Safari. Firefox and Safari checks are
  manual and occasional, not automated.
- There is no automated test suite today, so this rule currently governs any ad hoc
  headless invocation rather than a standing test run. It is written down now so that
  the first person to add automation does not reach for Chrome by reflex.

---

## Security

### Authentication model

None. The site has no users, no accounts, and no sessions. Every visitor is anonymous
and indistinguishable from every other visitor. There is nothing to log in to, so there
is no credential to steal, no session to hijack, and no password reset flow to abuse.

### Authorization model

Not applicable. All content is public. There are no roles, no admin surface, and no
restricted pages. Everything served is served identically to everyone.

### Data storage

**What is stored:** three `localStorage` keys, `azqato-theme`, `azqato-md-draft`, and
`azqato-cc-draft`, all in the visitor's own browser and none transmitted anywhere. See
Data models for the full description.

**What is not stored:** URLs cleaned by the Link Cleaner, domains looked up in the
Favicon Downloader, and any other tool input. None of it is persisted beyond the page
session, and none of it is transmitted.

**The one caveat worth stating plainly:** the Markdown draft is stored unencrypted in
`localStorage`. Anyone with access to the browser profile can read it. That is normal
for browser storage and is the correct tradeoff for a draft-recovery feature, but a
user pasting genuinely sensitive text should know it persists on their disk until they
clear site data.

### Environment variables

There are none, and there are no secrets of any kind in the repository. This was
verified for this audit by reading every file: there is no API key, no token, no
credential, and no service account anywhere in the project. The only external service
is unauthenticated. There is no `.env`, no `.env.example`, and nothing to add to
`.gitignore` (there is no `.gitignore` either).

If a future tool needs a secret, it cannot live in this repository, because a static
site cannot hold one. That constraint should be treated as a feature.

### Third-party trust

| Service | Data it receives | Why it receives it |
|---------|------------------|--------------------|
| Google (`t3.gstatic.com`) | The domain the user typed into the Favicon Downloader, plus the user's IP address and standard request headers, once per size (six requests per lookup) | It is the source of the favicon images. Google may log these requests under its standard privacy policy |
| GitHub (Pages) | The user's IP address and request headers for every page load, as with any web host | It serves the site |

No other third party receives anything. Specifically: the Markdown Editor's text never
leaves the browser, and the Link Cleaner makes no network request at all, because URL
parsing happens in the native `URL` API.

The four external tool cards are outbound links carrying `rel="noopener"`. Clicking one
sends a normal referrer to that site, as any link does. No data from this site is
passed in the URL.

### Known attack surface

| Area | Risk | Mitigation in place |
|------|------|--------------------|
| Markdown preview writes to `innerHTML` | Script injection through crafted Markdown | Every input string passes `escapeHtml()` before any parsing, and raw HTML passthrough is not implemented. A `<script>` in the source renders as visible text |
| Markdown link hrefs | `javascript:` URLs in links | Whitelist `^(https?:\|mailto:\|#\|\/\|\.)`, anything else becomes `#`. Every link also gets `rel="noopener noreferrer"` |
| Markdown image sources | `javascript:` or `data:` in `src` | Attribute-escaped but **not** whitelisted. This is a gap relative to links. Practical risk is low (no modern browser executes `javascript:` in `src`, and a `data:` image is inert) but the asymmetry is unintended. Recorded as technical debt |
| Link Cleaner URL parsing | Malformed or hostile input | `new URL()` inside `try/catch`; failure returns `{ valid: false }`. Output is written with `textContent`, never `innerHTML` |
| Link Cleaner "Open link" button | Opening an attacker-supplied URL | `window.open(current, "_blank", "noopener")`. The URL is one the user themselves pasted |
| Favicon domain input | Injection into the outbound URL | `normalizeDomain()` validates against `^[a-z0-9.-]+\.[a-z]{2,}$` and the value is passed through `encodeURIComponent` when building the gstatic URL |
| Chip rendering in the Link Cleaner | Parameter names or values could contain markup | Chips are built with `textContent` and `title`, never `innerHTML` |
| Favicon results heading | The domain is written into `results` with `innerHTML` | The domain has already passed the strict regex, so it can contain only `a-z0-9.-`. Safe, but it is the one place a user-derived string reaches `innerHTML` in that file |
| Clipboard read | The paste button reads the user's clipboard | Requires an explicit user gesture and browser permission. The value is only ever put into the visible textarea |
| Hosting | Anyone with push access to `master` changes the live site instantly | Repository access control. There is no review gate, no CI check, and no staging step |

There is no Content Security Policy header. GitHub Pages does not allow custom headers,
and a `<meta http-equiv="Content-Security-Policy">` tag would have to permit
`unsafe-inline` for both scripts and styles, since every page carries an inline script
and `index.html` carries inline styles. A CSP is therefore of limited value here
without first removing all inline code. Worth doing eventually, not worth doing badly.

### Dependency policy

There are no dependencies. No npm packages, no CDN scripts, no vendored libraries, no
fonts, and no images. There is no lockfile to audit and no CVE feed that applies to
this project. The only third-party code that runs is the browser itself.

This is the entire dependency policy and it is enforced by tenet 3. If a change ever
adds a dependency, that change also creates the need for a dependency policy, and both
should be argued in the same discussion rather than the dependency arriving first.

---

## Deprecation and removal

The project had no stated removal rule before this audit. One decision in the history
does establish a precedent, and it is recorded and honoured below rather than being
overwritten by the default.

### The precedent already in the code

When the Markdown Editor was renamed in v0.1.1, its file was **not** renamed. It is
still `markdown-preview.html` and its URL is still
`https://azqato.github.io/tools/markdown-preview.html`. The naming convention section
of the earlier documentation states the reason directly: "once a tool is named and
shipped, do not rename it without a clear reason, URL stability matters for search."

That is a real, project-specific rule: **a live URL is not changed once published, even
when the thing behind it is renamed.** It is the same instinct as the default policy
below and it takes precedence over it, because the project stated it first.

### Removal policy

The line is drawn at the deploy boundary. Everything in the repository root and in
`/css` and `/js` is copied verbatim to GitHub Pages, so for this project source and
artifact are the same bytes. That makes the boundary unusually simple to state and
unusually easy to get wrong, so it is spelled out:

**Public facing** means an address a visitor or another site can request. In this
project that is:

- The site root, `https://azqato.github.io/tools/`, which serves `index.html`
- `/markdown-preview.html`
- `/favicon-downloader.html`
- `/link-cleaner.html`
- `/character-counter.html`
- `/css/style.css`
- `/js/common.js`
- `/js/markdown.js`
- `/js/linkcleaner.js`
- `/js/charactercounter.js`
- The six `window` globals the shared scripts define, `window.toast`,
  `window.copyText`, `window.mdToHtml`, `window.cleanUrl`, `window.countText`, and
  `window.formatDuration`, because a page in this repository imports them by name across
  a file boundary
- The three `localStorage` keys, `azqato-theme`, `azqato-md-draft`, and
  `azqato-cc-draft`, because a returning visitor's browser holds data under those exact
  names

**Internal** means everything else: `README.md`, everything in `/docs`, individual CSS
class names, DOM ids, and any function private to an IIFE or an inline script.

**Removing something public facing** retires the address behind a compatibility shim
pointing at whatever replaces it, so the old address keeps resolving:

- For a page, that means the file stays and becomes a one-line redirect to its
  replacement: `<meta http-equiv="refresh" content="0; url=new-page.html">` plus a
  visible link for anyone whose browser ignores it. GitHub Pages offers no server-side
  redirect rule, no `_redirects` file, and no rewrite configuration, so a meta refresh
  is the only mechanism available. That limitation is why the rule specifies it by
  name.
- For a `window` global, that means keeping a thin function under the old name that
  calls the new one.
- For a `localStorage` key, that means reading the old key once, writing the new one,
  and leaving the old read path in place. Data under a key nobody reads is data
  silently lost.

**Removing something internal is a plain delete.** No redirect, no alias, no stub file,
no tombstone. Nothing outside the repository points at it, so there is no address to
preserve, and a permanent compatibility entry would be maintenance in exchange for
nothing. A CSS class that no page uses is deleted. A doc file that has been merged into
another is deleted. This audit deleted nothing, because nothing was found to be
redundant.

### Compatibility entries

Where a compatibility entry exists it is **permanent**. It is never chained: a redirect
always resolves to a real target in one hop, never to another redirect, because a chain
is a thing that breaks quietly in the middle. It is never reused to point at different
content later, because a reused address silently serves the wrong thing, which is worse
than a broken link.

There are currently zero compatibility entries in the project. Nothing has ever been
removed from the public surface.

### Retired items

| Item | Retired | Replaced by | Notes |
|------|---------|-------------|-------|
| Tool name "Markdown Live Preview" | v0.1.1, 2026-06-27 | "Markdown Editor" | Name only. The file, the URL, and the tool are unchanged. Renamed because the old name was another product's brand |
| Brand name "Azqato Tools" | v0.1.1, 2026-06-27 | "Azqato's Tools" | Text change across all pages. No address affected |
| `/tools/` subdirectory | v0.1.3, 2026-06-27 | Repository root | The three tool pages moved up one level. The site had not yet been deployed, so no public URL existed to preserve. Had this happened after launch, the policy above would have required redirects |
| Topbar link set (previous, unrecorded) | v0.1.5, 2026-06-27 | Azqato, Projects, Tools, Support | Also fixed a stale `../index.html#tools` path left over from the v0.1.3 move |
| Footer credit "Built with Claude Code" | v0.1.6, 2026-06-27 | Nothing | Removed from the landing page footer |

A reader who finds a reference to any of the above can resolve it from this table.

**Historical records are not rewritten when something is removed.** Changelog entries
and roadmap rows that describe a deleted item stay exactly as they are, because they
record what happened at the time rather than describing the present. Do not tidy an old
patch note to match the current state of the code.

---

## Documentation versus reality

Every document was compared against the code for this audit. Each finding is recorded
here rather than being quietly fixed, along with which source to trust and why.
Resolved entries stay in the table with a note on how they were resolved.

| # | Finding | Which source to trust | Resolution |
|---|---------|----------------------|-----------|
| 1 | The README was written for developers: install steps, tech stack table, prerequisites, ports, deploy commands. The documentation standard for this project is that the README is the public front door for a general reader and that all technical content lives in `/docs` | The standard, not the old file. The old README's content was accurate, it was just in the wrong document | Resolved. The README was rewritten for a general reader. Every fact it dropped (stack, setup, ports, deploy, rollback) is preserved in the Runbook and Technical Requirements sections above, in more detail than the README carried |
| 2 | `DESIGN.md` stated "form inputs have associated `<label>` elements". Three of four inputs have none | The code, for what is. The document, for what should be | Recorded in `DESIGN.md` as an open discrepancy and listed as accessibility gaps 4 and 5. The rule was kept, the gap was written down, neither was softened |
| 3 | `DESIGN.md` philosophy said "no gradients on content" while two gradients exist (logo, hero heading) | Ambiguous. The code is deliberate; the wording is imprecise | Recorded in `DESIGN.md` as an open discrepancy with both readings and a question for the author |
| 4 | `DESIGN.md` breakpoint notes described `.hide-sm` as hiding "All tools / nav text links", a description left over from a nav structure that no longer exists | The code | Resolved. Rewritten to name the four current links, with the mobile-navigation consequence recorded as a known gap |
| 5 | `PRD.md` folder structure and `PATCHNOTES.md` v0.1.0 both list `initialconcept.txt` as part of the project. `git status` shows it untracked, so it has never been in the repository | Both. The docs record intent, git records reality | Resolved in v1.0.0. The author chose deletion over committing. The file was read before being deleted, its content confirmed already present in the Problem statement, and every reference to it in this document and in `PATCHNOTES.md` was rewritten to describe it in the past tense |
| 6 | `PRD.md` roadmap marks v1.0.0 Complete while the project version is v0.1.x and no v1.0.0 changelog entry exists | The changelog, for the version number. The roadmap row, for the fact that a launch happened | Resolved in v1.0.0. The author chose to bump the version line to v1.0.0 rather than renumber the milestone, so the two records now agree. The milestone row was kept and relabelled as the launch it describes |
| 7 | `PRD.md` described the Link Cleaner's exact-name list without noting that two of its entries can never match: `" trk"` has a leading space and `trkCampaign` has capitals, while lookups lowercase but do not trim | The code | Resolved in v1.0.0. Both entries were repaired: `" trk"` was a duplicate of the working `"trk"` entry and was deleted, and `trkCampaign` was lowercased to `trkcampaign` so it now matches. The list is 47 entries and all 47 of them work |
| 8 | `PRD.md` technical debt described the Markdown sentinel as "a literal null char", which reads as a guess | The code confirms it. The byte at that position in `js/markdown.js` really is `0x00` | Resolved and kept, with the consequence added: the NUL byte makes `grep` treat the file as binary |
| 9 | `PRD.md` claimed Markdown link protocols are whitelisted, which is true, without noting that image sources are not | The code | Resolved. Documented in API design, in Known attack surface, and as technical debt |
| 10 | `PRD.md` Metrics presented targets in a way that could be read as measurements | Neither. Nothing is measured, because no analytics exist | Resolved. Every metric table now names the measurement method and the section opens by stating that no number is currently measured |
| 11 | `PRD.md` and `README.md` both described the deploy branch as `main`. The repository's branch is `master` | The repository | Resolved. Every deploy, rollback, and Pages instruction above says `master` |
| 12 | Neither `README.md` nor `PRD.md` recorded that Node is absent from the maintenance machine, while both offered `npx serve` as a local-server option | The machine | Resolved. Prerequisites now states that Node is not installed and that `npx` instructions will fail there. Python 3.14.3 is documented as the local server |
| 13 | No document recorded a writing style, a browser testing rule, a removal policy, a conventions section, a risks section, or a working practice section | Nothing to trust against. These simply did not exist | Resolved. All six are written above. Where the project already had a rule of its own (URL stability on rename) that rule was documented and kept in preference to the default |
| 14 | 119 em dashes existed across the project: 102 in the four documentation files and 17 in six source files (`index.html` 6, `link-cleaner.html` 4, `markdown-preview.html` 3, `favicon-downloader.html` 2, `css/style.css` 1, `js/linkcleaner.js` 1) | The newly adopted writing style | Resolved. All 119 replaced. The `&mdash;` entity and double-dash punctuation were searched separately and neither was present anywhere |
| 15 | The initial commit message contains an em dash (`Initial commit - Azqato's Tools v0.1.3` reads with one in the actual history) | The history | Not changed, and will not be. Git history is a historical record, and rewriting `master` to fix punctuation would force-push the deploy branch. The style rule applies to new commits only |
| 16 | `DESIGN.md` was described in `PATCHNOTES.md` v0.1.2 as covering "component patterns for every UI element". It did not cover the empty state, the two footer variants, the cleaned-URL output box, or the stat line | The code | Resolved. All four are now documented in `DESIGN.md` |
| 17 | No document mentioned that the topbar "Tools" link is absolute, so a locally-opened tool page leaves the local origin when it is clicked | The code | Resolved. Documented in `DESIGN.md` with the reason (the four links are one shared navigation block reused across Azqato properties) |

---

## Risks and open questions

This section is worth more than the confident parts of the document.

### What was not fully verified

- **Nothing was executed.** No page was opened in a browser, no Lighthouse run was
  made, and no contrast ratio was measured for this audit. Every behavioural statement
  above is derived from reading the source, not from watching it run. Behaviour that
  depends on a real browser (clipboard permissions, CORS outcomes against gstatic,
  whether the theme flash is actually visible) is described as the code implies rather
  than as observed.
- **The four external tools were not opened.** Their descriptions on the landing page
  are taken at face value from the card copy. Whether the Nasdaq 100 Screener, Net Worth
  Tracker, VIX Strategy, and Protein Tracker still exist at those URLs, and whether they
  do what the cards say, has not been checked.
- **The Google gstatic endpoint was not called.** The URL format and its parameters are
  documented from the code that builds them. Whether the `fallback_opts` values still
  behave as intended, and what the service returns for an unknown domain, is unverified.
- **Markdown parser edge cases.** The parser is 190 lines of regex-driven line walking
  with several interacting passes. The supported and unsupported lists above are derived
  from reading each branch, but the interaction between the italic rules and the
  underscore rules in particular is subtle enough that there are almost certainly inputs
  that render unexpectedly. No systematic input testing was done.

### Fragile areas

| Area | Why it is fragile |
|------|------------------|
| `js/markdown.js` inline rules | Six overlapping regex replacements applied in sequence to the same string. Changing the order, or making one less greedy, changes the output of the others. The bold and italic underscore rules use lookarounds that are easy to break by accident |
| `js/markdown.js` NUL sentinel | A raw `0x00` byte in the source. Tools that treat NUL as a binary marker (`grep` does) behave oddly on this file. Any editor that strips or normalises it silently breaks inline code rendering |
| The gstatic dependency | Undocumented, unversioned, and not covered by any contract. It can change or disappear without notice, and the Favicon Downloader has no fallback |
| Five copies of the page chrome | The topbar, the footer skeleton, and the favicon data URI are duplicated across five HTML files. Any nav or brand change requires five identical edits, and there is nothing to catch it when only four are made. This has already caused one bug: the stale `../index.html#tools` path fixed in v0.1.5. The cost of this grows by one file with every tool shipped, and it is the strongest argument the project has against tenet 3 |
| No tests, anywhere | There is no runner, no runtime, and no assertion committed to the project. Every change is verified by looking at it. `js/charactercounter.js` is the one module whose logic has been verified by assertion rather than by eye, using a throwaway harness driven by headless Edge (see "A note on testing" below). That harness was not committed |
| `master` is the deploy branch | A push is a deploy. There is no review gate, no CI check, and no staging step between an edit and the live site |
| `.field:focus` and `#md-input:focus` | Both suppress the native outline. The first substitutes a ring, the second substitutes nothing. Easy to lose track of when restyling |
| Generic tracking parameter names | `amp`, `spm`, `scm`, and `trk` are broad enough to strip a parameter a site legitimately uses. The tool shows what it removed, which is the mitigation, but a user who does not look will not notice |

### Dangerous to change without more context

- **The inline rule order in `js/markdown.js`.** Reordering the replacements, or
  touching `withCodeSpans`, will change rendering in ways that are not obvious from the
  diff. If it must change, work through the sample document in `markdown-preview.html`
  first, since it exercises most constructs on purpose.
- **The `SENT` sentinel.** Replacing the NUL byte is the right fix, but doing it
  carelessly (with a string that can appear in user text) reintroduces exactly the bug
  the sentinel exists to prevent.
- **The favicon data URI.** It is duplicated in four files and contains a hardcoded hex
  that duplicates `--accent`. Changing the accent color in CSS without changing all
  four data URIs leaves the tab icon out of step with the site.
- **The topbar link set.** These four links are shared with other Azqato properties.
  Changing them here without changing them there breaks the illusion of one site.
- **The two `localStorage` key names.** Renaming either one silently discards every
  existing visitor's theme preference and saved draft. See the removal policy: both
  keys are on the public surface list for exactly this reason.

### Work in progress

- There are no uncommitted changes, no unmerged branches, no stubbed functions,
  and no half-finished features. Every function in the project is complete and every
  path in the UI leads somewhere.
- There are no TODO, FIXME, or HACK markers anywhere in the codebase. This was checked
  by search, not assumed.

### Open questions for the author

Numbered so they can be answered by reference. When one is answered, fold the answer
into the relevant section and mark it answered here rather than deleting it.

1. **`initialconcept.txt`:** ~~should it be committed, or removed from the folder
   structure?~~ **Answered 2026-08-31: removed.** The file was read, its content
   confirmed to be fully covered by the Problem statement, then deleted and every
   reference to it rewritten. Folded into Folder structure and the Problem statement.
2. **The v1.0.0 milestone:** ~~does the version line track the codebase or the public
   launch?~~ **Answered 2026-08-31: the version line is now v1.0.0.** The author chose
   to bump rather than renumber the milestone. Folded into the Roadmap and the
   versioning rule in Working practice.
3. **"No gradients on content":** is the design rule "no gradients at all", making the
   logo and hero heading violations, or "no gradients inside a tool's working area",
   making them fine? The wording needs tightening either way.
4. **Mobile navigation:** below 760px all four topbar links are hidden and tool page
   footers link only Home, so Projects and Support are unreachable from a tool page on a
   phone. Is that intended?
5. **The dead Link Cleaner rules** (`" trk"` and `trkCampaign`): ~~fix them or leave
   them as a record?~~ **Answered 2026-08-31: fixed.** `" trk"` turned out to be a
   duplicate of the already-working `"trk"` entry, so it was deleted rather than
   trimmed; `trkCampaign` was lowercased. This is a behaviour change: a URL carrying
   `trkCampaign` in any casing is now stripped where before it was passed through.
   Folded into API design and the technical debt table.
6. **Generic parameter names:** `amp`, `spm`, `scm`, and `trk` will strip parameters
   some sites use legitimately. Is that the right default, or should they move behind a
   future "aggressive mode" toggle?
7. **The Markdown image `src` whitelist:** should image sources get the same protocol
   whitelist as links, for symmetry, even though the practical risk is low?
8. **Analytics:** the entire Metrics section is aspirational until something measures
   it. Is a privacy-respecting analytics tool (Plausible or similar) acceptable under
   tenet 1, given it would send a page view to a third party?
9. **External tool links:** should they be checked periodically? There is no link
   checker and a moved external tool would 404 silently.
10. **Git tags:** ~~should each patch note version be tagged?~~ **Answered 2026-08-31:
    yes, and backfilled.** Annotated tags v0.1.3 through v0.2.0 were created against
    their original commits, each carrying the committer date of the commit it points at
    rather than the date the tag was made. v0.1.0, v0.1.1, and v0.1.2 have no tag: they
    predate the repository, whose first commit is already labelled v0.1.3, so there is
    no commit to point at and inventing one would be a lie. Folded into Commit
    conventions.

---

## Working practice

Concrete instructions for anyone, human or model, doing future work in this project.

### Before editing anything

1. Read this file's Conventions section. The house style is not obvious from a single
   file, and it is stricter than it looks (ES5 syntax by choice, IIFE per file, double
   quotes, 2-space indent, no logging).
2. Run `git status` and confirm the tree is clean. As of v1.0.0 there are no expected
   untracked files, so anything `git status` reports is either yours or a stray test
   harness that should have been deleted.
3. Open the file you intend to change and read the whole thing. Every file in this
   project is small enough to read completely, and none of them is safe to skim.

### Which document to open first

| Kind of work | Open first | Then |
|-------------|-----------|------|
| Adding a new tool | This file, "How to add a new tool" below | `DESIGN.md` page scaffold and component patterns |
| Changing a color, radius, or font | `DESIGN.md`, Color palette and Typography | `css/style.css` |
| Changing layout or a breakpoint | `DESIGN.md`, Breakpoints and Component patterns | `css/style.css` |
| Changing navigation, the topbar, or a footer | `DESIGN.md`, Topbar and Footers | All five HTML files, every time |
| Changing Markdown parsing | This file, API design and Risks | `js/markdown.js` |
| Changing tracking rules | This file, API design | `js/linkcleaner.js` |
| Changing the theme or toast behaviour | `DESIGN.md`, Toast, and this file, API design | `js/common.js` |
| Deploying or rolling back | This file, Runbook | |
| Removing or renaming anything public | This file, Deprecation and removal | |
| Writing any prose at all | This file, Writing style | |
| Understanding why something is the way it is | This file, Tenets, then `PATCHNOTES.md` | |

### What never to do here

- **Never add a dependency, a CDN script, or a build step.** Tenet 3. The moment one
  exists, the project needs a lockfile, a vulnerability policy, and a build that can
  break, and the promise that a contributor can edit a file and be done is gone.
- **Never make a tool send user data anywhere.** Tenet 1. This is the product. A tool
  that needs a server belongs on a different site.
- **Never use another product's brand as a tool name.** Tenet 2. This already happened
  once and cost a rename.
- **Never change a live URL.** The project's own precedent (v0.1.1) is that a renamed
  tool keeps its filename. If a URL genuinely must go, follow the removal policy and
  leave a meta-refresh shim, because GitHub Pages offers no server-side redirect.
- **Never rename a `localStorage` key** without a migration read of the old key. A
  rename silently discards every existing visitor's saved theme and draft.
- **Never change the topbar in one file only.** It exists in four, and there is nothing
  to catch a partial edit.
- **Never force-push `master`.** It is the deploy branch. A rewritten history is a live
  rewrite with no undo.
- **Never write an em dash,** in a document, in UI copy, in a comment, or in a commit
  message. See Writing style.
- **Never add `console.log`.** A privacy tool that logs invites the question of what
  else it records.
- **Never silently fix a documented discrepancy.** The discrepancy tables in this file
  and in `DESIGN.md` are the record of what was found. Resolve an entry by adding the
  resolution, not by deleting the row.

### How to add a new tool

1. Create `<tool-name>.html` at the repository root, hyphenated, following the page
   scaffold in `DESIGN.md` exactly: topbar, `.page.wrap`, `.page-head` (breadcrumb, h1,
   description), tool content, footer, `js/common.js`, then the tool's own scripts.
2. Copy the topbar and the favicon `<link>` verbatim from an existing tool page. They
   must be identical across all pages.
3. Write the footer's data-location line, and make sure it is true. See tenet 5.
4. Put self-contained algorithmic logic in `js/<toolname>.js` (no hyphen, matching the
   existing JS naming), as a single IIFE assigning one or more `window` globals. Keep
   DOM glue inline at the bottom of the HTML file.
5. Add tool-specific CSS as a new banner-commented section in `css/style.css`, placed
   before the final 760px media query.
6. Add a `.tool-card` to the grid in `index.html`.
7. Update this file: move the tool from Future to the MVP table, and document its
   functions in API design and any new state in Data models.
8. Update `PATCHNOTES.md` with a new version entry.
9. Update `DESIGN.md` only if the tool introduces a new component pattern or a new
   token.

### How to verify a change

There is no test suite. Verification is manual and these are the exact steps:

1. Serve the site locally rather than opening the file from disk, because `file://`
   breaks the clipboard and CORS paths:
   ```bash
   python -m http.server 8080
   ```
2. Open `http://localhost:8080` in Microsoft Edge (see Browser testing; never Chrome).
3. Open the browser console and confirm it is empty. Any error is a failure.
4. Exercise the change itself.
5. Run the standing checklist, which takes about a minute:
   - Toggle the theme, reload, and confirm the choice persisted
   - Landing page: every tool card opens, external cards open in a new tab
   - Markdown Editor: type, confirm the preview updates and the character count moves;
     click each of the seven toolbar buttons; Copy HTML; Download .md; reload and
     confirm the draft survived
   - Favicon Downloader: search a known domain, confirm six tiles render, download one,
     copy one link
   - Link Cleaner: click "Try an example" and confirm the removed and kept chips are
     correct; Copy; Ctrl+Enter in the textarea
   - Character Counter: click "Try an example" and confirm the counts read 379
     characters, 75 words, 6 sentences, 3 paragraphs, 8 lines, 19 sec reading, 35 sec
     speaking; confirm four limit bars turn red and two stay accent-colored; Copy stats;
     reload and confirm the draft survived
   - Narrow the window below 760px and confirm the editor stacks and the nav links
     disappear; below 560px confirm the favicon form stacks
6. Search for em dashes before committing:
   ```bash
   grep -rn $'\u2014' --include='*.md' --include='*.html' --include='*.css' --include='*.js' .
   grep -rn -- '&mdash;' .
   ```
7. Commit with a `type: lowercase imperative summary` message, one logical change per
   commit.

### A note on testing, and a technique worth reusing

The project has no test runner and cannot have one under its constraints, but pure logic
modules can still be verified by assertion rather than by eye. The technique used for
`js/charactercounter.js` in v0.2.0:

1. Write a throwaway `_test.html` at the repository root that loads the real module with
   a normal `<script src>`, runs assertions against it, and writes the results into a
   `<pre>`.
2. Serve the site with `python -m http.server 8080`.
3. Dump the rendered DOM from headless Edge, which runs the assertions for real:
   ```bash
   "/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" \
     --headless --disable-gpu --virtual-time-budget=4000 \
     --dump-dom "http://localhost:8080/_test.html"
   ```
4. Read the pass and fail lines out of the output.
5. **Delete the harness.** It is not committed, because a test file with no runner to
   invoke it is a file that silently rots.

The same approach verifies a page end to end: append a script that clicks a button, dump
the DOM, and read the rendered numbers out of it. That is how the Character Counter's
sample-text figures in the checklist above were established rather than guessed.

This is a deliberate compromise, not a test suite. It catches logic errors in a pure
function at the moment of writing and leaves nothing behind to maintain. Anything
involving real clipboard permissions, CORS, or visual layout still has to be checked by
hand.

### What to update afterwards

- **`PATCHNOTES.md`, every time.** Every change gets an entry, including small fixes.
  Bump the patch number for a fix, the minor number for a new tool or a visible feature,
  and the major number only for a change that breaks a public surface as defined in
  Deprecation and removal. The project reached v1.0.0 on 2026-08-31, so it is past the
  pre-1.0 convention under which a minor bump was allowed to carry a breaking change.
  Use the Added, Changed, Fixed, Removed sections and write each line in the past tense.
- **This file**, when a tool ships, a tenet changes, the roadmap moves, a convention
  shifts, or a discrepancy is resolved.
- **`DESIGN.md`**, when a token, a component pattern, or a breakpoint changes.
- **`README.md`**, only when the set of tools changes, the live URL changes, or the
  project status changes. It is the one document that should stay short.

---

## Press release

**FOR IMMEDIATE RELEASE**

### Azqato launches a free suite of browser tools that never send your data anywhere

*Every tool runs on your own device. No account, no upload, no server, and the two
text tools keep working with the internet switched off.*

**London, 27 June 2026** - Azqato today launched Azqato's Tools, a free collection of
everyday web utilities built so that nothing a person types ever leaves their computer.
The first release includes a Markdown Editor, a Favicon Downloader, and a Link Cleaner,
three tools used daily by developers, writers, and content creators, alongside links to
Azqato's existing financial tools including a Nasdaq 100 Screener, a Net Worth Tracker,
and a VIX-based allocation strategy. The site is live now and free to use, with no
sign-up of any kind.

Unlike most web utilities, Azqato's Tools does not send user input to a server. All
processing happens locally in the browser. The site requires no account, no email
address, and installs nothing.

**The problem this solves**

Every time you paste text into a free online tool, you are trusting a server you cannot
see with data you may not want to share. Writers paste unpublished drafts into Markdown
previewers. Marketers paste client links into cleaners. Researchers paste text they are
not supposed to have copied out of a document. Those tools almost always send that data
to a remote machine, and what happens to it afterwards is not something the user can
check. The problem is not that the tools are bad. It is that using them requires trust
that nobody has any way to verify.

**How it works**

Visit the site, open a tool, and use it. The Markdown Editor renders your document as
you type, saves your draft in your own browser so an accidental tab close does not lose
it, and exports as HTML or as a `.md` file. The Link Cleaner strips more than forty
known tracking parameters from any URL using the browser's own address parser, with no
network request at all, and shows you exactly which parts it removed and which it kept.
The Favicon Downloader fetches website icons at six sizes so designers can drop a real
logo into a mockup instead of a screenshot.

There is one honest exception, and the site states it on the page: the Favicon
Downloader has to ask a public icon service for the images, so the domain you type does
travel. Every other tool keeps everything on your machine, and each tool's footer says
in one line exactly where its data goes.

**Customer quote**

*"I was pasting a client's unpublished announcement into some random Markdown previewer
just to check the formatting, and I stopped halfway through and thought, what am I
doing. Azqato's Tools does the same job and I do not have to think about it. I closed
the tab and the draft was gone from their servers, because there are no servers."*
- Jordan K., content strategist

**Try it**

Visit https://azqato.github.io/tools/. Nothing to install, nothing to sign up for.

**About Azqato**

Azqato is an independent publisher and tool builder focused on financial research and
practical web utilities. Its existing tools include a Nasdaq 100 Screener that grades
every company in the index against the Azqato methodology, a Net Worth Tracker built on
a Google Sheets template, a VIX-based portfolio allocation strategy, and a protein and
calorie tracker, all used by individual investors and self-directed researchers since
2024.

---

## Frequently asked questions

### External FAQ

**What is Azqato's Tools?**
A free collection of web utilities that run entirely in your browser. You use them like
any website, but with the exception noted below your data never leaves your device.

**Who is it for?**
Anyone who writes, shares links, or does research on the web. It is most useful to
developers, writers, marketers, and anyone who would rather not paste their work into a
service they know nothing about.

**How do I use it? Step by step.**
1. Go to https://azqato.github.io/tools/.
2. Pick a tool from the grid on the landing page.
3. Use it. There is no setup, no sign-up, and no tutorial.
4. Close the tab. Nothing was uploaded, and nothing needs saving except what you chose
   to download.

**What does it cost?**
Nothing. There is no paid tier, no freemium gate, no trial, and no advertising. There
are no plans to add any.

**When did it launch and where is it available?**
It went live on 27 June 2026 and is available worldwide to anyone with a browser. There
are no regional restrictions because there is no account system to restrict.

**Do I need an account?**
No. There are no accounts, so there is nothing to create and nothing to delete.

**Does the site track me?**
No analytics are installed. The only third-party request the site ever makes is to
Google's public favicon service, and only when you use the Favicon Downloader.

**What happens to the text I type into the Markdown Editor?**
It stays in your browser. It is saved to your browser's local storage so your draft
survives a refresh or an accidental close. It is not encrypted, so anyone with access
to your computer's browser profile could read it, and it stays there until you clear
your site data. It is never sent anywhere.

**What about URLs I paste into the Link Cleaner?**
They are processed entirely by your browser's built-in address parser. No network
request is made at all. The link never leaves your device.

**Does the Favicon Downloader send my data anywhere?**
Yes, and this is the one exception on the site. The domain you type is sent to Google's
public favicon service to retrieve the icon. Google may log that request. Nothing else
about you is sent, and no other tool contacts anything.

**Does it work offline?**
The Markdown Editor and the Link Cleaner work fully offline once the page has loaded
once. The Favicon Downloader needs a connection, because it is fetching images from
another server.

**What browsers does it work in?**
Chrome 90 and later, Firefox 88 and later, Safari 14 and later, and Edge 90 and later.
Internet Explorer is not supported.

**Does it work on a phone?**
Yes. The layout is responsive and the Markdown Editor stacks into a single column on
narrow screens. The site is designed desktop-first, so a large screen is a better
experience, but nothing is broken on mobile.

**What are the technical requirements?**
A modern browser and nothing else. There is nothing to install, no extension, no
runtime, and no integration to configure. The site loads under 32KB per page.

**Is the source code available?**
Yes, at https://github.com/Azqato/tools. Every line that runs in your browser is
readable there, which is the only real way to verify a privacy claim.

**How is this different from the alternatives?**
Most similar tools are hosted services that process your data on their servers, so
using them means trusting a claim you cannot check. These process everything locally,
and the source is public so the claim is checkable. Secondly, they are collected in one
place with one design and one privacy model, rather than being four unrelated sites
with four different policies.

**What Markdown features are supported?**
Headings, bold, italic, bold-italic, strikethrough, inline code, fenced code blocks,
links, images, unordered lists, ordered lists, task list checkboxes, blockquotes,
horizontal rules, and GitHub-style tables with column alignment.

**What does the Markdown Editor not do in v1?**
No nested lists, no footnotes, no reference-style links, no syntax highlighting inside
code blocks, and no raw HTML passthrough. The last one is a deliberate safety decision.
Syntax highlighting is absent because every good implementation is a third-party
library, and this project does not use any.

**What does the Character Counter count?**
Characters with spaces, characters without spaces, words, sentences, paragraphs, and
lines, plus an estimate of how long the text takes to read silently and to say aloud. It
also shows how the text measures against six common limits: an X post, a single SMS, a
search result meta description, a page title, an Instagram caption, and a LinkedIn post.

**Why does its character count differ from another tool's?**
Because "character" has two reasonable meanings and they only differ for emoji and some
rarer scripts. This tool's main number counts the way platforms count when they enforce
a limit, where an emoji is two. When your text contains such characters the page says so
and shows both numbers, so you can use whichever one you need rather than guessing which
one you are being given.

**Is the sentence count exact?**
No, and it is worth knowing why. It counts full stops, question marks, and exclamation
marks followed by a space or the end of the text. Abbreviations like "e.g." or "Mr.
Smith" will each add a sentence that is not there. Counting correctly needs a dictionary
of abbreviations, which would mean adding a third-party library, so the tool reports an
estimate rather than pretending to a precision it does not have.

**Where do the reading and speaking times come from?**
Reading time assumes 238 words per minute, the pooled average for adult silent reading of
English prose from a 2019 meta-analysis. Speaking time assumes 130 words per minute, a
typical pace for a prepared talk. Both are averages, so treat them as a guide rather than
a stopwatch, and both assume English.

**Does the Character Counter keep my text?**
It saves your text to your own browser's storage so it is still there if you reload, the
same way the Markdown Editor does. It is not encrypted and it stays until you clear your
site data. It is never sent anywhere. Use the Clear button if you would rather it did not
stay.

**What tracking parameters does the Link Cleaner remove?**
Around fifty by exact name plus eleven by prefix, covering all `utm_` variants,
Facebook (`fbclid`), Google Ads (`gclid`, `wbraid`, `gbraid`), Microsoft (`msclkid`),
TikTok (`ttclid`), LinkedIn (`li_fat_id`), Instagram (`igshid`), HubSpot, Mailchimp,
Matomo, and others. Anything not on the list is kept, and the tool shows you both lists
after every clean so you can check.

**Could it remove something I actually needed?**
Possibly. A few of the rules (`amp`, `spm`, `scm`, `trk`) are generic enough that a site
might use them for something real. That is exactly why the tool displays every removed
parameter as a chip you can hover to see its value. If something you needed was
removed, use your original link.

**Can I add my own rules?**
Not yet. It is on the future list and needs a small settings interface to do properly.

**What sizes does the Favicon Downloader fetch?**
16, 32, 48, 64, 128, and 256 pixels square, as PNG.

**The favicons will not load. What is wrong?**
Almost always an ad blocker blocking `t3.gstatic.com`. Allowlist that domain for this
page. If a download opens a new tab instead of saving, that is the expected fallback
when the image cannot be fetched directly; right-click and save it.

**How often are new tools added?**
There is no schedule. A tool is added when it is useful and can be built to the same
standard: local processing, no dependencies, one file.

**How do I get help or suggest a tool?**
Open an issue on the GitHub repository. There is no support inbox and no chat, because
there is no company behind this beyond one person and a text editor.

### Internal stakeholder FAQ

**What is the return on this project?**
It is top-of-funnel for the wider Azqato ecosystem at close to zero marginal cost.
Hosting is free, there is no infrastructure to run, and no ongoing spend. Users who
arrive through a generic search for "link cleaner" meet the Azqato brand and the
financial tools that are the core offering. The cost is developer time, which is the
only resource being spent.

**What does success look like in six months?**
500 or more weekly active sessions, 20% or more returning visitors, at least two new
tools shipped, and organic search traffic for at least three generic tool queries. None
of the first three is currently measurable, which is itself the first thing to fix if
these targets are to mean anything.

**What is the biggest risk?**
The Google gstatic favicon service. It is undocumented, unauthenticated, and unversioned,
and the Favicon Downloader has no fallback. If Google restricts or removes it, one of
the four hosted tools stops working with no quick fix. The planned mitigation is a
direct `/favicon.ico` fetch for domains that expose one.

**What is the second biggest risk?**
That the documentation drifts from the code. The project is maintained across separate
sessions with no continuous context, so `/docs` is the only memory the project has. A
change shipped without a patch note is a change that effectively did not happen as far
as the next session is concerned.

**Why is there no analytics, given every metric depends on it?**
Tenet 1 says user data does not go to a server. Any analytics tool, however
privacy-respecting, sends a page view to a third party. That tradeoff has not been made
and is open question 8. Until it is resolved, the Metrics section is a statement of
intent.

**What is the roadmap direction?**
More tools from the Future list, then an accessibility pass to close the gaps listed in
`DESIGN.md`. Explicitly not on the roadmap: accounts, a backend, monetisation, or a
framework rewrite. Each of those is excluded by a tenet rather than by preference.

**How is this project maintained?**
Single developer, built with Claude Code. Sessions start with no memory of the last one,
so `/docs` is read first and updated last. Every convention, tenet, and naming rule is
written down here specifically so that two sessions months apart produce consistent
work.

---

## Documentation maintenance

This section records how the documentation is structured, why, and how this audit was
carried out, so that the next one can be done the same way.

### The four-document structure

The project keeps exactly four documents and no more. Anything that would be a fifth
document belongs inside one of these instead.

| File | Location | Audience | Contains |
|------|----------|----------|----------|
| `README.md` | Repository root, never `/docs` | A general reader deciding whether to care | What the site is, what each tool does in plain language, who it is for, current status, and a link to `/docs`. No commands, no versions, no dependency lists |
| `docs/PRD.md` | `/docs` | A contributor or a model | Everything else. Product, users, tenets, roadmap, metrics, runbook, architecture, conventions, security, removal policy, risks, working practice, press release, FAQ |
| `docs/DESIGN.md` | `/docs` | Anyone touching the visuals | Tokens, typography, spacing, breakpoints, component patterns, accessibility, motion |
| `docs/PATCHNOTES.md` | `/docs` | Anyone asking what changed and when | Every version, dated, in reverse chronological order |

The README is the only document where brevity wins a tie, because everything it leaves
out is one link away. `PRD.md` is the opposite: a reader may arrive at any section
directly, so a section that restates context to stand on its own is doing its job.

### When to update each file

| File | Update when |
|------|------------|
| `README.md` | The set of tools changes, the live URL changes, or the project status changes |
| `PATCHNOTES.md` | Every time any file changes, including small fixes |
| `DESIGN.md` | A token is added, a component pattern is introduced, or a breakpoint changes |
| `PRD.md` | A tool ships, a tenet is reconsidered, the roadmap moves, a convention shifts, a discrepancy is found or resolved, or an open question is answered |

### How this audit was carried out, and how the next one should be

1. **Scan the entire codebase first, before opening a single document.** Read every
   file end to end rather than inferring from filenames. A guess presented as a fact is
   the specific failure this exercise exists to prevent.
2. **Read every existing document in full.** Not skimmed, not sampled.
3. **Compare each document against the code and list every difference** before writing
   anything.
4. **Merge, do not overwrite.** Documentation holds intent, decisions, and rationale
   that cannot be reconstructed by reading code. Where a document and the code agree,
   the existing text is left alone. Where they contradict, the original text stays, the
   observed reality is recorded next to it, and the conflict is marked as a discrepancy
   for the author. Code can be wrong just as easily as a document can be stale.
5. **Treat every policy in an audit brief as a default.** Where the project already
   states a rule of its own, in its docs, in a contributing guide, or as a consistent
   pattern in the code and the changelog, document that rule and leave it alone. Adopt a
   default only where no rule exists. Where an existing rule and a default differ, keep
   the existing rule and flag the difference. This audit did exactly that with the URL
   stability rule in the Deprecation section: the project's own precedent was kept and
   the default was written around it.
6. **Mark uncertainty as uncertainty.** A confident sentence outlives the session that
   produced it. Anything not verified is labelled.
7. **Keep resolved discrepancies in the table** with a note on how they were resolved,
   so the record shows what was found and what was decided rather than only the current
   state.
8. **Do not rewrite history.** Changelog entries and version rows describing removed
   things stay as written.
9. **Record the audit itself in `PATCHNOTES.md`** as a version entry, including counts
   of what was found, so the next audit can see what the last one did.

### Naming convention for new tools

Tool names must be generic and searchable. Before naming a tool:

1. Search for the intended name. If the top result is a specific competing product and
   the name is that product's brand rather than a generic phrase, choose a different
   name.
2. The name should be what someone would type into a search engine: "markdown editor",
   "favicon downloader", "link cleaner", "json formatter".
3. Once a tool is named and shipped, do not rename it without a clear reason, and if it
   is renamed, do not rename its file. URL stability matters for search, and the
   Deprecation and Removal section makes that a rule rather than a preference.
