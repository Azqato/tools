# Product Requirements Document — Azqato's Tools

**Last updated:** 2026-06-27
**Status:** Active development — v0.1.x

---

## Problem statement

Most freely available web utilities require the user to upload their data to a third-party server, create an account, accept cookies, or endure advertising. Even "simple" tools like Markdown editors and link cleaners transmit user content to a remote service the user cannot inspect or trust. Privacy-conscious users, developers, and people working with sensitive text or URLs have no reliable, branded home for fast, clean, no-compromise tooling.

This product solves that by providing a curated set of utilities that run entirely in the browser — zero server contact for any user data, zero sign-up, zero cost.

---

## Target users

**Primary: The privacy-aware power user**
A developer, writer, or researcher who uses the web constantly and is increasingly frustrated by tools that treat their data as the product. They want the tool to do one thing well and then get out of the way. They likely have an adblocker and are already familiar with Markdown, UTM parameters, and favicons.

**Secondary: The casual content creator / marketer**
Someone who shares links on social media, writes blog posts, or manages a newsletter. They paste URLs with tracking junk into the Link Cleaner and write posts in the Markdown Editor. They don't care about the tech — they care that it works instantly without asking them to log in.

**Tertiary: The Azqato audience / investor researcher**
A user who follows Azqato's content on stocks and personal finance. They arrive via the landing page, use the external tools (Nasdaq 100 Screener, Net Worth Tracker, VIX Strategy) and discover the browser utilities as a bonus. Trust in the Azqato brand is already established.

---

## Goals

1. Every tool on the site works completely offline after first load.
2. No user data ever reaches any server we own or control.
3. The site loads in under 1 second on a standard broadband connection.
4. Adding a new tool takes under two hours from concept to shipped HTML file.
5. The site is discoverable via search for generic, commonly-searched tool names.
6. The brand feels coherent and trustworthy, not like a side project.

---

## Non-goals

- This is not a SaaS product. There will be no user accounts, no database, no backend.
- This is not a tool aggregator or link directory. Every tool must be built or directly owned by Azqato.
- This is not a monetized product in v1. No ads, no affiliate links, no freemium gates.
- This is not a framework showcase. No React, Vue, Next.js, or build tooling will be introduced.
- This is not a feature-complete alternative to professional tools (VS Code, full Markdown processors). These are quick-use utilities.
- Mobile-first is not the priority. Tools are usable on mobile but optimized for desktop.

---

## User stories

- As a developer, I want to write and preview Markdown in my browser so that I can check formatting without installing a local tool or uploading to a service.
- As a content creator, I want to paste a URL and get a clean version without tracking parameters so that I can share links that don't expose my referral source to recipients.
- As a designer or developer, I want to download a website's favicon at multiple resolutions so that I can use it in mockups or documentation without screenshotting the browser tab.
- As a returning Azqato reader, I want to find all of Azqato's tools in one place so that I don't need to remember multiple URLs.
- As a privacy-conscious user, I want to confirm that my input (text, URLs) never leaves my browser so that I can use these tools with sensitive content.
- As a new contributor or AI model, I want to read the documentation and understand the entire project without reading the source code so that I can add a new tool correctly on the first attempt.

---

## Feature list

### MVP (shipped — v0.1.0)

- Landing page with tool grid, hero section, about section, sticky topbar, footer
- Light/dark theme toggle with `localStorage` persistence and `prefers-color-scheme` detection
- Shared design system (CSS custom properties, no framework)
- **Markdown Editor** — split-pane live preview, formatting toolbar, localStorage draft autosave, copy-as-HTML, download as `.md`
- **Favicon Downloader** — fetch favicons at 6 sizes (16, 32, 48, 64, 128, 256px) via Google's gstatic service, download PNG, copy direct link
- **Link Cleaner** — strip ~40+ known tracking parameters by exact name and prefix pattern, show removed vs. kept params, copy clean URL, open clean URL, paste from clipboard
- External tool cards: Nasdaq 100 Screener, Net Worth Tracker, VIX Strategy (linked, not hosted)
- Responsive layout (single-column on mobile)

### Future (post-launch, unordered)

- **Color picker / converter** — pick a color, convert between hex/rgb/hsl/oklch
- **Base64 encoder/decoder** — encode text or files, decode base64 strings
- **JSON formatter** — paste minified JSON, get pretty-printed output with optional tree view
- **Password generator** — configurable length, character sets, entropy display
- **Image compressor** — client-side compression via Canvas API, no upload
- **Word/character counter** — with reading time estimate
- **Diff tool** — paste two text blocks, see a line-by-line diff
- **QR code generator** — URL or text to QR, download as PNG/SVG
- **Timestamp converter** — Unix epoch ↔ human-readable, any timezone
- `prefers-reduced-motion` support in CSS
- Skip-to-main-content accessibility link
- ARIA live region on Markdown preview pane
- Search/filter on landing page tool grid (once 8+ tools exist)

---

## Constraints

- **No Node / no build step.** Every tool must be a self-contained HTML file or a combination of static HTML + shared CSS/JS files. A contributor should be able to add a tool without installing anything.
- **No external JS libraries.** No CDN-loaded jQuery, Lodash, or any third-party script that could inject code or fail if the CDN goes down.
- **Hosting is static-only.** The deployment target is GitHub Pages (or equivalent). No server-side execution is available.
- **Single developer.** There is no team. Documentation and code conventions must be explicit enough that an AI model can contribute without a human reviewer in the loop.
- **No budget.** All third-party services used must have a free tier that does not require a credit card (e.g. Google gstatic favicon service).

---

## Assumptions

- Users have a modern browser (Chrome 90+, Firefox 88+, Safari 14+). No IE11 compatibility is required.
- The Google gstatic favicon service (`t3.gstatic.com/faviconV2`) remains publicly accessible without authentication. If it changes, the Favicon Downloader tool breaks.
- Azqato's external tools (Nasdaq 100 Screener, Net Worth Tracker, VIX Strategy) remain hosted at their current GitHub Pages URLs. If they move, the external cards on the landing page need updating.
- Users who find the site via search are looking for the generic term (e.g. "link cleaner", "markdown editor"), not for the Azqato brand specifically.
- No analytics are needed in v1. Traffic measurement, if added later, must be privacy-respecting (e.g. Plausible, not Google Analytics).

---

## Success criteria

- All three in-browser tools (Markdown Editor, Favicon Downloader, Link Cleaner) function correctly on Chrome, Firefox, and Safari without any network requests for user-input data.
- A new tool can be added by following the documented pattern, without modifying any existing file except `index.html`.
- The landing page scores ≥ 90 on Google Lighthouse for Performance, Accessibility, and Best Practices.
- The site loads in < 1 second on a 4G connection (measured by Lighthouse).
- All documentation is complete enough that an AI model (with no prior context) can correctly implement a new tool on the first attempt.

---

## Tenets

Ordered by priority. When two tenets conflict, the higher one wins.

### 1. Privacy is not a feature, it is the floor

Every tool must work without transmitting user input to any server. This is not a selling point — it is a precondition. A tool that uploads data to process it, even temporarily, is not eligible for this site regardless of how useful it might be. When building a new tool, the first question is: can this run entirely in the browser? If the answer is no, the tool belongs on a different site.

### 2. Generic names over clever names

Every tool is named using the simplest, most searchable descriptor of what it does. "Markdown Editor" not "Inkdown." "Link Cleaner" not "URLSanitizer Pro." The name should be what a user would type into a search engine to find exactly this kind of tool. Never reuse another product's brand name, even if it is also a generic term — verify before shipping.

### 3. Zero dependencies, zero build step

No npm. No webpack. No CDN-loaded libraries. A contributor opens a text editor, writes HTML/CSS/JS, and it works. The moment a build step is introduced, the barrier to contribution goes up and the site's long-term maintainability goes down. Vanilla browser APIs are sufficient for every tool class on the roadmap.

### 4. One file per tool

Each tool lives in its own HTML file. Shared logic lives in `js/common.js` (theme, toast, clipboard). Tool-specific logic lives inline in the tool's HTML or in a dedicated JS file in `/js/`. A tool must never depend on another tool's files. This makes tools individually shareable, debuggable, and removable.

### 5. Ship fast, document thoroughly

Tools should be simple enough to ship in one session. Documentation should be thorough enough that any subsequent session — human or AI — can pick up where the last one left off without re-reading source code. When in doubt, add more to the docs, not more to the tool.

---

## Roadmap

### Current phase: Foundation (v0.1.x)

The site exists with three working in-browser tools and three external tool links. The design system, shared JS, and documentation structure are all in place. The focus now is adding more tools.

### Milestone table

| Milestone | Target | Status |
|-----------|--------|--------|
| v0.1.0 — Initial launch | 2026-06-27 | Complete |
| v0.2.0 — Second tool batch | TBD | Planned |
| v0.3.0 — Accessibility pass | TBD | Planned |
| v1.0.0 — Public launch / deployment | TBD | Planned |

### v0.1.0 feature breakdown (complete)

- Landing page and design system
- Markdown Editor
- Favicon Downloader
- Link Cleaner
- External tool cards (Screener, Net Worth Tracker, VIX Strategy)
- Documentation (README, PRD, DESIGN, PATCHNOTES)

### v0.2.0 planned features

- 2–3 additional tools from the Future list (exact tools TBD)
- Live deployment to GitHub Pages or equivalent

### v0.3.0 planned features

- `prefers-reduced-motion` CSS support
- Skip-to-content link
- ARIA live region on Markdown preview
- Lighthouse accessibility score ≥ 95

### Explicitly deferred

| Feature | Reason deferred |
|---------|----------------|
| Search/filter on landing page | Not useful until 8+ tools exist |
| Analytics | Privacy first; revisit after launch with a privacy-respecting option |
| Dark mode on external tools | Those repos are separate; out of scope here |
| PWA / service worker | Adds complexity; tools already work offline after first load |
| Syntax highlighting in Markdown code blocks | Requires a library; breaks zero-dependency tenet |

---

## Metrics

### North star

**Weekly active sessions** — the number of unique browser sessions per week that interact with at least one tool. This measures whether the site is delivering practical value, not just being visited.

### Acquisition metrics

| Metric | Target | Timeframe | Method |
|--------|--------|-----------|--------|
| Organic search impressions | 500/month | 3 months post-launch | Google Search Console |
| Click-through rate from search | ≥ 3% | 3 months post-launch | Google Search Console |
| Referral traffic from Azqato's other properties | TBD after launch | — | Privacy-respecting analytics |

### Engagement metrics

| Metric | Target | Timeframe | Method |
|--------|--------|-----------|--------|
| Average tools used per session | ≥ 1.5 | 3 months post-launch | Analytics events |
| Markdown Editor: drafts saved to localStorage | Proxy for repeat use | Ongoing | Cannot measure externally |
| Link Cleaner: successful clean operations | — | Ongoing | Analytics event on successful clean |

### Retention metrics

| Metric | Target | Timeframe | Method |
|--------|--------|-----------|--------|
| Returning visitors (%) | ≥ 20% | 6 months post-launch | Privacy-respecting analytics |
| Bookmark rate | Unmeasurable directly | — | Proxy: direct traffic |

### Performance metrics

| Metric | Target | Method |
|--------|--------|--------|
| Lighthouse Performance score | ≥ 90 | Lighthouse CI |
| First Contentful Paint | < 1.0s | Lighthouse |
| Total Blocking Time | < 50ms | Lighthouse |
| Page weight (index.html + CSS + JS) | < 100KB uncompressed | Manual audit |
| Error rate | 0% JS errors on load | Browser console |

### Reporting cadence

Performance metrics: checked on every new tool addition. Analytics: reviewed monthly after deployment.

---

## Runbook

### Local setup (from a fresh machine)

1. Install Git (https://git-scm.com) if not already installed.
2. Clone the repo:
   ```bash
   git clone <repo-url>
   cd tools
   ```
3. Open `index.html` in a browser. No other steps required.

Optional: run a local HTTP server to avoid any CORS issues with the Favicon Downloader's `fetch()` call:
```bash
python3 -m http.server 8080
# visit http://localhost:8080
```

### Build

There is no build. The source is the output.

### Deploy

**GitHub Pages:**
1. Push to `main` branch.
2. In the repo settings → Pages → Source: `main` branch, `/ (root)`.
3. GitHub Pages will serve `index.html` at `https://<username>.github.io/<repo-name>/`.

**Netlify / Vercel / Cloudflare Pages:**
1. Connect the repo.
2. Set publish directory to `/` (or leave blank for auto-detect).
3. Set build command to empty/none.
4. Deploy.

### Rollback

Since there is no build, rollback = `git revert` or checking out a previous commit:
```bash
git revert HEAD          # creates a new commit undoing the last change
# or
git checkout <sha> -- .  # restores files from a specific commit (then commit)
```

Never force-push to `main`.

### Environment configs

| Environment | Notes |
|-------------|-------|
| Local (filesystem) | Open HTML directly. Clipboard API may be restricted to `file://` origin. |
| Local (HTTP server) | `localhost:8080`. All APIs work. |
| Production (static host) | All APIs work. Favicon Downloader requires internet for gstatic requests. |

No environment-specific config files exist. There are no environment variables.

### Common errors

| Error | Likely cause | Fix |
|-------|-------------|-----|
| Theme flashes to light on load | `common.js` loaded after content renders | Move `<script src="js/common.js">` earlier, or set `data-theme` in `<head>` via inline script |
| Favicon images don't load | Ad blocker blocking gstatic.com | Inform user; no fix possible client-side |
| Clipboard paste button fails | Page served over `file://` | Serve via HTTP server |
| Favicon download opens new tab instead of downloading | CORS restriction on gstatic | Expected fallback — user must right-click to save |
| Markdown table not rendering | Missing leading/trailing `\|` on row | Known parser limitation; user must format table correctly |

### Monitoring

No monitoring infrastructure exists in v1. Check the browser console on load for JS errors. Lighthouse can be run manually via Chrome DevTools or CLI.

---

## Technical requirements

### System architecture

Fully static, client-side-only. There is no server component of any kind. The architecture is:

```
User browser
  └── Loads static HTML from file system or static host
        ├── css/style.css            (design system)
        ├── js/common.js             (theme, toast, clipboard)
        ├── js/markdown.js           (Markdown parser)       [Markdown Editor only]
        └── js/linkcleaner.js        (URL param stripper)    [Link Cleaner only]
```

Network requests made by the browser:
- `GET` the HTML, CSS, and JS files from the host (standard page load)
- `GET https://t3.gstatic.com/faviconV2?...` — Favicon Downloader only, one request per size per domain lookup

No user data is sent in any network request.

### Tech stack

| Technology | Version / Spec | Role |
|-----------|----------------|------|
| HTML | HTML5 | Page structure, semantic markup |
| CSS | Level 3+ (custom properties, grid, flexbox, `color-mix`, `clamp`) | Design system, layout, theming |
| JavaScript | ES5 + modern browser APIs | All interactive logic |
| Browser APIs used | `localStorage`, `URL`, `Blob`, `fetch`, `navigator.clipboard`, `URL.createObjectURL`, `window.matchMedia` | Feature-specific |
| Google gstatic favicon service | No version (external) | Favicon Downloader image source |

**No frameworks. No libraries. No build tools. No package manager.**

### Folder structure

```
/
├── README.md                   ← Developer docs entry point
├── index.html                  ← Landing page
├── initialconcept.txt          ← Original project brief (reference only)
├── css/
│   └── style.css               ← Full design system — all pages share this
├── js/
│   ├── common.js               ← Theme toggle, toast, copyText helper
│   ├── markdown.js             ← Self-contained Markdown → HTML parser
│   └── linkcleaner.js          ← Tracking-param detection and removal
├── markdown-preview.html       ← Markdown Editor tool page
├── favicon-downloader.html     ← Favicon Downloader tool page
├── link-cleaner.html           ← Link Cleaner tool page
└── docs/
    ├── PRD.md                  ← This file
    ├── DESIGN.md               ← Visual design system documentation
    └── PATCHNOTES.md           ← Versioned changelog
```

### Data models

This project has no persistent server-side data. The only persisted state is in the browser's `localStorage`.

**localStorage entries:**

| Key | Type | Value | Set by |
|-----|------|-------|--------|
| `azqato-theme` | `string` | `"light"` or `"dark"` | `common.js` on theme toggle |
| `azqato-md-draft` | `string` | Raw Markdown content of the current editor session | `markdown-preview.html` on every input event |

No cookies. No IndexedDB. No sessionStorage.

**In-memory state (not persisted):**

| Tool | State variable | Type | Description |
|------|---------------|------|-------------|
| Link Cleaner | `current` | `string` | The most recently cleaned URL, used by Copy and Open buttons |
| Favicon Downloader | `SIZES` | `number[]` | `[16, 32, 48, 64, 128, 256]` — the set of sizes to fetch |
| Markdown Editor | `SAMPLE` | `string` | Default content shown on first visit |

### API design (internal data flow)

**`common.js` exports (attached to `window`):**

| Function | Parameters | Returns | Description |
|----------|-----------|---------|-------------|
| `window.toast(msg)` | `msg: string` | `void` | Shows a toast notification, auto-dismisses after 1.9s |
| `window.copyText(text, okMsg)` | `text: string`, `okMsg: string?` | `void` | Copies text to clipboard; shows toast on success |

**`markdown.js` exports:**

| Function | Parameters | Returns | Description |
|----------|-----------|---------|-------------|
| `window.mdToHtml(src)` | `src: string` | `string` | Converts Markdown string to HTML string. Recursive for blockquotes. |

Supported Markdown features: ATX headings (H1–H6), bold (`**`/`__`), italic (`*`/`_`), bold+italic (`***`/`___`), strikethrough (`~~`), inline code (`` ` ``), fenced code blocks (` ``` `), links (`[text](href)`), images (`![alt](src)`), unordered lists (`-`, `*`, `+`), ordered lists (`1.`), task lists (`- [ ]`/`- [x]`), blockquotes (`>`), horizontal rules (`---`/`***`/`___`), GFM tables (`| col |`), hard line breaks (two trailing spaces).

Not supported: nested lists, footnotes, definition lists, raw HTML passthrough (intentionally disabled for security).

**`linkcleaner.js` exports:**

| Function | Parameters | Returns | Description |
|----------|-----------|---------|-------------|
| `window.cleanUrl(raw)` | `raw: string` | `CleanResult` | Parses URL, removes tracking params, returns result object |

`CleanResult` shape:
```js
{
  valid: boolean,        // false if input is empty or unparseable
  clean: string,         // the cleaned URL string (only present if valid)
  removed: Array<{key: string, value: string}>,  // params that were removed
  kept: string[]         // param keys that were preserved
}
```

Tracking params removed by **exact name** (case-insensitive): `fbclid`, `gclid`, `gclsrc`, `dclid`, `wbraid`, `gbraid`, `msclkid`, `yclid`, `twclid`, `igshid`, `igsh`, `mc_eid`, `mc_cid`, `_hsenc`, `_hsmi`, `vero_id`, `vero_conv`, `oly_anon_id`, `oly_enc_id`, `rb_clickid`, `s_cid`, `ml_subscriber`, `ml_subscriber_hash`, `spm`, `scm`, `ref_src`, `ref_url`, `fb_action_ids`, `fb_action_types`, `fb_ref`, `fb_source`, `action_object_map`, `action_type_map`, `action_ref_map`, `gs_l`, `amp`, `_ga`, `_gl`, `trk`, `trkCampaign`, `sc_channel`, `sc_campaign`, `sc_geo`, `sc_country`, `sc_outcome`, `ttclid`, `li_fat_id`.

Tracking params removed by **prefix**: `utm_`, `pk_`, `mtm_`, `matomo_`, `hsa_`, `vgo_`, `oly_`, `_branch_`, `__hs`, `ck_`, `mkt_tok`.

**Favicon Downloader (inline in HTML):**

| Function | Parameters | Description |
|----------|-----------|-------------|
| `normalizeDomain(raw)` | `raw: string` | Strips protocol and path, validates domain format, returns lowercase domain or `null` |
| `faviconUrl(domain, size)` | `domain: string`, `size: number` | Returns the Google gstatic favicon URL for the given domain and size |
| `download(url, name)` | `url: string`, `name: string` | Fetches image via CORS, creates Blob URL, triggers download. Falls back to `window.open` if fetch fails. |

### State management

State is entirely local to each page. There is no shared runtime state between pages. The only cross-session state is stored in `localStorage` (theme preference, Markdown draft). Each tool initializes its own state variables at page load.

### Third-party integrations

| Service | URL | What it does | Auth |
|---------|-----|-------------|------|
| Google gstatic favicon service | `https://t3.gstatic.com/faviconV2` | Returns favicon images for any domain at requested sizes | None (public, unauthenticated) |

This is the only third-party service. It receives: the domain the user typed. It does not receive the user's Markdown text, URLs being cleaned, or any other user data.

### Performance requirements

| Metric | Target |
|--------|--------|
| Total page weight (index + CSS + JS) | < 100KB uncompressed |
| Lighthouse Performance | ≥ 90 |
| First Contentful Paint | < 1.0s |
| No render-blocking resources | Required — CSS in `<head>`, JS at end of `<body>` |
| No external font requests | Required |
| No third-party scripts | Required |

Current approximate weights:
- `style.css`: ~12KB
- `common.js`: ~1.5KB
- `markdown.js`: ~6KB
- `linkcleaner.js`: ~2KB
- `index.html`: ~6KB

Total index page: ~20KB. Well within target.

### Known technical debt

| Item | Shortcut taken | Correct solution |
|------|---------------|-----------------|
| Markdown inline code sentinel | Uses a literal null char (` `) as a placeholder to protect code spans from inline formatting rules | Use a UUID-style string that cannot appear in normal text |
| No `prefers-reduced-motion` | All CSS transitions fire regardless of system motion preference | Add `@media (prefers-reduced-motion: reduce)` block that sets all transitions to 0 |
| No skip-to-content link | Not implemented | Add `<a class="skip-link" href="#main">Skip to content</a>` as first child of `<body>` |
| Markdown preview has no live ARIA region | Screen readers don't announce updates to the preview pane | Add `role="region"` + `aria-live="polite"` to `.md-preview` |
| Theme flash potential | `common.js` is loaded at end of `<body>`; light theme default is on `<html>` | If dark mode is desired but not yet applied, there can be a flash. Mitigate by moving theme-init to an inline `<script>` in `<head>`. |
| Favicon download CORS fallback | When fetch fails due to CORS, falls back to `window.open` (user must right-click to save) | No better solution exists without a proxy server, which would violate the no-server tenet |

---

## Security

### Authentication model

None. The site has no users, no accounts, and no sessions. Every visitor is anonymous.

### Authorization model

Not applicable. All content is public. There are no admin features, no restricted pages, and no role system.

### Data storage

**What is stored:** Only two `localStorage` keys (theme preference, Markdown draft). Both are stored locally in the user's browser only. Neither is transmitted anywhere.

**What is not stored:** URLs cleaned by the Link Cleaner, favicons requested, or any other tool inputs are never persisted beyond the page session.

### Environment variables

There are none. No secrets exist in this project. There is nothing to commit accidentally.

### Third-party trust

| Service | Data received | Why |
|---------|--------------|-----|
| Google gstatic (`t3.gstatic.com`) | The domain typed by the user into the Favicon Downloader | Required to fetch favicon images. Google may log these requests per their standard privacy policy. |

No other third party receives any user data. In particular:
- The Markdown Editor: text never leaves the browser.
- The Link Cleaner: URLs are parsed entirely by the native `URL` API; no network request is made.

### Known attack surface

| Area | Risk | Mitigation |
|------|------|-----------|
| Markdown preview (`innerHTML`) | Markdown input could contain XSS if rendered unsanitized | `markdown.js` HTML-escapes all input via `escapeHtml()` before parsing. Raw HTML passthrough is explicitly not supported. |
| Link Cleaner URL parsing | Malformed URLs | Wrapped in `try/catch` around `new URL()`; invalid input returns `{ valid: false }` |
| Favicon Downloader domain input | User types a malicious domain | `normalizeDomain()` validates against a regex before use. The constructed URL is passed to gstatic, not executed locally. |
| Link protocol whitelisting | Markdown links with `javascript:` href | `escapeAttr()` is applied to all href values; additionally a whitelist check `^(https?:|mailto:|#|\/|\.)` is enforced — any other protocol falls back to `#`. |

### Dependency policy

There are no dependencies (no npm, no CDN libraries). There is nothing to monitor for CVEs. The only external code executed is the browser itself.

---

## Press release

**FOR IMMEDIATE RELEASE**

**Azqato Launches Free Browser-Based Tool Suite — No Sign-Up, No Servers, No Compromise**

*A growing collection of everyday utilities that run entirely on your device, protecting your privacy while doing the work you actually need done.*

**London, 27 June 2026** — Azqato today launched Azqato's Tools, a free collection of browser-based utilities built to solve everyday tasks without asking users to hand over their data. The first release includes a Markdown Editor, a Favicon Downloader, and a Link Cleaner — three tools used daily by developers, writers, and content creators — alongside links to Azqato's existing financial tools including a Nasdaq 100 Screener, Net Worth Tracker, and VIX Strategy dashboard.

Unlike most web utilities, Azqato's Tools does not send user input to any server. All processing happens locally in the browser using native web technologies. The site requires no account, no email address, and installs nothing. It works offline after the first load.

The tools were built using Claude Code and ship as plain HTML, CSS, and JavaScript — no frameworks, no build step, no dependencies. Azqato plans to add new tools regularly, with upcoming candidates including a JSON formatter, Base64 encoder, and color converter.

**The problem this solves:**
Every time you paste text into a random "free" online tool, you're trusting a server you cannot see with data you may not want to share. Writers paste drafts into Markdown editors. Marketers paste customer URLs into link cleaners. These tools almost always send that data to a remote server, log it, and occasionally sell it. There was no single branded, trustworthy home for fast, private browser tools — until now.

**How it works:**
Visit the site, open a tool, and use it. The Markdown Editor renders your document as you type, saves drafts to your own browser storage, and lets you export as HTML or `.md`. The Link Cleaner strips over 40 known tracking parameters from any URL using the browser's native URL API — no network request required. The Favicon Downloader fetches icons from Google's public favicon service and lets you download them at any size.

*"I was sick of pasting my content into tools I didn't trust, just to preview some Markdown or strip a UTM tag. Azqato's Tools does exactly what I need and nothing else — I closed the tab and my draft was gone from their servers, because there are no servers."*
— Jordan K., content strategist and early user

**Try it now:** Visit [Azqato's Tools] (URL TBD at launch).

Azqato is an independent publisher and tool builder focused on financial research and practical web utilities. Azqato's existing tools — including a Nasdaq 100 Screener that grades every index company on the Azqato methodology, a Google Sheets-powered Net Worth Tracker, and a VIX-based portfolio allocation strategy — have been used by individual investors and personal finance enthusiasts since 2024.

---

## Frequently asked questions

### External FAQ

**What is Azqato's Tools?**
A free collection of web utilities that run entirely in your browser. You use them the same way you'd use any website, but your data never leaves your device.

**Who is it for?**
Anyone who uses the web to write, share links, or do research. The tools are particularly useful for developers, content creators, marketers, and privacy-conscious users.

**How do I use it?**
Go to the site, click a tool, and start using it. There's no sign-up, no tutorial, and no configuration required.

**Does it cost anything?**
No. All tools are free. There is no paid tier, no freemium model, and no advertising.

**Do I need to create an account?**
No. There are no accounts.

**Does the site track me?**
No analytics are running in v1. The only third-party network request made by the site is to Google's favicon service when you use the Favicon Downloader.

**What happens to the text I type in the Markdown Editor?**
It stays in your browser. The text is saved to your browser's `localStorage` so your draft survives a page refresh. It is never sent to any server.

**What about the URLs I paste into the Link Cleaner?**
They are processed entirely by your browser using the native `URL` API. No network request is made. The URL never leaves your device.

**Does the Favicon Downloader send my data anywhere?**
The domain you type is sent to Google's public favicon service (`t3.gstatic.com`) to retrieve the icon image. This is the only data that leaves your device when using this tool.

**Does it work offline?**
The Markdown Editor and Link Cleaner work fully offline after first load. The Favicon Downloader requires internet access to fetch icons from Google's service.

**What browsers does it support?**
Chrome 90+, Firefox 88+, Safari 14+, Edge 90+. It does not support Internet Explorer.

**Is the source code available?**
Yes. The project is open source and available on GitHub.

**Can I use this on my phone?**
Yes. The site is responsive. The Markdown Editor stacks into a single column on narrow screens.

**How is this different from [markdownlivepreview.com / linkcleaner.app / similar tools]?**
The primary difference is the privacy model. Most similar tools are hosted services that process your data on their servers. Azqato's Tools processes everything locally. Additionally, all tools share a consistent design system and live under one roof.

**How often are new tools added?**
There is no set schedule. New tools are added when they are useful and can be built to the same privacy and quality standards.

**Can I suggest a tool?**
Yes — open a GitHub issue on the repo.

**What Markdown features are supported?**
Headings (H1–H6), bold, italic, bold+italic, strikethrough, inline code, fenced code blocks, links, images, unordered lists, ordered lists, task lists (checkboxes), blockquotes, horizontal rules, and GFM tables. Nested lists and raw HTML are not supported.

**Why doesn't syntax highlighting work in code blocks?**
Syntax highlighting requires a library, which would violate the zero-dependency principle. This is a known limitation.

**What tracking parameters does the Link Cleaner remove?**
Over 40 known parameters including all `utm_*` variants, `fbclid`, `gclid`, `msclkid`, `ttclid`, `igshid`, HubSpot (`_hs*`), Mailchimp (`mc_*`), and many others. Parameters not on the list are preserved. You can see exactly what was removed and what was kept after each clean operation.

**Can I add my own parameters to the removal list?**
Not currently. This would require a UI for custom rules. It is on the future feature list.

**What sizes does the Favicon Downloader fetch?**
16×16, 32×32, 48×48, 64×64, 128×128, and 256×256 pixels.

**The favicon isn't loading. What's wrong?**
The most common cause is an ad blocker blocking the Google gstatic domain. Try disabling your ad blocker for this page, or add `t3.gstatic.com` to your allowlist.

**Where can I get help?**
Open a GitHub issue at the project repository.

### Internal FAQ

**What is the ROI of this project?**
The site builds brand trust and discoverability for the broader Azqato ecosystem. Users who find the free tools via search are introduced to Azqato's financial tools (Screener, Net Worth Tracker, VIX Strategy), which represent the core content offering. The tools site is a low-cost, high-value top-of-funnel.

**What does success look like in 6 months?**
≥ 500 weekly active sessions, ≥ 20% returning visitors, and at least 2 additional tools shipped. Organic search traffic for at least 3 generic tool queries (e.g. "link cleaner", "markdown editor online").

**What's the biggest risk?**
The Google gstatic favicon service is undocumented and unauthenticated. If Google restricts or removes it, the Favicon Downloader breaks with no easy fix. A future mitigation would be to add a direct `/favicon.ico` fallback fetch for domains that support it.

**How are documentation decisions made?**
All documentation follows the structure defined in this PRD. When new tools are added, the following must be updated: `index.html` (landing card), `PATCHNOTES.md` (new version entry), `PRD.md` (feature list, tool descriptions in Technical Requirements). `DESIGN.md` only needs updating if the new tool introduces a new component pattern or color token.

**How is this project maintained?**
Single-developer project built with Claude Code. Claude Code sessions can be started fresh and the model can read the `/docs` folder to get full context before making any changes. All conventions, tenets, and naming rules are documented here to avoid drift between sessions.

---

## Documentation maintenance

This section defines how documentation should be maintained going forward.

### When to update each file

| File | Update when |
|------|------------|
| `README.md` | The project is deployed (add live URL), tech stack changes, or folder structure changes |
| `PATCHNOTES.md` | Every time any file in the project changes — even small fixes get a patch entry |
| `DESIGN.md` | A new CSS token is added, a new component pattern is introduced, or a responsive breakpoint changes |
| `PRD.md` | A new tool ships (feature list, technical requirements), a tenet is reconsidered, roadmap changes, or a new FAQ entry is warranted |

### How to add a new tool (checklist)

1. Create `<tool-name>.html` at the project root following the page scaffold pattern (topbar, `.page.wrap`, `.page-head`, tool content, footer, `common.js`).
2. Add any tool-specific JS to a new file in `/js/<tool-name>.js` if it's reusable; otherwise inline it.
3. Add any tool-specific CSS to the appropriate section in `css/style.css` with a section comment.
4. Add a `.tool-card` entry to `index.html`.
5. Update `PRD.md` — move the tool from Future to MVP in the feature list; add it to the Technical Requirements section.
6. Update `PATCHNOTES.md` — add a new version entry under Added.
7. If the tool introduces a new design pattern, update `DESIGN.md`.

### Naming convention

Tool names must be generic and searchable. Before naming a tool:
1. Search for the name — if the top result is a specific competing product and the name is that product's brand (not a generic term), choose a different name.
2. The name should be what someone would type into a search engine: "markdown editor", "favicon downloader", "link cleaner", "json formatter".
3. Once a tool is named and shipped, do not rename it without a clear reason — URL stability matters for search.
