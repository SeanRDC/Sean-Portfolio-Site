import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface PixelTextProps {
  children: string;
  className?: string;
  delay?: number;
}

export default function PixelText({
  children,
  className = "",
  delay = 0,
}: PixelTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const chars = containerRef.current?.querySelectorAll(".char-span");
      if (!chars) return;

      gsap.fromTo(
        chars,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: delay,
          stagger: 0.02, // The secret to the "fast" agency feel
          ease: "power3.out",
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={`${className} flex flex-wrap`}>
      {children.split(" ").map((word, wordIdx) => (
        <span
          key={wordIdx}
          className="inline-block whitespace-nowrap mr-[0.25em]"
        >
          {word.split("").map((char, charIdx) => (
            <span
              key={charIdx}
              className="char-span inline-block will-change-transform opacity-0"
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}
