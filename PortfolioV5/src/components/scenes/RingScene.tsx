import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type Tile = { label: string; meta: string; kind: string; image: string };

const TILES: Tile[] = [
  { label: "Google Ux Design", meta: "Professional - 2025", kind: "CERT", image: "/certs/cg1.webp" },
  { label: "Responsive Web Design", meta: "freeCodeCamp - 2025", kind: "CERT", image: "/certs/fccrwb.webp" },
  { label: "CSS Essentials", meta: "Cisco - 2026", kind: "CERT", image: "/certs/cse.webp" },
  { label: "HTML Essentials", meta: "Cisco - 2025", kind: "CERT", image: "/certs/he.webp" },
  { label: "JavaScript Essentials 2", meta: "Cisco - 2026", kind: "CERT", image: "/certs/je2.webp" },
  { label: "Python Essentials 2", meta: "Cisco - 2024", kind: "CERT", image: "/certs/pe2.webp" },
  { label: "Foundations of UX Design", meta: "Google", kind: "CERT", image: "/certs/cg2.webp" },
  { label: "Figma HighFigh Prototypes", meta: "Google - 2025", kind: "CERT", image: "/certs/cg5.webp" },
  { label: "Dynamic UI for Web", meta: "Google - 2025", kind: "CERT", image: "/certs/cg9.webp" },
];

const N = TILES.length;
const IMG_W = 260;
const IMG_H = 180;
const SLICES = 10;
const SLICE_W = IMG_W / SLICES;
const CYL_R = 400; 
const TOTAL_BEND_DEG = (IMG_W / CYL_R) * (180 / Math.PI);
const STEP_DEG = TOTAL_BEND_DEG / SLICES;

const ORBIT_RX = 480; 
const ORBIT_RZ = 550; 
const TILT_Y = 140; 
const OFF_X = 1200; 
const ENTRY_ANGLE = Math.PI / 2;

const STAGGER = 0.08;
const TOTAL_RANGE = 1 + STAGGER * (N - 1);

function getPos(t: number) {
  if (t <= 0.12) {
    const p = t / 0.12;
    return { x: -OFF_X * (1 - p), y: TILT_Y, z: ORBIT_RZ * p, rotY: 0 };
  }
  if (t <= 0.88) {
    const p = (t - 0.12) / 0.76;
    const angle = ENTRY_ANGLE - p * Math.PI * 2;
    const x = Math.cos(angle) * ORBIT_RX;
    const z = Math.sin(angle) * ORBIT_RZ;
    const ry = p * Math.PI * 2;
    return { x: x, y: (z / ORBIT_RZ) * TILT_Y, z: z, rotY: ry };
  }
  const p = (t - 0.88) / 0.12;
  return { x: OFF_X * p, y: TILT_Y, z: ORBIT_RZ * (1 - p), rotY: Math.PI * 2 };
}

const CurvedImage = ({ src }: { src: string }) => {
  return (
    <div className="relative" style={{ width: IMG_W, height: IMG_H, transformStyle: "preserve-3d" }}>
      {Array.from({ length: SLICES }).map((_, s) => {
        const angle = (s - (SLICES - 1) / 2) * STEP_DEG;
        const displayW = SLICE_W + 1.5;
        return (
          <div
            key={s}
            className="absolute top-0 h-full"
            style={{
              width: `${displayW}px`,
              left: "50%",
              marginLeft: `${-displayW / 2}px`,
              backgroundImage: `url(${src})`,
              backgroundSize: `${IMG_W}px ${IMG_H}px`,
              backgroundPosition: `${-s * SLICE_W}px 0`,
              transformOrigin: `50% 50% ${-CYL_R}px`,
              transform: `rotateY(${angle}deg)`,
              willChange: "transform",
            }}
          />
        );
      })}
    </div>
  );
};

export default function RingScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // DESKTOP: Full scrolling 360 ring
    mm.add("(min-width: 768px)", () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
        onUpdate: (self) => setProgress(self.progress),
      });
    });

    // MOBILE: Lock progress to 0.5 (dead center) so text is always visible
    mm.add("(max-width: 767px)", () => {
      setProgress(0.5);
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  const phraseStart = 0.25;
  const phraseEnd = 0.75;
  let textY = 0;
  let textAlpha = 0;

  if (progress >= phraseStart && progress <= phraseEnd) {
    const globalP = (progress - phraseStart) / (phraseEnd - phraseStart);
    textY = 150 * (0.5 - globalP);
    if (globalP < 0.1) textAlpha = globalP / 0.1;
    else if (globalP > 0.75) textAlpha = (1 - globalP) / 0.25;
    else textAlpha = 1;
  }

  return (
    // Mobile is 100vh. Desktop is 800vh.
    <section id="ring" ref={sectionRef} className="relative h-[100vh] md:h-[800vh] bg-paper">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden border-b border-line">
        
        <div className="pointer-events-none absolute left-6 top-24 z-50 font-mono-x text-[10px] uppercase leading-relaxed text-ink-dim md:left-10">
          <div>04 - Certificates &amp; Milestones</div>
          <div className="text-ink-faint hidden md:block">Gallery - 360 Sequence</div>
        </div>

        <div className="absolute inset-0" style={{ perspective: "1200px" }}>
          <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
            
            {/* ── Dynamic Phrase ── */}
            <div
              className="absolute left-1/2 top-1/2 z-0 w-[min(640px,86vw)]"
              style={{
                transform: `translate(-50%, calc(-50% + ${textY}px)) translateZ(-100px)`,
                opacity: textAlpha,
                willChange: "transform, opacity",
              }}
            >
              <div className="text-center">
                <div className="mb-5 font-mono-x text-[11px] uppercase tracking-[0.5em] text-ink-dim">
                  Milestones
                </div>
                <p className="t-display text-[clamp(26px,4.2vw,54px)] leading-[1.06] text-ink">
                  Every certification is a chance to{" "}
                  <span className="t-serif-i font-normal text-ink-dim">push the limits</span>{" "}
                  of what one engineer can{" "}
                  <span className="t-serif-i font-normal text-ink-dim">ship</span>.
                </p>
              </div>
            </div>

            {/* ── The 360 Image Sequence (Hidden on Mobile) ── */}
            <div className="absolute inset-0 hidden md:block" style={{ transformStyle: "preserve-3d" }}>
              {TILES.map((t, i) => {
                const imgT = progress * TOTAL_RANGE - i * STAGGER;
                if (imgT <= 0 || imgT >= 1) return null;

                const pos = getPos(imgT);
                const rotDeg = (pos.rotY * 180) / Math.PI;
                const depth = (pos.z + ORBIT_RZ) / (ORBIT_RZ * 2);
                const scale = 0.4 + depth * 0.6;
                const blurPx = (1 - depth) * 12;
                const brightness = 0.2 + depth * 0.8;

                let alpha = 1;
                if (imgT < 0.06) alpha = imgT / 0.06;
                else if (imgT > 0.94) alpha = (1 - imgT) / 0.06;

                const zIndex = Math.round(pos.z + 1000);

                return (
                  <div
                    key={t.label}
                    className="absolute left-1/2 top-1/2"
                    style={{
                      width: IMG_W,
                      height: IMG_H,
                      marginLeft: -IMG_W / 2,
                      marginTop: -IMG_H / 2,
                      transform: `translate3d(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px, ${pos.z.toFixed(1)}px) scale(${scale.toFixed(2)}) rotateY(${rotDeg.toFixed(1)}deg)`,
                      opacity: alpha,
                      zIndex: zIndex,
                      filter: `blur(${blurPx.toFixed(1)}px) brightness(${brightness.toFixed(2)})`,
                      transformStyle: "preserve-3d",
                      willChange: "transform, opacity, filter",
                    }}
                  >
                    <CurvedImage src={t.image} />
                    <div
                      className="absolute -bottom-8 left-0 w-full text-center"
                      style={{
                        transform: "translateZ(20px)",
                        opacity: depth > 0.7 ? (depth - 0.7) * 3.33 : 0,
                      }}
                    >
                      <div className="font-mono-x text-[9px] uppercase tracking-[0.2em] text-ink">
                        {t.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* HUD Progress Bar (Hidden on Mobile) */}
        <div className="pointer-events-none absolute inset-x-10 bottom-8 z-50 hidden md:flex items-center gap-4">
          <span className="font-mono-x text-[10px] uppercase tracking-[0.3em] text-ink-dim">
            Sequence Active
          </span>
          <div className="h-px flex-1 bg-line-strong">
            <div className="h-full bg-ink" style={{ width: `${progress * 100}%` }} />
          </div>
          <span className="font-mono-x text-[10px] tabular-nums text-ink-dim">
            {String(Math.round(progress * 100)).padStart(2, "0")}%
          </span>
        </div>

        {/* ── CONTEXTUAL REDIRECT BUTTON (Always visible on mobile) ── */}
        <div
          className={`absolute bottom-16 right-1/2 translate-x-1/2 md:translate-x-0 md:bottom-8 md:right-10 z-[100] transition-all duration-700 ease-out ${
            progress > 0.02 && progress < 0.98
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          <a
            href="/certificates-archive"
            className="group block w-[190px] h-[40px] bg-ink cursor-pointer"
            style={{
              clipPath: "polygon(0% 0%, calc(100% - 10px) 0%, 100% 10px, 100% 100%, 0% 100%)",
            }}
          >
            <div className="relative flex h-full items-center justify-between px-5 font-mono-x text-[10px] font-bold uppercase tracking-[0.2em] text-paper">
              <span>View Archive</span>
              <div className="transition-transform duration-500 group-hover:rotate-90">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75.86 61.58" width="10" height="10" fill="currentColor">
                  <path d="m43.32 30.13 32.54-19.09-13.57-7.29-26.5 18.92-1.35.14L6.84 0 2.85 4.96l23.71 25.79L0 50.99l3.1 10.59 31.88-22.73L59.8 59.79l5.93-4.26-8.22-13.66z"></path>
                </svg>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}