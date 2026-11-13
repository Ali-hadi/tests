import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { createSeo, siteConfig } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>) => ({
    service: typeof search.service === "string" ? search.service.slice(0, 80) : "",
    project: typeof search.project === "string" ? search.project.slice(0, 100) : "",
  }),
  head: () =>
    createSeo({
      title: "Contact Jon | AiTouchSolutions",
      description:
        "Contact Jon and AiTouchSolutions for AI agents, automation, SaaS, web apps, and mobile apps. Email or WhatsApp for a project quote.",
      path: "/contact",
      keywords: [
        "contact AiTouchSolutions",
        "hire Jon",
        "AI project quote",
        "WhatsApp software developer",
      ],
    }),
  component: ContactPage,
});

function ContactPage() {
  const { service, project } = Route.useSearch();
  const projectContext = project ? `I would like to discuss a product similar to ${project}.` : "";
  const [submitted, setSubmitted] = useState<{ method: string; message: string } | null>(null);
  const [copied, setCopied] = useState(false);

  return (
    <>
      <section className="pt-40 lg:pt-52 pb-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-teal mb-8">
              Contact
            </p>
            <h1 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl tracking-[-0.04em] leading-[0.9]">
              Let's build <br />
              <span className="gradient-text">something intelligent.</span>
            </h1>
            <p className="mt-10 max-w-xl text-lg text-muted-foreground leading-relaxed">
              Tell us about the problem you want to solve, the people who will use the product, and
              any systems or deadlines we should understand.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <Reveal className="lg:col-span-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const data = new FormData(form);
                const body = Array.from(data.entries())
                  .filter(([, value]) => String(value).trim())
                  .map(([key, value]) => `${key}: ${String(value).trim()}`)
                  .join("\n");
                const message = `Project inquiry: ${String(data.get("service") || "New project")}\n\n${body}`;
                // This form does not send anything itself: there is no
                // server endpoint for it. It only opens the visitor's own
                // email app or WhatsApp with the message pre-filled, so the
                // visitor must press Send there. "Either" uses email, the
                // primary contact method, instead of silently picking one.
                const method = data.get("preferredContact") === "WhatsApp" ? "WhatsApp" : "Email";
                setSubmitted({ method, message });
                setCopied(false);
                void navigator.clipboard?.writeText(message).catch(() => undefined);
                if (method === "Email") {
                  const subject = encodeURIComponent(
                    `Project inquiry: ${String(data.get("service") || "New project")}`,
                  );
                  window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${encodeURIComponent(message)}`;
                  return;
                }
                window.location.href = `${siteConfig.whatsappUrl}?text=${encodeURIComponent(message)}`;
              }}
              aria-label="Project inquiry form"
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Name" name="name" required />
                <Field label="Email" name="email" type="email" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Company" name="company" />
                <Field label="Country" name="country" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectField
                  label="Service needed"
                  name="service"
                  options={[
                    "AI Development",
                    "AI Automation",
                    "AI Agent",
                    "Chatbot",
                    "RAG",
                    "Web Application",
                    "Mobile App",
                    "CRM",
                    "ERP",
                    "POS",
                    "Shopify",
                    "WooCommerce",
                    "E-commerce",
                    "SaaS",
                    "Custom Software",
                    "Other",
                  ]}
                  defaultValue={service}
                />
                <SelectField
                  label="Project type"
                  name="projectType"
                  options={[
                    "New product",
                    "Existing product improvement",
                    "Integration",
                    "Automation",
                    "Not sure yet",
                  ]}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectField
                  label="Budget range"
                  name="budget"
                  options={[
                    "Not decided",
                    "Under $5,000",
                    "$5,000–$15,000",
                    "$15,000–$50,000",
                    "$50,000+",
                    "Prefer to discuss",
                  ]}
                />
                <Field label="Target timeline" name="timeline" placeholder="e.g. planning for Q1" />
              </div>
              <Field
                label="Existing website or app"
                name="existingProduct"
                type="url"
                placeholder="https://"
              />
              <SelectField
                label="Preferred contact method"
                name="preferredContact"
                options={["Email", "WhatsApp", "Either"]}
                defaultValue="Email"
              />
              <Field label="Phone or WhatsApp (optional)" name="phone" type="tel" />
              <div>
                <label
                  htmlFor="description"
                  className="block font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3"
                >
                  Message
                </label>
                <textarea
                  rows={5}
                  required
                  id="description"
                  name="description"
                  aria-label="Project description"
                  placeholder="What do you need to build? Include key features, users, integrations, and constraints."
                  defaultValue={projectContext}
                  className="w-full bg-transparent border-b border-border focus:border-teal py-3 outline-none text-foreground placeholder:text-muted-foreground/50 resize-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-3 px-8 py-4 bg-teal text-ink rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-teal-glow transition-all"
              >
                Continue to contact method
              </button>
              <p className="text-xs leading-relaxed text-muted-foreground">
                This opens your selected contact method with your project details filled in. Review
                the message and press Send in WhatsApp or your email app to contact us. Nothing is
                sent until you press Send there — choosing “Either” opens email.
              </p>
              {submitted ? (
                <div
                  role="status"
                  className="rounded-md border border-teal/40 bg-ink p-5 text-sm leading-relaxed"
                >
                  <p className="font-bold text-foreground">
                    Your message is ready in {submitted.method} — it has not been sent yet.
                  </p>
                  <p className="mt-2 text-muted-foreground">
                    Press Send in your {submitted.method === "Email" ? "email app" : "WhatsApp"} to
                    contact us. If the app did not open, copy the message below and send it to{" "}
                    {submitted.method === "Email" ? siteConfig.email : "us on WhatsApp"} manually.
                  </p>
                  <pre className="mt-4 max-h-48 overflow-auto whitespace-pre-wrap break-words rounded bg-background p-4 text-xs text-muted-foreground">
                    {submitted.message}
                  </pre>
                  <button
                    type="button"
                    onClick={() => {
                      void navigator.clipboard
                        ?.writeText(submitted.message)
                        .then(() => setCopied(true))
                        .catch(() => setCopied(false));
                    }}
                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-teal/40 px-5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-teal hover:bg-teal/10"
                  >
                    {copied ? "Copied" : "Copy message"}
                  </button>
                </div>
              ) : null}
            </form>
          </Reveal>

          <Reveal className="lg:col-span-5 lg:pl-10 space-y-12">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-teal mb-4">
                Email
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-display text-2xl lg:text-3xl block hover:text-teal break-all"
              >
                {siteConfig.email}
              </a>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-teal mb-4">
                WhatsApp
              </p>
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="font-display text-2xl lg:text-3xl block hover:text-teal"
              >
                Chat with us on WhatsApp
              </a>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-teal mb-4">
                LinkedIn
              </p>
              <a
                href={siteConfig.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="font-display text-2xl lg:text-3xl block hover:text-teal break-all"
              >
                {siteConfig.linkedinDisplay}
              </a>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-teal mb-4">
                Operations
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Remote project discussions <br />
                Fixed-price · Hourly · Dedicated
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-teal mb-4">
                Or talk to Jarvis
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our AI assistant is in the bottom-right. Ask about services, pricing, and the
                process.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="border-b border-border pb-2 focus-within:border-teal transition-colors">
      <label
        htmlFor={name}
        className="block font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2"
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full bg-transparent py-2 outline-none text-foreground placeholder:text-muted-foreground/50"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  defaultValue = "",
}: {
  label: string;
  name: string;
  options: string[];
  defaultValue?: string;
}) {
  return (
    <div className="border-b border-border pb-2 focus-within:border-teal transition-colors">
      <label
        htmlFor={name}
        className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        className="w-full bg-background py-2 text-foreground outline-none"
      >
        <option value="">Choose an option</option>
        {defaultValue && !options.includes(defaultValue) ? (
          <option value={defaultValue}>{defaultValue}</option>
        ) : null}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
