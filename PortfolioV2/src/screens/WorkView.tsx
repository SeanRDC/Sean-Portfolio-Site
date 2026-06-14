import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- FIXED IMPORT
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Reveal from "../components/Reveal";
import { projects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

export default function WorkView() {
  const navigate = useNavigate();
  const introRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLButtonElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  );
  const [transitioning, setTransitioning] = useState<{
    active: boolean;
    rect: DOMRect | null;
  }>({ active: false, rect: null });

  useGSAP(() => {
    const measure = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", measure);

    if (!isMobile) {
      // 1. Intro Recede Animation
      gsap.to(".intro-content", {
        scale: 0.88,
        opacity: 0,
        filter: "blur(10px)",
        ease: "none",
        scrollTrigger: {
          trigger: introRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // 2. Horizontal Pin-Slide
      const n = projects.length;
      ScrollTrigger.create({
        trigger: pinRef.current,
        pin: true,
        scrub: 1,
        start: "center center",
        end: () => `+=${window.innerHeight * n}`,
        onUpdate: (self) => {
          const progress = self.progress;
          const active = progress * (n - 1);
          setActiveIndex(Math.round(active));

          const containerW = window.innerWidth;
          const paneW = clamp(containerW * 0.58, 440, 660);
          const gap = 48;
          const slot = paneW + gap;
          const trackOffset = containerW / 2 - paneW / 2 - active * slot;

          gsap.set(trackRef.current, { x: trackOffset });

          slidesRef.current.forEach((slide, i) => {
            if (!slide) return;
            const d = Math.min(Math.abs(i - active), 1);
            const scale = 1 - d * 0.12;
            const opacity = 1 - d * 0.5;
            const blur = d * 4;
            const focused = Math.abs(i - active) < 0.5;

            gsap.set(slide, { scale, opacity, filter: `blur(${blur}px)` });
            slide.style.pointerEvents = focused ? "auto" : "none";
            if (focused) slide.setAttribute("data-cursor", "");
            else slide.removeAttribute("data-cursor");
          });
        },
      });
    }

    return () => window.removeEventListener("resize", measure);
  }, [isMobile]);

  const handleProjectClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    if (transitioning.active) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setTransitioning({ active: true, rect });

    gsap.to(".transition-overlay", {
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
      duration: 0.7,
      ease: "power4.inOut",
      onComplete: () => navigate(`/project/${id}`),
    });
  };

  const n = projects.length;
  console.log(n);
  const containerW = typeof window !== "undefined" ? window.innerWidth : 1280;
  const paneW = clamp(containerW * 0.58, 440, 660);
  const gap = 48;
  const initialTrackOffset = containerW / 2 - paneW / 2;

  return (
    <div>
      {transitioning.active && transitioning.rect && (
        <div
          className="transition-overlay fixed z-[100] bg-panel-deep border border-white/10"
          style={{
            top: transitioning.rect.top,
            left: transitioning.rect.left,
            width: transitioning.rect.width,
            height: transitioning.rect.height,
            borderRadius: "28px",
          }}
        />
      )}

      <section
        ref={introRef}
        className="flex min-h-screen items-center justify-center px-6 pt-28"
      >
        <div className="intro-content max-w-2xl text-center will-change-transform">
          <span className="mb-5 inline-block text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
            Selected Work
          </span>
          <h1 className="font-display text-5xl font-semibold leading-[1.02] tracking-tightest text-ink md:text-6xl">
            Four projects I'm proud of.
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-ink-muted">
            Design, build, and the details in between — keep scrolling to move
            through them.
          </p>
          <div className="mt-10 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.16em] text-ink-faint">
            <span
              className="h-px w-8"
              style={{ background: "var(--ink-faint)" }}
            />{" "}
            Scroll to begin
          </div>
        </div>
      </section>

      {isMobile ? (
        <section className="px-5 pb-10">
          <div className="flex flex-col gap-8">
            {projects.map((p) => (
              <Reveal key={p.id}>
                <button
                  data-cursor
                  onClick={(e) => handleProjectClick(e, p.id)}
                  className="glass glass-edge block w-full overflow-hidden rounded-[26px] p-3 text-left"
                >
                  <div
                    className="h-56 w-full rounded-[18px]"
                    style={{
                      background: p.cover,
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25)",
                    }}
                  />
                  <div className="flex items-end justify-between px-3 pb-1 pt-4">
                    <div>
                      <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-xs font-medium uppercase tracking-[0.1em] text-ink-muted">
                        {p.platform} · {p.year}
                      </p>
                    </div>
                    <ArrowUpRight
                      className="h-5 w-5 text-ink-muted"
                      strokeWidth={1.75}
                    />
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </section>
      ) : (
        <section ref={pinRef} className="relative h-screen w-full">
          <div className="absolute inset-0 flex flex-col overflow-hidden">
            <div className="relative flex flex-1 items-center z-10">
              <div
                ref={trackRef}
                className="flex items-center will-change-transform"
                style={{
                  gap: `${gap}px`,
                  transform: `translate3d(${initialTrackOffset}px, 0, 0)`,
                }}
              >
                {projects.map((p, i) => {
                  const initialD = Math.min(Math.abs(i), 1);
                  const scale = 1 - initialD * 0.12;
                  const opacity = 1 - initialD * 0.5;
                  const blur = initialD * 4;
                  const focused = i === 0;

                  return (
                    <div
                      key={p.id}
                      className="flex-none"
                      style={{ width: `${paneW}px` }}
                    >
                      <button
                        ref={(el) => {
                          slidesRef.current[i] = el;
                        }}
                        onClick={(e) => handleProjectClick(e, p.id)}
                        className="glass glass-edge block w-full overflow-hidden rounded-[28px] p-4 text-left will-change-transform"
                        style={{
                          height: "66vh",
                          transform: `scale(${scale})`,
                          opacity: opacity,
                          filter: `blur(${blur}px)`,
                          pointerEvents: focused ? "auto" : "none",
                        }}
                      >
                        <div
                          className="relative h-[calc(100%-92px)] w-full overflow-hidden rounded-[20px]"
                          style={{
                            background: p.cover,
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.28)",
                          }}
                        >
                          <span
                            className="absolute right-4 top-4 rounded-pill px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-ink"
                            style={{
                              background: "rgba(8,8,12,0.4)",
                              border: "1px solid rgba(255,255,255,0.18)",
                            }}
                          >
                            {p.platform}
                          </span>
                        </div>
                        <div className="flex items-end justify-between px-2 pt-5">
                          <div>
                            <h3 className="font-display text-3xl font-semibold tracking-tight text-ink">
                              {p.title}
                            </h3>
                            <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.1em] text-ink-muted">
                              {p.role} · {p.year}
                            </p>
                          </div>
                          <span className="glass flex items-center gap-1.5 rounded-pill px-4 py-2.5 text-sm font-semibold text-ink">
                            View{" "}
                            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                          </span>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 pb-10 z-10">
              <div className="flex items-center gap-2.5">
                {projects.map((_, i) => (
                  <span
                    key={i}
                    className="h-1 rounded-full transition-all duration-300"
                    style={{
                      width: i === activeIndex ? "52px" : "28px",
                      background:
                        i === activeIndex
                          ? "linear-gradient(90deg, var(--violet), var(--cyan))"
                          : "rgba(255,255,255,0.2)",
                      boxShadow:
                        i === activeIndex
                          ? "0 0 10px rgba(79,210,255,0.6)"
                          : undefined,
                    }}
                  />
                ))}
              </div>
              <span className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                Keep scrolling — panes slide horizontally →
              </span>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
