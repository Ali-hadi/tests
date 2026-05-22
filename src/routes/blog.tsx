import { createFileRoute } from "@tanstack/react-router";
import newsData from "@/data/news.json";
import { Reveal } from "@/components/site/Reveal";
import { createSeo } from "@/lib/seo";

export const Route = createFileRoute("/blog")({
  head: () =>
    createSeo({
      title: "AI & IT Blog News | AItouchSolutions",
      description:
        "Read the latest AI and IT news collected from trusted technology sources and stored in the AItouchSolutions news JSON feed.",
      path: "/blog",
      keywords: ["AI news", "IT news", "technology blog", "software news"],
    }),
  component: BlogPage,
});

type NewsPost = {
  id: string;
  title: string;
  excerpt: string;
  source: string;
  category: "AI" | "IT";
  publishedAt: string;
  url: string;
  image?: string;
  tags?: string[];
};

const posts = [...(newsData.posts as NewsPost[])].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
);

const categoryCounts = posts.reduce(
  (acc, post) => {
    acc[post.category] += 1;
    return acc;
  },
  { AI: 0, IT: 0 },
);

const sources = newsData.sources as Array<{ name: string; url: string; category: "AI" | "IT" }>;

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function BlogPage() {
  const updatedAt = newsData.generatedAt ? formatDate(newsData.generatedAt) : "Pending";

  return (
    <>
      <section className="pt-40 lg:pt-52 pb-20 lg:pb-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-teal mb-8">
              Blog News
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-8">
                <h1 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl tracking-[-0.04em] leading-[0.9] max-w-5xl">
                  AI and IT signals, <span className="gradient-text">kept current.</span>
                </h1>
              </div>
              <div className="lg:col-span-4 lg:pb-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A running briefing of artificial intelligence, software, cloud, security, and
                  product engineering moves from technology sources teams actually watch.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-ink">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Stories", value: posts.length.toString() },
            { label: "AI posts", value: categoryCounts.AI.toString() },
            { label: "IT posts", value: categoryCounts.IT.toString() },
            { label: "Updated", value: updatedAt },
          ].map((item, index) => (
            <div
              key={item.label}
              className={`p-7 lg:p-10 ${index < 3 ? "lg:border-r border-border" : ""} ${index < 2 ? "border-b lg:border-b-0 border-border" : ""}`}
            >
              <p className="font-display text-2xl lg:text-4xl font-bold text-teal mb-3">
                {item.value}
              </p>
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-border">
              {posts.map((post, index) => (
                <Reveal key={post.id} delay={index % 6}>
                  <article className="bg-background h-full p-7 lg:p-9 hover:bg-ink-2 transition-colors">
                    {post.image ? (
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noreferrer"
                        className="block aspect-[16/10] -m-7 lg:-m-9 mb-7 lg:mb-9 overflow-hidden bg-ink"
                      >
                        <img
                          src={post.image}
                          alt=""
                          className="w-full h-full object-cover opacity-85 hover:opacity-100 transition-opacity"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      </a>
                    ) : null}
                    <div className="flex items-center justify-between gap-4 mb-8">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.25em] ${
                          post.category === "AI"
                            ? "bg-teal/15 text-teal"
                            : "bg-orange/15 text-orange"
                        }`}
                      >
                        {post.category}
                      </span>
                      <time className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                        {formatDate(post.publishedAt)}
                      </time>
                    </div>
                    <h2 className="font-display text-2xl lg:text-3xl font-bold leading-tight mb-5">
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-teal"
                      >
                        {post.title}
                      </a>
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between gap-4 pt-6 border-t border-border">
                      <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
                        {post.source}
                      </p>
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] font-mono uppercase tracking-[0.25em] text-teal"
                      >
                        Read
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="border border-border bg-ink p-10 lg:p-14">
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-teal mb-5">
                  Feed pending
                </p>
                <h2 className="font-display text-4xl lg:text-6xl font-bold tracking-[-0.03em] mb-6">
                  The news feed is ready for its first refresh.
                </h2>
                <p className="max-w-2xl text-muted-foreground leading-relaxed">
                  New AI and IT stories will appear here as soon as the feed has fresh items.
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="py-24 border-t border-border bg-ink">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-orange mb-5">
                  Sources
                </p>
                <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight">
                  Curated technology feeds.
                </h2>
              </div>
              <div className="lg:col-span-8 grid sm:grid-cols-2 gap-px bg-border">
                {sources.map((source) => (
                  <a
                    key={source.name}
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-ink p-6 hover:bg-background transition-colors"
                  >
                    <p className="font-display text-xl font-bold mb-2">{source.name}</p>
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
                      {source.category} feed
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
