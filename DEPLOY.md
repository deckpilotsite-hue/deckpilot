# Deploying to Cloudflare Pages

Build and deploy this Astro site as a static project on Cloudflare Pages.

## Build settings

| Setting | Value |
|--------|--------|
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | (leave empty if repo root is this app; otherwise set to `deckpilot` if monorepo) |

## Environment variables

| Variable | Value | Notes |
|----------|--------|--------|
| `NODE_VERSION` | `20` | Use a supported Node.js LTS version (e.g. 18 or 20). |

Set these in the Cloudflare Pages project: **Settings → Environment variables**.

## Steps

1. Connect your Git repository to Cloudflare Pages.
2. Set **Build command** to `npm run build`.
3. Set **Build output directory** to `dist`.
4. Add environment variable `NODE_VERSION` = `20` (or 18).
5. Deploy. The site will be available at your Pages URL.

## Post-deploy

- Confirm the sitemap is reachable: `https://<your-domain>/sitemap-index.xml`
- Confirm `https://<your-domain>/robots.txt` references the sitemap.
- For production canonicals and sitemap, ensure `site` in `astro.config.mjs` matches your domain (e.g. `https://deckpilot.app`).
