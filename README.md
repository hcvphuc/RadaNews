# AI Radar Publication

AI Radar is a Vietnamese-first AI production intelligence publication. It publishes original VI/EN editorial articles for creators, builders, and AI production teams, with source references and agent-ready exports.

## Current Build

- Phase 1: Astro public site with mock publication data.
- Phase 2: Source registry, RSS/Atom/page crawler, dedupe, timeout, and offline fallback.
- Phase 3: Category scoring and topic clustering with confidence and generation selection.
- Phase 4: Ollama writer path with deterministic template fallback and draft validation.
- Phase 5: Static and runtime agent-ready JSONL exports plus search index.
- Phase 6: GitHub Actions daily workflow with check/build and no-op-safe commits.
- Phase 7: Weighted local search index and search UI.
- Phase 8: Client-side RAG chat over the search index.
- Phase 9: Read-only MCP-style stdio server for article search/list/manifest tools.

## Run

```bash
npm install
npm run daily
npm run build
npm run dev
```

Public site starts at `/vi/today`.

## Environment

Real generation will use server-side environment variables only:

```env
AI_RADAR_USE_OLLAMA=false
AI_RADAR_MAX_ITEMS_PER_SOURCE=5
OLLAMA_ENDPOINT=http://127.0.0.1:11434
OLLAMA_MODEL=llama3.1:8b
```

Do not call the Ollama provider directly from browser code.

Runtime agent exports are available at `/data/agent/runtime/` after `npm run daily`.

Read-only MCP server:

```bash
npm run mcp:readonly
```
