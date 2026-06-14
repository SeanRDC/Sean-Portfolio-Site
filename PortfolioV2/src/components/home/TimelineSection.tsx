import { useEffect, useRef, useState } from "react";
import Reveal from "../Reveal";

type Entry = {
  tag: string;
  title: string;
  desc: string;
  side: "left" | "right";
  current?: boolean;
  range?: boolean;
};

const entries: Entry[] = [
  { tag: "Current", title: "Freelance Designer & Developer", desc: "Designing, building & automating client products end-to-end.", side: "left", current: true },
  { tag: "2025 — 2026", title: "Product & Automation Work", desc: "Shipping interfaces and the systems that run them.", side: "right", range: true },
  { tag: "2022", title: "First Design Foundations", desc: "Where the craft began — type, grids, and the rules worth breaking.", side: "left" },
  { tag: "2024 — 2028", title: "Education (ongoing)", desc: "Degree in progress, running parallel to client work.", side: "right", range: true },
];

export default function TimelineSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height + vh * 0.4;
      const passed = vh * 0.75 - r.top;
      setProgress(Math.max(0, Math.min(1, passed / total)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="relative px-6 py-28 md:px-10">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-16 text-center">
          <span className="mb-3 inline-block text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">The path so far</span>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">Experience</h2>
        </Reveal>

        <div ref={wrapRef} className="relative">
          {/* spine */}
          <div className="absolute left-4 top-0 h-full w-px -translate-x-1/2 bg-white/10 md:left-1/2">
            <div
              className="w-full"
              style={{ height: `${progress * 100}%`, background: "linear-gradient(to bottom, var(--violet), var(--cyan))", boxShadow: "0 0 12px rgba(79,210,255,0.5)", transition: "height 0.1s linear" }}
            />
          </div>

          <div className="flex flex-col gap-10">
            {entries.map((e, i) => (
              <Reveal key={i} delay={i * 80}>
                <div
                  className={`relative flex items-center gap-6 ${
                    e.side === "right" ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* card */}
                  <div className="flex-1 pl-12 md:pl-0">
                    <div
                      className={`glass glass-edge rounded-[20px] p-6 ${
                        e.side === "right" ? "md:ml-10" : "md:mr-10"
                      }`}
                    >
                      <div className="mb-2 flex items-center gap-2">
                        {e.current && (
                          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--cyan)", boxShadow: "0 0 10px var(--cyan)" }} />
                        )}
                        <span
                          className="text-xs font-semibold uppercase tracking-[0.1em]"
                          style={{ color: e.current ? "var(--cyan)" : "var(--ink-muted)" }}
                        >
                          {e.tag}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-semibold tracking-tight text-ink">{e.title}</h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-ink-muted">{e.desc}</p>
                    </div>
                  </div>

                  {/* node */}
                  <span
                    className="absolute left-4 top-7 -translate-x-1/2 rounded-full md:static md:top-auto md:translate-x-0"
                    style={{
                      width: e.range ? "13px" : "15px",
                      height: e.range ? "13px" : "15px",
                      background: e.current ? "var(--cyan)" : e.range ? "var(--violet)" : "rgba(255,255,255,0.3)",
                      boxShadow: e.current ? undefined : e.range ? "0 0 12px var(--violet)" : undefined,
                      animation: e.current ? "pulse-node 2.4s ease-in-out infinite" : undefined,
                    }}
                  />

                  {/* spacer for desktop symmetry */}
                  <div className="hidden flex-1 md:block" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
