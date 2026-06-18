import { useEffect, useRef, useState } from "react";

export function useScrollProgress<T extends HTMLElement>(smooth = 0.12) {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    let target = 0;
    let current = 0;
    let running = true;

    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      target = total > 0 ? scrolled / total : 0;
    };

    const tick = () => {
      if (!running) return;
      current += (target - current) * smooth;
      if (Math.abs(target - current) < 0.0004) current = target;
      setProgress(current);
      raf = requestAnimationFrame(tick);
    };

    measure();
    current = target;
    setProgress(current);
    const onScroll = () => measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [smooth]);

  return { ref, progress };
}
