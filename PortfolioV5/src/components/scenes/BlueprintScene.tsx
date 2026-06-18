import BasaltCanvas from "../BasaltCanvas";

const ROW_A = ["MERN", "MONGODB", "EXPRESS", "REACT", "NODE.JS"];
const ROW_B = ["TYPESCRIPT", "WEBGL", "DOCKER", "REDIS", "POSTGRES"];
const ROW_C = ["CAD / SOLIDWORKS", "C++", "ROS", "PID CONTROL", "PCB DESIGN"];

function Marquee({ items, dir, className }: { items: string[]; dir: "l" | "r"; className: string }) {
  const seq = [...items, ...items, ...items, ...items];
  const anim = dir === "l" ? "marquee-l 26s linear infinite" : "marquee-r 32s linear infinite";
  return (
    <div className="flex w-full overflow-hidden">
      <div className="flex shrink-0 items-center whitespace-nowrap" style={{ animation: anim }}>
        {seq.map((s, i) => (
          <span key={i} className={className}>
            {s}
            <span className="mx-7 text-signal">✶</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function BlueprintScene() {
  return (
    <section id="blueprint" className="relative h-screen w-full overflow-hidden bg-void">
      <BasaltCanvas className="absolute inset-0 block h-full w-full" seed={0.55} tone={0.3} flow={0.6} bright={0.55} />
      <div className="pointer-events-none absolute inset-0 bg-black/45" />

      {/* floating basalt geometry */}
      <div className="pointer-events-none absolute inset-0" style={{ perspective: "900px" }}>
        {/* sphere */}
        <div className="absolute left-[12%] top-[22%] h-44 w-44 rounded-full" style={{ background: "radial-gradient(circle at 32% 28%, #2a2a2e 0%, #141416 45%, #050506 100%)", border: "1px solid var(--line-bright)", animation: "spin-ring 40s linear infinite", transformStyle: "preserve-3d" }} />
        {/* wireframe cube */}
        <div className="absolute right-[14%] top-[18%] h-36 w-36" style={{ transformStyle: "preserve-3d", animation: "spin-ring 30s linear infinite" }}>
          <div className="absolute inset-0 border border-line-bright" style={{ transform: "translateZ(72px)" }} />
          <div className="absolute inset-0 border border-line" style={{ transform: "translateZ(-72px)" }} />
          <div className="absolute inset-0 border border-line/60" style={{ transform: "rotateY(90deg) translateZ(72px)" }} />
        </div>
        {/* cylinder */}
        <div className="absolute bottom-[16%] left-[20%] h-48 w-28" style={{ background: "linear-gradient(90deg, #060607 0%, #26262a 50%, #060607 100%)", border: "1px solid var(--line)" }}>
          <div className="absolute -top-3 left-0 h-6 w-full rounded-[50%]" style={{ background: "#2a2a2e", border: "1px solid var(--line-bright)" }} />
        </div>
        {/* small sphere */}
        <div className="absolute bottom-[20%] right-[18%] h-24 w-24 rounded-full" style={{ background: "radial-gradient(circle at 35% 30%, #232327 0%, #0c0c0e 60%, #040405 100%)", border: "1px solid var(--line)" }} />
      </div>

      {/* header */}
      <div className="absolute left-6 top-24 z-10 font-mono-x text-[10px] uppercase leading-relaxed text-fg-faint md:left-14">
        <div>SCENE 05 / BLUEPRINT</div>
        <div className="text-fg-dim">SYSTEM COMPONENTS</div>
      </div>

      {/* kinetic marquees crossing the geometry */}
      <div className="absolute inset-0 z-[5] flex flex-col justify-center gap-2">
        <Marquee items={ROW_A} dir="l" className="t-colossal text-[clamp(40px,9vw,130px)] text-fg" />
        <Marquee items={ROW_B} dir="r" className="t-display text-[clamp(28px,6vw,86px)] text-fg-faint" />
        <Marquee items={ROW_C} dir="l" className="t-sub text-[clamp(22px,4.5vw,60px)] text-fg-dim" />
      </div>

      <div className="absolute inset-x-0 bottom-8 z-10 text-center font-mono-x text-[10px] uppercase tracking-[0.4em] text-fg-faint">
        Software · Hardware · One System
      </div>
    </section>
  );
}
