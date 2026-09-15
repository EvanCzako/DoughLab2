# SEO + Analytics Plan

Working checklist for making the portfolio discoverable and measurable.

Ordered by dependency, not by payoff. The ordering rule: **anything that names a
URL waits until the domain question is settled**, because a later domain move
rewrites that work and splits any analytics history at exactly the point it
starts being useful.

## Current state

| Property        | URL                         | Repo           | Stack |
| --------------- | --------------------------- | -------------- | ----- |
| Hub (this repo) | `evanczako.com`             | `dough-lab-2`  | CRA   |
| DoughLoops      | `doughloops.evanczako.com`  | `DoughLoops2`  | Vite  |
| ChordFinder     | `chordfinder.evanczako.com` | `ChordFinder2` | Vite  |
| SynthPutty      | `synthputty.evanczako.com`  | `SynthPutty`   | CRA   |

All four now sit on `evanczako.com`, each served over HTTPS from its own GitHub
Pages repo. The old `evanczako.github.io/<repo>/` URLs 301 to the new hosts, so
existing links keep working.

All four repos are committed, pushed and deployed; nothing below is running from
an uncommitted working tree, and nothing is waiting on a build.

**All four now serve the full metadata set** — title, description, canonical,
og tags, a 1200x630 card, `sitemap.xml` and a `robots.txt` naming it — verified
live rather than assumed:

| Host                        | page | og.png | sitemap.xml | robots.txt |
| --------------------------- | ---- | ------ | ----------- | ---------- |
| `evanczako.com`             | 200  | 200    | 200         | 200        |
| `doughloops.evanczako.com`  | 200  | 200    | 200         | 200        |
| `chordfinder.evanczako.com` | 200  | 200    | 200         | 200        |
| `synthputty.evanczako.com`  | 200  | 200    | 200         | 200        |

**What is left is phase 2 and phase 5** — Search Console and Bing, then
analytics. Both are dashboard-and-DNS work rather than code; no repo currently
needs a change for either.

---

## Phase 0 — The decision everything else hangs on — DECIDED

- [x] **Decided: the three apps move onto `evanczako.com` as subdomains.**

| App         | New home                    | Repo           |
| ----------- | --------------------------- | -------------- |
| DoughLoops  | `doughloops.evanczako.com`  | `DoughLoops2`  |
| ChordFinder | `chordfinder.evanczako.com` | `ChordFinder2` |
| SynthPutty  | `synthputty.evanczako.com`  | `SynthPutty`   |

What this buys is one brand, URLs worth putting on a résumé, and one dashboard
instead of four. It is _not_ mainly an authority play: Google treats a subdomain
as substantially its own site, so consolidation there is weaker than the phrase
suggests.

**Subdirectories (`evanczako.com/doughloops/`) would consolidate signals better,
and were rejected.** GitHub Pages attaches a custom domain to exactly one repo,
and that repo owns the whole domain, so subdirectories are impossible without
either merging the four repos into a monorepo that builds into one publishing
branch, or putting a proxy in front of the domain (a Cloudflare Worker rewriting
`/doughloops/*` to `evanczako.github.io/DoughLoops2/*`, or Netlify/Cloudflare
Pages rewrite rules). Both are real machinery and new ways to break a working
deploy, chasing a difference that is noise at this traffic level.

### DNS as it stands (checked, Namecheap BasicDNS)

Already correct, nothing to undo:

- Apex `evanczako.com` — the four GitHub Pages A records
  (`185.199.108-111.153`).
- `www` — CNAME to `evanczako.github.io`.
- `doughloops`, `chordfinder`, `synthputty` — CNAME to `evanczako.github.io.`
  (added in phase 4, all resolving).
- `_github-pages-challenge-evanczako` — TXT, the domain-verification challenge.
  Leave it in place permanently; removing it un-verifies the domain.

## Phase 1 — Hub metadata — DONE

- [x] **`og:image` + Twitter card.** `public/og.png`, 1200x630. Source is
      `tools/og-card.html`; `npm run og` re-renders it through headless Chrome.
      Portrait, name, role, domain, and the three app wordmarks. The card copies
      the Midnight seeds from `variables.module.css`, so re-run the script after
      any palette change.
- [x] **Canonical URL.**
- [x] **JSON-LD `Person` schema**, including `sameAs` for GitHub, LinkedIn and
      MATLAB Central.
- [x] **`public/sitemap.xml`.**
- [x] **`robots.txt` points at the sitemap.**
- [x] **Gitignored `public/__viewports.html`** so the dev harness stops being
      deployable.

Two things worth knowing about what landed:

**The sitemap has one URL, not four.** A sitemap may only list URLs on the host
that serves it, so `evanczako.github.io/...` entries would be ignored. The apps
get their own sitemaps in phase 4. The hub itself is genuinely one page — About,
Skills and Projects are anchors, not routes.

**The résumé was removed rather than hidden — DECIDED.** `public/resume_fullstack.pdf`
was indexable and linked from the footer, so Google would have indexed it
regardless of the sitemap. Rather than add a `Disallow` line, both the footer
link and the PDF itself are gone: a `Disallow` would have left the file
reachable at a stable public URL to anyone who guessed or had the link, and
GitHub Pages cannot send the `X-Robots-Tag` header that would otherwise be the
cleaner tool. Restore from git history if it is wanted again — and add the
`Disallow` line at the same time if it should stay out of results.

## Phase 2 — Search dashboards — DONE

Completed 2026-09-14. Verified, all four sitemaps submitted, indexing
requested, Bing imported, and the social card caches re-scraped.

**What Search Console is, for whoever reads this next.** Google's dashboard for
a site's owner, and the only source of one thing: **the queries people typed to
reach you**. Analytics describes what happens _after_ someone arrives; Search
Console describes what happened _before_, because only Google sees the query. It
also reports which pages are actually indexed and why the rest are not, accepts
sitemap submissions, and re-crawls a single URL on demand.

It reports from the day the property is created and backfills nothing, which is
why it sat this early in the plan — the intent was a baseline from before the
metadata work. In practice phases 1, 3 and 4 shipped first, so the before/after
is partial. Not fatal; the tool is worth having regardless.

- [x] **Google Search Console** — Domain property on `evanczako.com` created
      and verified 2026-09-14. Domain rather than URL prefix: verified once by
      DNS, covers the apex, `www`, all three app subdomains and both protocols,
      where URL-prefix would have meant four properties and four verifications.
- [x] **TXT record added at Namecheap** and confirmed resolving on both Google
      and Cloudflare resolvers. Three TXT records now exist and all three must
      stay: the Google verification record at `@`, the SPF record at `@`, and
      GitHub's `_github-pages-challenge-evanczako`. Removing either
      verification record un-verifies that service. Values are deliberately not
      written down here — this repo is public, and both are readable from DNS
      (`dig +short TXT evanczako.com`) whenever they are needed.
- [x] **All four sitemaps submitted** 2026-09-14, one URL discovered each
      (correct — every property is genuinely a single page).

                For a Domain property there is no host dropdown on the Sitemaps page:
                type the **full URL** (`https://doughloops.evanczako.com/sitemap.xml`),
                not just the path. Entering a bare domain submits the HTML page as a
                sitemap, which errors with "Sitemap is HTML" and discovers nothing; it is
                harmless, and removed via the row's ⋮ menu.

- [x] **Request indexing** on the four home pages via URL Inspection. Optional,
      but it turns "indexed in a week or two" into "a day or two".
- [x] **Bing Webmaster Tools** — <https://www.bing.com/webmasters>, then _Import
      from Google Search Console_. Reuses the verification just done, so it
      needs no second DNS record. Worth it because ChatGPT-style search surfaces
      pull from Bing's index.

### Re-scrape the social cards

Not Search Console, but the same "tell the crawlers" errand, and best done in
the same sitting. Scrapers cache aggressively, and DoughLoops in particular had
a **broken** preview cached for however long it was live — that stale entry will
otherwise keep being served.

- [x] **Facebook Sharing Debugger** (<https://developers.facebook.com/tools/debug/>)
      — "Scrape Again" for each of the four URLs.
- [x] **LinkedIn Post Inspector** (<https://www.linkedin.com/post-inspector/>) —
      same four URLs. LinkedIn's cache is the stickiest of the lot.
      Slack and iMessage re-fetch on their own within a day or so; nothing to do there.

## Phase 3 — App metadata — DONE

**Merged with phase 4's URL-dependent half and done in one pass per repo.** The
split existed only because the domain was unsettled; once the move landed there
was nothing to wait for, and two trips through three repos would have been pure
overhead. So `og:url`, `canonical`, `sitemap.xml` and `robots.txt` were written
alongside the titles and cards rather than after them.

State before the work, audited live rather than assumed:

| App         | Bundler | Title             | Description | og tags                           |
| ----------- | ------- | ----------------- | ----------- | --------------------------------- |
| DoughLoops  | Vite    | good, descriptive | good        | present, but `og:image` is broken |
| ChordFinder | Vite    | bare name         | none        | none                              |
| SynthPutty  | CRA     | bare name         | present     | none                              |

Per app, all shipped and confirmed live:

- [x] **DoughLoops** — absolute `og:image`, `twitter:card` to
      `summary_large_image`, `og:url` corrected. Title and description were
      already fine.
- [x] **ChordFinder** — everything: `<title>`, description, og tags, card.
- [x] **SynthPutty** — descriptive `<title>`, og tags, card. Description was
      already fine.
- [x] **`manifest.json`** — only SynthPutty has one, and it was still CRA's
      stock `"React App"` / `"Create React App Sample"`, pointing at a
      `favicon.ico` the repo does not contain. Rewritten; the dead icon entry
      dropped. DoughLoops and ChordFinder ship no manifest at all, so there was
      nothing to update there.

### Two live bugs this fixed

**DoughLoops' `og:image` was a relative path** (`/assets/favicon-...png`), which
no scraper can resolve — the tag was present and the preview was broken, and it
pointed at a favicon rather than a 1200x630 card. Its `og:url` also still named
`evanczako.github.io/DoughLoops2/`, which after the move actively contradicted
the 301 pointing the other way.

### The cards

Each app got the hub's `tools/` kit — `og-card.html`, `make-og.sh`, the inlined
Space Grotesk — plus an `npm run og` script, so all four regenerate identically.

Rather than a logo on a background, each card draws the app doing its job, using
that app's own palette tokens so the card and the UI cannot drift apart:

| App         | Motif                                                                        |
| ----------- | ---------------------------------------------------------------------------- |
| DoughLoops  | a real 16-step, 4-track pattern in `DrumGrid`'s cell/stripe/playhead colours |
| ChordFinder | two octaves with a D7 pressed, in the app's `--key-*` tokens                 |
| SynthPutty  | a harmonic series under a resonant lowpass, in the `--eq-*` colours          |

Two things worth knowing before editing them:

- **The DoughLoops and SynthPutty logos are matted on opaque black**, not
  transparent, so on the `#0b0b10` page they read as hard-edged boxes. Both use
  `mix-blend-mode: screen`, which maps pure black to the page colour exactly.
  ChordFinder's badge has real transparency and needs no such trick.
- **The SynthPutty trace is synthetic, not a capture** — harmonics spaced on a
  log-frequency axis the way an analyser plots them. It is deliberately drawn
  with no frequency numbers on the axis, since labelled ticks would imply a
  precision the picture does not have.

Copy guidance followed: "ChordFinder" and "SynthPutty" are coined names nobody
searches for, so the titles lead with what people actually type — "online chord
identifier", "polyphonic browser synthesizer". DoughLoops already did this
("in-browser step sequencer") and was the model.

### Footgun found in the deploy

**DoughLoops is the only repo whose `deploy` script lives in `client/`, not the
repo root** — its root `package.json` has no `deploy` at all. `npm run deploy`
from `DoughLoops2/` fails with "Missing script: deploy" while the other two,
which deploy from their roots, work fine. This silently cost one deploy cycle:
the commit pushed, the publish never ran, and the site kept serving the old
build with no error anywhere.

## Phase 4 — Consolidation, and the metadata that names a URL

Skip the first half if phase 0 landed on "stay on github.io", but still do the
second half against the github.io URLs.

### The move

Order matters: **DNS first, CNAME file second.** Committing a `CNAME` for a
hostname that does not resolve yet makes GitHub Pages flag the domain and can
fail HTTPS provisioning.

Local checkouts live in `Portfolio apps/`, one level above this repo, under
names that do not all match their remotes:

| App         | Local dir        | Remote            | Stack | Published dir |
| ----------- | ---------------- | ----------------- | ----- | ------------- |
| DoughLoops  | `DoughLoops2`    | `DoughLoops2`     | Vite  | `client/dist` |
| ChordFinder | `chord-finder-2` | `ChordFinder2`    | Vite  | `dist`        |
| SynthPutty  | `dough-synths`   | `SynthPutty` [^1] | CRA   | `build`       |

[^1]:
    The clone's origin still says `dough-synths`, an older name GitHub
    redirects for git operations. The repo's current name is `SynthPutty`, which is
    why Pages serves `/SynthPutty/` and why `homepage` was already correct. Harmless;
    update the remote URL if it ever gets confusing.

- [x] **Three CNAME records at Namecheap** — `doughloops`, `chordfinder`,
      `synthputty`, all pointing at `evanczako.github.io.` Verified resolving.
- [x] **Base path fixed per app.** Moving to a subdomain root means the base
      becomes `/`, not `/<repo>/`; getting it wrong ships a white page with
      404ing bundles. This differs by bundler — `homepage` in `package.json` for
      CRA (SynthPutty), `base` in `vite.config.*` for the two Vite apps, where
      `homepage` does nothing.
- [x] **`CNAME` added to each published directory** (`client/public/`, `public/`,
      `public/`). Not the repo root — see the README footgun.
- [x] **All three rebuilt and verified**: root-relative asset paths, CNAME
      present in the build output.
- [x] **`predeploy` guard added to `DoughLoops2/client`.** Its `deploy` was a
      bare `gh-pages -d dist`, which publishes whatever is already sitting in
      `dist` — a stale build would have shipped the old `/DoughLoops2/` base
      onto the new subdomain and served a white page. The other two already
      built on deploy.
- [x] **All three deployed**, bundle hashes matching the verified local builds.
- [x] **All three confirmed live**: Let's Encrypt cert issued per host, HTTPS
      200, root-relative bundles loading, and the old `github.io` URLs 301ing to
      the new hosts.
- [x] **Enforce HTTPS enabled** on all three repos (GitHub, repo Settings,
      Pages). Until this was on, the subdomains served plain HTTP with no
      upgrade and the 301s from the old URLs landed on `http://`.
- [x] **Verified the domain on GitHub.** Note it lives in _account_ settings
      (<https://github.com/settings/pages>), not repo settings, and verifying
      the apex `evanczako.com` covers the subdomains. This is what stops someone
      else claiming an unused `*.evanczako.com` on their own account — if a repo
      is ever deleted or renamed while its DNS record still points at GitHub,
      that hostname would otherwise be claimable by any other account. Keep the
      `_github-pages-challenge-evanczako` TXT record in place permanently;
      removing it un-verifies the domain.
- [x] Updated the `PROJECTS[].link` values in `src/components/ProjectsGrid.tsx`
      and deployed the hub, so the three project links no longer take the
      redirect hop.
- [x] Updated the links in this repo's `README.md`.

### DoughLoops' backend — pre-emptive, not blocking

`DoughLoops2/server/index.js` hardcoded `PROD_ORIGINS =
['https://evanczako.github.io']`, which would reject a client served from
`doughloops.evanczako.com`.

**In practice this breaks nothing today.** The account feature is deliberately
unmounted — see the comment at the top of `client/src/App.tsx` — so it is
tree-shaken out entirely. Verified rather than assumed: zero `onrender`
references in both the current live bundle and a fresh local build. The Render
API is not called, and `client/.env.production` is inert.

- [x] **Allowlist made additive** — both origins accepted. Kept because
      `App.tsx` documents how to re-wire the account feature, and whoever does
      that should not have to rediscover this.
- [ ] **Deploy the server to Render** — optional, no ordering constraint. Only
      matters before the account feature is reconnected.
- [ ] Once the old URL is genuinely dead, drop `https://evanczako.github.io`
      from the list.

### The URL-dependent metadata — DONE, folded into phase 3

- [x] `og:url` and `canonical` in each app, naming the final hostname.
- [x] A `sitemap.xml` per app, plus a `Sitemap:` line in each `robots.txt`.
      SynthPutty already had a stock CRA `robots.txt`; the other two had none.
      Submitting these sitemaps is tracked in phase 2, not duplicated here — it is
      blocked on the property existing at all. No re-verification is needed: a
      DNS-verified domain property covers the subdomains from the start.

Stale links cleaned up at the same time, since they were the same class of
thing: `DoughLoops2/README.md`, `DoughLoops2/CONTEXT.md` and
`dough-synths/CONTEXT.md` all still advertised `evanczako.github.io` URLs.

`dough-synths/CONTEXT.md` also claimed the apps "share the
`evanczako.github.io` origin, which is why the storage keys are namespaced".
That stopped being true at the move — each app has its own origin now, and
localStorage is keyed by origin rather than by registrable domain, so they do
not share storage at all. The keys stay namespaced only so the four theme files
remain copy-pasteable. Same correction `src/theme.ts` in this repo already got.

## Phase 5 — Analytics — DONE

Last on purpose. Installing this before the domain settled would have split the
dataset at the moment it started mattering; Search Console already covers the
search-side before-and-after, so there was little cost to waiting.

- [x] **Tool picked: Cloudflare Web Analytics** — free, one script tag, no
      cookies, so no consent banner. Alternatives considered and rejected:
      Plausible / self-hosted Umami (nicer dashboards, ~$9/mo hosted, still
      cookieless) and GA4 (most powerful, but a heavy script, cookie-based, and
      needs consent handling in some jurisdictions — overkill for four pages).
- [x] **Four site tokens obtained**, one per hostname, so each site has its
      own dashboard rather than four hosts blurring into one number. The domain
      stayed on Namecheap DNS: Web Analytics is standalone and needs only the
      JS beacon. Moving nameservers would have meant rebuilding the whole zone
      by hand — four A records, three CNAMEs, SPF, and both verification TXT
      records — to avoid pasting a script tag.
- [x] **Beacon added to all four index files** and verified in each build
      output: one token per site, no duplicates across sites. The path differs
      by bundler — CRA keeps it in `public/index.html` (this repo, SynthPutty),
      Vite at the project root (`DoughLoops2/client/index.html`,
      `chord-finder-2/index.html`).

          The tokens are committed in the clear deliberately: they ship in the page
          source by design and are not secrets.

### Outbound link tracking — dropped, and why

The original plan had a third item: instrument the `target="_blank"` project
links in `src/components/ProjectsGrid.tsx` as the hub's main conversion event.

**Cloudflare Web Analytics has no custom events.** It collects pageviews,
referrers, paths, geo/browser/device breakdowns and Core Web Vitals; there is no
`track()` call to hook a click to. The item is not deferred, it is impossible
with this tool.

It is also unnecessary. With the beacon on all four sites, a hub-to-app click
lands as a pageview on the app **with `evanczako.com` as its referrer**, so the
funnel is readable from the destination rather than from the click. That is the
signal the item was after. The difference that remains: referrer attribution
misses clicks that never complete, where a click event would have caught them.
At this traffic level that is noise.

If per-click attribution ever genuinely matters, it means changing tools —
Plausible and Umami both have custom events — not adding code to this one.

## Optional — static rendering

The `<h1>` and project copy render from React, so only the static `<head>` is
visible to non-rendering crawlers and every social scraper. Google renders JS
fine and the meta tags are hand-written, so this is largely covered already.

- [ ] If body text should be static too: `react-snap` is a two-line addition to
      `package.json`.
