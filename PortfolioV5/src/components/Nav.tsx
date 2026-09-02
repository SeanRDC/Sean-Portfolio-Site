import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

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
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: "#contact",
      start: "top 60%",
      onEnter: () =>
        gsap.to(navRef.current, {
          yPercent: -100,
          duration: 0.5,
          ease: "power3.inOut",
        }),
      onLeaveBack: () =>
        gsap.to(navRef.current, {
          yPercent: 0,
          duration: 0.5,
          ease: "power3.inOut",
        }),
    });
  }, []);

  useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Listen for the Case Study opening/closing
    const handleProjectOpen = () => setIsProjectOpen(true);
    const handleProjectClose = () => setIsProjectOpen(false);
    window.addEventListener("projectOpen", handleProjectOpen);
    window.addEventListener("projectClose", handleProjectClose);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("projectOpen", handleProjectOpen);
      window.removeEventListener("projectClose", handleProjectClose);
    };
  }, []);

  // Tell ProjectsScene to run the exit animation when Back is clicked
  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("triggerCloseProject"));
  };

  return (
    <header
      ref={navRef}
      className="fixed inset-x-0 top-0 z-[9999999] transition-colors duration-500 will-change-transform"
      style={{
        background: isProjectOpen
          ? "#0a0a0a"
          : scrolled
            ? "var(--paper)"
            : "transparent",
        borderBottom: isProjectOpen
          ? "1px solid #222"
          : scrolled
            ? "1px solid var(--line)"
            : "1px solid transparent",
      }}
    >
      <div className="flex items-center justify-between px-6 py-4 md:px-10">
        {/* Dynamic Logo */}
        <a href="#aperture" className="flex items-center gap-3">
          <span
            className="h-1.5 w-1.5 transition-colors"
            style={{
              animation: "blink 1.6s steps(1) infinite",
              backgroundColor: isProjectOpen ? "#f5f5f5" : "var(--ink)",
            }}
          />
          <span
            className="t-label text-[13px] uppercase transition-colors"
            style={{ color: isProjectOpen ? "#f5f5f5" : "var(--ink)" }}
          >
            sean
          </span>
          <span
            className="font-mono-x text-[10px] uppercase tracking-[0.2em] transition-colors"
            style={{ color: isProjectOpen ? "#888" : "var(--ink-dim)" }}
          >
            Dev / Eng
          </span>
        </a>

        {/* Dynamic Navigation vs Back Button */}
        {isProjectOpen ? (
          <button
            onClick={handleBack}
            className="group flex w-fit items-center gap-3 font-mono-x text-[11px] uppercase tracking-[0.2em] text-[#888] transition-colors hover:text-[#f5f5f5] cursor-pointer bg-transparent border-none p-0"
          >
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="17" y1="17" x2="7" y2="7"></line>
              <polyline points="7 17 7 7 17 7"></polyline>
            </svg>
            Back
          </button>
        ) : (
          <>
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
          </>
        )}
      </div>
    </header>
  );
}