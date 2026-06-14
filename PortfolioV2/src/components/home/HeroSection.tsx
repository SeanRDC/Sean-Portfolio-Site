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
      // 1. Entrance timelines
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".hero-portrait",
        { opacity: 0, scale: 0.9, filter: "blur(20px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.2 },
      )
        .fromTo(
          ".hero-eyebrow",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.8",
        )
        .fromTo(
          ".hero-word",
          { opacity: 0, y: 20, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.08,
          },
          "-=0.6",
        )
        .fromTo(
          ".hero-bio",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4",
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          "-=0.6",
        );

      // 2. The Sound-Visualizer Aura Engine
      // We target each ring individually to give them different personalities
      const rings = gsap.utils.toArray(".aura-ring");

      rings.forEach((ring: any, i) => {
        // Rotation: Each ring spins at a slightly different, non-harmonic speed
        gsap.to(ring, {
          rotation: i % 2 === 0 ? 360 : -360, // Some spin clockwise, some counter-clockwise
          duration: 12 + i * 4,
          ease: "none",
          repeat: -1,
        });

        // Breathing/Visualizer Pulse: The "Unpredictable" heartbeat
        gsap.to(ring, {
          scale: () => gsap.utils.random(1.05, 1.35), // Uneven expansion
          opacity: () => gsap.utils.random(0.2, 0.7), // Uneven flickering
          duration: () => gsap.utils.random(0.5, 1.5), // Erratic "beat" speed
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          repeatRefresh: true, // This is key: recalculates randomness every iteration
          delay: i * 0.4, // Offset the start time for a ripple effect
        });
      });
    },
    { scope: heroRef },
  );

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center px-6 pt-28 md:px-10"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[auto_1fr]">
        <div className="hero-portrait mx-auto md:mx-0">
          <div className="relative h-48 w-48 md:h-60 md:w-60 flex items-center justify-center">
            {/* The 3 Audio-Reactive Layers - uneven, pulsating waves */}
            <div className="aura-ring absolute inset-0 rounded-full bg-gradient-to-tr from-violet/70 via-cyan/50 to-transparent blur-[16px] will-change-transform" />
            <div className="aura-ring absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-cyan/40 to-rose/60 blur-[24px] will-change-transform" />
            <div className="aura-ring absolute inset-0 rounded-full bg-gradient-to-tr from-rose/50 via-violet/40 to-transparent blur-[32px] will-change-transform" />

            {/* Glass Orb Container */}
            <div className="glass-strong absolute inset-1 z-10 flex items-center justify-center overflow-hidden rounded-full border border-white/10">
              <div
                className="h-full w-full opacity-90 transition-colors duration-500"
                style={{
                  background:
                    "radial-gradient(70% 70% at 35% 30%, rgba(123,92,255,0.15), transparent 60%), radial-gradient(60% 60% at 75% 80%, rgba(79,210,255,0.15), transparent 60%), var(--panel-deep)",
                }}
              />
              <span className="absolute font-display text-7xl font-semibold tracking-tight text-ink/90 drop-shadow-sm">
                S
              </span>
            </div>
          </div>
        </div>

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
              className="hero-cta group glass-strong glass-edge inline-flex items-center gap-2 rounded-pill px-6 py-3.5 text-[15px] font-semibold text-ink transition-transform hover:scale-[1.03]"
            >
              View selected work{" "}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
    </section>
  );
}
