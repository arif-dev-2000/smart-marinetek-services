# Repository Guidelines

- Keep the existing TanStack router and SSR shell; content pages use file routes so direct URLs and page metadata work.
- Centralize company, product and application data in browser-safe TypeScript modules; keep reusable website sections separate from route definitions to avoid duplication.
- The enquiry integration is frontend-only and endpoint-configured; missing configuration must explicitly report unavailable submission rather than simulate success.
- Pre-optimize frontend dependencies and reject outdated optimized URLs; mixing cached React module versions can cause invalid-hook crashes in existing preview tabs.
