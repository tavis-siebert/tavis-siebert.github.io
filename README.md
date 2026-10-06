# tavis-siebert.github.io

Personal research website, built with [Astro](https://astro.build).

## Editing content

| What | Where |
|---|---|
| Name, tagline, links | `src/data/site.ts` |
| Bio (Markdown) | `src/data/bio.md` |
| Publications (paste BibTeX) | `src/data/publications.bib` |
| Gallery photos | `src/photos/` (see below) |
| Photo descriptions (optional) | `src/data/photos.ts` |
| Profile photo, CV, other files | `public/` |
| Colors and fonts | `src/styles/global.css` |

## Adding photos to the gallery

Copy photos (JPG, PNG, or iPhone HEIC) into `src/photos/`, then run:

```bash
npm run photos
```

This converts HEIC to JPG, shrinks anything over 2400px, and strips metadata
(including GPS location), replacing the files in place, so keep your originals
elsewhere. It also runs automatically on `npm run dev`. Photos appear in
file-name order, so prefix names with numbers (`01-alps.jpg`) to control it.

## Running locally

```bash
npm install      # first time only
npm run dev      # preview at http://localhost:4321, auto-reloads on save
```

## Publishing

Pushing to the `main` branch of the `tavis-siebert.github.io` repo builds and deploys the
site automatically (see `.github/workflows/deploy.yml`). In the repo's
Settings → Pages, set **Source** to **GitHub Actions**.
