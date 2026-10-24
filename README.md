# BugSnap beta landing page

Dependency-free static site (HTML, CSS, one ES module). No build step, no framework, no secrets.
It lives in `landing/` and does not touch the extension or `server/`.

## Files
- `config.js`: **the one place to edit** version label, release URLs, ZIP filename, copyright holder.
- `index.html`, `privacy.html`, `styles.css`, `app.js`
- `scripts/check.mjs`: config, anchor, title and `alt` checks.

## Publish a download (do this first)
1. Build a ZIP containing only the extension files at its top level: `manifest.json background.js content.js popup.html popup.js`. Do **not** include `server/`, `.git`, or `.env`.
   `zip bugsnap-beta-v0.1.0-beta.1.zip manifest.json background.js content.js popup.html popup.js`
2. GitHub, Releases, Draft a new release, tag `v0.1.0-beta.1`, mark as pre-release, attach the ZIP.
3. Copy the asset URL (`https://github.com/rony-codes/BugSnap/releases/download/v0.1.0-beta.1/<file>.zip`) into `zipUrl` in `config.js`. Keep `zipFilename` identical to the asset name.
4. Run `node scripts/check.mjs --online` to confirm the URL responds.

Until `zipUrl` is set, every download button opens the Releases page and says so.

Versioning note: `displayVersion` is the website label. Chrome's `manifest.json` version must stay numeric (`0.1.0`). Also update the `v0.1.0-beta.1` text in `popup.html` if you want them to match.

## Run locally
ES modules need HTTP, not `file://`: `cd landing && python3 -m http.server 8080`

## Deploy to GitHub Pages
Repo, Settings, Pages, Source: **GitHub Actions**, then add `.github/workflows/pages.yml`:
```yaml
name: Deploy landing page
on: { push: { branches: [main], paths: ["landing/**"] }, workflow_dispatch: {} }
permissions: { contents: read, pages: write, id-token: write }
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: { name: github-pages, url: "${{ steps.d.outputs.page_url }}" }
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with: { path: landing }
      - id: d
        uses: actions/deploy-pages@v4
```
Any static host works too (Netlify, Cloudflare Pages, Vercel): publish the `landing/` directory, no build command.
