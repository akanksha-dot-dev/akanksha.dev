# akanksha.dev

Personal portfolio website for [Akanksha](https://akanksha.dev) — Production AI Engineer at Samsung SDS.

Built with [Astro 7](https://astro.build) + [Tailwind CSS 4](https://tailwindcss.com).

## Features

- ⚡ Static site generation with Astro 7
- 🎨 Custom design system (glassmorphism, gradients, animations)
- 📝 Blog with Content Collections (Markdown)
- 🔄 View Transitions (smooth page navigation)
- 🔍 SEO: JSON-LD schemas, Open Graph, sitemap, robots.txt
- 🤖 AI discovery via [llms.txt](https://llmstxt.org)
- 📊 Cloudflare Web Analytics
- 🚀 Deployed on Cloudflare Pages with auto-deploy from GitHub

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Copy `.env.example` to `.env` and fill in:

| Variable | Description |
|----------|-------------|
| `PUBLIC_CF_ANALYTICS_TOKEN` | Cloudflare Web Analytics token (optional for local dev) |

## Deployment

This site auto-deploys to Cloudflare Pages on push to `main`. See [DEPLOY.md](./DEPLOY.md) for setup instructions.

## Tech Stack

- **Framework:** Astro 7
- **Styling:** Tailwind CSS 4
- **Fonts:** Syne, DM Sans, JetBrains Mono (Google Fonts)
- **Hosting:** Cloudflare Pages
- **Analytics:** Cloudflare Web Analytics
- **Domain:** akanksha.dev

## License

Content © Akanksha. Code is open-source under [MIT License](./LICENSE).
