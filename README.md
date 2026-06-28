# Azqato's Tools

A collection of free, browser-based utilities. Every tool runs entirely client-side — no server, no build step, no dependencies.

Live site: TBD (not yet deployed)

Full documentation: [/docs](./docs/)

---

## Tech stack

| Layer | Technology | Version / Notes |
|-------|-----------|-----------------|
| Markup | HTML5 | Semantic, no template engine |
| Styles | CSS3 | Custom properties, no framework |
| Logic | JavaScript | ES5 + modern APIs (URL, Clipboard, Blob, localStorage) |
| Build | None | Files served as-is |
| Hosting | Static file host | GitHub Pages or equivalent |

No Node, no npm, no bundler. There is nothing to install.

---

## Prerequisites

- Any modern browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- A static file server for local development (optional — files open directly from disk)

There is no Node version requirement because there is no Node dependency.

---

## Installation

```bash
git clone <repo-url>
cd tools
```

That is the entire installation. No `npm install`, no `.env`, no config files.

---

## Running locally

**Option 1 — open directly (simplest):**
Double-click `index.html`. All pages work from the local filesystem.

**Option 2 — local HTTP server (avoids any browser CORS restrictions):**

Using Python (built into macOS/Linux):
```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

Using Node (if available):
```bash
npx serve .
# then open http://localhost:3000
```

Default port depends on the server you choose. No port is hardcoded in the project.

---

## Environment variables

None. There are no environment variables. No secrets are used. The only external network call is the Google Favicon service used by the Favicon Downloader tool, and that URL is hardcoded in `favicon-downloader.html`.

---

## Build and deploy

There is no build step. The output is identical to the source.

**To deploy:**
1. Copy the entire project directory to any static file host.
2. The entry point is `index.html` at the root.

**GitHub Pages:**
```bash
git push origin main
# enable GitHub Pages in repo settings, set source to main branch / root
```

**Any other host (Netlify, Vercel, Cloudflare Pages):**
Set publish directory to `/` (repo root). No build command required.

---

## Project structure

```
/
├── README.md
├── index.html              ← Landing page / tool directory
├── css/
│   └── style.css           ← Shared design system
├── js/
│   ├── common.js           ← Theme toggle, toast, clipboard helper
│   ├── markdown.js         ← Custom Markdown → HTML parser
│   └── linkcleaner.js      ← Tracking-param stripper
├── markdown-preview.html       ← Markdown Editor tool
├── favicon-downloader.html     ← Favicon Downloader tool
├── link-cleaner.html           ← Link Cleaner tool
└── docs/
    ├── PRD.md
    ├── DESIGN.md
    └── PATCHNOTES.md
```

---

## Documentation

See [/docs](./docs/) for:

- [PRD.md](./docs/PRD.md) — product requirements, roadmap, runbook, technical spec, security, press release, FAQ
- [DESIGN.md](./docs/DESIGN.md) — color tokens, typography, spacing, component patterns, accessibility
- [PATCHNOTES.md](./docs/PATCHNOTES.md) — versioned changelog
