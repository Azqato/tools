# Azqato's Tools

A collection of free web tools that run entirely inside your browser. You open a
page, use the tool, and close the tab. Nothing you type is uploaded, and there is
nothing to install or sign up for.

**Live site:** https://azqato.github.io/tools/

---

## What the site offers

The site is a single landing page listing every tool, plus one page per tool. Four
tools are built and hosted here. Four more are Azqato projects that live on their own
sites and are linked from the same list, marked "external".

### Built and hosted here

**Markdown Editor**
Write Markdown in the left pane and watch it render in the right pane as you type. It
handles headings, bold and italic, strikethrough, code blocks, links, images, lists,
checklists, quotes, and tables. A formatting toolbar inserts the syntax for you if you
would rather not remember it. When you are finished you can copy the finished HTML or
download the file as `.md`. Your draft is saved in your own browser, so closing the tab
by accident does not lose your work.

**Favicon Downloader**
Type any website address and get its icon back in six sizes, from 16 pixels up to 256.
Preview them all, then download the one you want as a PNG or copy a direct link to it.
Useful for mockups, slide decks, documentation, and link previews.

**Link Cleaner**
Paste a link that is cluttered with tracking codes, the `utm_source`, `fbclid`, and
`gclid` fragments that get attached when you copy a link from an email or a social
post, and get back a clean version you can share. The tool shows you exactly which
parts it removed and which it kept, so you can check that nothing you needed was
stripped out. The link never leaves your device; the cleaning happens in your browser.

**Character Counter**
Paste or type text and watch every number update as you go: characters with and without
spaces, words, sentences, paragraphs, and lines, plus an estimate of how long the text
takes to read silently and to say out loud. Underneath, a set of bars shows how the text
measures against the limits people actually run into, an X post, a single SMS, a search
result meta description, a page title, and Instagram and LinkedIn captions, so you can
see at a glance how much room is left or how far over you are.

### Linked from here, hosted elsewhere

**Nasdaq 100 Screener** - grades every company in the Nasdaq 100 against the Azqato
methodology across growth, valuation, profitability, and financial health, and marks
each one Pass, Watch, or Fail.

**Net Worth Tracker** - a Google Sheets template plus a browser view that turns your
account balances into trends and an asset allocation breakdown over time.

**VIX Strategy** - a rules-based system that shifts an allocation between leveraged
growth ETFs and safer assets according to current market volatility.

**Protein Tracker** - logs daily calories and protein against targets you set, and
exports to Excel. Like the tools on this site, it keeps your data on your device.

---

## Who it is for

Anyone who needs a quick utility and does not want to hand their text or their links
to a website they have no reason to trust. That includes developers checking how a
README will render, writers drafting in Markdown, marketers cleaning up campaign
links before sharing them, and designers collecting icons. It also serves readers who
already follow Azqato's financial tools and want them collected in one place.

No account is required, nothing costs anything, and the Markdown Editor and Link
Cleaner keep working with the network switched off. The Favicon Downloader is the one
exception: it needs a connection, because it asks a public icon service for the images.

---

## Current status

Live, stable, and actively developed. Four in-browser tools are finished and working,
and new ones are added when they can meet the same standard: useful, fast, and doing all
their work on your device rather than someone's server. The site has had a full
accessibility pass, so every page can be navigated by keyboard alone, works with a screen
reader, and respects a reduced-motion setting.

---

## Where to learn more

Everything technical lives in [/docs](./docs/):

- [PRD.md](./docs/PRD.md) - what the product is, who it serves, how it is built, how
  to run and deploy it, the conventions it follows, and the decisions behind it
- [DESIGN.md](./docs/DESIGN.md) - colors, typography, spacing, component rules, and
  accessibility standards
- [PATCHNOTES.md](./docs/PATCHNOTES.md) - the versioned record of every change
