# Evan Czako — Portfolio

The hub for the DoughLoops family of apps. [evanczako.com](https://evanczako.com)

React + TypeScript (CRA), CSS Modules, and the shared token/theme layer used by
[DoughLoops2](https://doughloops.evanczako.com/),
[ChordFinder](https://chordfinder.evanczako.com/) and
[SynthPutty](https://synthputty.evanczako.com/) — the seed palettes in
`src/styles/variables.module.css` are shared verbatim across all four.

```bash
npm install
npm start      # dev server
npm run build  # production build
npm run deploy # build + publish to gh-pages
npm run og     # re-render public/og.png from tools/og-card.html
```

`npm run og` renders the social share card through headless Chrome at exactly
1200x630. The card copies its palette seeds from `variables.module.css`, so
re-run it after any palette change or the card quietly drifts out of brand. All
four repos carry the same `tools/` kit and the same script.

`public/CNAME` must stay in `public/`, not the repo root. `gh-pages -d build`
replaces the whole publishing branch with `build/`, and CRA only copies
`public/` into `build/` — a root-level CNAME is never published, so GitHub
drops the custom domain on the next deploy and evanczako.com starts returning
"Site not found".
