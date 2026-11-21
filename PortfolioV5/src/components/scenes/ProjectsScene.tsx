import { useRef, useState, useEffect } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type Shot = {
  src: string;
  thumb: string;
  w: number;
  h: number;
  mobile: boolean;
};

type Project = {
  n: string;
  title: string;
  kind: string;
  blurb: string;
  meta: string[];
  image: string;
  gallery: Shot[];
  year?: string;
  group?: boolean;
  github: string;
  live?: string;
  // Card colour, taken from the project's own look; dark cards get paper text.
  tint: string;
  dark?: boolean;
};

// Desktop stills come first, then the mobile counterparts when a project has
// them. Each still has a 480px copy in thumbs/ for the thumbnail rail.
const shots = (
  folder: string,
  prefix: string,
  desktop: [number, number],
  mobile?: [number, number],
  count = 5,
  mobileCount = count,
): Shot[] => {
  const make = (name: string, [w, h]: [number, number], isMobile: boolean) => ({
    src: `/mockups/${folder}/${name}.webp`,
    thumb: `/mockups/${folder}/thumbs/${name}.webp`,
    w,
    h,
    mobile: isMobile,
  });
  const list: Shot[] = [];
  for (let i = 1; i <= count; i++) list.push(make(`${prefix}-${i}`, desktop, false));
  if (mobile)
    for (let i = 1; i <= mobileCount; i++)
      list.push(make(`${prefix}-mobile-${i}`, mobile, true));
  return list;
};

const PROJECTS: Project[] = [
  {
    n: "01",
    title: "PROJECT HAU",
    kind: "2.5D Pixel Art Campus Adventure",
    blurb:
      "A 2.5D pixel art adventure that lets players explore the Holy Angel University campus, rebuilt 1:1 from the real buildings in Godot 4. Pixel art lives in a lit 3D world with real shadows, a time-of-day cycle, weather and ambient sound, and campus NPCs who talk and remember your answers.",
    meta: ["Godot 4", "GDScript", "2.5D Pixel Art", "Shaders"],
    image: "/mockups/ProjectHAU/project-hau-1.webp",
    gallery: shots("ProjectHAU", "project-hau", [1596, 898]),
    year: "2026",
    group: true,
    github: "https://github.com/SeanRDC/Project-HAU",
    tint: "#57553f",
    dark: true,
  },
  {
    n: "02",
    title: "WHATSAPP AGENT",
    kind: "Multimodal AI Notification Router",
    blurb:
      "An AI notification router for WhatsApp built during the 24-hour HackerRank Orchestrate hackathon. It reads text, image posters and voice notes alongside each user's history and sender trust, then has Gemini decide through a strict JSON schema whether a message should notify, wait for the digest, or be muted.",
    meta: ["Python", "Gemini API", "Pandas", "Google GenAI SDK"],
    image: "/images/router-cover.webp",
    gallery: shots("WhatsAppRouter", "router", [1736, 955], undefined, 3),
    year: "2026",
    github: "https://github.com/SeanRDC/Orchestrate-Whatsapp-AI-Agent",
    tint: "#13231d",
    dark: true,
  },
  {
    n: "03",
    title: "HAU-SYNC",
    kind: "Clinic Records & Appointment System",
    blurb:
      "A patient record and appointment system that replaces the Holy Angel University Clinic's paper logs. The front desk, nurse and doctor share one live record over WebSockets, with role-based access, audited views of patient data, medicine inventory and reports, all kept on the clinic's own network under the Data Privacy Act.",
    meta: ["FastAPI", "React + TypeScript", "PostgreSQL", "WebSockets"],
    image: "/mockups/ClinicSystem/hau-sync-1.webp",
    gallery: shots("ClinicSystem", "hau-sync", [1903, 910], [720, 1564]),
    year: "2026",
    group: true,
    github: "https://github.com/SeanRDC/Final-Project-Software-Engineering",
    tint: "#6b1f29",
    dark: true,
  },
  {
    n: "04",
    title: "VELO",
    kind: "AI-Powered Canvas LMS Client",
    blurb:
      "A distraction-free, local-first Canvas LMS client that pulls every deadline across all enrolled courses into one sorted feed. It pairs a tool-calling AI co-pilot and study planner with offline caching, and ships with a scroll-driven landing page built in React and GSAP.",
    meta: ["Flutter", "Canvas REST API", "Groq AI", "React + GSAP"],
    image: "/images/velo-cover.webp",
    gallery: shots("VeloCopilot", "velo", [1919, 908], [720, 1561]),
    year: "2026",
    github: "https://github.com/SeanRDC/Velo-A-better-canvas",
    tint: "#e7e6e1",
    live: "https://velo-landing-page-delta.vercel.app/",
  },
  {
    n: "05",
    title: "WAKO BEANS",
    kind: "Scroll-Driven Coffee Storefront",
    blurb:
      "A coffee shop you walk down a mountain, from a 1,800 m Arabica farm to a 310 m Liberica one, covering all four coffee species grown in the Philippines. The bags and beans are built by Python script and rendered in Blender, a farm film scrubs with the scroll, and the shop works from bag to order confirmation, checked by Playwright and axe tests.",
    meta: ["Next.js", "GSAP + Lenis", "Blender + Python", "Zustand + Zod"],
    image: "/images/wako-beans-cover.webp",
    gallery: shots("WakoBeans", "wako-beans", [1920, 1200], [720, 1209]),
    year: "2026",
    github: "https://github.com/SeanRDC/wako-beans",
    tint: "#f2b632",
  },
  {
    n: "06",
    title: "WAKO MATCHA",
    kind: "Scroll-Driven 3D Storefront",
    blurb:
      "A matcha shop told through the product itself, with tins and tea tools modelled in Blender and moved by the scroll. Each of the four grades gets its own 3D stage, and the whole purchase flow works from browsing to confirmation as a front-end concept, with rendered stills for devices that can't run the 3D.",
    meta: ["Next.js", "React Three Fiber", "GSAP + Lenis", "Blender"],
    image: "/images/wako-cover.webp",
    gallery: shots("WakoMatcha", "wako", [1920, 1080], [720, 1558], 9, 5),
    year: "2026",
    github: "https://github.com/SeanRDC/wako-matcha",
    tint: "#2f3d2a",
    dark: true,
    live: "https://wako-matcha.vercel.app",
  },
  {
    n: "07",
    title: "BEADED",
    kind: "Full-Stack E-Commerce Platform",
    blurb:
      "A full-stack storefront for handcrafted bead jewelry with a custom bracelet builder that prices and sizes each design from real bead measurements. Checkout runs through PayMongo with signed webhooks and server-side totals, and a bespoke admin studio manages orders, catalogue, shipping and themes.",
    meta: ["React + GSAP", "Node.js", "PayMongo", "MongoDB Atlas"],
    image: "/images/beaded-cover.webp",
    gallery: shots("BeadedCommerce", "beaded", [1920, 1200], [720, 1558]),
    year: "2026",
    github: "https://github.com/SeanRDC/Beaded-By-Unknown-Website",
    tint: "#d9cfc4",
    live: "https://www.beadedbyunknown.shop",
  },
  {
    n: "08",
    title: "PEONY",
    kind: "Digital Flower Encyclopedia",
    blurb:
      "A dynamic digital herbarium featuring a custom multi-parameter filtering engine, Google OAuth integration, and a custom 6-digit OTP verification system. Frontend rendering is optimized with debounced search and asynchronous skeleton loaders.",
    meta: ["React", "Framer Motion", "Google OAuth", "REST APIs"],
    image: "/images/flower-cover.webp",
    gallery: shots("FlowerCatalogue", "flower", [1903, 907], [720, 1249]),
    year: "2026",
    github: "https://github.com/SeanRDC/Flower-Catalogue-Website",
    tint: "#efd2dc",
    live: "https://flower-catalogue-website.vercel.app",
  },
  {
    n: "09",
    title: "PIXEL",
    kind: "Modular E-Commerce Architecture",
    blurb:
      "A performance-focused storefront engine utilizing a headless modular CMS, prioritizing state management and rendering speed for scalable e-commerce deployments.",
    meta: [
      "React",
      "Headless CMS",
      "State Management",
      "Performance Optimization",
    ],
    image: "/images/pixel-cover.webp",
    gallery: shots("PixelCommerce", "pixel", [1919, 907]),
    year: "2026",
    github: "https://github.com/SeanRDC/Pixel-Clothing-Website",
    tint: "#1f272b",
    dark: true,
    live: "https://pixel-clothing-website.vercel.app/",
  },
];

// True for a real mouse or trackpad; false for fingers and styluses.
const canHover = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// Long titles shrink to fit their column instead of overflowing (or wrapping
// mid flight-transition). --title-room is the width each layout gives the
// title; Archivo at this width/weight averages ~0.85em per capital.
const fitTitle = (title: string, size: string) => ({
  fontSize: `min(${size}, calc(var(--title-room) / ${(title.length * 0.88).toFixed(2)}))`,
});

// Each card sticks just under the fixed nav, a step lower than the card before
// it, so the top edges of the cards underneath show as a pile.
const STACK_TOP = 88;
const STACK_STEP = 10;

export default function ProjectsScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const cursorRef = useRef<HTMLDivElement>(null);
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

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);

  // Main previews only get a src once they're the active still or a neighbour,
  // so opening a case study doesn't fetch and decode every full-size shot at once.
  // Once loaded they stay loaded so the crossfade back still has an image.
  const [primedShots, setPrimedShots] = useState<Set<number>>(() => new Set());
  const primeAround = (idx: number) => (prev: Set<number>) =>
    prev.has(idx - 1) && prev.has(idx) && prev.has(idx + 1)
      ? prev
      : new Set([...prev, idx - 1, idx, idx + 1]);

  useGSAP(
    () => {
      if (!cursorRef.current) return;
      // Follow the mouse with transforms (compositor only) instead of left/top.
      gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });
      xMoveCursor.current = gsap.quickTo(cursorRef.current, "x", {
        duration: 0.2,
        ease: "power3",
      });
      yMoveCursor.current = gsap.quickTo(cursorRef.current, "y", {
        duration: 0.2,
        ease: "power3",
      });
    },
    { scope: sectionRef },
  );

  // As the next card slides over a pinned card, the pinned one shrinks a little
  // and darkens, so the pile reads as depth. Written to a CSS variable straight
  // on the DOM so scrolling never re-renders the scene.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let rafId = 0;

    const update = () => {
      rafId = 0;
      const section = sectionRef.current;
      if (!section) return;
      const box = section.getBoundingClientRect();
      if (box.bottom < 0 || box.top > window.innerHeight) return;

      const cards = cardRefs.current;
      const rects = cards.map((c) => c?.getBoundingClientRect());
      cards.forEach((card, i) => {
        const cur = rects[i];
        const next = rects[i + 1];
        if (!card || !cur) return;
        const covered = next
          ? Math.min(1, Math.max(0, 1 - (next.top - cur.top) / cur.height))
          : 0;
        card.style.setProperty("--stack", covered.toFixed(4));
      });
    };
    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // --- SEAMLESS TRANSITION IN ---
  const openProject = (e: React.SyntheticEvent, p: Project) => {
    e.preventDefault();
    handleMouseLeave();

    const sourceTitle = titleRefs.current[p.n];
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
      setPrimedShots(new Set());
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

    const sourceTitle = titleRefs.current[selectedProject.n];
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
  }, [selectedProject]);

  // --- CUSTOM SCROLL GALLERY LOGIC ---
  useEffect(() => {
    const el = detailOverlayRef.current;
    if (!el || !selectedProject || window.innerWidth < 768) return;

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
    if (!selectedProject || window.innerWidth < 768) return;
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
        setPrimedShots(primeAround(closestIdx));
      }
      rafId = requestAnimationFrame(updateActive);
    };

    rafId = requestAnimationFrame(updateActive);
    return () => cancelAnimationFrame(rafId);
  }, [selectedProject]);

  const handleMouseMove = (e: React.MouseEvent) => {
    xMoveCursor.current?.(e.clientX);
    yMoveCursor.current?.(e.clientY);
  };

  const handleMouseEnter = () => {
    // A tap fires emulated mouse events; on touch the cursor would pop up and
    // stay stuck, so it is mouse-only.
    if (!canHover()) return;
    hovering.current = true;
    gsap.to(cursorRef.current, {
      scale: 1,
      autoAlpha: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    hovering.current = false;
    gsap.to(cursorRef.current, {
      scale: 0.5,
      autoAlpha: 0,
      duration: 0.3,
      ease: "power2.in",
    });
  };

  // Scrolling moves the cards under a still pointer without firing mouseenter,
  // so on scroll re-check whether a card sits under the last pointer position.
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const hovering = useRef(false);

  useEffect(() => {
    if (selectedProject || !canHover()) return;
    let rafId = 0;

    const onPointerMove = (e: MouseEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY };
    };
    const onPointerOut = (e: MouseEvent) => {
      if (!e.relatedTarget) pointer.current = null;
    };
    const check = () => {
      rafId = 0;
      const p = pointer.current;
      if (!p) return;
      const over = !!document
        .elementFromPoint(p.x, p.y)
        ?.closest(".proj-card");
      if (over === hovering.current) return;
      if (over) {
        xMoveCursor.current?.(p.x);
        yMoveCursor.current?.(p.y);
        handleMouseEnter();
      } else {
        handleMouseLeave();
      }
    };
    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(check);
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });
    document.addEventListener("mouseout", onPointerOut);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onPointerMove);
      document.removeEventListener("mouseout", onPointerOut);
      window.removeEventListener("scroll", onScroll);
    };
  }, [selectedProject]);

  return (
    <div className="relative">
      {/* 1. MAIN PROJECTS SCENE: a stack of cards that pin and pile up */}
      <section
        ref={sectionRef}
        className="relative bg-paper px-4 pt-32 md:px-16"
        id="projects"
        onMouseMove={handleMouseMove}
      >
        <div
          ref={cursorRef}
          className="pointer-events-none fixed left-0 top-0 z-50 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-ink text-paper font-mono-x text-[9px] font-bold uppercase tracking-widest opacity-0 scale-50"
        >
          View
        </div>

        <div className="mx-auto mb-16 max-w-[1500px] font-mono-x text-[10px] uppercase tracking-[0.3em] text-ink-dim md:mb-20">
          020 — Project Index
        </div>

        <div
          data-project-stack
          className="mx-auto flex max-w-[1500px] flex-col gap-[8vh] pb-[22vh]"
        >
          {PROJECTS.map((p, i) => (
            <article
              key={p.n}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              role="link"
              tabIndex={0}
              aria-label={`Open the ${p.title} case study`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => openProject(e, p)}
              onKeyDown={(e) => {
                if (e.key === "Enter") openProject(e, p);
              }}
              className="proj-card tap group sticky grid origin-top cursor-pointer gap-5 overflow-hidden border border-black/10 p-4 outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-paper md:cursor-none md:grid-cols-12 md:items-stretch md:gap-10 md:p-8"
              style={{
                top: STACK_TOP + i * STACK_STEP,
                background: p.tint,
                color: p.dark ? "var(--paper)" : "var(--ink)",
                transform: "scale(calc(1 - var(--stack, 0) * 0.05))",
              }}
            >
              <div className="relative aspect-[16/10] overflow-hidden md:col-span-7">
                <img
                  src={p.image}
                  alt={`${p.title} cover`}
                  loading="lazy"
                  decoding="async"
                  className="block h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex min-w-0 flex-col justify-between gap-5 md:col-span-5 md:py-2">
                <div>
                  <div className="font-mono-x text-[11px] uppercase tracking-[0.25em] opacity-70">
                    {p.n} <span className="opacity-60">/</span> {p.year || "2026"}
                    {p.group && <span className="opacity-80"> / Group Project</span>}
                  </div>
                  <h2
                    ref={(el) => {
                      titleRefs.current[p.n] = el;
                    }}
                    className="t-colossal m-0 mt-4 w-fit origin-left text-[clamp(34px,4.6vw,84px)] leading-[0.85] tracking-tight [--title-room:calc(100vw_-_72px)] md:mt-6 md:[--title-room:calc((min(100vw,1628px)_-_128px)*5/12_-_80px)]"
                    style={fitTitle(p.title, "clamp(34px,4.6vw,84px)")}
                  >
                    {p.title}
                  </h2>
                  <div className="mt-3 font-mono-x text-[11px] uppercase tracking-[0.2em] opacity-70 md:mt-4">
                    {p.kind}
                  </div>
                  <p className="mt-6 hidden max-w-md font-body text-[15px] font-light leading-relaxed opacity-85 md:line-clamp-4">
                    {p.blurb}
                  </p>
                </div>

                <div className="flex items-end justify-between gap-6">
                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    {p.meta.map((m) => (
                      <span
                        key={m}
                        className="font-mono-x text-[10px] uppercase tracking-wider opacity-75"
                      >
                        <span className="mr-1.5 opacity-60">/</span>
                        {m}
                      </span>
                    ))}
                  </div>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-current font-mono-x text-lg opacity-80 transition-transform duration-300 group-hover:scale-110 md:h-14 md:w-14">
                    ↗
                  </span>
                </div>
              </div>

              {/* Darkens as the next card slides over this one */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-black"
                style={{ opacity: "calc(var(--stack, 0) * 0.35)" }}
              />
            </article>
          ))}
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
        data-lenis-prevent
        className="fixed inset-0 z-[999995] bg-[#0a0a0a] text-[#f5f5f5] opacity-0 overflow-y-auto overscroll-contain md:overflow-hidden"
      >
        {selectedProject && (
          <div className="w-full min-h-full md:h-full flex flex-col md:flex-row max-w-[1800px] mx-auto relative pt-24 md:pt-0">
            {/* LEFT COLUMN: Text Info */}
            <div className="md:w-5/12 h-auto md:h-full flex flex-col justify-start md:justify-center px-8 md:px-16 relative shrink-0 z-[50010]">
              <div className="flex items-baseline gap-5 mb-8">
                <div ref={realDetailTitleWrapRef} className="opacity-0">
                  <h1
                    className="t-colossal text-[clamp(42px,5.5vw,110px)] leading-[0.85] tracking-tight m-0 w-fit text-[#f5f5f5] [--title-room:calc(100vw_-_124px)] md:[--title-room:calc(min(100vw,1800px)*5/12_-_190px)]"
                    style={fitTitle(
                      selectedProject.title,
                      "clamp(42px,5.5vw,110px)",
                    )}
                  >
                    {selectedProject.title}
                  </h1>
                </div>
                <span className="detail-animate-in font-mono-x text-sm font-bold text-[#888] mb-1">
                  {selectedProject.year || "2026"}
                </span>
              </div>
              {selectedProject.group && (
                <div className="detail-animate-in -mt-3 mb-6 font-mono-x text-[10px] uppercase tracking-[0.3em] text-[#777]">
                  Group Project
                </div>
              )}
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
              <div className="detail-animate-in mt-8 flex items-center gap-3">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${selectedProject.title} on GitHub`}
                  title="View source on GitHub"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#333] text-[#999] transition-colors hover:bg-[#f5f5f5] hover:text-[#111]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                </a>
                {selectedProject.live && (
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit the ${selectedProject.title} website`}
                    title="Visit the live website"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[#333] text-[#999] transition-colors hover:bg-[#f5f5f5] hover:text-[#111]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M2 12h20"></path>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  </a>
                )}
              </div>
              {/* Mobile Native Fallback Images */}
              <div className="md:hidden flex flex-col gap-6 mt-16 detail-animate-in pb-24 h-auto overflow-visible">
                {selectedProject.gallery.map((img, i) => (
                  <img
                    key={i}
                    src={img.src}
                    srcSet={`${img.thumb} 480w, ${img.src} ${img.w}w`}
                    sizes="100vw"
                    width={img.w}
                    height={img.h}
                    loading="lazy"
                    decoding="async"
                    alt="Preview"
                    className="w-full rounded-md border border-[#222]"
                  />
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: Custom Scroll Gallery */}
            <div className="hidden md:flex flex-1 h-full relative detail-animate-in">
              <div
                ref={thumbsWrapRef}
                className="w-[100px] md:w-[140px] h-full overflow-hidden flex-shrink-0 relative z-20 border-l border-[#222]"
              >
                <div
                  ref={thumbsInnerRef}
                  className="flex flex-col gap-6 w-full py-[calc(50vh-40px)] px-4"
                >
                  {selectedProject.gallery.map((img, i) => (
                    <img
                      key={i}
                      ref={(el) => {
                        thumbImgRefs.current[i] = el;
                      }}
                      src={img.thumb}
                      alt="Thumbnail"
                      decoding="async"
                      className={`w-full aspect-[4/3] object-cover rounded-md border border-[#333] origin-center transition-transform cursor-pointer ${img.mobile ? "object-top" : ""}`}
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
              <div className="flex-1 h-full p-8 md:p-12 flex items-center justify-center relative">
                {selectedProject.gallery.map((img, i) => (
                  <img
                    key={i}
                    src={
                      Math.abs(i - activeGalleryIdx) <= 1 || primedShots.has(i)
                        ? img.src
                        : undefined
                    }
                    decoding="async"
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
