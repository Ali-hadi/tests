// @lovable.dev/vite-tanstack-config already includes the base plugins.
// Do not add duplicate TanStack Start, React, Tailwind, or tsconfig path plugins.
// Vercel publishes the prerendered client output from dist/client.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    server: { entry: "server" },
    prerender: {
      enabled: true,
      crawlLinks: true,
      failOnError: true,
    },
  },
});
