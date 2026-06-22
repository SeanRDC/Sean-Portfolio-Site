import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import StoneCanvas from "../StoneCanvas";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  n: string;
  title: string;
  kind: string;
  blurb: string;
  meta: string[];
  seed: number;
  tint: number;
};

const PROJECTS: Project[] = [
  {
    n: "01",
    title: "BEADED",
    kind: "Full-Stack E-Commerce Platform",
    blurb:
      "A bespoke jewelry storefront with a real-time custom builder - configure metal, stone and setting live - backed by a points-based loyalty engine and headless checkout.",
    meta: ["MERN", "Custom Builder", "Loyalty Engine", "Stripe"],
    seed: 0.24,
    tint: 0.62,
  },
  {
    n: "02",
    title: "FLOWER",
    kind: "Flower Encyclopedia Database and UI",
    blurb:
      "A comprehensive digital herbarium featuring custom taxonomical filters and micro-animations. Each entry uses fluid UI transitions to render petal textures and growth patterns, providing a precise, scholarly look into global flora.",
    meta: ["React", "Custom Components", "Realtime", "Design System"],
    seed: 0.58,
    tint: 0.4,
  },
  {
    n: "03",
    title: "PIXEL",
    kind: "Modular E-Commerce Architecture",
    blurb:
      "A performance-focused storefront engine utilizing a custom headless modular system. Currently under development, the architecture emphasizes low-latency state management and grid-responsive UI components designed for high-fidelity product visualization.",
    meta: [
      "React",
      "Headless CMS",
      "State Management",
      "Performance Optimization",
    ],
    seed: 0.58,
    tint: 0.4,
  },
];

// Reusable Gallery Content
const GalleryContent = ({ p, N }: { p: Project; N: number }) => (
  <div className="grid w-full grid-cols-1 items-center gap-10 md:grid-cols-12">
    <div className="min-w-0 md:col-span-7">
      <div className="relative aspect-[16/10] w-full overflow-hidden border border-line">
        <StoneCanvas
          className="block h-full w-full"
          seed={p.seed}
          tint={p.tint}
          flow={0.8}
          contrast={0.6}
          interactive
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, rgba(243,239,231,0.1) 0%, transparent 40%, rgba(19,18,16,0.12) 100%)",
          }}
        />
        <div className="absolute left-5 top-5 font-mono-x text-[10px] uppercase tracking-[0.25em] text-ink-soft">
          Still {p.n} / 0{N}
        </div>
        <div className="absolute bottom-5 right-5 font-mono-x text-[10px] uppercase tracking-[0.2em] text-ink-dim">
          WebGL - liquid
        </div>
      </div>
    </div>

    <div className="min-w-0 md:col-span-5">
      <div className="mb-4 font-mono-x text-[11px] uppercase tracking-[0.3em] text-ink-dim">
        {p.kind}
      </div>
      <h2 className="t-colossal text-[clamp(42px,5.5vw,110px)] tracking-tight text-ink break-words">
        {p.title}
      </h2>
      <p className="mt-6 max-w-md font-body text-[15px] font-light leading-relaxed text-ink-soft">
        {p.blurb}
      </p>
      <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
        {p.meta.map((m) => (
          <span
            key={m}
            className="font-mono-x text-[11px] uppercase tracking-wider text-ink-dim"
          >
            <span className="mr-1.5 text-ink-faint">/</span>
            {m}
          </span>
        ))}
      </div>
      <a
        href="#stack"
        className="group mt-9 inline-flex items-center gap-3 border-b border-line-strong pb-1.5 transition-colors hover:border-ink"
      >
        <span className="t-label text-[13px] uppercase tracking-[0.2em] text-ink">
          Enter Case Study
        </span>
        <span className="font-mono-x text-base text-ink transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
          ↗
        </span>
      </a>
    </div>
  </div>
);

export default function ProjectsScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isListView, setIsListView] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 65%",
        end: "bottom 35%",
        animation: gsap.fromTo(
          btnRef.current,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
        ),
        toggleActions: "play reverse play reverse",
      });

      if (!isListView) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => setProgress(self.progress),
        });
      }
    },
    { scope: sectionRef, dependencies: [isListView] },
  );

  const N = PROJECTS.length;
  const intro = "020 - Selected Work";

  const t = Math.min(1, Math.max(0, (progress - 0.08) / 0.84));
  const active = Math.min(N - 1, Math.round(t * (N - 1)));

  const handleToggle = () => {
    setIsListView((prev) => !prev);
    setTimeout(() => {
      if (sectionRef.current) {
        const y =
          sectionRef.current.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: y, behavior: "instant" });
      }
      ScrollTrigger.refresh();
    }, 0);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsListView(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative bg-paper"
      style={{ height: isListView ? "auto" : `${(N + 1) * 100}vh` }}
    >
      {isListView ? (
        <div className="min-h-screen py-32 px-6 md:px-16">
          <div className="mb-20 font-mono-x text-[10px] uppercase tracking-[0.3em] text-ink-dim">
            {intro} — Project Index
          </div>

          <div className="flex w-full flex-col border-t border-line-strong">
            {PROJECTS.map((p) => (
              <article
                key={p.n}
                className="group flex flex-col items-start justify-between border-b border-line py-12 transition-colors hover:bg-ink/[0.02] md:flex-row md:items-center"
              >
                <div className="flex items-baseline gap-6 md:w-1/2 md:gap-12">
                  <span className="font-mono-x text-[12px] text-ink-faint shrink-0">
                    {p.n}
                  </span>
                  <div>
                    <h2 className="t-colossal text-[clamp(40px,6vw,90px)] leading-[0.85] text-ink transition-transform group-hover:translate-x-2">
                      {p.title}
                    </h2>
                    <div className="mt-4 font-mono-x text-[11px] uppercase tracking-[0.2em] text-ink-dim">
                      {p.kind}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex w-full flex-col md:mt-0 md:w-1/2 md:flex-row md:items-center md:justify-between md:pl-10">
                  <div className="max-w-sm">
                    <p className="font-body text-[14px] font-light leading-relaxed text-ink-soft line-clamp-2 transition-all group-hover:line-clamp-none">
                      {p.blurb}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                      {p.meta.map((m) => (
                        <span
                          key={m}
                          className="font-mono-x text-[10px] uppercase tracking-wider text-ink-dim"
                        >
                          <span className="mr-1.5 text-ink-faint">/</span>
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href="#stack"
                    className="mt-8 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink transition-all group-hover:scale-110 group-hover:bg-ink group-hover:text-paper md:mt-0"
                  >
                    <span className="font-mono-x text-xl">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div className="flex h-full w-full">
            {PROJECTS.map((p) => (
              <article
                key={p.n}
                className="relative flex h-full w-full shrink-0 items-center px-6 md:px-16"
                style={{
                  transform: `translateX(-${t * (N - 1) * 100}%)`,
                  willChange: "transform",
                }}
              >
                <GalleryContent p={p} N={N} />
              </article>
            ))}
          </div>

          <div className="pointer-events-none absolute left-6 top-24 font-mono-x text-[10px] uppercase tracking-[0.3em] text-ink-dim md:left-16">
            {intro} — Gallery View
          </div>

          <div className="pointer-events-none absolute inset-x-6 bottom-8 flex items-center gap-4 md:inset-x-16">
            <div className="flex flex-1 items-center gap-1.5">
              {PROJECTS.map((p, i) => (
                <div
                  key={p.n}
                  className="h-px flex-1 transition-colors duration-300"
                  style={{
                    background:
                      i <= active ? "var(--ink)" : "var(--line-strong)",
                  }}
                />
              ))}
            </div>
            <span className="font-mono-x text-[10px] tabular-nums text-ink-dim transition-all">
              0{active + 1} / 0{N}
            </span>
          </div>
        </div>
      )}

      <div className="pointer-events-none fixed inset-x-0 bottom-12 z-[100] hidden md:flex justify-center md:bottom-24">
        <div ref={btnRef} className="pointer-events-auto invisible opacity-0">
          <button
            onClick={handleToggle}
            className="flex items-center gap-3 bg-paper/90 backdrop-blur-md border border-line-strong px-5 py-2.5 font-mono-x text-[10px] uppercase tracking-[0.2em] text-ink transition-all hover:bg-ink hover:text-paper hover:shadow-lg"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-40"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current"></span>
            </span>
            {isListView ? "Switch to Gallery" : "Switch to List View"}
          </button>
        </div>
      </div>
    </section>
  );
}
