import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo-white.png";
import { siteConfig } from "@/lib/seo";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-ink overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <img src={logo} alt="AItouchSolutions" className="h-8 w-auto mb-8" />
            <h3 className="font-display text-3xl lg:text-5xl leading-[0.95] tracking-tight mb-8 max-w-md">
              Let's build the <span className="text-teal">intelligence layer</span> of your
              business.
            </h3>
            <Link to="/contact" className="inline-flex items-center gap-3 group">
              <span className="font-display text-2xl group-hover:text-teal transition-colors">
                Start a project
              </span>
              <span className="w-12 h-12 rounded-full bg-teal text-ink grid place-items-center text-xl group-hover:bg-orange transition-colors">
                →
              </span>
            </Link>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12 text-sm">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-5">
                Platform
              </p>
              <ul className="space-y-3">
                <li>
                  <Link to="/services" className="hover:text-teal">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/ai-solutions" className="hover:text-teal">
                    AI Solutions
                  </Link>
                </li>
                <li>
                  <Link to="/technologies" className="hover:text-teal">
                    Technologies
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="hover:text-teal">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:text-teal">
                    Blog News
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-5">
                Company
              </p>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="hover:text-teal">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/portfolio" className="hover:text-teal">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-teal">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="hover:text-teal">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-and-conditions" className="hover:text-teal">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/refund-policy" className="hover:text-teal">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-5">
                Contact
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-teal break-all">
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-teal"
                  >
                    WhatsApp {siteConfig.whatsappDisplay}
                  </a>
                </li>
                <li>24/7 Global</li>
                <li>Fixed-price</li>
                <li>Hourly engagements</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
          <p>
            Copyright {new Date().getFullYear()} AItouchSolutions - Founded by {siteConfig.author}
          </p>
          <p className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-teal opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
            </span>
            Operations active
          </p>
        </div>
      </div>
    </footer>
  );
}
