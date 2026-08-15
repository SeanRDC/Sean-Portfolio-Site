import { useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useNavigate, useLocation } from "react-router-dom";
import { TILES } from "../data/certificates";
import type { Tile } from "../data/certificates";

gsap.registerPlugin(ScrollTrigger);

export default function CertificatesArchive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pageFadeRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const randomizedTiles = useMemo(() => {
    const array = [...TILES];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }, []);

  const third = Math.ceil(randomizedTiles.length / 3);
  const row1 = randomizedTiles.slice(0, third);
  const row2 = randomizedTiles.slice(third, third * 2);
  const row3 = randomizedTiles.slice(third * 2);

  useGSAP(
    () => {
      window.scrollTo({ top: 0, behavior: "instant" });

      const cx = location.state?.cx || window.innerWidth / 2;
      const cy = location.state?.cy || window.innerHeight - 100;

      const entryTl = gsap.timeline();

      entryTl.fromTo(pageFadeRef.current, {
        clipPath: `circle(200vmax at ${cx}px ${cy}px)`
      }, {
        clipPath: `circle(0px at ${cx}px ${cy}px)`,
        duration: 1.2,
        ease: "power3.inOut"
      });

      entryTl.fromTo(".sidebar-item", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }, 0.4);

      if (window.innerWidth >= 1024) {
        entryTl.fromTo(".archive-row", { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 1.2, stagger: 0.15, ease: "power3.out" }, 0.4);
      } else {
        entryTl.fromTo(".mob-card", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, 0.4);
      }

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        // Pre-hint the compositor so these layers are promoted BEFORE scroll starts,
        // instead of thrashing style/paint during the scroll itself.
        gsap.set([".scroll-left", ".scroll-right"], {
          force3D: true,
          willChange: "transform"
        });

        // Track pointer-events state in a ref instead of writing to the DOM
        // unconditionally on every scroll tick. Writing style.pointerEvents
        // every onUpdate (even to the same value) forces a style recalc on
        // every frame of the scrub — this was the main source of the stutter.
        let pointerEventsDisabled = false;
        let scrollTimeout: ReturnType<typeof setTimeout>;

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=300%",
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
            onUpdate: () => {
              if (!pointerEventsDisabled && containerRef.current) {
                containerRef.current.style.pointerEvents = "none";
                pointerEventsDisabled = true;
              }
              clearTimeout(scrollTimeout);
              scrollTimeout = setTimeout(() => {
                if (containerRef.current) {
                  containerRef.current.style.pointerEvents = "auto";
                }
                pointerEventsDisabled = false;
              }, 150);
            }
          },
        });

        scrollTl.to(".scroll-left", { xPercent: -50, ease: "none", force3D: true }, 0);
        scrollTl.fromTo(".scroll-right", { xPercent: -50 }, { xPercent: 0, ease: "none", force3D: true }, 0);

        return () => {
          clearTimeout(scrollTimeout);
          gsap.set([".scroll-left", ".scroll-right"], { willChange: "auto" });
        };
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [] }
  );

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const overlay = document.createElement("div");
    overlay.className = "fixed inset-0 z-[9999999] bg-ink pointer-events-none";
    overlay.style.clipPath = `circle(0px at ${cx}px ${cy}px)`;
    document.body.appendChild(overlay);

    gsap.to(overlay, {
      clipPath: `circle(200vmax at ${cx}px ${cy}px)`,
      duration: 1.2,
      ease: "power3.inOut",
      onComplete: () => {
        navigate("/#ring", { state: { returnToRing: true, cx, cy } });
        setTimeout(() => overlay.remove(), 100);
      }
    });
  };

  return (
    <div ref={containerRef} className="min-h-screen lg:h-screen w-full bg-paper font-mono-x text-ink lg:overflow-hidden relative">

      <div
        ref={pageFadeRef}
        className="fixed inset-0 bg-ink z-[9999999] pointer-events-none"
        style={{
          clipPath: `circle(200vmax at ${location.state?.cx || window.innerWidth / 2}px ${location.state?.cy || window.innerHeight / 2}px)`
        }}
      />

      <div className="flex flex-col lg:grid lg:h-full w-full lg:grid-cols-[340px_1fr]">
        <aside className="relative z-20 flex w-full flex-col justify-between border-b lg:border-b-0 lg:border-r border-line bg-paper px-6 py-8 lg:px-8 lg:py-10 lg:h-full">
          <div className="space-y-12">

            <button
              onClick={handleBack}
              className="sidebar-item group flex w-fit items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-ink-dim transition-colors hover:text-ink cursor-pointer bg-transparent border-none p-0 outline-none"
            >
              <svg className="h-3 w-3 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Sequence
            </button>

            <div className="sidebar-item [&_p]:mb-5 [&_p]:text-[9px] [&_p]:uppercase [&_p]:leading-relaxed [&_p]:tracking-[0.15em] [&_p]:text-ink-dim">
              <p className="font-bold text-ink">More than credentials-these are milestones:</p>
              <p>Professional certifications, academic milestones, technical achievements.</p>
              <p>Basic or professional.</p>
            </div>
          </div>

          <div className="flex flex-col -ml-1 mt-12 lg:mt-0">
            <h1 className="sidebar-item t-display text-[48px] uppercase leading-[0.85] tracking-tight text-ink">Archive</h1>
            <h1 className="sidebar-item t-display hidden lg:block text-[48px] uppercase leading-[0.85] tracking-tight text-ink/80">Archive</h1>
            <h1 className="sidebar-item t-display hidden lg:block text-[48px] uppercase leading-[0.85] tracking-tight text-ink/60">Archive</h1>
            <h1 className="sidebar-item t-display hidden lg:block text-[48px] uppercase leading-[0.85] tracking-tight text-ink/40">Archive</h1>
            <h1 className="sidebar-item t-display hidden lg:block text-[48px] uppercase leading-[0.85] tracking-tight text-ink/20">Archive</h1>
          </div>
        </aside>

        <section className="flex lg:hidden w-full flex-col gap-8 bg-paper/50 px-6 py-10">
          {randomizedTiles.map((t, i) => (
            <div key={`mob-${t.label}-${i}`} className="mob-card">
              <ArchiveCard tile={t} index={i} />
            </div>
          ))}
        </section>

        <section className="relative hidden lg:flex h-full w-full flex-col justify-center gap-8 overflow-hidden bg-paper/50 py-10 pl-8">
          <div className="archive-row scroll-left flex w-max gap-8">
            {row1.map((t, i) => <ArchiveCard key={`r1-${t.label}-${i}`} tile={t} index={i} />)}
          </div>
          <div className="archive-row scroll-right flex w-max gap-8">
            {row2.map((t, i) => <ArchiveCard key={`r2-${t.label}-${i}`} tile={t} index={i} />)}
          </div>
          <div className="archive-row scroll-left flex w-max gap-8">
            {row3.map((t, i) => <ArchiveCard key={`r3-${t.label}-${i}`} tile={t} index={i} />)}
          </div>
        </section>
      </div>
    </div>
  );
}

function ArchiveCard({ tile, index }: { tile: Tile; index: number }) {
  return (
    <a href={tile.link || "#"} target={tile.link ? "_blank" : "_self"} rel="noopener noreferrer" className="group block shrink-0 w-full lg:w-[280px] cursor-pointer">
      <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden border border-line bg-ink" style={{ clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)" }}>
        <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between border-b border-paper/30 bg-gradient-to-b from-ink/60 to-transparent px-4 py-3 opacity-80 transition-opacity duration-500 group-hover:opacity-100">
          <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-paper drop-shadow-md">View Credential</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-3 w-3 text-paper drop-shadow-md transition-transform duration-500 group-hover:rotate-45">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M5 19L19 5M5 5h14v14" />
          </svg>
        </div>
        <img src={tile.image} alt={tile.label} draggable={false} decoding="async" fetchPriority={index < 3 ? "high" : "auto"} loading={index < 3 ? "eager" : "lazy"} className="h-full w-full object-cover opacity-80 grayscale transition-[transform,filter,opacity] duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0" />
      </div>
      <div className="flex items-start justify-between border-t border-line pt-3 transition-colors duration-500 group-hover:border-ink">
        <div className="pr-4">
          <div className="mb-1 text-[9px] uppercase tracking-[0.2em] text-ink-dim transition-colors duration-500 group-hover:text-ink/80">{tile.meta}</div>
          <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-ink transition-transform duration-500 group-hover:translate-x-1">{tile.label}</div>
        </div>
        <div className="shrink-0 border border-line px-2 py-1 text-[8px] uppercase tracking-[0.2em] text-ink-dim transition-colors duration-500 group-hover:border-ink group-hover:text-ink hover:bg-ink hover:text-paper">{tile.kind}</div>
      </div>
    </a>
  );
}
