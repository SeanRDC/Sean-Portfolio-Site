import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type Tile = { label: string; meta: string; kind: string; image: string };

const TILES: Tile[] = [
  // ── Original 8 ────────────────────────────────────────────────────────────
  {
    label: "Introduction to Networks",
    meta: "Cisco - Certified",
    kind: "CERT",
    image: "/certs/itn.webp",
  },
  {
    label: "Google Ux Design",
    meta: "Professional - 2025",
    kind: "CERT",
    image: "/certs/cg1.webp",
  },
  {
    label: "Relational Database",
    meta: "freeCodeCamp - 2026",
    kind: "CERT",
    image: "/certs/fccrdb.webp",
  },
  {
    label: "Responsive Web Design",
    meta: "freeCodeCamp - 2025",
    kind: "CERT",
    image: "/certs/fccrwb.webp",
  },
  {
    label: "CSS Essentials",
    meta: "Cisco - 2026",
    kind: "CERT",
    image: "/certs/cse.webp",
  },
  {
    label: "HTML Essentials",
    meta: "Cisco - 2025",
    kind: "CERT",
    image: "/certs/he.webp",
  },
  {
    label: "JavaScript Essentials 1",
    meta: "Cisco - 2025",
    kind: "CERT",
    image: "/certs/je1.webp",
  },
  {
    label: "JavaScript Essentials 2",
    meta: "Cisco - 2026",
    kind: "CERT",
    image: "/certs/je2.webp",
  },
  // ── 10 new ────────────────────────────────────────────────────────────────
  {
    label: "Python Essentials 1",
    meta: "Cisco - 2024",
    kind: "CERT",
    image: "/certs/pe1.webp",
  },
  {
    label: "Python Essentials 2",
    meta: "Cisco - 2024",
    kind: "CERT",
    image: "/certs/pe2.webp",
  },
  {
    label: "Foundations of UX Design",
    meta: "Google",
    kind: "CERT",
    image: "/certs/cg2.webp",
  },
  {
    label: "UX Design Process",
    meta: "Google - 2025",
    kind: "CERT",
    image: "/certs/cg4.webp",
  },
  {
    label: "Figma HighFigh Prototypes",
    meta: "Google - 2025",
    kind: "CERT",
    image: "/certs/cg5.webp",
  },
  {
    label: "UX Research",
    meta: "Goole - 2025",
    kind: "CERT",
    image: "/certs/cg7.webp",
  },
  {
    label: "Wireframes & LowFigh Protoypes",
    meta: "Google - 2025",
    kind: "CERT",
    image: "/certs/cg8.webp",
  },
  {
    label: "Dynamic UI for Web",
    meta: "Google - 2025",
    kind: "CERT",
    image: "/certs/cg9.webp",
  },
  {
    label: "Git Training",
    meta: "SimpliLearn - 2025",
    kind: "CERT",
    image: "/certs/gt.webp",
  },
  {
    label: "Git & GitHub",
    meta: "Linkedin - 2025",
    kind: "CERT",
    image: "/certs/lgag.webp",
  },
];

const N = TILES.length; // 18 cards
const RADIUS = 580; // wider ring to seat 18 cards comfortably
const STEP = 360 / N;
const SPIN = 480; // slightly more spin to show every card
const OFF = 1200;

function clamp01(x: number) {
  return Math.min(1, Math.max(0, x));
}
function ease(t: number) {
  return t * t * (3 - 2 * t);
}

export default function RingScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        onUpdate: (self) => setProgress(self.progress),
      });
    },
    { scope: sectionRef },
  );

  const spin = progress * SPIN;
  const captionFade =
    clamp01((progress - 0.02) / 0.05) * (1 - clamp01((progress - 0.95) / 0.05));

  return (
    <section id="ring" ref={sectionRef} className="relative h-[600vh] bg-paper">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden border-b border-line">
        {/* Section label */}
        <div className="pointer-events-none absolute left-6 top-24 z-20 font-mono-x text-[10px] uppercase leading-relaxed text-ink-dim md:left-10">
          <div>04 - Certificates &amp; Milestones</div>
          <div className="text-ink-faint">Orbit - Dual Track</div>
        </div>

        {/* ── 3-D ring ── */}
        <div className="absolute inset-0" style={{ perspective: "1150px" }}>
          <div
            className="absolute inset-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            {TILES.map((t, i) => {
              // 1. Core spatial math
              const angle = i * STEP + spin;
              const rad = (angle * Math.PI) / 180;
              const x = Math.sin(rad) * RADIUS;
              const z = Math.cos(rad) * RADIUS;
              const frontness = (z / RADIUS + 1) / 2;

              // 2. Staggered enter / exit
              const sliceSize = 0.3 / N;
              const enterStart = i * sliceSize;
              const enterT = ease(clamp01((progress - enterStart) / sliceSize));
              const exitStart = 0.7 + i * sliceSize;
              const exitT = ease(clamp01((progress - exitStart) / sliceSize));
              const slideX = (1 - enterT) * OFF - exitT * OFF;

              // 3. Dual-track Y split
              const targetY = i % 2 === 0 ? -220 : 220;
              const currentY = targetY * enterT * (1 - exitT);

              // 4. Depth of field
              const scale = 0.75 + frontness * 0.25;
              const blurAmount = (1 - frontness) * 6;
              const opacity = enterT * (1 - exitT) * (0.15 + 0.85 * frontness);

              return (
                <div
                  key={t.label}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    width: 300,
                    height: 212,
                    marginLeft: -150,
                    marginTop: -106,
                    transform: `translateX(${x + slideX}px) translateY(${currentY}px) translateZ(${z}px) scale(${scale})`,
                    filter: `blur(${blurAmount}px)`,
                    opacity,
                    willChange: "transform, opacity, filter",
                  }}
                >
                  <img
                    src={t.image}
                    alt={t.label}
                    draggable={false}
                    className="h-full w-full object-cover"
                    style={{
                      display: "block",
                      boxShadow: `0 ${8 * frontness}px ${32 * frontness}px rgba(0,0,0,${0.1 + 0.2 * frontness})`,
                    }}
                  />
                </div>
              );
            })}

            {/* ── Centered caption ── */}
            <div
              className="absolute left-1/2 top-1/2 w-[min(640px,86vw)]"
              style={{
                transform: "translate(-50%, -50%) translateZ(0px)",
                opacity: captionFade,
              }}
            >
              <div className="text-center">
                <div className="mb-5 font-mono-x text-[11px] uppercase tracking-[0.5em] text-ink-dim">
                  Milestones
                </div>
                <p className="t-display text-[clamp(26px,4.2vw,54px)] leading-[1.06] text-ink">
                  Every certification is a chance to{" "}
                  <span className="t-serif-i font-normal text-ink-dim">
                    push the limits
                  </span>{" "}
                  of what one engineer can{" "}
                  <span className="t-serif-i font-normal text-ink-dim">
                    ship
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Edge vignettes */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-40 bg-gradient-to-r from-paper to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-40 bg-gradient-to-l from-paper to-transparent" />

        {/* Progress bar */}
        <div className="pointer-events-none absolute inset-x-6 bottom-8 z-20 flex items-center gap-4 md:inset-x-10">
          <span className="font-mono-x text-[10px] uppercase tracking-[0.3em] text-ink-dim">
            Enter - spin - exit
          </span>
          <div className="h-px flex-1 bg-line-strong">
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
    </section>
  );
}
