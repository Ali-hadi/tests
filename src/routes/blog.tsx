import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock3 } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import {
  formatNewsDate,
  getNewsReadTime,
  newsCategoryCounts,
  newsGeneratedAt,
  newsPosts,
  newsSources,
} from "@/lib/news";
import { createSeo } from "@/lib/seo";

export const Route = createFileRoute("/blog")({
  head: () =>
    createSeo({
      title: "AI & IT Blog News | AItouchSolutions",
      description:
        "Read AI and IT blog briefs stored in the AItouchSolutions JSON feed, with internal detail pages, images, tags, and indexed article links.",
      path: "/blog",
      keywords: ["AI news", "IT news", "technology blog", "software news", "AI blog"],
    }),
  component: BlogPage,
});

function BlogPage() {
  const updatedAt = newsGeneratedAt ? formatNewsDate(newsGeneratedAt) : "Pending";
  const featuredPost = newsPosts[0];
  const remainingPosts = featuredPost ? newsPosts.slice(1) : newsPosts;

  return (
    <>
      <section className="pt-40 pb-16 lg:pt-52 lg:pb-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-teal mb-8">
              Blog News
            </p>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <h1 className="font-display max-w-5xl text-6xl font-bold leading-[0.9] tracking-[-0.04em] md:text-8xl lg:text-9xl">
                  AI and IT signals, <span className="gradient-text">kept current.</span>
                </h1>
              </div>
              <div className="lg:col-span-4 lg:pb-4">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Internal AItouchSolutions briefs for AI, software, cloud, security, devices, and
                  product engineering news. Every story is stored in JSON and opens on this site.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-ink">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 px-6 lg:grid-cols-4 lg:px-10">
          {[
            { label: "Stories", value: newsPosts.length.toString() },
            { label: "AI posts", value: newsCategoryCounts.AI.toString() },
            { label: "IT posts", value: newsCategoryCounts.IT.toString() },
            { label: "Updated", value: updatedAt },
          ].map((item, index) => (
            <div
              key={item.label}
              className={`p-7 lg:p-10 ${index < 3 ? "lg:border-r border-border" : ""} ${index < 2 ? "border-b border-border lg:border-b-0" : ""}`}
            >
              <p className="mb-3 font-display text-2xl font-bold text-teal lg:text-4xl">
                {item.value}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {featuredPost ? (
        <section className="py-20 lg:py-28">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <Reveal>
              <Link
                to="/blog/$slug"
                params={{ slug: featuredPost.slug }}
                className="grid overflow-hidden rounded-md border border-border bg-ink transition-colors hover:bg-ink-2 lg:grid-cols-[1.05fr_0.95fr]"
              >
                <div className="aspect-[16/10] bg-background lg:aspect-auto">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="h-full w-full object-cover opacity-90 transition-opacity hover:opacity-100"
                    loading="eager"
                  />
                </div>
                <article className="flex min-h-[420px] flex-col p-7 lg:p-10">
                  <div className="mb-8 flex flex-wrap items-center gap-3">
                    <span
                      className={`rounded-md px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] ${
                        featuredPost.category === "AI"
                          ? "bg-teal/15 text-teal"
                          : "bg-orange/15 text-orange"
                      }`}
                    >
                      {featuredPost.category}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {formatNewsDate(featuredPost.publishedAt)}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      <Clock3 className="h-3.5 w-3.5" />
                      {getNewsReadTime(featuredPost)} min
                    </span>
                  </div>
                  <h2 className="font-display text-4xl font-bold leading-tight tracking-tight lg:text-6xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-6 text-base leading-relaxed text-muted-foreground lg:text-lg">
                    {featuredPost.excerpt}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {featuredPost.tags.slice(0, 5).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-4 border-t border-border pt-8">
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {featuredPost.source}
                    </p>
                    <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-teal">
                      Read detail
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </article>
              </Link>
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className={featuredPost ? "pb-24 lg:pb-32" : "py-24 lg:py-32"}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          {newsPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 xl:grid-cols-3">
              {remainingPosts.map((post, index) => (
                <Reveal key={post.id} delay={index % 6}>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="group flex h-full flex-col bg-background transition-colors hover:bg-ink-2"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-ink">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                        loading="lazy"
                      />
                    </div>
                    <article className="flex h-full flex-col p-7 lg:p-9">
                      <div className="mb-7 flex items-center justify-between gap-4">
                        <span
                          className={`rounded-md px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] ${
                            post.category === "AI"
                              ? "bg-teal/15 text-teal"
                              : "bg-orange/15 text-orange"
                          }`}
                        >
                          {post.category}
                        </span>
                        <time className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                          {formatNewsDate(post.publishedAt)}
                        </time>
                      </div>
                      <h2 className="mb-5 font-display text-2xl font-bold leading-tight lg:text-3xl">
                        {post.title}
                      </h2>
                      <p className="mb-7 text-sm leading-relaxed text-muted-foreground">
                        {post.excerpt}
                      </p>
                      <div className="mb-7 flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-border px-2.5 py-1 text-[11px] text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-auto flex items-center justify-between gap-4 border-t border-border pt-6">
                        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                          {post.source}
                        </p>
                        <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-teal">
                          Open
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </article>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="border border-border bg-ink p-10 lg:p-14">
                <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.35em] text-teal">
                  Feed pending
                </p>
                <h2 className="mb-6 font-display text-4xl font-bold tracking-[-0.03em] lg:text-6xl">
                  The news feed is ready for its first refresh.
                </h2>
                <p className="max-w-2xl leading-relaxed text-muted-foreground">
                  New AI and IT stories will appear here as soon as the feed has fresh items.
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="border-t border-border bg-ink py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.35em] text-orange">
                  Sources
                </p>
                <h2 className="font-display text-4xl font-bold tracking-tight lg:text-5xl">
                  Curated technology feeds.
                </h2>
              </div>
              <div className="grid gap-px bg-border sm:grid-cols-2 lg:col-span-8">
                {newsSources.map((source) => (
                  <div key={source.name} className="bg-ink p-6">
                    <p className="mb-2 font-display text-xl font-bold">{source.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {source.category} feed stored in JSON
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
