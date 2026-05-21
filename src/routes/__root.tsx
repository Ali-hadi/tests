import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Jarvis } from "@/components/site/Jarvis";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-teal mb-4">
          404 — signal lost
        </p>
        <h1 className="font-display text-7xl font-bold gradient-text">Off-grid</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you're looking for has drifted out of range.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-ink rounded-full text-xs font-bold uppercase tracking-widest hover:bg-teal-glow"
          >
            ← Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl font-bold">Something glitched</h1>
        <p className="mt-3 text-sm text-muted-foreground">Try again or head home.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="px-5 py-2.5 bg-teal text-ink rounded-full text-xs font-bold uppercase tracking-widest"
          >
            Retry
          </button>
          <a
            href="/"
            className="px-5 py-2.5 border border-border rounded-full text-xs font-bold uppercase tracking-widest"
          >
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AItouchSolutions — AI-Powered Software Solutions for the Future" },
      {
        name: "description",
        content:
          "Global AI-powered software company building intelligent web apps, AI agents, automation systems, and scalable digital products. Founded by Shahzad Nazar. Available 24/7.",
      },
      { name: "author", content: "AItouchSolutions" },
      { property: "og:title", content: "AItouchSolutions — AI Software for the Future" },
      {
        property: "og:description",
        content:
          "Intelligent web apps, AI agents, automation systems for global clients. 24/7 delivery.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "AItouchSolutions" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0A1A2E" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Nav />
      <main className="relative">
        <Outlet />
      </main>
      <Footer />
      <Jarvis />
    </QueryClientProvider>
  );
}
