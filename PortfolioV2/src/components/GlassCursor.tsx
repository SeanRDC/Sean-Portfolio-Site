import { useEffect, useRef, useState } from "react";

// Custom blurred-glass cursor blob; magnifies over [data-cursor] targets. Fine-pointer only.
export default function GlassCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [isLight, setIsLight] = useState(false); // Track theme state locally

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    // --- Theme Observer ---
    // Checks if light mode is active without touching global CSS variables
    const checkTheme = () => {
      setIsLight(
        document.documentElement.getAttribute("data-theme") === "light",
      );
    };
    checkTheme(); // Run once on mount

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    // ----------------------

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as HTMLElement | null;
      setHover(!!(t && t.closest("[data-cursor]")));
    };

    const loop = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      if (dot.current) {
        dot.current.style.transform = `translate(${Math.round(cx)}px, ${Math.round(cy)}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      observer.disconnect(); // Clean up the observer
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={dot}
      className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full transition-[width,height] duration-300 ease-out"
      style={{
        width: hover ? "54px" : "20px",
        height: hover ? "54px" : "20px",
        backdropFilter: "blur(3px)",
        WebkitBackdropFilter: "blur(3px)",

        // Dynamically toggle colors and blend mode based on the React state
        background: isLight
          ? "rgba(16, 18, 28, 0.08)"
          : "rgba(255, 255, 255, 0.1)",
        border: isLight
          ? "1px solid rgba(16, 18, 28, 0.25)"
          : "1px solid rgba(255, 255, 255, 0.45)",
        mixBlendMode: (isLight ? "multiply" : "screen") as any,
      }}
    />
  );
}
