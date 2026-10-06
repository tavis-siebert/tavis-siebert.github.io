# tavis-siebert.github.io

Personal research website, built with [Astro](https://astro.build).

## Editing content

| What | Where |
|---|---|
| Name, tagline, links | `src/data/site.ts` |
| Bio (Markdown) | `src/data/bio.md` |
| Publications (paste BibTeX) | `src/data/publications.bib` |
| Photo, CV, other files | `public/` |
| Colors and fonts | `src/styles/global.css` |
| Header animation | `src/components/RippleField.astro` |

## Running locally

```bash
npm install      # first time only
npm run dev      # preview at http://localhost:4321, auto-reloads on save
```

## Publishing

Pushing to the `main` branch of the `tavis-siebert.github.io` repo builds and deploys the
site automatically (see `.github/workflows/deploy.yml`). In the repo's
Settings → Pages, set **Source** to **GitHub Actions**.
