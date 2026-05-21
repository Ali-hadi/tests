import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — AItouchSolutions" },
      { name: "description", content: "Start a conversation with AItouchSolutions. Tell us about your project — we respond within 24 hours, globally." },
      { property: "og:title", content: "Contact — AItouchSolutions" },
      { property: "og:description", content: "Tell us about your project. We respond within 24 hours." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <section className="pt-40 lg:pt-52 pb-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-teal mb-8">Contact</p>
            <h1 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl tracking-[-0.04em] leading-[0.9]">
              Let's build <br/><span className="gradient-text">something intelligent.</span>
            </h1>
            <p className="mt-10 max-w-xl text-lg text-muted-foreground leading-relaxed">
              Tell us about your project. We respond within 24 hours, globally.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <Reveal className="lg:col-span-7">
            {sent ? (
              <div className="glass rounded-2xl p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-teal/20 grid place-items-center mx-auto mb-6">
                  <span className="text-3xl text-teal">✓</span>
                </div>
                <h2 className="font-display text-3xl font-bold mb-4">Message received.</h2>
                <p className="text-muted-foreground">Shahzad's team will respond within 24 hours.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label="Name" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label="Phone / WhatsApp" name="phone" />
                  <Field label="Country" name="country" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label="Service needed" name="service" placeholder="AI Agent, Web App…" />
                  <Field label="Budget range" name="budget" placeholder="$5k — $50k" />
                </div>
                <div className="border-b border-border pb-6">
                  <label className="block font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Engagement</label>
                  <div className="flex gap-3">
                    {["Fixed-price", "Hourly", "Not sure yet"].map((o) => (
                      <label key={o} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="model" className="accent-teal" />
                        <span className="text-sm">{o}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Message</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell us what you're building…"
                    className="w-full bg-transparent border-b border-border focus:border-teal py-3 outline-none text-foreground placeholder:text-muted-foreground/50 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-teal text-ink rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-teal-glow transition-all"
                >
                  Send message →
                </button>
              </form>
            )}
          </Reveal>

          <Reveal className="lg:col-span-5 lg:pl-10 space-y-12">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-teal mb-4">Direct</p>
              <a href="mailto:hello@aitouchsolutions.com" className="font-display text-2xl lg:text-3xl block hover:text-teal break-all">hello@aitouchsolutions.com</a>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-teal mb-4">Operations</p>
              <p className="text-muted-foreground leading-relaxed">24/7 global delivery <br/>Fixed-price · Hourly · Dedicated</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-teal mb-4">Or talk to Jarvis</p>
              <p className="text-muted-foreground leading-relaxed">Our AI assistant is in the bottom-right. Ask about services, pricing, and the process.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div className="border-b border-border pb-2 focus-within:border-teal transition-colors">
      <label className="block font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full bg-transparent py-2 outline-none text-foreground placeholder:text-muted-foreground/50"
      />
    </div>
  );
}
