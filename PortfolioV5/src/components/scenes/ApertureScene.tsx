import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import StoneCanvas from "../StoneCanvas";

gsap.registerPlugin(ScrollTrigger);

function clamp01(x: number) {
  return Math.min(1, Math.max(0, x));
}

export default function ApertureScene() {
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

  const eased = progress * progress;
  const scale = 1 + eased * 9;
  const planeFade = progress < 0.66 ? 1 : clamp01(1 - (progress - 0.66) / 0.3);
  const uiFade = 1 - clamp01(progress / 0.32);

  return (
    <section id="aperture" ref={sectionRef} className="relative h-[240vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-paper">
        {/* depth tunnel seen through the hollow S */}
        <div className="absolute inset-0">
          <StoneCanvas
            className="block h-full w-full"
            seed={0.5}
            tint={0.6}
            flow={0.7}
            contrast={0.7}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 47%, rgba(19,18,16,0.32) 0%, rgba(19,18,16,0.05) 30%, transparent 55%)",
            }}
          />
        </div>

        {/* alabaster plane with hollow S - this dollies forward */}
        <div
          className="absolute inset-0"
          style={{
            transform: `scale(${scale})`,
            opacity: planeFade,
            transformOrigin: "50% 47%",
            willChange: "transform, opacity",
          }}
        >
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <mask id="s-cut">
                <rect width="100" height="100" fill="white" />
                <text
                  x="50"
                  y="49"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontFamily="Archivo, sans-serif"
                  fontWeight="900"
                  fontSize="82"
                  style={
                    {
                      fontStretch: "expanded",
                      letterSpacing: "-0.04em",
                    } as React.CSSProperties
                  }
                  fill="black"
                >
                  S
                </text>
              </mask>
              <radialGradient id="lip" cx="50%" cy="46%" r="55%">
                <stop offset="60%" stopColor="var(--paper)" />
                <stop offset="100%" stopColor="var(--paper-2)" />
              </radialGradient>
            </defs>
            <rect
              width="100"
              height="100"
              fill="url(#lip)"
              mask="url(#s-cut)"
            />
          </svg>
        </div>

        {/* framed identity + HUD furniture */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ opacity: uiFade }}
        >
          <div className="absolute left-6 top-24 font-mono-x text-[10px] uppercase leading-relaxed text-ink-dim md:left-10">
            <div>Index 00 - Aperture</div>
            <div className="text-ink-faint">Smooth - Hollow - S</div>
          </div>
          <div className="absolute right-6 top-24 text-right font-mono-x text-[10px] uppercase leading-relaxed text-ink-dim md:right-10">
            <div>Full-Stack &amp; Mechatronics</div>
            <div className="text-ink-faint">Portfolio MMXXVI</div>
          </div>
          <div className="absolute inset-x-0 bottom-12 flex flex-col items-center gap-3">
            <span className="t-label text-[12px] uppercase tracking-[0.4em] text-ink-soft">
              sean - Developer &amp; Engineer
            </span>
            <div className="flex items-center gap-3">
              <span className="font-mono-x text-[10px] uppercase tracking-[0.3em] text-ink-dim">
                Scroll to enter
              </span>
              <span className="h-4 w-px bg-line-strong" />
              <span className="font-mono-x text-[11px] text-ink">↓</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
