import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const COPY =
  "It started with pure curiosity — a kid staring at a terminal just to make the machine respond. That passion became a discipline: studying the deep theoretical foundations of computer science, and building the digital architecture that shapes our future.";
const WORDS = COPY.split(" ");

export default function ProfileScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  // New DOM Refs to bypass React State
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);

  // Track viewport size to seamlessly toggle between Pinning (Desktop) and Flowing (Mobile)
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 768,
  );

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // --- DESKTOP LOGIC (Scrubbing & Pinning) ---
      mm.add("(min-width: 768px)", () => {
        // 1. TEXT & STATS TIMELINE (Instant Scrub)
        const textTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true, // Instant scrub for text
          },
        });

        // Create a 1-second master track to place animations at exact percentages
        textTl.to({}, { duration: 1 });

        // Stagger the text colors from 0.08 to 0.82 progress
        textTl.to(
          wordsRef.current,
          {
            color: "rgba(19,18,16,1)", // Solid ink color
            stagger: 0.74 / WORDS.length, // Distribute evenly
            duration: 0.05,
            ease: "none",
          },
          0.08,
        );

        // Fade in the stats block at 0.80 progress
        textTl.fromTo(
          statsRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.12, ease: "none" },
          0.8,
        );

        // 2. IMAGE TIMELINE (Delayed Scrub for premium feel)
        const picTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1, // 1-second delay for the image
          },
        });

        picTl.to({}, { duration: 1 });

        picTl
          .fromTo(
            imgContainerRef.current,
            {
              filter: "blur(20px) brightness(1.5)",
              clipPath: "inset(0% 0% 0% 0%)",
            }, // Ensure clip-path doesn't hide it
            { filter: "blur(0px) brightness(1)", ease: "none", duration: 0.79 },
            0.08,
          )
          .fromTo(
            imgRef.current,
            { scale: 1.2 },
            { scale: 1, ease: "none", duration: 0.79 },
            0.08,
          );
      });

      // --- MOBILE LOGIC (No Scrubbing, Natural Flow) ---
      mm.add("(max-width: 767px)", () => {
        // Image Reveal
        gsap.fromTo(
          imgContainerRef.current,
          {
            filter: "blur(20px) brightness(1.5)",
            clipPath: "inset(0% 0% 0% 0%)",
          },
          {
            filter: "blur(0px) brightness(1)",
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imgContainerRef.current,
              start: "top 80%",
            },
          },
        );
        gsap.fromTo(
          imgRef.current,
          { scale: 1.2 },
          {
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imgContainerRef.current,
              start: "top 80%",
            },
          },
        );
        gsap.fromTo(
          metaRef.current,
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: imgContainerRef.current,
              start: "top 80%",
            },
          },
        );

        // Text Highlight (Native GSAP Stagger)
        gsap.to(wordsRef.current, {
          color: "rgba(19,18,16,1)",
          duration: 0.4,
          stagger: 0.04, // Lights up words consecutively
          ease: "none",
          scrollTrigger: { trigger: ".intro-text", start: "top 75%" },
        });

        // Stats Reveal
        gsap.fromTo(
          statsRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            delay: 1.2,
            ease: "power2.out",
            scrollTrigger: { trigger: ".intro-text", start: "top 75%" },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="profile"
      ref={sectionRef}
      className={`relative bg-paper ${isDesktop ? "h-[260vh]" : "min-h-screen"}`}
    >
      <div
        className={`w-full overflow-hidden ${isDesktop ? "sticky top-0 flex h-screen items-center" : "relative pt-24 pb-24"}`}
      >
        <div className="mx-auto flex flex-col md:grid w-full max-w-7xl md:grid-cols-12 items-center gap-12 px-6 md:px-10">
          {/* Portrait Plate */}
          <div className="flex w-full justify-center md:col-span-5 md:block">
            <div className="relative aspect-[3/4] w-[65%] sm:w-[55%] md:w-full max-w-[280px] md:max-w-md border border-line">
              <div
                ref={imgContainerRef}
                className="absolute inset-0 overflow-hidden will-change-transform"
              >
                <img
                  ref={imgRef}
                  src="/sean-profile.webp"
                  alt="Sean"
                  className="h-full w-full object-cover will-change-transform"
                />

                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 55%, rgba(19,18,16,0.18) 100%)",
                  }}
                />

                <div
                  ref={metaRef}
                  className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 md:p-5"
                >
                  <span className="t-label text-[10px] md:text-[12px] uppercase tracking-[0.2em] text-ink">
                    sean
                  </span>
                  <span className="font-mono-x text-[8px] md:text-[10px] uppercase text-ink-dim">
                    Portrait / 2024
                  </span>
                </div>
              </div>

              <div className="pointer-events-none absolute left-4 top-4 font-mono-x text-[10px] uppercase tracking-[0.2em] text-ink-dim mix-blend-difference">
                01 - Profile
              </div>
            </div>
          </div>

          {/* Word-by-Word Intro */}
          <div className="intro-text w-full md:col-span-7 md:pl-6">
            <div className="mb-4 md:mb-8 flex items-center gap-4">
              <span className="font-mono-x text-[11px] uppercase tracking-[0.4em] text-ink-soft">
                The Introduction
              </span>
              <span className="h-px flex-1 bg-line" />
            </div>

            <p className="t-display max-w-2xl text-[clamp(24px,3.4vw,46px)] leading-[1.12]">
              {WORDS.map((w, i) => (
                <span
                  key={i}
                  ref={(el) => {
                    wordsRef.current[i] = el;
                  }}
                  // Start out faint, GSAP will animate to solid ink directly
                  style={{ color: "rgba(19,18,16,0.14)" }}
                >
                  {w}{" "}
                </span>
              ))}
            </p>

            {/* Stats Block */}
            <div
              ref={statsRef}
              className="mt-8 md:mt-12 flex flex-col md:flex-row md:flex-wrap md:gap-x-10 md:gap-y-4 divide-y divide-line md:divide-y-0 border-y border-line md:border-0 opacity-0"
            >
              {[
                ["03+", "Years building"],
                ["ComSci", "Career path"],
                ["20+", "Certificates"],
              ].map(([k, v]) => (
                <div key={k} className="py-4 md:py-0">
                  <div className="t-sub text-[26px] text-ink">{k}</div>
                  <div className="font-mono-x text-[11px] uppercase tracking-wider text-ink-dim">
                    {v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
