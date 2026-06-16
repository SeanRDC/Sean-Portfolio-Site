import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import BackgroundCanvas from "../components/BackgroundCanvas";
import PixelText from "../components/PixelText";
import ProjectWorks from "../components/ProjectWorks";
import Carousel from "../components/Carousel";

export default function HomeView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax Logic: Dialed in to match the source scroll intensity
  useGSAP(
    () => {
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "60% top",
          scrub: 1.8, // Increased scrub for that heavy, weighted feel
        },
        y: "-20vh", // The specific "drift" distance of the original
        opacity: 0,
        scale: 0.95,
        ease: "power1.inOut",
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-white text-black selection:bg-black selection:text-white"
    >
      <BackgroundCanvas />

      {/* FIXED HERO CORE - RIGID GRID ALIGNMENT */}
      <section
        ref={heroRef}
        className="fixed inset-0 z-10 flex flex-col justify-end px-[5vw] pb-[5vw] md:px-[4vw] md:pb-[4vw] pointer-events-none"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 w-full items-end gap-x-8">
          {/* TEXT CONTAINER: Constrained width is the secret to the layout */}
          <div className="col-span-1 md:col-span-10 lg:col-span-8 text-[clamp(2.5rem,7.5vw,8.5rem)] font-medium leading-[0.85] tracking-[-0.04em] uppercase">
            <PixelText delay={0.2}>
              We offer creative direction & production for athleticism.
            </PixelText>
          </div>

          {/* SCROLL INDICATOR: Perfectly aligned to the bottom right of the grid */}
          <div className="hidden md:flex md:col-span-2 lg:col-span-4 justify-end pb-[1rem]">
            <div className="overflow-hidden">
              <PixelText
                className="text-[10px] uppercase tracking-[0.25em] font-mono text-neutral-400"
                delay={1.0}
              >
                // Scroll
              </PixelText>
            </div>
          </div>
        </div>
      </section>

      {/* SPACER: Matching the exact viewport height of the reference */}
      <section className="h-screen w-full relative z-0 pointer-events-none" />

      {/* CONTENT LAYER */}
      <div className="relative z-20 bg-white pt-[15vh] pb-[10vh] border-t border-neutral-100">
        <div className="px-[5vw] md:px-[4vw]">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400 mb-[6vh]">
            // Available Worldwide
          </p>

          <div className="grid grid-cols-1 md:grid-cols-12 mb-[15vh]">
            <div className="md:col-span-10 lg:col-span-8 text-[clamp(1.8rem,4.2vw,4.6rem)] leading-[1.05] font-medium tracking-[-0.02em] uppercase">
              <p>
                We help sports brands tell stories through fieldwork, narrative,
                and creative research, with deep production expertise.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full mb-[15vh]">
          <Carousel />
        </div>

        <div className="px-[5vw] md:px-[4vw] mt-[10vh]">
          <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 mb-[5vh]">
            // Selected Works
          </h3>
          <ProjectWorks />
        </div>
      </div>
    </div>
  );
}
