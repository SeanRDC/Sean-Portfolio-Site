import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type Tile = { label: string; meta: string; kind: string; image: string };

const TILES: Tile[] = [
  {
    label: "Google Ux Design",
    meta: "Professional - 2025",
    kind: "CERT",
    image: "/certs/cg1.webp",
  },
  {
    label: "IBM AI Developer",
    meta: "Professional - 2026",
    kind: "CERT",
    image: "/certs/IBM/IBM.webp",
  },
  {
    label: "OWASP Top 10 - 2021",
    meta: "Infosec - 2026",
    kind: "CERT",
    image: "/certs/OWASP.webp",
  },
  {
    label: "AI Fluency: Capabilities & Limitations",
    meta: "Antrophic Academy - 2026",
    kind: "CERT",
    image: "/certs/Antrophic/A1.webp",
  },
  {
    label: "JavaScript Essentials 2",
    meta: "Cisco - 2026",
    kind: "CERT",
    image: "/certs/je2.webp",
  },
  {
    label: "Python for Data Science, AI & Development",
    meta: "IBM - 2026",
    kind: "CERT",
    image: "/certs/IBM/I5.webp",
  },
  {
    label: "Foundations of UX Design",
    meta: "Google",
    kind: "CERT",
    image: "/certs/cg2.webp",
  },
  {
    label: "Building Gen AI Powered Apps",
    meta: "IBM - 2026",
    kind: "CERT",
    image: "/certs/IBM/I7.webp",
  },
  {
    label: "Dynamic UI for Web",
    meta: "Google - 2025",
    kind: "CERT",
    image: "/certs/cg9.webp",
  },
];

const N = TILES.length;
const IMG_W = 360;
const IMG_H = 260;
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
    <div
      className="relative"
      style={{ width: IMG_W, height: IMG_H, transformStyle: "preserve-3d" }}
    >
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
              imageRendering: "crisp-edges" as any,
              backfaceVisibility: "hidden",
            }}
          />
        );
      })}
    </div>
  );
};

export default function RingScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const returnOverlayRef = useRef<HTMLDivElement>(null);

  const ringItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const returnBtnRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const updateRing = (p: number) => {
    if (progressBarRef.current)
      progressBarRef.current.style.width = `${p * 100}%`;
    if (progressTextRef.current)
      progressTextRef.current.innerText = `${String(Math.round(p * 100)).padStart(2, "0")}%`;

    const phraseStart = 0.25;
    const phraseEnd = 0.75;
    if (textContainerRef.current) {
      let textY = 0;
      let textAlpha = 0;
      if (p >= phraseStart && p <= phraseEnd) {
        const globalP = (p - phraseStart) / (phraseEnd - phraseStart);
        textY = 150 * (0.5 - globalP);
        if (globalP < 0.1) textAlpha = globalP / 0.1;
        else if (globalP > 0.75) textAlpha = (1 - globalP) / 0.25;
        else textAlpha = 1;
      }
      textContainerRef.current.style.transform = `translate(-50%, calc(-50% + ${textY}px)) translateZ(-100px)`;
      textContainerRef.current.style.opacity = textAlpha.toString();
    }

    ringItemsRef.current.forEach((el, i) => {
      if (!el) return;
      const imgT = p * TOTAL_RANGE - i * STAGGER;

      if (imgT <= 0 || imgT >= 1) {
        el.style.opacity = "0";
        return;
      }

      const pos = getPos(imgT);
      const rotDeg = (pos.rotY * 180) / Math.PI;
      const depth = (pos.z + ORBIT_RZ) / (ORBIT_RZ * 2);
      
      const scale = 0.2 + depth * 0.4;
      const rawBlur = (1 - depth) * 12;
      const blurPx = rawBlur < 1.5 ? 0 : rawBlur;
      
      const brightness = 0.2 + depth * 0.8;

      let alpha = 1;
      if (imgT < 0.06) alpha = imgT / 0.06;
      else if (imgT > 0.94) alpha = (1 - imgT) / 0.06;

      const zIndex = Math.round(pos.z + 1000);

      el.style.transform = `translate3d(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px, ${pos.z.toFixed(1)}px) scale(${scale.toFixed(2)}) rotateY(${rotDeg.toFixed(1)}deg)`;
      el.style.opacity = alpha.toString();
      el.style.zIndex = zIndex.toString();
      el.style.filter = `blur(${blurPx.toFixed(1)}px) brightness(${brightness.toFixed(2)})`;

      const labelEl = el.querySelector(".cert-label") as HTMLElement;
      if (labelEl) {
        labelEl.style.opacity =
          depth > 0.7 ? ((depth - 0.7) * 3.33).toString() : "0";
      }
    });

    if (returnBtnRef.current) {
      if (p > 0.02 && p < 0.98) {
        returnBtnRef.current.style.opacity = "1";
        returnBtnRef.current.style.transform = "translateY(0px)";
        returnBtnRef.current.style.pointerEvents = "auto";
      } else {
        returnBtnRef.current.style.opacity = "0";
        returnBtnRef.current.style.transform = "translateY(2rem)";
        returnBtnRef.current.style.pointerEvents = "none";
      }
    }
  };

  useGSAP(
    () => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        if (!location.state?.returnToRing) updateRing(0);

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
          onUpdate: (self) => updateRing(self.progress),
        });
      });

      mm.add("(max-width: 767px)", () => {
        updateRing(0.5);
      });

      // --- REVERSE ANIMATION IF RETURNING FROM ARCHIVE ---
      if (location.state?.returnToRing && returnOverlayRef.current) {
        updateRing(0.5);

        window.history.replaceState({}, document.title);

        requestAnimationFrame(() => {
          if (window.innerWidth >= 768) {
            const st = ScrollTrigger.getAll().find(
              (s) => s.trigger === sectionRef.current,
            );
            if (st) {
              window.scrollTo({
                top: st.start + (st.end - st.start) / 2,
                behavior: "instant",
              });
            }
          } else {
            if (sectionRef.current) {
              const y =
                sectionRef.current.getBoundingClientRect().top + window.scrollY;
              window.scrollTo({ top: y, behavior: "instant" });
            }
          }

          let cx = window.innerWidth / 2;
          let cy = window.innerHeight - 100;
          if (returnBtnRef.current) {
            const rect = returnBtnRef.current.getBoundingClientRect();
            cx = rect.left + rect.width / 2;
            cy = rect.top + rect.height / 2;
          }

          // Updated to 200vmax here as well!
          gsap.fromTo(
            returnOverlayRef.current,
            { clipPath: `circle(200vmax at ${cx}px ${cy}px)` },
            {
              clipPath: `circle(0px at ${cx}px ${cy}px)`,
              duration: 1.2,
              ease: "power3.inOut",
              delay: 0.1,
            },
          );
        });
      }

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  const handleNavigate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const overlay = document.createElement("div");
    overlay.className = "fixed inset-0 z-[9999999] bg-ink pointer-events-none";
    overlay.style.clipPath = `circle(0px at ${cx}px ${cy}px)`;
    document.body.appendChild(overlay);

    // Updated to 200vmax for full mobile coverage
    gsap.to(overlay, {
      clipPath: `circle(200vmax at ${cx}px ${cy}px)`,
      duration: 1.2,
      ease: "power3.inOut",
      onComplete: () => {
        navigate("/certificates-archive", { state: { cx, cy } });
        setTimeout(() => overlay.remove(), 100);
      },
    });
  };

  return (
    <section
      id="ring"
      ref={sectionRef}
      className="relative h-[100vh] md:h-[800vh] bg-paper"
    >
      {/* ── RETURN OVERLAY ── */}
      <div
        ref={returnOverlayRef}
        className="fixed inset-0 bg-ink z-[9999999] pointer-events-none"
        style={{
          display: location.state?.returnToRing ? "block" : "none",
          clipPath: `circle(200vmax at ${location.state?.cx || window.innerWidth / 2}px ${location.state?.cy || window.innerHeight / 2}px)`,
        }}
      />

      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute left-6 top-24 z-50 font-mono-x text-[10px] uppercase leading-relaxed text-ink-dim md:left-10">
          <div>04 - Certificates &amp; Milestones</div>
          <div className="text-ink-faint hidden md:block">
            Gallery - 360 Sequence
          </div>
        </div>

        <div className="absolute inset-0" style={{ perspective: "1200px" }}>
            <div
              className="absolute inset-0"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Scattered Background Certificates */}
              <div className="absolute inset-0 z-[-1] pointer-events-none overflow-hidden">
                <img src={TILES[0].image} alt="" className="absolute top-[5%] -left-[10%] w-[220px] md:w-[320px] -rotate-12 opacity-[0.3] md:opacity-[0.03] blur-sm" />
                <img src={TILES[1].image} alt="" className="absolute top-[30%] -right-[20%] w-[260px] md:w-[380px] rotate-12 opacity-[0.3] md:opacity-[0.03] blur-md" />
                <img src={TILES[2].image} alt="" className="absolute bottom-[20%] -left-[15%] w-[200px] md:w-[280px] rotate-6 opacity-[0.3] md:opacity-[0.03] blur-sm" />
                <img src={TILES[3].image} alt="" className="absolute -bottom-[5%] -right-[10%] w-[240px] md:w-[340px] -rotate-6 opacity-[0.3] md:opacity-[0.03] blur-sm" />
              </div>

              <div
                ref={textContainerRef}
                className="absolute left-1/2 top-1/2 z-0 w-[min(720px,90vw)]"
                style={{ willChange: "transform, opacity" }}
              >
                <div className="text-center">
                  <div className="mb-5 font-mono-x text-[11px] uppercase tracking-[0.5em] text-ink-dim">
                    Milestones
                  </div>
                  <p className="t-display text-[32px] sm:text-[40px] md:text-[clamp(36px,5vw,64px)] leading-[1.1] md:leading-[1.06] text-ink">
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

            <div
              className="absolute inset-0 hidden md:block"
              style={{ transformStyle: "preserve-3d" }}
            >
              {TILES.map((t, i) => (
                <div
                  key={t.label}
                  ref={(el) => {
                    ringItemsRef.current[i] = el;
                  }}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    width: IMG_W,
                    height: IMG_H,
                    marginLeft: -IMG_W / 2,
                    marginTop: -IMG_H / 2,
                    opacity: 0,
                    transformStyle: "preserve-3d",
                    willChange: "transform, opacity, filter",
                  }}
                >
                  <CurvedImage src={t.image} />
                  <div
                    className="cert-label absolute -bottom-8 left-0 w-full text-center"
                    style={{ transform: "translateZ(20px)", opacity: 0 }}
                  >
                    <div className="font-mono-x text-[9px] uppercase tracking-[0.2em] text-ink">
                      {t.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-10 bottom-8 z-50 hidden md:flex items-center gap-4">
          <span className="font-mono-x text-[10px] uppercase tracking-[0.3em] text-ink-dim">
            Sequence Active
          </span>
          <div className="h-px flex-1 bg-line-strong">
            <div
              ref={progressBarRef}
              className="h-full bg-ink"
              style={{ width: "0%" }}
            />
          </div>
          <span
            ref={progressTextRef}
            className="font-mono-x text-[10px] tabular-nums text-ink-dim"
          >
            00%
          </span>
        </div>

        <div className="absolute bottom-16 right-1/2 translate-x-1/2 md:translate-x-0 md:bottom-8 md:right-10 z-[100]">
          <div
            ref={returnBtnRef}
            className="transition-transform duration-700 ease-out opacity-0 pointer-events-none translate-y-8"
          >
            <button
              onClick={handleNavigate}
              className="group block w-[190px] h-[40px] bg-ink cursor-pointer outline-none border-none p-0"
              style={{
                clipPath:
                  "polygon(0% 0%, calc(100% - 10px) 0%, 100% 10px, 100% 100%, 0% 100%)",
              }}
            >
              <div className="relative flex h-full items-center justify-between px-5 font-mono-x text-[10px] font-bold uppercase tracking-[0.2em] text-paper">
                <span>View Archive</span>
                <div className="transition-transform duration-500 group-hover:rotate-90">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 75.86 61.58"
                    width="10"
                    height="10"
                    fill="currentColor"
                  >
                    <path d="m43.32 30.13 32.54-19.09-13.57-7.29-26.5 18.92-1.35.14L6.84 0 2.85 4.96l23.71 25.79L0 50.99l3.1 10.59 31.88-22.73L59.8 59.79l5.93-4.26-8.22-13.66z"></path>
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
