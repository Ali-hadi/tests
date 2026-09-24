import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig } from "@/lib/seo";

type Msg = { role: "user" | "assistant"; text: string };

const welcomeMessages = [
  "Hi, I’m Jarvis, AiTouchSolutions’ AI assistant. Ask about our services, pricing approach, or how we build products.",
  "Welcome. I’m Jarvis, the AiTouchSolutions AI assistant. What are you hoping to build?",
  "Hello, I’m Jarvis. I can explain AiTouchSolutions’ services and project process. What would you like to know?",
];

export function Jarvis() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", text: welcomeMessages[0] },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async (text: string) => {
    const question = text.trim();
    if (!question || loading) return;
    const nextMessages: Msg[] = [...messages, { role: "user", text: question }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    try {
      const response = await fetch("/api/jarvis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.slice(-10).map(({ role, text: content }) => ({ role, content })),
        }),
      });
      const result = (await response.json()) as { answer?: string; error?: string };
      if (!response.ok || !result.answer) {
        throw new Error(result.error || "The assistant is unavailable.");
      }
      setMessages((current) => [...current, { role: "assistant", text: result.answer! }]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: "I’m unable to answer with the AI assistant right now. You can contact us directly on WhatsApp or email, and include your question or project details.",
        },
      ]);
    } finally {
      setLoading(false);
    }
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
                    AI assistant
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close Jarvis"
                className="text-muted-foreground hover:text-foreground text-xl leading-none"
              >
                ×
              </button>
            </div>
            <div
              className="flex-1 overflow-y-auto p-5 space-y-3 min-h-[300px] max-h-[360px]"
              aria-live="polite"
              aria-busy={loading}
            >
              {messages.map((message, index) => (
                <div
                  key={`${index}-${message.role}`}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      message.role === "user"
                        ? "bg-teal text-ink rounded-br-sm"
                        : "bg-ink-2 text-foreground rounded-bl-sm border border-border"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {loading && (
                <p className="text-xs text-muted-foreground" role="status">
                  Jarvis is thinking…
                </p>
              )}
            </div>
            <div className="px-5 pb-3 flex gap-2 flex-wrap">
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 bg-orange/10 text-orange border border-orange/30 rounded-full hover:bg-orange hover:text-ink"
              >
                WhatsApp us
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 bg-teal/10 text-teal border border-teal/30 rounded-full hover:bg-teal hover:text-ink"
              >
                Email us
              </a>
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                void send(input);
              }}
              className="border-t border-border p-3 flex gap-2 bg-ink/60"
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                maxLength={1500}
                disabled={loading}
                placeholder="Ask Jarvis about our services…"
                aria-label="Ask Jarvis a question"
                className="flex-1 bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="px-4 py-2 bg-teal text-ink rounded-lg text-xs font-bold uppercase tracking-widest disabled:opacity-50"
              >
                {loading ? "…" : "Send"}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close Jarvis AI assistant" : "Open Jarvis AI assistant"}
        className="fixed bottom-6 right-4 sm:right-8 z-[100] group"
      >
        <span className="absolute inset-0 rounded-full bg-teal blur-2xl opacity-40 group-hover:opacity-70 transition-opacity" />
        <span className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-teal to-orange p-[2px] hover:scale-105 active:scale-95 transition-transform">
          <span className="w-full h-full rounded-full bg-ink grid place-items-center">
            <span className="font-display font-bold text-sm text-foreground">
              {open ? "×" : "Jarvis"}
            </span>
          </span>
        </span>
      </button>
    </>
  );
}
