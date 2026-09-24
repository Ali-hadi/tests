import { organicServiceKeywords, serviceLandingPages } from "@/lib/service-seo";

const SITE_URL = "https://aitouchsolutions.com";
const SITE_NAME = "AiTouchSolutions";
const AUTHOR_NAME = "Jon";
const CONTACT_EMAIL = "shahzad.mern.dev@gmail.com";
const WHATSAPP_DISPLAY = "03244958672";
const WHATSAPP_INTERNATIONAL = "+923244958672";
const WHATSAPP_URL = "https://wa.me/923244958672";
const LINKEDIN_URL = "https://www.linkedin.com/in/ai-touch-solutions-91b727417";
const LINKEDIN_DISPLAY = "linkedin.com/in/ai-touch-solutions-91b727417";
const DEFAULT_IMAGE = "/og-image.jpg";
const FOUNDER_IMAGE = "/founder-jon.jpg";

export const siteConfig = {
  name: SITE_NAME,
  url: SITE_URL,
  author: AUTHOR_NAME,
  email: CONTACT_EMAIL,
  whatsappDisplay: WHATSAPP_DISPLAY,
  whatsappInternational: WHATSAPP_INTERNATIONAL,
  whatsappUrl: WHATSAPP_URL,
  linkedinUrl: LINKEDIN_URL,
  linkedinDisplay: LINKEDIN_DISPLAY,
  defaultImage: DEFAULT_IMAGE,
  founderImage: FOUNDER_IMAGE,
  defaultTitle: "AiTouchSolutions | AI Software, Web Apps & Automation",
  defaultDescription:
    "AiTouchSolutions builds AI agents, automation systems, custom SaaS, web apps, mobile apps, and scalable digital products for global clients. Founded by Jon.",
  keywords: organicServiceKeywords,
};

type SeoOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string[];
  noIndex?: boolean;
  author?: string | null;
  publishedAt?: string;
  updatedAt?: string;
};

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createSeo({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  noIndex = false,
  author = AUTHOR_NAME,
  publishedAt,
  updatedAt,
}: SeoOptions) {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      ...(author ? [{ name: "author", content: author }] : []),
      {
        name: "robots",
        content: noIndex
          ? "noindex,nofollow"
          : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
      },
      {
        name: "googlebot",
        content: noIndex
          ? "noindex,nofollow"
          : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
      },
      {
        name: "bingbot",
        content: noIndex
          ? "noindex,nofollow"
          : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
      },
      { name: "referrer", content: "strict-origin-when-cross-origin" },
      { name: "format-detection", content: "telephone=no" },
      { property: "og:locale", content: "en_US" },
      { property: "og:type", content: type },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonical },
      { property: "og:image", content: imageUrl },
      { property: "og:image:alt", content: title },
      ...(type === "article" && publishedAt
        ? [{ property: "article:published_time", content: publishedAt }]
        : []),
      ...(type === "article" && updatedAt
        ? [{ property: "article:modified_time", content: updatedAt }]
        : []),
      ...(type === "article" && author ? [{ property: "article:author", content: author }] : []),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },
    ],
    links: [{ rel: "canonical", href: canonical }],
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: absoluteUrl("/logo-white.png"),
      image: absoluteUrl(DEFAULT_IMAGE),
      description: siteConfig.defaultDescription,
      founder: {
        "@type": "Person",
        name: AUTHOR_NAME,
        email: CONTACT_EMAIL,
        image: absoluteUrl(FOUNDER_IMAGE),
        url: absoluteUrl("/about"),
      },
      email: CONTACT_EMAIL,
      telephone: WHATSAPP_INTERNATIONAL,
      sameAs: [LINKEDIN_URL, WHATSAPP_URL],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: CONTACT_EMAIL,
          telephone: WHATSAPP_INTERNATIONAL,
          url: WHATSAPP_URL,
          availableLanguage: ["English", "Urdu"],
        },
      ],
      areaServed: "Worldwide",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "AI and software development services",
        itemListElement: serviceLandingPages.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            url: absoluteUrl(`/services/${service.slug}`),
            description: service.summary,
            provider: { "@id": `${SITE_URL}/#organization` },
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
  ],
};
