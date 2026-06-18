import { useScrollProgress } from "../../lib/useScrollProgress";

type Tile = { label: string; stat: string; kind: string };

const TILES: Tile[] = [
  { label: "AWS Solutions Architect", stat: "Certified · 2024", kind: "CERT" },
  { label: "Peak Throughput", stat: "1.2M req / day", kind: "DEPLOY" },
  { label: "Service Uptime", stat: "99.98%", kind: "DEPLOY" },
  { label: "IEEE Robotics", stat: "Member · 2023", kind: "CERT" },
  { label: "Manipulator Torque", stat: "4.2 N·m", kind: "SPEC" },
  { label: "Production Deploys", stat: "120+ shipped", kind: "DEPLOY" },
  { label: "ISO 9001 Process", stat: "Audited", kind: "CERT" },
  { label: "Machining Tolerance", stat: "± 0.02 mm", kind: "SPEC" },
  { label: "MongoDB Associate", stat: "Certified · 2025", kind: "CERT" },
  { label: "Control Loop Rate", stat: "1 kHz PID", kind: "SPEC" },
];

const STEP = 360 / TILES.length;
const RADIUS = 560;

function clamp01(x: number) { return Math.min(1, Math.max(0, x)); }

export default function AccoladesScene() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const ringRot = -progress * 330; // scroll drives the orbit
  const enter = clamp01((progress - 0.04) / 0.1);

  return (
    <section id="accolades" ref={ref} className="relative h-[320vh] bg-void">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* depth fog */}
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 30%, #000 72%)" }} />

        {/* HUD */}
        <div className="absolute left-6 top-24 font-mono-x text-[10px] uppercase leading-relaxed text-fg-faint">
          <div>SCENE 04 / ACCOLADES</div>
          <div className="text-fg-dim">ORBIT · {TILES.length} NODES</div>
        </div>

        {/* 3D ring */}
        <div className="absolute inset-0" style={{ perspective: "1100px" }}>
          <div className="absolute left-1/2 top-1/2 h-0 w-0" style={{ transformStyle: "preserve-3d", transform: `rotateY(${ringRot}deg)`, willChange: "transform" }}>
            {TILES.map((t, i) => (
              <div
                key={t.label}
                className="absolute"
                style={{
                  width: 230,
                  height: 310,
                  transform: `translate(-50%, -50%) rotateY(${i * STEP}deg) translateZ(${RADIUS}px)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="relative h-full w-full overflow-hidden border border-line-bright">
                  {/* basalt texture via layered gradients */}
                  <div className="absolute inset-0" style={{ background: "radial-gradient(120% 90% at 30% 20%, #1d1d20 0%, #121214 40%, #08080a 100%)" }} />
                  <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "repeating-linear-gradient(115deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 7px)" }} />
                  <div className="absolute inset-0 flex flex-col justify-between p-5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-x text-[9px] uppercase tracking-[0.25em] text-signal">{t.kind}</span>
                      <span className="font-mono-x text-[9px] text-fg-faint">0{i + 1}</span>
                    </div>
                    <div>
                      <div className="t-sub text-[19px] leading-tight text-fg">{t.label}</div>
                      <div className="mt-2 font-mono-x text-[12px] text-fg-dim">{t.stat}</div>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-0 border-t border-white/5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* center typography — sans + italic serif mix */}
        <div className="relative z-10 max-w-2xl px-6 text-center" style={{ opacity: enter }}>
          <div className="mb-6 font-mono-x text-[11px] uppercase tracking-[0.5em] text-fg-dim">The Accolades</div>
          <p className="t-display text-[clamp(28px,4.4vw,58px)] leading-[1.05] text-fg">
            Each milestone is a chance to{" "}
            <span className="t-serif-i font-normal text-fg-dim">push the limits</span>{" "}
            of architecture <span className="t-serif-i font-normal text-fg-dim">&amp;</span> engineering.
          </p>
          <div className="mx-auto mt-8 h-px w-16 bg-signal" />
        </div>
      </div>
    </section>
  );
}
