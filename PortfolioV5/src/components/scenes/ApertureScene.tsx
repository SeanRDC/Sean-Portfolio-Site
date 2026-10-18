import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLocation } from "react-router-dom";
import StoneCanvas from "../StoneCanvas";
import { carveIntro } from "../intro/carveIntro";

gsap.registerPlugin(ScrollTrigger);

const ZOOM = 1.1;

// Wait for the intro face so outlines are measured against the real letters,
// but never hold the page back for more than a moment.
const fontReady = () =>
  Promise.race([
    document.fonts.load("900 expanded 24px Archivo").catch(() => {}),
    new Promise((r) => setTimeout(r, 2500)),
  ]);

export default function ApertureScene() {
  const location = useLocation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<SVGGElement>(null);

  // References for the SVG letters inside the mask
  const refS = useRef<SVGTextElement>(null);
  const refR = useRef<SVGTextElement>(null);
  const refD = useRef<SVGTextElement>(null);
  const refC = useRef<SVGTextElement>(null);

  // Initialize as true ONLY if returning from the certificates archive
  const [introDone, setIntroDone] = useState(!!location.state?.returnToRing);

  useGSAP(
    (_, contextSafe) => {
      const hasPlayed = location.state?.returnToRing;
      const letters = { S: refS.current!, R: refR.current!, D: refD.current!, C: refC.current! };
      const rest = [letters.R, letters.D, letters.C];

      const reveal = () => {
        setIntroDone(true);
        // Lets the Nav fade in together with the HUD labels
        window.dispatchEvent(new CustomEvent("introDone"));
      };
      const finalState = () => {
        gsap.set(maskRef.current, { scale: 4 });
        gsap.set(rest, { opacity: 0 });
        gsap.set(letters.S, { opacity: 1, attr: { x: 50 } });
      };

      let cancelled = false;
      let tl: gsap.core.Timeline | null = null;
      const skip = () => tl?.progress(1);
      const skipEvents = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
      const unlock = () => {
        document.body.style.overflow = "";
        skipEvents.forEach((ev) => window.removeEventListener(ev, skip));
      };

      if (hasPlayed) {
        // If returning to the page from the archive, instantly set to final state & skip locking
        setIntroDone(true);
        finalState();
      } else if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        // Reduced motion: no zoom or travel, just the labels fading in.
        finalState();
        reveal();
      } else {
        // --- 1. THE OPENING INTRO ANIMATION ---
        document.body.style.overflow = "hidden";
        window.scrollTo(0, 0);
        // Nothing shows until the font is ready, so no fallback letters flash.
        gsap.set([letters.S, ...rest], { opacity: 0 });

        fontReady().then(contextSafe!(() => {
          if (cancelled) return;
          tl = gsap.timeline({ onComplete: unlock });
          tl.add(carveIntro({ letters, overlay: overlayRef.current! }));
          tl.to(maskRef.current, { scale: 4, duration: ZOOM, ease: "power2.inOut", force3D: false });
          // Start the labels' fade during the zoom so the two read as one move.
          tl.call(reveal, [], `-=${ZOOM * 0.3}`);
          skipEvents.forEach((ev) => window.addEventListener(ev, skip, { passive: true }));
        }));
      }

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

      return () => {
        cancelled = true;
        unlock();
        overlayRef.current?.replaceChildren();
      };
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
            {/* chisel lines the intro draws on the plane */}
            <g ref={overlayRef} mask="url(#s-cut)" />
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
            <h1 className="t-label m-0 px-6 text-center text-[12px] uppercase leading-relaxed tracking-[0.4em] text-ink-soft">
              Sean Dela Cruz
              <span className="hidden md:inline"> - </span>
              <br className="md:hidden" />
              Developer &amp; Engineer
            </h1>
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