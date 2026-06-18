import BasaltCanvas from "../BasaltCanvas";
import { useScrollProgress } from "../../lib/useScrollProgress";

type Project = {
  n: string;
  title: string;
  kind: string;
  year: string;
  blurb: string;
  stack: string[];
  seed: number;
  tone: number;
};

const PROJECTS: Project[] = [
  { n: "01", title: "AXIS COMMERCE", kind: "MERN E-Commerce Platform", year: "2025", blurb: "Headless storefront — 1M+ requests/day, sub-40ms cart, Stripe + inventory engine.", stack: ["React", "Node", "MongoDB", "Stripe"], seed: 0.21, tone: 0.04 },
  { n: "02", title: "KINETIC ARM", kind: "6-DOF Robotics Controller", year: "2024", blurb: "Closed-loop PID control over a custom-machined manipulator. 0.02mm repeatability.", stack: ["C++", "ROS", "CAD", "PID"], seed: 0.63, tone: 0.55 },
  { n: "03", title: "FLEET OPS", kind: "Realtime Logistics Console", year: "2025", blurb: "Live fleet telemetry across 400 nodes. Socket streams, geofencing, replay.", stack: ["Next", "Express", "Socket.io", "Redis"], seed: 0.39, tone: 0.12 },
  { n: "04", title: "FORGE CAD", kind: "Parametric Part Configurator", year: "2023", blurb: "Browser-native parametric modeling — constraints solved client-side in WebGL.", stack: ["WebGL", "Three", "MongoDB", "CAD"], seed: 0.86, tone: 0.62 },
];

export default function SetpiecesScene() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const N = PROJECTS.length;
  const travel = -progress * (N - 1) * 100; // vw
  const active = Math.min(N - 1, Math.round(progress * (N - 1)));

  return (
    <section id="setpieces" ref={ref} className="relative bg-void" style={{ height: `${N * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="flex h-full" style={{ width: `${N * 100}vw`, transform: `translateX(${travel}vw)`, willChange: "transform" }}>
          {PROJECTS.map((p) => (
            <article key={p.n} className="relative h-full w-screen shrink-0 overflow-hidden border-r border-line">
              <BasaltCanvas className="block h-full w-full" seed={p.seed} tone={p.tone} flow={0.85} interactive />
              {/* cinematic letterbox + grade */}
              <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0.55) 100%)" }} />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[14vh] bg-gradient-to-b from-black/80 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[18vh] bg-gradient-to-t from-black/85 to-transparent" />

              {/* content */}
              <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-14">
                <div className="flex items-start justify-between">
                  <div className="font-mono-x text-[11px] uppercase tracking-[0.3em] text-fg-dim">
                    <span className="text-signal">●</span> Case File {p.n}
                  </div>
                  <div className="text-right font-mono-x text-[10px] uppercase leading-relaxed text-fg-faint">
                    <div>{p.year}</div>
                    <div>STILL {p.n} / 0{N}</div>
                  </div>
                </div>

                <div className="max-w-3xl">
                  <div className="mb-3 font-mono-x text-[12px] uppercase tracking-[0.3em] text-fg-dim">{p.kind}</div>
                  <h2 className="t-colossal text-[clamp(44px,9vw,150px)] text-fg">{p.title}</h2>
                  <p className="mt-5 max-w-md font-body text-[15px] font-light leading-relaxed text-fg-dim">{p.blurb}</p>

                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                    {p.stack.map((s) => (
                      <span key={s} className="font-mono-x text-[11px] uppercase tracking-wider text-fg-dim">
                        <span className="mr-1.5 text-fg-faint">/</span>{s}
                      </span>
                    ))}
                  </div>

                  <a href="#accolades" className="group mt-9 inline-flex items-center gap-3 border-b border-line-bright pb-1.5 transition-colors hover:border-signal">
                    <span className="t-label text-[13px] uppercase tracking-[0.2em] text-fg group-hover:text-signal">Enter Case Study</span>
                    <span className="font-mono-x text-base text-signal transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* timeline indicator */}
        <div className="pointer-events-none absolute inset-x-8 bottom-6 z-10 flex items-center gap-4 md:inset-x-14">
          <span className="font-mono-x text-[10px] uppercase tracking-[0.3em] text-fg-dim">Selected Work</span>
          <div className="flex flex-1 items-center gap-1.5">
            {PROJECTS.map((p, i) => (
              <div key={p.n} className="h-px flex-1" style={{ background: i <= active ? "var(--signal)" : "var(--line-bright)" }} />
            ))}
          </div>
          <span className="font-mono-x text-[10px] tabular-nums text-fg-dim">0{active + 1} / 0{N}</span>
        </div>
      </div>
    </section>
  );
}
