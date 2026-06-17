import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, Tag, UserRound } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import {
  formatNewsDate,
  getNewsPost,
  getNewsReadTime,
  getRelatedNewsPosts,
  newsGeneratedAt,
} from "@/lib/news";
import { absoluteUrl, createSeo, siteConfig } from "@/lib/seo";

function getBlogRouteHead(slug: string) {
  const post = getNewsPost(slug);

  return createSeo({
    title: post ? `${post.title} | AItouchSolutions Blog` : "Blog Article | AItouchSolutions",
    description: post ? post.excerpt : "Read AI and IT blog details from AItouchSolutions.",
    path: post ? `/blog/${post.slug}` : `/blog/${slug}`,
    image: post?.image,
    type: "article",
    keywords: post
      ? [post.title, post.category, post.source, ...post.tags]
      : ["AI blog", "IT blog"],
  });
}

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => getBlogRouteHead(params.slug),
  component: BlogDetailPage,
});

function BlogDetailPage() {
  const { slug } = Route.useParams();
  const post = getNewsPost(slug);

  if (!post) {
    return (
      <section className="pt-40 pb-24 lg:pt-52">
        <div className="max-w-[900px] mx-auto px-6 text-center lg:px-10">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.35em] text-orange">
            Article not found
          </p>
          <h1 className="font-display text-5xl font-bold tracking-tight lg:text-7xl">
            This blog brief is not available.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            The feed may have refreshed. Open the blog index for the latest indexed articles.
          </p>
          <Link
            to="/blog"
            className="mt-9 inline-flex items-center gap-2 rounded-md bg-teal px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>
        </div>
      </section>
    );
  }

  const relatedPosts = getRelatedNewsPosts(post, 3);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [absoluteUrl(post.image)],
    datePublished: post.publishedAt,
    dateModified: newsGeneratedAt ?? post.publishedAt,
    author: {
      "@type": "Organization",
      name: post.author,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo-white.png"),
      },
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    keywords: post.tags.join(", "),
    articleSection: post.category,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="pt-32 pb-12 lg:pt-44 lg:pb-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <Reveal>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Blog index
            </Link>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <span
                className={`rounded-md px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] ${
                  post.category === "AI" ? "bg-teal/15 text-teal" : "bg-orange/15 text-orange"
                }`}
              >
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5" />
                {formatNewsDate(post.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <Clock3 className="h-3.5 w-3.5" />
                {getNewsReadTime(post)} min read
              </span>
            </div>
            <h1 className="mt-7 max-w-5xl font-display text-5xl font-bold leading-[0.95] tracking-[-0.04em] md:text-7xl lg:text-8xl">
              {post.title}
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-muted-foreground lg:text-xl">
              {post.excerpt}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="overflow-hidden rounded-md border border-border bg-ink">
              <img
                src={post.image}
                alt={post.title}
                className="h-[340px] w-full object-cover opacity-90 md:h-[520px]"
                loading="eager"
              />
              <div className="grid gap-px bg-border md:grid-cols-4">
                {[
                  { label: "Source", value: post.source },
                  { label: "Author", value: post.author },
                  { label: "Category", value: post.category },
                  { label: "Stored", value: "JSON article" },
                ].map((item) => (
                  <div key={item.label} className="bg-ink p-5">
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="font-display text-xl font-bold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="max-w-[1200px] mx-auto grid gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-10">
          <article className="min-w-0">
            <Reveal>
              <div className="mb-10 border-l-2 border-teal bg-ink p-6 lg:p-8">
                <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-teal">
                  Key takeaways
                </p>
                <div className="grid gap-4">
                  {post.keyTakeaways.map((takeaway) => (
                    <p key={takeaway} className="text-base leading-relaxed text-muted-foreground">
                      {takeaway}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="space-y-12">
              {post.content.map((section, index) => (
                <Reveal key={section.heading} delay={index % 4}>
                  <section>
                    <h2 className="mb-5 font-display text-3xl font-bold tracking-tight lg:text-4xl">
                      {section.heading}
                    </h2>
                    <div className="space-y-5">
                      {section.body.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="text-base leading-8 text-muted-foreground lg:text-lg"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                </Reveal>
              ))}
            </div>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <div className="rounded-md border border-border bg-ink p-6">
                <div className="mb-5 flex items-center gap-2 text-teal">
                  <Tag className="h-4 w-4" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em]">Tags</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={1}>
              <div className="rounded-md border border-border bg-ink p-6">
                <div className="mb-5 flex items-center gap-2 text-orange">
                  <UserRound className="h-4 w-4" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em]">Editorial</p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  This brief is stored and rendered by AItouchSolutions with internal routes, so
                  readers stay on the site while search engines can index the detail page.
                </p>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {relatedPosts.length > 0 ? (
        <section className="border-t border-border bg-ink py-20 lg:py-28">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="mb-10 flex items-end justify-between gap-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-teal">
                  Related briefs
                </p>
                <h2 className="mt-4 font-display text-4xl font-bold tracking-tight">
                  Continue reading on this site.
                </h2>
              </div>
              <ArrowRight className="hidden h-7 w-7 text-orange md:block" />
            </div>
            <div className="grid gap-px bg-border md:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  to="/blog/$slug"
                  params={{ slug: related.slug }}
                  className="group bg-background p-6 transition-colors hover:bg-ink-2"
                >
                  <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {related.category} / {formatNewsDate(related.publishedAt)}
                  </p>
                  <h3 className="font-display text-2xl font-bold leading-tight group-hover:text-teal">
                    {related.title}
                  </h3>
                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                    {related.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
