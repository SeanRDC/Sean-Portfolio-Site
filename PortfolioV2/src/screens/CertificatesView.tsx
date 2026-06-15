import { useState, useRef, useEffect } from "react";
import {
  Plus,
  X,
  Award,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Reveal from "../components/Reveal";
import CertPlate from "../components/certificates/CertPlate";
import type { Cert } from "../components/certificates/CertPlate";

const violetGlow = "rgba(123,92,255,0.4)";
const cyanGlow = "rgba(79,210,255,0.4)";
const roseGlow = "rgba(255,111,165,0.4)";

const gradVioletCyan = "linear-gradient(135deg, var(--violet), var(--cyan))";
const gradCyanRose = "linear-gradient(135deg, var(--cyan), var(--rose))";
const gradRoseViolet = "linear-gradient(135deg, var(--rose), var(--violet))";

// Your specifically ordered certificates list
const certs: Cert[] = [
  {
    title: "Google UX Design",
    issuer: "Coursera · Professional Certificate",
    year: "2025",
    glow: violetGlow,
    grad: gradVioletCyan,
    images: [
      "/certs/cg1.webp",
      "/certs/cg2.webp",
      "/certs/cg3.webp",
      "/certs/cg4.webp",
      "/certs/cg5.webp",
      "/certs/cg6.webp",
      "/certs/cg7.webp",
      "/certs/cg8.webp",
      "/certs/cg9.webp",
    ],
  },
  {
    title: "IBM AI Developer",
    issuer: "IBM · Professional Certificate",
    year: "2026",
    glow: cyanGlow,
    grad: gradCyanRose,
    images: Array(10).fill("#"),
  },
  {
    title: "OWASP Top 10",
    issuer: "Infosec",
    year: "2026",
    glow: roseGlow,
    grad: gradRoseViolet,
    images: ["#"],
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    year: "2025",
    glow: cyanGlow,
    grad: gradCyanRose,
    images: ["/certs/fccrwb.webp"],
  },
  {
    title: "Relational Database",
    issuer: "freeCodeCamp",
    year: "2026",
    glow: violetGlow,
    grad: gradVioletCyan,
    images: ["/certs/fccrdb.webp"],
  },
  {
    title: "Python Essentials 1 & 2",
    issuer: "Cisco",
    year: "2024",
    glow: roseGlow,
    grad: gradRoseViolet,
    images: ["/certs/pe1.webp", "/certs/pe2.webp"],
  },
  {
    title: "JavaScript Essentials 1 & 2",
    issuer: "Cisco",
    year: "2025",
    glow: cyanGlow,
    grad: gradCyanRose,
    images: ["/certs/je1.webp", "/certs/je2.webp"],
  },
  {
    title: "HTML Essentials",
    issuer: "Cisco",
    year: "2025",
    glow: violetGlow,
    grad: gradVioletCyan,
    images: ["/certs/he.webp"],
  },
  {
    title: "CSS Essentials",
    issuer: "Cisco",
    year: "2026",
    glow: roseGlow,
    grad: gradRoseViolet,
    images: ["/certs/cse.webp"],
  },
  {
    title: "CCNA: Introduction to Networks",
    issuer: "Cisco",
    year: "2026",
    glow: cyanGlow,
    grad: gradCyanRose,
    images: ["/certs/itn.webp"],
  },
  {
    title: "Learning Git and Github",
    issuer: "LinkedIn",
    year: "2025",
    glow: violetGlow,
    grad: gradVioletCyan,
    images: ["/certs/lgag.webp"],
  },
  {
    title: "Git Training",
    issuer: "Simplilearn",
    year: "2025",
    glow: roseGlow,
    grad: gradRoseViolet,
    images: ["/certs/gt.webp"],
  },
];

export default function CertificatesView() {
  const [open, setOpen] = useState<Cert | null>(null);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [imgLoading, setImgLoading] = useState(true);

  // Refs for the GSAP Lightbox Animations
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imgViewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setActiveImgIdx(0);
      setImgLoading(true);
    }
  }, [open]);

  useEffect(() => {
    setImgLoading(true);
  }, [activeImgIdx]);

  // Modal Entrance Animation
  useGSAP(() => {
    if (open && overlayRef.current && contentRef.current) {
      gsap.fromTo(
        overlayRef.current,
        {
          opacity: 0,
          backdropFilter: "blur(0px)",
          WebkitBackdropFilter: "blur(0px)",
        },
        {
          opacity: 1,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          duration: 0.4,
          ease: "power3.out",
        },
      );
      gsap.fromTo(
        contentRef.current,
        { scale: 0.95, opacity: 0, y: 10 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          delay: 0.05,
        },
      );
    }
  }, [open]);

  // Carousel Slide Animation
  useGSAP(() => {
    if (open && imgViewerRef.current) {
      gsap.fromTo(
        imgViewerRef.current,
        { opacity: 0, scale: 0.98 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
          force3D: true,
        },
      );
    }
  }, [activeImgIdx]);

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (open) setActiveImgIdx((prev) => (prev + 1) % open.images.length);
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (open)
      setActiveImgIdx(
        (prev) => (prev - 1 + open.images.length) % open.images.length,
      );
  };

  useEffect(() => {
    if (open && open.images.length > 1) {
      const nextIdx = (activeImgIdx + 1) % open.images.length;
      const nextImageUrl = open.images[nextIdx];

      if (nextImageUrl !== "#") {
        const img = new Image();
        img.src = nextImageUrl;
      }
    }
  }, [activeImgIdx, open]);

  return (
    <div className="px-6 pb-10 pt-32 md:px-10">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-16 text-center">
          <span className="mb-3 inline-block text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
            Credentials
          </span>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            Certificates & Achievements
          </h1>
          <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-ink-muted">
            Proof of the craft courses completed and skills certified.
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certs.map((c, i) => (
            <CertPlate
              key={c.title}
              cert={c}
              side={i % 2 === 0 ? -1 : 1}
              onOpen={() => setOpen(c)}
            />
          ))}
        </div>
      </div>

      {/* GSAP Lightbox - Redesigned for Maximum Image Clarity */}
      {open && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-8 backdrop-blur-[16px] [-webkit-backdrop-filter:blur(16px)]"
          style={{ background: "var(--overlay)" }}
          onClick={() => setOpen(null)}
        >
          {/* Floating Close Button */}
          <button
            data-cursor
            onClick={() => setOpen(null)}
            className="glass absolute right-4 top-4 md:right-8 md:top-8 z-[100] flex h-11 w-11 items-center justify-center rounded-full text-ink hover:text-rose transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" strokeWidth={1.75} />
          </button>

          {/* Main Modal Container - Expanded Width */}
          <div
            ref={contentRef}
            className="glass-strong glass-edge relative w-full max-w-6xl overflow-hidden rounded-[24px] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex h-full max-h-[85vh] flex-col"
              style={{ background: "var(--panel-deep)" }}
            >
              {/* 1. Sleek, Compact Header */}
              <div className="flex shrink-0 items-center gap-4 border-b border-white/5 px-6 py-5 md:px-8">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px]"
                  style={{
                    background: open.grad,
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)",
                  }}
                >
                  <Award className="h-5 w-5 text-ink" strokeWidth={1.75} />
                </span>
                <div>
                  <h2 className="font-display text-xl font-semibold tracking-tight text-ink md:text-2xl">
                    {open.title}
                  </h2>
                  <p className="text-sm text-ink-muted">
                    {open.issuer} · {open.year}
                  </p>
                </div>
              </div>

              {/* 2. Edge-to-Edge Image Canvas */}
              <div className="relative flex min-h-[50vh] flex-1 items-center justify-center overflow-hidden bg-black/20 p-4 md:min-h-[70vh]">
                <div
                  ref={imgViewerRef}
                  className="absolute inset-0 flex items-center justify-center p-4 md:p-12"
                >
                  {open.images[activeImgIdx] === "#" ? (
                    <div className="flex flex-col items-center gap-3 text-ink-faint">
                      <ImageIcon
                        className="h-10 w-10 opacity-40"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm font-medium">
                        Image {activeImgIdx + 1} of {open.images.length}
                      </span>
                      <span className="text-xs">
                        Replace "#" placeholder with your image.
                      </span>
                    </div>
                  ) : (
                    <>
                      {/* The Loading Spinner */}
                      {imgLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-20">
                          <Loader2 className="h-8 w-8 animate-spin text-cyan" />
                          <span className="text-xs font-medium uppercase tracking-widest text-ink-muted">
                            Loading Asset
                          </span>
                        </div>
                      )}

                      {/* The Actual Image */}
                      <img
                        src={open.images[activeImgIdx]}
                        alt={`${open.title} Certificate ${activeImgIdx + 1}`}
                        className={`max-h-full max-w-full rounded-[4px] object-contain drop-shadow-2xl transition-opacity duration-500 ease-out ${
                          imgLoading
                            ? "opacity-0 scale-95"
                            : "opacity-100 scale-100"
                        }`}
                        loading="lazy"
                        decoding="async"
                        onLoad={() => setImgLoading(false)}
                      />
                    </>
                  )}
                </div>

                {/* 3. Floating Overlay Controls */}
                {open.images.length > 1 && (
                  <>
                    <button
                      data-cursor
                      onClick={prevImg}
                      className="glass absolute left-4 flex h-12 w-12 items-center justify-center rounded-full text-ink hover:scale-110 hover:text-cyan transition-all md:left-8 z-10"
                    >
                      <ChevronLeft
                        className="h-6 w-6 -ml-0.5"
                        strokeWidth={2}
                      />
                    </button>
                    <button
                      data-cursor
                      onClick={nextImg}
                      className="glass absolute right-4 flex h-12 w-12 items-center justify-center rounded-full text-ink hover:scale-110 hover:text-cyan transition-all md:right-8 z-10"
                    >
                      <ChevronRight
                        className="h-6 w-6 -mr-0.5"
                        strokeWidth={2}
                      />
                    </button>

                    {/* Progress Dots inside a Glass Pill */}
                    <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2.5 backdrop-blur-md z-10">
                      {open.images.map((_, idx) => (
                        <span
                          key={idx}
                          className="h-1.5 rounded-full transition-all duration-300"
                          style={{
                            width: idx === activeImgIdx ? "20px" : "6px",
                            background:
                              idx === activeImgIdx
                                ? "var(--cyan)"
                                : "rgba(255,255,255,0.4)",
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
