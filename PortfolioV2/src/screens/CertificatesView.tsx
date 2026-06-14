import { useState, useRef, useEffect } from "react";
import {
  Plus,
  X,
  Award,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
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
      "/certs/Cg1.jpg",
      "/certs/Cg2.jpg",
      "/certs/Cg3.jpg",
      "/certs/Cg4.jpg",
      "/certs/Cg5.jpg",
      "/certs/Cg6.jpg",
      "/certs/Cg7.jpg",
      "/certs/Cg8.jpg",
      "/certs/Cg9.jpg",
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
    images: ["/certs/fccrwb.jpg"],
  },
  {
    title: "Relational Database",
    issuer: "freeCodeCamp",
    year: "2026",
    glow: violetGlow,
    grad: gradVioletCyan,
    images: ["/certs/fccrdb.png"],
  },
  {
    title: "Python Essentials 1 & 2",
    issuer: "Cisco",
    year: "2024",
    glow: roseGlow,
    grad: gradRoseViolet,
    images: ["/certs/pe1.jpg", "/certs/pe2.jpg"],
  },
  {
    title: "JavaScript Essentials 1 & 2",
    issuer: "Cisco",
    year: "2025",
    glow: cyanGlow,
    grad: gradCyanRose,
    images: ["/certs/je1.jpg", "/certs/je2.jpg"],
  },
  {
    title: "HTML Essentials",
    issuer: "Cisco",
    year: "2025",
    glow: violetGlow,
    grad: gradVioletCyan,
    images: ["/certs/he.jpg"],
  },
  {
    title: "CSS Essentials",
    issuer: "Cisco",
    year: "2026",
    glow: roseGlow,
    grad: gradRoseViolet,
    images: ["/certs/cse.jpg"],
  },
  {
    title: "CCNA: Introduction to Networks",
    issuer: "Cisco",
    year: "2026",
    glow: cyanGlow,
    grad: gradCyanRose,
    images: ["/certs/itn.jpg"],
  },
  {
    title: "Learning Git and Github",
    issuer: "LinkedIn",
    year: "2025",
    glow: violetGlow,
    grad: gradVioletCyan,
    images: ["/certs/lgag.jpg"],
  },
  {
    title: "Git Training",
    issuer: "Simplilearn",
    year: "2025",
    glow: roseGlow,
    grad: gradRoseViolet,
    images: ["/certs/gt.jpg"],
  },
];

export default function CertificatesView() {
  const [open, setOpen] = useState<Cert | null>(null);
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  // Refs for the GSAP Lightbox Animations
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imgViewerRef = useRef<HTMLDivElement>(null);

  // Reset Carousel when a new cert is opened
  useEffect(() => {
    if (open) setActiveImgIdx(0);
  }, [open]);

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
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" },
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

          {/* Reserved Empty Slot */}
          <div className="flex h-52 w-full flex-col items-center justify-center gap-3 rounded-[22px] border border-dashed border-white/20 p-6 text-center transition-colors hover:bg-white/5">
            <Plus className="h-6 w-6 text-ink-faint" strokeWidth={1.5} />
            <span className="text-sm text-ink-muted">
              Future credential — reserved slot
            </span>
          </div>
        </div>
      </div>

      {/* GSAP Lightbox */}
      {open && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[90] flex items-center justify-center p-6"
          style={{ background: "var(--overlay)" }}
          onClick={() => setOpen(null)}
        >
          <button
            data-cursor
            onClick={() => setOpen(null)}
            className="glass absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full text-ink hover:text-rose transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" strokeWidth={1.75} />
          </button>

          <div
            ref={contentRef}
            className="glass-strong glass-edge w-full max-w-3xl rounded-[26px] p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex flex-col gap-4 rounded-[20px] p-6 md:p-8"
              style={{
                background: "var(--panel-deep)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
              }}
            >
              {/* Header Info */}
              <div className="flex items-center gap-5">
                <span
                  className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-[14px]"
                  style={{
                    background: open.grad,
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)",
                  }}
                >
                  <Award className="h-6 w-6 text-ink" strokeWidth={1.75} />
                </span>
                <div>
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
                    {open.title}
                  </h2>
                  <p className="mt-1 text-sm text-ink-muted">
                    {open.issuer} · {open.year}
                  </p>
                </div>
              </div>

              {/* Image Carousel Viewer */}
              <div className="relative mt-2 flex h-[50vh] w-full items-center justify-center overflow-hidden rounded-[16px] bg-void border border-white/10 shadow-inner">
                <div
                  ref={imgViewerRef}
                  className="absolute inset-0 flex items-center justify-center p-4"
                >
                  {open.images[activeImgIdx] === "#" ? (
                    // Display Placeholder when the URL is "#"
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
                    // Display the actual certificate image
                    <img
                      src={open.images[activeImgIdx]}
                      alt={`${open.title} Certificate ${activeImgIdx + 1}`}
                      className="max-h-full max-w-full object-contain rounded-[8px]"
                    />
                  )}
                </div>

                {/* Carousel Navigation Arrows */}
                {open.images.length > 1 && (
                  <>
                    <button
                      data-cursor
                      onClick={prevImg}
                      className="glass absolute left-4 flex h-10 w-10 items-center justify-center rounded-full text-ink hover:text-cyan transition-colors z-10"
                    >
                      <ChevronLeft
                        className="h-5 w-5 -ml-0.5"
                        strokeWidth={2}
                      />
                    </button>
                    <button
                      data-cursor
                      onClick={nextImg}
                      className="glass absolute right-4 flex h-10 w-10 items-center justify-center rounded-full text-ink hover:text-cyan transition-colors z-10"
                    >
                      <ChevronRight
                        className="h-5 w-5 -mr-0.5"
                        strokeWidth={2}
                      />
                    </button>

                    {/* Progress Dots */}
                    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 z-10">
                      {open.images.map((_, idx) => (
                        <span
                          key={idx}
                          className="h-1.5 rounded-full transition-all duration-300"
                          style={{
                            width: idx === activeImgIdx ? "16px" : "6px",
                            background:
                              idx === activeImgIdx
                                ? "var(--cyan)"
                                : "rgba(255,255,255,0.3)",
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
