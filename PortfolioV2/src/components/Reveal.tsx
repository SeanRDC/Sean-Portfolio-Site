import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

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
      gsap.fromTo(
        container.current,
        { opacity: 0, filter: "blur(20px)", scale: 0.96 },
        {
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          delay: delay / 1000,
          scrollTrigger: {
            trigger: container.current,
            start: "top 85%",
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
      style={{ willChange: "opacity, transform, filter" }}
    >
      {children}
    </div>
  );
}
