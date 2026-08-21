# Deployment Guide — akanksha.dev

Complete guide to deploy this site with **auto-deploy CI/CD** via GitHub → Cloudflare Pages.

---

## Architecture

```
GitHub (main branch)
    ↓ push triggers webhook
Cloudflare Pages (auto-build)
    ↓ npm run build → dist/
Cloudflare CDN (global edge)
    ↓ serves from 300+ PoPs
akanksha.dev (custom domain)
```

Every push to `main` triggers a new build. No manual deployment needed.

---

## Step 1: Push to GitHub

### 1a. Create the repository on GitHub

Go to [github.com/new](https://github.com/new) and create:
- **Repository name:** `akanksha.dev`
- **Owner:** `akanksha-dot-dev` (or your GitHub org)
- **Visibility:** Public
- **Do NOT** initialize with README (we already have one)

### 1b. Connect and push

```bash
cd d:\dev\mmc\my-career\github-repos\akanksha.dev

# Set the remote (replace with your actual GitHub URL)
git remote add origin https://github.com/akanksha-dot-dev/akanksha.dev.git

# Push everything
git branch -M main
git push -u origin main
```

---

## Step 2: Connect Cloudflare Pages

### 2a. Create a Cloudflare Pages project

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Click **Workers & Pages** in the sidebar
3. Click **Create** → **Pages** → **Connect to Git**
4. Authorize GitHub if prompted
5. Select the `akanksha-dot-dev/akanksha.dev` repository

### 2b. Configure build settings

| Setting | Value |
|---------|-------|
| **Project name** | `akanksha-dev` (or `akanksha.dev`) |
| **Production branch** | `main` |
| **Framework preset** | `Astro` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` (leave empty) |
| **Node.js version** | `22` (set via Environment Variables below) |

### 2c. Set environment variables

In the Cloudflare Pages dashboard → **Settings** → **Environment variables**:

| Variable | Value | Scope |
|----------|-------|-------|
| `NODE_VERSION` | `22` | Production + Preview |
| `PUBLIC_CF_ANALYTICS_TOKEN` | *(your token, see Step 3)* | Production only |

> **Important:** `PUBLIC_CF_ANALYTICS_TOKEN` should only be set for **Production**, not Preview.
> This way preview deploys don't pollute your analytics.

### 2d. Click "Save and Deploy"

Cloudflare will:
1. Clone your repo
2. Run `npm install`
3. Run `npm run build`
4. Deploy the `dist/` folder to its global CDN

First deploy takes ~2-3 minutes. You'll get a URL like: `https://akanksha-dev.pages.dev`

---

## Step 3: Set Up Cloudflare Web Analytics

1. In Cloudflare dashboard → **Analytics & Logs** → **Web Analytics**
2. Click **Add a site**
3. Enter `akanksha.dev` as the hostname
4. Click **Done**
5. Copy the **token** (a string like `abcdef1234567890abcdef1234567890`)
6. Go to **Workers & Pages** → your project → **Settings** → **Environment variables**
7. Add:
   - **Variable name:** `PUBLIC_CF_ANALYTICS_TOKEN`
   - **Value:** paste your token
   - **Scope:** Production only
8. **Trigger a redeploy** (push an empty commit or click "Retry deployment" in the dashboard)

---

## Step 4: Connect Custom Domain

### 4a. Add domain in Cloudflare Pages

1. Go to your Pages project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter `akanksha.dev`
4. Click **Activate domain**

### 4b. Also add `www` subdomain

1. Click **Set up a custom domain** again
2. Enter `www.akanksha.dev`
3. Activate — Cloudflare will auto-redirect `www` → apex

### 4c. DNS Configuration

If `akanksha.dev` is **already on Cloudflare DNS** (recommended):
- Cloudflare auto-creates the CNAME records. Done!

If the domain is on an **external registrar** (like Namecheap, GoDaddy):

| Record | Name | Value |
|--------|------|-------|
| CNAME | `@` | `akanksha-dev.pages.dev` |
| CNAME | `www` | `akanksha-dev.pages.dev` |

> **Recommended:** Transfer the domain to Cloudflare Registrar for free SSL,
> fastest DNS, and zero-config integration.

### 4d. Verify SSL

After DNS propagation (usually 1-5 minutes with Cloudflare DNS):
- Visit `https://akanksha.dev` — should show your site with the padlock 🔒
- Visit `http://akanksha.dev` — should auto-redirect to HTTPS

---

## Step 5: Verify CI/CD

Test the auto-deploy pipeline:

```bash
# Make a small change (e.g., update a blog post)
echo "" >> src/content/blog/building-production-rag-systems.md
git add -A
git commit -m "test: verify CI/CD pipeline"
git push origin main
```

Then check:
1. Go to Cloudflare dashboard → Workers & Pages → your project → **Deployments**
2. You should see a new deployment triggered automatically
3. Build should complete in ~1-2 minutes
4. Click the deployment to see build logs
5. Visit `https://akanksha.dev` — changes should be live

---

## CI/CD Flow Summary

```
You push code to main
         ↓
GitHub webhook fires → Cloudflare Pages
         ↓
Cloudflare clones repo
         ↓
npm install (cached between builds)
         ↓
npm run build (Astro generates dist/)
         ↓
dist/ deployed to 300+ global CDN edges
         ↓
akanksha.dev serves new version instantly
         ↓
Old version is kept as rollback option
```

### What you get automatically:
- ✅ **Auto-deploy on push** — every `git push origin main` triggers a build
- ✅ **Preview deployments** — every PR gets a unique preview URL
- ✅ **Instant rollback** — one-click rollback to any previous deployment
- ✅ **Free SSL** — auto-renewed, including for custom domain
- ✅ **Global CDN** — 300+ edge locations worldwide
- ✅ **DDoS protection** — Cloudflare's enterprise-grade protection, free
- ✅ **Build caching** — `node_modules` cached between builds (~30s deploys)

---

## Cloudflare Workers (Direct Wrangler CLI Deployment)

You can also deploy directly to Cloudflare Workers with Static Assets using Wrangler:

```bash
# Authenticate wrangler (one-time setup)
npx wrangler login

# Build static bundle & deploy to Cloudflare Workers
npm run deploy
# or:
pnpm run deploy
```

### Static Asset Serving Configuration (`wrangler.jsonc`)

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "akanksha-dev",
  "compatibility_date": "2025-06-13",
  "compatibility_flags": ["nodejs_compat"],
  "assets": {
    "directory": "./dist"
  }
}
```

---

## Troubleshooting

### "Missing entry-point to Worker script or to assets directory"
→ Ensure `wrangler.jsonc` contains `"assets": { "directory": "./dist" }` and that `npm run build` has produced the `./dist` folder before deploying.

### Stale `.wrangler` cache redirecting to missing paths
→ Delete the local `.wrangler/` directory and re-run `npm run deploy`.

### Build fails with "Node.js version too old"
→ Add `NODE_VERSION=22` in Environment Variables (Step 2c)

### Site shows old content after push
→ Check Deployments tab — build may still be in progress
→ Try hard refresh: `Ctrl+Shift+R`

### Custom domain shows Cloudflare error
→ Wait 5-10 minutes for DNS propagation
→ Check DNS records are correct (Step 4c)

### Analytics not showing
→ Verify `PUBLIC_CF_ANALYTICS_TOKEN` is set in **Production** env vars
→ Trigger a redeploy after setting the variable
→ Check browser console for the beacon.min.js script loading

### Preview deployments
→ Every branch push / PR creates a preview at `<branch>.akanksha-dev.pages.dev`
→ Great for testing changes before merging to main

---

## Optional: Add GitHub Actions Badge

Add this to your README.md to show deploy status:

```markdown
[![Deploy to Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-Deployed-orange?logo=cloudflare)](https://akanksha.dev)
```

---

## Quick Reference

| Action | How |
|--------|-----|
| Deploy via Git CI/CD | `git push origin main` |
| Deploy via Wrangler CLI | `npm run deploy` |
| Preview a branch | Push any branch; check Cloudflare deployments |
| Rollback | Cloudflare dashboard → Deployments → Click older build → "Rollback" |
| Add env var | Cloudflare dashboard → Settings → Environment Variables |
| Check build logs | Cloudflare dashboard → Deployments → Click build |
| Run locally | `npm run dev` |
| Build locally | `npm run build && npm run preview` |
| Dry-run deploy check | `npx wrangler deploy --dry-run` |

