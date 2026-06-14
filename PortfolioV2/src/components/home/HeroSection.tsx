import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const headline = ["I", "design,", "program", "&", "automate", "experiences."];

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Create a master timeline for the hero entrance
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Portrait entrance
      tl.fromTo(
        ".hero-portrait",
        { opacity: 0, scale: 0.9, filter: "blur(20px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.2 },
      );

      // 2. Eyebrow text
      tl.fromTo(
        ".hero-eyebrow",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.8", // Overlap with portrait
      );

      // 3. Staggered headline words
      tl.fromTo(
        ".hero-word",
        { opacity: 0, y: 20, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.08 },
        "-=0.6",
      );

      // 4. Bio paragraph
      tl.fromTo(
        ".hero-bio",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.4",
      );

      // 5. CTA Buttons
      tl.fromTo(
        ".hero-cta",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
        "-=0.6",
      );
    },
    { scope: heroRef },
  );

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center px-6 pt-28 md:px-10"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[auto_1fr]">
        {/* Portrait — glass ring + slow specular rotation */}
        <div className="hero-portrait mx-auto md:mx-0">
          <div className="relative h-44 w-44 md:h-56 md:w-56">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, var(--violet), var(--cyan), var(--rose), var(--violet))",
                animation: "spin-slow 14s linear infinite",
                filter: "blur(2px)",
                opacity: 0.9,
              }}
            />
            <div className="glass-strong absolute inset-[3px] flex items-center justify-center overflow-hidden rounded-full">
              <div
                className="h-full w-full"
                style={{
                  background:
                    "radial-gradient(70% 70% at 35% 30%, rgba(123,92,255,0.55), transparent 60%), radial-gradient(60% 60% at 75% 80%, rgba(79,210,255,0.5), transparent 60%), #14141f",
                }}
              />
              <span className="absolute font-display text-4xl font-semibold tracking-tight text-ink/90">
                JD
              </span>
            </div>
          </div>
        </div>

        {/* Bio + headline */}
        <div>
          <span className="hero-eyebrow mb-6 inline-block text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
            Developer · Designer · Automator
          </span>
          <h1 className="font-display text-5xl font-semibold leading-[0.98] tracking-tightest text-ink md:text-7xl">
            {headline.map((word, i) => (
              <span key={i} className="hero-word mr-[0.22em] inline-block">
                {word}
              </span>
            ))}
          </h1>
          <p className="hero-bio mt-7 max-w-xl text-lg leading-relaxed text-ink-muted">
            I specialize in designing, programming, and automating digital
            products — crafting interfaces that feel inevitable and the systems
            that quietly run them.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/work"
              data-cursor
              className="hero-cta group glass-strong glass-edge inline-flex items-center gap-2 rounded-pill px-6 py-3.5 text-[15px] font-semibold text-ink transition-transform duration-300 hover:scale-[1.03]"
            >
              View selected work
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
              />
            </Link>
            <Link
              to="/certificates"
              data-cursor
              className="hero-cta text-[15px] font-medium text-ink-muted transition-colors hover:text-ink"
            >
              See credentials
            </Link>
          </div>
        </div>
      </div>

      {/* scroll hint */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.16em] text-ink-faint">
        Scroll
      </div>
    </section>
  );
}
