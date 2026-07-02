import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const COPY =
  "It started with pure curiosity — a kid staring at a terminal just to make the machine respond. That passion became a discipline: studying the deep theoretical foundations of computer science, and building the digital architecture that shapes our future.";
const WORDS = COPY.split(" ");

function clamp01(x: number) {
  return Math.min(1, Math.max(0, x));
}

export default function ProfileScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);

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
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => setProgress(self.progress),
        });

        const picTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });

        picTl.to({}, { duration: 1 });

        picTl
          .fromTo(
            imgContainerRef.current,
            { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
            {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              ease: "none",
              duration: 0.79,
            },
            0.08,
          )
          .fromTo(
            imgRef.current,
            { scale: 1.3 },
            { scale: 1, ease: "none", duration: 0.79 },
            0.08,
          )
          .fromTo(
            metaRef.current,
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, ease: "power2.out", duration: 0.1 },
            0.77,
          );
      });

      // --- MOBILE LOGIC (No Scrubbing, Natural Flow) ---
      mm.add("(max-width: 767px)", () => {
        // Image Reveal (Fires once when scrolling into view)
        gsap.fromTo(
          imgContainerRef.current,
          { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.5,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: imgContainerRef.current,
              start: "top 80%",
            },
          },
        );
        gsap.fromTo(
          imgRef.current,
          { scale: 1.3 },
          {
            scale: 1,
            duration: 1.5,
            ease: "power3.inOut",
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

        // Text Highlight (Fires an automated timeline rather than scrubbing to mouse wheel)
        gsap.to(
          { val: 0 },
          {
            val: 1,
            duration: 2, // Takes 2 seconds to "read" through the text
            ease: "power2.inOut",
            scrollTrigger: { trigger: ".intro-text", start: "top 75%" },
            onUpdate: function () {
              setProgress(this.targets()[0].val);
            },
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
      // Only forces massive height on Desktop. Mobile gets normal document flow.
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
              {WORDS.map((w, i) => {
                const start = 0.08 + (i / WORDS.length) * 0.74;
                const wp = clamp01((progress - start) / 0.05);
                return (
                  <span
                    key={i}
                    style={{
                      color: `rgba(19,18,16,${0.14 + wp * 0.86})`,
                      transition: "color 0.1s linear",
                    }}
                  >
                    {w}{" "}
                  </span>
                );
              })}
            </p>

            {/* Stats Block (Stacked with lines on Mobile, Flex Wrap on Desktop) */}
            <div
              className="mt-8 md:mt-12 flex flex-col md:flex-row md:flex-wrap md:gap-x-10 md:gap-y-4 divide-y divide-line md:divide-y-0 border-y border-line md:border-0"
              style={{ opacity: clamp01((progress - 0.8) / 0.12) }}
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
