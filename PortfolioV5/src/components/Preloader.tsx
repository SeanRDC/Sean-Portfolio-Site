import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { TILES } from "../data/certificates";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const progressRef = useRef({ val: 0 }); // Use a ref to track value for GSAP

  useEffect(() => {
    // 1. Create a "dummy" tween that runs for 3 seconds
    // This provides the professional "wait" feel regardless of network speed
    const tl = gsap.to(progressRef.current, {
      val: 100,
      duration: 3,
      ease: "power2.inOut",
      onUpdate: () => {
        setDisplayProgress(Math.round(progressRef.current.val));
      },
    });

    // 2. Preload images in the background
    let loadedCount = 0;
    const totalImages = TILES.length;

    TILES.forEach((tile) => {
      const img = new Image();
      img.src = tile.image;
      img.onload = () => {
        loadedCount++;
      };
      img.onerror = () => {
        loadedCount++; // Count error as "done" so preloader doesn't hang
      };
    });

    // 3. Cleanup: When the 3-second timer finishes AND images are done, fade out
    tl.eventCallback("onComplete", () => {
      // Check if images are actually done; if not, wait slightly
      const checkImages = setInterval(() => {
        if (loadedCount >= totalImages) {
          clearInterval(checkImages);
          gsap.to("#preloader-overlay", {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: onComplete,
          });
        }
      }, 100);
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      id="preloader-overlay"
      className="fixed inset-0 z-[99999] flex h-dvh w-screen flex-col items-center justify-center bg-ink text-paper"
    >
      <div className="font-mono-x text-[10px] uppercase tracking-[0.3em] text-paper/60 mb-4">
        Initializing Environment
      </div>

      {/* Progress Bar */}
      <div className="w-64 h-px bg-line-strong overflow-hidden">
        <div
          className="h-full bg-paper"
          style={{ width: `${displayProgress}%` }}
        />
      </div>

      <div className="mt-4 font-mono-x text-xs tabular-nums tracking-widest">
        {String(displayProgress).padStart(2, "0")}%
      </div>
    </div>
  );
}
