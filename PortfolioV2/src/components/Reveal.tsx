import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

// GSAP-Accelerated LIQUID-REVEAL: unblur + rise + scale
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      gsap.fromTo(
        container.current,
        {
          opacity: 0,
          filter: "blur(14px)",
          scale: 0.975,
          y: 26,
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: delay / 1000, // Converts your milliseconds to GSAP's seconds
          scrollTrigger: {
            trigger: container.current,
            start: "top 90%", // Triggers just as it enters the viewport
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className={className}
      // will-change hints the browser to push this element to the GPU
      style={{ willChange: "opacity, transform, filter" }}
    >
      {children}
    </div>
  );
}
