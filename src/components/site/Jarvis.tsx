import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type Msg = { role: "user" | "jarvis"; text: string };

const knowledge: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["price", "pricing", "cost", "rate", "hourly", "fixed"],
    answer:
      "We offer both fixed-price project quotes and hourly engagements starting at $45/hr. For a tailored quote, share your project type and budget on the Contact page or request a quote here.",
  },
  {
    keywords: ["service", "what do you do", "offer"],
    answer:
      "We deliver AI Agents, AI Automation, Custom SaaS, Web & Mobile apps, CRM/ERP systems, and Cloud/DevOps — globally, 24/7. See our Services page for the full list.",
  },
  {
    keywords: ["ai", "agent", "automation", "chatbot", "llm"],
    answer:
      "We build production AI agents (LangChain, RAG, custom tools), workflow automation, and custom-trained LLMs on your data. Want to scope an AI project?",
  },
  {
    keywords: ["tech", "stack", "technology", "use"],
    answer:
      "We work across 100+ technologies — Next.js, React, Node, Python, Go, Postgres, MongoDB, AWS, OpenAI, LangChain, and more. See the Technologies page.",
  },
  {
    keywords: ["contact", "talk", "call", "consult", "book"],
    answer:
      "Easiest path: book a consultation via the Contact page or click 'Request Quote' below — Shahzad's team replies within 24h.",
  },
  {
    keywords: ["who", "founder", "shahzad"],
    answer:
      "AItouchSolutions was founded by Shahzad Nazar — a senior engineer building intelligent software for global clients.",
  },
  {
    keywords: ["portfolio", "project", "case", "work"],
    answer:
      "We've delivered AI dashboards, automation platforms, and custom mobile apps. See live case studies on the Portfolio page.",
  },
];

function answerFor(text: string): string {
  const lower = text.toLowerCase();
  for (const item of knowledge) {
    if (item.keywords.some((k) => lower.includes(k))) return item.answer;
  }
  return "I don't have that exact answer yet — but Shahzad's team can help. Tap Request Quote below or visit /contact and we'll get back within 24 hours.";
}

export function Jarvis() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "jarvis",
      text: "Hello, I'm Jarvis — AItouchSolutions' AI assistant. Ask me about services, pricing, AI agents, or our process.",
    },
  ]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMessages((m) => [...m, { role: "user", text: t }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { role: "jarvis", text: answerFor(t) }]);
    }, 450);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-24 right-4 sm:right-8 z-[100] w-[calc(100vw-2rem)] sm:w-[400px] max-h-[600px] flex flex-col glass rounded-2xl shadow-2xl overflow-hidden"
            style={{
              boxShadow:
                "0 30px 80px -20px rgba(0,0,0,0.6), 0 0 60px -10px color-mix(in oklab, var(--color-teal) 30%, transparent)",
            }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-ink/60">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-teal to-orange grid place-items-center">
                  <div className="w-3 h-3 bg-ink rounded-full" />
                  <span className="absolute inset-0 rounded-full ring-2 ring-teal/40 animate-pulse-glow" />
                </div>
                <div>
                  <p className="font-display text-sm font-bold">JARVIS</p>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-teal">
                    Online · AI Assistant
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-foreground text-xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-3 min-h-[300px] max-h-[360px]">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-teal text-ink rounded-br-sm"
                        : "bg-ink-2 text-foreground rounded-bl-sm border border-border"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 pb-3 flex gap-2 flex-wrap">
              <a
                href="/contact"
                className="text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 bg-orange/10 text-orange border border-orange/30 rounded-full hover:bg-orange hover:text-ink"
              >
                Request Quote
              </a>
              <a
                href="/contact"
                className="text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 bg-teal/10 text-teal border border-teal/30 rounded-full hover:bg-teal hover:text-ink"
              >
                Book Consultation
              </a>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="border-t border-border p-3 flex gap-2 bg-ink/60"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Jarvis anything…"
                className="flex-1 bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-teal text-ink rounded-lg text-xs font-bold uppercase tracking-widest"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Open Jarvis AI"
        className="fixed bottom-6 right-4 sm:right-8 z-[100] group"
      >
        <span className="absolute inset-0 rounded-full bg-teal blur-2xl opacity-40 group-hover:opacity-70 transition-opacity" />
        <span className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-teal to-orange p-[2px] hover:scale-105 active:scale-95 transition-transform">
          <span className="w-full h-full rounded-full bg-ink grid place-items-center">
            <span className="font-display font-bold text-sm text-foreground">
              {open ? "—" : "AI"}
            </span>
          </span>
        </span>
      </button>
    </>
  );
}
