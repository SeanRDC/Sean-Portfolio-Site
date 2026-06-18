import { useEffect, useState } from "react";

const LINKS = [
  { id: "aperture", n: "00", label: "Index" },
  { id: "profile", n: "01", label: "Profile" },
  { id: "projects", n: "02", label: "Work" },
  { id: "stack", n: "03", label: "Stack" },
  { id: "ring", n: "04", label: "Certificates" },
  { id: "contact", n: "05", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-500"
      style={{
        background: scrolled ? "var(--paper)" : "transparent",
        borderBottom: scrolled
          ? "1px solid var(--line)"
          : "1px solid transparent",
      }}
    >
      <div className="flex items-center justify-between px-6 py-4 md:px-10">
        <a href="#aperture" className="flex items-center gap-3">
          <span
            className="h-1.5 w-1.5 bg-ink"
            style={{ animation: "blink 1.6s steps(1) infinite" }}
          />
          <span className="t-label text-[13px] uppercase text-ink">sean</span>
          <span className="font-mono-x text-[10px] uppercase tracking-[0.2em] text-ink-dim">
            Dev / Eng
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.slice(1).map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="group flex items-baseline gap-1.5"
            >
              <span className="font-mono-x text-[10px] text-ink-faint group-hover:text-ink">
                {l.n}
              </span>
              <span className="t-label text-[11px] uppercase text-ink-dim transition-colors group-hover:text-ink">
                {l.label}
              </span>
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="t-label hidden border border-line-strong px-4 py-2 text-[11px] uppercase tracking-[0.15em] text-ink transition-colors hover:bg-ink hover:text-paper sm:inline-block"
        >
          Contact Me
        </a>
      </div>
    </header>
  );
}
