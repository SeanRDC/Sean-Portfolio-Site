import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function MeshBackground() {
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // PARALLAX primitive: 0.3x scroll speed
    gsap.to(bgRef.current, {
      y: () => ScrollTrigger.maxScroll(window) * 0.3,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true, // Recalculates if user resizes the window
      },
    });
  });

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-void" aria-hidden>
      <div ref={bgRef} className="absolute inset-0">
        <div
          className="absolute left-[-12%] top-[-14%] h-[62vw] w-[62vw] rounded-full blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, var(--violet), transparent 62%)",
            opacity: 0.42,
            animation: "drift-a 26s ease-in-out infinite",
          }}
        />
        <div
          className="absolute right-[-16%] top-[14%] h-[56vw] w-[56vw] rounded-full blur-[130px]"
          style={{
            background: "radial-gradient(circle, var(--cyan), transparent 62%)",
            opacity: 0.34,
            animation: "drift-b 32s ease-in-out infinite",
          }}
        />
        <div
          className="absolute left-[18%] bottom-[-22%] h-[52vw] w-[52vw] rounded-full blur-[130px]"
          style={{
            background: "radial-gradient(circle, var(--rose), transparent 62%)",
            opacity: 0.3,
            animation: "drift-c 29s ease-in-out infinite",
          }}
        />
      </div>
      {/* Vignette to keep edges deep and text legible */}
      <div
        className="absolute inset-0"
        style={{ background: "var(--vignette)" }}
      />
    </div>
  );
}
