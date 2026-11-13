# AiTouchSolutions SEO and Content Audit

Audit date: 2026-09-24
Scope: repository source, current static content, deployment configuration, generated sitemap and robots rules. The live website could not be fetched with the available web reader, so live HTTP status, redirects, rendered mobile behavior, and Core Web Vitals remain unverified.

## Inventory

- TanStack Start + React site with file-based routes, static prerendering, Vercel configuration, and a Cloudflare server entry.
- Public route families: home, service index/detail, tools index/detail, blog index/detail, portfolio, pricing, technologies, AI solutions, about, contact, and policy pages.
- Service details are data-driven from `src/lib/service-seo.ts`; the app has a JSON-backed blog (`src/data/news.json` and `src/data/editorial-posts.json`).
- Current blog inventory: 96 RSS-derived news records and one editorial guide.
- `public/sitemap.xml` and `public/robots.txt` exist. Robots allows all paths; the sitemap includes static routes and RSS-derived article URLs.
- GitHub Actions refreshes RSS-derived posts every 12 hours and commits JSON and sitemap changes directly.

## Findings by priority

### Critical: published RSS records are not original articles

The updater fills missing article bodies with the same generic sections and boilerplate. Existing records use publisher excerpts, often append an ellipsis, and label source images without recording image reuse rights. There is no relevance threshold, multi-source verification, content similarity check, or publish-quality gate. This creates thin/derivative pages and copyright/reputation risk.

### High: public article URLs are not quality-triaged

The blog index and related-post logic expose the RSS archive. Article metadata and structured data exist, but the sitemap includes all records. `dateModified` falls back to the feed-wide generation timestamp, which can make old articles appear modified when the feed refreshes. Existing URL paths can be preserved while excluding low-quality records from indexable navigation and the sitemap.

### High: contact form provides false success

The contact form prevents submission and displays a success state without transmitting the entered fields. This breaks a key lead-generation path and claims that a message was received when none was sent.

### High: unsupported business claims

Source strings include claims such as 40 enterprise clients, 12k+ users, delivery across four continents, 100+ project portfolio concepts, and 100+ technologies. The repo does not provide evidence for these counts; illustrative portfolio concepts are presented in portfolio-like language. These claims should be removed or labeled accurately unless evidence is supplied.

### Medium: topic and service architecture gaps

Current service pages already cover AI agents/automation/chatbots, SaaS, custom software, web/mobile apps, e-commerce, CRM/ERP, dashboards, cloud, security, and related work. There is no problem-oriented “What can we build?” page or mapped keyword inventory. No evidence supports location landing pages, so they should not be generated.

### Medium: infrastructure and quality checks

Robots currently allows all URLs, including internal search/API/private patterns if they are added later. No repository-level automated crawl/SEO validation is configured. Sitemap and prerender inventories are maintained separately and need consistency checks. No backlink export or Search Console credentials are present.

### Unverified

Live HTTP codes, canonical/redirect behavior at the CDN, HTTPS enforcement, response headers, broken deployed links, mobile usability, image transfer sizes, and Core Web Vitals require a reachable deployment and browser/network measurement. `npm run build` could not start because `vite` is unavailable (dependencies are not installed in this checkout).

## Remediation order

1. Replace the RSS filler publisher with an opt-in, source-verified, original drafting pipeline; preserve archive URLs but mark existing RSS records non-indexable until editorially reviewed.
2. Align blog visibility, canonical metadata, article dates, provenance, structured data, and sitemap membership with the indexable state.
3. Repair the contact inquiry flow and remove unverified company claims.
4. Add a focused problem-to-solution service page and a mapped keyword/content inventory; do not mass-generate service or location pages.
5. Add reproducible build, content-gate, and generated-site SEO checks; complete live performance/security checks after deployment access is available.

## Remediation log — 2026-11-13

Verified in the current checkout (commit 556072c) before changing anything:

- Contact form: no false-success state existed any more — the form opened
  mailto/WhatsApp with a pre-filled message. Remaining gaps were fixed:
  "Either" silently opened WhatsApp, there was no on-page confirmation, and
  a failed mailto/WhatsApp open left the visitor with nothing.
- Business claims: the audit's examples (40 enterprise clients, 12k+ users,
  delivery across four continents, 100+ technologies) are not present in
  site copy, structured data, or the portfolio. The portfolio already labels
  its entries "illustrative product concepts, not client projects". The one
  inexact count, `108+` illustrative concepts, was corrected to the exact
  catalog count, 108.
- Blog/RSS: the triage had already run — all 178 RSS posts are
  `indexable: false` with empty content, the sitemap lists 39 URLs with only
  1 blog URL, robots.txt already disallows /api/, /admin/, /login/ and
  /search, and `scripts/publish-content.mjs` only publishes a new article
  after two-source verification, an original draft, and image-rights checks.
  Remaining gap fixed: the blog index linked every archived brief to an
  internal noindex page and counted them as "Stories".

Changes in this round:

1. `src/routes/contact.tsx` — "Either" now opens email (documented in the
   form note); after submit an on-page status says the message "has not been
   sent yet", shows the full message, and offers a Copy button (the message
   is also copied to the clipboard automatically). No server send was added
   because no email service is configured for this site; adding one needs
   credentials the owner must supply.
2. `src/routes/portfolio.tsx` — `108+` illustrative concepts corrected to
   `108`.
3. `src/routes/blog.tsx` — the "Stories" stat is now an honest "News briefs"
   count (178, excluding the 1 indexable editorial guide). An earlier
   attempt to link archived briefs straight to their publisher was reverted:
   the repo's own `scripts/validate-built-seo.mjs` requires the blog index
   to link every visible brief to its internal archive page, and those pages
   are noindex with an "Archived feed entry" notice, so that internal
   linking is the intended design, not a bug.
4. `src/routes/blog.$slug.tsx` — archived pages now show a prominent
   "Read the original at <source>" button at the top.

Not fixed here (needs the owner): the 2-hourly `update-news` workflow has
not published since 2026-09-24 — it skips without an approved image host
(`NEWS_ALLOWED_IMAGE_HOSTS` secret) and a working OpenRouter key, so no new
verified article has passed the gate since then.

## Remediation log — 2026-11-14 (P2 SEO, branch `seo-organic-traffic`)

Pillar-sitemap bug fixed: the pillar post `best-ai-resume-builder-2026` had
no explicit `indexable` field, while `scripts/publish-content.mjs`
`buildSitemap` read the raw JSON flag, so the next publish would have
dropped the pillar from the sitemap and failed validation. The pillar now
has `"indexable": true`, and `buildSitemap` uses the same pillar-safe rule
as `src/lib/news.ts` (`isSitemapPost`), exported for reuse.

Other P2 fixes on this branch:

- Sitemap now carries `lastmod` on all 41 URLs (was 1 of 40), taken from
  each post's `updatedAt || publishedAt`, with previous static-URL values
  preserved.
- `publish-content.mjs` no longer demotes every article on each publish:
  a 90-day rolling window keeps `indexable: true` only for reviewed
  articles published in the last 90 days.
- Blog index no longer renders 178 full cards for archived noindex briefs:
  indexable articles get full cards, archived briefs get compact one-line
  rows (title + date + source) under a "News briefs archive" heading, with
  all internal links kept. Built page fell from ~370 KB to 148 KB.
- Indexable articles now show a "Related services" block
  (`getRelatedServices` in `src/lib/news.ts`), keyword-mapped to verified
  service slugs, up to 3 links.
- New viral article published on this branch: "Gemini 4 Hydrogen: Google's
  Fast AI Model for Agents and Search" (749 words, 5 sections, sources
  Google Blog + 9to5Google, 2026-11-12 announcement). Passes
  `test-content-gate.mjs`, `bun run build` and `validate-built-seo.mjs`
  (328 pages, 41 sitemap URLs).

Deliberate decision — portfolio stays noindex: `/portfolio` and the 108
`/portfolio/$projectId` pages are illustrative product concepts, not
verified client work. Their routes already carry `noIndex: true` and they
are correctly excluded from the sitemap. Do NOT add them to the sitemap
until the entries are real, evidenced client projects.

Still needs the owner: repo secrets `OPENROUTER_API_KEY` +
`NEWS_ALLOWED_IMAGE_HOSTS` (2-hourly `update-news` workflow blocked
without them); Google Search Console verification.
