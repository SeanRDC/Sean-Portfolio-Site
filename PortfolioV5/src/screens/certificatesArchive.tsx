import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";
import { TILES } from "../data/certificates";
import { usePageTitle } from "../lib/usePageTitle";
import { holdCover, whenSettled, wipeCover, wipeReveal } from "../lib/circleWipe";

// The preview is 340px wide; the full scans are up to 4961px and stalled the
// page decoding on hover. public/certs/preview holds 720px copies.
const previewOf = (image: string) => image.replace("/certs/", "/certs/preview/");

export default function CertificatesArchive() {
  usePageTitle("Certificates | Sean Dela Cruz");

  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewImgRef = useRef<HTMLImageElement>(null);

  const xMovePreview = useRef<gsap.QuickToFunc | null>(null);
  const yMovePreview = useRef<gsap.QuickToFunc | null>(null);

  const navigate = useNavigate();

  // Arriving from the ring, the ink circle is still covering the screen; on a
  // direct load, cover it here before the first paint.
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    holdCover();
  }, []);

  useGSAP(
    () => {
      // Setup the quickTo functions for the floating preview
      if (previewRef.current) {
        // Transforms instead of left/top so following the mouse never triggers layout
        gsap.set(previewRef.current, { xPercent: -50, yPercent: -50 });
        xMovePreview.current = gsap.quickTo(previewRef.current, "x", {
          duration: 0.3,
          ease: "power3",
        });
        yMovePreview.current = gsap.quickTo(previewRef.current, "y", {
          duration: 0.3,
          ease: "power3",
        });
      }
    },
    { scope: containerRef }
  );

  // Reveal only once the route swap has finished its work, so nothing competes
  // with the wipe. The rows and sidebar rise in with CSS animations (index.css),
  // which the compositor runs without reading styles back.
  useEffect(() => {
    let cancelled = false;
    whenSettled().then(() => {
      if (cancelled) return;
      wipeReveal();
      containerRef.current?.classList.add("archive-in");

      // Warm the hover previews for mouse users, one at a time in idle time.
      if (!window.matchMedia("(hover: hover)").matches) return;
      const queue = [...new Set(TILES.map((t) => previewOf(t.image)))];
      const next = () => {
        const src = queue.shift();
        if (!src || cancelled) return;
        const img = new Image();
        img.src = src;
        img.decode().catch(() => {}).finally(() => window.requestIdleCallback?.(next) ?? setTimeout(next, 50));
      };
      next();
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    wipeCover(rect.left + rect.width / 2, rect.top + rect.height / 2).then(() =>
      navigate("/#ring", { state: { returnToRing: true } }),
    );
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (xMovePreview.current && yMovePreview.current) {
      xMovePreview.current(e.clientX);
      yMovePreview.current(e.clientY);
    }
  };

  const handleMouseEnter = (image: string) => {
    // Swapped on the element directly: a state update re-rendered all 45 rows.
    const img = previewImgRef.current;
    const src = previewOf(image);
    if (img && img.getAttribute("src") !== src) img.src = src;
    gsap.to(previewRef.current, {
      scale: 1,
      autoAlpha: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(previewRef.current, {
      scale: 0.8,
      autoAlpha: 0,
      duration: 0.3,
      ease: "power2.in",
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen w-full bg-paper font-mono-x text-ink relative"
    >
      {/* Floating Image Preview */}
      <div
        ref={previewRef}
        className="pointer-events-none fixed left-0 top-0 z-50 w-[260px] md:w-[340px] aspect-[4/3] overflow-hidden border border-line bg-ink shadow-2xl opacity-0 scale-90"
      >
        <img
          ref={previewImgRef}
          alt="Preview"
          decoding="async"
          className="w-full h-full object-cover opacity-90"
        />
      </div>

      <div className="flex flex-col lg:grid lg:min-h-screen w-full lg:grid-cols-[340px_1fr]">
        
        {/* Sticky Sidebar */}
        <aside className="relative z-20 flex w-full flex-col justify-between border-b lg:border-b-0 lg:border-r border-line bg-paper px-6 py-8 lg:px-8 lg:py-10 lg:h-screen lg:sticky lg:top-0">
          <div className="space-y-12">
            <button
              onClick={handleBack}
              style={{ "--i": 0 } as React.CSSProperties}
              className="sidebar-item group flex w-fit items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-ink-dim transition-colors hover:text-ink cursor-pointer bg-transparent border-none p-0 outline-none"
            >
              <svg
                className="h-3 w-3 transition-transform duration-300 group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  strokeWidth="2"
                  d="M19 12H5M12 19l-7-7 7-7"
                />
              </svg>
              Back to Sequence
            </button>
            <div style={{ "--i": 1 } as React.CSSProperties}
              className="sidebar-item [&_p]:mb-5 [&_p]:text-[9px] [&_p]:uppercase [&_p]:leading-relaxed [&_p]:tracking-[0.15em] [&_p]:text-ink-dim">
              <p className="font-bold text-ink">
                More than credentials—these are milestones:
              </p>
              <p>Professional certifications, academic milestones, technical achievements.</p>
              <p>Total: {TILES.length} Records.</p>
            </div>
          </div>
          
          <div className="flex flex-col -ml-1 mt-12 lg:mt-0">
            <h1 style={{ "--i": 2 } as React.CSSProperties}
              className="sidebar-item t-display text-[48px] uppercase leading-[0.85] tracking-tight text-ink">Archive</h1>
            <h1 style={{ "--i": 3 } as React.CSSProperties}
              className="sidebar-item t-display hidden lg:block text-[48px] uppercase leading-[0.85] tracking-tight text-ink/80">Archive</h1>
            <h1 style={{ "--i": 4 } as React.CSSProperties}
              className="sidebar-item t-display hidden lg:block text-[48px] uppercase leading-[0.85] tracking-tight text-ink/60">Archive</h1>
            <h1 style={{ "--i": 5 } as React.CSSProperties}
              className="sidebar-item t-display hidden lg:block text-[48px] uppercase leading-[0.85] tracking-tight text-ink/40">Archive</h1>
            <h1 style={{ "--i": 6 } as React.CSSProperties}
              className="sidebar-item t-display hidden lg:block text-[48px] uppercase leading-[0.85] tracking-tight text-ink/20">Archive</h1>
          </div>
        </aside>

        {/* List Content */}
        <section className="flex flex-col w-full bg-paper/50 pb-20">
          {TILES.map((t, i) => (
            <a
              key={`list-${i}`}
              href={t.link || "#"}
              target={t.link ? "_blank" : "_self"}
              rel="noopener noreferrer"
              onMouseEnter={() => handleMouseEnter(t.image)}
              onMouseLeave={handleMouseLeave}
              style={{ "--i": i } as React.CSSProperties}
              className="list-item group flex flex-col sm:flex-row sm:items-center justify-between border-b border-line px-6 py-6 md:px-12 md:py-8 hover:bg-ink/[0.02] transition-colors cursor-pointer"
            >
              <div className="flex flex-col pr-4">
                <span className="text-[14px] md:text-[16px] font-bold uppercase tracking-[0.1em] text-ink group-hover:translate-x-2 transition-transform duration-300">
                  {t.label}
                </span>
                <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-ink-dim mt-2 md:mt-3">
                  {t.meta}
                </span>
              </div>
              
              <div className="mt-5 sm:mt-0 shrink-0 border border-line px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-ink-dim transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper w-fit">
                {t.kind}
              </div>
            </a>
          ))}
        </section>
        
      </div>
    </div>
  );
}