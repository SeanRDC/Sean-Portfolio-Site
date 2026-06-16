import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Premium athletic-themed placeholders
const carouselData = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1552674605-e71fac9804eb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function Carousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  // Explicitly typing the ref array so TypeScript understands what goes inside
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [isDragging, setIsDragging] = useState(false);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      let targetX = 0;
      let currentX = 0;
      let startX = 0;
      let startScrollX = 0;
      let isDown = false;
      let velocity = 0;
      let lastTime = 0;
      let lastX = 0;

      const maxScroll = -(track.scrollWidth - window.innerWidth + 100); // 100px padding buffer

      // --- INTERACTION HANDLERS ---
      const onPointerDown = (e: PointerEvent) => {
        isDown = true;
        setIsDragging(true);
        startX = e.clientX;
        startScrollX = targetX;
        lastX = e.clientX;
        lastTime = performance.now();

        // Stop body text selection during drag
        document.body.style.userSelect = "none";
      };

      const onPointerMove = (e: PointerEvent) => {
        if (!isDown) return;
        const x = e.clientX;
        const walk = (x - startX) * 1.5; // Drag sensitivity
        targetX = startScrollX + walk;

        // Calculate velocity for the skew effect
        const now = performance.now();
        const dt = Math.max(1, now - lastTime);
        velocity = ((x - lastX) / dt) * 1000;

        lastX = x;
        lastTime = now;
      };

      const onPointerUp = () => {
        if (!isDown) return;
        isDown = false;
        setIsDragging(false);
        document.body.style.userSelect = "";

        // Add momentum based on release velocity
        if (Math.abs(velocity) > 50) {
          targetX += velocity * 0.3;
        }
      };

      track.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
      window.addEventListener("pointercancel", onPointerUp);

      // --- ENGINE TICKER ---
      const ticker = () => {
        // Clamp the scrolling bounds so it doesn't drag into infinity
        if (!isDown) {
          targetX = gsap.utils.clamp(maxScroll, 0, targetX);
        } else {
          // Rubber band resistance when dragging out of bounds
          if (targetX > 0) targetX *= 0.8;
          if (targetX < maxScroll)
            targetX = maxScroll + (targetX - maxScroll) * 0.8;
        }

        // Lerp for buttery smoothness
        currentX += (targetX - currentX) * 0.08;

        // Calculate realtime speed for dynamic physics
        const speed = targetX - currentX;
        const skew = gsap.utils.clamp(-15, 15, speed * 0.05);

        // Apply transforms
        gsap.set(track, { x: currentX });

        // Apply skew to images based on drag speed
        itemsRef.current.forEach((item) => {
          if (item) {
            gsap.set(item, { skewX: skew });
          }
        });
      };

      gsap.ticker.add(ticker);

      return () => {
        track.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("pointercancel", onPointerUp);
        gsap.ticker.remove(ticker);
      };
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full py-10 overflow-hidden touch-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
    >
      <div
        ref={trackRef}
        className="flex w-max gap-6 md:gap-10 px-6 md:px-10 will-change-transform"
      >
        {carouselData.map((item, i) => (
          <div
            key={item.id}
            // Explicitly defining the type of 'el' for strict TypeScript
            ref={(el: HTMLDivElement | null) => {
              itemsRef.current[i] = el;
            }}
            className="w-[75vw] md:w-[45vw] lg:w-[35vw] aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-[2px] bg-neutral-100 will-change-transform transform-gpu origin-bottom"
          >
            <img
              src={item.url}
              alt="Behind the scenes"
              draggable={false}
              className="w-full h-full object-cover select-none pointer-events-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
