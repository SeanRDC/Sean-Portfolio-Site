import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Loader2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Reveal from "../components/Reveal";
import { projects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

// --- GLOBAL VARIABLES ---
const demoVideoUrl =
  "https://cdn.coverr.co/videos/coverr-abstract-neon-light-loop-5536/1080p.mp4";

// --- HOVER-TO-PLAY VIDEO CARD ---
function HoverVideoCard({
  p,
  onClick,
}: {
  p: any;
  onClick: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      // Silently rewind after the CSS opacity fade finishes
      setTimeout(() => {
        if (videoRef.current && videoRef.current.paused) {
          videoRef.current.currentTime = 0;
        }
      }, 500);
    }
  };

  return (
    <button
      onClick={(e) => onClick(e, p.id)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group block w-full text-left outline-none cursor-pointer transform-gpu"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] bg-[var(--glass-fill)] border border-[var(--glass-border)] transition-colors transition-shadow duration-500 group-hover:border-white/20 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transform-gpu">
        {/* Static Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 transform-gpu"
          style={{ background: p.cover }}
        />

        {/* Video Player (Crossfades in on hover) */}
        <video
          ref={videoRef}
          src={p.videoUrl || demoVideoUrl}
          preload="none"
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 transform-gpu"
        />

        {/* Gradient Legibility Map */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Platform Pill */}
        <span className="absolute right-5 top-5 z-20 rounded-full border border-white/20 bg-black/40 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.1em] text-white backdrop-blur-md">
          {p.platform}
        </span>
      </div>

      <div className="mt-6 flex items-start justify-between px-2">
        <div>
          <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-cyan">
            {p.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted max-w-sm transition-colors duration-300 group-hover:text-ink line-clamp-2">
            {p.subtitle}
          </p>
        </div>
      </div>
    </button>
  );
}

// --- ODOMETER COUNTER COMPONENT ---
function Odometer({ value }: { value: string }) {
  const chars = value.split("");

  return (
    <div className="flex items-baseline overflow-hidden" data-odometer>
      {chars.map((char, i) => {
        if (isNaN(Number(char))) {
          return (
            <span key={i} className="text-cyan">
              {char}
            </span>
          );
        }
        return (
          <div
            key={i}
            className="relative flex flex-col h-[1em] overflow-hidden leading-none"
          >
            <div className="digit-stack flex flex-col will-change-transform leading-none">
              <span className="h-[1em]">0</span>
              <span className="h-[1em]">{char}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function WorkView() {
  const navigate = useNavigate();

  // Refs
  const growContainerRef = useRef<HTMLDivElement>(null);
  const growVideoRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Arrays for seamless infinite loops
  const tickerProjects = [...projects, ...projects, ...projects];
  const techStack = [
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Tailwind CSS",
    "TypeScript",
    "GSAP",
    "Figma",
    "Vercel",
    "GitHub",
  ];
  const techTicker = [...techStack, ...techStack, ...techStack];

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  );
  const [isNavigating, setIsNavigating] = useState(false);

  useGSAP(() => {
    const measure = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", measure);

    // --- 1. GROWING VIDEO HERO ANIMATION (DESKTOP ONLY) ---
    if (!isMobile && growContainerRef.current && growVideoRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: growContainerRef.current,
          start: "center center",
          end: "+=200%", // Pins the container and gives it 2 extra full scrolls to play out
          scrub: 1, // Smooth, buttery scrub
          pin: true,
          anticipatePin: 1, // Fixes scrollbar jumping
        },
      });

      // Phase 1: Expand perfectly from the center to full screen
      tl.to(growVideoRef.current, {
        width: "100vw",
        height: "100vh",
        borderRadius: "0px",
        ease: "none",
        duration: 1, // Uses the first 50% of the pinned scroll to expand
      });

      // Phase 2: The "Hold" (Keeps it pinned at 100vw/100vh for the next 2 full scrolls)
      tl.to({}, { duration: 1 });
    }

    // --- 2. ODOMETER ROLLING ANIMATIONS ---
    gsap.utils.toArray("[data-odometer]").forEach((odo: any) => {
      const stacks = odo.querySelectorAll(".digit-stack");
      stacks.forEach((stack: any, i: number) => {
        gsap.to(stack, {
          y: "-50%",
          duration: 0.9,
          ease: "power2.out",
          delay: 0.12 * i,
          scrollTrigger: {
            trigger: odo,
            start: "top 85%",
            once: true,
          },
        });
      });
    });

    // --- 3. HORIZONTAL DRAG & SCROLL TICKER (DESKTOP ONLY) ---
    if (!isMobile && trackRef.current) {
      const track = trackRef.current;
      let s = 0;
      let c = 0;
      let h = window.scrollY;

      let isDragging = false;
      let startX = 0;
      let startC = 0;
      let lastTime = 0;
      let velocity = 0;
      let lastX = 0;

      const handlePointerDown = (e: PointerEvent) => {
        isDragging = true;
        startX = e.clientX;
        startC = c;
        lastX = startX;
        lastTime = performance.now();
        track.style.cursor = "grabbing";
        document.body.style.userSelect = "none";
      };

      const handlePointerMove = (e: PointerEvent) => {
        if (!isDragging) return;
        const currentX = e.clientX;
        const dx = currentX - startX;
        c = startC + dx * 1.5;

        const now = performance.now();
        const dt = Math.max(16, now - lastTime);
        velocity = ((currentX - lastX) / dt) * 1000;
        lastX = currentX;
        lastTime = now;
      };

      const handlePointerUp = () => {
        if (!isDragging) return;
        isDragging = false;
        track.style.cursor = "grab";
        document.body.style.userSelect = "";

        if (Math.abs(velocity) > 25) {
          const momentum = velocity * 0.18;
          c += momentum;
        }
      };

      track.addEventListener("pointerdown", handlePointerDown);
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
      window.addEventListener("pointercancel", handlePointerUp);

      const onTick = () => {
        const scrollY = window.scrollY;
        let r = scrollY - h;
        h = scrollY;

        if (!isDragging) {
          r = gsap.utils.clamp(-90, 90, r);
          c -= 0.45 * r;
        }

        s += 0.085 * (c - s);

        const trackWidth = track.scrollWidth;
        const oneThird = trackWidth / 3;
        const wrappedS = gsap.utils.wrap(-oneThird, 0, s);

        gsap.set(track, { x: wrappedS });
      };

      gsap.ticker.add(onTick);

      return () => {
        gsap.ticker.remove(onTick);
        track.removeEventListener("pointerdown", handlePointerDown);
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
        window.removeEventListener("pointercancel", handlePointerUp);
        window.removeEventListener("resize", measure);
      };
    }
  }, [isMobile]);

  const handleProjectClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    if (isNavigating) return;
    setIsNavigating(true);
    setTimeout(() => navigate(`/project/${id}`), 600);
  };

  return (
    <div className="min-h-screen w-full pb-10">
      {/* Navigation Loading Screen */}
      {isNavigating && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center backdrop-blur-md transition-opacity duration-300"
          style={{ background: "rgba(0,0,0,0.2)" }}
        >
          <Loader2 className="h-10 w-10 animate-spin text-cyan mb-4" />
          <span className="text-xs font-medium uppercase tracking-widest text-ink">
            Loading...
          </span>
        </div>
      )}

      {/* HERO TEXT SECTION */}
      {/* Dynamically adjust padding/height based on mobile to perfectly center text */}
      <section
        className={`flex flex-col justify-center items-center px-6 relative z-10 ${
          isMobile ? "pt-40 pb-20 min-h-[85vh]" : "pt-[25vh] pb-12 min-h-[60vh]"
        }`}
      >
        <Reveal className="max-w-5xl text-center">
          <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink md:text-6xl lg:text-7xl">
            I specialize in{" "}
            <em className="font-serif italic text-cyan">design-led</em> frontend
            development and{" "}
            <em className="font-serif italic text-violet">full-stack</em>{" "}
            platforms
          </h1>
          <p className="mx-auto mt-8 max-w-lg text-lg leading-relaxed text-ink-muted">
            From handcrafted UI/UX to robust MERN architectures, creating
            digital products for modern brands.
          </p>
        </Reveal>
      </section>

      {/* SCROLL-TO-GROW VIDEO HERO (STRICTLY HIDDEN ON MOBILE) */}
      {!isMobile && (
        <div className="w-full -mt-[15vh] relative z-20 hidden md:block">
          <section
            ref={growContainerRef}
            className="relative h-screen w-full overflow-hidden"
          >
            {/* Absolute centering prevents the layout from breaking when pinned */}
            <div
              ref={growVideoRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass-strong glass-edge overflow-hidden shadow-2xl flex items-center justify-center will-change-transform transform-gpu"
              style={{
                width: "360px",
                height: "575px",
                borderRadius: "24px",
              }}
            >
              <video
                src="/work/test-loop.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-cyan-500/20 opacity-40 mix-blend-overlay" />
            </div>
          </section>
        </div>
      )}

      {/* SERVICES SECTION (PERFECTED CSS GRID STICKY FROM SCREENSHOT) */}
      <section className="px-6 py-32 md:px-10">
        <div className="mx-auto max-w-7xl">
          {/* Exact CSS match from your screenshot: grid with items-start */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 lg:gap-[8vw] items-start relative">
            {/* PINNED LEFT COLUMN */}
            <div className="sticky top-32 mb-0 z-10">
              <div className="overflow-hidden mb-3">
                <h2 className="font-display text-4xl lg:text-5xl font-semibold text-ink leading-tight">
                  Services
                </h2>
              </div>
              <p className="text-sm text-ink-muted leading-relaxed max-w-[260px]">
                Comprehensive solutions from UI/UX design to full-stack MERN
                architectures. Profiled under load. Not just imported.
              </p>
            </div>

            {/* SCROLLING RIGHT COLUMN (12 Boxes) */}
            <div className="flex flex-col gap-10">
              <Reveal>
                <div className="glass glass-edge rounded-[24px] p-8 md:p-12 transition-colors hover:bg-white/5">
                  <h3 className="font-display text-3xl font-semibold text-ink leading-tight mb-4">
                    Visual Identity & UI Design
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed max-w-2xl">
                    I offer a complete visual identity service, building
                    foundational wireframes into high-fidelity Figma prototypes.
                    I ensure your brand clearly communicates its vision while
                    establishing a frictionless, beautiful user journey.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div className="glass glass-edge rounded-[24px] p-8 md:p-12 transition-colors hover:bg-white/5">
                  <h3 className="font-display text-3xl font-semibold text-ink leading-tight mb-4">
                    Frontend Development
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed max-w-2xl">
                    Expertly coded React applications executed with precision.
                    Website performance and complex GSAP animations are central
                    components of every site I build. All products are scalable,
                    SEO optimized, and perfectly mobile-responsive.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div className="glass glass-edge rounded-[24px] p-8 md:p-12 transition-colors hover:bg-white/5">
                  <h3 className="font-display text-3xl font-semibold text-ink leading-tight mb-4">
                    Full-Stack Architecture
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed max-w-2xl">
                    Developing robust, secure backends using the MERN stack.
                    From custom API routes and JWT authentication to secure
                    server-side rendering, I construct architectures that allow
                    your business data to scale effortlessly.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div className="glass glass-edge rounded-[24px] p-8 md:p-12 transition-colors hover:bg-white/5">
                  <h3 className="font-display text-3xl font-semibold text-ink leading-tight mb-4">
                    Database Modeling
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed max-w-2xl">
                    Designing complex MongoDB and Mongoose schemas to
                    effectively manage relationships, business logic, and
                    high-volume operations, ensuring data integrity and rapid
                    query performance.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div className="glass glass-edge rounded-[24px] p-8 md:p-12 transition-colors hover:bg-white/5">
                  <h3 className="font-display text-3xl font-semibold text-ink leading-tight mb-4">
                    API Integration
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed max-w-2xl">
                    Seamlessly connecting third-party services, payment
                    gateways, and external microservices to your core
                    application. I build reliable RESTful pipelines that enhance
                    your platform's capabilities.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div className="glass glass-edge rounded-[24px] p-8 md:p-12 transition-colors hover:bg-white/5">
                  <h3 className="font-display text-3xl font-semibold text-ink leading-tight mb-4">
                    Business Automation
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed max-w-2xl">
                    I design and build bespoke admin dashboards, point-of-sale
                    systems, and custom automation tools for businesses looking
                    for a tailored approach that reflects their specific
                    operational workflows.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div className="glass glass-edge rounded-[24px] p-8 md:p-12 transition-colors hover:bg-white/5">
                  <h3 className="font-display text-3xl font-semibold text-ink leading-tight mb-4">
                    Interactive Motion
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed max-w-2xl">
                    Going beyond static interfaces. I inject life into platforms
                    using advanced mathematical animation libraries, creating
                    scroll-tied physics and micro-interactions that elevate
                    brand perception.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div className="glass glass-edge rounded-[24px] p-8 md:p-12 transition-colors hover:bg-white/5">
                  <h3 className="font-display text-3xl font-semibold text-ink leading-tight mb-4">
                    Performance & SEO
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed max-w-2xl">
                    Conducting deep-dive audits into application performance. I
                    optimize asset delivery, refine React render cycles, and
                    structure semantic HTML to ensure your site is blazing fast
                    and discoverable.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div className="glass glass-edge rounded-[24px] p-8 md:p-12 transition-colors hover:bg-white/5">
                  <h3 className="font-display text-3xl font-semibold text-ink leading-tight mb-4">
                    CI/CD & Deployment
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed max-w-2xl">
                    Setting up automated deployment pipelines and version
                    control workflows using GitHub and platforms like Vercel or
                    Render. This guarantees downtime-free updates and a smooth
                    developer experience.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div className="glass glass-edge rounded-[24px] p-8 md:p-12 transition-colors hover:bg-white/5">
                  <h3 className="font-display text-3xl font-semibold text-ink leading-tight mb-4">
                    Headless Architecture
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed max-w-2xl">
                    Decoupling the frontend presentation layer from backend
                    content management systems. This modern approach provides
                    ultimate design freedom while empowering your team with
                    easy-to-use content editors.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div className="glass glass-edge rounded-[24px] p-8 md:p-12 transition-colors hover:bg-white/5">
                  <h3 className="font-display text-3xl font-semibold text-ink leading-tight mb-4">
                    Authentication & Security
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed max-w-2xl">
                    Implementing robust security protocols to protect user data.
                    From stateless JWT authentication to role-based access
                    control (RBAC), I ensure your application is fortified
                    against modern vulnerabilities.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div className="glass glass-edge rounded-[24px] p-8 md:p-12 transition-colors hover:bg-white/5">
                  <h3 className="font-display text-3xl font-semibold text-ink leading-tight mb-4">
                    Web Accessibility (a11y)
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed max-w-2xl">
                    Designing inclusive digital experiences. I implement strict
                    ARIA standards, keyboard navigability, and color contrast
                    requirements so your platform is usable, beautiful, and
                    accessible to everyone.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* HORIZONTAL PROJECTS TICKER */}
      <section className="relative w-full overflow-hidden py-16">
        {isMobile ? (
          <div className="px-6 flex flex-col gap-12">
            {projects.map((p) => (
              <Reveal key={p.id}>
                <HoverVideoCard p={p} onClick={handleProjectClick} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="flex w-[100vw] items-center">
            <div
              ref={trackRef}
              className="flex w-max items-center gap-10 px-10 will-change-transform cursor-grab touch-pan-y"
            >
              {tickerProjects.map((p, i) => (
                <div
                  key={`${p.id}-${i}`}
                  className="w-[50vw] lg:w-[40vw] xl:w-[32vw] flex-none"
                >
                  <HoverVideoCard p={p} onClick={handleProjectClick} />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ODOMETER STATS SECTION */}
      <section className="px-6 py-24 md:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 text-center md:text-left">
            <div>
              <div className="font-display text-5xl md:text-7xl font-semibold text-ink flex items-baseline justify-center md:justify-start">
                <Odometer value="3" />
                <span className="text-cyan">+</span>
              </div>
              <p className="mt-4 text-xs font-semibold text-ink-muted uppercase tracking-[0.15em]">
                Years of <br /> Experience
              </p>
            </div>
            <div>
              <div className="font-display text-5xl md:text-7xl font-semibold text-ink flex items-baseline justify-center md:justify-start">
                <Odometer value="12" />
                <span className="text-cyan">+</span>
              </div>
              <p className="mt-4 text-xs font-semibold text-ink-muted uppercase tracking-[0.15em]">
                Verified <br /> Certifications
              </p>
            </div>
            <div>
              <div className="font-display text-5xl md:text-7xl font-semibold text-ink flex items-baseline justify-center md:justify-start">
                <Odometer value="100" />
                <span className="text-cyan">%</span>
              </div>
              <p className="mt-4 text-xs font-semibold text-ink-muted uppercase tracking-[0.15em]">
                Responsive <br /> Mobile Code
              </p>
            </div>
            <div>
              <div className="font-display text-5xl md:text-7xl font-semibold text-ink flex items-baseline justify-center md:justify-start">
                <Odometer value="5" />
              </div>
              <p className="mt-4 text-xs font-semibold text-ink-muted uppercase tracking-[0.15em]">
                Star Client <br /> Reviews
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TECH STACK MARQUEE */}
      <section className="w-full overflow-hidden py-24 border-t border-white/5 bg-[var(--panel-deep)] mt-10">
        <div className="mx-auto px-6 max-w-6xl mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-ink-muted">
            Technology Stack
          </p>
        </div>
        <div className="flex w-[200%] sm:w-[150%] md:w-[100%] gap-16 whitespace-nowrap animate-[marquee_12s_linear_infinite] items-center">
          {techTicker.map((tech, idx) => (
            <div key={idx} className="flex items-center gap-5">
              <img
                src="/favicon.ico"
                alt={`${tech} logo`}
                className="w-10 h-10 object-contain opacity-60 mix-blend-screen"
                loading="lazy"
              />
              <span className="font-display text-4xl md:text-6xl font-semibold text-ink-faint tracking-tight">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* GET IN TOUCH & SOCIALS (Exact match for reference image) */}
      <section className="px-6 py-32 bg-black border-t border-white/5">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-[1fr_auto] gap-16 items-start">
          <Reveal>
            <h3 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight">
              Get in touch.
            </h3>
            <p className="mt-6 text-lg text-white/50 max-w-md">
              Currently open for new opportunities. Send a message to begin your
              digital journey.
            </p>
          </Reveal>

          <Reveal className="flex flex-col gap-6 md:items-end">
            <a
              href="mailto:hello@seancruz.dev"
              className="text-3xl md:text-4xl font-semibold text-white hover:text-cyan transition-colors"
            >
              hello@seancruz.dev
            </a>

            <div className="flex flex-wrap gap-8 mt-2 md:mt-4">
              <a
                href="#"
                className="text-white/50 hover:text-cyan transition-colors uppercase tracking-[0.2em] text-sm font-semibold"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-white/50 hover:text-cyan transition-colors uppercase tracking-[0.2em] text-sm font-semibold"
              >
                GitHub
              </a>
              <a
                href="#"
                className="text-white/50 hover:text-cyan transition-colors uppercase tracking-[0.2em] text-sm font-semibold"
              >
                Twitter
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  );
}
