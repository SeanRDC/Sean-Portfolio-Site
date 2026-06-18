import { useScrollProgress } from "../../lib/useScrollProgress";
const LINES = [
  "I build systems",
  "that actually move —",
  "from the database",
  "to the DOM,",
  "from the circuit",
  "to the chassis.",
];

const HUD = [
  "RUNTIME / node v20",
  "DB / mongo · atlas",
  "TORQUE / 4.2 N·m",
  "LATENCY / 38ms",
  "BUILD / passing",
  "PWM / 1480µs",
];

function clamp01(x: number) { return Math.min(1, Math.max(0, x)); }

export default function ManifestoScene() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const enter = clamp01(progress / 0.12);

  return (
    <section id="prologue" ref={ref} className="relative h-[200vh] bg-void">
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        {/* left HUD rail */}
        <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 flex-col gap-3 border-l border-line pl-4 md:flex">
          {HUD.map((h, i) => {
            const on = progress > 0.1 + i * 0.06;
            return (
              <div
                key={h}
                className="font-mono-x text-[10px] uppercase tracking-wider"
                style={{ color: on ? "var(--fg-dim)" : "var(--fg-faint)", animation: on ? "hud-flicker 4s steps(1) infinite" : "none", animationDelay: `${i * 0.4}s` }}
              >
                <span className="text-signal">·</span> {h}
              </div>
            );
          })}
        </div>

        {/* section index */}
        <div className="absolute right-6 top-24 text-right font-mono-x text-[10px] uppercase leading-relaxed text-fg-faint">
          <div>SCENE 02</div>
          <div className="text-fg-dim">PROLOGUE</div>
        </div>

        <div className="mx-auto w-full max-w-5xl px-6" style={{ opacity: enter }}>
          <div className="mb-8 flex items-center gap-4">
            <span className="font-mono-x text-[11px] uppercase tracking-[0.4em] text-signal">Manifesto</span>
            <span className="h-px flex-1 bg-line" />
            <span className="font-mono-x text-[10px] uppercase text-fg-faint">[ 02 / 06 ]</span>
          </div>
          <div className="space-y-1">
            {LINES.map((line, i) => {
              const start = 0.1 + (i / LINES.length) * 0.62;
              const lp = clamp01((progress - start) / 0.16);
              const dim = i % 2 === 1;
              return (
                <h2
                  key={line}
                  className="t-display text-[clamp(30px,6.5vw,98px)]"
                  style={{
                    opacity: 0.12 + lp * 0.88,
                    transform: `translateX(${(1 - lp) * (dim ? 40 : -18)}px)`,
                    color: dim ? "var(--fg-dim)" : "var(--fg)",
                    willChange: "opacity, transform",
                  }}
                >
                  {line}
                </h2>
              );
            })}
          </div>
          <p
            className="mt-12 max-w-xl font-body text-[15px] font-light leading-relaxed text-fg-dim"
            style={{ opacity: clamp01((progress - 0.72) / 0.15) }}
          >
            Full-stack MERN developer and mechatronics engineer. I treat software and hardware
            as one continuous system — architecture, control, motion. Five years shipping
            production builds and machines that hold tolerance.
          </p>
        </div>
      </div>
    </section>
  );
}
