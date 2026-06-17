export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceLandingPage = {
  slug: string;
  group: string;
  title: string;
  shortTitle: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  searchIntents: string[];
  outcomes: string[];
  deliverables: string[];
  process: string[];
  techStack: string[];
  faqs: ServiceFaq[];
};

export type ServiceGroup = {
  label: string;
  slug: string;
  description: string;
  services: ServiceLandingPage[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    label: "AI & Intelligence",
    slug: "ai-intelligence",
    description:
      "Production AI systems for automation, customer experience, knowledge retrieval, and intelligent SaaS products.",
    services: [
      {
        slug: "ai-agent-development",
        group: "AI & Intelligence",
        title: "AI Agent Development",
        shortTitle: "AI Agents",
        summary:
          "Autonomous AI agents that reason, call tools, use business data, and execute multi-step workflows across your stack.",
        metaTitle: "AI Agent Development Company | AItouchSolutions",
        metaDescription:
          "Hire AItouchSolutions for AI agent development, autonomous workflow agents, tool-calling LLM apps, RAG agents, and business automation systems.",
        keywords: [
          "AI agent development company",
          "AI agent development services",
          "custom AI agents",
          "autonomous AI agents",
          "LLM agent development",
          "OpenAI agent development",
          "LangChain agent development",
          "business AI agents",
          "AI workflow agents",
          "AI agent developers",
        ],
        searchIntents: [
          "Hire a team to build a custom AI agent",
          "Automate multi-step work with LLM agents",
          "Connect AI agents with internal tools and APIs",
        ],
        outcomes: [
          "Agent workflows that can plan, use tools, and complete repeatable business tasks",
          "Secure access to APIs, documents, CRMs, dashboards, and internal systems",
          "Human-in-the-loop review, logs, guardrails, and usage monitoring",
        ],
        deliverables: [
          "Agent architecture and prompt/tool design",
          "RAG or database-connected knowledge layer",
          "API integrations, dashboards, and audit logs",
          "Deployment, monitoring, and iteration support",
        ],
        process: [
          "Map the workflow and define measurable agent success criteria",
          "Prototype the agent with tools, memory, and safety constraints",
          "Integrate with production systems and add observability",
          "Launch with staged permissions, review loops, and improvement cycles",
        ],
        techStack: ["OpenAI", "LangChain", "LlamaIndex", "Node.js", "Python", "PostgreSQL"],
        faqs: [
          {
            question: "Can an AI agent connect to our existing software?",
            answer:
              "Yes. We build tool-calling agents that can connect to CRMs, ERPs, databases, spreadsheets, email, support tools, and custom APIs.",
          },
          {
            question: "Do you add safety controls for AI agents?",
            answer:
              "Yes. We add permissions, logging, human approval, fallback paths, rate limits, and monitoring based on the risk level of the workflow.",
          },
        ],
      },
      {
        slug: "ai-automation",
        group: "AI & Intelligence",
        title: "AI Automation",
        shortTitle: "AI Automation",
        summary:
          "AI-powered automation for operations, support, sales, reporting, document workflows, and internal decision support.",
        metaTitle: "AI Automation Agency for Business Workflows | AItouchSolutions",
        metaDescription:
          "Automate business workflows with AI. AItouchSolutions builds AI automation for documents, customer support, sales ops, reporting, and internal tools.",
        keywords: [
          "AI automation agency",
          "AI automation services",
          "business process automation",
          "workflow automation company",
          "AI workflow automation",
          "intelligent automation services",
          "AI operations automation",
          "document automation AI",
          "sales automation AI",
          "customer support automation",
        ],
        searchIntents: [
          "Automate repetitive operations with AI",
          "Reduce manual admin and reporting work",
          "Build AI workflows across business systems",
        ],
        outcomes: [
          "Lower manual workload across repetitive operational tasks",
          "Faster response times for customers, sales, and back-office teams",
          "Reliable workflow tracking, approvals, and exception handling",
        ],
        deliverables: [
          "Automation roadmap and workflow diagrams",
          "AI processing pipelines for documents, messages, and records",
          "Integrations with existing systems",
          "Admin dashboards, alerts, and maintenance plan",
        ],
        process: [
          "Identify high-volume tasks and automation ROI",
          "Build the workflow orchestration layer",
          "Add AI classification, extraction, generation, or routing",
          "Launch with monitoring and continuous improvement",
        ],
        techStack: ["OpenAI", "Zapier", "Make", "n8n", "Node.js", "Python"],
        faqs: [
          {
            question: "Which workflows can AI automation handle?",
            answer:
              "Common workflows include lead routing, support replies, report generation, invoice extraction, CRM updates, onboarding, and data cleanup.",
          },
          {
            question: "Can automation work with human approvals?",
            answer:
              "Yes. We commonly design human review steps before sensitive updates, customer messages, or financial actions are completed.",
          },
        ],
      },
      {
        slug: "ai-chatbot-development",
        group: "AI & Intelligence",
        title: "AI Chatbot Development",
        shortTitle: "AI Chatbots",
        summary:
          "Custom chatbots and support assistants trained on your knowledge base, website, product docs, and business rules.",
        metaTitle: "AI Chatbot Development Services | AItouchSolutions",
        metaDescription:
          "Build custom AI chatbots for websites, SaaS apps, support teams, sales, onboarding, and knowledge-base search with AItouchSolutions.",
        keywords: [
          "AI chatbot development",
          "custom AI chatbot",
          "website chatbot development",
          "customer support chatbot",
          "RAG chatbot development",
          "ChatGPT chatbot for business",
          "AI chatbot company",
          "SaaS chatbot development",
          "knowledge base chatbot",
          "conversational AI development",
        ],
        searchIntents: [
          "Add an AI chatbot to a website or SaaS app",
          "Answer customer questions from company documents",
          "Build a support assistant with escalation paths",
        ],
        outcomes: [
          "Accurate answers grounded in your approved business content",
          "Lower support load with better first-response speed",
          "Escalation logic for sales, support, and operations teams",
        ],
        deliverables: [
          "Chatbot UX and conversation architecture",
          "Knowledge ingestion and retrieval system",
          "Admin analytics and conversation review",
          "Website, app, CRM, or helpdesk integration",
        ],
        process: [
          "Collect approved knowledge sources and support flows",
          "Build retrieval, guardrails, and escalation logic",
          "Design the chat experience for web or app users",
          "Test accuracy, launch, and improve from conversation data",
        ],
        techStack: ["OpenAI", "Vector databases", "React", "Node.js", "Supabase", "Zendesk"],
        faqs: [
          {
            question: "Can the chatbot use our private knowledge base?",
            answer:
              "Yes. We can connect approved documents, FAQs, product docs, websites, databases, or helpdesk content using retrieval-augmented generation.",
          },
          {
            question: "Can users speak to a human if needed?",
            answer:
              "Yes. We can add lead capture, ticket creation, live chat handoff, email alerts, or CRM routing.",
          },
        ],
      },
      {
        slug: "ai-saas-development",
        group: "AI & Intelligence",
        title: "AI SaaS Platform Development",
        shortTitle: "AI SaaS",
        summary:
          "End-to-end AI SaaS products with subscriptions, usage limits, billing, dashboards, AI workflows, and scalable infrastructure.",
        metaTitle: "AI SaaS Development Company | AItouchSolutions",
        metaDescription:
          "Launch an AI SaaS platform with AItouchSolutions. We build AI products with auth, billing, usage tracking, dashboards, APIs, and cloud deployment.",
        keywords: [
          "AI SaaS development",
          "AI SaaS development company",
          "build AI SaaS product",
          "AI startup development",
          "SaaS MVP development",
          "AI product development",
          "subscription SaaS development",
          "AI web app development",
          "OpenAI SaaS development",
          "custom AI platform",
        ],
        searchIntents: [
          "Build an AI SaaS MVP",
          "Launch an AI product with subscriptions",
          "Create a scalable AI platform for customers",
        ],
        outcomes: [
          "Production-ready AI SaaS with real customer onboarding",
          "Billing, plans, usage limits, analytics, and admin controls",
          "Scalable product foundation for growth and iteration",
        ],
        deliverables: [
          "SaaS architecture and product roadmap",
          "Frontend app, backend APIs, and database",
          "AI workflow integration and usage metering",
          "Deployment, analytics, and support handoff",
        ],
        process: [
          "Validate the product workflow and monetization model",
          "Build the MVP with core AI features and onboarding",
          "Add billing, usage tracking, admin tools, and security",
          "Deploy, test, and iterate from real customer feedback",
        ],
        techStack: ["React", "Next.js", "Node.js", "Stripe", "OpenAI", "PostgreSQL"],
        faqs: [
          {
            question: "Can you build the complete AI SaaS from idea to launch?",
            answer:
              "Yes. We can handle product planning, UX, frontend, backend, AI integration, billing, deployment, and post-launch improvements.",
          },
          {
            question: "Do you support usage-based billing?",
            answer:
              "Yes. We can add subscription plans, credits, token usage tracking, limits, invoices, and admin visibility.",
          },
        ],
      },
    ],
  },
  {
    label: "Product Engineering",
    slug: "product-engineering",
    description:
      "Custom web, mobile, SaaS, and internal software built for real business workflows and long-term maintainability.",
    services: [
      {
        slug: "custom-saas-development",
        group: "Product Engineering",
        title: "Custom SaaS Development",
        shortTitle: "Custom SaaS",
        summary:
          "Multi-tenant SaaS platforms, dashboards, admin panels, billing flows, APIs, and scalable cloud foundations.",
        metaTitle: "Custom SaaS Development Company | AItouchSolutions",
        metaDescription:
          "Build custom SaaS platforms with AItouchSolutions. We develop SaaS MVPs, multi-tenant apps, dashboards, APIs, billing, and cloud deployment.",
        keywords: [
          "custom SaaS development",
          "SaaS development company",
          "SaaS MVP development",
          "multi tenant SaaS development",
          "subscription platform development",
          "B2B SaaS development",
          "custom SaaS application",
          "SaaS product development",
          "SaaS app developers",
          "cloud SaaS development",
        ],
        searchIntents: [
          "Build a SaaS MVP",
          "Develop a custom subscription platform",
          "Scale a B2B SaaS application",
        ],
        outcomes: [
          "Scalable SaaS architecture ready for customer growth",
          "Reliable onboarding, roles, billing, and admin workflows",
          "Maintainable codebase with clear product modules",
        ],
        deliverables: [
          "Product roadmap, user roles, and feature architecture",
          "Frontend, backend, database, and API development",
          "Billing, authentication, and admin dashboards",
          "Cloud deployment, analytics, and maintenance plan",
        ],
        process: [
          "Define user journeys, subscription model, and MVP scope",
          "Design the data model and application architecture",
          "Build, test, and integrate core SaaS workflows",
          "Deploy and improve from usage analytics",
        ],
        techStack: ["React", "Next.js", "Node.js", "NestJS", "Stripe", "PostgreSQL"],
        faqs: [
          {
            question: "Can you build a SaaS MVP quickly?",
            answer:
              "Yes. We can scope and build focused SaaS MVPs with the essential workflows, billing, authentication, and admin controls needed for launch.",
          },
          {
            question: "Do you build multi-tenant SaaS platforms?",
            answer:
              "Yes. We design tenant isolation, permissions, billing, data models, and scalable deployment patterns for B2B and B2C SaaS products.",
          },
        ],
      },
      {
        slug: "web-application-development",
        group: "Product Engineering",
        title: "Web Application Development",
        shortTitle: "Web Apps",
        summary:
          "Fast, secure, SEO-aware web applications with modern frontend, backend APIs, dashboards, and integrations.",
        metaTitle: "Web Application Development Company | AItouchSolutions",
        metaDescription:
          "AItouchSolutions builds custom web applications, React apps, dashboards, portals, admin panels, APIs, and full-stack business software.",
        keywords: [
          "web application development",
          "custom web app development",
          "React web app development",
          "full stack web development",
          "business web application",
          "web app development company",
          "dashboard development",
          "portal development",
          "admin panel development",
          "MERN stack development",
        ],
        searchIntents: [
          "Build a custom business web app",
          "Create a dashboard or customer portal",
          "Modernize an old web application",
        ],
        outcomes: [
          "Responsive web apps with fast UX and clear business workflows",
          "Secure backend APIs, role-based access, and database design",
          "Maintainable full-stack foundation for future features",
        ],
        deliverables: [
          "UX flows and responsive interface",
          "Frontend app and backend APIs",
          "Authentication, database, and integrations",
          "Deployment, QA, analytics, and support",
        ],
        process: [
          "Map product flows and technical requirements",
          "Design UI states, data structure, and API contracts",
          "Build and test the application in iterations",
          "Launch with performance, security, and monitoring checks",
        ],
        techStack: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "PostgreSQL"],
        faqs: [
          {
            question: "Do you build full-stack web applications?",
            answer:
              "Yes. We build frontend interfaces, backend APIs, databases, authentication, integrations, dashboards, and deployment pipelines.",
          },
          {
            question: "Can you improve an existing web app?",
            answer:
              "Yes. We can audit, refactor, redesign, optimize, or extend existing web applications without rebuilding everything from scratch.",
          },
        ],
      },
      {
        slug: "mobile-app-development",
        group: "Product Engineering",
        title: "Mobile App Development",
        shortTitle: "Mobile Apps",
        summary:
          "iOS, Android, React Native, and Flutter apps with clean UX, APIs, authentication, notifications, and analytics.",
        metaTitle: "Mobile App Development Services | AItouchSolutions",
        metaDescription:
          "Build iOS, Android, React Native, and Flutter mobile apps with AItouchSolutions. We create mobile products, APIs, dashboards, and app launches.",
        keywords: [
          "mobile app development",
          "iOS app development",
          "Android app development",
          "React Native app development",
          "Flutter app development",
          "custom mobile app",
          "mobile app development company",
          "startup app development",
          "business mobile app",
          "cross platform app development",
        ],
        searchIntents: [
          "Build a custom mobile app",
          "Launch an iOS and Android product",
          "Create a mobile app with backend APIs",
        ],
        outcomes: [
          "Polished mobile experience across iOS and Android",
          "Secure backend integration and user account workflows",
          "Launch-ready builds with analytics and app-store support",
        ],
        deliverables: [
          "Mobile UX and screen flows",
          "App development and API integration",
          "Push notifications, auth, payments, or maps as needed",
          "Testing, store deployment, and post-launch support",
        ],
        process: [
          "Define mobile user journeys and platform strategy",
          "Prototype key screens and backend contracts",
          "Build app modules with testing cycles",
          "Prepare production release and analytics",
        ],
        techStack: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Node.js"],
        faqs: [
          {
            question: "Should I choose React Native, Flutter, or native apps?",
            answer:
              "It depends on performance needs, budget, timeline, and platform-specific features. We recommend the stack after reviewing the product workflow.",
          },
          {
            question: "Can you build the backend for the app too?",
            answer:
              "Yes. We build mobile APIs, databases, admin dashboards, authentication, notifications, and integrations.",
          },
        ],
      },
      {
        slug: "mvp-development",
        group: "Product Engineering",
        title: "MVP Development",
        shortTitle: "MVPs",
        summary:
          "Focused MVP planning, design, engineering, and launch support for startups and teams validating new products.",
        metaTitle: "MVP Development Services for Startups | AItouchSolutions",
        metaDescription:
          "Launch a production-ready MVP with AItouchSolutions. We build SaaS MVPs, AI MVPs, web apps, mobile apps, dashboards, and startup products.",
        keywords: [
          "MVP development",
          "startup MVP development",
          "SaaS MVP development",
          "AI MVP development",
          "MVP development company",
          "build MVP app",
          "startup product development",
          "prototype to MVP",
          "MVP web app development",
          "MVP mobile app development",
        ],
        searchIntents: [
          "Build a startup MVP",
          "Validate an AI or SaaS product idea",
          "Launch a first version fast",
        ],
        outcomes: [
          "A focused first version that customers can actually use",
          "Clear scope, launch path, and product learning loops",
          "Codebase that can evolve beyond the MVP stage",
        ],
        deliverables: [
          "MVP roadmap and feature prioritization",
          "UX design and core product workflows",
          "Frontend, backend, database, and integrations",
          "Launch checklist, analytics, and iteration plan",
        ],
        process: [
          "Prioritize the smallest useful product",
          "Design flows that validate the key business assumption",
          "Build and test in short delivery cycles",
          "Launch, measure, and plan the next release",
        ],
        techStack: ["React", "Next.js", "Node.js", "Supabase", "Stripe", "OpenAI"],
        faqs: [
          {
            question: "How much should an MVP include?",
            answer:
              "An MVP should include only the workflows needed to validate demand, onboard real users, and learn what to build next.",
          },
          {
            question: "Can the MVP become the final product?",
            answer:
              "Yes, if it is engineered cleanly. We build MVPs with enough structure to support iteration instead of throwaway prototypes.",
          },
        ],
      },
    ],
  },
  {
    label: "Commerce & Business Systems",
    slug: "commerce-business-systems",
    description:
      "E-commerce, CMS, CRM, ERP, and dashboard systems that connect operations, customers, payments, and reporting.",
    services: [
      {
        slug: "ecommerce-development",
        group: "Commerce & Business Systems",
        title: "E-commerce Development",
        shortTitle: "E-commerce",
        summary:
          "Custom online stores, Shopify builds, checkout flows, product catalogs, inventory logic, and commerce integrations.",
        metaTitle: "E-commerce Development Services | AItouchSolutions",
        metaDescription:
          "Build e-commerce websites, Shopify stores, custom storefronts, payment integrations, product catalogs, and commerce dashboards with AItouchSolutions.",
        keywords: [
          "ecommerce development",
          "ecommerce website development",
          "Shopify development",
          "custom ecommerce development",
          "online store development",
          "commerce platform development",
          "payment integration services",
          "product catalog development",
          "headless ecommerce",
          "ecommerce app development",
        ],
        searchIntents: [
          "Build an online store",
          "Create a custom Shopify or headless commerce platform",
          "Integrate payments, inventory, and orders",
        ],
        outcomes: [
          "Fast online buying experience for customers",
          "Manageable products, orders, payments, and inventory",
          "Connected commerce operations with reporting visibility",
        ],
        deliverables: [
          "Storefront design and product catalog",
          "Checkout, payments, shipping, and order workflows",
          "Admin tools, integrations, and analytics",
          "Performance, SEO, and launch support",
        ],
        process: [
          "Define catalog, checkout, and operations requirements",
          "Design the commerce experience and data model",
          "Build storefront, admin, and integrations",
          "Launch with tracking, QA, and conversion checks",
        ],
        techStack: ["Shopify", "Next.js", "Stripe", "WooCommerce", "Node.js", "PostgreSQL"],
        faqs: [
          {
            question: "Do you build Shopify stores?",
            answer:
              "Yes. We build Shopify themes, custom storefronts, apps, integrations, and headless commerce experiences.",
          },
          {
            question: "Can you build custom e-commerce features?",
            answer:
              "Yes. We can build custom checkout logic, product rules, subscriptions, dashboards, inventory flows, and integrations.",
          },
        ],
      },
      {
        slug: "crm-erp-development",
        group: "Commerce & Business Systems",
        title: "CRM & ERP Development",
        shortTitle: "CRM / ERP",
        summary:
          "Custom CRM, ERP, internal tools, workflow dashboards, role-based portals, reporting, and business management systems.",
        metaTitle: "Custom CRM & ERP Development Company | AItouchSolutions",
        metaDescription:
          "Build custom CRM, ERP, internal dashboards, workflow systems, admin portals, reporting tools, and business automation software.",
        keywords: [
          "custom CRM development",
          "ERP software development",
          "CRM ERP development company",
          "internal tool development",
          "business management software",
          "admin dashboard development",
          "workflow management system",
          "custom business software",
          "operations dashboard",
          "CRM integration services",
        ],
        searchIntents: [
          "Build a custom CRM",
          "Create ERP workflows for operations",
          "Replace spreadsheets with internal software",
        ],
        outcomes: [
          "Centralized operations, customer, sales, and reporting workflows",
          "Role-based dashboards for teams and managers",
          "Reduced spreadsheet dependency and manual coordination",
        ],
        deliverables: [
          "CRM/ERP module plan and data model",
          "Dashboards, forms, approvals, and reports",
          "Role permissions, imports, and integrations",
          "Deployment, training, and support plan",
        ],
        process: [
          "Map existing business processes and data sources",
          "Design modules, permissions, and reporting views",
          "Build the system in phased releases",
          "Migrate data, train users, and improve workflows",
        ],
        techStack: ["React", "Node.js", "PostgreSQL", "MongoDB", "Supabase", "Power BI"],
        faqs: [
          {
            question: "Can you replace spreadsheet-based operations?",
            answer:
              "Yes. We can turn spreadsheet workflows into secure dashboards, forms, approvals, reports, and automated processes.",
          },
          {
            question: "Can CRM or ERP integrate with existing tools?",
            answer:
              "Yes. We can connect email, accounting, payment, inventory, sales, support, and analytics systems through APIs.",
          },
        ],
      },
      {
        slug: "data-dashboard-development",
        group: "Commerce & Business Systems",
        title: "Data Dashboard Development",
        shortTitle: "Dashboards",
        summary:
          "Custom analytics dashboards, KPI portals, data pipelines, reporting tools, and business intelligence interfaces.",
        metaTitle: "Data Dashboard Development Services | AItouchSolutions",
        metaDescription:
          "Create custom dashboards, KPI reporting portals, analytics tools, business intelligence apps, and data visualization systems.",
        keywords: [
          "dashboard development",
          "data dashboard development",
          "custom analytics dashboard",
          "business intelligence dashboard",
          "KPI dashboard development",
          "reporting dashboard",
          "data visualization services",
          "admin dashboard development",
          "analytics portal development",
          "BI dashboard development",
        ],
        searchIntents: [
          "Build a custom analytics dashboard",
          "Create KPI reporting for business teams",
          "Connect multiple data sources into one view",
        ],
        outcomes: [
          "Clear visibility into KPIs, customers, operations, and revenue",
          "Automated reporting instead of manual spreadsheet updates",
          "Decision-ready dashboards for teams and executives",
        ],
        deliverables: [
          "Dashboard UX and metrics model",
          "Data connectors, pipelines, and transformations",
          "Charts, filters, exports, and role access",
          "Deployment, documentation, and maintenance",
        ],
        process: [
          "Define business metrics and data sources",
          "Model the data and dashboard hierarchy",
          "Build charts, filters, exports, and permissions",
          "Validate data accuracy and launch reporting workflows",
        ],
        techStack: ["React", "Recharts", "PostgreSQL", "BigQuery", "Power BI", "Python"],
        faqs: [
          {
            question: "Can dashboards connect to multiple tools?",
            answer:
              "Yes. We can connect databases, CRMs, spreadsheets, payment platforms, analytics tools, and custom APIs.",
          },
          {
            question: "Can users export reports?",
            answer:
              "Yes. We can add CSV, PDF, scheduled email reports, filters, saved views, and admin-level controls.",
          },
        ],
      },
    ],
  },
  {
    label: "Cloud & Operations",
    slug: "cloud-operations",
    description:
      "Cloud deployment, DevOps automation, cybersecurity, maintenance, and dedicated development capacity.",
    services: [
      {
        slug: "cloud-devops-services",
        group: "Cloud & Operations",
        title: "Cloud & DevOps Services",
        shortTitle: "Cloud & DevOps",
        summary:
          "Cloud deployment, CI/CD, containers, monitoring, release automation, infrastructure hardening, and DevOps support.",
        metaTitle: "Cloud & DevOps Services | AItouchSolutions",
        metaDescription:
          "AItouchSolutions provides cloud deployment, DevOps, CI/CD pipelines, Docker, Kubernetes, AWS, GCP, Azure, Vercel, and monitoring services.",
        keywords: [
          "cloud deployment services",
          "DevOps services",
          "CI CD pipeline setup",
          "Docker deployment",
          "Kubernetes deployment",
          "AWS deployment services",
          "GCP deployment services",
          "Azure DevOps services",
          "Vercel deployment",
          "cloud infrastructure support",
        ],
        searchIntents: [
          "Deploy a web app or SaaS product",
          "Set up CI/CD and monitoring",
          "Improve cloud reliability and release process",
        ],
        outcomes: [
          "Reliable deployments with clear release pipelines",
          "Better uptime, observability, and rollback confidence",
          "Infrastructure aligned with product scale and budget",
        ],
        deliverables: [
          "Cloud architecture and deployment plan",
          "CI/CD pipeline, environments, and secrets setup",
          "Monitoring, logging, alerts, and backup workflows",
          "Security hardening and documentation",
        ],
        process: [
          "Audit current hosting, release flow, and reliability risks",
          "Design environments, pipelines, and infrastructure",
          "Deploy with monitoring, secrets, and rollback strategy",
          "Document and support ongoing operations",
        ],
        techStack: ["AWS", "GCP", "Azure", "Docker", "Kubernetes", "GitHub Actions"],
        faqs: [
          {
            question: "Can you deploy existing applications?",
            answer:
              "Yes. We can deploy existing apps to AWS, GCP, Azure, Vercel, Cloudflare, VPS, or container-based infrastructure.",
          },
          {
            question: "Do you set up monitoring and alerts?",
            answer:
              "Yes. We can configure logs, uptime checks, error reporting, alerts, backups, and deployment visibility.",
          },
        ],
      },
      {
        slug: "cybersecurity-services",
        group: "Cloud & Operations",
        title: "Cybersecurity Services",
        shortTitle: "Cybersecurity",
        summary:
          "Security audits, application hardening, authentication reviews, access control, vulnerability fixes, and safer deployments.",
        metaTitle: "Cybersecurity Services for Web Apps & SaaS | AItouchSolutions",
        metaDescription:
          "Improve web app, SaaS, API, and cloud security with AItouchSolutions. We provide audits, hardening, vulnerability fixes, and access control.",
        keywords: [
          "cybersecurity services",
          "web application security",
          "SaaS security audit",
          "API security testing",
          "cloud security hardening",
          "application security services",
          "security audit company",
          "vulnerability assessment",
          "authentication security",
          "secure software development",
        ],
        searchIntents: [
          "Audit web app security",
          "Fix vulnerabilities in a SaaS platform",
          "Harden cloud and API access",
        ],
        outcomes: [
          "Reduced risk across authentication, APIs, data, and deployments",
          "Clear remediation plan for vulnerabilities and misconfigurations",
          "Safer release practices for product teams",
        ],
        deliverables: [
          "Security audit and risk report",
          "Authentication, authorization, and API review",
          "Vulnerability fixes and hardening tasks",
          "Security checklist and monitoring recommendations",
        ],
        process: [
          "Review app architecture, access, and sensitive workflows",
          "Test common web, API, and cloud security risks",
          "Prioritize and fix vulnerabilities",
          "Document secure practices for future development",
        ],
        techStack: ["OWASP", "Cloudflare", "AWS", "Node.js", "React", "PostgreSQL"],
        faqs: [
          {
            question: "Do you perform penetration testing?",
            answer:
              "We provide practical security audits, vulnerability assessment, and remediation. Formal penetration testing scope can be defined based on your compliance needs.",
          },
          {
            question: "Can you fix the issues found in an audit?",
            answer:
              "Yes. We can implement security fixes, improve access control, harden APIs, update dependencies, and improve deployment practices.",
          },
        ],
      },
      {
        slug: "dedicated-developers",
        group: "Cloud & Operations",
        title: "Dedicated Developers",
        shortTitle: "Dedicated Devs",
        summary:
          "Hire dedicated frontend, backend, MERN, mobile, AI, and DevOps developers for ongoing product delivery.",
        metaTitle: "Hire Dedicated Developers | AItouchSolutions",
        metaDescription:
          "Hire dedicated developers from AItouchSolutions for MERN, React, Node.js, AI, mobile apps, SaaS, DevOps, maintenance, and product delivery.",
        keywords: [
          "hire dedicated developers",
          "dedicated MERN developers",
          "hire React developers",
          "hire Node.js developers",
          "hire AI developers",
          "dedicated software development team",
          "remote developers for hire",
          "SaaS developers for hire",
          "mobile app developers for hire",
          "full stack developers for hire",
        ],
        searchIntents: [
          "Hire a dedicated developer or team",
          "Extend an existing product team",
          "Get ongoing software maintenance and feature delivery",
        ],
        outcomes: [
          "Reliable engineering capacity without long hiring cycles",
          "Flexible frontend, backend, AI, mobile, or DevOps support",
          "Ongoing delivery aligned with your roadmap",
        ],
        deliverables: [
          "Dedicated developer allocation",
          "Sprint planning and delivery workflow",
          "Code reviews, documentation, and reporting",
          "Maintenance, feature development, and support",
        ],
        process: [
          "Define skills, workload, and delivery model",
          "Match the right developer capacity to your roadmap",
          "Start with onboarding, repo access, and delivery rhythm",
          "Track progress through tasks, demos, and reporting",
        ],
        techStack: ["React", "Node.js", "MERN", "Next.js", "React Native", "DevOps"],
        faqs: [
          {
            question: "Can we hire developers hourly or monthly?",
            answer:
              "Yes. We support flexible hourly, fixed-scope, and dedicated monthly development models depending on project needs.",
          },
          {
            question: "Can dedicated developers work with our existing team?",
            answer:
              "Yes. Developers can join your existing Git, project management, communication, and review workflows.",
          },
        ],
      },
      {
        slug: "maintenance-support",
        group: "Cloud & Operations",
        title: "Maintenance & Support",
        shortTitle: "Support",
        summary:
          "Ongoing website, web app, SaaS, mobile app, cloud, bug fixing, performance, and feature support.",
        metaTitle: "Software Maintenance & Support Services | AItouchSolutions",
        metaDescription:
          "Get software maintenance, bug fixes, performance optimization, cloud support, website support, SaaS support, and app improvements.",
        keywords: [
          "software maintenance services",
          "website maintenance",
          "SaaS maintenance",
          "web app support",
          "bug fixing services",
          "application support services",
          "performance optimization",
          "cloud support services",
          "ongoing development support",
          "technical support for software",
        ],
        searchIntents: [
          "Maintain an existing website or app",
          "Fix bugs and improve performance",
          "Get ongoing technical support",
        ],
        outcomes: [
          "More stable application with fewer recurring issues",
          "Faster bug fixes, small improvements, and release support",
          "Clear maintenance process for business-critical software",
        ],
        deliverables: [
          "Bug fixes and dependency updates",
          "Performance and reliability improvements",
          "Monitoring, backups, and release support",
          "Small features and technical improvements",
        ],
        process: [
          "Audit current app, hosting, and priority issues",
          "Create a maintenance backlog and response plan",
          "Fix urgent problems and stabilize releases",
          "Support continuous improvements over time",
        ],
        techStack: ["React", "Node.js", "WordPress", "Shopify", "AWS", "Cloudflare"],
        faqs: [
          {
            question: "Can you maintain software you did not build?",
            answer:
              "Yes. We can audit the existing codebase, document risks, fix bugs, and create a safe maintenance plan.",
          },
          {
            question: "Do you support emergency fixes?",
            answer:
              "Yes. Emergency support can be scoped for production outages, broken checkout flows, critical bugs, and security issues.",
          },
        ],
      },
    ],
  },
];

export const serviceLandingPages = serviceGroups.flatMap((group) => group.services);

export const serviceSitemapRoutes = serviceLandingPages.map((service) => ({
  path: `/services/${service.slug}`,
  changefreq: "monthly",
  priority: "0.86",
}));

export const organicServiceKeywords = Array.from(
  new Set(serviceLandingPages.flatMap((service) => service.keywords)),
);

export function getServiceLandingPage(slug: string) {
  return serviceLandingPages.find((service) => service.slug === slug);
}

export function getRelatedServiceLandingPages(service: ServiceLandingPage, limit = 3) {
  const sameGroup = serviceLandingPages.filter(
    (item) => item.slug !== service.slug && item.group === service.group,
  );
  const fallback = serviceLandingPages.filter(
    (item) => item.slug !== service.slug && item.group !== service.group,
  );

  return [...sameGroup, ...fallback].slice(0, limit);
}
