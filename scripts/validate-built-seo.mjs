import assert from "node:assert/strict";
import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("dist/client");
const siteUrl = "https://aitouchsolutions.com";
const sitemap = await readFile("public/sitemap.xml", "utf8");
const robots = await readFile("public/robots.txt", "utf8");
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.ok(locations.length > 0, "sitemap contains canonical URLs");
assert.equal(new Set(locations).size, locations.length, "sitemap URLs are unique");
assert.ok(robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`), "robots.txt references sitemap");

async function htmlFiles(folder) {
  const found = [];
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    const fullPath = path.join(folder, entry.name);
    if (entry.isDirectory()) found.push(...(await htmlFiles(fullPath)));
    else if (entry.isFile() && entry.name.endsWith(".html")) found.push(fullPath);
  }
  return found;
}

const pages = await htmlFiles(root);
assert.ok(pages.length > 0, "site build contains prerendered HTML");
const routes = new Set(
  pages.map((file) => {
    const relative = path.relative(root, file).split(path.sep).join("/");
    if (relative === "index.html") return "/";
    if (relative.endsWith("/index.html")) return `/${relative.slice(0, -"/index.html".length)}`;
    return `/${relative.replace(/\.html$/, "")}`;
  }),
);
const indexableTitles = new Set();
const indexableDescriptions = new Set();

function localPathExists(pathname) {
  const relative = decodeURIComponent(pathname).replace(/^\/+/, "");
  const target = path.join(root, relative);
  return access(target).then(
    () => true,
    async () => {
      try {
        await access(path.join(target, "index.html"));
        return true;
      } catch {
        return false;
      }
    },
  );
}

for (const file of pages) {
  const html = await readFile(file, "utf8");
  const relative = path.relative(root, file).split(path.sep).join("/");
  const route =
    relative === "index.html"
      ? "/"
      : relative.endsWith("/index.html")
        ? `/${relative.slice(0, -"/index.html".length)}`
        : `/${relative.replace(/\.html$/, "")}`;
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();
  const description = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i)?.[1]?.trim();
  assert.ok(title, `${file} has a title`);
  assert.ok(description, `${file} has a description`);
  const canonicals = [...html.matchAll(/<link\s+rel="canonical"\s+href="([^"]+)"/gi)];
  assert.equal(canonicals.length, 1, `${file} has exactly one canonical`);
  const canonical = canonicals[0][1];
  assert.equal(canonical, `${siteUrl}${route}`, `${file} canonical matches its route`);
  const robotsMeta = html.match(/<meta\s+name="robots"\s+content="([^"]+)"/i)?.[1] ?? "";
  if (!robotsMeta.includes("noindex")) {
    assert.ok(locations.includes(canonical), `${file} canonical belongs in sitemap`);
    assert.ok(!indexableTitles.has(title.toLowerCase()), `${file} has a unique indexable title`);
    assert.ok(
      !indexableDescriptions.has(description.toLowerCase()),
      `${file} has a unique indexable description`,
    );
    indexableTitles.add(title.toLowerCase());
    indexableDescriptions.add(description.toLowerCase());
  } else {
    assert.ok(!locations.includes(canonical), `${file} noindex URL is excluded from sitemap`);
    if (route.startsWith("/blog/")) {
      assert.match(html, /Archived feed entry/i, `${file} explains its archived status`);
      assert.doesNotMatch(html, /keeps the brief internal|brief stores the story in JSON/i);
    }
  }

  for (const match of html.matchAll(
    /<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    assert.doesNotThrow(() => JSON.parse(match[1]), `${file} has valid JSON-LD`);
  }

  for (const match of html.matchAll(/<a\b[^>]*\bhref\s*=\s*(["'])(.*?)\1/gi)) {
    const href = match[2].replaceAll("&amp;", "&");
    if (!href || href.startsWith("#") || /^(mailto:|tel:|javascript:|data:)/i.test(href)) continue;
    const destination = new URL(href, canonical);
    if (destination.origin !== siteUrl) continue;
    const pathname = decodeURIComponent(destination.pathname).replace(/\/$/, "") || "/";
    if (/\.[a-z0-9]{2,8}$/i.test(pathname)) {
      assert.ok(await localPathExists(pathname), `${file} local asset exists: ${pathname}`);
    } else {
      assert.ok(routes.has(pathname), `${file} internal route exists: ${pathname}`);
    }
  }

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    assert.match(match[0], /\balt\s*=/i, `${file} image has an alt attribute`);
  }
}
console.log(
  `Validated ${pages.length} prerendered HTML pages and ${locations.length} sitemap URLs.`,
);
