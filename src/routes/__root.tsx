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
import { organizationJsonLd, siteConfig } from "@/lib/seo";

const googleAnalyticsId = "G-KLM7KSPV8R";
const googleAnalyticsSnippet = `
window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag("js", new Date());
gtag("config", "${googleAnalyticsId}");
`.trim();

function GoogleAnalytics() {
  if (!import.meta.env.PROD) return null;

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: googleAnalyticsSnippet,
        }}
      />
    </>
  );
}

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
      { name: "theme-color", content: "#0A1A2E" },
      { name: "application-name", content: siteConfig.name },
      { name: "creator", content: siteConfig.author },
      { name: "publisher", content: siteConfig.name },
      {
        name: "ahrefs-site-verification",
        content: "798fd0c885df993ef4f46ca9172ab7122913d4215ac428bfe3436cc3212f12a7",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300..800&family=JetBrains+Mono:wght@400..700&family=Manrope:wght@300..800&family=Space+Grotesk:wght@300..700&display=swap",
      },
      { rel: "preconnect", href: "https://www.googletagmanager.com" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "shortcut icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "sitemap", type: "application/xml", href: "/sitemap.xml" },
    ],
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
        <GoogleAnalytics />
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="NNFzdIesb8QG3anhp9+4Sg"
          async
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
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
