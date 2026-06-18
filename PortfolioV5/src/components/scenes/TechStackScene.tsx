import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TechMark from "../TechMark";

gsap.registerPlugin(ScrollTrigger);

type Tech = { name: string; role: string; mark: string };
const STACK: Tech[] = [
  { name: "React", role: "Interface architecture", mark: "react" },
  { name: "Node.js", role: "Runtime & services", mark: "node" },
  { name: "Express", role: "API & routing", mark: "express" },
  { name: "MongoDB", role: "Data & persistence", mark: "mongo" },
  { name: "CAD", role: "Mechanical design", mark: "cad" },
  { name: "Systems Control", role: "Closed-loop & PID", mark: "control" },
];

function clamp01(x: number) {
  return Math.min(1, Math.max(0, x));
}

export default function TechStackScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => setProgress(self.progress),
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="relative bg-paper"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden border-y border-line">
        <div className="mx-auto grid h-full max-w-7xl grid-cols-1 md:grid-cols-2">
          {/* sticky heading */}
          <div className="relative flex flex-col justify-center border-line px-6 md:border-r md:px-10">
            <div className="font-mono-x mb-6 text-[11px] uppercase tracking-[0.4em] text-ink-dim">
              03 - Capability
            </div>
            <h2 className="t-colossal text-[clamp(56px,11vw,150px)] leading-[0.82] text-ink">
              TECH
              <br />
              STACK
            </h2>
            <p className="mt-8 max-w-xs font-body text-[14px] font-light leading-relaxed text-ink-soft">
              One continuous system - from the database layer to the DOM, from
              the circuit to the chassis.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <div className="h-px w-24 bg-line-strong">
                <div
                  className="h-full bg-ink"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <span className="font-mono-x text-[10px] tabular-nums text-ink-dim">
                {String(Math.round(progress * 100)).padStart(2, "0")}%
              </span>
            </div>
          </div>
          {/* scrolling list */}
          <div className="relative overflow-hidden px-6 md:px-10">
            <div
              className="absolute inset-x-6 md:inset-x-10"
              style={{
                top: "50%",
                transform: `translateY(calc(-${progress * 100}% + 26vh))`,
                willChange: "transform",
              }}
            >
              {STACK.map((s, i) => {
                const center = (i + 0.5) / STACK.length;
                const near = 1 - clamp01(Math.abs(progress - center) / 0.18);
                return (
                  <div
                    key={s.name}
                    className="flex items-center gap-6 border-b border-line py-8"
                    style={{ opacity: 0.35 + near * 0.65 }}
                  >
                    <span className="font-mono-x w-8 text-[12px] text-ink-faint">
                      0{i + 1}
                    </span>
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-line-strong">
                      <TechMark id={s.mark} />
                    </div>
                    <div className="flex-1">
                      <div className="t-display text-[clamp(30px,5vw,64px)] leading-none text-ink">
                        {s.name}
                      </div>
                      <div className="mt-2 font-mono-x text-[11px] uppercase tracking-wider text-ink-dim">
                        {s.role}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* center reading line */}
            <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-transparent" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-paper to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-paper to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
