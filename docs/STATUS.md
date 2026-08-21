# akanksha.dev — Website Development Status & Architecture

> **Last updated:** 2026-08-21
> **Status:** ✅ Batch 2 Complete — Cyber-Physical Laboratory UI/UX Overhaul, AI Sandbox 2.0 with node inspection, JD Matcher 2.0 with domain radar & dossier export, interactive project case studies, and full contact conversion engine with honeypot bot defense.

---

## Current Architecture State

### Stack & Infrastructure
- **Framework:** Astro v7.2.4 (static-first with client-side View Transitions and ClientRouter)
- **Styling:** Tailwind CSS v4.3.1 (`@theme` tokens) + pure Vanilla CSS micro-animations
- **Components:** Pure Astro + vanilla TypeScript/JavaScript (zero client framework runtime overhead)
- **Hosting:** Cloudflare Workers (Edge edge delivery, custom headers, zero cold start)
- **Domain:** `https://akanksha.dev`

### Core Capabilities Implemented (from 16 Decision Papers)
1. **Cyber-Physical Laboratory Design System (DP-05, DP-06, DP-07, DP-08, DP-11, DP-12)**
   - OKLCH color token architecture with Electric Teal (`#00E5B0`) and Warm Amber (`#F5A300`) accents on Deep Space (`#05070F`).
   - Frosted glassmorphism (18-20px backdrop blur + 160% saturation + subtle neon inner borders).
   - Blueprint telemetry grid with pulsing status nodes.
   - Command Palette 2.0 (`Cmd+K`) with zero-latency local knowledge base, action commands, and keyboard navigation.
   - IDE Status Bar with real-time IST clock, live simulated telemetry ping, and availability status.

2. **Interactive AI Architecture Sandbox 2.0 (DP-05, DP-07, DP-14, DP-USYN)**
   - 4-Stage Graph RAG pipeline visualizer with animated node progression.
   - Deep Node Telemetry Inspector: Click any pipeline stage to view intermediate parameters (GMFT layout tokens, FAISS cosine distances, Neo4j entities, GPT-4 prompt tokens).
   - Dynamic Architectural Degradation Mode: Toggling OFF Semantic Router or RAGAS Guardrails displays warning banners and highlights hallucination diffs.
   - Containerized Google ADK Multi-Agent loop simulation with tool execution logs.

3. **Recruiter JD Compatibility Engine 2.0 (DP-13, DP-14, DP-16, DP-USYN)**
   - Instant 300ms debounced live evaluation as recruiters type or paste job postings.
   - 4-Domain Fit Radar: Agentic AI & Orchestration, RAG & Vector Search, LLM Infra & APIs, Enterprise ML & Reliability.
   - Tailored STAR interview discussion points based on detected competencies.
   - One-click Candidate Match Dossier export formatted for Slack / Email / Notion.

4. **Project Architecture Deep-Dive Modals & Case Studies (DP-04, DP-14, DP-USYN)**
   - Interactive system architecture inspection modals for flagship systems.
   - Problem statement vs Naive Tutorial approach vs Production Hardened Architecture comparisons.
   - Verified metric benchmarks (60% effort reduction, 92% retrieval accuracy, 500+ daily queries).
   - Core engineering trade-offs and decision rationale.

5. **Contact Conversion Engine & Availability Signaling (DP-10, DP-12, DP-16, DP-USYN)**
   - Interactive Contact Conversion Form with topic selector ("Senior AI Role", "Project Advisory", "Speaking", "General").
   - Zero-friction bot defense: Honeypot trap + minimum time-to-submit verification.
   - Live availability badge ("Open to Senior/Staff AI Engineer Roles · Q3/Q4 2026").
   - Direct email copying, mailto fallback, and PDF Resume Dossier download.
