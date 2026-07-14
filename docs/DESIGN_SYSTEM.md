# Design System — akanksha.dev

> **Last updated:** 2026-07-14 (Session handoff from conversation 393f4444)
> **Brand:** Production AI Engineer — Agentic RAG, LLM Orchestration, Enterprise AI
> **Aesthetic:** "Cyber-Physical Laboratory" — an enterprise AI dashboard, not a portfolio

---

## 1. Design Philosophy

### The "Platform" Paradigm
The site must feel like a **live, production-grade AI SaaS platform** where the product is *you*.
- Standard portfolios say "I did this." They rely on trust.
- This site says "I *can* do this, watch." Everything feels like an active dashboard.
- Every element reinforces the "Production AI Engineer" brand — from the blueprint grid background to the IDE status bar.

### Target Audience & Conversion
1. **Technical Recruiter (30 seconds):** Needs fast keyword validation. → JD Matcher gives instant matching scores.
2. **Engineering Manager / CTO (2 minutes):** Needs proof of depth. → AI Sandbox demonstrates system-level understanding.

### Conversion Funnel
1. **Hook (Hero):** Bold claim + pulsing status badge
2. **Qualify (Sandbox):** Interactive RAG/Agent pipeline proves competence
3. **Validate (Projects):** Before/After cards showing naive vs production approaches
4. **Convert (JD Matcher/Contact):** Recruiter drops JD, gets compatibility score

---

## 2. Color Palette

### Tokens (defined in `src/styles/global.css` under `@theme`)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-teal` | `#00E5B0` | Primary accent — active states, buttons, links |
| `--color-teal-dim` | `#00B88D` | Hover states for teal elements |
| `--color-teal-glow` | `rgba(0, 229, 176, 0.15)` | Background glow behind teal badges |
| `--color-amber` | `#F5A300` | Secondary accent — warnings, metrics, highlights |
| `--color-amber-dim` | `#D48E00` | Hover states for amber elements |
| `--color-amber-glow` | `rgba(245, 163, 0, 0.12)` | Background glow behind amber badges |
| `--color-space` | `#05070F` | Main background — deep inky black |
| `--color-space-light` | `#0A1628` | Elevated surface background |
| `--color-space-lighter` | `#0D2847` | Even more elevated surfaces |
| `--color-surface` | `rgba(255, 255, 255, 0.04)` | Glass card backgrounds |
| `--color-surface-hover` | `rgba(255, 255, 255, 0.08)` | Glass card hover state |
| `--color-border` | `rgba(255, 255, 255, 0.08)` | Default borders |
| `--color-border-hover` | `rgba(0, 229, 176, 0.3)` | Hover border glow |
| `--color-text-primary` | `#E2E8F0` | Headings — high contrast white |
| `--color-text-secondary` | `#A0AEC0` | Body text — meets WCAG AA 4.7:1 |
| `--color-text-muted` | `#718096` | Tertiary/meta text |

### Rationale
- **Primary text was upgraded** from `#94A3B8` → `#A0AEC0` to meet WCAG AA 4.5:1 contrast on dark glass surfaces.
- **No flat backgrounds.** Subtle radial gradients create depth. The blueprint grid catches orb glow.
- **Teal = System Online / Success.** Amber = Alert / Compute / Warning. Red = Failure / Naive approach.

---

## 3. Typography

### The "Code & Prose" Trio

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Display headings | **Syne** | 500–800 | Hero title, section titles. Ultra-bold geometric. |
| UI headings, body | **Plus Jakarta Sans** | 200–800 | Cards, navigation, paragraphs, readable prose |
| Code, data, terminal | **JetBrains Mono** | 400–600 | Metrics, tags, terminal text, monospaced data |

### Font Loading
Loaded via Google Fonts in `BaseLayout.astro`:
```
Plus Jakarta Sans: ital,wght@0,200..800;1,200..800
JetBrains Mono: wght@400;500;600
Syne: wght@500;600;700;800
```

### Why Plus Jakarta Sans?
Previous body font was `DM Sans`. It looked flat under dark mode glassmorphism. Plus Jakarta Sans has:
- Clean terminals and high counters → sharp on dark backgrounds
- Modern geometric proportions → premium feel
- Variable weight support → fine-grained hierarchy control

---

## 4. Background & Depth System

### Layers (bottom to top)
1. **Deep Space** (`#05070F`) — solid base background
2. **Noise texture** — SVG fractalNoise at 1.5% opacity for texture grain
3. **Blueprint Grid** — CSS linear gradients at 2.2% opacity, 50px spacing
4. **Floating Orbs** — Teal/Amber/Purple radial gradient blobs, slowly animated

### The Blueprint Grid (CSS)
```css
body::after {
  content: '';
  position: fixed;
  inset: 0;
  opacity: 0.022;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px);
  background-size: 50px 50px;
}
```

---

## 5. Component Patterns

### Glass Cards (`.glass`)
- `backdrop-filter: blur(12px)` + transparent white borders
- Hover: border transitions to `--color-border-hover`, glow shadow appears
- Rounded corners: `border-radius: 0.75rem`

### Badges (`.badge`)
- Monospaced label with teal glow background
- Variants: `.badge-amber`, `.badge-ghost`

### Buttons
- `.btn-primary`: Solid teal background, dark text
- `.btn-outline`: Transparent with teal border, hover fills

### Metrics
- Large heading number + small monospaced label
- Grid layout: 2 cols mobile, 4 cols desktop

---

## 6. Interactive Components

### AI Sandbox (`src/components/AiSandbox.astro`)
- **Two tabs:** Graph-RAG.log | Agent-Loop.exe
- **RAG tab:** 4-step pipeline visualization (Segmentation → FAISS → Graph Enrich → LLM Inference)
- **Agent tab:** Terminal-style logs with color-coded categories
- **Node Toggles:** "Semantic Router Node" and "RAGAS Guardrails Node" — when toggled OFF, pipeline output degrades to show hallucination warnings. This teaches recruiters *why* the architecture matters.
- **Metrics sidebar:** Latency, retrieval matches, RAGAS relevance scores

### JD Matcher (`src/components/JdMatcher.astro`)
- Textarea for pasting job descriptions
- Sample JD buttons (GenAI/Agentic, Solutions/FDE)
- Client-side regex keyword matching against skill dictionary
- Outputs: circular progress ring (match %), tagged keywords, filtered experience bullets, suggested STAR stories

### Command Palette (in `BaseLayout.astro`)
- Triggered by `Ctrl+K` or clicking search button
- Local knowledge base with pre-indexed career data
- Streaming text animation for AI-agent-like responses
- Keyboard navigation (arrow keys + Enter)

### IDE Status Bar (in `BaseLayout.astro`)
- Fixed bottom bar: `system: online` (pulsing green dot) | branch | availability status
- Right side: simulated telemetry ticker (latency, framework version)

---

## 7. Page Structure

| Page | File | Purpose |
|------|------|---------|
| Home | `src/pages/index.astro` | Hero + metrics + tech stack + AI Sandbox + JD Matcher + featured projects + speaking + about preview + CTA |
| About | `src/pages/about.astro` | Full biography, career narrative, philosophy |
| Projects | `src/pages/projects.astro` | All 8 projects with tags, before/after comparison |
| Experience | `src/pages/experience.astro` | "System Changelog" — git-style timeline with commit hashes |
| Speaking | `src/pages/speaking.astro` | Events, talks, community involvement |
| Blog | `src/pages/blog.astro` | Content collection from `src/content/blog/` |
| Contact | `src/pages/contact.astro` | Email, social links, CTA |

### Experience Page: "System Changelog" Aesthetic
The experience timeline was completely rewritten from a standard "Professional Journey" layout into a git-commit styled changelog:
- Version tags: `release-oct2024`
- Commit hashes: randomized hex
- Module headers: `[module] Project Name`
- Bullet prefixes: `+` (git diff style)

---

## 8. Inspiration & Competitive Analysis

### GitSetu (gitsetu.bhaskar.dev)
Analyzed for design elements. Key integrations adopted:
1. **Command Palette (Ctrl+K)** — ✅ Implemented (with local AI knowledge base)
2. **IDE Status Bar** — ✅ Implemented (pulsing, telemetry)
3. **Pulsing "Live" Badges** — ✅ Implemented (hero status badge)
4. **Before/After Cards** — ✅ Implemented (naive vs production RAG)
5. **Auto-Demo Tabs** — Planned (not yet implemented)

### What Makes This Better Than GitSetu
- GitSetu is a tool landing page. This is a **platform**.
- Interactive node toggles prove architectural understanding.
- JD Matcher creates direct recruiter conversion.
- Knowledge-base command palette provides AI-like search.

---

## 9. Deployment

- **Framework:** Astro v7.0
- **Hosting:** Cloudflare Workers (see `DEPLOY.md`)
- **Domain:** akanksha.dev
- **Analytics:** Cloudflare Web Analytics (token via `PUBLIC_CF_ANALYTICS_TOKEN`)
- **Dev server:** `npm run dev` → `http://localhost:4321`

---

## 10. Pending / Future Work

| Feature | Status | Notes |
|---------|--------|-------|
| Auto-Demo animation for AI Sandbox | ⬜ Planned | Automated typing simulation so visitors don't need to click |
| Mobile optimization review | ⬜ Planned | Complex components (JD Matcher, Sandbox) need mobile testing |
| Project page deep-dives | ⬜ Planned | Individual case study pages with architecture diagrams |
| LLM-powered Cmd+K | ⬜ Blocked (needs API) | Currently uses local keyword matching instead |
| Architecture Playground | ⬜ Planned | Drag/toggle nodes in a visual RAG pipeline diagram |
| Recruiter REPL terminal | ⬜ Planned | Functional terminal with commands like `> fetch resume` |
