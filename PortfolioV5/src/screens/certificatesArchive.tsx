import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavigate, useLocation } from "react-router-dom";
import { TILES } from "../data/certificates";

export default function CertificatesArchive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pageFadeRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  
  const xMovePreview = useRef<gsap.QuickToFunc | null>(null);
  const yMovePreview = useRef<gsap.QuickToFunc | null>(null);
  
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useGSAP(
    () => {
      window.scrollTo({ top: 0, behavior: "instant" });
      
      // Setup the quickTo functions for the floating preview
      if (previewRef.current) {
        xMovePreview.current = gsap.quickTo(previewRef.current, "left", {
          duration: 0.3,
          ease: "power3",
        });
        yMovePreview.current = gsap.quickTo(previewRef.current, "top", {
          duration: 0.3,
          ease: "power3",
        });
      }

      // Entry Animation (Circular Reveal)
      const cx = location.state?.cx || window.innerWidth / 2;
      const cy = location.state?.cy || window.innerHeight - 100;

      const entryTl = gsap.timeline();
      entryTl.fromTo(
        pageFadeRef.current,
        { clipPath: `circle(200vmax at ${cx}px ${cy}px)` },
        {
          clipPath: `circle(0px at ${cx}px ${cy}px)`,
          duration: 1.2,
          ease: "power3.inOut",
        }
      );
      
      // Stagger in the sidebar and list items
      entryTl.fromTo(
        ".sidebar-item",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        0.4
      );
      entryTl.fromTo(
        ".list-item",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.03, ease: "power2.out" },
        0.6
      );
    },
    { scope: containerRef }
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
      },
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (xMovePreview.current && yMovePreview.current) {
      xMovePreview.current(e.clientX);
      yMovePreview.current(e.clientY);
    }
  };

  const handleMouseEnter = (image: string) => {
    setActiveImage(image);
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
        className="pointer-events-none fixed z-50 w-[260px] md:w-[340px] aspect-[4/3] overflow-hidden border border-line bg-ink shadow-2xl opacity-0 scale-90 -translate-x-1/2 -translate-y-1/2"
      >
        {activeImage && (
          <img
            src={activeImage}
            alt="Preview"
            className="w-full h-full object-cover opacity-90"
          />
        )}
      </div>

      {/* Entry/Exit Circular Overlay */}
      <div
        ref={pageFadeRef}
        className="fixed inset-0 bg-ink z-[9999999] pointer-events-none"
        style={{
          clipPath: `circle(200vmax at ${location.state?.cx || window.innerWidth / 2}px ${
            location.state?.cy || window.innerHeight / 2
          }px)`,
        }}
      />

      <div className="flex flex-col lg:grid lg:min-h-screen w-full lg:grid-cols-[340px_1fr]">
        
        {/* Sticky Sidebar */}
        <aside className="relative z-20 flex w-full flex-col justify-between border-b lg:border-b-0 lg:border-r border-line bg-paper px-6 py-8 lg:px-8 lg:py-10 lg:h-screen lg:sticky lg:top-0">
          <div className="space-y-12">
            <button
              onClick={handleBack}
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
            <div className="sidebar-item [&_p]:mb-5 [&_p]:text-[9px] [&_p]:uppercase [&_p]:leading-relaxed [&_p]:tracking-[0.15em] [&_p]:text-ink-dim">
              <p className="font-bold text-ink">
                More than credentials—these are milestones:
              </p>
              <p>Professional certifications, academic milestones, technical achievements.</p>
              <p>Total: {TILES.length} Records.</p>
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