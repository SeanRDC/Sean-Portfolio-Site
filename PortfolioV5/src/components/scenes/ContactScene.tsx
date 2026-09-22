import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function ContactScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  
  // State to manage the Resume Overlay visibility
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Lock the background scroll when the resume is open
  useEffect(() => {
    if (isResumeOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isResumeOpen]);

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
            end: "top 20%",
            scrub: 0.5,
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
      className="relative flex h-screen flex-col justify-between bg-paper px-6 pb-8 pt-32 md:px-16"
    >
      {/* Top indicator */}
      <div className="font-mono-x text-[11px] uppercase tracking-[0.4em] text-ink-dim">
        05 - The Finale
      </div>

      {/* Main Colossal CTA */}
      <div className="flex flex-1 flex-col justify-center">
        <h2
          ref={textRef}
          className="t-colossal text-[17vw] sm:text-[80px] md:text-[clamp(60px,14vw,250px)] leading-[0.85] md:leading-[0.8] tracking-tighter text-ink"
        >
          GET
          <br className="md:hidden" />
          <span className="hidden md:inline"> </span>
          IN
          <br />
          TOUCH
        </h2>
        
        <div className="flex flex-col gap-4 mt-8 md:mt-12 w-fit max-w-full">
          {/* Email Button */}
          <a
            href="mailto:delacruzseanrhani@gmail.com"
            className="group inline-flex w-fit items-center gap-3 border-b border-line-strong pb-1.5 transition-colors hover:border-ink"
          >
            <span className="t-label text-[10px] md:text-[13px] uppercase tracking-[0.2em] text-ink truncate">
              delacruzseanrhani@gmail.com
            </span>
            <span className="font-mono-x text-base text-ink transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0">
              ↗
            </span>
          </a>

          {/* View Resume Button */}
          <button
            onClick={() => setIsResumeOpen(true)}
            className="group inline-flex w-fit items-center gap-3 border-b border-line-strong pb-1.5 transition-colors hover:border-ink cursor-pointer bg-transparent outline-none p-0 text-left"
          >
            <span className="t-label text-[10px] md:text-[13px] uppercase tracking-[0.2em] text-ink">
              View Resume
            </span>
            <span className="font-mono-x text-base text-ink transition-transform group-hover:translate-x-1 shrink-0">
              →
            </span>
          </button>
        </div>
      </div>

      {/* Minimal Footer */}
      <div className="grid w-full grid-cols-2 items-center border-t border-line pt-6 md:grid-cols-4">
        
        {/* 1. Year (Always visible) */}
        <div className="font-mono-x text-[10px] uppercase tracking-widest text-ink-dim">
            {new Date().getFullYear()}
        </div>

        {/* 2. MOBILE ONLY: Social Icons Flexbox */}
        <div className="flex items-center justify-end gap-5 md:hidden">
          <a href="https://github.com/SeanRDC" className="text-ink-dim hover:text-ink transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/sean-rhani-dela-cruz-834573334" className="text-ink-dim hover:text-ink transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
        </div>

        {/* 3. DESKTOP ONLY: GitHub Text */}
        <div className="font-mono-x hidden text-[10px] uppercase tracking-widest text-ink-dim md:block md:text-center">
          <a
            href="https://github.com/SeanRDC"
            className="hover:text-ink transition-colors"
          >
            GitHub
          </a>
        </div>

        {/* 4. DESKTOP ONLY: LinkedIn Text */}
        <div className="font-mono-x hidden text-[10px] uppercase tracking-widest text-ink-dim md:block md:text-center">
          <a
            href="https://www.linkedin.com/in/sean-rhani-dela-cruz-834573334"
            className="hover:text-ink transition-colors"
          >
            LinkedIn
          </a>
        </div>

        {/* 5. DESKTOP ONLY: Local Time */}
        <div className="font-mono-x hidden text-right text-[10px] uppercase tracking-widest text-ink-dim md:block">
          Local Time :{" "}
          {new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "Asia/Manila",
          })}
        </div>
      </div>

      {/* ── RESUME MODAL OVERLAY ── */}
      {isResumeOpen && (
        <div 
          className="fixed inset-0 z-[99999999] block h-[100dvh] w-screen overflow-y-auto overscroll-contain bg-black/60 backdrop-blur-xl text-[#f5f5f5]"
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsResumeOpen(false);
          }}
        >
          
          {/* Top Right Actions (Sticky so it stays visible while scrolling) */}
          <div className="fixed top-6 right-6 md:top-8 md:right-10 z-[100000000] flex items-center gap-4">
            <a
              href="/resume.pdf"
              download="Sean_Dela_Cruz_Resume.pdf"
              className="t-label border border-[#333] bg-[#111] px-4 py-2 text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-[#f5f5f5] transition-colors hover:bg-[#f5f5f5] hover:text-[#111]"
            >
              Download PDF
            </a>
            <button
              onClick={() => setIsResumeOpen(false)}
              className="flex h-10 w-10 md:h-11 md:w-11 cursor-pointer items-center justify-center rounded-full border border-[#333] bg-[#111] text-[#f5f5f5] transition-colors hover:bg-[#f5f5f5] hover:text-[#111]"
              aria-label="Close Resume"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Scrollable Paper Format Container */}
          <div 
            className="mx-auto flex w-full max-w-[850px] flex-col gap-8 md:gap-12 px-4 pt-24 pb-32 md:px-12"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsResumeOpen(false);
            }}
          >
            
            {/* PAGE 1 */}
            <div className="aspect-[8.5/11] w-full bg-paper shadow-2xl">
              <img 
                src="/resume/page1.webp" 
                alt="Resume Page 1" 
                className="h-full w-full object-cover"
              />
            </div>

            {/* PAGE 2 */}
            <div className="aspect-[8.5/11] w-full bg-paper shadow-2xl">
              <img 
                src="/resume/page2.webp" 
                alt="Resume Page 2" 
                className="h-full w-full object-cover"
              />
            </div>

            {/* PAGE 3 */}
            <div className="aspect-[8.5/11] w-full bg-paper shadow-2xl">
              <img 
                src="/resume/page3.webp" 
                alt="Resume Page 3" 
                className="h-full w-full object-cover"
              />
            </div>

          </div>
        </div>
      )}
    </section>
  );
}