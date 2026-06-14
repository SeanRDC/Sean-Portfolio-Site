import { useEffect, useRef, useState } from "react";

// Custom blurred-glass cursor blob; magnifies over [data-cursor] targets. Fine-pointer only.
export default function GlassCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

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
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(3px)",
        WebkitBackdropFilter: "blur(3px)",
        border: "1px solid rgba(255,255,255,0.45)",
        mixBlendMode: "screen",
      }}
    />
  );
}
