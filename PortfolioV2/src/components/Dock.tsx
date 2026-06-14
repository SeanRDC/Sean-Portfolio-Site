import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const links = [
  { to: "/work", label: "Work" },
  { to: "/certificates", label: "Certificates" },
  { to: "/", label: "About" },
];

export default function Dock() {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  // GSAP GPU-Accelerated Animation Engine
  useGSAP(() => {
    if (!navRef.current) return;

    // By animating 'scale' and 'y', we bypass the browser's layout engine entirely.
    // This provides a buttery smooth, 120fps fluid resize.
    gsap.to(navRef.current, {
      scale: scrolled ? 0.85 : 1,
      y: scrolled ? -6 : 0, // Tucks it slightly upwards when shrunk
      duration: 0.6,
      ease: "power3.out",
      transformOrigin: "top center", // Ensures it shrinks towards the top of the screen
      overwrite: "auto",
    });
  }, [scrolled]);

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  const goContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <header className="pointer-events-none fixed left-0 right-0 top-0 z-50 flex justify-center pt-5">
      <nav
        ref={navRef}
        data-cursor
        // 1. Removed transition-all (GSAP handles the animation now)
        // 2. Added will-change-transform to force GPU hardware acceleration
        className="glass glass-edge pointer-events-auto flex items-center rounded-pill gap-7 px-6 py-3.5 will-change-transform"
      >
        <Link to="/" className="flex items-center" aria-label="Home">
          <span
            className="rounded-lg h-7 w-7"
            style={{
              background: "linear-gradient(135deg, var(--violet), var(--cyan))",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)",
            }}
          />
        </Link>

        {links.map((l) => (
          <Link
            key={l.label}
            to={l.to}
            // CSS only handles the text color hover state now
            className={`font-medium text-[15px] transition-colors duration-300 ${
              isActive(l.to) ? "text-ink" : "text-ink-muted hover:text-ink"
            }`}
          >
            {l.label}
          </Link>
        ))}

        <button
          data-cursor
          onClick={goContact}
          className="rounded-pill font-semibold text-ink text-[15px] px-5 py-2 transition-colors duration-300 hover:bg-white/5"
          style={{
            background: "var(--glass-fill-strong)",
            border: "1px solid var(--edge-light)",
          }}
        >
          Contact
        </button>
      </nav>
    </header>
  );
}
