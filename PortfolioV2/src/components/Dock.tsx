import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/work", label: "Work" },
  { to: "/certificates", label: "Certificates" },
  { to: "/", label: "About" },
];

export default function Dock() {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  const goContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <header className="pointer-events-none fixed left-0 right-0 top-0 z-50 flex justify-center">
      <nav
        data-cursor
        className={`glass glass-edge pointer-events-auto mt-5 flex items-center rounded-pill transition-all duration-500 ${
          scrolled ? "gap-4 px-4 py-2" : "gap-7 px-6 py-3.5"
        }`}
      >
        <Link to="/" className="flex items-center" aria-label="Home">
          <span
            className={`rounded-lg transition-all duration-500 ${scrolled ? "h-5 w-5" : "h-7 w-7"}`}
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
            // FIX: Changed transition-colors duration-300 to transition-all duration-500
            className={`font-medium transition-all duration-500 ${scrolled ? "text-sm" : "text-[15px]"} ${
              isActive(l.to) ? "text-ink" : "text-ink-muted hover:text-ink"
            }`}
          >
            {l.label}
          </Link>
        ))}
        <button
          data-cursor
          onClick={goContact}
          className={`rounded-pill font-semibold text-ink transition-all duration-500 ${
            scrolled ? "px-3.5 py-1.5 text-sm" : "px-5 py-2 text-[15px]"
          }`}
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