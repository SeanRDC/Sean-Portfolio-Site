import { useRef } from "react";
import { Award } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { MouseEvent } from "react";

gsap.registerPlugin(ScrollTrigger);

export type Cert = {
  title: string;
  issuer: string;
  year: string;
  glow: string;
  grad: string;
  images: string[];
};

export default function CertPlate({
  cert,
  side,
  onOpen,
}: {
  cert: Cert;
  side: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    // OPTIMIZATION: Removed the heavy var(--shadow-glass) from the constant scroll animation
    // Now it only calculates the crisp inner border and your custom colored glow
    const baseShadow = "inset 0 1px 0 rgba(255,255,255,0.32)";

    gsap.fromTo(
      el,
      {
        rotationX: 14,
        rotationY: side * 8,
        y: 38,
        opacity: 0.4,
        boxShadow: `${baseShadow}, 0 0 0px ${cert.glow}`,
        borderColor: "rgba(255,255,255,0.12)",
      },
      {
        rotationX: 0,
        rotationY: 0,
        y: 0,
        opacity: 1,
        boxShadow: `${baseShadow}, 0 0 38px ${cert.glow}`,
        borderColor: "rgba(255,255,255,0.3)",
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          end: "center 50%",
          scrub: true,
        },
      },
    );
  }, [side, cert.glow]);

  const onMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * 20;
    const ry = (px - 0.5) * 20;

    gsap.to(el, {
      rotationX: rx,
      rotationY: ry,
      duration: 0.2,
      ease: "power2.out",
      overwrite: "auto",
    });

    el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <button
      ref={ref}
      data-cursor
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onOpen}
      // OPTIMIZATION:
      // 1. Removed 'glass' to kill the heavy blur math.
      // 2. Added 'bg-[var(--glass-fill)] border border-white/10' to keep the translucent color.
      // 3. Added 'transform-gpu' to force the graphics card to handle the 3D tilt.
      // 4. Added 'hover:shadow-2xl transition-shadow' to only calculate deep shadows on interaction.
      className="glass-edge tilt flex h-52 w-full flex-col justify-between rounded-[22px] p-6 text-left transform-gpu bg-[var(--glass-fill)] border border-[var(--glass-border)] shadow-none transition-shadow duration-300 hover:shadow-2xl"
      style={{ transformStyle: "preserve-3d", perspective: "1100px" }}
    >
      <div className="flex items-start justify-between pointer-events-none">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-[13px]"
          style={{
            background: cert.grad,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)",
          }}
        >
          <Award className="h-5 w-5 text-ink" strokeWidth={1.75} />
        </span>
        <span className="text-xs font-medium text-ink-faint">{cert.year}</span>
      </div>
      <div className="pointer-events-none">
        <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
          {cert.title}
        </h3>
        <p className="mt-1 text-sm text-ink-muted">{cert.issuer}</p>
      </div>
    </button>
  );
}
