# VileSaint

VileSaint is a multilingual football verdict experience built for rapid social sharing.

The homepage is a live-updating board of independent PK topics. Each topic keeps its own vote choice, URL, comments, replies, likes, and share image.

## Product document

[VileSaint 完整产品文档](./docs/VileSaint-完整产品文档.md)

## Local preview

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173`.

## Deployment

The site is static and can be deployed directly with GitHub Pages from the repository root.

## Match topic refresh

`scripts/update-match-topics.mjs` refreshes pre-match, live, and final match topics.
GitHub Actions runs it every five minutes and commits `data/topics.json` only when match state or scores change.
