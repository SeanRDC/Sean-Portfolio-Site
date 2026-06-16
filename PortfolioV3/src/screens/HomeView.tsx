import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import BackgroundCanvas from "../components/BackgroundCanvas";
import PixelText from "../components/PixelText";
import ViewToggle from "../components/ViewToggle";
import Carousel from "../components/Carousel";
import ProjectWorks from "../components/ProjectWorks";
import { useScrollStore, usePointerStore } from "../utils/store";

export default function HomeView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);

  const setScroll = useScrollStore((state) => state.setScroll);
  const setPointer = usePointerStore((state) => state.setPointer);
  const viewMode = useScrollStore((state) => state.viewMode);

  // --- 1. TRACK OVERALL DEVICE SCROLL PROGRESS AND METRICS ---
  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? currentY / maxScroll : 0;
      const velocity = currentY - lastY;
      lastY = currentY;

      setScroll(progress, velocity);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initialize on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setScroll]);

  // --- 2. RECORD COORDINATES FOR SHADER DEVIATIONS ---
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const ndcX = (e.clientX / window.innerWidth) * 2 - 1;
      const ndcY = -(e.clientY / window.innerHeight) * 2 + 1;
      setPointer(ndcX, ndcY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [setPointer]);

  // --- 3. TIMELINE PARALLAX ASSIGNMENTS ---
  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "50% top",
            scrub: true,
          },
        })
        .to(textLayerRef.current, {
          scale: 0.96,
          opacity: 0.15,
          y: "-5vh",
          ease: "none",
        });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-white text-black selection:bg-black selection:text-white overflow-hidden"
    >
      {/* WebGL Custom Shader Plane */}
      <BackgroundCanvas />

      {/* FIXED HERO CORE TEXT */}
      <section
        ref={textLayerRef}
        className="fixed inset-0 z-10 flex flex-col justify-end px-6 pb-24 md:px-12 md:pb-32 pointer-events-none"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 w-full items-end gap-y-6">
          <div className="col-span-1 md:col-span-10 text-[clamp(2.2rem,6.8vw,8rem)] font-medium leading-[0.88] tracking-[-0.03em] uppercase">
            <PixelText delay={0.15}>
              We offer creative direction & production for athleticism.
            </PixelText>
          </div>
          <div className="hidden md:flex col-span-2 justify-end pb-4 overflow-hidden">
            <PixelText
              className="text-xs uppercase tracking-[0.15em] font-mono text-neutral-400"
              delay={0.5}
            >
              // Scroll
            </PixelText>
          </div>
        </div>
      </section>

      {/* TRACKPAD SCROLL SPACER */}
      <section className="h-[105vh] w-full relative z-0 pointer-events-none" />

      {/* INTERACTIVE DATA SLIDE OVERLAY */}
      <div className="relative z-20 bg-white pt-28 pb-32 md:pt-40 shadow-[0_-30px_60px_rgba(0,0,0,0.03)] border-t border-neutral-100">
        {/* Intro Block */}
        <div className="px-6 md:px-12">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mb-12">
            // Available Worldwide
          </p>

          <div className="grid grid-cols-1 md:grid-cols-12 mb-32 md:mb-48">
            <div className="md:col-span-10 text-[clamp(1.8rem,4.2vw,4.6rem)] leading-[1.05] font-medium tracking-[-0.02em] uppercase">
              <p>
                We help sports brands tell stories through fieldwork, narrative,
                and creative research, with deep production expertise.
              </p>
            </div>
          </div>
        </div>

        {/* GSAP DRAGGABLE CAROUSEL */}
        <div className="w-full mb-32 md:mb-48">
          <div className="px-6 md:px-12 mb-8">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400">
              // Behind the scenes
            </h3>
          </div>
          {/* Out of bounds wrapper to allow images to bleed off the edge cleanly */}
          <div className="w-[100vw] relative left-1/2 -translate-x-1/2 overflow-hidden">
            <Carousel />
          </div>
        </div>

        {/* PROJECT LIST/GRID WRAPPER */}
        <div className="px-6 md:px-12 mt-20">
          <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mb-8">
            // Selected Works
          </h3>
          <ProjectWorks />
        </div>

        {/* LEFT-HEAVY MINIMALIST GET IN TOUCH SECTION */}
        <section className="mt-48 px-6 md:px-12 pt-24 border-t border-neutral-100">
          <div className="max-w-4xl">
            <h3 className="text-[clamp(2.5rem,5vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.02em] uppercase mb-8">
              Get in touch.
            </h3>
            <p className="text-neutral-500 text-base max-w-md mb-12">
              Currently open for global opportunities. Send a message to build
              your framework.
            </p>

            <div className="flex flex-col gap-4 items-start">
              <a
                href="mailto:hello@seancruz.dev"
                className="text-xl md:text-2xl font-medium uppercase tracking-tight hover:underline"
              >
                hello@seancruz.dev
              </a>
              <div className="flex gap-8 text-xs uppercase font-mono tracking-widest text-neutral-400 pt-4">
                <a href="#" className="hover:text-black transition-colors">
                  LinkedIn
                </a>
                <a href="#" className="hover:text-black transition-colors">
                  GitHub
                </a>
                <a href="#" className="hover:text-black transition-colors">
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Floating Layout Toggle Switch */}
      <ViewToggle />
    </div>
  );
}
