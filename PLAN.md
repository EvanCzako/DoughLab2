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

All four repos are committed and pushed; nothing below is running from an
uncommitted working tree.

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
- No app subdomains exist yet.

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

**`public/resume_fullstack.pdf` is indexable** and linked from the footer, so
Google will find and index it regardless of the sitemap. Decide whether that's
wanted. To keep it out of results, add `Disallow: /resume_fullstack.pdf` to
`robots.txt` — GitHub Pages can't send the `X-Robots-Tag` header that would
otherwise be the cleaner tool.

## Phase 2 — Search dashboards, on what exists today

Do this early and independently of phase 0. Verification takes minutes, but the
data accrues over weeks — and having numbers from _before_ the rest of the work
is the only way to tell whether any of it helped. If the apps move in phase 4,
re-verifying afterwards is another two minutes, which is a fine price for a
before-and-after.

- [ ] **Google Search Console** — the actual SEO tool: real queries people
      typed, impressions, CTR, indexing errors. Nothing else gives query data.
      Verify `evanczako.com` via a DNS TXT record.
- [ ] **Submit `https://evanczako.com/sitemap.xml`** in Search Console.
- [ ] **Add the three app subdomains** as properties. Now that the move has
      landed, a single DNS-verified `evanczako.com` domain property covers all
      four — no per-repo HTML verification files needed.
- [ ] **Bing Webmaster Tools** — two minutes, and it's what ChatGPT-style search
      surfaces pull from.

## Phase 3 — App metadata, the half that doesn't name a URL

Requires cloning `DoughLoops2`, `ChordFinder2` and `SynthPutty` nearby.

Audited live rather than assumed — the three are in quite different states, and
two of the three are Vite, not CRA:

| App         | Bundler | Title             | Description | og tags                           |
| ----------- | ------- | ----------------- | ----------- | --------------------------------- |
| DoughLoops  | Vite    | good, descriptive | good        | present, but `og:image` is broken |
| ChordFinder | Vite    | bare name         | none        | none                              |
| SynthPutty  | CRA     | bare name         | present     | none                              |

**DoughLoops has a live bug worth fixing first.** Its `og:image` is a relative
path (`/DoughLoops2/assets/favicon-...png`), which no scraper can resolve — the
tag is there but the preview is broken, and it points at a favicon rather than a
1200x630 card. `twitter:card` is also `summary` rather than
`summary_large_image`.

Per app:

- [ ] **DoughLoops** — absolute `og:image` pointing at a real 1200x630 card;
      `twitter:card` to `summary_large_image`. Title and description already fine.
- [ ] **ChordFinder** — everything: `<title>`, description, og tags, card.
- [ ] **SynthPutty** — descriptive `<title>`, og tags, card. Description is fine.
- [ ] All three: `manifest.json` name and description matching the new copy.

`tools/og-card.html` in this repo is a working template for the cards — swap the
portrait block for the app's own mark.

Copy guidance: "ChordFinder" and "SynthPutty" are coined names nobody searches
for. Write titles and descriptions around what people actually type — "online
chord identifier", "browser synthesizer". DoughLoops already does this well
("in-browser step sequencer") and is the model to copy.

Deliberately **not** here — these name a URL, so they wait for phase 4:
`og:url`, `canonical`, per-app `sitemap.xml`.

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
- [ ] **Verify the domain on GitHub.** The challenge TXT record is added and
      resolving on public DNS; only the Verify button is left to click. Note it
      lives in _account_ settings (<https://github.com/settings/pages>), not
      repo settings, and verifying the apex `evanczako.com` covers the
      subdomains. This is what stops someone else claiming an unused
      `*.evanczako.com` on their own account.
- [ ] Update the `PROJECTS[].link` values in `src/components/ProjectsGrid.tsx`,
      then deploy the hub. The hub still points at the old URLs — they redirect,
      so nothing is broken, but it is a wasted hop.
- [ ] Update the links in this repo's `README.md`.

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

### The URL-dependent metadata

- [ ] `og:url` and `canonical` in each app, naming the final hostname.
- [ ] A `sitemap.xml` per app, plus a `Sitemap:` line in each `robots.txt`.
- [ ] Re-verify in Search Console and submit the new sitemaps.

## Phase 5 — Analytics

Last on purpose. Installing this before the domain settles splits the dataset at
the moment it starts mattering; Search Console already covers the search-side
before-and-after, so there is little cost to waiting.

- [ ] **Pick a tool.** Recommendation: **Cloudflare Web Analytics** — free, one
      script tag, no cookies, no consent banner. Alternatives: Plausible /
      self-hosted Umami (~$9/mo hosted, nicer dashboards, still cookieless);
      GA4 (free and most powerful, but heavy, and needs consent handling in some
      jurisdictions).
- [ ] **Add the snippet to all four `public/index.html` files**, so the hub to
      app funnel shows up in one view.
- [ ] **Instrument the outbound project links** in
      `src/components/ProjectsGrid.tsx`. They're `target="_blank"` with no
      tracking today, so there's no signal on which app people actually click.
      This is the hub's main conversion event.

## Optional — static rendering

The `<h1>` and project copy render from React, so only the static `<head>` is
visible to non-rendering crawlers and every social scraper. Google renders JS
fine and the meta tags are hand-written, so this is largely covered already.

- [ ] If body text should be static too: `react-snap` is a two-line addition to
      `package.json`.
