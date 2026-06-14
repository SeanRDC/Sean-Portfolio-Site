import { Mail, Linkedin, Github, Briefcase, Globe, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

const socials = [
  { label: "Email", icon: Mail, href: "#" },
  { label: "LinkedIn", icon: Linkedin, href: "#" },
  { label: "GitHub", icon: Github, href: "#" },
  { label: "Fiverr", icon: Briefcase, href: "#" },
  { label: "OnlineJobs", icon: Globe, href: "#" },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative px-6 pb-10 pt-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="glass glass-edge overflow-hidden rounded-[28px] p-8 md:p-12">
            <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
              {/* Get in touch */}
              <div className="flex flex-col items-start gap-5">
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">Have a project in mind?</span>
                <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
                  Let's build something worth remembering.
                </h2>
                <a
                  data-cursor
                  href="mailto:hello@example.com"
                  className="group mt-1 inline-flex items-center gap-2 rounded-pill px-6 py-3 text-[15px] font-semibold text-void transition-transform duration-300 hover:scale-[1.03]"
                  style={{ background: "linear-gradient(135deg, #f4f5fa, #c9ccdb)", boxShadow: "0 10px 30px rgba(255,255,255,0.16), inset 0 1px 0 rgba(255,255,255,0.8)" }}
                >
                  Get in Touch
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
                </a>
              </div>

              {/* Socials */}
              <div className="flex flex-col gap-3">
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">Connect</span>
                <div className="flex flex-wrap gap-2">
                  {socials.map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.label}
                        data-cursor
                        href={s.href}
                        className="glass flex items-center gap-2 rounded-pill px-3.5 py-2 text-sm font-medium text-ink-muted transition-all duration-300 hover:-translate-y-0.5 hover:text-ink"
                      >
                        <Icon className="h-4 w-4" strokeWidth={1.75} />
                        {s.label}
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Contact info */}
              <div className="flex flex-col gap-3">
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">Contact</span>
                <a data-cursor href="mailto:hello@example.com" className="text-[15px] text-ink-muted transition-colors hover:text-ink">
                  hello@example.com
                </a>
                <span className="text-[15px] text-ink-muted">Available worldwide · Remote</span>
              </div>
            </div>

            <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-sm text-ink-faint sm:flex-row sm:items-center">
              <span>© {new Date().getFullYear()} — Designed, programmed & automated.</span>
              <span>Crafted with liquid glass.</span>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
