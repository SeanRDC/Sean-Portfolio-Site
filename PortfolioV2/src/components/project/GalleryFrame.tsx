import { useState, useRef, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function GalleryFrame({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  // GSAP Animation for Lightbox Entrance
  useGSAP(() => {
    if (activeIndex !== null && overlayRef.current && imageRef.current) {
      gsap.fromTo(
        overlayRef.current,
        {
          opacity: 0,
          backdropFilter: "blur(0px)",
          WebkitBackdropFilter: "blur(0px)",
        },
        {
          opacity: 1,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          duration: 0.4,
          ease: "power3.out",
        },
      );
      gsap.fromTo(
        imageRef.current,
        { scale: 0.9, opacity: 0, y: 20 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          delay: 0.1,
        },
      );
    }
  }, [activeIndex]);

  const next = () =>
    setActiveIndex((prev) =>
      prev === null ? null : (prev + 1) % images.length,
    );
  const prev = () =>
    setActiveIndex((curr) =>
      curr === null ? null : (curr - 1 + images.length) % images.length,
    );

  if (!images || images.length === 0) return null;

  return (
    <div className="mt-20">
      <h3 className="mb-8 font-display text-2xl font-semibold text-ink">
        Project Gallery
      </h3>

      {/* Thumbnail Grid (Fixed to use CSS Backgrounds) */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            data-cursor
            className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-panel-deep aspect-video shadow-lg"
          >
            <div
              className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105"
              style={{
                background: img,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-void/0 transition-colors duration-300 group-hover:bg-void/30" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="glass glass-edge flex h-12 w-12 items-center justify-center rounded-full text-ink">
                <Maximize2 className="h-5 w-5" strokeWidth={2} />
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* GSAP Lightbox Overlay (Fixed to use CSS Backgrounds) */}
      {activeIndex !== null && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void/80 p-4 sm:p-10"
          onClick={() => setActiveIndex(null)}
        >
          <button
            onClick={() => setActiveIndex(null)}
            className="absolute right-6 top-6 z-50 glass flex h-12 w-12 items-center justify-center rounded-full text-ink hover:text-rose transition-colors"
          >
            <X className="h-6 w-6" strokeWidth={2} />
          </button>

          <div
            className="relative w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              ref={imageRef}
              key={activeIndex}
              className="w-full h-[70vh] rounded-[24px] shadow-[0_30px_80px_rgba(0,0,0,0.8)]"
              style={{
                background: images[activeIndex],
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute -left-4 sm:-left-16 top-1/2 -translate-y-1/2 glass flex h-12 w-12 items-center justify-center rounded-full text-ink hover:text-cyan transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" strokeWidth={2} />
                </button>
                <button
                  onClick={next}
                  className="absolute -right-4 sm:-right-16 top-1/2 -translate-y-1/2 glass flex h-12 w-12 items-center justify-center rounded-full text-ink hover:text-cyan transition-colors"
                >
                  <ChevronRight className="h-6 w-6" strokeWidth={2} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
