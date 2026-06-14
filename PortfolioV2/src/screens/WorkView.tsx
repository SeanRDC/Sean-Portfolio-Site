import { useRef } from "react";
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
    id: "flower-catalogue",
    title: "Flower Catalogue",
    category: "UI/UX Design",
    desc: "A lush, immersive visual directory utilizing fluid typography and dynamic data mapping.",
  },
  {
    id: "pixel-ecommerce",
    title: "Pixel E-Commerce",
    category: "Full-Stack Development",
    desc: "MERN stack architecture delivering seamless cart state management and secure authentication.",
  },
  {
    id: "debut-invitation",
    title: "Debut Invitation",
    category: "Web Development",
    desc: "A personalized digital invitation experience featuring elegant motion design and interactive RSVP handling.",
  },
];

export default function WorkView() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>(".project-pane");

      // Calculate scroll distance for horizontal track
      const totalWidth = trackRef.current?.scrollWidth || 0;
      const viewportWidth = window.innerWidth;
      const distanceToScroll = totalWidth - viewportWidth;

      // Pin the container and slide the track horizontally
      gsap.to(panels, {
        x: () => -distanceToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: pinRef.current,
          pin: true,
          scrub: 1, // Weighted fluid feel
          end: () => `+=${viewportWidth * 3}`,
        },
      });

      // Nested Focus Logic per pane
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

  return (
    <section className="relative overflow-hidden bg-void">
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
              className="project-pane glass glass-edge relative h-full w-[85vw] max-w-4xl flex-shrink-0 overflow-hidden rounded-[32px] p-10 flex flex-col justify-end"
              data-cursor
            >
              <div className="absolute inset-0 -z-10 bg-panel-deep" />

              <div className="relative z-10 w-full max-w-md glass p-8 rounded-[24px]">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-cyan">
                  {project.category}
                </span>
                <h2 className="mb-4 font-display text-3xl font-bold text-ink">
                  {project.title}
                </h2>
                <p className="text-ink-muted leading-relaxed">{project.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
