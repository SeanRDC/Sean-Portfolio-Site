import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Reveal from "../components/Reveal";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "beaded-by-unknown",
    title: "Beaded by Unknown",
    category: "E-Commerce & Loyalty",
    desc: "A custom bracelet builder and points-based loyalty engine. What started as a hobby originating from imagination scaled into a complete digital storefront.",
  },
  {
    id: "pixel-ecommerce",
    title: "Pixel E-Commerce",
    category: "Full-Stack Development",
    desc: "MERN stack architecture delivering seamless cart state management and secure authentication.",
  },
  {
    id: "flower-catalogue",
    title: "Flower Catalogue",
    category: "UI/UX Design",
    desc: "A lush, immersive visual directory utilizing fluid typography and dynamic data mapping.",
  },
  {
    id: "debut-invitation",
    title: "Debut Invitation",
    category: "Web Development",
    desc: "A personalized digital invitation experience featuring elegant motion design and interactive RSVP handling.",
  },
];

export default function WorkView() {
  const navigate = useNavigate();
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // State for the transition overlay
  const [transitioning, setTransitioning] = useState<{
    active: boolean;
    rect: DOMRect | null;
  }>({ active: false, rect: null });

  useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>(".project-pane");
      const totalWidth = trackRef.current?.scrollWidth || 0;
      const viewportWidth = window.innerWidth;
      const distanceToScroll = totalWidth - viewportWidth;

      gsap.to(panels, {
        x: () => -distanceToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: pinRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${viewportWidth * 3}`,
        },
      });

      panels.forEach((panel) => {
        gsap.fromTo(
          panel,
          { opacity: 0.5, filter: "blur(3px)", scale: 0.9 },
          {
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            duration: 1,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: gsap.getById("horizontalScroll"),
              start: "left center",
              end: "right center",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      });
    },
    { scope: pinRef },
  );

  const handleProjectClick = (
    e: React.MouseEvent<HTMLDivElement>,
    id: string,
  ) => {
    if (transitioning.active) return;

    // Grab the exact coordinates of the clicked card
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();

    setTransitioning({ active: true, rect });

    // Animate the overlay expanding to full screen
    gsap.to(".transition-overlay", {
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
      duration: 0.7,
      ease: "power4.inOut",
      onComplete: () => {
        navigate(`/project/${id}`);
      },
    });
  };

  return (
    <section className="relative overflow-hidden bg-void">
      {/* Expanding Transition Overlay */}
      {transitioning.active && transitioning.rect && (
        <div
          className="transition-overlay fixed z-[100] bg-panel-deep"
          style={{
            top: transitioning.rect.top,
            left: transitioning.rect.left,
            width: transitioning.rect.width,
            height: transitioning.rect.height,
            borderRadius: "32px",
          }}
        />
      )}

      <div className="flex min-h-[40vh] items-end px-6 pb-12 pt-28 md:px-10">
        <Reveal>
          <span className="mb-3 inline-block text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
            Selected Work
          </span>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-6xl">
            Four projects I'm proud of—
          </h1>
          <p className="mt-4 max-w-xl text-lg text-ink-muted">
            design, build, and the details in between.
          </p>
        </Reveal>
      </div>

      <div
        ref={pinRef}
        className="h-screen overflow-hidden flex items-center pb-20"
      >
        <div
          ref={trackRef}
          className="flex h-[70vh] w-max gap-12 px-10"
          id="horizontalScroll"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={(e) => handleProjectClick(e, project.id)}
              className="project-pane glass glass-edge relative h-full w-[85vw] max-w-4xl flex-shrink-0 overflow-hidden rounded-[32px] p-10 flex flex-col justify-end cursor-none"
              data-cursor
            >
              <div className="absolute inset-0 -z-10 bg-panel-deep pointer-events-none" />

              <div className="relative z-10 w-full max-w-md glass p-8 rounded-[24px] pointer-events-none transition-transform duration-300 hover:scale-[1.02]">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-cyan">
                  {project.category}
                </span>
                <h2 className="mb-4 font-display text-3xl font-bold text-ink">
                  {project.title}
                </h2>
                <p className="text-ink-muted leading-relaxed">{project.desc}</p>
                <span className="mt-6 inline-block text-sm font-semibold uppercase tracking-widest text-violet">
                  View Project →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
