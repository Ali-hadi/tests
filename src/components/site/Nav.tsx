import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/logo-white.png";

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

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-ink/70 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-16 lg:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="AItouchSolutions" className="h-7 lg:h-8 w-auto" />
        </Link>
        <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium text-muted-foreground">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="hover:text-foreground transition-colors relative py-2"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
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
            className="lg:hidden w-10 h-10 grid place-items-center rounded-full border border-border"
            aria-label="Menu"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block w-4 h-px bg-foreground transition-transform ${open ? "rotate-45 translate-y-[3px]" : ""}`}
              />
              <span
                className={`block w-4 h-px bg-foreground transition-transform ${open ? "-rotate-45 -translate-y-[3px]" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden bg-ink/95 backdrop-blur-xl border-t border-border px-6 py-8 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="font-display text-2xl text-foreground hover:text-teal"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
