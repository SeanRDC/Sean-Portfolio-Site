import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLoaderStore } from "../utils/loaderStore";

// Add your key asset URLs here
const ASSETS = [
  "https://images.unsplash.com/photo-1552674605-e71fac9804eb?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2000&auto=format&fit=crop",
  // ... add all your main project image URLs here
];

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const { progress, increment, setComplete } = useLoaderStore();

  useEffect(() => {
    const totalAssets = ASSETS.length;
    const step = 100 / totalAssets;

    ASSETS.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => increment(step);
      img.onerror = () => increment(step); // Don't let a bad image break the site
    });
  }, [increment]);

  // Handle the "Reveal" sequence
  useEffect(() => {
    if (progress >= 100) {
      const tl = gsap.timeline({ onComplete: setComplete });
      
      tl.to(percentRef.current, { opacity: 0, duration: 0.3 })
        .to(containerRef.current, { 
          yPercent: -100, 
          ease: "expo.inOut", 
          duration: 1.2 
        });
    }
  }, [progress, setComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      <div className="text-sm font-mono tracking-[0.2em] uppercase text-black">
        Loading <span ref={percentRef}>{Math.floor(progress)}%</span>
      </div>
    </div>
  );
}