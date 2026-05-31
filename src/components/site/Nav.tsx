import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import logoDark from "@/assets/logo-dark.png";
import logoWhite from "@/assets/logo-white.png";

const links = [
  { to: "/services", label: "Services" },
  { to: "/ai-solutions", label: "AI Solutions" },
  { to: "/tools", label: "Tools" },
  { to: "/technologies", label: "Technologies" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/pricing", label: "Pricing" },
  { to: "/blog", label: "Blog News" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

const toolLinks = [
  { to: "/tools/ai-detector", label: "AI Detector" },
  { to: "/tools/ai-humanizer", label: "AI Humanizer" },
  { to: "/tools/resume-builder", label: "Resume Builder" },
  { to: "/tools/thumbnail-generator", label: "Thumbnail Generator" },
  { to: "/tools/proposal-generator", label: "Proposal Generator" },
  { to: "/tools/website-generator", label: "Website Generator" },
  { to: "/tools/caption-generator", label: "Caption Generator" },
  { to: "/tools/domain-generator", label: "Domain Generator" },
  { to: "/tools/portfolio-builder", label: "Portfolio Builder" },
  { to: "/tools/chatbot-saas", label: "Chatbot SaaS" },
] as const;

export function Nav() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isLightHeader = pathname === "/tools/ai-detector";

  const headerClass = isLightHeader
    ? "bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_18px_60px_-52px_rgba(15,23,42,0.45)]"
    : scrolled
      ? "bg-ink/70 backdrop-blur-xl border-b border-border"
      : "bg-transparent";
  const logo = isLightHeader ? logoDark : logoWhite;
  const navBaseClass = isLightHeader ? "text-slate-600" : "text-muted-foreground";
  const navHoverClass = isLightHeader ? "hover:text-slate-950" : "hover:text-foreground";
  const navActiveClass = isLightHeader ? "text-slate-950" : "text-foreground";
  const dropdownClass = isLightHeader
    ? "border-slate-200 bg-white/98 text-slate-950 shadow-[0_24px_80px_-45px_rgba(15,23,42,0.45)]"
    : "border-border bg-ink/95 text-foreground shadow-2xl";
  const dropdownLinkClass = isLightHeader
    ? "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
    : "text-muted-foreground hover:bg-foreground/10 hover:text-foreground";
  const mobileMenuClass = isLightHeader
    ? "bg-white/98 border-slate-200 text-slate-950"
    : "bg-ink/95 border-border text-foreground";
  const mobileIconClass = isLightHeader ? "bg-slate-950" : "bg-foreground";
  const mobileButtonClass = isLightHeader
    ? "border-slate-200 text-slate-950"
    : "border-border text-foreground";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${headerClass}`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-16 lg:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="AItouchSolutions" className="h-7 lg:h-8 w-auto" />
        </Link>
        <nav className={`hidden lg:flex items-center gap-8 text-[13px] font-medium ${navBaseClass}`}>
          {links.map((l) =>
            l.to === "/tools" ? (
              <div key={l.to} className="group relative">
                <Link
                  to="/tools"
                  className={`relative inline-flex items-center gap-1.5 py-2 transition-colors ${navHoverClass}`}
                  activeProps={{ className: navActiveClass }}
                >
                  Tools
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                </Link>
                <div
                  className={`invisible absolute left-1/2 top-full z-50 w-[520px] -translate-x-1/2 translate-y-3 rounded-lg border p-3 opacity-0 backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:translate-y-1 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-1 group-focus-within:opacity-100 ${dropdownClass}`}
                >
                  <div className="grid grid-cols-2 gap-2">
                    {toolLinks.map((tool) => (
                      <Link
                        key={tool.to}
                        to={tool.to}
                        className={`rounded-md px-3 py-2.5 text-sm font-semibold transition-colors ${dropdownLinkClass}`}
                        activeProps={{
                          className: "bg-teal/10 text-teal",
                        }}
                      >
                        {tool.label}
                      </Link>
                    ))}
                  </div>
                  <Link
                    to="/tools"
                    className={`mt-2 flex rounded-md border px-3 py-2.5 text-xs font-bold uppercase tracking-[0.16em] transition-colors ${
                      isLightHeader
                        ? "border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    View all tools
                  </Link>
                </div>
              </div>
            ) : (
              <Link
                key={l.to}
                to={l.to}
                className={`transition-colors relative py-2 ${navHoverClass}`}
                activeProps={{ className: navActiveClass }}
              >
                {l.label}
              </Link>
            ),
          )}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-teal text-ink rounded-full text-[12px] font-bold uppercase tracking-widest hover:bg-teal-glow transition-all"
          >
            Start Project
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className={`lg:hidden w-10 h-10 grid place-items-center rounded-full border ${mobileButtonClass}`}
            aria-label="Menu"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block w-4 h-px transition-transform ${mobileIconClass} ${open ? "rotate-45 translate-y-[3px]" : ""}`}
              />
              <span
                className={`block w-4 h-px transition-transform ${mobileIconClass} ${open ? "-rotate-45 -translate-y-[3px]" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>
      {open && (
        <div
          className={`lg:hidden backdrop-blur-xl border-t px-6 py-8 flex flex-col gap-4 ${mobileMenuClass}`}
        >
          {links.map((l) =>
            l.to === "/tools" ? (
              <div key={l.to}>
                <Link
                  to="/tools"
                  onClick={() => setOpen(false)}
                  className="font-display text-2xl hover:text-teal"
                >
                  Tools
                </Link>
                <div className="mt-4 grid gap-2 pl-3">
                  {toolLinks.map((tool) => (
                    <Link
                      key={tool.to}
                      to={tool.to}
                      onClick={() => setOpen(false)}
                      className={`rounded-md py-1.5 text-sm font-semibold hover:text-teal ${
                        isLightHeader ? "text-slate-600" : "text-muted-foreground"
                      }`}
                    >
                      {tool.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="font-display text-2xl hover:text-teal"
              >
                {l.label}
              </Link>
            ),
          )}
        </div>
      )}
    </header>
  );
}
