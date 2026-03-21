---
title: "Astro 6: Dev Server Redesign, Vite 7, and Breaking Changes"
description: "Astro 6 replaces the dev server simulation layer with real runtime execution via Vite's Environment API. Technical breakdown of changes, breaking changes, and upgrade path."
pubDate: "2026-03-21"
heroImage: "../../assets/2026/03/astro-6-hero.svg"
tags: ["astro", "javascript", "webdev"]
categories: ["webdev"]
---

Astro 6 released on March 10, 2026 with one of the most ambitious refactors in the project's history: a redesigned development server built on Vite's Environment API. This post covers the technical changes and upgrade considerations.

## The Dev Server Redesign

Previous Astro versions used a simulation layer to approximate runtime behavior during development. Astro 6 replaces this with **real runtime execution** via Vite's Environment API.

### What This Means for Cloudflare Users

For projects using the Cloudflare adapter, `astro dev` now runs inside **workerd** — the same open-source runtime that powers Cloudflare Workers in production. This eliminates the gap between development and production behavior.

The dev server leverages Vite 6's multi-environment architecture with two named environments:
- `astro` (server/SSR)
- `client` (browser)

Each environment has its own module graph and resolve conditions, configured via the `configEnvironment` hook in the core Astro plugin.

## Requirements Changes

| Requirement | Astro 5 | Astro 6 |
|-------------|---------|---------|
| Node.js | 18+ | **22.12.0+** |
| Zod | 3.x | **4.x** |
| Vite | 6.x | **7.x** |

The Node.js version gate is enforced at the CLI entry point — processes exit immediately if the major version is below 22.

### Zod 4 Migration

Zod 3 schemas are no longer supported. The migration affects:
- Content collection schemas
- Action input validation
- Any custom Zod usage in your project

The upgrade focused on runtime correctness, but some issues with IDE type inference have been reported. Run `astro check` to verify your schemas compile correctly.

## New Features

### Live Content Collections (Stabilized)

Previously experimental in Astro 5.10, Live Content Collections are now stable. The `LiveLoader` interface enables server-side, on-demand content loading rather than build-time only.

Key components:
- `content-layer.ts` — orchestrator for the content layer
- `loaders/types.ts` — `LoaderContext` and loader interfaces
- `loaders/glob.ts` — file glob-based loading
- `loaders/file.ts` — single file loading

Custom loaders implementing `LiveLoader` can fetch content dynamically at request time.

### Content Security Policy (CSP)

CSP is now a first-class configuration feature. The implementation lives in `core/csp/` with:
- `config.ts` — CSP configuration parsing
- `runtime.ts` — Runtime header generation
- `common.ts` — Shared utilities

### Experimental Rust Compiler

Astro 6 introduces an optional Rust compiler for faster builds. Enable it in your config:

```js
// astro.config.mjs
export default defineConfig({
  experimental: {
    rustCompiler: true
  }
});
```

The compiler selection happens at runtime in `vite-plugin-astro/index.ts`:
- **Enabled**: Uses `@astrojs/compiler-rs` (native N-API module)
- **Disabled**: Uses `@astrojs/compiler` (Go/WASM)

The Rust path uses a two-pass architecture where style preprocessing runs in a dedicated `preprocessStyles()` call before the main `transform()`.

## Removed APIs

The following APIs have been removed:

| Removed | Migration |
|---------|-----------|
| `Astro.glob()` | Use `import.meta.glob()` or content collections |
| `emitESMImage()` | Use `image()` from `astro:assets` |
| Legacy `<ViewTransitions />` | Use the new transitions API |

## HMR Improvements

Hot Module Replacement now uses granular change classification:
- Style-only edits trigger CSS-only updates
- CSS dependency mutations are tracked separately
- Framework island changes are isolated

When a `.astro` file changes, Astro compares old and new source through a structured diffing algorithm that progressively strips non-relevant sections (frontmatter, `<script>` blocks, then styles) to determine minimal invalidation.

For SSR-only modules that have no client-side representation, Astro handles the asymmetry in Vite 6's environment architecture by providing targeted invalidation.

## Upgrade Steps

1. **Update Node.js** to v22.12.0 or higher
2. **Run the upgrade command**:
   ```bash
   npx @astrojs/upgrade
   ```
3. **Update Zod schemas** to Zod 4 syntax
4. **Replace removed APIs**:
   - `Astro.glob()` → `import.meta.glob()` or content collections
   - `emitESMImage()` → `image()` from `astro:assets`
5. **Test thoroughly** — especially if using Cloudflare adapter or custom content loaders

## Known Issues to Watch

The Astro team is tracking several post-release issues:
- Zod 4 type inference discrepancies between `astro check` and IDE
- CSS pipeline edge cases with dynamically imported components
- Custom live loaders with typed interfaces throwing type errors

Check the [GitHub releases page](https://github.com/withastro/astro/releases) for patches. As of this writing, the latest is 6.0.8 (March 20, 2026).

## Sources

- [Astro Documentation](https://docs.astro.build/en/guides/upgrade-to/v6/)
- [Astro GitHub Repository](https://github.com/withastro/astro)
