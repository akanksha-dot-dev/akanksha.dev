# akanksha.dev — Agent Instructions

# Kramak - Structured Development Workflow

This project uses a structured development workflow that helps you produce higher-quality autonomous code.

When the user says **"Start"** (or "begin", "continue", "go", "kramak"):

1. Read `.kramak/KRAMAK-LITE.md` - the complete process specification
2. Read `.kramak/state.json` - the current project state
3. Follow the workflow from the section matching `state.phase`

## Always-Active Rules

When `.kramak/state.json` exists:

- Only modify files listed in the active Work Item's `files_targeted`
- Read actual files before editing - never code from memory
- Run `toolchain.checkCommands` after making changes
- Update `state.json` after Work Item state transitions
- Never hardcode API keys or credentials - use environment variables
- After each WI, check hard stop gates (≥6 WIs, ≥20 files, ≥4 errors, ≥1 failure = fresh session)


> **Read these files FIRST before working on this codebase:**
> 1. This file (AGENTS.md)
> 2. `docs/DESIGN_SYSTEM.md` — Complete design system reference
> 3. `docs/STATUS.md` — Current architecture, features, and git status

---

## Who This Is For

This is the portfolio website for **Akanksha** — a Production AI Engineer at Samsung SDS.
The site is designed to convert high-value visitors (CTOs, Engineering Managers, Recruiters)
into interview requests for Senior/Staff AI Engineer roles.

**Brand:** Production AI Engineer — Agentic RAG, LLM Orchestration, Enterprise AI
**Aesthetic:** "Cyber-Physical Laboratory" — blueprint grid, glassmorphism, IDE status bar

---

## Development

```bash
# Start dev server
pnpm dev           # or: npm run dev → http://localhost:4321

# Build for production
pnpm build         # or: npm run build

# Preview production build
pnpm preview       # or: npm run preview
```

On Windows, if `npm` fails with script execution policy errors:
```bash
cmd /c npm run dev
```

---

## Key Architecture Decisions

| Decision | Rationale |
|----------|-----------|
| Pure Astro + vanilla JS (no React/Vue) | Zero client-side framework overhead; ultra-fast static rendering |
| Tailwind CSS v4 with `@theme` tokens | Design system lives in CSS, not component props |
| Client-side JD matching (not server) | Works on static hosting; no API keys needed |
| Local KB for Cmd+K (not LLM) | Privacy, speed, no API dependency |
| Cloudflare Workers hosting | Edge deployment, free tier, custom domain support |

---

## Design System Quick Reference

- **Colors:** Teal `#00E5B0` + Amber `#F5A300` + Space `#05070F`
- **Fonts:** Syne (display) + Plus Jakarta Sans (body) + JetBrains Mono (code)
- **Background:** Blueprint grid (2.2% opacity) + noise texture + floating orbs
- **Cards:** Glassmorphism with `backdrop-filter: blur(12px)`

**Full reference:** `docs/DESIGN_SYSTEM.md`

---

## Data Source

Career data in page frontmatter should match the identity layer in the parent repo:
- `../../identity/experience.yaml` → Experience data
- `../../identity/skills.yaml` → Tech stack
- `../../identity/projects.yaml` → Project catalog
- `../../identity/credentials.yaml` → Certification counts
- `../../identity/speaking-and-community.yaml` → Events
- `../../identity/claims-and-evidence.md` → Verification status

---

## Interactive Components

### AiSandbox (`src/components/AiSandbox.astro`)
- Two tabs: RAG pipeline + Agent loop
- Interactive node toggles that degrade output when disabled
- All data/responses are hardcoded JS objects (no API calls)

### JdMatcher (`src/components/JdMatcher.astro`)
- Client-side regex matching against skill dictionary
- Circular SVG progress ring for match percentage
- Filtered experience bullets + STAR story suggestions

### Command Palette (in `BaseLayout.astro`)
- `Ctrl+K` / search button trigger
- Local knowledge base object (`kb` variable)
- Streaming text animation

### IDE Status Bar (in `BaseLayout.astro`)
- Fixed bottom, `z-index: 49`
- Simulated latency ticker (updates every 4s)

---

## Documentation

- Full design system: `docs/DESIGN_SYSTEM.md`
- Architecture and status: `docs/STATUS.md`
- Deployment guide: `DEPLOY.md`
- Astro docs: https://docs.astro.build
