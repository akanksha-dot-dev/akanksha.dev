# akanksha.dev — Website Development Status & Architecture

> **Last updated:** 2026-08-21
> **Status:** ✅ Phase 2 interactive features (Auto-Demo engine, JD match summary export, copy actions, responsive viewport polish) complete and tested.

---

## Current State

### Architecture
- **Framework:** Astro v7.0 (static-first with client-side islands)
- **Styling:** Tailwind CSS v4 (`@theme` for design tokens) + vanilla CSS
- **Components:** Pure Astro + vanilla JavaScript (zero React/Vue overhead)
- **Hosting:** Cloudflare Workers (see `DEPLOY.md`)
- **Domain:** akanksha.dev

### File Structure
```
src/
├── components/
│   ├── AiSandbox.astro      # Interactive RAG + Agent pipeline simulator
│   └── JdMatcher.astro      # Recruiter JD compatibility analyzer
├── content/
│   └── blog/                # Markdown blog posts (content collection)
├── layouts/
│   ├── BaseLayout.astro     # Master layout (nav, footer, cmd palette, status bar)
│   └── BlogPost.astro       # Blog post layout
├── pages/
│   ├── 404.astro
│   ├── about.astro
│   ├── blog.astro
│   ├── blog/[slug].astro    # Dynamic blog post routes
│   ├── contact.astro
│   ├── experience.astro     # "System Changelog" git-style timeline
│   ├── index.astro          # Homepage with interactive showcase
│   ├── projects.astro
│   └── speaking.astro
└── styles/
    └── global.css           # Full design system (tokens + components)
```

### Design System Quick Reference
- **Colors:** Teal (#00E5B0) + Amber (#F5A300) + Deep Space (#05070F)
- **Fonts:** Syne (display) + Plus Jakarta Sans (body) + JetBrains Mono (code)
- **Aesthetic:** "Cyber-Physical Laboratory" — blueprint grid + glassmorphism + floating orbs
- **Full docs:** `docs/DESIGN_SYSTEM.md`

---

## Interactive Features

### 1. AI Sandbox (Homepage)
**What it proves:** You understand complex multi-step AI pipeline orchestration.

- **RAG tab:** Select query → runs 4-step pipeline (Segment → FAISS → Graph → LLM) with animated step activation and streaming output
- **Agent tab:** Select objective → terminal displays color-coded agent logs (Planning → Tool Call → Guardrails → Success)
- **Node Toggles:** Turn off "Semantic Router" or "RAGAS Guardrails" → pipeline degrades with hallucination warnings
- **Metrics sidebar:** Latency, retrieval matches, RAGAS scores

### 2. JD Matcher (Homepage)
**What it proves:** You can build developer tools that recruiters actually use.

- Paste any JD → client-side keyword matching against 16 skill patterns
- Outputs: % match (circular ring), matched skill tags, filtered experience bullets, STAR story suggestions
- Sample JDs: GenAI/Agentic, Solutions/FDE
- Guaranteed 25-96% range (baseline + cap for realism)

### 3. Command Palette (Global)
**What it proves:** You build developer-first UX.

- `Ctrl+K` triggers spotlight search
- Local knowledge base: skills, samsung, experience, hcltech, hackathons, certifications, contact, resume
- Streaming text animation simulates AI agent
- Navigation commands: Go to pages, Download Resume

### 4. IDE Status Bar (Global)
**What it proves:** Your site is a living system, not a static page.

- `system: online` with pulsing green dot
- `main*` branch indicator
- `⚡ Status: Open to Senior AI Engineer Roles`
- Simulated latency ticker (14-25ms, updates every 4s)

---

## Git Status (as of 2026-07-14)

### Unstaged changes:
```
modified:   src/layouts/BaseLayout.astro
modified:   src/pages/experience.astro
modified:   src/pages/index.astro
modified:   src/styles/global.css
```

### Untracked:
```
src/components/   (AiSandbox.astro, JdMatcher.astro)
docs/             (DESIGN_SYSTEM.md)
```

### Last committed state (59170ce):
```
fix: Remove trailing slash redirects — caused infinite redirect loops
```

**All the interactive components, design overhaul, and homepage restructure are in unstaged changes.**
These should be committed as a single feature commit.

---

## How to Work On This

### Development
```bash
cd github-repos/akanksha.dev
npm install
npm run dev      # → http://localhost:4321
```

### Key Files to Edit
| Want to change... | Edit this |
|-------------------|-----------|
| Colors, fonts, component classes | `src/styles/global.css` |
| Navigation, Cmd+K, status bar | `src/layouts/BaseLayout.astro` |
| Homepage sections & data | `src/pages/index.astro` |
| RAG/Agent simulations | `src/components/AiSandbox.astro` |
| JD matching logic & skill dictionary | `src/components/JdMatcher.astro` |
| Blog posts | `src/content/blog/*.md` |
| Design system docs | `docs/DESIGN_SYSTEM.md` |

### Data Sources (from identity layer)
The website's data (metrics, projects, experience, skills) is currently hardcoded in the Astro page frontmatter. It should match `identity/*.yaml`:
- Experience data → `identity/experience.yaml`
- Skills/tech stack → `identity/skills.yaml`
- Projects → `identity/projects.yaml`
- Speaking events → `identity/speaking-and-community.yaml`
- Certifications count → `identity/credentials.yaml`
- Claims verification → `identity/claims-and-evidence.md`

---

## Competitive References

### GitSetu (gitsetu.bhaskar.dev)
Analyzed during this session. Key design elements borrowed:
- Command palette, IDE status bar, pulsing badges, before/after cards
- See `ops/session-handoff.md` for full analysis
