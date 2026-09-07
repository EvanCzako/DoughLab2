# Evan Czako — Portfolio

The hub for the DoughLoops family of apps. [evanczako.com](https://evanczako.com)

React + TypeScript (CRA), CSS Modules, and the shared token/theme layer used by
[DoughLoops2](https://evanczako.github.io/DoughLoops2/),
[ChordFinder](https://evanczako.github.io/ChordFinder2/) and
[SynthPutty](https://evanczako.github.io/SynthPutty/) — the seed palettes in
`src/styles/variables.module.css` are shared verbatim across all four.

```bash
npm install
npm start      # dev server
npm run build  # production build
npm run deploy # build + publish to gh-pages
```

`public/CNAME` must stay in `public/`, not the repo root. `gh-pages -d build`
replaces the whole publishing branch with `build/`, and CRA only copies
`public/` into `build/` — a root-level CNAME is never published, so GitHub
drops the custom domain on the next deploy and evanczako.com starts returning
"Site not found".
