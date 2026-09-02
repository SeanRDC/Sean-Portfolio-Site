import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import StoneCanvas from "../StoneCanvas";

gsap.registerPlugin(ScrollTrigger);

// A smaller, cleaner character set for a sophisticated, slow scramble
const CHARS = "SRDCOIGP";
const getRand = () => CHARS[Math.floor(Math.random() * CHARS.length)];

export default function ApertureScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  
  // References for the SVG letters inside the mask
  const refS = useRef<SVGTextElement>(null);
  const refR = useRef<SVGTextElement>(null);
  const refD = useRef<SVGTextElement>(null);
  const refC = useRef<SVGTextElement>(null);

  const [introDone, setIntroDone] = useState(false);

  useGSAP(
    () => {
      // --- 1. THE OPENING INTRO ANIMATION ---
      const tl = gsap.timeline({
        onStart: () => {
          document.body.style.overflow = "hidden";
          window.scrollTo(0, 0);
        },
        onComplete: () => {
          document.body.style.overflow = "";
          setIntroDone(true);
        },
      });

      let lastStep = -1;
      tl.to({ v: 0 }, {
        v: 100,
        duration: 3.0,
        ease: "none",
        onUpdate: function () {
          const p = this.targets()[0].v;
          const step = Math.floor(p / 6); 
          if (step !== lastStep) {
            lastStep = step;
            if (refS.current) refS.current.textContent = p > 25 ? "S" : getRand();
            if (refR.current) refR.current.textContent = p > 50 ? "R" : getRand();
            if (refD.current) refD.current.textContent = p > 75 ? "D" : getRand();
            if (refC.current) refC.current.textContent = p > 95 ? "C" : getRand();
          }
        },
      });

      tl.to({}, { duration: 0.5 });
      tl.to(
        [refR.current, refD.current, refC.current],
        { opacity: 0, duration: 0.8, ease: "power2.inOut" }
      );
      tl.to(
        refS.current,
        { attr: { x: 50 }, duration: 0.8, ease: "power2.inOut" },
        "<"
      );
      tl.to(
        maskRef.current,
        { scale: 4, duration: 1.5, ease: "power2.inOut" }
      );

      // --- 2. THE PROFILE OVERLAP TRANSITION ---
      gsap.to(containerRef.current, {
        scale: 0.85,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          pin: containerRef.current,
          pinSpacing: false,
          scrub: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="aperture" ref={sectionRef} className="relative h-screen">
      <div 
        ref={containerRef}
        className="sticky top-0 h-screen w-full overflow-hidden bg-paper origin-center will-change-transform"
      >
        <div className="absolute inset-0">
          <StoneCanvas
            className="block h-full w-full"
            seed={0.5}
            tint={0.6}
            flow={0.7}
            contrast={0.7}
            interactive
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 47%, rgba(19,18,16,0.32) 0%, rgba(19,18,16,0.05) 30%, transparent 55%)",
            }}
          />
        </div>
        
        {/* alabaster plane with the animated SRDC mask */}
        <div
          ref={maskRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            transformOrigin: "50% 47%",
            willChange: "transform, opacity",
          }}
        >
          <svg
            className="h-full w-full pointer-events-auto"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <mask id="s-cut">
                <rect width="100" height="100" fill="white" />
                
                {/* The SRDC Letters */}
                <text ref={refS} x="20" y="49" fill="black" textAnchor="middle" dominantBaseline="central" fontFamily="Archivo, sans-serif" fontWeight="900" fontSize="24" style={{ fontStretch: "expanded", letterSpacing: "-0.04em" }}>S</text>
                <text ref={refR} x="40" y="49" fill="black" textAnchor="middle" dominantBaseline="central" fontFamily="Archivo, sans-serif" fontWeight="900" fontSize="24" style={{ fontStretch: "expanded", letterSpacing: "-0.04em" }}>R</text>
                <text ref={refD} x="60" y="49" fill="black" textAnchor="middle" dominantBaseline="central" fontFamily="Archivo, sans-serif" fontWeight="900" fontSize="24" style={{ fontStretch: "expanded", letterSpacing: "-0.04em" }}>D</text>
                <text ref={refC} x="80" y="49" fill="black" textAnchor="middle" dominantBaseline="central" fontFamily="Archivo, sans-serif" fontWeight="900" fontSize="24" style={{ fontStretch: "expanded", letterSpacing: "-0.04em" }}>C</text>
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
          className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ${introDone ? "opacity-100" : "opacity-0"}`}
        >
          <div className="absolute left-6 top-24 font-mono-x text-[10px] uppercase leading-relaxed text-ink-dim md:left-10">
            <div>Full Stack Developer</div>
            <div className="text-ink-faint">AI Automation</div>
          </div>
          <div className="absolute right-6 top-24 text-right font-mono-x text-[10px] uppercase leading-relaxed text-ink-dim md:right-10">
            <div>Personal Portfolio</div>
            <div className="text-ink-faint">Portfolio V5</div>
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
              <span className="font-mono-x text-[11px] text-ink"> </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}