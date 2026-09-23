// @lovable.dev/vite-tanstack-config already includes the base plugins.
// Do not add duplicate TanStack Start, React, Tailwind, or tsconfig path plugins.
// Vercel publishes the prerendered client output from dist/client.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import newsData from "./src/data/news.json";
import editorialData from "./src/data/editorial-posts.json";

const blogPrerenderPages = [
  ...((editorialData as { posts?: Array<{ slug?: string }> }).posts ?? []),
  ...((newsData as { posts?: Array<{ slug?: string }> }).posts ?? []),
]
  .map((post) => post.slug)
  .filter((slug): slug is string => Boolean(slug))
  .map((slug) => ({
    path: `/blog/${slug}`,
    prerender: { enabled: true, outputPath: `/blog/${slug}.html` },
  }));

export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    server: { entry: "server" },
    prerender: {
      enabled: true,
      crawlLinks: true,
      failOnError: true,
    },
    pages: blogPrerenderPages,
  },
});
