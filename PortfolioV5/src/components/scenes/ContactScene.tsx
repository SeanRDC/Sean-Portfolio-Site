import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function ContactScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        document.documentElement,
        {
          "--paper": "#f3efe7",
          "--ink": "#131210",
          "--line": "rgba(19, 18, 16, 0.1)",
          "--line-strong": "rgba(19, 18, 16, 0.2)",
        },
        {
          "--paper": "#131210",
          "--ink": "#f3efe7",
          "--line": "rgba(243, 239, 231, 0.1)",
          "--line-strong": "rgba(243, 239, 231, 0.2)",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "top top",
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        textRef.current,
        {
          y: 100,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative flex h-screen flex-col justify-between bg-paper px-6 pb-8 pt-32 transition-colors duration-0 md:px-16"
    >
      {/* Top indicator */}
      <div className="font-mono-x text-[11px] uppercase tracking-[0.4em] text-ink-dim">
        05 - The Finale
      </div>

      {/* Main Colossal CTA - Original Layout */}
      <div className="flex flex-1 flex-col justify-center">
        <h2
          ref={textRef}
          className="t-colossal text-[clamp(60px,14vw,250px)] leading-[0.8] tracking-tighter text-ink"
        >
          GET IN
          <br />
          TOUCH
        </h2>

        <a
          href="mailto:delacruzseanrhani@gmail.com"
          className="group mt-12 inline-flex w-fit items-center gap-3 border-b border-line-strong pb-1.5 transition-colors hover:border-ink"
        >
          <span className="t-label text-[13px] uppercase tracking-[0.2em] text-ink">
            delacruzseanrhani@gmail.com
          </span>
          <span className="font-mono-x text-base text-ink transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
            ↗
          </span>
        </a>
      </div>

      {/* Minimal Footer */}
      <div className="grid w-full grid-cols-2 border-t border-line pt-6 md:grid-cols-4">
        <div className="font-mono-x text-[10px] uppercase tracking-widest text-ink-dim">
          © {new Date().getFullYear()}
        </div>
        <div className="font-mono-x text-[10px] uppercase tracking-widest text-ink-dim md:text-center">
          <a
            href="https://github.com/SeanRDC"
            className="hover:text-ink transition-colors"
          >
            GitHub
          </a>
        </div>
        <div className="font-mono-x hidden text-[10px] uppercase tracking-widest text-ink-dim md:block md:text-center">
          <a
            href="https://www.linkedin.com/in/sean-rhani-dela-cruz-834573334"
            className="hover:text-ink transition-colors"
          >
            LinkedIn
          </a>
        </div>
        <div className="font-mono-x hidden text-right text-[10px] uppercase tracking-widest text-ink-dim md:block">
          Local Time —{" "}
          {new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "Asia/Manila",
          })}
        </div>
      </div>
    </section>
  );
}
