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
      if (!chars || chars.length === 0) return;

      // Premium scattered layout entry matching the reference style
      gsap.fromTo(
        chars,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: delay,
          stagger: {
            amount: 0.4,
            from: "random", // Scattered arrival physics
          },
          ease: "power2.out",
        },
      );
    },
    { scope: containerRef },
  );

  // Split string into individual letters while preserving spaces
  const renderWords = () => {
    return children.split(" ").map((word, wordIdx) => (
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
    ));
  };

  return (
    <div ref={containerRef} className={`${className} flex flex-wrap`}>
      {renderWords()}
    </div>
  );
}
