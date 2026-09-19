import { useRef, useState, useEffect } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  n: string;
  title: string;
  kind: string;
  blurb: string;
  meta: string[];
  image: string;
  gallery: string[];
  year?: string;
};

const PROJECTS: Project[] = [
  {
    n: "01",
    title: "BEADED",
    kind: "Full-Stack E-Commerce Platform",
    blurb:
      "A bespoke jewelry storefront with a real-time custom builder - configure metal, stone and setting live - backed by a points-based loyalty engine and headless checkout.",
    meta: ["MERN", "Custom Builder", "Loyalty Engine", "Stripe"],
    image: "/images/beaded-cover.webp",
    gallery: [
      "/mockups/beaded-1.webp",
      "/mockups/beaded-2.webp",
      "/mockups/beaded-3.webp",
    ],
    year: "2026",
  },
  {
    n: "02",
    title: "FLOWER",
    kind: "Flower Encyclopedia Database and UI",
    blurb:
      "A comprehensive digital herbarium featuring custom taxonomical filters and micro-animations. Each entry uses fluid UI transitions to render petal textures and growth patterns.",
    meta: ["React", "Custom Components", "Realtime", "Design System"],
    image: "/images/flower-cover.webp",
    gallery: [
      "/mockups/flower-1.webp",
      "/mockups/flower-2.webp",
      "/mockups/flower-3.webp",
    ],
    year: "2025",
  },
  {
    n: "03",
    title: "PIXEL",
    kind: "Modular E-Commerce Architecture",
    blurb:
      "A performance-focused storefront engine utilizing a custom headless modular system. Currently under development.",
    meta: [
      "React",
      "Headless CMS",
      "State Management",
      "Performance Optimization",
    ],
    image: "/images/pixel-cover.webp",
    gallery: [
      "/mockups/pixel-1.webp",
      "/mockups/pixel-2.webp",
      "/mockups/pixel-3.webp",
    ],
    year: "2026",
  },
];

const GalleryContent = ({
  p,
  N,
  onNavigate,
  titleRef,
}: {
  p: Project;
  N: number;
  onNavigate: (e: React.MouseEvent, p: Project) => void;
  titleRef: React.Ref<HTMLHeadingElement>;
}) => (
  <div className="grid w-full grid-cols-1 items-center gap-10 md:grid-cols-12">
    <div className="min-w-0 md:col-span-7">
      <div className="relative aspect-[16/10] w-full overflow-hidden border border-line bg-ink/[0.02]">
        <img
          src={p.image}
          alt={p.title}
          className="block h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(120deg, rgba(243,239,231,0.1) 0%, transparent 40%, rgba(19,18,16,0.12) 100%)",
          }}
        />
        <div className="absolute left-5 top-5 font-mono-x text-[10px] uppercase tracking-[0.25em] text-ink-soft bg-paper/50 backdrop-blur-sm px-2 py-1">
          Still {p.n} / 0{N}
        </div>
      </div>
    </div>
    <div className="min-w-0 md:col-span-5">
      <div className="mb-4 font-mono-x text-[11px] uppercase tracking-[0.3em] text-ink-dim">
        {p.kind}
      </div>
      <h2
        ref={titleRef}
        className="t-colossal text-[clamp(42px,5.5vw,110px)] tracking-tight text-ink break-words w-fit origin-left m-0"
      >
        {p.title}
      </h2>
      <p className="mt-6 max-w-md font-body text-[15px] font-light leading-relaxed text-ink-soft">
        {p.blurb}
      </p>
      <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
        {p.meta.map((m) => (
          <span
            key={m}
            className="font-mono-x text-[11px] uppercase tracking-wider text-ink-dim"
          >
            <span className="mr-1.5 text-ink-faint">/</span>
            {m}
          </span>
        ))}
      </div>
      <a
        href={`#${p.n}`}
        onClick={(e) => onNavigate(e, p)}
        className="group mt-9 inline-flex items-center gap-3 border-b border-line-strong pb-1.5 transition-colors hover:border-ink cursor-pointer"
      >
        <span className="t-label text-[13px] uppercase tracking-[0.2em] text-ink">
          Enter Case Study
        </span>
        <span className="font-mono-x text-base text-ink transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
          ↗
        </span>
      </a>
    </div>
  </div>
);

export default function ProjectsScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  const previewRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const xMovePreview = useRef<gsap.QuickToFunc | null>(null);
  const yMovePreview = useRef<gsap.QuickToFunc | null>(null);
  const xMoveCursor = useRef<gsap.QuickToFunc | null>(null);
  const yMoveCursor = useRef<gsap.QuickToFunc | null>(null);

  const titleRefs = useRef<Record<string, HTMLHeadingElement | null>>({});
  const pageFadeRef = useRef<HTMLDivElement>(null);
  const flyingTitleRef = useRef<HTMLHeadingElement>(null);
  const detailOverlayRef = useRef<HTMLElement>(null);
  const realDetailTitleWrapRef = useRef<HTMLDivElement>(null);

  const thumbsWrapRef = useRef<HTMLDivElement>(null);
  const thumbsInnerRef = useRef<HTMLDivElement>(null);
  const thumbImgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const galleryY = useRef(0);
  const qGalleryY = useRef<gsap.QuickToFunc | null>(null);

  const [progress, setProgress] = useState(0);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [isListView, setIsListView] = useState(true);

  useGSAP(
    () => {
      if (previewRef.current && cursorRef.current) {
        xMovePreview.current = gsap.quickTo(previewRef.current, "left", {
          duration: 0.4,
          ease: "power3",
        });
        yMovePreview.current = gsap.quickTo(previewRef.current, "top", {
          duration: 0.4,
          ease: "power3",
        });
        xMoveCursor.current = gsap.quickTo(cursorRef.current, "left", {
          duration: 0.2,
          ease: "power3",
        });
        yMoveCursor.current = gsap.quickTo(cursorRef.current, "top", {
          duration: 0.2,
          ease: "power3",
        });
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 65%",
        end: "bottom 35%",
        animation: gsap.fromTo(
          btnRef.current,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
        ),
        toggleActions: "play reverse play reverse",
      });

      if (isListView) {
        gsap.utils.toArray(".proj-list-item").forEach((item: any) => {
          gsap.fromTo(
            item,
            { autoAlpha: 0, y: 40 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      } else {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => setProgress(self.progress),
        });
      }
    },
    { scope: sectionRef, dependencies: [isListView] },
  );

  // --- SEAMLESS TRANSITION IN ---
  const openProject = (e: React.MouseEvent, p: Project) => {
    e.preventDefault();
    handleMouseLeave();

    const sourceTitle =
      titleRefs.current[`${isListView ? "list" : "gallery"}-${p.n}`];
    if (
      !sourceTitle ||
      !flyingTitleRef.current ||
      !detailOverlayRef.current ||
      !pageFadeRef.current
    )
      return;

    const startRect = sourceTitle.getBoundingClientRect();
    const startCs = window.getComputedStyle(sourceTitle);

    flushSync(() => {
      setSelectedProject(p);
      setActiveGalleryIdx(0);
      galleryY.current = 0;
    });

    const targetTitleWrap = realDetailTitleWrapRef.current;
    const targetTitle = targetTitleWrap?.querySelector("h1");
    if (!targetTitleWrap || !targetTitle) return;

    detailOverlayRef.current.style.display = "block";
    void detailOverlayRef.current.offsetHeight;

    const targetRect = targetTitle.getBoundingClientRect();
    const targetCs = window.getComputedStyle(targetTitle);

    // Apply exact content and start styles (removed font family/weight to prevent JS snapping)
    flyingTitleRef.current.textContent = p.title;
    gsap.set(flyingTitleRef.current, {
      left: startRect.left,
      top: startRect.top,
      fontSize: startCs.fontSize,
      lineHeight: startCs.lineHeight,
      letterSpacing: startCs.letterSpacing,
      color: startCs.color,
      margin: 0,
      opacity: 1,
      x: 0,
      y: 0,
      transformOrigin: "left top",
    });

    sourceTitle.style.visibility = "hidden";
    document.body.style.overflow = "hidden";

    window.dispatchEvent(new CustomEvent("projectOpen"));

    const tl = gsap.timeline();
    tl.to(
      pageFadeRef.current,
      { opacity: 1, duration: 0.8, ease: "power2.inOut" },
      0,
    );

    // Morph strictly layout values to the target
    tl.to(
      flyingTitleRef.current,
      {
        left: targetRect.left,
        top: targetRect.top,
        fontSize: targetCs.fontSize,
        lineHeight: targetCs.lineHeight,
        letterSpacing: targetCs.letterSpacing,
        color: targetCs.color,
        duration: 1,
        ease: "power3.inOut",
      },
      0.3,
    );

    tl.to(detailOverlayRef.current, { autoAlpha: 1, duration: 0.4 }, 1.0);
    tl.set(flyingTitleRef.current, { opacity: 0 }, 1.1);
    tl.set(targetTitleWrap, { opacity: 1 }, 1.1);

    tl.fromTo(
      ".detail-animate-in",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      1.2,
    );

    if (thumbsInnerRef.current) {
      gsap.set(thumbsInnerRef.current, { y: 0 });
      qGalleryY.current = gsap.quickTo(thumbsInnerRef.current, "y", {
        duration: 0.8,
        ease: "power2.out",
      });
    }
  };

  // --- SEAMLESS TRANSITION OUT ---
  const closeProject = () => {
    if (!selectedProject) return;

    const sourceTitle =
      titleRefs.current[
        `${isListView ? "list" : "gallery"}-${selectedProject.n}`
      ];
    if (
      !sourceTitle ||
      !flyingTitleRef.current ||
      !detailOverlayRef.current ||
      !pageFadeRef.current
    )
      return;

    window.dispatchEvent(new CustomEvent("projectClose"));

    const tl = gsap.timeline();
    tl.to(
      ".detail-animate-in",
      { opacity: 0, duration: 0.3, ease: "power2.in" },
      0,
    );

    const targetTitleWrap = realDetailTitleWrapRef.current;
    const targetTitle = targetTitleWrap?.querySelector("h1");
    if (targetTitleWrap && targetTitle) {
      const dtRect = targetTitle.getBoundingClientRect();
      const dtCs = window.getComputedStyle(targetTitle);

      gsap.set(flyingTitleRef.current, {
        left: dtRect.left,
        top: dtRect.top,
        fontSize: dtCs.fontSize,
        lineHeight: dtCs.lineHeight,
        letterSpacing: dtCs.letterSpacing,
        color: dtCs.color,
        margin: 0,
        opacity: 1,
        x: 0,
        y: 0,
      });
      gsap.set(targetTitleWrap, { opacity: 0 });
    }

    tl.to(detailOverlayRef.current, { autoAlpha: 0, duration: 0.4 }, 0.2);

    const itemRect = sourceTitle.getBoundingClientRect();
    const itemCs = window.getComputedStyle(sourceTitle);

    tl.to(
      flyingTitleRef.current,
      {
        left: itemRect.left,
        top: itemRect.top,
        fontSize: itemCs.fontSize,
        lineHeight: itemCs.lineHeight,
        letterSpacing: itemCs.letterSpacing,
        color: itemCs.color,
        duration: 0.9,
        ease: "power3.inOut",
      },
      0.3,
    );

    tl.to(
      pageFadeRef.current,
      { opacity: 0, duration: 0.6, ease: "power2.out" },
      0.5,
    );

    tl.add(() => {
      sourceTitle.style.visibility = "";
      gsap.set(flyingTitleRef.current, { opacity: 0 });
      setSelectedProject(null);
      document.body.style.overflow = "";
      detailOverlayRef.current!.style.display = "none";
    });
  };

  // Connects the Nav Back button to this file
  useEffect(() => {
    const handleTriggerClose = () => {
      if (selectedProject) closeProject();
    };
    window.addEventListener("triggerCloseProject", handleTriggerClose);
    return () =>
      window.removeEventListener("triggerCloseProject", handleTriggerClose);
  }, [selectedProject, isListView]);

  // --- CUSTOM SCROLL GALLERY LOGIC ---
  useEffect(() => {
    const el = detailOverlayRef.current;
    if (!el || !selectedProject || window.innerWidth < 1024) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const inner = thumbsInnerRef.current;
      const wrap = thumbsWrapRef.current;
      if (!inner || !wrap) return;

      const maxScroll = Math.max(0, inner.scrollHeight - wrap.clientHeight);
      const delta =
        Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      galleryY.current = Math.max(
        -maxScroll,
        Math.min(0, galleryY.current - delta),
      );

      if (qGalleryY.current) qGalleryY.current(galleryY.current);
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const inner = thumbsInnerRef.current;
      const wrap = thumbsWrapRef.current;
      if (!inner || !wrap) return;

      const delta = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;
      const maxScroll = Math.max(0, inner.scrollHeight - wrap.clientHeight);
      galleryY.current = Math.max(
        -maxScroll,
        Math.min(0, galleryY.current - delta),
      );
      if (qGalleryY.current) qGalleryY.current(galleryY.current);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, [selectedProject]);

  useEffect(() => {
    if (!selectedProject || window.innerWidth < 1024) return;
    let rafId: number;

    const updateActive = () => {
      if (thumbsWrapRef.current && thumbImgRefs.current.length > 0) {
        const wrapRect = thumbsWrapRef.current.getBoundingClientRect();
        const cy = wrapRect.top + wrapRect.height / 2;
        let closestIdx = 0;
        let closestDist = Infinity;

        thumbImgRefs.current.forEach((img, i) => {
          if (!img) return;
          const rect = img.getBoundingClientRect();
          const imgCy = rect.top + rect.height / 2;
          const dist = Math.abs(imgCy - cy);

          if (dist < closestDist) {
            closestDist = dist;
            closestIdx = i;
          }

          const distNorm = Math.min(1, dist / (wrapRect.height * 0.45));
          const t = 1 - distNorm;
          const scale = 0.8 + t * t * t * 0.2;
          const opacity = 0.3 + t * t * t * 0.7;

          img.style.transform = `scale(${scale})`;
          img.style.opacity = `${opacity}`;
        });

        setActiveGalleryIdx((prev) =>
          prev !== closestIdx ? closestIdx : prev,
        );
      }
      rafId = requestAnimationFrame(updateActive);
    };

    rafId = requestAnimationFrame(updateActive);
    return () => cancelAnimationFrame(rafId);
  }, [selectedProject]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (
      xMovePreview.current &&
      yMovePreview.current &&
      xMoveCursor.current &&
      yMoveCursor.current
    ) {
      xMovePreview.current(e.clientX);
      yMovePreview.current(e.clientY);
      xMoveCursor.current(e.clientX);
      yMoveCursor.current(e.clientY);
    }
  };

  const handleMouseEnter = (image: string) => {
    if (!isListView) return;
    setActiveImage(image);
    gsap.to([previewRef.current, cursorRef.current], {
      scale: 1,
      autoAlpha: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to([previewRef.current, cursorRef.current], {
      scale: 0.8,
      autoAlpha: 0,
      duration: 0.3,
      ease: "power2.in",
    });
  };

  const handleToggle = () => {
    setIsListView((prev) => !prev);
    setTimeout(() => {
      if (sectionRef.current) {
        const y =
          sectionRef.current.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: y, behavior: "instant" });
      }
      ScrollTrigger.refresh();
    }, 0);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setIsListView(true);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const N = PROJECTS.length;
  const t = Math.min(1, Math.max(0, (progress - 0.08) / 0.84));
  const active = Math.min(N - 1, Math.round(t * (N - 1)));

  return (
    <div className="relative">
      {/* 1. MAIN PROJECTS SCENE */}
      <section
        ref={sectionRef}
        className={`relative bg-paper ${isListView ? "cursor-none" : ""}`}
        style={{ height: isListView ? "auto" : `${(N + 1) * 100}vh` }}
        id="projects"
      >
        <div
          ref={previewRef}
          className="pointer-events-none fixed z-40 w-[300px] md:w-[450px] aspect-[4/3] overflow-hidden border border-line shadow-2xl opacity-0 scale-90 -translate-x-1/2 -translate-y-1/2 bg-paper"
        >
          {activeImage && (
            <img
              src={activeImage}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div
          ref={cursorRef}
          className="pointer-events-none fixed z-50 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-ink text-paper font-mono-x text-[9px] font-bold uppercase tracking-widest opacity-0 scale-50 -translate-x-1/2 -translate-y-1/2"
        >
          View
        </div>

        {isListView ? (
          <div
            className="min-h-screen py-32 px-6 md:px-16"
            onMouseMove={handleMouseMove}
          >
            <div className="mb-20 font-mono-x text-[10px] uppercase tracking-[0.3em] text-ink-dim">
              020 — Project Index
            </div>
            <div className="flex w-full flex-col border-t border-line-strong">
              {PROJECTS.map((p) => (
                <article
                  key={p.n}
                  onMouseEnter={() => handleMouseEnter(p.image)}
                  onMouseLeave={handleMouseLeave}
                  onClick={(e) => openProject(e, p)}
                  className="proj-list-item group flex flex-col items-start justify-between border-b border-line py-12 transition-colors hover:bg-ink/[0.02] md:flex-row md:items-center cursor-none"
                >
                  <div className="flex items-baseline gap-6 md:w-1/2 md:gap-12 pointer-events-none">
                    <span className="font-mono-x text-[12px] text-ink-faint shrink-0">
                      {p.n}
                    </span>
                    <div>
                      <h2
                        ref={(el) => {
                          titleRefs.current[`list-${p.n}`] = el;
                        }}
                        className="t-colossal text-[clamp(40px,6vw,90px)] leading-[0.85] tracking-tight text-ink transition-all duration-500 ease-out w-fit origin-left m-0 group-hover:translate-x-4 group-hover:opacity-70"
                      >
                        {p.title}
                      </h2>
                      <div className="mt-4 font-mono-x text-[11px] uppercase tracking-[0.2em] text-ink-dim">
                        {p.kind}
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flex w-full flex-col md:mt-0 md:w-1/2 md:flex-row md:items-center md:justify-between md:pl-10 pointer-events-none">
                    <div className="max-w-sm">
                      <p className="font-body text-[14px] font-light leading-relaxed text-ink-soft line-clamp-2">
                        {p.blurb}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                        {p.meta.map((m) => (
                          <span
                            key={m}
                            className="font-mono-x text-[10px] uppercase tracking-wider text-ink-dim"
                          >
                            <span className="mr-1.5 text-ink-faint">/</span>
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="hidden md:flex mt-8 h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink transition-all group-hover:scale-110 group-hover:bg-ink group-hover:text-paper md:mt-0">
                      <span className="font-mono-x text-xl">↗</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <div className="flex h-full w-full">
              {PROJECTS.map((p) => (
                <article
                  key={p.n}
                  className="relative flex h-full w-full shrink-0 items-center px-6 md:px-16"
                  style={{
                    transform: `translateX(-${t * (N - 1) * 100}%)`,
                    willChange: "transform",
                  }}
                >
                  <GalleryContent
                    p={p}
                    N={N}
                    onNavigate={openProject}
                    titleRef={(el) => {
                      titleRefs.current[`gallery-${p.n}`] = el;
                    }}
                  />
                </article>
              ))}
            </div>
            <div className="pointer-events-none absolute left-6 top-24 font-mono-x text-[10px] uppercase tracking-[0.3em] text-ink-dim md:left-16">
              020 — Gallery View
            </div>
            <div className="pointer-events-none absolute inset-x-6 bottom-8 flex items-center gap-4 md:inset-x-16">
              <div className="flex flex-1 items-center gap-1.5">
                {PROJECTS.map((p, i) => (
                  <div
                    key={p.n}
                    className="h-px flex-1 transition-colors duration-300"
                    style={{
                      background:
                        i <= active ? "var(--ink)" : "var(--line-strong)",
                    }}
                  />
                ))}
              </div>
              <span className="font-mono-x text-[10px] tabular-nums text-ink-dim transition-all">
                0{active + 1} / 0{N}
              </span>
            </div>
          </div>
        )}

        <div className="hidden md:block pointer-events-none fixed bottom-16 right-1/2 translate-x-1/2 md:translate-x-0 md:bottom-8 md:right-10 z-[100]">
          <div ref={btnRef} className="pointer-events-auto invisible opacity-0">
            <button
              onClick={handleToggle}
              className="group block w-[190px] h-[40px] bg-ink cursor-pointer border-none p-0 outline-none"
              style={{ clipPath: "polygon(0% 0%, calc(100% - 10px) 0%, 100% 10px, 100% 100%, 0% 100%)" }}
            >
              <div className="relative flex h-full items-center justify-between px-5 font-mono-x text-[10px] font-bold uppercase tracking-[0.2em] text-paper">
                <span>{isListView ? "Gallery View" : "List View"}</span>
                <div className="transition-transform duration-500 group-hover:rotate-90">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75.86 61.58" width="10" height="10" fill="currentColor">
                    <path d="m43.32 30.13 32.54-19.09-13.57-7.29-26.5 18.92-1.35.14L6.84 0 2.85 4.96l23.71 25.79L0 50.99l13.1 10.59 31.88-22.73 L59.8 59.79 l15.93-4.26 -8.22-13.66z" />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* 2. FLYING TRANSITION OVERLAYS */}
      <div
        ref={pageFadeRef}
        className="fixed inset-0 bg-[#0a0a0a] z-[999990] opacity-0 pointer-events-none"
      />

      {/* THE FLYING CLONE - ALWAYS SHARES THE EXACT SAME t-colossal CSS CLASS TO PREVENT SNAPPING */}
      <h1
        ref={flyingTitleRef}
        className="t-colossal fixed z-[999999] pointer-events-none m-0 whitespace-nowrap opacity-0"
      />

      {/* 3. CASE STUDY OVERLAY (Connected Black Background) */}
      <section
        ref={detailOverlayRef}
        style={{ display: "none" }}
        className="fixed inset-0 z-[999995] bg-[#0a0a0a] text-[#f5f5f5] opacity-0 overflow-y-auto md:overflow-hidden"
      >
        {selectedProject && (
          <div className="w-full min-h-full md:h-full flex flex-col md:flex-row max-w-[1800px] mx-auto relative pt-24 md:pt-0">
            {/* LEFT COLUMN: Text Info */}
            <div className="md:w-5/12 h-auto md:h-full flex flex-col justify-start md:justify-center px-8 md:px-16 relative shrink-0 z-[50010]">
              <div className="flex items-baseline gap-5 mb-8">
                <div ref={realDetailTitleWrapRef} className="opacity-0">
                  <h1 className="t-colossal text-[clamp(42px,5.5vw,110px)] leading-[0.85] tracking-tight m-0 w-fit text-[#f5f5f5]">
                    {selectedProject.title}
                  </h1>
                </div>
                <span className="detail-animate-in font-mono-x text-sm font-bold text-[#888] mb-1">
                  {selectedProject.year || "2026"}
                </span>
              </div>
              <p className="detail-animate-in font-body text-base md:text-lg font-light leading-relaxed text-[#aaa] max-w-md">
                {selectedProject.blurb}
              </p>
              <div className="detail-animate-in mt-12 flex flex-wrap gap-3">
                {selectedProject.meta.map((tag: string) => (
                  <span
                    key={tag}
                    className="border border-[#333] rounded-full px-5 py-2.5 font-mono-x text-[9px] uppercase tracking-[0.2em] text-[#999]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {/* Mobile Native Fallback Images */}
              <div className="md:hidden flex flex-col gap-6 mt-16 detail-animate-in pb-24 h-auto overflow-visible">
                {selectedProject.gallery.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="Preview"
                    className="w-full rounded-md border border-[#222]"
                  />
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: Custom Scroll Gallery */}
            <div className="hidden md:flex flex-1 h-full relative detail-animate-in bg-[#0f0f0f]">
              <div
                ref={thumbsWrapRef}
                className="w-[100px] md:w-[140px] h-full overflow-hidden flex-shrink-0 relative z-20 border-l border-[#222]"
              >
                <div
                  ref={thumbsInnerRef}
                  className="flex flex-col gap-6 w-full py-[40vh] px-4"
                >
                  {selectedProject.gallery.map((img, i) => (
                    <img
                      key={i}
                      ref={(el) => {
                        thumbImgRefs.current[i] = el;
                      }}
                      src={img}
                      alt="Thumbnail"
                      className="w-full aspect-[4/3] object-cover rounded-md border border-[#333] origin-center transition-transform cursor-pointer"
                      onClick={() => {
                        if (
                          qGalleryY.current &&
                          thumbsWrapRef.current &&
                          thumbImgRefs.current[i]
                        ) {
                          const wrapH = thumbsWrapRef.current.clientHeight;
                          const thumbTop = thumbImgRefs.current[i]!.offsetTop;
                          const thumbH = thumbImgRefs.current[i]!.offsetHeight;
                          const targetY = -(thumbTop - wrapH / 2 + thumbH / 2);
                          galleryY.current = Math.max(
                            -(thumbsInnerRef.current!.scrollHeight - wrapH),
                            Math.min(0, targetY),
                          );
                          qGalleryY.current(galleryY.current);
                        }
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex-1 h-full p-8 md:p-12 flex items-center justify-center relative bg-[#050505]">
                {selectedProject.gallery.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="Main Preview"
                    className={`absolute max-w-[85%] max-h-[85%] object-contain transition-all duration-700 ease-out ${i === activeGalleryIdx ? "opacity-100 scale-100 blur-none" : "opacity-0 scale-95 blur-md pointer-events-none"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
